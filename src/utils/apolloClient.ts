import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
    headers: {
        'X-CSRF-TOKEN': (document.querySelector('meta[name=csrf-token]') as HTMLMetaElement)?.content,
        'accept-language': document.documentElement.lang
    }
});
