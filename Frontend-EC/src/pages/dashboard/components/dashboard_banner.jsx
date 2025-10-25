import React, { useState, useEffect} from "react"
import demo from "/src/assets/demo.png"

function GradientText({text='text', className='text-xl font-bold', auto=true}) {
  // Idea: add bg-gradient -> scale it -> use animate of tailwind -> make the text transparent + only allow bg in the behind the transparent text
  // use <style> to define local CSS
  const [animate, setAnimate] = useState(auto);

  useEffect(() => {
    if (!auto) return
    setTimeout(() => setAnimate(false), 3400);
  },[])

  const handleClick = () => {
    if (auto) return
    setAnimate(true);
    setTimeout(() => setAnimate(false), 2000); // stop after 2s
  };


  return (
    <>
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div
        onClick={handleClick}
        className={`cursor-pointer font-bold transition-all duration-500 ${className} ${
          animate
            ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:300%_300%] text-transparent bg-clip-text'
            : ''
        }`}
        style={{
          animation: animate ? 'gradientMove 2s linear infinite' : 'none',
        }}
      >
        {text}
      </div>
    </>
  );
}


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
            <GradientText text='Hoa' className='font-bold text-4xl md:text-6xl lg:text-7xl'/>
            <GradientText text='Gift of the nature.' className='font-semibold text-xl md:text-2xl'/>
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