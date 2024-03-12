import React from 'react'
import { useState } from 'react'
import { tripTable } from '../components/TableHeading'
import { useEffect } from 'react'
import AddTrip from '../Model/AddTrip'
import AddSupplier from '../Model/AddSUpplier'
import { useNavigate } from 'react-router-dom';



function Trips() {

    const [showAddTrip,setShowAddTrip] = useState(false)
    const [trips , setTrips] = useState([])
    const [trip_id , setTrip_id] = useState(null)
    const [showAddSupplier,setShowAddSupplier] = useState(false)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const navigate = useNavigate();


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
            // setTrips((prev)=>[...prev,data])
            // console.log(trips)
        
          }
      
          catch(error){
            setError(error.message)
            setLoading(false)
      
        }
      }
    
      fetchTrips()
    
        
    },[])

    const handleSkyTeamName = (id)=>{

      const btn_id = id
      setTrip_id(btn_id)
      navigate(`/view_trip/${id}`)

      // setShowAddSupplier(true)

    }



    const handleDeteleTrip = async(_id)=>{

      const button_id = _id
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

                        <th className='p-4 text-left '>Manage Trips</th>
                    </tr>

                </thead>

                <tbody>
                
                    { trips !== null ?trips.map((trip)=>{ 

                        return(

                          <tr className='items-center' key={trip._id}>
                        
                            <td className='p-4 text-left'>{trip.createdAt.split("T", 1)}</td>
                            <td className='p-4 text-left'>{trip.name}</td>
                            <td className='p-4 text-left'>{trip.weight}</td>
                            <td className='p-4 text-left'>{trip.supplier_name}</td>
                            <td className='p-4 text-left'>{trip.number_suppliers}</td>
                            <td className='p-4 text-left'>{trip.transport}</td>
                            <td className='p-4 text-left'>{trip.tax}</td>
                            <td className='p-4 text-left'>{trip.trip_payment}</td>
                            <td className='p-4 text-left'>{trip.market_fees}</td>
                            <td className='p-4 text-left'>{trip.issued_by}</td>



                            <td className='flex gap-4 items-center p-4'>

                              <button className='p-2 cursor-pointer 'id="add" onClick={()=>handleSkyTeamName(trip._id)}>Add</button>
                              <button className='p-2 cursor-pointer ' id='view' onClick={()=>handleSkyTeamName(trip._id)}>View</button>
                              <button className='p-2 cursor-pointer 'id="delete" onClick={()=>handleDeteleTrip(trip._id)}>Delete</button>

                            </td>

                          </tr>

                        )
                    }):<tr> <td className='p-4 text-left'>loading</td> </tr>}

                </tbody>

            </table>

        </div>



    </div>

  )
}

export default Trips