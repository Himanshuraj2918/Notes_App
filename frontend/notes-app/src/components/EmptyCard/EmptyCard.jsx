import React from 'react'

const EmptyCard = ({ imgSrc, message }) => {
    return (
        <div className='flex flex-col  mt-20'>
            <div className='flex  justify-center'>
                <img src={imgSrc} alt='No notes' className="w-52 " />

            </div>
            <div className='flex  justify-center'>
            <p className='w-1/2 text-lg  font-medium text-slate-700 text-center leading-7 mt-5 '>
            {message}</p>
            </div>
            
           
        </div>
    )
}

export default EmptyCard
