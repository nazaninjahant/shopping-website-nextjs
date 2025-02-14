import React from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { getFieldRequiredRules } from '@/app/helpers/validations';
import axios from 'axios';
import { toast, Toaster } from 'sonner';

function CategoryForm({
    showCategoryForm,
    setShowCategoryForm,
    reloadData,
    selectedCategory,
    setSelectedCategory
}: CategoryFormProps) {
    const [loading, setLoading] = React.useState(false)

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            if (selectedCategory) {
                await axios.post(`/api/categories/${selectedCategory._id}`, values)
                toast.success('Categoty updated successfully');
            } else {
                await axios.post('/api/categories', values)
                toast.success('Categoty add successfully');
            }
            setShowCategoryForm(false);
            setSelectedCategory(null);
            reloadData();
        } catch (error: any) {
            toast.error(error.response.data.message || error.message);
        } finally {
            setLoading(false)
        }
    }

    const [form] = Form.useForm()
    return (
        <>
            <Toaster position="top-center" expand={false} richColors />
            <Modal okButtonProps={{ loading }} onOk={() => { form.submit() }} centered title={<h1 className='text-primary font-bold text-2xl'>
                {
                    selectedCategory ? 'Change Category' : 'Add Category'
                }
            </h1>} closable={false} okText={
                selectedCategory ? 'Update' : 'Save'
            } open={showCategoryForm} onCancel={() => {
                setShowCategoryForm(false)
                setSelectedCategory(null)
            }}>
                <Form initialValues={selectedCategory} onFinish={onFinish} form={form} layout='vertical' className='flex flex-col gap-5 py-4'>
                    <Form.Item label='Category Name' name='name' rules={getFieldRequiredRules("Please Enter Category Name")}>
                        <Input autoComplete="new-category" placeholder='Enter Category Name' className='w-full h-[45px]' type='text'></Input>
                    </Form.Item>

                    <Form.Item label='Category Description' name='description'>
                        <Input.TextArea placeholder='Enter Categoty Description' />
                    </Form.Item>
                </Form>
            </Modal></>
    )
}

export default CategoryForm

interface CategoryFormProps {
    showCategoryForm: boolean;
    setShowCategoryForm: (show: boolean) => void;
    reloadData: () => void,
    selectedCategory: any
    setSelectedCategory: (category: any) => void
}