'use client'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';

function Dashboard() {
    const router = useRouter()
    const { currentUser } = useSelector((state: any) => state.user)
    const admin: TabsProps['items'] = [
        {
            key: '1',
            label: 'Products',
            children: <ProductList></ProductList>,
        },
        {
            key: '2',
            label: 'Categories',
            children: <CategoryList></CategoryList>,
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
    const searchParams = useSearchParams()
    const id = searchParams.get('id') || '1'
    const [selectedTab, setSelectedTab] = React.useState(id)
    return (
        <div className='p-5'>
            {currentUser && currentUser.isAdmin && (
                <Tabs
                    indicator={{ size: (origin) => origin - 20, align: 'center' }}
                    defaultActiveKey="1"
                    items={admin}
                    onChange={(key) => {
                        router.push(`/dashboard?id=${key}`)
                        setSelectedTab(key)
                    }}
                    activeKey={selectedTab}
                />
            )}
            {currentUser && !currentUser.isAdmin && (
                <Tabs
                    defaultActiveKey="1"
                    items={user}
                    onChange={(key) => {
                        router.push(`/dashboard?id=${key}`)
                        setSelectedTab(key)
                    }}
                    activeKey={selectedTab} />
            )}
        </div>
    )
}

export default Dashboard