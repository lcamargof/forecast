import React, { Component } from 'react';
import Axios from 'axios/index';
import { API_URL } from '../constants/config';
import { MenuItem, Paper, withStyles } from 'material-ui';

const styles = theme => ({
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
});

export class SearchSuggestions extends Component {
  state = {
    loading: false,
    items: [],
  };

  componentDidMount() {
    if (this.props.inputValue) {
      this.fetchItems(this.props.inputValue);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inputValue !== this.props.inputValue) {
      this.fetchItems(nextProps.inputValue);
    }
  }

  // TODO: debounce this
  fetchItems = async (value) => {
    if (value) {
      this.setState({ loading: true });
      try {
        const result = await Axios.get(`${API_URL}cities/${value}`);
        this.setState({ items: result.data, loading: false, });
      } catch (error) {
        this.setState({ items: [], loading: false, });
      }
    } else {
      this.setState({ items: [], loading: false });
    }
  };

  renderBody() {
    const { items, loading } = this.state;

    if (loading) {
      return <MenuItem>Loading...</MenuItem>;
    } else {
      if (!items.length) {
        return <MenuItem>No cities found</MenuItem>;
      } else {
        return items.map((item, index) => (
          <MenuItem
            {...this.props.getItemProps({ item })}
            key={item.id}
            selected={this.props.highlightedIndex === index}
            component="div"
            style={{
              fontWeight: ((this.props.selectedItem && this.props.selectedItem.name) || '').indexOf(item.name) > -1 ? 500 : 400,
            }}
          >
            {item.country} - {item.name}
          </MenuItem>
        ))
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper} square>
        { this.renderBody() }
      </Paper>
    );
  }
}

export default withStyles(styles)(SearchSuggestions);