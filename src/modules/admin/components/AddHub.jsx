import React,{useState} from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea,
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
    
    // const [block,setblock]=useState(false)
    // const [formData,setFormData]=useState({})
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  
    // const [location, setLocation] = useState(defaultLocation);
    // const [zoom, setZoom] = useState(DefaultZoom);
  
    // function handleChangeLocation(lat, lng) {
    //   setLocation({ lat: lat, lng: lng });
    //   // setFormData(formData.location=location);
    // }
  
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
      // const point = new Point(parseFloat(inputObject.longitude), parseFloat(inputObject.latitude));
       const location = {
        latitude: parseFloat(inputObject.latitude),
        longitude: parseFloat(inputObject.longitude)
      };
    
      delete inputObject.latitude;
      delete inputObject.longitude;

      inputObject.location = location;
      console.log(inputObject);
  // Update the inputObject to include the Point data
      // inputObject.location = point;

     
      try {
        // Send the POST request to create the Hub, Staff, and CustomUser
        const response = await api.post('admins/hub/', inputObject);
    
        console.log(response.data);
        alert(`${response.data} Hub has been created successfully`);
      } catch (error) {
        toast.error(error.response.data.message)
        console.error(error);
        // Handle error: Display an error message to the user or perform other actions.
      }
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
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <form onSubmit={handleSubmit}>
          
          <div className="space-y-4 md:space-y-0 md:flex md:space-x-10 p-20 flex items-center justify-center  ">
            <div className="md:w-1/2 space-y-4">
              <Input type="text" pattern="[A-Za-z]+" required title="Only letters allowed" id="name_hub" name="hub_name" label="Hub Name" size="xl" />
              <div className="w-98">
                 <Textarea label="Hub Address" name='address' id="address"/>
              <Input  id="number" name="number" label="Hub number" size="xl" pattern='[0-9]{10}' title="Please enter a 10-digit phone number" />

            </div>
            
              <div className="space-y-4 md:flex md:space-x-6 md:items-center">
                <div >
                  < LocationPicker/>
                </div>
              </div>
              <hr />
              <h1 className='text-center'>Assaingn Hub Head</h1>
              <Input  type="name" pattern="[A-Za-z]+" required title="Only letters allowed" id="name" name="name" label="Head Name" size="xl" />
              <Input  type="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required title="Enter a valid Email"  id="email" name="email" label="Head Email" size="xl" />
              <Input  type="number" pattern="[0-9]{2}" required title="Enter a correct age" id="age"  name="age" label="age" size="xl" />
              <Textarea label="Address" name='admin_address' id="address"/>
              <Input  type="number" required  pattern="[0-9]{10}" title="Please enter a 10-digit contact number" id="number" name="phone"  label="Number" size="xl" className=""/>
              <Input  type="password" required  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{6,}$" title="Please enter  min 6 letter including digit,spacialcharecter,Uppercaseletter " name='password' id="password" label="Password" />
              <Input  type="password"  required  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{6,}$" title="Please enter  min 6 letter including digit,spacialcharecter,Uppercaseletter " name='conformpassword' id="user[conformpassword]" label="Password" />
              <Typography
                variant="small"
                color="gray"
                className="mt-2 flex items-center gap-1 font-normal"
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
              {/* {
              <Button type="submit" disabled >Ripple Effect Off</Button>
                   :  
              <Button type="submit"  >Ripple Effect Off</Button>
            } */}
              <Button type="submit"  >Ripple Effect Off</Button>

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
