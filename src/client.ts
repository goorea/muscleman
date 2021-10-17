import 'cross-fetch/polyfill';
import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { APP_NAME, APP_VERSION } from '@env';
import errorLink from '@src/links/errorLink';
import authLink from '@src/links/authLink';
import httpLink from '@src/links/httpLink';

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  name: APP_NAME,
  version: APP_VERSION,
});

export default client;
