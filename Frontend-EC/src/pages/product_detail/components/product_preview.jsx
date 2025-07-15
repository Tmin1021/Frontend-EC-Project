import React, {useState} from 'react'

// Preview the slideshow of product image
// Two button (left, right) and the dots to move betwwen images.
function Product_Preview({images}) {
  const [index, setIndex] = useState(0)

  const nextImage = () => {
    setIndex((prev) => (prev+1) % images.length)
  }

  const prevImage = () => {
    setIndex((prev) => (prev+1) % images.length)
  }

 return (
    <div className="relative w-full max-w-[550px] overflow-hidden rounded-2xl">
        {/* Slide wrapper */}
        <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}>
            {images.map((img, i) => (
            <img
                key={i}
                src={img}
                alt={`Slide ${i}`}
                className="w-full object-cover h-[550px]"/>))}
        </div>

        {/* Buttons */}
        <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow text-xl z-10">
            &lt;
        </button>

        <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow text-xl z-10">
            &gt;
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
            <button
                key={i}
                className={`w-3 h-3 rounded-full ${
                i === index ? 'bg-black' : 'bg-gray-300'
                }`}
                onClick={() => setIndex(i)}>
            </button> ))}
        </div>
    </div>
  );
}


export default Product_Preview