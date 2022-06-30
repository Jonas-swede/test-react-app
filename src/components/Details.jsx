import React from 'react';
import { useFormik } from 'formik';

import axios from 'axios';

function Details (input){
  return(
    <>
    
    <table>
      <thead>
        <tr>
          <td>Person name</td>
          <td>City</td>
          <td>Country</td>
          <td>Person phone number</td>
          <td>Person languages</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{input.value.Name}</td>
          <td>{input.value.CityName}</td>
          <td>{input.value.CountryName}</td>
          <td>{input.value.PhoneNumber}</td>
          <td className="languages">{
                input.value.PersonLanguages.map(el=>{
                    return <div key={el.LanguageId}>{el.LanguageName}</div>
                })}</td>
          <td>
            <button onClick={()=>(
              DeletePerson(input.value.id),
              input.handlePersons(input.value.id)
              )}>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    
      
    </>
  )
}

function DeletePerson(input){
  console.log('id :',input);
  axios.post('https://localhost:44310/API/DeletePerson',null,{params:{id:input}})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});
}

function SignupForm () {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Details;