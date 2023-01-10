import { ApolloClient, InMemoryCache } from '@apollo/client';

const gqlClient = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache({
    // 隐藏返回值的__typename字段
    addTypename: false,
  })
});

export default gqlClient;