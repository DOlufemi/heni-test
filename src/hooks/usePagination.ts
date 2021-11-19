import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchCountries } from "./useFetchCountries";

export const usePagination = <T>(data: T[], limit: number) => {
  const [indexCursor, setIndexCursor] = useState(0);
  const result = useMemo(
    () => data.slice(0, indexCursor + limit + 1),
    [indexCursor]
  );
  const fetchMore = () => setIndexCursor(limit);
  return {
    data: result,
    fetchMore,
  };
};

export const usePaginationQuery = (limit: number) => {
  const { data, loading } = useFetchCountries();
  const [indexCursor, setIndexCursor] = useState(0);
  const result = useMemo(
    () => (!loading ? data?.countries.slice(0, indexCursor + limit ) : []),
    [loading, data, indexCursor, limit]
  );
  const fetchMore = useCallback(() => setIndexCursor((i) => i + limit), []);
  return {
    data: result,
    fetchMore,
    loading,
  };
};
