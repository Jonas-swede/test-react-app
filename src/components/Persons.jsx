import React from "react";
import axios from 'axios';
import Person from '../components/Person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from "@fortawesome/free-solid-svg-icons";


class Persons extends React.Component {
  state ={
    persons:[],
    nameSort:true
  }
  constructor(props) {
    super(props)

    this.handlePersons = this.handlePersons.bind(this)
    
    
  }

  handlePersons(props) {
    this.setState(prevState=>({persons:prevState.persons.filter(person=>person.id!==props)}))
  }

  

  componentDidMount() {
    
    axios.get(`https://localhost:44310/API/getpersons`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      });
      
      
  }

  handleSort (){
    const persons =[...this.state.persons].sort((a,b)=>{
      this.state.nameSort?this.setState({nameSort:false}):this.setState({nameSort:true});
      
      return this.state.nameSort?(a.Name<b.Name?1:-1):(a.Name>b.Name?1:-1)
    })
    this.setState({persons})
  }
  

  render() {
    return (
      
      <>
        {
          <div>
            <div className='personHeader'>
              <span>
                <span>Person id  </span>
                
              </span>
              <span>
                <button className='button sortButton' onClick={()=>(this.handleSort())}>Person name  <FontAwesomeIcon icon={faSort} /></button>
              </span>
              
            </div>
            <div className="personDiv">
              {
                this.state.persons.map(element => {
                  return <Person key={element.id} data={element} handlePersons = {this.handlePersons}/>
                })
              }
              
            </div>
          </div>
        }
      </>
    )
  }
  
}


export default Persons;


