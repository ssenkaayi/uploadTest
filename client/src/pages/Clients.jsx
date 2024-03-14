import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import { useEffect } from 'react'
import { clientTable } from '../components/TableHeading'
import { useNavigate } from 'react-router-dom';
import ViewClient from '../Model/ViewClient'
import EditClient from '../Model/EditClient'
import AddPayments from '../Model/AddPayments'
import ReactPaginate from 'react-paginate';
import { useRef } from 'react'
import {CiSearch } from 'react-icons/ci'
import { FaUser } from 'react-icons/fa'
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom'


function Clients() {

  const [showViewClient,setShowViewClient] = useState(false)
  const [showEditClient,setShowEditClient] = useState(false)
  const [showAddEmploye,setShowAddEmploye] = useState(false)
  const [showAddPayment,setshowAddPayment] = useState(false)
  const [clients , setClients] = useState([])
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState(false)
  const navigate = useNavigate()
  const [searchItem, setSearchItem] = useState('')
  const [filteredClients, setFilteredClients] = useState([])
  const [client_id , setClient_id] = useState(null)
  const [limit,setLimit] = useState(8)
  const [pageCount,setPageCount] = useState(1)
  const currentPage = useRef()
    
    useEffect(()=>{

      currentPage.current = 1
      getPagenatedClients()
      
    
        
    },[])

  const handlePageClick = (e)=>{
    // console.log(e)
    currentPage.current = (e.selected+1)
    getPagenatedClients()

  }

   const getPagenatedClients =async()=>{

    const res = await fetch(`/api/client/getClients?page=${currentPage.current}&limit=${limit}`,{
          
      method:'GET',
  
  })

  const handleSearch = async()=>{
    const res = await fetch(`/api/client/searchClient/?page=${key}`,{
      method:'GET'
    })
  }

    const data = await res.json();

    setPageCount(data.pageCount)
    setClients(data.result)
    setFilteredClients(data.result)

   }

    const handleInputChange = (e) => { 

      // console.log(e)

      const searchTerm = e.target.value;
      setSearchItem(searchTerm)

      // // filter the items using the apiUsers state
      const filteredItems = clients.filter((client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredClients(filteredItems);
      // console.log(filteredClients)

      
    }

    const handleViewClient = (id)=>{

      // console.log(id)

      setClient_id(id)
      navigate(`/view_client/${id}`)

      // setShowViewClient(true)
     
    }
    console.log(client_id)

    const handleEditClient = (_id)=>{

      setClient_id(_id)
      setShowEditClient(true)
      // setShowEditClient(true)
    }

    const handleMakePayment =(_id)=>{

      setClient_id(_id)
      setshowAddPayment(true)

    }


    const handleOnClose = ()=>{
      
      setShowAddEmploye(false)
      setShowViewClient(false)
      setShowEditClient(false)
      setshowAddPayment(false)

    }

    const navigateToSupplier = ()=>{
      
      navigate('/suppliers')

    }

    const handleDeleteClient = async(_id)=>{

      const button_id =_id
      try{
    
        const res = await fetch(`/api/client/delete/${button_id}`,{
          method:"DELETE",
        })
    
        const data = await res.json();
    
        // console.log(data)
    
        if(data.success===false){
          console.log(data.message)
          setError(data.message)
          setLoading(false)
        }
    
        setFilteredClients((prev)=>prev.filter((client)=>client._id!==button_id))
    
      }catch(error){
        console.log(error)
      }
    }

    const handleSearch = ()=>{
      navigate('/search')
    }


  return (


  <div>

    {/* mt-card  */}

    <div className='bg-white p-record mt-record rounded-2xl right-4'>

      <AddEmploye onClose={handleOnClose} visible={showAddEmploye}/>   
      <EditClient onClose={handleOnClose} visible={showEditClient} client_id={client_id}/>
      <ViewClient onClose={handleOnClose} visible={showViewClient} client_id={client_id}/>
      <AddPayments onClose={handleOnClose} visible={showAddPayment} client_id={client_id}/>

      <div className='flex justify-between'>

        <h3 className='text-regal-violet text-2xl p-2'> Manange Clients </h3>

        <div className='flex items-center gap-4'>
{/* 
          <div className='flex items-center p-search-box bg-search-bar rounded-2xl text-dashbord'>

            < input className='bg-transparent p-2 outline-none' type='text' placeholder='search' value={searchItem} onChange={handleInputChange} />
            <CiSearch className='w-6 h-6 cursor-pointer text-sm hover:trb'/>

          </div> */}
          <CiSearch onClick={handleSearch} className='w-6 h-6 cursor-pointer text-sm hover:trb'/>
          <button 
            className='flex items-center p-2 bg-dashbord rounded-xl text-white' onClick={navigateToSupplier}>Add Client
          </button>

      
        </div>



      </div>



    <div className=' w-full mt-record'>

    <table className=' w-full border-collapse' >

    <thead  className='bg-regal-violet text-white'>

        <tr>

            {clientTable.map((item,index)=>{

              return(                    
              <th className='p-4 text-center ' key={index}>{item}</th>

              )
            })}

            <th className='p-4 text-left '>Manage Clients</th>
        </tr>

    </thead>


    <tbody>

        { filteredClients !== null ? filteredClients.map((client,index)=>{ 

            return(
                <tr key={index} className='text-center'>
                
                <td className=''>{client.createdAt.split("T", 1)}</td>
                
                <td className=''>{client.supplier.name}</td>
                <td className=''>{client.name}</td>
                <td className=''>{client.weight}</td>
                <td className=''>{client.number_pieces}</td>
                <td className=''>{client.total_payments}</td>
                <td className=''>{client.description}</td>
                <td className=''>{client.store_status}</td>
                <td className=''>{client.issued_by}</td>

                <td className='text-green flex gap-4 items-center p-4'>

                  {/* <button className='p-2 cursor-pointer 'id='payment' onClick={()=>handleMakePayment(client._id)}>Payment</button> */}
                  {/* <button className='p-2 cursor-pointer 'id='edit' onClick={()=>handleEditClient(client._id)}>Edit</button> */}
                  <button className='p-2 cursor-pointer 'id='view' onClick={()=>handleViewClient(client._id)}>View</button>
                  {/* <button className='p-2 cursor-pointer 'id='delete' onClick={()=>handleDeleteClient(client._id)}>Delete</button> */}
 
                </td>
                </tr>
            )
        }):<tr> <td className='p-4 text-left'>loading</td> </tr>}

    </tbody>

    </table>

    <ReactPaginate className="flex gap-4"

      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}


    />

    </div>


        {error}


    <div >

    </div>

  </div>


</div>

  )
  }

export default Clients