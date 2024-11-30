'use client'

import { PAGE } from '@/constants/constants'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         {PAGE.title}
        </Typography>
        {PAGE.navigation.map((page) => (
          <Button
            key={page.href}
            color="inherit"
            component={Link}
            href={page.href}
            sx={{ color: pathname === page.href ? 'primary.main' : 'inherit' }}
          >
            {page.name}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  )
}
