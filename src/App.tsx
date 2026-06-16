import { ApolloProvider } from "@apollo/client"
import { apolloClient } from "./utils/apolloClient"
import { RouterProvider } from "react-router-dom"

import { router } from "./routes"

const App = () => {

    return (
        <ApolloProvider client={apolloClient}>
            <RouterProvider router={router} />
        </ApolloProvider>
    )
}

export default App
