
import { useState } from 'react';
import './App.css';
import { mockCars } from './MockData';
import PersonList from './components/Persons';
import CreatePerson from './components/CreatePersons';




function App() {
  const [mainColumn,setMainColumn] = useState();
  return (
    <>
    <div className="App">
      <div className='row navbar'>
        <button className='button' onClick={()=>(setMainColumn(<PersonList/>))}>Show persons</button>
        
        <button className='button' onClick={()=>(setMainColumn(<CreatePerson/>))}>Create new person</button>
      </div>
      <div className="row">
        <div className="column side"></div>
        <div className="column center" id="MainColumn">
          {mainColumn}
        </div>
        <div className="column side"></div>
      </div>
    </div>
    </>
    
  );

  
}

export default App;

