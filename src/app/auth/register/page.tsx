'use client'
import { getFieldRequiredRules } from '@/app/helpers/validations';
import { Button, Form, Input } from 'antd'
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { Toaster, toast } from 'sonner'

interface userType {
    name: string;
    email: string;
    password: string;
}

function Register() {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)

    const onRegister = async (values: userType) => {
        try {
            setLoading(true)
            await axios.post('/api/auth/register', values);
            toast.success("Registaration successful ");
            router.push("/auth/login");
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Toaster position="top-center" expand={false} richColors />
            <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen'>

                <div className='h-full bg-primary hidden md:flex items-center justify-center'>
                    <h1 className='text-white italic font-semibold text-7xl'>Shopping</h1>
                </div>

                <div className='h-full flex items-center justify-center px-6'>
                    <Form className='w-[400px] flex flex-col gap-y-4' layout='vertical'
                        onFinish={onRegister}
                    >
                        <span className='cursor-pointer' onClick={() => router.push('/')}>/ Home</span>
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

                        <Button type='primary' className='my-5' htmlType='submit' loading={loading} block>Register</Button>

                        <Link className='text-primary' href='/auth/login'>Already have an account ? Login</Link>
                    </Form>
                </div>
            </div></>
    )
}

export default Register