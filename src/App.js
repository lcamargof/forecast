import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import MainAppBar from './components/MainAppBar';
import SearchHistory from './components/SearchHistory';
import { withStyles } from 'material-ui';
import SearchForm from './components/SearchForm';
import Forecast from './components/Forecast';
import { API_KEY, API_URL } from './constants/config';

const styles = () => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    height: 'calc(100vh - 64px)',
  },
  container: {
    flexGrow: 1,
  },
  history: {
    width: 250,
    borderRight: '1px solid #ccc',
    height: '100%',
  },
});

function parseData(data) {
  const result = [];
  const hour = data.list[0].dt_txt.split(' ')[1];
  let date = '';
  data.list.forEach((item) => {
    const currentDate = item.dt_txt.split(' ');
    if (currentDate[1] === hour && currentDate[0] !== date) {
      date = currentDate[0];
      result.push(item);
    }
  });

  return Object.assign({}, data, { list: result });
}

export class App extends Component {

  state = {
    fetching: false,
    searchError: '',
    data: [],
    history: [],
    fetchingHistory: false,
  };

  componentDidMount() {
    this.getHistory();
  }

  getHistory = async () => {
    this.setState({ fetchingHistory: true });
    try {
      const result = await Axios.get(`${API_URL}history`);
      this.setState({ fetchingHistory: false, history: result.data.data });
    } catch (err) {
      this.setState({ fetchingHistory: false });
    }
  };

  // TODO: Keeping it straight
  handleSearch = async (search) => {
    this.setState({ fetching: true, searchError: '' });
    try {
      const url = `http://api.openweathermap.org/data/2.5/forecast?id=${search.id}&APPID=${API_KEY}&units=metric`;
      this.saveHistory(search);
      const result = await Axios.get(url);
      const data = parseData(result.data);
      this.setState({ fetching: false, data });
    } catch (error) {
      console.error('ERROR FETCHING DATA', error);
      this.setState({ fetching: false, searchError: 'Connection error' });
    }
  };

  saveHistory = async (search) => {
    try {
      const result = await Axios.post(`${API_URL}history`, {
        id: search.id,
        name: search.name,
        country: search.country
      });

      this.setState({ history: [result.data.data, ...this.state.history] });
    } catch (error) {
      console.error('Error saving history', error);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <MainAppBar />
        <div className={classes.root}>
          <div className={classes.history}>
            <SearchHistory
              onSearch={this.handleSearch}
              history={this.state.history}
              loading={this.state.fetchingHistory}
            />
          </div>
          <div className={classes.container}>
            <SearchForm onSearch={this.handleSearch} />
            <Forecast data={this.state.data} loading={this.state.fetching} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
