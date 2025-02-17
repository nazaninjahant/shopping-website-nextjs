'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loader from '@/components/Loader'
import { SetCurrentUser } from '@/redux/userSlice'
import { Empty, Popover } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster, toast } from 'sonner'

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
    const { currentUser } = useSelector((state: any) => state.user)
    const [loading, setLoading] = React.useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const isHomePages = pathname !== '/auth/login' && pathname !== '/auth/register';
    const dispatch = useDispatch()
    const getCurrentUser = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/auth/currentuser')
            dispatch(SetCurrentUser(response.data.data))
        } catch (error: any) {
            console.log(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }

    const onLogout = async () => {
        try {
            setLoading(true)
            await axios.get('/api/auth/logout')
            dispatch(SetCurrentUser(null))
            toast.success('Logout sucessfully')
            router.push('/auth/login')
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isHomePages) {
            getCurrentUser()
        }
    }, [pathname, isHomePages])

    return (
        <div>
            {loading && <Loader />}
            <Toaster position="top-center" expand={false} richColors />
            <div>{isHomePages &&
                (
                    <div>
                        <Header onLogout={onLogout} currentUser={currentUser} />
                        <div className='p-5'>{children}</div>
                        <Footer />
                    </div>
                )
            }
                {!isHomePages && children}
            </div>
        </div>
    )
}


