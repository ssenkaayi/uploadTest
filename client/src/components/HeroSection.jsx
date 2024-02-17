import React from 'react'
import Card from './Card'

function HeroSection() {
  return (

    <div className='bg-white rounded-xl p-8'>

    <h3 className='text-dashbord pb-2.5 font-dase'>Card heading</h3>

    <div className='flex items-center flex-wrap gap-card'>

      <Card/>
      <Card/>
      <Card/>
      <Card/>


    </div>

    
  </div>

    
  )
}

export default HeroSection