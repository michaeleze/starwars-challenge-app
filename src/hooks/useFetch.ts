'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiResponse } from '@/types/api';

const BASE_URL = 'https://swapi.py4e.com/api';
const CACHE_NAME = 'swapi-cache'; // Name for your cache

type UseFetchParams = {
  endpoint: string;
  page?: number;
  search?: string;
  id?: string[];
};

export function useFetch<T>({
  endpoint,
  page = 1,
  search = '',
  id,
}: UseFetchParams) {
  const [data, setData] = useState<T | ApiResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Generate a unique cache key based on parameters
  const cacheKey = id
    ? `${endpoint}/${id}`
    : `${endpoint}?${new URLSearchParams({
      ...(search && { search }),
      ...(page && { page: page.toString() }),
    }).toString()}`;

  // Generate a url
  const url = id
    ? `${BASE_URL}/${endpoint}/${id}/`
    : `${BASE_URL}/${endpoint}/?${new URLSearchParams({
      ...(search && { search }),
      ...(page && { page: page.toString() }),
    })}`;

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      // Open the cache
      const cache = await caches.open(CACHE_NAME);

      // Check if the data is already in the cache
      const cachedResponse = await cache.match(cacheKey);

      if (cachedResponse) {
        const cachedData = await cachedResponse.json();
        setData(cachedData as T | ApiResponse<T>);
        setIsLoading(false);
        return;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const json = await response.json();

      // Add the fetched response to the cache
      await cache.put(cacheKey, new Response(JSON.stringify(json)));

      setData(json);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [cacheKey, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
}
