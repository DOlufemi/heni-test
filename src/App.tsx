import React, { ChangeEvent, useState } from "react";
import "./App.css";
import { usePaginationQuery } from "./hooks/usePagination";
import {
  AppBar,
  Button,
  CardContent,
  CircularProgress,
  createTheme,
  FormControlLabel,
  Switch,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Card, CardWrapper, Wrapper, Toolbar, TextField } from "./styled";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const theme = createTheme();
function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const [searchString, setSearchString] = useState<string>();
  const { data, fetchMore, loading, hasMore } = usePaginationQuery(
    10,
    searchString
  );
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
      <Wrapper darkMode={isDarkMode}>
        <AppBar position="static">
          <Toolbar>
            <TextField
              placeholder="Search"
              onChange={(string: ChangeEvent<HTMLInputElement>) =>
                setSearchString(string.target.value)
              }
              value={searchString}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isDarkMode}
                  onChange={() => setDarkMode((b) => !b)}
                  aria-label="login switch"
                />
              }
              label="Dark Mode"
            />
          </Toolbar>
        </AppBar>
        <CardWrapper>
          {data?.map((country) => (
            <Card elevation={2} key={country.code}>
              <CardContent>
                <Typography variant="h5" component="div" bgcolor="primary">
                  {country.name}
                </Typography>
                <Typography variant="h6" component="div" bgcolor="primary">
                  {country.capital}
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  bgcolor="primary"
                >
                  {country.native}
                </Typography>
                <Typography bgcolor="primary" variant="h1">
                  {country.emoji}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </CardWrapper>
        {hasMore && (
          <Button variant="contained" onClick={fetchMore}>
            {loading ? <CircularProgress /> : "Fetch More"}
          </Button>
        )}
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
