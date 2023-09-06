import React,{useEffect,useState} from 'react'
import Navbar from '../components/NavbarUser'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input,
         Textarea,
         Select, 
         Option,
         Button,
         Typography,
         Dialog,
} from "@material-tailwind/react";
import Verification from '../components/Verification';
import axios from 'axios';
import api from '../useraxiosInterceptor';
import Conformation from '../components/conformation';
import { useSelector, useDispatch } from 'react-redux'
import Login from '../components/Login';
import Register from '../components/register';
function Booking() {
  const on=useSelector((state) => state.login.value)
  const [categories, setCategories] = useState([]);
  const [select,setSelect]=useState(0)
  const [is_active,setIs_active]=useState(false)
  const [price,setPrice]=useState(0)
  const[total,setTotal]=useState(0)
  const [auth ,setAuth]=useState(true);
  const [varifications, setVarifications] = useState({});
  const[booking,setBooking]=useState()
  const handelChange=()=>{
    setAuth(!auth)
} 
  const handleSelect = (event)=>{
    console.log('Event:', event);
    setSelect(event);
  }
  useEffect(() => {
  (async()=>{
      try {
        const response = await  axios.get('http://127.0.0.1:8000/product/categories/');
        if (response && response.status === 200 ) {
            console.log(response.data);
            if (response.data){
              setCategories(response.data);
    
            }
            else{
                
            }
        }
      }catch (error) {
      // Handle any error that occurs during the HTTP request
      console.error('Error:', error);
      // toast.error(error.response.data.message)
      }
    
  })();
  },[]);
  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inputObject = Object.fromEntries(formData);
    
    console.log(select);
    console.log(inputObject);
    if (select ||inputObject.to_address||inputObject.from_address||inputObject.height||inputObject.product_name||inputObject.weight||inputObject.width){
      setPrice(select.price)
      if (inputObject.height>250){
        console.log(price,"firsttttttttttttttttttttttttttttt");
        setTotal(price+30)
        console.log(price,"nextrrrrrrrrrrrrrrrr");
      }
      if (inputObject.weight>80){
        setTotal(price+50)
      }
      if (inputObject.width>40){
        setTotal(price+20)
      }

      try {
        // Send the POST request to create the Hub, Staff, and CustomUser
        const response = await api.post('product/booking/', inputObject);
    
        console.log(response.data);
      // setIs_active(true) 
        setBooking(response.data)


        // alert(`${response.data} Hub has been created successfully`);
        setIs_active(true) 

      } catch (error) {
        console.error(error);
        // Handle error: Display an error message to the user or perform other actions.
      }
      
    }
    // Process and validate form data here
  };
  const handleOpen=(event)=>{
    setIs_active(event)
  }
  return (
    <>
    {on 
            && 
        <Dialog size="xs" open={on} className=" flex bg-transparent shadow-none" >
            {auth ? <Register handelChange={handelChange}  /> : <Login handelChange={handelChange} />}
            <ToastContainer/>
        </Dialog>
         }
    <Navbar/>
    <Conformation is_active={is_active}  price={price} booking={booking} handleOpen={handleOpen}/>
    <div className='bg-amber-100 h-screen flex w-full justify-center items-center '>
      <div className='w-4/12 '>
      <Typography variant="h1" className="text-light-green-700  text-center ">Enter Details</Typography>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
          <Input  className='' name='product_name' color="indigo" label="Product Name" />
          </div>
          <div className='mb-2'>

          <Select onChange={handleSelect} className='' name='category' color="indigo" label="Category">
            {categories.map((cat) => (
              <Option key={cat.id} value={cat} >{cat.name}</Option>
              ))}
          </Select>
              </div>
              

          <Textarea name='from_address' color="indigo" label="From address" />
             
          <Textarea name='to_address' color="indigo" label="To address" />

              
              <div className='mb-2'>
          <Input className='' type='number' name='weight' color="indigo" label="weight" />

              </div>
              <div className='mb-2'>

          <Input  className='' type='number' name='height' color="indigo" label="height" />
              </div>
              <div className='mb-2'>

          <Input className='' type='number' name='width' color="indigo" label="width" />
              </div>
                
          {/* <Verification setVarifications={setVarifications} varifications={varifications}/> */}
              
          <div className='flex justify-center'>

          <Button type='submit'>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  </>
  )
  
}

export default Booking
