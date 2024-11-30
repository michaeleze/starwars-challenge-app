import { Box, Pagination } from '@mui/material';

interface PaginationControlsProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function PaginationControls({
  count,
  page,
  onChange,
}: PaginationControlsProps) {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Pagination count={count} page={page} onChange={onChange} color="primary" data-testid="pagination" />
    </Box>
  );
}
