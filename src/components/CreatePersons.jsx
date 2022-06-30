import React, { useState } from "react";
import axios from 'axios';
import Select from 'react-select';
import { Formik, Field, Form, useField } from 'formik';
import * as Yup from 'yup';
class CreatePerson extends React.Component{
    state ={
        cities:[],
        languages:[],
        selectOptions:[],
        languageOptions:[]

    }

    async componentDidMount() {
    
        await axios.get(`https://localhost:44310/API/getcities`)
          .then(res => {
            const cities = res.data;
            this.setState({ cities });
            this.setState({selectOptions:this.state.cities.map(city=>
              {
                return({
                  value:city.CityName,
                  label:city.CityName+', '+city.CountryName
                })
              
              })})
        });
        await axios.get(`https://localhost:44310/API/getlanguages`)
          .then(res => {
            const languages = res.data;
            this.setState({ languages });
            this.setState({languageOptions:this.state.languages.map(language=>
              {
                return({
                  value:language.LanguageId,
                  label:language.LanguageName
                })
              
              })})
              
              
        });
          
          
      }
    
    render() {
        const ValidationSchema= Yup.object().shape({
          City:  Yup.string()
          .required('Required'),
          firstName: Yup.string()
            .required('Required'),
          lastName: Yup.string()
          .required('Required'),
          phonenumber: Yup.string()
          .required('Required')
        });
        return(
        <>
        

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          phonenumber: '',
        }}
        validationSchema={ValidationSchema}
        onSubmit={
          async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));

          axios.post(`https://localhost:44310/API/createperson`,null,{params:{
            Name:values.firstName+' '+values.lastName,
            City:values.City,
            PhoneNumber:values.phonenumber,
            FirstLanguage:values.Languages

            }
          })
        }}
      >
        {({ errors, touched }) => (
        <Form>
          <div>
            <label>Select city</label>
            <Field component={SelectField} name="City" 
              options={this.state.selectOptions}
              />
            {errors.City && touched.City ? (
              <div className="Error">{errors.City}</div>
            ) : null}
          </div>
          <div>
            <label>Select language</label>
            <Field component={SelectField} name="Languages" 
              options={this.state.languageOptions}
              />
            {errors.City && touched.City ? (
              <div className="Error">{errors.City}</div>
            ) : null}
          </div>
          
          <div>
            <label htmlFor="firstName">First Name  </label>
            <Field id="firstName" name="firstName" placeholder="First name" />
            {errors.firstName && touched.firstName ? (
              <div className="Error">{errors.firstName}</div>
            ) : null
            }
          </div>
          <div>
            <label htmlFor="lastName">Last Name  </label>
            <Field id="lastName" name="lastName" placeholder="Last name" />
            {errors.lastName && touched.lastName ? (
             <div className="Error">{errors.lastName}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="phonenumber">Phonenumber  </label>
            <Field
              id="phonenumber"
              name="phonenumber"
              placeholder="phonenumber"
              type="phonenumber"
            />
            {errors.phonenumber && touched.phonenumber ? (
              <div className="Error">{errors.phonenumber}</div>
            ) : null}
          </div>
          
          <button type="submit">Submit</button>
        </Form>
        )}
      </Formik>


        </>)
    }
}

function SelectField(props) {
  const [field, state, {setValue, setTouched}] = useField(props.field.name);

  const onChange = ({value}) => {
    setValue(value);
  };

  return (
    <div>
      
      <Select {...props} 
      onChange={onChange} 
      onBlur={setTouched} />
    </div>
    
  );
}


export default CreatePerson;