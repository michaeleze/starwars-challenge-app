import { CharacterCardProps } from '@/types/api';
import { Card, CardContent, Typography, Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';

const styles = {
  link: {
    textDecoration: 'none',
    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)', transition: '0.2s' },
  },
};

export default function CharacterCard({
  name,
  birthYear,
  gender,
  url,
}: CharacterCardProps) {
  const id = url.split('/').slice(-2)[0];

  return (
    <MuiLink
      component={NextLink}
      href={`/characters/${id}`}
      underline="none"
      sx={styles.link}
    >
      <Card sx={{ borderRadius: '16px' }}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {name}
          </Typography>
          <Typography color="text.secondary">Birth Year: {birthYear}</Typography>
          <Typography color="text.secondary">Gender: {gender}</Typography>
        </CardContent>
      </Card>
    </MuiLink>
  );
}
