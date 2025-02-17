'use client'
import React from 'react'
import ProductForm from '../../components/ProductForm'
import axios from 'axios'
import { toast, Toaster } from 'sonner'
import { uploadFile } from '@/app/helpers/imageHandle'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function EditProduct({ params }: { params: any }) {
    const [existingImages, setExistingImages] = React.useState([])
    const [selectedFiles, setSelectedFiles] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [product, setProduct] = React.useState<any>(null)
    const router = useRouter()
    const onSave = async (values: any) => {
        try {
            setLoading(true)
            const newImages = await uploadFile(selectedFiles)
            const existingAndNewImages = [...existingImages, ...newImages]
            values.images = existingAndNewImages
            await axios.post(`/api/products/${params.productid}`, values)
            toast.success('Product updated Successfully')
            router.refresh()
            router.back()
        } catch (error: any) {
            toast.error(error.message || error.response.data.message)
        } finally {
            setLoading(false)
        }
    }


    const getSelectedProduct = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/api/products/${params.productid}`)
            setProduct(response.data)
            setExistingImages(response.data.images || [])
        } catch (error: any) {
            toast.error(error.message || error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        getSelectedProduct();
    }, [])
    return (
        <div>
            <Toaster position="top-center" expand={false} richColors />
            <div className='bg-gray-50 rounded-lg px-2 py-1'>
                <Link href='/dashboard?id=1' className='no-underline'><i className="ri-home-smile-line text-black rounded-full px-2 cursor-pointer"></i></Link>
                <span className='font-normal text-sm'>/ Edit Product</span>
            </div>
            <h1 className='text-primary my-5 mx-auto lg:max-w-[50%] px-2'>Edit Product</h1>
            {product && <ProductForm
                setSelectedFiles={setSelectedFiles} onSave={onSave} loading={loading} existingImages={existingImages} setExistingImages={setExistingImages} initialValue={product}
            ></ProductForm>}
        </div>
    )
}

export default EditProduct