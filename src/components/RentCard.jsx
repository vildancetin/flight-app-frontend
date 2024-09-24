import React from 'react'

const RentCard = ({item}) => {
  const {img,title,icon} = item
  return (
    <div className='w-full flex-1 mb-3 ml-1 hover:cursor-pointer '>
      <div className='relative w-full h-full' >
        <img src={img} alt="" className='rounded-md w-full h-full object-cover'/>
        <div className='absolute bottom-2 left-2'>
          <span className='text-white text-xl'>{icon}</span>
          <span className='text-white uppercase text-xl font-normal tracking-wide'>{title}</span>
        </div>
        
        
      </div>
    </div>
  )
}

export default RentCard