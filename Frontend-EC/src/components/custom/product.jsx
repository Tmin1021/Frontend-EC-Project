import { useDynamicPricing } from "../../context/DynamicPricingContext"
import { assets, demo_1 } from "../../data/dummy"

export default function Product_Item({product}) {
    const {condition_mapping} = useDynamicPricing()

    return (
        <div className="min-w-[170px] bg-white dark:bg-black">
            <div className='w-full aspect-square overflow-hidden rounded-sm'>
                <img src={assets[product?.image_url?.[0]] ?? demo_1} className='w-full h-full object-cover'/>
            </div>

            <p className='font-bold text-sm md:text-base pt-3'>{product.name}</p>

            <div className='flex justify-between items-center'>
                <p className='font-light text-sm py-1'>from <span className='font-bold text-lg'>${product?.dynamicPrice}</span></p>
                <p className={`${condition_mapping[product.condition]} whitespace-nowrap overflow-hidden text-ellipsis text-sm font-semibold h-fit p-1 text-white rounded-sm cursor-pointer hover:px-2 transition-all`}>{product.condition}</p>
            </div>
        </div>

    )
}