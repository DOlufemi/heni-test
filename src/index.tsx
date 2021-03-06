import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/react-hooks";
import { offsetLimitPagination } from "@apollo/client/utilities";
import {CssBaseline} from "@mui/material";

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          countries: offsetLimitPagination(['code']),
        },
      },
    },
  }),
  uri: "https://countries.trevorblades.com",
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
