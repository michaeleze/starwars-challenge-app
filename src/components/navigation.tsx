'use client'

import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Star Wars Explorer
        </Typography>
        <Button
          color="inherit"
          component={Link}
          href="/"
          sx={{ color: pathname === '/' ? 'primary.main' : 'inherit' }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          href="/characters"
          sx={{ color: pathname === '/characters' ? 'primary.main' : 'inherit' }}
        >
          Characters
        </Button>
        <Button
          color="inherit"
          component={Link}
          href="/planets"
          sx={{ color: pathname === '/planets' ? 'primary.main' : 'inherit' }}
        >
          Planets
        </Button>
      </Toolbar>
    </AppBar>
  )
}
