'use client'
import { Button, Image, Table } from 'antd'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast, Toaster } from 'sonner';

function ProductList() {
    const router = useRouter()
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(false)

    const getProduct = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/products')
            setProducts(response.data.data)
        } catch (error: any) {
            toast.error(error.response.data.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const columns = [
        {
            title: "Products",
            dataIndex: "images",
            render: (text: string, record: any) => (
                <Image
                    src={record.images[0].url}
                    alt=''
                    className='rounded-md max-w-24 max-h-24'
                />
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
        }
        ,
        {
            title: 'Created By',
            dataIndex: 'createdBy',
            render: (createdBy: any) => createdBy.name
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (createdAt: string) => moment(createdAt).format('DD MMM YYYY hh:mm A')
        },
        {
            title: "Action",
            dataIndex: 'action',
            render: (action: any, params: any) => {
                return (
                    <div className='flex flex-row gap-2'>
                        <Button color="primary" variant="outlined"
                            onClick={() => {
                                router.push(`/dashboard/edit_product/${params._id}`)
                            }}
                        >Edit</Button>
                        <Button danger>Delete</Button>
                    </div>
                )

            }

        }

    ];

    React.useEffect(() => {
        getProduct()
    }, [])

    return (
        <div>
            <Toaster position="top-center" expand={false} richColors />
            <div className='flex justify-end'>
                <Button type='primary' onClick={() => { router.push('/dashboard/add_product') }}>Add Product</Button>
            </div>

            <div className='my-5'>
                <Table loading={loading} columns={columns} dataSource={products}></Table>
            </div>
        </div>
    )
}

export default ProductList