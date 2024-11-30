'use client';

import { useState } from 'react';
import { Container, CircularProgress, Typography, Box } from '@mui/material';
import { useFetch } from '@/hooks/useFetch';
import type { ApiResponse, Person } from '@/types/api';
import { PAGE } from '@/constants/constants';
import PaginationControls from '@/components/PaginationControls';
import SearchBar from '@/components/Searchbar';
import CharacterGrid from '@/components/CharacterGrid';

export default function CharactersPage() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const { data, isLoading, error } = useFetch<Person>({ endpoint: 'people', page, search});

  const characters = data as ApiResponse<Person>;

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
        label={PAGE.charactersSearchBarLabel}
      />

      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {data && <CharacterGrid characters={characters.results} />}
          {data && (
            <PaginationControls
              count={Math.ceil(characters.count / 10)}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    </Container>
  );
}
