import React, { useState, useEffect} from "react"
import demo from "/src/assets/demo.png"

const Dashboard_Banner = () => {
    const [paddingX, setPaddingX] = useState(0)
    const [rounded, setRounded] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            let newPadding = Math.min(scrollY/4, 32)
            let newRounded = Math.min(scrollY/4, 24)
            setPaddingX(newPadding)
            setRounded(newRounded)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, []) 

  return (
    <div className='w-full mx-auto'>
        {/* Big title */}
        <div className='flex flex-col items-start md:flex-row md:justify-between md:items-center pb-10 px-4 md:px-8 lg:px-16 py-4'>
            <p className='font-bold text-4xl md:text-6xl lg:text-7xl'>Hoa</p>
            <h3 className='font-semibold text-xl md:text-2xl'>Gift of the nature.</h3>
        </div>

        {/* Image with scroll effect */}
        <div
            className="transition-all duration-300 w-full"
            style={{
            paddingLeft: `${paddingX}px`,
            paddingRight: `${paddingX}px`,
            }}>
            <img
            src={demo}
            alt="demo"
            className="w-full h-[300px] md:h-[500px] object-cover transition-all duration-500" style={{borderRadius: `${rounded}px`}}/>
        </div>
    </div>
  )
}

export default Dashboard_Banner