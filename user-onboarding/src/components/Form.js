import React from 'react'

export default function FriendForm(props) {
  const {
    values,
    submit,
    change,
    disabled,
    errors,
  } = props

  const onSubmit = evt => {
    evt.preventDefault()
    submit()
  }

  const onChange = evt => {
    const { name, value, checked, type } = evt.target
    const valueToUse = type === 'checkbox' ? checked : value;
    change(name, valueToUse)
  }

  return (
    <form className='form container' onSubmit={onSubmit}>
      <div className='form-group submit'>
        <h2>Add User</h2>

        <button disabled={disabled}>submit</button>

        <div className='errors'>
          <div>{errors.username}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.termsofservice}</div>
        </div>
    </div>

    <div className='form-group inputs'>
        <h4>General information</h4>
        <label>Name
          <input
            value={values.name}
            onChange={onChange}
            name='name'
            type='text'
          />
        </label>

        <label>Email
          <input
            value={values.email}
            onChange={onChange}
            name='email'
            type='text'
          />
        </label>
    </div>

      <div className='form-group checkboxes'>
        <h4>Terms of Service</h4>
        <label>Terms of Service
          <input
            type='checkbox'
            name='termsofservice'
            checked={values.termsofservice}
            onChange={onChange}
          />
        </label>

        </div>
    </form>
  )
}