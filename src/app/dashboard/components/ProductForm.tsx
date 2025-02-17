'use client'
import { getFieldRequiredRules } from '@/app/helpers/validations'
import { Button, Form, Image, Input, Select, Space, Upload } from 'antd'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast, Toaster } from 'sonner'


function ProductForm({ setSelectedFiles, onSave, loading, initialValue, existingImages, setExistingImages }: ProductFormProps) {

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
        <div className='my-5 mx-auto lg:max-w-[50%]'>
            <Toaster position="top-center" expand={false} richColors />
            <Form autoComplete="off" initialValues={initialValue} onFinish={onSave} layout='vertical' className='grid grid-cols-1 lg:grid-cols-3 gap-y-9 gap-x-4'>
                <div className='col-span-3'>
                    <Form.Item label='Name' name='name' rules={getFieldRequiredRules("Please Enter Product Name")}>
                        <Input placeholder='Enter Product Name' className='w-full h-[45px]' type='text'></Input>
                    </Form.Item>
                </div>
                <div className='col-span-3'>
                    <Form.Item label='Description' name='description' rules={getFieldRequiredRules("Please Enter Product Description")}>
                        <Input.TextArea placeholder='Enter Product Description' />
                    </Form.Item>
                </div>
                <Form.Item label='Price' name='price' rules={getFieldRequiredRules("Please Enter Product Price")}>
                    <Input placeholder='Enter Product Price' className='w-full h-[45px]' suffix="$"
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

                <div className='col-span-3 mt-2'>
                    <div className='grid md:grid-cols-6 grid-cols-2 gap-2'>
                        {
                            existingImages.map((image: any) => (
                                <div className='relative'>
                                    <span className='p-1 absolute -top-9 px-2 z-10 rounded-full cursor-pointer my-5 bg-red-800'
                                        onClick={() => {
                                            setExistingImages((prev: any) => prev.filter((i: any) => i !== image))
                                        }}
                                    >
                                        <i className="ri-delete-bin-6-line text-white"></i>
                                    </span>
                                    <Image
                                        width={100}
                                        height={100}
                                        src={image.url}
                                        alt='shopping'
                                        className='bg-cover'
                                    />

                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='col-span-3 my-2'>
                    <h3 className='font-medium mb-5'>Upload new images :</h3>
                    <Form.Item name='images' rules={getFieldRequiredRules("Please upload at least one image")}>
                        <Upload name="images" listType="picture-card" className='justify-self-end'
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

                <div className='col-span-3'>
                    <h3 className='font-medium mb-5'>Feature List :</h3>
                    <Form.List name="features">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} className='mb-4 grid grid-cols-3' align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'first']}
                                            rules={[{ required: true, message: 'Please enter feature title' }]}
                                        >
                                            <Input placeholder="Title" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'last']}
                                            rules={[{ required: true, message: 'Please enter feature detail' }]}
                                        >
                                            <Input placeholder="Detail" />
                                        </Form.Item>
                                        <i className="ri-indeterminate-circle-line text-xl text-red-600 cursor-pointer" onClick={() => remove(name)}></i>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<i className="ri-add-circle-line"></i>}>
                                        Add Feature
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </div>

                <div className='col-span-3 mt-2 mb-8 justify-end flex gap-5'>
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
    initialValue?: any;
    existingImages?: any;
    setExistingImages: any;
}