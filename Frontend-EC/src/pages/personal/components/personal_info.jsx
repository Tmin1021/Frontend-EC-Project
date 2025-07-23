import React, {useState} from 'react'
import { users } from '../../../data/dummy'
import { Filter } from '../../list_product/components/list_filter'
import { ChevronDown } from 'lucide-react'

const address = {"TPHCM": ["P.1", "P.2", "P.3", "P.4"], "Ha Noi" : ["P.1", "P.2", "P.3"],  "Can Tho" : ["P.1", "P.2", "P.3"]}

const Personal_Info_Item = ({name, info}) => {

    return (
        <div className='flex gap-56 justify-between'>
            <p className='font-semibold text-lg'>{name}</p>
            <p className='text-lg'>{info}</p>
        </div>
    )
}

const Persona_Address_Item = ({name='Address', index=0, whichInfo=["", "", ""], isClicked=false, onHandleClicked=()=>{}, onHandleInfo=()=>{}}) => {

  return (
    <div>
      <p>{name}</p>

      <div className='relative flex items-center justify-end gap-2 w-[200px] border-1 border-gray-200' onClick={()=>onHandleClicked(index)}>
        {/* Title and box */}
        <p>{whichInfo[index] === "" ? name:whichInfo[index]}</p>
        <ChevronDown className={`transition-transform duration-500 ${isClicked ? 'rotate-[-180deg]' : ''}`}/>

        {/* Dropdown box*/}
        {isClicked && <div className='absolute w-[200px] max-h-[400px] overflow-auto top-10 border-1 border-gray-300' onClick={(e)=> e.stopPropagation()}>
          {(index===1? Object.keys(address) : address[whichInfo[1]]).map((info, i) => (
            <div key={i} onClick={()=>onHandleInfo(index, info)}>
              <p>{info}</p>
            </div>
          ))}
        </div>}
      </div>
    </div>

  )
}

function Personal_Info() {
  const user = users[0] 
  const [whichAddress, setWhichAddress] = useState(Array(3).fill(false))
  const [whichInfo, setWhichInfo] = useState(["", "", ""])

  const handleClick = (index) => {
    const current_index = whichAddress[index]
    const newWhichAddress = Array(3).fill(false)
    newWhichAddress[index] = !current_index

    setWhichAddress(newWhichAddress)
  }

  const handleInfo = (index, info) => {
    if (index===1) {
      setWhichInfo([whichInfo[0], info, ""])
    }
    else setWhichInfo([...whichInfo.slice(0,2), info])
  }

  return (
    <div className='flex flex-col gap-16'>
      {/* Name, email,... */}
      <div>
        <p className='text-2xl pb-4'>Personal Information</p>
        <Personal_Info_Item name={"Name"} info={user.name}/>
        <Personal_Info_Item name={"Mail"} info={user.mail}/> 
        <Personal_Info_Item name={"Phone"} info={user.phone}/>
      </div>

      {/* Address */}
      <div className='flex flex-col gap-4'>
        <p className='text-2xl'>Saved Order Address</p>

        {/* House number, street... */}
        <div className='flex flex-col' onClick={()=>handleClick(0)}>
          <p>Address</p>
          <input type='text' placeholder='Address, Street...' value={whichInfo[0]} onChange={(e)=>{setWhichInfo([e.target.value, ...whichInfo.slice(1,3)])}} className='border border-gray-200 p-2 focus:outline-none'/>
        </div>

        {/* Commune, Province */}
        <div className='flex gap-8'>
          <Persona_Address_Item name={"Province"} index={1} whichInfo={whichInfo} isClicked={whichAddress[1]} onHandleClicked={handleClick} onHandleInfo={handleInfo}/>
          <Persona_Address_Item name={"Commune"} index={2} whichInfo={whichInfo} isClicked={whichAddress[2]} onHandleClicked={handleClick} onHandleInfo={handleInfo}/>
        </div>
      </div>

    </div>

  )
}

export default Personal_Info