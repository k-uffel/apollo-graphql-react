import React from 'react';
import { render } from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Pages from "./pages";


const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});

render(
    <ApolloProvider client={client}>
        <Pages />
    </ApolloProvider>,
    document.getElementById('root'));
