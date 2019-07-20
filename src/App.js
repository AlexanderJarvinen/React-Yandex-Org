import React from 'react';
import Autocomplete from './Autocomplete';
import './App.css';

function App() {

  
  const params = {
      text: "ООО",
      type : "biz",
      lang : "ru_RU",
      apikey : "232dd8ba-3670-4481-a1c4-75abae2193a4"
    };
   
   const [org_data] = React.useState([]);
   const [queries_arr, setQueriesArr] = React.useState([""]);
  

  async function loadOrganisations (text) {
       let search_arr = [""];
       try {
           
           const response = await fetch("https://search-maps.yandex.ru/v1/?text=" + text + "&type="+ params.type +"&lang=" + params.lang + "&apikey=" + params.apikey, {
                                          method: "GET"
                                        });
           
           const responseJson = await response.json();

           if (responseJson.features.length != 0) {
              Object.keys(responseJson.features).map((item) => {
                 search_arr.push(item.properties)
              })
           }
           
           setQueriesArr(search_arr);

           alert(JSON.stringify(responseJson.features))
       } catch(error){
            console.error(error);
       }
  }

  return (
    <div className="App">
      <div className="App-body">
        <h1>Справочник организаций яндекс</h1>
        <Autocomplete 
          queries={queries_arr}
          loadOrg = {loadOrganisations} 
         />
      </div>
    </div>
  );
}

export default App;
