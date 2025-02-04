'use client'
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
    const isHomePages = pathname !== '/auth/login' && pathname !== '/auth/register';
    const router = useRouter()
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

    const cardContent = (
        <div>
            <Empty
                image={
                    <i className="ri-shopping-cart-2-fill text-primary"></i>
                }
                styles={{ image: { height: 25, scale: 1.5 } }}
                description={
                    <div>
                        Card empty
                    </div>
                }
            >
            </Empty>
        </div>
    )

    const profileContent = (
        <div>
            {currentUser ?
                (
                    <div className='flex flex-col gap-y-3'>
                        <div
                            onClick={() => router.push('/dashboard')}
                            className='cursor-pointer hover:bg-teal-800/70 rounded-lg hover:text-white py-1 px-2'><i className="ri-dashboard-fill mr-2"></i>
                            <span>dashboard</span></div>
                        <div
                            onClick={() => onLogout()}
                            className='cursor-pointer hover:bg-teal-800/70 rounded-lg hover:text-white py-1 px-2'><i className="ri-logout-circle-r-line mr-2"></i>
                            <span>logout</span></div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-y-3'>
                        <div
                            onClick={() => router.push('/auth/login')}
                            className='cursor-pointer hover:bg-teal-800/70 rounded-lg hover:text-white py-1 px-2'>
                            <i className="ri-dashboard-fill mr-2"></i>
                            login</div>
                        <div
                            onClick={() => router.push('/auth/register')}
                            className='cursor-pointer hover:bg-teal-800/70 rounded-lg hover:text-white py-1 px-2'>
                            <i className="ri-logout-circle-line mr-2"></i>
                            signup</div>
                    </div>
                )
            }
        </div>
    )

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
                        <div className='bg-white/50 shadow-md  backdrop-blur-md p-4 flex justify-between items-center'>
                            <div className='font-bold italic text-2xl'><Link className='no-underline text-primary' href='/'>Shopping</Link></div>
                            <div className='flex flex-row-reverse gap-8'>
                                <Link className='group no-underline text-primary hover-underline' href='/'>Home
                                </Link>
                                <Link className='no-underline text-primary hover-underline' href='/products'>Products</Link>
                                <Link className='no-underline text-primary hover-underline' href='/about'>About</Link>
                                <Link className='no-underline text-primary hover-underline' href='/contact'>Contact</Link>
                            </div>
                            <div className='flex gap-x-6 items-center'>
                                <Popover content={cardContent} trigger="click">
                                    <div className='rounded-full px-2 py-1 justify-center items-center text-primary text-xl cursor-pointer'>
                                        <i className="ri-shopping-cart-2-fill"></i>
                                    </div>
                                </Popover>

                                <Popover content={profileContent} trigger="click">
                                    <div className='bg-primary text-white  px-2 py-1 rounded-full text-xl justify-center items-cente cursor-pointer'>
                                        {currentUser ? <span className='px-1'>{currentUser.name[0]}</span> : <i className="ri-user-3-fill"></i>}
                                    </div>
                                </Popover>
                            </div>
                        </div>
                        <div className='p-5'>{children}</div>
                        <footer className="fixed p-3 bottom-0 w-full items-center text-center text-sm bg-gray-100">
                            <div >Alright reseved by <a target='_blank' href='https://github.com/nazaninjahant/' className='no-underline text-primary font-semibold italic'>BlackAnt</a> @2025</div>
                        </footer>
                    </div>
                )
            }
                {!isHomePages && children}
            </div>
        </div>
    )
}


