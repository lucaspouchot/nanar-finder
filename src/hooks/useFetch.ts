import { useEffect, useState } from "react";

export interface FetchGetResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetchGet<T>(url: URL | string | null): FetchGetResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) {
      return;
    }
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          setError(new Error(res.statusText));
          return;
        }
        setData(await res.json());
        setError(null);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        } else {
          setError(new Error(`${e}`));
        }
      }
      setLoading(false);
    };
    fetchData().then();
    return () => {
      controller.abort();
    }
  }, [url]);
  return {
    data,
    loading,
    error,
  };
}
