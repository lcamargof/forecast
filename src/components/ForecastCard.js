import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
    border: '1px #ccc solid',
  },
});

const ForecastCard = ({ data, classes }) => (
  <div className={classes.root}>
    {data.dt_txt.split(' ')[0]}
    <p>
      <strong>{data.main.temp} °C </strong><br/>
      {data.wind.speed} m/s <br/>
      {data.main.pressure} hpa <br/>
      {data.main.humidity} %
    </p>
  </div>
);

ForecastCard.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForecastCard);