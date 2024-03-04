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
    const [limit,setLimit] = useState(7)
    const [pageCount,setPageCount] = useState(1)
    const currentPage = useRef()
    
    useEffect(()=>{

      currentPage.current = 1
      getPagenatedClients()
      // fetchClients()
    
        
    },[])

  //   const fetchClients = async()=>{

  //     try{

  //       setLoading(true);

  //       const res = await fetch(`/api/client/getClients?page=${currentPage.current}&limit=${limit}`,{
          
  //           method:'GET',
        
  //       })

  //       const data = await res.json();
      
  //       if(data.succuss===false){
  //         setError(true)
  //         setLoading(false)
  //         return
  //       }
        
  //       setError(false)
  //       setLoading(false)
       
  //       setClients(data)
  //       setFilteredClients(data)
  //     }
  
  //     catch(error){
  //       setError(error.message)
  //       setLoading(false)
  
  //   }
  // }

  const handlePageClick = (e)=>{
    // console.log(e)
    currentPage.current = (e.selected+1)
    getPagenatedClients()

  }

   const getPagenatedClients =async()=>{

    const res = await fetch(`/api/client/getClients?page=${currentPage.current}&limit=${limit}`,{
          
      method:'GET',
  
  })

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

    const handleViewClient = (e)=>{

      setClient_id(e.target.id)
      setShowViewClient(true)
      // setShowEditClient(true)
    }

    const handleEditClient = (e)=>{

      setClient_id(e.target.id)
      setShowEditClient(true)
      // setShowEditClient(true)
    }

    const handleMakePayment =(e)=>{

      setClient_id(e.target.id)
      setshowAddPayment(true)

    }


    const handleOnClose = ()=>{
      
      setShowAddEmploye(false)
      setShowViewClient(false)
      setShowEditClient(false)
      setshowAddPayment(false)

    }

    const navigateToSupplier = ()=>{
      
      navigate('/dashbord/suppliers')

    }

    const handleDeleteClient = async(e)=>{

      const button_id = e.target.id
      console.log('delete')
    
      try{
    
        const res = await fetch(`/api/client/delete/${button_id}`,{
          method:"DELETE",
        })
    
        const data = await res.json();
    
        console.log(data)
    
        if(data.success===false){
          console.log(data.message)
          setError(data.message)
          setLoading(false)
        }
    
        setClients((prev)=>prev.filter((client)=>client._id!==button_id))
    
      }catch(error){
        console.log(error)
      }
    }


  return (


  <div>

      <div  className='flex justify-between items-center flex-wrap
        bg-white rounded-2x p-header mb-4 my-2 rounded-lg '>

        <div className='flex flex-col  text-dashbord '>

          <span className='test-xs'>Admin</span>
          <span className='text-2xl' >Dashbord</span>

          </div>


          <div className='flex items-center gap-1'>

          <div className='flex items-center p-search-box bg-search-bar rounded-2xl text-dashbord'>

          <svg svg="true"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer text-sm hover:trb">
          <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
          </svg>

          < input className='bg-transparent p-2' type='text' placeholder='search' value={searchItem} onChange={handleInputChange} />

          </div>

          <img className='w-12 h-12 cursor-pointer rounded-full' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt='avater'/>
        </div>


      </div>



    <div className='bg-white mt-card p-record mt-record rounded-2xl'>

    <AddEmploye onClose={handleOnClose} visible={showAddEmploye}/>   
    <EditClient onClose={handleOnClose} visible={showEditClient} client_id={client_id}/>
    <ViewClient onClose={handleOnClose} visible={showViewClient} client_id={client_id}/>
    <AddPayments onClose={handleOnClose} visible={showAddPayment} client_id={client_id}/>

    <div className='flex justify-between'>

    <h3 className='text-regal-violet text-2xl p-2'> Manange Clients </h3>

    <div className='flex items-center gap-1'>

    <div className='flex items-center p-search-box bg-search-bar rounded-2xl text-dashbord'>

    </div>

    {/* <img className='w-12 h-12 cursor-pointer rounded-full' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt='avater'/> */}
    </div>

    <button 
    className='flex items-center p-search-box bg-dashbord rounded-xl text-white' onClick={navigateToSupplier}>Add Client</button>

    </div>



    <div className=' w-full mt-record'>

    <table className=' w-full border-collapse' >

    <thead  className='bg-regal-violet text-white'>

        <tr>

            {clientTable.map((item,index)=>{

                return(

                    
                <th className='p-4 text-left ' key={index}>{item}</th>

                )
            })}

            <th className='p-4 text-center '>Manage Clients</th>
        </tr>

    </thead>

    {/* {clients} */}

    <tbody>

        { filteredClients !== null ? filteredClients.map((client,index)=>{ 

            return(
                <tr key={index}>
                
                <td className='p-4 text-left'>{client.createdAt.split("T", 1)}</td>
                
                <td className='p-4 text-left'>{client.supplier_name}</td>
                <td className='p-4 text-left'>{client.name}</td>
                <td className='p-4 text-left'>{client.weight}</td>
                <td className='p-4 text-left'>{client.number_pieces}</td>
                <td className='p-4 text-left'>{client.total_payments}</td>
                <td className='p-4 text-left'>{client.description}</td>
                <td className='p-4 text-left'>{client.store_status}</td>
                <td className='p-4 text-left'>{client.issued_by}</td>

                <td className='text-green flex gap-4 items-center p-4'>

                  <button className='p-2 cursor-pointer 'id={client._id} onClick={handleMakePayment}>Payment</button>
                  <button className='p-2 cursor-pointer 'id={client._id} onClick={handleEditClient}>Edit</button>
                  <button className='p-2 cursor-pointer 'id={client._id} onClick={handleViewClient}>View</button>
                  <button className='p-2 cursor-pointer 'id={client._id} onClick={handleDeleteClient}>Delete</button>
                   
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