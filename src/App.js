import React from 'react';
import Autocomplete from './Autocomplete';
import './App.css';

function App() {
  const queries_arr = [
    "Санкт-Петербург",
    "Самара",
    "Сыктывкар",
    "Cуздаль",
    "Саратов",
    "Саранск"
  ]
  return (
    <div className="App">
      <div className="App-body">
        <h1>Справочник организаций яндекс</h1>
        <Autocomplete queries={queries_arr} />
      </div>
    </div>
  );
}

export default App;
