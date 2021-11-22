# Countries UI

## Getting Start

It's simple to get started on this app. Just run

```bash
yarn start
```

## Tech Stack

For this app used the following key tools

- Typescript
- React
- Apollo
- Mui (Material UI v5)
- Styled Components

## Key Points

### Pagination - Problem

I spent sometime trying to figure out how I could get GraphQL to return a paginated response,
as opposed to holding the full response in memory and manipulating it on the client-side, as  
this could possibly proof problematic when dealing with larger data-sets.
However, I wasn't able to find a solution that could be implemented without making changes to the graphql server.

### Pagination - Solution

Considering the points made previously, I decided to use React Hooks to render the country component in a somewhat
paginated manner with a custom hook called usePagination

```typescript
export const usePaginationQuery = (limit: number, searchString?: string) => {
  const { data, loading } = useFetchCountries();
  const filterData = useMemo(
    () =>
      searchString
        ? data?.countries.filter((country) =>
            country.name.toLowerCase().includes(searchString.toLowerCase())
          )
        : data?.countries,
    [data, searchString]
  );
  const [indexCursor, setIndexCursor] = useState(0);
  const result = useMemo(
    () => (!loading ? filterData?.slice(0, indexCursor + limit) : []),
    [loading, data, indexCursor, limit, filterData]
  );
  const hasMore = useMemo(
    () => filterData && limit <= filterData.length,
    [filterData]
  );
  const fetchMore = () => setIndexCursor((i) => i + limit);
  return {
    data: result,
    fetchMore,
    loading,
    hasMore,
  };
};
```

#### Pagination - Solution - How it works?

The initial step is to make the GQL query for the list of countries, then filtering the array
based on the `searchString` argument. This was wrapped in a `useMemo` so the result would be
regenerated if the state of the query response or the arguments changes

```typescript
const { data, loading } = useFetchCountries();
const filterData = useMemo(
  () =>
    searchString
      ? data?.countries.filter((country) =>
          country.name.toLowerCase().includes(searchString.toLowerCase())
        )
      : data?.countries,
  [data, searchString]
);
```

The next step was to add logic to slice the response array at a certain point, while allowing
said point to be moved when `fetchMore` is called. This behaviour was design to mimic a cursor.

```typescript
const result = useMemo(
  () => (!loading ? filterData?.slice(0, indexCursor + limit) : []),
  [loading, data, indexCursor, limit, filterData]
);
const fetchMore = () => setIndexCursor((i) => i + limit);
```

The final step was to calculate if `hasMore` would be true or false and this was done by checking if
the limit size surpasses the length of the filtered result list

```typescript
const fetchMore = () => setIndexCursor((i) => i + limit);
```

# UI
A country card was generated for each item in usePagination response which is help as more items can be added to 
the response on the fly.

```typescript
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
        <Typography variant="subtitle1" component="div" bgcolor="primary">
          {country.native}
        </Typography>
        <Typography bgcolor="primary" variant="h1">
          {country.emoji}
        </Typography>
      </CardContent>
    </Card>
  ))}
</CardWrapper>;
{
  hasMore && (
    <Button variant="contained" onClick={fetchMore}>
      {loading ? <CircularProgress /> : "Fetch More"}
    </Button>
  );
}
```

# Extra Credit

- Styled Components: Used to styled the MUI components to make them more suitable
- Theming: This was using to achieve the dark mode toogle
