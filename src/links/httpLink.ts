import { createHttpLink } from '@apollo/client';
import { APP_API_URI } from '@env';

const httpLink = createHttpLink({
  uri: APP_API_URI,
});

export default httpLink;
