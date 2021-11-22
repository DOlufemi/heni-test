import { useMemo, useState } from "react";
import { useFetchCountries } from "./useFetchCountries";

export const usePagination = <T>(data: T[], limit: number) => {
  const [indexCursor, setIndexCursor] = useState(0);
  const result = useMemo(
    () => data.slice(0, indexCursor + limit + 1),
    [indexCursor, data, limit]
  );
  const fetchMore = () => setIndexCursor(limit);
  return {
    data: result,
    fetchMore,
  };
};

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
    [loading, indexCursor, limit, filterData]
  );
  const hasMore = useMemo(() => filterData && limit <= filterData.length, [limit, filterData])
  const fetchMore = () => setIndexCursor((i) => i + limit);
  return {
    data: result,
    fetchMore,
    loading,
    hasMore
  };
};
