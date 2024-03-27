import { BsPeopleFill } from "react-icons/bs";
import { FaLuggageCart } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdFlight } from "react-icons/md";



export const sidebarMenu = [
 
    {

        title:'Employes',
        url:'employes',
        icon:<BsPeopleFill/>

    },
    {

        title:'Clients',
        url:'/',
        icon:<FaLuggageCart/> 

    },
    {

        title:'Suppliers',
        url:'suppliers',
        icon:<FaWarehouse/>

    },
    {

        title:'Payments',
        url:'payments',
        icon:<RiSecurePaymentFill/>

    },

    // {

    //     title:'Deliveries',
    //     url:'deliveries',
    //     icon:<RiSecurePaymentFill/>

    // },

    {

        title:'Trips',
        url:'trips',
        icon:<MdFlight/>

    },

 
  

]