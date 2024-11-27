import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='bg-green-500 d-flex items-center w-[100%] h-24'>
        <div>
            <div className='flex justify-center items-center h-24 gap-4'>
                <Link to="/login" className='bg-violet-400 text-white shadow-lg p-2 rounded-md'>Login</Link>
                <Link to="/register" className='bg-violet-400 text-white shadow-lg p-2 rounded-md'>Register</Link>

            </div>
        </div>


    </div>
  )
}
