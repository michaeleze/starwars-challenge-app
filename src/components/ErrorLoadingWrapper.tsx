import { Container, Box, CircularProgress, Alert } from "@mui/material";

export default function ErrorLoadingWrapper({isLoading, error, children } : {isLoading: boolean, error: Error | null, children: React.ReactNode}) {

  if (isLoading) {
    return (
      <div>
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
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Alert severity="error">Error: {error.message}</Alert>
        </Container>
      </div>
    );
  }

  return children
}
