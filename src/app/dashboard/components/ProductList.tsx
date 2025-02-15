import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

function ProductList() {
    const router = useRouter()
    return (
        <div>
            <div className='flex justify-end'>
                <Button type='primary' onClick={() => { router.push('/dashboard/add_product') }}>Add Product</Button>
            </div>
        </div>
    )
}

export default ProductList