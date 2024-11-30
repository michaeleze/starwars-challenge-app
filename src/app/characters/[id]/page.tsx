'use client';

import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import {
  Container,
  Box,
  Grid,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import Section from '@/components/Section';
import Attribute from '@/components/Attribute';
import { CharacterDetails } from '@/types/api';
import { PAGE } from '@/constants/constants';
import { useFetch } from '@/hooks/useFetch';

export default function CharacterDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch<CharacterDetails>({ endpoint: `people/${id}` });

  const character = data as CharacterDetails;

  if (isLoading) {
    return (
      <div>
        <Navigation />
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Box display="flex" justifyContent="center">
            <CircularProgress color="primary" size={64} />
          </Box>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navigation />
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Alert severity="error">Error: {error.message}</Alert>
        </Container>
      </div>
    );
  }

  if (!character) {
    return null;
  }

  const attributes = [
    { label: 'Height', value: `${character?.height} cm` },
    { label: 'Mass', value: `${character.mass} kg` },
    { label: 'Hair Color', value: character.hair_color },
    { label: 'Skin Color', value: character.skin_color },
    { label: 'Eye Color', value: character.eye_color },
    { label: 'Birth Year', value: character.birth_year },
    { label: 'Gender', value: character.gender },
    { label: 'Homeworld', value: character.homeworld },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Button
        component={Link}
        href="/characters"
        variant="text"
        startIcon={<span>&larr;</span>}
        sx={{ mb: 2 }}
      >
        {PAGE.backButtonLabel}
      </Button>
      <Card sx={{ backgroundColor: 'grey.900', color: 'white', borderRadius: '16px', p: 2 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            {character.name}
          </Typography>
          <Grid container spacing={2}>
            {attributes.map((attr, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Attribute label={attr.label} value={attr.value} />
              </Grid>
            ))}
          </Grid>
          <Section title="Films" items={character.films} />
        </CardContent>
      </Card>
    </Container>
  );
}