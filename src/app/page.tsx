import { Container, Typography, Box } from '@mui/material';
import Image from 'next/image';
import { PAGE } from '@/constants/constants';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    textAlign: 'center',
    gap: 4,
  }
};

export default function Home() {
  return (
    <main>
      <Container maxWidth="lg">
        <Box sx={styles.wrapper}>
          <Image
            src={PAGE.homeImageUrl}
            alt="Star Wars Logo"
            width={400}
            height={400}
            objectFit="contain"
            priority
            style={{ borderRadius: '16px' }}
          />
          <Typography variant="h1" component="h1" color="primary">
            {PAGE.title}
          </Typography>
          <Typography variant="h5" component="h2" color="text.secondary">
            {PAGE.subTitle}
          </Typography>
        </Box>
      </Container>
    </main>
  )
};
