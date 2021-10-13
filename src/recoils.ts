import { atom, selector } from 'recoil';
import { Query, User } from '@src/types/graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { client } from '@src/client';
import { ME } from '@src/hooks/queries/useMeLazyQuery';
import { flash } from '@src/functions';

export const tokenState = atom<string | undefined>({
  key: 'token',
  default: undefined,
});

export const userQuery = selector<User | undefined>({
  key: 'userQuery',
  get: async ({ get }) => {
    const token = get(tokenState) || (await AsyncStorage.getItem('@token'));

    if (token) {
      const { data, error } = await client.query<Pick<Query, 'me'>>({
        query: ME,
      });

      if (error) {
        flash({
          title: error.name,
          contents: error.message,
          type: 'error',
        });
      }

      return data.me;
    }

    return undefined;
  },
});
