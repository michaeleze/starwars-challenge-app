'use client';

import { useState } from 'react';
import { Container, CircularProgress, Typography, Box } from '@mui/material';
import PaginationControls from '@/components/PaginationControls';
import { useFetch } from '@/hooks/useFetch';
import type { Planet } from '@/types/api';
import { PAGE } from '@/constants/constants';
import SearchBar from '@/components/Searchbar';
import PlanetGrid from '@/components/PlanetGrid';
import { ApiResponse } from '../../types/api';

export default function PlanetsPage() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const { data, isLoading, error } = useFetch<Planet>({ endpoint: 'planets', page, search});

  const planets = data as ApiResponse<Planet>;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  if (error) {
    return (
      <Container>
        <Typography color="error">Error: {error.message}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <SearchBar
        value={search}
        onChange={handleSearchChange}
        label={PAGE.planetSearchBarLabel}
      />

      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {data && <PlanetGrid planets={planets.results} />}
          {data && (
            <PaginationControls
              count={Math.ceil(planets.count / 10)}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    </Container>
  );
}
