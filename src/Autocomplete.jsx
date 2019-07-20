import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popover';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import './Autocomplete.css';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  typography: {
    padding: theme.spacing(2),
  }

}));

const SearchPopper = withStyles({
  paper: {
    outline: 'none',
    position: 'absolute',
    top: '10%',
    width: '80%',
    maxHeight: 'calc(100% - 32px)',
    minHeight: '20px',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  label: {
    textTransform: 'capitalize',
  },
})(Popper);

class Autocomplete extends Component {
   
    static propTypes = {
       quiries: PropTypes.array
    };

    static defaultProperty={
        quiries: []
      };

    constructor(props) {
	    super(props);
	    this.state = {
	      activeQuery: 0,
	      filteredQueries: [],
	      showQueries: false,
	      userInput: '',
	      anchorEl: null
	    };
  }

  onChange = (e) => {


    const { queries } = this.props;
    const input = e.currentTarget.value;

    const filteredQueries = queries.filter(
      (query) =>
        query.toLowerCase().indexOf(input.toLowerCase()) > -1
    );

    this.setState({
      activeQuery: 0,
      filteredQueries,
      showQueries: true,
      anchorEl: e.currentTarget,
      userInput: e.currentTarget.value
    });
     
     e.currentTarget.focus();
  };

  onClick = (e) => {
    this.setState({
      activeQuery: 0,
      filteredQueries: [],
      showQueries: false,
      userInput: e.currentTarget.innerText,
      anchorEl: null
    });
  };

  onKeyDown = (e) => {
    const { activeQuery, filteredQueries } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeQuery: 0,
        showSuggestions: false,
        userInput: filteredQueries[activeQuery]
      });
    }
    else if (e.keyCode === 38) {
      if (activeQuery === 0) {
        return;
      }

      this.setState({ activeQuery: activeQuery - 1 });
    }
    else if (e.keyCode === 40) {
      if (activeQuery - 1 === filteredQueries.length) {
        return;
      }

      this.setState({ activeQuery: activeQuery + 1 });
    }
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };


render () {

	let queriesListComponent = null;

	let { showQueries, userInput, filteredQueries, anchorEl} = this.state;

	if (showQueries && userInput) {
      if (filteredQueries.length) {
        queriesListComponent = (
          <ul class="queries">
            {filteredQueries.map((query, index) => {

              return (
                <li  key={query} onClick={this.onClick}>
                  {query}
                </li>
              );
            })}
          </ul>
        );
      } else {
        queriesListComponent = (
          <div>
            <em>Ничего не найдено!</em>
          </div>
        );
      }
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

     
      return (
	   <React.Fragment>
        <TextField
	        id="autocomplete"
	        label="Введите данные организации"
	        value={userInput}
	        classNames={useStyles.textField}
	        margin="normal"
	        variant="outlined"
	        fullWidth
	        onChange={this.onChange}
            onKeyDown={this.onKeyDown}

         /> 
          <SearchPopper
	        id={id}
	        open={open}
	        anchorEl={anchorEl}
	        onClose={this.handleClose}
	        anchorOrigin={{
	          vertical: 'bottom',
	          horizontal: 'left',
	        }}
	        transformOrigin={{
	          vertical: 'top',
	          horizontal: 'left',
	        }}
	      >
            {queriesListComponent}
          </SearchPopper>
       </React.Fragment>
	  );
	}
}

export default Autocomplete;