import { getFieldRequiredRules } from '@/app/helpers/validations'
import { Button, Form, Input, Select, Upload } from 'antd'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast, Toaster } from 'sonner'


function ProductForm({ setSelectedFiles, onSave, loading }: ProductFormProps) {

    const router = useRouter()
    const [categories, setCategories] = React.useState([])

    const getCategories = async () => {
        try {
            const response = await axios.get('/api/categories')
            setCategories(response.data.data)
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    React.useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className='my-5 mx-auto md:max-w-[50%]'>
            <Toaster position="top-center" expand={false} richColors />
            <Form onFinish={onSave} layout='vertical' className='grid grid-cols-1 md:grid-cols-3 gap-y-9 gap-x-4'>
                <div className='col-span-3'>
                    <Form.Item label='Name' name='name' rules={getFieldRequiredRules("Please Enter Product Name")}>
                        <Input autoComplete="new-product" placeholder='Enter Product Name' className='w-full h-[45px]' type='text'></Input>
                    </Form.Item>
                </div>
                <div className='col-span-3'>
                    <Form.Item label='Description' name='description' rules={getFieldRequiredRules("Please Enter Product Description")}>
                        <Input.TextArea placeholder='Enter Product Description' />
                    </Form.Item>
                </div>
                <Form.Item label='Price' name='price' rules={getFieldRequiredRules("Please Enter Product Price")}>
                    <Input placeholder='Enter Product Price' className='w-full h-[45px]'
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                </Form.Item>

                <Form.Item label='Category' name='category' rules={getFieldRequiredRules("Please Enter Product Category")}>
                    <Select
                        className='w-full h-[45px]'
                        showSearch
                        placeholder="Select a Category"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={categories.map((category: any) => ({
                            value: category._id,
                            label: category.name,
                        }))}
                    />
                </Form.Item>

                <Form.Item label='Count In Stock' name='countInStock' rules={getFieldRequiredRules("Please Enter Product Stock")}>
                    <Input placeholder='Enter Product Stock' className='w-full h-[45px]' onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }} />
                </Form.Item>

                <div className='col-span-3 justify-items-end mt-5'>
                    <Form.Item name='images'>
                        <Upload name="images" listType="picture-card"
                            beforeUpload={(files) => {
                                setSelectedFiles((prev: any) => [...prev, files])
                                return false
                            }}
                            multiple
                        >
                            Upload <br /> Images
                        </Upload>
                    </Form.Item>
                </div>

                <div className='col-span-3 mt-8 justify-end flex gap-5'>
                    <Button onClick={() => router.back()}>Cancel</Button>
                    <Button type='primary' htmlType='submit' loading={loading}>Save</Button>
                </div>
            </Form>
        </div>
    )
}

export default ProductForm

interface ProductFormProps {
    setSelectedFiles: any;
    onSave: any;
    loading: any;
}