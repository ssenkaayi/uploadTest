import React from 'react'
import { useState } from 'react'
import { tripTable } from '../components/TableHeading'
import { useEffect } from 'react'
import AddTrip from '../Model/AddTrip'
import AddSupplier from '../Model/AddSUpplier'



function Trips() {

    const [showAddTrip,setShowAddTrip] = useState(false)
    const [trips , setTrips] = useState(null)
    const [trip_id , setTrip_id] = useState(null)
    const [showAddSupplier,setShowAddSupplier] = useState(false)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)


    const handleOnClose = ()=>{

      setShowAddTrip(false)
      setShowAddSupplier(false)

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
            // console.log(trips)
        
          }
      
          catch(error){
            setError(error.message)
            setLoading(false)
      
        }
      }
    
      fetchTrips()
    
        
    },[])

    const handleSkyTeamName = (e)=>{

      const btn_id = e.target.id
      setTrip_id(btn_id)
      setShowAddSupplier(true)

    }



    const handleDeteleTrip = async(e)=>{

      const button_id = e.target.id
      // console.log(button_id)
    
      try{
    
        const res = await fetch(`/api/trip/delete/${button_id}`,{
          method:"DELETE",
        })
    
        const data = await res.json();
  
    
        if(data.success===false){
          console.log(data.message)
        }
    
        setTrips((prev)=>prev.filter((trip)=>trip._id!==button_id))
    
      }catch(error){

        console.log(error)
      }


    }

  return (

    <div className='bg-white mt-card p-record mt-record rounded-2xl'>

        <AddTrip onClose={handleOnClose} visible={showAddTrip}/>   

        <AddSupplier  onClose={handleOnClose}  visible={showAddSupplier} trip_id={trip_id} />   

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

                        <th className='p-4 text-left '>Manage Suppliers In Trip</th>
                    </tr>

                </thead>

                <tbody>
                
                    { trips !== null ?trips.map((trip)=>{ 

                        return(

                          <tr className='items-center' key={trip._id}>
                        
                            <td className='p-4 text-left'>{trip.createdAt.split("T", 1)}</td>
                            <td className='p-4 text-left'>{trip.name}</td>
                            <td className='p-4 text-left'>{trip.weight}</td>
                            <td className='p-4 text-left gap-1'>{trip.supplier_name}</td>
                            <td className='p-4 text-left'>{trip.number_suppliers}</td>
                            <td className='p-4 text-left'>{trip.transport}</td>
                            <td className='p-4 text-left'>{trip.tax}</td>
                            <td className='p-4 text-left'>{trip.trip_payment}</td>
                            <td className='p-4 text-left'>{trip.market_fees}</td>
                            <td className='p-4 text-left'>{trip.issued_by}</td>



                            <div className='flex gap-4 items-center p-4'>

                              <button className='p-2 cursor-pointer 'id={trip._id} onClick={handleSkyTeamName}>Add</button>
                              <span className='p-2 cursor-pointer '>View</span>
                              <button className='p-2 cursor-pointer 'id={trip._id} onClick={handleDeteleTrip}>Delete</button>

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