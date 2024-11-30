import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

interface SectionProps {
  title: string;
  items: string[];
}

export default function Section({ title, items }: SectionProps) {
  return (
    <Box mt={4}>
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      <List dense>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
