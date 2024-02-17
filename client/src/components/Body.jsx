import React from 'react'
import Card from './Card'
import Records from './Records'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'

function Body() {

  const [showAddEmploye,setShowAddEmploye] = useState(false)

  const handleOnClose = ()=>setShowAddEmploye(false)

  return (

    <div className=''>

  
      <div>


        <Records/>
        {/* <AddEmploye onClose={handleOnClose} visible={showAddEmploye}/>    */}

        
       

      </div>

    </div>

  )
}

export default Body