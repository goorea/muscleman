import { onError } from '@apollo/client/link/error';
import { ApolloClient, InMemoryCache, Observable } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ServerError } from '@apollo/client/link/utils';
import { ServerParseError } from '@apollo/client/link/http';
import httpLink from '@src/links/httpLink';
import { Mutation, MutationRefreshTokenArgs } from '@src/types/graphql';
import { REFRESH_TOKEN } from '@src/hooks/mutations/useRefreshTokenMutation';
import { getUniqueId } from 'react-native-device-info';

const isServerError = (
  error: Error | ServerError | ServerParseError,
): error is ServerError => (error as ServerError).result !== undefined;

const errorLink = onError(({ networkError, operation, forward }) => {
  if (
    networkError &&
    isServerError(networkError) &&
    networkError.result.errors[0].extensions.code === 'TOKEN_EXPIRED_ERROR'
  ) {
    return new Observable(subscriber => {
      (async () => {
        try {
          const refresh_token = await AsyncStorage.getItem('@refresh_token');

          if (!refresh_token) {
            await AsyncStorage.multiRemove(['@token', '@refresh_token']);
            throw new Error('리플래쉬 토큰이 없습니다.');
          }

          const client = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
          });

          const { data } = await client.mutate<
            Pick<Mutation, 'refreshToken'>,
            MutationRefreshTokenArgs
          >({
            mutation: REFRESH_TOKEN,
            variables: { refresh_token, device_id: getUniqueId() },
          });

          if (!data) {
            await AsyncStorage.multiRemove(['@token', '@refresh_token']);
            throw new Error('올바르지 않은 요청입니다.');
          }

          const { token, refresh_token: refreshed_token } = data.refreshToken;

          await AsyncStorage.multiSet([
            ['@token', token],
            ['@refresh_token', refreshed_token],
          ]);

          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : '',
            },
          }));

          forward(operation).subscribe({
            next: subscriber.next.bind(subscriber),
            error: subscriber.error.bind(subscriber),
            complete: subscriber.complete.bind(subscriber),
          });
        } catch (error) {
          subscriber.error(error);
        }
      })();
    });
  }
});

export default errorLink;
