import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import { luggageTable } from '../components/TableHeading'
import { useEffect } from 'react'
import AddLuggage from '../Model/AddLuggage'


function Luggages() {

    const [showAddLuggage,setShowAddLuggage] = useState(false)
    const [luggages , setLuggages] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)


    const handleOnClose = ()=>{
      
      setShowAddLuggage(false)

    }


    useEffect(()=>{

        const fetchLuggages = async()=>{
    
          try{
      
            setLoading(true);
            const res = await fetch('/api/luggage/getLuggages',{
              
                method:'GET',
            
            })

            const data = await res.json();
            // console.log(data)
          
            if(data.succuss===false){
              setError(true)
              setLoading(false)
              return
            }
            
            setError(false)
            setLoading(false)
           
            setLuggages(data)
            // setEmployes((prev)=>prev.filter((data)))
        
          }
      
          catch(error){
            setError(error.message)
            setLoading(false)
      
        }
      }
    
        fetchLuggages()
    
        
    },[])

    const handleDeteleLuggage = async(e)=>{

      const button_id = e.target.id
      // console.log(button_id)
    
      try{
    
        const res = await fetch(`/api/luggage/delete/${button_id}`,{
          method:"DELETE",
        })
    
        const data = await res.json();
    
        // console.log(data)
    
        if(data.success===false){
          console.log(data.message)
        }
    
        setLuggages((prev)=>prev.filter((luggage)=>luggage._id!==button_id))
    
      }catch(error){

        console.log(error)
      }


    }

 


  return (

    <div className='bg-white mt-card p-record mt-record rounded-2xl'>

        <AddLuggage onClose={handleOnClose} visible={showAddLuggage}/>   

        <div className='flex justify-between'>

         <h3 className='text-regal-violet text-2xl p-2'> Manange Luggages</h3>

         <button onClick={()=>setShowAddLuggage(true)} 
          className='flex items-center p-search-box bg-dashbord rounded-xl text-white '>Add Luggage</button>

        </div>

       

        <div className=' w-full mt-record'>

            <table className=' w-full border-collapse' >

                <thead  className='bg-regal-violet text-white'>

                    <tr>

                        {luggageTable.map((item,index)=>{

                            return(

                                
                            <th className='p-4 text-left ' key={index}>{item}</th>

                            )
                        })}

                        <th className='p-4 text-left '>Action</th>
                    </tr>

                </thead>

                <tbody>
                
                    { luggages !== null ? luggages.map((luggage)=>{ 

                        return(
                            <tr key={luggage._id}>
                            
                            <td className='p-4 text-left'>{luggage.createdAt.split("T", 1)}</td>
                            <td className='p-4 text-left'>{luggage.skyTeamName}</td>
                            <td className='p-4 text-left'>{luggage.supplierName}</td>
                            <td className='p-4 text-left'>{luggage.clientName}</td>
                            <td className='p-4 text-left'>{luggage.weight}</td>
                            <td className='p-4 text-left'>{luggage.numberLuggages}</td>
                            <td className='p-4 text-left'>{luggage.issuedBy}</td>

                            <div className='text-green flex gap-4 items-center p-4'>
                                <span className='p-2 cursor-pointer '>Edit</span>
                                <span className='p-2 cursor-pointer '>View</span>
                                <button className='p-2 cursor-pointer 'id={luggage._id} onClick={handleDeteleLuggage} >Delete</button>
                            </div>

                            </tr>

                        )
                    }):""}

                </tbody>

            </table>

        </div>



    </div>

  )
}

export default Luggages