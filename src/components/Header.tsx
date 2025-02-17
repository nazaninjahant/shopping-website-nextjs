import { Drawer, Empty, Popover } from 'antd'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function Header({ currentUser, onLogout }: HeaderProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [showDrawer, setShowDrawer] = React.useState(false)
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

    const links = [
        {
            path: '/',
            text: 'Home'
        },
        {
            path: '/products',
            text: 'Products'
        },
        {
            path: '/about',
            text: 'About'
        },
        {
            path: '/contact',
            text: 'Contact'
        },
    ]
    return (
        <>
            <div className='fixed top-0 w-full z-20 bg-white/50 shadow-md  backdrop-blur-md p-4 flex justify-between items-center'>
                <div>
                    <span className='text-primary px-2 py-1 text-xl bg-gray-50 rounded-full mr-2 inline lg:hidden'
                        onClick={() => { setShowDrawer(true) }}
                    >
                        <i className="ri-menu-line"></i>
                    </span>
                    <Link className='no-underline text-primary font-bold italic text-2xl' href='/'>
                        Shopping</Link>
                </div>
                <div className='lg:flex lg:flex-row-reverse gap-8 hidden'>
                    {
                        links.map((link: any) => (
                            <Link key={link.text} className={pathname == link.path ? 'underline underline-offset-[6px] decoration-2 text-primary' : 'no-underline text-primary hover-underline'} href='/'>{link.text}
                            </Link>
                        ))
                    }
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
            <Drawer title={<h3 className='text-primary ml-4'>Shopping</h3>} width={270} placement='left' onClose={() => setShowDrawer(false)} open={showDrawer}>

                <div className='flex flex-col gap-y-3 text-lg'>
                    {
                        links.map((link: any) => (
                            <Link key={link.text} className={pathname == link.path ? 'bg-primary text-white rounded-full pl-3 py-1' : 'pl-3 py-1 no-underline text-primary'} href='/'>{link.text}
                            </Link>
                        ))
                    }
                </div>
            </Drawer>
        </>
    )
}

export default Header

interface HeaderProps {
    currentUser: any;
    onLogout: () => void,

}