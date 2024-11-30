'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiResponse } from '@/types/api';

const BASE_URL = 'https://swapi.py4e.com/api';

type UseFetchParams = {
  endpoint: string;
  page?: number;
  search?: string;
  id?: string[];
}

export function useFetch<T>({
  endpoint,
  page = 1,
  search = '',
  id,
}: UseFetchParams) {
  const [data, setData] = useState<T | ApiResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = id
        ? `${BASE_URL}/${endpoint}/${id}/`
        : `${BASE_URL}/${endpoint}/?${new URLSearchParams({
          ...(search && { search }),
          ...(page && { page: page.toString() }),
        })}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, page, search, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
}
