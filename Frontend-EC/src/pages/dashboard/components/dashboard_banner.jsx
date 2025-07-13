import React, { useState, useEffect} from "react";
import demo from "/src/assets/demo.png"

const Dashboard_Banner = () => {
    const [paddingX, setPaddingX] = useState(0)
    const [rounded, setRounded] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            let newPadding = Math.min(scrollY/2, 128)
            let newRounded = Math.min(scrollY/2, 20)
            setPaddingX(newPadding)
            setRounded(newRounded)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, []) 

  return (
    <div>
        <div className='flex justify-between items-center pb-15'>
            <h1 className='font-extrabold text-9xl'>Hoa</h1>
            <h3 className='font-semibold text-2xl'>Gift of the nature.</h3>
        </div>

        <div
            className="transition-all duration-300"
            style={{
            paddingLeft: `${paddingX}px`,
            paddingRight: `${paddingX}px`,
            marginLeft: `-120px`,
            marginRight: `-120px`,
            }}>
            <img
            src={demo}
            alt="demo"
            className="w-full" style={{borderRadius: `${rounded}px`}}/>
        </div>
    </div>

  )
}

export default Dashboard_Banner