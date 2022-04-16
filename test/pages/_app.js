import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import '../styles/globals.css'
import {ApolloLink} from "@apollo/client"
import {createUploadLink} from "apollo-upload-client"
import Layout from '../src/layout'

function MyApp({ Component, pageProps }) {

  const uploadLink = createUploadLink({
    uri: "http://backend06.codebootcamp.co.kr/graphql"
  })

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache()
  })



  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
    ) 
}

export default MyApp
