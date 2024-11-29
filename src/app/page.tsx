import { Container, Typography, Box } from '@mui/material'
import Navigation from '@/components/navigation'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            textAlign: 'center',
            gap: 4,
          }}
        >
          <Image
            src="/placeholder.svg"
            alt="Star Wars Logo"
            width={400}
            height={200}
            priority
          />
          <Typography variant="h1" component="h1" color="primary">
            Star Wars Explorer
          </Typography>
          <Typography variant="h5" component="h2" color="text.secondary">
            Explore the vast universe of Star Wars characters, planets, and more
          </Typography>
        </Box>
      </Container>
    </main>
  )
}
