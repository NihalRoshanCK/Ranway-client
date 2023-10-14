import React,{useEffect,useState} from 'react'
import Navbar from '../components/NavbarUser'
import '../components/style.css'
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
// import Verification from '../components/Verification';
import axios from 'axios';
import api from '../useraxiosInterceptor';
import Conformation from '../components/conformation';
import { useSelector } from 'react-redux'
import Login from '../components/Login';
import Register from '../components/Register';
// import Loader from '../components/Loader';
import image from '../images/booking.jpg'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  product_name: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
    .required('Product Name is required'),
  category: Yup.string().required('Category is required'),
  from_address: Yup.string()
    .matches(/^[\w\s]+$/, 'Please enter a correct value for the From Address'),
  from_zipcode: Yup.string()
    .matches(/^\d{6}$/, 'Please enter a 6-digit zip code'),
  from_user_contact: Yup.string()
    .matches(/^\d{10}$/, 'Please enter a 10-digit phone number'),
});

function Booking() {

  const initialValues = {
    product_name: '',
    category: '',
    from_address: '',
    from_zipcode: '',
    from_user_contact: '',
    
  };
  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  currentDate.setDate(currentDate.getDate() + 1);
  maxDate.setDate(currentDate.getDate() + 5);
  const currentDateStr = currentDate.toISOString().split('T')[0];
  const maxDateStr = maxDate.toISOString().split('T')[0];
  const on=useSelector((state) => state.login.value)
  const [categories, setCategories] = useState([]);
  const [select,setSelect]=useState(0)
  const [is_active,setIs_active]=useState(false)
  const [price,setPrice]=useState(0)
  const[total,setTotal]=useState(0)
  const [auth ,setAuth]=useState(true);
  const [varifications, setVarifications] = useState({});
  const[booking,setBooking]=useState()
  const [loading,isLoading]=useState(true)

  const handleKeyPress = (e) => {
    // Prevent the up and down arrow keys from changing the value
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };
  const handelChange=()=>{
    setAuth(!auth)
} 
  const handleSelect = (event)=>{
    console.log('Event:', event);
    setSelect(event);
  }
  const main={
    // margin:'',
    backgroundImage: `url(${image})`,
    // height:"100vh",
    backgroundSize: 'cover',
    // backgroundPosition: 'center',
}
  useEffect(() => {
  (async()=>{
      try {
        const response = await  axios.get(import.meta.env.VITE_BASE_URL+'product/categories/');
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
      toast.error(error.response.data.message)
      // toast.error(error.response.data.message)
      }
    
  })();
  },[]);
  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inputObject = Object.fromEntries(formData);
    console.log(select.id);
    const cpd = new Date(inputObject["hbd"]);
    cpd.setDate(currentDate.getDate() + 6);
    inputObject["cpd"]=cpd.toISOString().split('T')[0];
    inputObject["category"]=select.id
    console.log(inputObject,"inputttttttttttttttt");
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
      isLoading(true);

        // Send the POST request to create the Hub, Staff, and CustomUser
        const response = await api.post('product/booking/', inputObject);
    
        console.log(response.data);
      // setIs_active(true) 
      
      setBooking(response.data)
      isLoading(false);


        // alert(`${response.data} Hub has been created successfully`);
        setIs_active(true) 

      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message)
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
      <Dialog size="xs" open={on} className=" flex bg-transparent shadow-none" >
            {auth ? <Register handelChange={handelChange}  /> : <Login handelChange={handelChange} />}
            <ToastContainer/>
      </Dialog>
    <Navbar/>
    <Conformation is_active={is_active}  price={price} booking={booking} handleOpen={handleOpen}/>
    <div className="h-screen">
      <div style={main} className="h-fit flex w-full justify-center items-center">
        <div className="w-6/12 px-16 bg-white bg-opacity-80">
          <Typography variant="h1" className="text-center">Enter Details</Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
            <Input  type="text" name="product_name" pattern="[A-Za-z]+" required title="Only letters allowed" label="Product Name" />
            </div>
            <div className="mb-2">
              <Select onChange={handleSelect} className="" name="category" color="indigo" label="Category">
                {categories.map((cat) => (
                  <Option key={cat.id} value={cat}>{cat.name}</Option>
                ))}
              </Select>
            </div>
            <Textarea   title='please enter a correct ' name="from_address" color="indigo" label="From address" />
            <div className="mb-2">
              
              <Input className="no-spin-button" required   pattern="^\d{6}$"   
          title="Please enter a 6-digit zip code" id='' name="from_zipcode" color="indigo" label="From address pincode" />
            </div>
            <div className="mb-2">
            <Input pattern="[0-9]{10}" required title="Please enter a 10-digit phone number" className="no-spin-button" type="tel" name="from_user_contact" color="indigo" label="From address contact number" />
            </div>
            <Textarea name="to_address" color="indigo" label="To address" />
            <div className="mb-2">
              <Input pattern="[0-9]{6}" required title="Please enter a 6-digit zip code" className="no-spin-button" type="number" name="to_zipcode" color="indigo" label="To address pincode" />
            </div>
            <div className="mb-2">
              <Input className="no-spin-button" required  pattern="[0-9]{10}" title="Please enter a 10-digit contact number" name="to_user_contact" color="indigo" label="To address contact number" />
            </div>
            <div className="mb-2">
              <Input className="no-spin-button" required pattern="[0-9]{1-2}" title="Please enter a 2-digit height" name="height" color="indigo" label="Height" />
            </div>
            <div className="mb-2">
              <Input className="no-spin-button" required pattern="[0-9]{1-2}" title="Please enter a 2-digit width"  name="width" color="indigo" label="Width" />
            </div>
            <div className="mb-2">
              <Input className="no-spin-button" required pattern="[0-9]{1-2}" title="Please enter a 2-digit weight" name="weight" color="indigo" label="Weight" />
            </div>
            <div className="mb-2">
              <Input className="no-spin-button" pattern="[0-9]{1-2}" title="Please enter a digits "  name="product_price" color="indigo" label="Price to be collected" />
            </div>
            <div className="mb-2">
              <Input onKeyDown={handleKeyPress} color="indigo" name="hbd" label="Date for pickup" type="date" min={currentDateStr} max={maxDateStr} />
            </div>
            <div className="flex justify-center">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>



  </>
  )
  
}

export default Booking
