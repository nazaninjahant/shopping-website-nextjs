'use client'
import React from 'react'

import ProductForm from '../components/ProductForm'
import axios from 'axios'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'
import { uploadFile } from '@/app/helpers/imageHandle'
import Link from 'next/link'

function AddProduct() {

    const [selectedFiles, setSelectedFiles] = React.useState([])
    const [loading, setLoading] = React.useState<boolean>(false)

    React.useEffect(() => {
        console.log(selectedFiles)
    }, [selectedFiles])

    const router = useRouter()
    const onSave = async (values: any) => {
        try {
            setLoading(true)
            const imageUrl = await uploadFile(selectedFiles);
            values.images = imageUrl;
            const response = await axios.post('/api/products', values);
            router.push('/dashboard?id=1')
            toast.success('Product created successfully');
        } catch (error: any) {
            toast.error(error.response.data.message || error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Toaster position="top-center" expand={false} richColors />
            <div className='bg-gray-50 rounded-lg px-2 py-1'>
                <Link href='/dashboard?id=1' className='no-underline'><i className="ri-home-smile-line text-black rounded-full px-2 cursor-pointer"></i></Link>
                <span className='font-normal text-sm'>/ Add Product</span>
            </div>
            <h1 className='text-primary my-5 mx-auto lg:max-w-[50%] px-2'>Add Product</h1>
            <ProductForm loading={loading} onSave={onSave} setSelectedFiles={setSelectedFiles} existingImages={[]} setExistingImages={() => { }} initialValue={null} />
        </div>
    )
}

export default AddProduct