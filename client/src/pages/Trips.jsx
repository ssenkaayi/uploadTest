import React from 'react'
import { useState } from 'react'
import { tripTable } from '../components/TableHeading'
import { useEffect } from 'react'
import AddTrip from '../Model/AddTrip'


function Trips() {

    const [showAddTrip,setShowAddTrip] = useState(false)
    const [trips , setTrips] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)


    const handleOnClose = ()=>{
      
      setShowAddTrip(false)

    }


    useEffect(()=>{

        const fetchTrips = async()=>{
    
          try{
      
            setLoading(true);
            const res = await fetch('/api/trip/getTrips',{
              
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
           
            setTrips(data)
            console.log(trips)
        
          }
      
          catch(error){
            setError(error.message)
            setLoading(false)
      
        }
      }
    
      fetchTrips()
    
        
    },[])

    // const handleDeteleEmploye = async(e)=>{

    //   const button_id = e.target.id
    //   console.log(button_id)
    
    //   try{
    
    //     const res = await fetch(`/api/employe/deleteEmploye/${button_id}`,{
    //       method:"DELETE",
    //     })
    
    //     const data = await res.json();
    
    //     // console.log(data)
    
    //     if(data.success===false){
    //       console.log(data.message)
    //     }
    
    //     setEmployes((prev)=>prev.filter((employes)=>employes._id!==button_id))
    
    //   }catch(error){
    //     console.log(error)
    //   }


    // }


  return (

    <div className='bg-white mt-card p-record mt-record rounded-2xl'>

        <AddTrip onClose={handleOnClose} visible={showAddTrip}/>   

        <div className='flex justify-between'>

         <h3 className='text-regal-violet text-2xl p-2'> Manange Trips </h3>

         <button onClick={()=>setShowAddTrip(true)} 
          className='flex items-center p-search-box bg-dashbord rounded-xl text-white '>Add Trip</button>

        </div>

       

        <div className=' w-full mt-record'>

            <table className=' w-full border-collapse' >

                <thead  className='bg-regal-violet text-white'>

                    <tr>

                        {tripTable.map((item,index)=>{

                            return(

                                
                            <th className='p-4 text-left ' key={index}>{item}</th>

                            )
                        })}

                        <th className='p-4 text-left '>Action</th>
                    </tr>

                </thead>

                <tbody>
                
                    { trips !== null ?trips.map((trip)=>{ 

                        return(
                            <tr>
                          
                              <td className='p-4 text-left'key={trip._id}>{trip.createdAt.split("T", 1)}</td>
                              <td className='p-4 text-left'key={trip._id}>{trip.skyTeamName}</td>
                              <td className='p-4 text-left'key={trip._id}>{trip.weight}</td>
                              <td className='p-4 text-left'key={trip._id}>{trip.supplierName}</td>
                              <td className='p-4 text-left'key={trip._id}>{trip.numberLuggages}</td>
                              <td className='p-4 text-left'key={trip._id}>{trip.issuedBy}</td>
                          
                              <div className='text-green flex gap-4 items-center p-4'>
                                  <span className='p-2 cursor-pointer '>Edit</span>
                                  <span className='p-2 cursor-pointer '>View</span>
                                  <button className='p-2 cursor-pointer' >Delete</button>
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

export default Trips