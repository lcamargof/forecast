import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, withStyles } from 'material-ui';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
  },
  header: {
    padding: theme.spacing.unit * 2,
    backgroundColor: '#f5f5f5',
    fontWeight: '700',
    textAlign: 'center',
  },
  list: {
    flexGrow: 1,
    textAlign: 'center',
    height: 'calc(100% - 51px)',
    overflow: 'scroll',
  },
  listItem: {
    borderBottom: '1px #ccc solid',
  },
});

const SearchHistory = ({ classes, history, onSearch }) => {

  return (
    <div className={classes.root}>
      <div className={classes.header}>Search History</div>
      <List className={classes.list} component="nav">
        { !history.length && <ListItem>No history found :(</ListItem> }
        {
          history.map(item => (
            <ListItem onClick={() => onSearch(item)} className={classes.listItem} key={item.id} button>
              <div>
                {item.country} - {item.name} <br/>
                <i>{item.date.split('.')[0]}</i>
              </div>
            </ListItem>
          ))
        }
      </List>
    </div>
  );
};

SearchHistory.propTypes = {
  history: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchHistory);