'use client'
import React from 'react'

import ProductForm from '../components/ProductForm'
import axios from 'axios'
import { toast, Toaster } from 'sonner'
import { useRouter } from 'next/navigation'
import { uploadFile } from '@/app/helpers/imageHandle'

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
            console.log(imageUrl)
            values.images = imageUrl;
            await axios.post('/api/products', values);
            router.push('/dashboard?id=1')
            toast.success('Product created successfully');
        } catch (error: any) {
            toast.error(error.message || error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Toaster position="top-center" expand={false} richColors />
            <h1 className='text-primary my-3 mb-5 mx-auto md:max-w-[50%]'>Add Product</h1>
            <ProductForm loading={loading} onSave={onSave} setSelectedFiles={setSelectedFiles} />
        </div>
    )
}

export default AddProduct