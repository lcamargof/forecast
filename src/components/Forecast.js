import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Table, TableBody, TableCell, TableRow, withStyles } from 'material-ui';
import { Line as LineChart } from 'react-chartjs-2';
import ForecastCard from './ForecastCard';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    display: 'flex',
  },
  left: {
    width: '300px',
    marginRight: theme.spacing.unit * 2,
  },
  right: {
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
  },
  cardContainer: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
  },
  placeholder: {
    textAlign: 'center',
    color: '#ccc',
    marginTop: theme.spacing.unit * 2,
    fontSize: '42px',
  },
  progress: {
    marginTop: theme.spacing.unit * 2,
    textAlign: 'center',
  },
});

const Forecast = ({ classes, data, loading }) => {

  if (!loading && data.city) {
    const today = data.list[0];
    const chartData = {
      labels: data.list.map(item => item.dt_txt.split(' ')[0]),
      datasets: [
        {
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          label: 'Temperature °C',
          data: data.list.map(item => item.main.temp),
        }
      ]
    };

    return (
      <div className={classes.root}>
        <div className={classes.left}>
          <h3>Weather in {data.city.name}, {data.city.country}</h3>
          <h2>{today.main.temp} °C</h2>
          <p>{today.weather.description}</p>
          <p>{today.dt_txt}</p>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Wind</TableCell>
                <TableCell>{today.wind.speed} m/s</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pressure</TableCell>
                <TableCell>{today.main.pressure} hpa</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Humidity</TableCell>
                <TableCell>{today.main.humidity}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sea Level</TableCell>
                <TableCell>{today.main.sea_level}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Geo coords</TableCell>
                <TableCell>[{data.city.coord.lat}, {data.city.coord.lon}]</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className={classes.right}>
          <LineChart data={chartData} height={100} />
          <h3 className={classes.title}>Forecast</h3>
          <div className={classes.cardContainer}>
            {
              data.list.map(item => (
                <ForecastCard key={item.dt} data={item} />
              ))
            }
          </div>
        </div>
      </div>
    );
  } else if (loading) {
    return <p className={classes.progress}><CircularProgress size={50} /></p>
  } else {
    return <div className={classes.placeholder}>
      <i>Please select a city</i>
    </div>
  }
};

Forecast.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Forecast);