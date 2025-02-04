'use client'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

function Dashboard() {
    const onChange = (key: string) => {
        console.log(key);
    };
    const { currentUser } = useSelector((state: any) => state.user)
    const admin: TabsProps['items'] = [
        {
            key: '1',
            label: 'Products',
            children: 'Content of Products',
        },
        {
            key: '2',
            label: 'Categories',
            children: 'Content of Categories',
        },
        {
            key: '3',
            label: 'Orders',
            children: 'Content of Orders',
        },
        {
            key: '4',
            label: 'Users',
            children: 'Content of Users',
        },
    ];
    const user: TabsProps['items'] = [
        {
            key: '1',
            label: 'Profile',
            children: 'Content of Profile',
        },
        {
            key: '2',
            label: 'Orders',
            children: 'Content of Orders',
        },
    ];
    return (
        <div className='p-5'>
            {currentUser && currentUser.isAdmin && (
                <Tabs indicator={{ size: (origin) => origin - 20, align: 'center' }} defaultActiveKey="1" items={admin} onChange={onChange} />
            )}
            {currentUser && !currentUser.isAdmin && (
                <Tabs defaultActiveKey="1" items={user} onChange={onChange} />
            )}
        </div>
    )
}

export default Dashboard