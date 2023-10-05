import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }} component={RouterLink} to="/" color="inherit" underline="none">
          Job Portal
        </Typography>
        <Button color="inherit" component={RouterLink} to="/jobs">
          Jobs
        </Button>
        <Button color="inherit" component={RouterLink} to="/stats">
          Stats
        </Button>
      </Toolbar>
    </AppBar>
  );
}
