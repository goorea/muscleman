import { ApolloClient, InMemoryCache } from '@apollo/client';
import { APP_API_URI, APP_NAME, APP_VERSION } from '@env';

export const client = new ApolloClient({
  uri: APP_API_URI,
  cache: new InMemoryCache(),
  name: APP_NAME,
  version: APP_VERSION,
});
