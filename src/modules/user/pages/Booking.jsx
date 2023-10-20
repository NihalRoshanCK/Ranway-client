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
    if (!inputObject.product_name){
      return toast.warning('Product name  is required')
    }else if (!inputObject.from_address) {
      return toast.warning('from  address  is requird')
    }else if (!inputObject.from_zipcode) {
      return toast.warning(' from addresss zipcode is requred')
    }else if (!inputObject.from_user_contact) {
      return toast.warning('from address contact number is requird')
    }else if (!inputObject.to_address) {
      return toast.warning('to address  is requird')
    }else if (!inputObject.to_zipcode) {
      return toast.warning('to address zipcode  is requird')
    }else if (!inputObject.to_user_contact) {
      return toast.warning('to address contact number is requird')
    }else if (!inputObject.height) {
      return toast.warning('product height is requird')
    }else if (!inputObject.width) {
      return toast.warning('product width is requird')
    }else if (!inputObject.weight) {
      return toast.warning('product weight is requird')
    }else if (!inputObject.product_price) {
      return toast.warning('product price is requird if not needed put 0')
    }else if (!inputObject.hbd) {
      return toast.warning('product pickup date is requird')
    }

    if (!isValidName(inputObject.product_name)) {
      return toast.warning('Enter a correct name format without space and minimum 4 letters')
    }else if (!isValidAddress(inputObject.from_address)) {
      return toast.warning('Enter a correct from  address  format')
    }else if (!isValidZipcode(inputObject.from_zipcode)) {
      return toast.warning('Enter a correct from zipcode number format')
    }else if (!isValidPhone(inputObject.from_user_contact)) {
      return toast.warning('Enter a correct from addreess phone number format')
    }else if (!isValidAddress(inputObject.to_address)) {
      return toast.warning('Enter a correct to address format')
    }else if (!isValidZipcode(inputObject.to_zipcode)) {
      return toast.warning('Enter a correct to zipcode format')
    }else if (!isValidPhone(inputObject.to_user_contact)) {
      return toast.warning('Enter a correct  to address contact number format')
    }else if (!isValidvalue(inputObject.height)) {
      return toast.warning('Enter height must be than 1 and less than 50')
    }else if (!isValidvalue(inputObject.width)) {
      return toast.warning('Enter height must be than 1 and less than 50')
    }else if (!isValidvalue(inputObject.weight)) {
      return toast.warning('Enter height must be than 1 and less than 50')
    }
    const cpd = new Date(inputObject["hbd"]);
    cpd.setDate(currentDate.getDate() + 6);
    inputObject["cpd"]=cpd.toISOString().split('T')[0];
    inputObject["category"]=select.id
    console.log(inputObject,"inputttttttttttttttt");
    
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
      
    // Process and validate form data here
  };
  const handleOpen=(event)=>{
    setIs_active(event)
  }


  const isValidvalue = (value) => {
    // Valid email addresses in the format user@example.com
    //  consisting of non-space characters before the @ symbol
    //  followed by non-space characters, and a valid top-level domain (TLD) after the @ symbol
    const valueRegex = /^(?:[1-9]|[1-4]\d|50)$/;
    return valueRegex.test(value);
  };
  const isValidEmail = (email) => {
    // Valid email addresses in the format user@example.com
    //  consisting of non-space characters before the @ symbol
    //  followed by non-space characters, and a valid top-level domain (TLD) after the @ symbol
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidZipcode = (zipcode) => {
    // Valid email addresses in the format user@example.com
    //  consisting of non-space characters before the @ symbol
    //  followed by non-space characters, and a valid top-level domain (TLD) after the @ symbol
    const zipcodeRegex = /^\d{6}(?:-\d{4})?$/;
    return zipcodeRegex.test(zipcode);
  };
  const isValidName = (name) => {
    // usernames must start and end with an alphanumeric character (letter or digit)
    //  can contain periods (dots) within, must not have consecutive periods
    //  and be between 1 and 30 characters in length
    const nameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W_][\w.]{3,29}$/;
    return nameRegex.test(name);
  };
  const isValidPhone = (phone) => {
    // Required 10 digit with no six consecutive identical digits
    const numberRegex = /^(?!.*(\d)\1{5})(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return numberRegex.test(phone);
  };
  const isValidAddress = (address) => {
    // Valid addresses can contain word characters, spaces, dots, commas, hyphens, and hash symbols
    const addressRegex = /^[\w\s.,#-]+$/;
    return addressRegex.test(address);
  };
  const isValidPassword = (password) => {
    // Password validation using regular expression
    // Requires at least one uppercase letter, one lowercase letter, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  const isValidAge = (age) => {
    // Valid ages must be integers starting from 18 to 99
    const ageRegex = /^(?:1[89]|[2-9]\d)$/;
    return ageRegex.test(age);
  };
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
            <Input  type="text" name="product_name"  label="Product Name" />
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
              
              <Input className="no-spin-button"    id='' name="from_zipcode" color="indigo" label="From address pincode" />
            </div>
            <div className="mb-2">
            <Input  className="no-spin-button" type="tel" name="from_user_contact" color="indigo" label="From address contact number" />
            </div>
            <Textarea name="to_address" color="indigo" label="To address" />
            <div className="mb-2">
              <Input  className="no-spin-button" type="number" name="to_zipcode" color="indigo" label="To address pincode" />
            </div>
            <div className="mb-2">
              <Input className="no-spin-button"  name="to_user_contact" color="indigo" label="To address contact number" />
            </div>
            <div className="mb-2">
              <Input className="no-spin-button"  name="height" color="indigo" label="Height" />
            </div>
            <div className="mb-2">
              <Input className="no-spin-button"  name="width" color="indigo" label="Width" />
            </div>
            <div className="mb-2">
              <Input className="no-spin-button"  name="weight" color="indigo" label="Weight" />
            </div>
            <div className="mb-2">
              <Input className="no-spin-button"   name="product_price" color="indigo" label="Price to be collected" />
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
