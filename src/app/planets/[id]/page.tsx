'use client';

import { useParams } from 'next/navigation';
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
import Attribute from '@/components/Attribute';
import Section from '@/components/Section';
import { useFetch } from '@/hooks/useFetch';
import { PlanetDetails } from '@/types/api';

export default function PlanetDetail() {
  const { id } = useParams();

  const { data, isLoading, error } = useFetch<PlanetDetails>({
    endpoint: `planets/${id}`,
  });

  const planet = data as PlanetDetails;

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box display="flex" justifyContent="center">
          <CircularProgress color="primary" size={64} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error">Error: {error.message}</Alert>
      </Container>
    );
  }

  if (!planet) {
    return null;
  }

  const attributes = [
    { label: 'Rotation Period', value: `${planet.rotation_period} hours` },
    { label: 'Orbital Period', value: `${planet.orbital_period} days` },
    { label: 'Diameter', value: `${planet.diameter} km` },
    { label: 'Climate', value: planet.climate },
    { label: 'Gravity', value: planet.gravity },
    { label: 'Terrain', value: planet.terrain },
    { label: 'Surface Water', value: planet.surface_water },
    { label: 'Population', value: planet.population },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Button
        component={Link}
        href="/planets"
        variant="text"
        startIcon={<span>&larr;</span>}
        sx={{ mb: 2 }}
      >
        Back to Planets
      </Button>
      <Card sx={{ backgroundColor: 'grey.900', color: 'white', borderRadius: '16px', p: 2 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            {planet.name}
          </Typography>
          <Grid container spacing={2}>
            {attributes.map((attr, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Attribute label={attr.label} value={attr.value} />
              </Grid>
            ))}
          </Grid>
          <Section title="Films" items={planet.films} />
        </CardContent>
      </Card>
    </Container>
  );
}
