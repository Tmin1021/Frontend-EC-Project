import React from 'react'

function Product_Description({product}) {
  return (
    <div className="flex flex-col justify-between items-center p-6 max-w-xl mx-auto space-y-4">
        <p className="text-lg font-medium">{product.description}</p>

        <p>{product.description_detail}</p>

        <p className="italic">{product.caution}</p>

        <p className="text-sm"><strong>Pro Tip:</strong>{product.tip}</p>
    </div>

    )
}

export default Product_Description