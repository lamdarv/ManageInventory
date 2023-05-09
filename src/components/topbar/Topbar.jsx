import React from 'react'

const Topbar = () => {
  return (
    <nav className="flex items-center justify-between p-6 bg-custom-green-4 relative w-full">
      <div className="flex items-center">
        <img className='w-[70%]' src={`${process.env.PUBLIC_URL}/assets/logo_maneasy.svg`} alt="Icon" />
      </div>
    </nav>
  )
}

export default Topbar