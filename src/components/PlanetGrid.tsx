import { Grid } from '@mui/material';
import PlanetCard from './PlanetCard';
import type { Planet } from '@/types/api';

interface PlanetGridProps {
  planets: Planet[];
}

export default function PlanetGrid({ planets }: PlanetGridProps) {
  return (
    <Grid container spacing={3}>
      {planets.map((planet) => (
        <Grid item xs={12} sm={6} md={4} key={planet.url}>
          <PlanetCard
            name={planet.name}
            climate={planet.climate}
            population={planet.population}
            terrain={planet.terrain}
            url={planet.url}
          />
        </Grid>
      ))}
    </Grid>
  );
}
