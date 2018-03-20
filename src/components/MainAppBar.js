import React from 'react';
import { AppBar, Toolbar, Typography } from 'material-ui';

const MainAppBar = () => (
  <AppBar position="static" color="default">
    <Toolbar>
      <Typography variant="title" color="inherit">
        Your Forecast
      </Typography>
    </Toolbar>
  </AppBar>
);

export default MainAppBar;