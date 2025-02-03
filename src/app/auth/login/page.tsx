'use client'
import { getFieldRequiredRules } from '@/app/helpers/validations';
import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'sonner'
interface userType {
    email: string;
    password: string;
}

function Login() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onLogin = async (values: userType) => {
        try {
            setLoading(true);
            await axios.post('/api/auth/login', values);
            toast.success("Login successful ");
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <Toaster position="top-center" expand={false} richColors />
            <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen'>
                <div className='h-full bg-primary hidden md:flex items-center justify-center'>
                    <h1 className='text-white font-semibold text-7xl'>Shopping</h1>
                </div>

                <div className='h-full flex items-center justify-center px-6'>
                    <Form className='w-[400px] font-medium flex flex-col gap-4' layout='vertical'
                        onFinish={onLogin}
                    >
                        <span className='cursor-pointer' onClick={() => router.push('/')}>/ Home</span>
                        <h1 >Login</h1>
                        <p className='font-light mb-4'>Welcome back to the Shopping 👋 </p>

                        <Form.Item name='email' label='Email' rules={getFieldRequiredRules('Please enter youre email')}>
                            <Input autoComplete="email" placeholder='Enter youre Email' className='w-full h-[45px]' type='email'></Input>
                        </Form.Item>

                        <Form.Item name='password' label='Password' rules={getFieldRequiredRules('Please enter youre password')}>
                            <Input.Password autoComplete="new-password" className='w-full h-[45px]' type='password'></Input.Password>
                        </Form.Item>

                        <Button type='primary' className='my-5' htmlType='submit' block loading={loading} >Login</Button>

                        <Link className='text-primary' href='/auth/register'>Don't have an account ? Register</Link>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login