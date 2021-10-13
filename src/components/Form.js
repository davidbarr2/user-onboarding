import axios from "axios";
import React, {useEffect, useState} from "react";
import * as yup from 'yup'

    const schema =yup.object().shape({
        name: yup.string().required('user is required'),
        password: yup.string().required('password is required').min(6, 'password needs to be 6 characters minimum'),
        email: yup.string(),
        terms: yup.boolean().oneOf([true], 'you must agree to the Terms of Service')
    })

function Form({users,setUsers}) {
    const initialFormValues = {name: '', password: '', email: '', terms: false}

    const [form,setForm] = useState(initialFormValues)
    const [disabled, setDisabled] = useState(true)
    const [errors, setErrors] = useState({name: '', password: '', email: '', terms: ''})

    const setFormErrors = (name,value) => {
        yup.reach(schema,name).validate(value)
            .then(() => setErrors({...errors, [name]: ''}))
            .catch( err => setErrors({...errors, [name]: err.errors[0]}))
    }

    const change = (event) => {
        const { name, type, value, checked} = event.target
        const valueToUse = type === 'checkbox' ? checked : value
        setForm({...form, [name]: valueToUse})
        setFormErrors(name,valueToUse)
    }

    const submit = event => {
        event.preventDefault()
        const newUser = {name: form.name.trim(), password: form.password, email: form.email, terms: form.terms}
        axios.post('https://reqres.in/api/users', newUser)
            .then( res => {
                console.log(res)
                setUsers(users.concat(newUser))
            })
            .catch( err => console.log('error ' + err))
        setForm(initialFormValues)
    }

    useEffect(() => {
        schema.isValid(form).then(valid => setDisabled(!valid))
    }, [form])

  return (
    <div className="App">
      <form onSubmit={submit}>
          <div>{errors.name}</div>
          <div>{errors.password}</div>
          <div>{errors.email}</div>
          <div>{errors.terms}</div>
          <label>Name
            <input onChange={change} value={form.name} name="name" type="text"/>
          </label>

          <label>Password
            <input onChange={change} value={form.password} name="password" type="text"/>
          </label>

          <label>Email
            <input onChange={change} value={form.email} name="email" type="text"/>
          </label>

          <label>Terms of Service
            <input onChange={change} checked={form.terms} name="terms" type="checkbox"/>
          </label>

          <button disabled={disabled}>Submit</button>
      </form>
    </div>
  );
}

export default Form;
