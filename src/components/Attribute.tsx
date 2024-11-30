import { Typography } from '@mui/material';

interface AttributeProps {
  label: string;
  value: string | number;
}

export default function Attribute({ label, value }: AttributeProps) {
  return (
    <Typography>
      <strong>{label}:</strong> {value}
    </Typography>
  );
}
