import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, withStyles } from 'material-ui';
import Downshift from 'downshift';
import SearchSuggestions from './SearchSuggestions';

const styles = theme => ({
  root: {
    display: 'flex',
    borderBottom: '1px solid #ccc',
    padding: theme.spacing.unit * 2,
    width: '100%',
  },
  formControl: {
    marginRight: theme.spacing.unit * 2,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  container: {
    width: 300,
    position: 'relative',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
});

export class SearchForm extends Component {

  handleChange = (item) => {
    this.props.onSearch(item);
  };

  parseItem(item) {
    return item ? item.name : ''
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Downshift
          onChange={this.handleChange}
          itemToString={this.parseItem}
        >
          {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
            <div className={classes.container}>
              <TextField
                InputProps={{
                  classes: {
                    root: classes.inputRoot,
                  },
                  ...getInputProps({ placeholder: 'Search by city', id: 'search' }),
                }}
                fullWidth
              />
              { isOpen ? (
                <SearchSuggestions
                  inputValue={inputValue}
                  selectedItem={selectedItem}
                  getItemProps={getItemProps}
                  highlightedIndex={highlightedIndex }
                />
              ) : null }
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

SearchForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchForm);
