import { Grid } from '@mui/material';
import CharacterCard from './CharacterCard';
import type { Person } from '@/types/api';

interface CharacterGridProps {
  characters: Person[];
}

export default function CharacterGrid({ characters }: CharacterGridProps) {
  return (
    <Grid container spacing={3}>
      {characters.map((person) => (
        <Grid item xs={12} sm={6} md={4} key={person.url}>
          <CharacterCard
            name={person.name}
            birthYear={person.birth_year}
            gender={person.gender}
            url={person.url}
          />
        </Grid>
      ))}
    </Grid>
  );
}
