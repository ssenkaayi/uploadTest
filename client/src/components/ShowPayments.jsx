import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import { clientPaymentTable} from '../components/TableHeading'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AddPayment from '../Model/AddPayment'

export default function ShowPayments() {

    const [payments , setPayments] = useState([])
    const [issued_by, setIssued_by] = useState('')
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const [showAddPayments,setShowAddPayments] = useState(false)
    const params = useParams()
    const client_id = params.id


    useEffect(()=>{

        const fetchEmployes = async()=>{
    
          try{
      
            setLoading(true);
            const res = await fetch(`/api/client/getClient/${client_id}`,{
              
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
           
            setPayments(data.payments)
            setIssued_by(data.issued_by)
            // console.log(data)
            // setEmployes((prev)=>prev.filter((data)))
        
          }
      
          catch(error){
            setError(error.message)
            setLoading(false)
      
        }
      }
    
        fetchEmployes()
    
        
    },[])

    const handleOnClose = ()=>{
      
        setShowAddPayments(false)
    }

    const navigateToPayments =()=>{

        setShowAddPayments(true)

    }

    
  return (

    

    <div className='w-full mt-record mb-record'>
        
        <div>
            
            <div className='flex justify-between mb-4'>

            <h3 className='text-regal-violet text-2xl p-2'> Payments </h3>

            <div className='flex items-center gap-4'>

            <button 
                className='flex items-center p-2 bg-dashbord rounded-xl text-white' onClick={navigateToPayments}>Make Payment
            </button>


            </div>

            </div>

            <table className=' w-full border-collapse' >

                <thead  className='bg-regal-violet text-white'>

                    <tr>

                    {clientPaymentTable.map((item,index)=>{

                        return(

                            
                        <th className='p-4 text-left ' key={index}>{item}</th>

                        )
                    })}

                        <th className='p-4 text-left '>Action</th>
                    </tr>

                </thead>

                <tbody>

                    { payments !== null ?payments.map((payment,index)=>{ 

                        return(
                            <tr key={index}>
                            
                            <td className='p-4 text-left'key={index}>{payment.date.split("T", 1)}</td>
                            <td className='p-4 text-left'>{payment.reciept_number}</td>

                            <td className='p-4 text-left'>{payment.kg_rate}</td>
                            <td className='p-4 text-left'>{payment.dollar_rate}</td>
                            <td className='p-4 text-left'>{payment.amount_ugx}</td>
                            <td className='p-4 text-left'>{payment.amount_dollars}</td>
                            <td className='p-4 text-left'>{payment.total_amount}</td>
                            <td className='p-4 text-left'>{payment.balance}</td>
                            <td className='p-4 text-left'>{issued_by}</td>

                            <td className='text-green flex gap-4 items-center p-4'>
                                <span className='p-2 cursor-pointer '>Edit</span>
                                <span className='p-2 cursor-pointer '>View</span>
                            </td>

                            </tr>

                        )
                    }):<tr> <td className='p-4 text-left'>loading</td> </tr>}

                </tbody>

            </table>
        </div>
        <AddPayment onClose={handleOnClose} visible={showAddPayments} client_id={client_id} />
    </div>



  )
}
