import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './Autocomplete.css';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  }

}));


class Autocomplete extends Component {
   
    static propTypes = {
       queries: PropTypes.array,
       loadOrg: PropTypes.func

    };

    static defaultProperty={
        queries: []
      };

    constructor(props) {
	    super(props);
	    this.state = {
	      activeQuery: 0,
	      filteredQueries: [],
	      showQueries: false,
	      userInput: ''
	    };
  }

  onChange = (e) => {
    this.props.loadOrg(e.currentTarget.value);

    this.setState({userInput: e.currentTarget.value});

    const { queries } = this.props;
    const input = e.currentTarget.value;

    const filteredQueries = queries.filter(
      (query) =>
        query.toLowerCase().indexOf(input.toLowerCase()) > -1
    );

    this.setState({
      activeQuery: 0,
      filteredQueries,
      showQueries: true
    });
     
     
  };

  onClick = (e) => {
    this.setState({
      activeQuery: 0,
      filteredQueries: [],
      showQueries: false,
      userInput: e.currentTarget.innerText,
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


render () {

	let queriesListComponent = null;

	let { showQueries, userInput, filteredQueries, activeQuery } = this.state;

	if (showQueries && userInput) {
      if (filteredQueries.length) {
        queriesListComponent = (
          <ul className="queries">
            {filteredQueries.map((query, index) => {

              return (
                <li  key={query} onClick={this.onClick} className={index == activeQuery?'active':null}>
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
	       <div className="query_list">
	        {queriesListComponent}
	       </div>
       </React.Fragment>
	  );
	}
}

export default Autocomplete;