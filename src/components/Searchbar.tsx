import { TextField } from '@mui/material';

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export default function SearchBar({ value, onChange, label }: SearchBarProps) {
  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      sx={{ mb: 4 }}
      data-testid="searchbar"
    />
  );
}
