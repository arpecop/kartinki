import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { PrismicLink } from 'apollo-link-prismic';

import App from './App';

const apolloClient = new ApolloClient({
  link: PrismicLink({
    uri: 'https://kartinki.prismic.io/graphql',
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
