import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'

function Register() {


  const onFinish = (values) => {
    console.log('Recieved values of form:', values)
  }

  return (
    <div className='authentication'>
      <div className='authentication-from card p-3'>
        <h1 className='card-title'>Hey there!</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label='Name' name='name'>
            <Input placeholder="Name"/>
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <Input placeholder="Email"/>
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input placeholder="Password" type="password"/>
          </Form.Item>

          <Button className='primary-button my-2' htmlType='submit'>Register</Button>

          <Link to='/login' className='anchor mt-2'>Login</Link>

        </Form>
      </div>
    </div>
  )
}

export default Register