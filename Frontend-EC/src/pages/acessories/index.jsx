import { SearchX } from 'lucide-react'

function Accessories() {

  return (
    <div className="cursor-pointer w-full h-screen flex gap-2 items-center justify-center p-6 bg-gray-50 rounded-md border border-gray-200">
        <SearchX className='text-pink-600/80 w-12 h-12 hover:mr-8 transition-all'/>
        <p className="text-center text-gray-700 text-lg font-medium">This type of product is discontinued.</p>
    </div>
  )
}

export default Accessories