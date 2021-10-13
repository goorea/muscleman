import 'cross-fetch/polyfill';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { APP_API_URI, APP_NAME, APP_VERSION } from '@env';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
  uri: APP_API_URI,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('@token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  name: APP_NAME,
  version: APP_VERSION,
});
