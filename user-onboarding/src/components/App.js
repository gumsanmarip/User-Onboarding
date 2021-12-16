import React, {useState, useEffect} from "react";
import Form from './Form';
import User from './User';
import axios from 'axios';
import schema from './validation/formSchema'
import * as yup from 'yup'

const initialFormValues = {
  username: '',
  email: '',
  tos: false,
}
const initialFormErrors = {
  username: '',
  email: '',
  tos: '',
}
const initialUsers = []
const initialDisabled = true


export default function App() {
  const [users, setUsers] = useState(initialUsers)          
  const [formValues, setFormValues] = useState(initialFormValues) 
  const [formErrors, setFormErrors] = useState(initialFormErrors) 
  const [disabled, setDisabled] = useState(initialDisabled)       

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(resp => {
        setUsers(resp.data);
      }).catch(err => console.error(err))
  }

  const postNewUser = newUsers => {
    axios.post('https://reqres.in/api/users', newUsers)
      .then(resp => {
        setUsers([ resp.data, ...users ]);
      }).catch(err => console.error(err))
      .finally(() => setFormValues(initialFormValues))
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  const formSubmit = () => {
    const newUser = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    }
    postNewUser(newUser);
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])
  

  return (
    <div className='container'>
      <header><h1>Users</h1></header>

      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  )
}