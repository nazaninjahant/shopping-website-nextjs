'use client'
import { getFieldRequiredRules } from '@/app/helpers/validations';
import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import React from 'react'

interface userType {
    name: string;
    email: string;
    password: string;
}

function Register() {
    const onRegister = (values: userType) => {
        console.log(values)
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen'>
            <div className='h-full bg-primary hidden md:flex items-center justify-center'>
                <h1 className='text-white font-semibold text-7xl'>Shpping</h1>
            </div>

            <div className='h-full flex items-center justify-center px-6'>
                <Form className='w-[400px] flex flex-col gap-y-4' layout='vertical'
                    onFinish={onRegister}
                >
                    <h1>Register</h1>
                    <p className='font-light mb-4'>Welcome to the Shopping 👋 </p>
                    <Form.Item name='name' label='Name' rules={getFieldRequiredRules('Please enter youre name')}>
                        <Input autoComplete="new-password" placeholder='Enter youre Name' className='w-full h-[45px]' type='text'></Input>
                    </Form.Item>

                    <Form.Item name='email' label='Email' rules={getFieldRequiredRules('Please enter youre email')}>
                        <Input autoComplete="email" placeholder='Enter youre Email' className='w-full h-[45px]' type='email'></Input>
                    </Form.Item>

                    <Form.Item name='password' label='Password' rules={getFieldRequiredRules('Please enter youre password')}>
                        <Input.Password autoComplete="new-password" className='w-full h-[45px]' type='password'></Input.Password>
                    </Form.Item>

                    <Button type='primary' className='my-5' htmlType='submit' block>Register</Button>

                    <Link className='text-primary' href='/auth/login'>Already have an account ? Login</Link>
                </Form>
            </div>
        </div>
    )
}

export default Register