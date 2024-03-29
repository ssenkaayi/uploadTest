
import React from 'react'
import { useState } from 'react'
import { clientTable } from '../components/TableHeading'
import ReactPaginate from 'react-paginate';
import {CiSearch } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom';
import { IoReturnUpBackSharp } from "react-icons/io5";

export default function Search() {


  const [error , setError] = useState(false)
  const [searchItem, setSearchItem] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [pageCount,setPageCount] = useState(1)
  const [client_id , setClient_id] = useState(null)
  const navigate = useNavigate()


  const handleInputChange = (e) => { 

    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    
  }

  const handlePageClick = (e)=>{
    // console.log(e)
    currentPage.current = (e.selected+1)
    getPagenatedClients()

  }

  const handleSearch = async(e)=>{

    // console.log(searchItem)

    e.preventDefault();

    try{

      const fetchSearch = await fetch(`/api/client/searchClient/${searchItem}`,{
        method:'GET',

      })

      const data =  await fetchSearch.json();

      if(data.success===false){
        setLoading(false);
        setError(data.message);
        return
      }

      console.log(data)
      setSearchResult(data)

    }catch(error){

    }

    // fetchSearch()

  }

  const handleViewClient = (id)=>{

    // console.log(id)

    setClient_id(id)
    navigate(`/view_client/${id}`)

    // setShowViewClient(true)
   
  }

  const handleBackToClient =()=>{

    navigate('/')
  }

  return (

  <div>

    <div className='bg-white mt-card p-record mt-record rounded-2xl right-4'>

      <div className='flex justify-between text-dashbord'>

        <IoReturnUpBackSharp className='w-6 h-6 cursor-pointer text-sm hover:trb ml-2' onClick={handleBackToClient} />

        {/* <h3 className='text-regal-violet text-2xl p-2'> Manange Clients </h3> */}

        <div className='flex items-center p-search-box bg-search-bar rounded-2xl '>

          <CiSearch className='w-6 h-6 cursor-pointer text-sm hover:trb' onClick={handleSearch} />
          < input className='bg-transparent p-2 outline-none' type='text' placeholder='search' value={searchItem} onChange={handleInputChange} />

        </div>

        <div className='flex items-center gap-4'>
  
          {/* <div className='flex items-center p-search-box bg-search-bar rounded-2xl text-dashbord'>

            <CiSearch className='w-6 h-6 cursor-pointer text-sm hover:trb'/>
            < input className='bg-transparent p-2 outline-none' type='text' placeholder='search' value={searchItem} onChange={handleInputChange} />
            
          </div> */}

          
          <button 
            className='flex items-center p-3 bg-dashbord rounded-xl text-white mr-2' onClick={handleSearch}>Search
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

        { searchResult.length !== null ? searchResult.map((client,index)=>{ 

            return(
                <tr key={index} className='p-4 text-center'>
                
                <td >{client.createdAt.split("T", 1)}</td>
                <td >{client.supplier.supplier_name}</td>
                <td >{client.name}</td>
                <td >{client.weight}</td>
                <td >{client.number_pieces}</td>
                <td >{client.total_payments}</td>
                <td >{client.description}</td>
                <td >{client.store_status}</td>
                <td >{client.issued_by}</td>

                <td className='text-green flex gap-4 items-center p-4'>

                  {/* <button className='p-2 cursor-pointer 'id='payment' onClick={()=>handleMakePayment(client._id)}>Payment</button> */}
                  {/* <button className='p-2 cursor-pointer 'id='edit' onClick={()=>handleEditClient(client._id)}>Edit</button> */}
                  <button className='p-2 cursor-pointer 'id='view' onClick={()=>handleViewClient(client._id)}>View</button>
                  {/* <button className='p-2 cursor-pointer 'id='delete' onClick={()=>handleDeleteClient(client._id)}>Delete</button> */}

                  
                </td>
                </tr>
            )
        }):<tr> <td className='p-4 text-left'>no such found</td> </tr>}

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
