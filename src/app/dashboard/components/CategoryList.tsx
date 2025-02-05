'use client'
import { Button, Modal, Table } from 'antd'
import React from 'react'
import CategoryForm from './CategoryForm'
import axios from 'axios'
import { toast, Toaster } from 'sonner'
import moment from 'moment'

function CategoryList() {
    const [loading, setLoading] = React.useState(false)
    const [selectedCategory, setSelectedCategory] = React.useState<any>(null)
    const [categories, setCategories] = React.useState([])
    const [showCategoryForm, setShowCategoryForm] = React.useState(false)
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        }
        ,
        {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            render: (createdBy: any) => createdBy.name
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: string) => moment(createdAt).format('DDD MMM YYY')
        },
        {
            title: "Action",
            dataIndex: 'action',
            render: (action: any, params: any) => {
                return (
                    <div className='flex flex-row gap-2'>
                        <Button color="primary" variant="outlined"
                            onClick={() => {
                                setSelectedCategory(params)
                                setShowCategoryForm(true)
                            }}
                        >Edit</Button>
                        <Button danger >Delete</Button>
                    </div>
                )

            }

        }
    ];
    const getCategories = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/categories')
            setCategories(response.data.data)
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    };
    React.useEffect(() => {
        getCategories()
    }, [])
    return (
        <div>
            <Toaster position="top-center" expand={false} richColors />
            <div className='flex justify-end'>
                <Button type='primary'
                    onClick={() => setShowCategoryForm(true)}
                >Add Category</Button>
            </div>

            <div className='my-5'>
                <Table loading={loading} columns={columns} dataSource={categories}></Table>
            </div>

            {showCategoryForm && <CategoryForm selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory} showCategoryForm={showCategoryForm} reloadData={() => { }} setShowCategoryForm={setShowCategoryForm} />}
        </div>
    )
}

export default CategoryList