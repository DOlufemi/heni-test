import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {  usePaginationQuery } from "./hooks/usePagination";
import {Button, Paper, Typography} from "@mui/material";

function App() {
  const { data, fetchMore } = usePaginationQuery(10);
  return (
      <Paper elevation={0} >
        {data?.map(country => (
            <Paper elevation={2} >
            <Typography>{country.name}</Typography>
            <Typography>{country.capital}</Typography>
            <Typography>{country.native}</Typography>
            <Typography>{country.emoji}</Typography>
            </Paper>
        ))}
        <Button onClick={fetchMore}>
          Fetch More
        </Button>
      </Paper>
  );
}

export default App;
