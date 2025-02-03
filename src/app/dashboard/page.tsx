'use client'
import { Tabs } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

function Dashboard() {

    const { currentUser } = useSelector((state: any) => state.user)

    return (
        <div className='p-5'>
            {currentUser.isAdmin && (
                <Tabs defaultActiveKey='1'>
                    <Tabs.TabPane tab='Product' key='1'>
                        Products
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Categories' key='2'>
                        Categories
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Orders' key='3'>
                        Orders
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Users' key='4'>
                        Users
                    </Tabs.TabPane>
                </Tabs>
            )}
            {!currentUser.isAdmin && (
                <Tabs defaultActiveKey='1'>
                    <Tabs.TabPane tab='Profile' key='1'>
                        Personal Info
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Orders' key='2'>
                        Orders Info
                    </Tabs.TabPane>
                </Tabs>
            )}
        </div>
    )
}

export default Dashboard