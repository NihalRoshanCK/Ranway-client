import React,{useState} from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea,
  Checkbox 
} from "@material-tailwind/react";
// import { Point } from 'django.contrib.gis.geos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import MapPicker from "react-google-map-picker";
import LocationPicker from '../LocationPicker';
import api from '../../../axiosInterceptor';

const DefaultLocation = { lat: 11.151789755424579, lng: 75.89337095618248 };
const DefaultZoom = 18;
function AddHub() {
  
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
   
    function handleChangeZoom(newZoom) {
      setZoom(newZoom);
    }
  
    function handleResetLocation() {
      setDefaultLocation(DefaultLocation);
      setZoom(DefaultZoom);
    }
      
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const inputObject = Object.fromEntries(formData);
      if (!inputObject.hub_name){
        return toast.warning('Hub name  is required')
      }else if (!inputObject.address) {
        return toast.warning('Hub address name is requird')
      }else if (!inputObject.number) {
        return toast.warning('Hub number is requred')
      }else if (!inputObject.name) {
        return toast.warning('Hub head name is requird')
      }else if (!inputObject.email) {
        return toast.warning('Hub head email  is requird')
      }else if (!inputObject.age) {
        return toast.warning('Hub head age  is requird')
      }else if (!inputObject.admin_address) {
        return toast.warning('Hub head address is requird')
      }else if (!inputObject.phone) {
        return toast.warning('Hub head number is requird')
      }else if (!inputObject.password) {
        return toast.warning('Hub head password is requird')
      }else if (!inputObject.conformpassword) {
        return toast.warning('Hub head conform password is requird')
      }
      if (!isValidName(inputObject.hub_name)) {
        return toast.warning('Enter a correct name format')
      }else if (!isValidAddress(inputObject.address)) {
        return toast.warning('Enter a correct  address  format')
      }else if (!isValidPhone(inputObject.number)) {
        return toast.warning('Enter a correct hub contact number format')
      }else if (!isValidName(inputObject.name)) {
        return toast.warning('Enter a correct hub admin name format')
      }else if (!isValidEmail(inputObject.email)) {
        return toast.warning('Enter a correct hub admin email format')
      }else if (!isValidAge(inputObject.age)) {
        return toast.warning('Enter a correct hub admin age which is larger than 18 and lesser than 99')
      }else if (!isValidAddress(inputObject.admin_address)) {
        return toast.warning('Enter a correct  Hub head address format')
      }else if (!isValidPhone(inputObject.phone)) {
        return toast.warning('Enter a correct Hub head phone number format requires 10 digit')
      }else if (!isValidPassword(inputObject.password)) {
        return toast.warning('Password requires at least one uppercase letter, one lowercase letter, and one special character')
      }
      
      if (inputObject.password !=inputObject.conformpassword){
        return toast.warning('password is not matching')
      }
      

      // const point = new Point(parseFloat(inputObject.longitude), parseFloat(inputObject.latitude));
       const location = {
        latitude: parseFloat(inputObject.latitude),
        longitude: parseFloat(inputObject.longitude)
      };
    
      delete inputObject.latitude;
      delete inputObject.longitude;

      inputObject.location = location;
      console.log(formData.get('is_hotspot'));
      inputObject.is_hotspot = formData.get('is_hotspot') === 'on' ? true : false;
      console.log(inputObject);
  // Update the inputObject to include the Point data
      // inputObject.location = point;

     
      try {
        // Send the POST request to create the Hub, Staff, and CustomUser
        const response = await api.post('admins/hub/', inputObject);
        toast.success("hub created successfully created")
        e.target.reset();

        console.log(response);
        // alert(`${response.data} Hub has been created successfully`);
      } catch (error) {
        console.error(error);
        toast.error(error?.response.data?.message)
        toast.error(error?.response.data?.hub_name[0])
        toast.error(error?.response.data?.address[0])
        toast.error(error?.response.data?.location[0])
        toast.error(error?.response.data?.hub_head[0])
        toast.error(error?.response.data?.is_hotspot[0])
        toast.error(error?.response.data?.is_active[0])
        toast.error(error?.response.data?.number[0])


        // Handle error: Display an error message to the user or perform other actions.
      }
    };
    const isValidEmail = (email) => {
      // Valid email addresses in the format user@example.com
      //  consisting of non-space characters before the @ symbol
      //  followed by non-space characters, and a valid top-level domain (TLD) after the @ symbol
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
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
     <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
      <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Add Hubs
          </Typography>
        </CardHeader>
        <CardBody 
        // className="grid justify-center "
        >
            <form onSubmit={handleSubmit}>
          
          <div className="space-y-4  items-center justify-center  ">
              <Input type="text" color='indigo' id="name_hub" name="hub_name" label="Hub Name" size="xl" />
              <Textarea color='indigo' label="Hub Address" name='address' id="address"/>
              <Input color='indigo' id="number" type='number' name="number" label="Hub number" size="xl"  />
              <Checkbox
               label={
                <Typography color="blue-gray" className="flex font-medium">
                
                  Hotsport Hub
                </Typography>
              }
              name='is_hotspot' ripple={false} className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"/>
              < LocationPicker/>
              <h1 className='text-center'>Assaingn Hub Head</h1>
              <Input color='indigo' type="name"id="name" className='w-full' name="name" label="Head Name" size="xl" />
              <Input color='indigo' type="email"  id="email" name="email" label="Head Email" size="xl" />
              <Input color='indigo' type="number"  id="age"  name="age" label="age" size="xl" />
              <Textarea color='indigo' label="Address" name='admin_address' id="address"/>
              <Input color='indigo' type="number"  id="number" name="phone"  label="Number" size="xl" className=""/>
              <Input color='indigo' type="password" name='password' id="password" label="Password" />
              <Input color='indigo'  type="password"  name='conformpassword' id="user[conformpassword]" label="Conform Password" />
              <Typography
                variant="small"
                color="gray"
                className="mt-2 flex items-center justify-center gap-1 font-normal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-px h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Use at least 8 characters, one uppercase, one lowercase and one number.
              </Typography>
              <div className='flex justify-center items-center'>

              <Button type="submit"   >Create</Button>
              </div>

          </div>
          </form>
          </CardBody>
        
        </Card>
      </div>
    <ToastContainer/>
  </>
  )
}

export default AddHub
