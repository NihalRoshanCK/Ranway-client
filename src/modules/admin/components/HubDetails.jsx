import React, { useEffect, useState } from 'react'


import api from '../../../axiosInterceptor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PencilIcon } from "@heroicons/react/24/solid";
import { FiUserPlus } from 'react-icons/fi';
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Checkbox,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Radio,


} from "@material-tailwind/react";

import { useParams } from 'react-router-dom';
// import UpdateModel from './UpdateModel';
 
const TABLE_HEAD = ["Staff", "Address", "joining Date", "Status", "Contact no", "Edit"];
 

function HubDetails() {
  const [open, setOpen] = useState(false);
  const [staff,setStaff]=useState([])
  const[TABLE_ROWS,setTABLE_ROWS]=useState([])
  const [openRegister,setOpenRegister]=useState(false)
  
  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
    address: '',
    is_officeStaff: false,
    is_deliveryStaff: false,
    is_active: false,
  });

  // This effect updates the form data when the staff data changes
  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff?.user?.name || '',
        email: staff?.user?.email || '',
        age: staff?.age || '',
        phone: staff?.user?.phone || '',
        address: staff?.address || '',
        is_officeStaff: staff?.is_officeStaff || false,
        is_deleverystaff: staff?.is_deleverystaff || false,
        is_active: staff?.user?.is_active || false,
        is_hubadmin:staff?.is_hubadmin || false,
      });
    }
  }, [staff]);
  const handleSelect = (event)=>{
    console.log('Event:', event);
    setSelect(event);
}

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  const newValue = type === 'checkbox' ? checked : value;
  setFormData({ ...formData, [name]: newValue });
};
  const handleupdate = async (e,staffId) => {
    e.preventDefault();
    
    
    if (!formData.name){
      return toast.warning(' Staff name  is required')
    }else if (!formData.email) {
      return toast.warning('staff email  is requird')
    }else if (!formData.age) {
      return toast.warning('Staff age is requred')
    }else if (!formData.phone) {
      return toast.warning('staff phone number is requird')
    }else if (!formData.address) {
      return toast.warning('staff address is requird')
    }

     if (!isValidName(formData.name)) {
      return toast.warning('Enter a valid staff name format')
    }else if (!isValidEmail(formData.email)) {
      return toast.warning('Enter a valid staff email format')
    }else if (!isValidAge(formData.age)) {
      return toast.warning('Enter a valid age which is larger than 18 and lesser than 99')
    }else if (!isValidPhone(formData.phone)) {
      return toast.warning('Enter a valid phone number format requires 10 digit')
    }else if (!isValidAddress(formData.address)) {
      return toast.warning('Enter a valid address format ')
    }
      api.patch(`hub/staff/${staffId}/`,formData)
          .then((response) => {
          console.log("yessssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
          setOpen(!open)
          })
          .catch((error) => {
            console.error(error);
            toast.error(error?.response?.data[0])
            toast.error(error?.response?.data?.message[0])
          });
  }
  const handleOpen = (id) =>{ 
    setOpen(!open);
    api.get(`hub/staff/${id}`)
          .then((response) => {
          console.log("SingleStaffffffffffffffffffffff",response.data);
          // setTABLE_ROWS(response.data.staffs)
          setStaff(response.data)
          fetchdata()
          })
          .catch((error) => {
            console.error(error);
          });


  }

    const {id}=useParams()

    const handleRegister = async (e) => {
      e.preventDefault();
    
      // Create a new FormData object
      const formData = new FormData();
    
      // Append file input data to the FormData
      
      formData.append('profile_picture', e.target.profile_picture.files[0]); // Make sure 'profile_picture' matches the input name
      formData.append('name', e.target.name.value);
      formData.append('email', e.target.email.value);
      formData.append('age', e.target.age.value);
      formData.append('phone', e.target.phone.value);
      formData.append('address', e.target.address.value);
      formData.append('password', e.target.password.value);
      formData.append('conform_password', e.target.conform_password.value);


      if (!formData.get('name')){
        return toast.warning(' Staff name  is required')
      }else if (!formData.get('email')) {
        return toast.warning('staff email  is requird')
      }else if (!formData.get('age')) {
        return toast.warning('Staff age is requred')
      }else if (!formData.get('profile_picture')) {
        return toast.warning('Staff photo is requred')
      }else if (!formData.get('phone')) {
        return toast.warning('staff phone number is requird')
      }else if (!formData.get('address')) {
        return toast.warning('staff address is requird')
      }else if (!formData.get('password')) {
        return toast.warning('staff password is requird')
      }else if (!formData.get("conform_password")) {
        return toast.warning('staff conform password is requird')
      }

      if (!isValidName(formData.get('name'))) {
        return toast.warning('Enter a valid staff name format')
      }else if (!isValidEmail(formData.get('email'))) {
        return toast.warning('Enter a valid staff email format')
      }else if (!isValidAge(formData.get('age'))) {
        return toast.warning('Enter a valid age which is larger than 18 and lesser than 99')
      }else if (!isValidPhone(formData.get('phone'))) {
        return toast.warning('Enter a valid phone number format requires 10 digit')
      }else if (!isValidAddress(formData.get('address'))) {
        return toast.warning('Enter a valid address format ')
      }else if (!isValidPassword(formData.get('password'))) {
        return toast.warning('Password requires at least one uppercase letter, one lowercase letter, and one special character')
      }

      const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

      if (!allowedFileTypes.includes(formData.get('profile_picture').type)) {
        return toast.warning("Invalid file type. Please select a .jpg, .jpeg, .png, or .gif file.");
      }

      // const maxFileSizeMB = 2; // Adjust the maximum file size as needed
      // if (formData.profile_picture.size > maxFileSizeMB * 1024 * 1024) {
      //   return toast.warning(`File size exceeds the maximum allowed size of ${maxFileSizeMB}MB.`);
      // }

      if (formData.get('password') ===formData.get('conform_password')){
        return toast.warning('password is not matching')
      }

      const staffs=e.target.staff.value
      formData.append(staffs, true);
      formData.append('hub', id)
        // Send the formData in your API request
        api.post(`hub/staff/`, formData)
          .then((response) => {
            console.log("Response:", response.data);
            setOpenRegister(false)
            fetchdata()

          })
          .catch((error) => {
            console.error("Error:", error);
            toast.error(error.response.data.message)
          });
    };
    const fetchdata=()=>{
      api.get(`admins/hub/${id}`)
      .then((response) => {
      setTABLE_ROWS(response.data.staffs)
      })
      .catch((error) => {
        console.error(error);
      });
    }
    useEffect(() => {
        // Example API request using the api instance
        fetchdata()
      }, []);

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
          <Dialog open={openRegister} className='max-h-screen overflow-y-auto' handler={()=>setOpenRegister(!openRegister)}>
            <form onSubmit={handleRegister} encType="multipart/form-data">

        <DialogHeader>Add Staff</DialogHeader>
        <DialogBody divider className="  space-y-4 p-2">
          <Input label='Name'  name='name' type='text' color='indigo'/>
          <Input label='E-mail' name='email' type='email' color='indigo'/>
          <Input type='number' label='Age' name='age' color='indigo' />
          <Input type='file' color='indigo'  name='profile_picture' label="Photo"/>
          <Input type='number'   color='indigo' name='phone' label="Phone"/>
          <Textarea color='indigo'  name='address' label="address"/>
          <Radio
        name="staff"
        ripple={false}
        value={"is_deleverystaff"}
        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
        label={
          <Typography color="blue-gray" className="font-normal">
            Delevery Staff
          </Typography>
        }
      />
      <Radio
        name="staff"
        defaultChecked
        ripple={false}
        value={"is_officeStaff"}
        // icon={<Icon />}
        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
        label={
          <Typography color="blue-gray" className="font-normal">
            Office Staff
          </Typography>
        }
      />
       <Radio
        name="staff"
        ripple={false}
        value={"is_hubadmin"}
        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
        label={
          <Typography color="blue-gray" className="font-normal">
            Hub admin
          </Typography>
        }
      />
      <Input type='password' color='indigo' name='password' label="Password"/>
      <Input type='password' color='indigo' name='conform_password' label="Conform Password"/>

     

        </DialogBody>
        <DialogFooter className="space-y-4 sm:space-y-0 sm:flex sm:justify-between">
      <Button variant="outlined" color="red" onClick={()=>setOpenRegister(!openRegister)} className="w-full sm:w-auto">
        Close
      </Button>
      <Button variant="gradient" color="green" type="submit" className="w-full sm:w-auto ">
        Add
      </Button>
    
        </DialogFooter>
            </form>
            <ToastContainer className={"z-50"} />
      </Dialog>




  <Dialog open={open} className='max-h-screen overflow-y-auto ' handler={handleOpen}>
    <div className=' flex items-center justify-between '>

    <DialogHeader>Update</DialogHeader>
    <svg 
    onClick={handleOpen}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="mr-3 h-5 w-5 cursor-pointer"
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
    </div>

    <div className=''>
  <form className='space-y-2 ' onSubmit={(e) => handleupdate(e, staff.id)}>
    <DialogBody className='space-y-4 py-8  px-2' divider>
        <Input
          
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}

        />
        <Input  label="Email" name="email" value={formData.email}
        onChange={handleChange}  />

        <Input
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <Input
          label="Phone"
          
          name="phone"
          value={formData.phone}
          onChange={handleChange}  
        />
        <Textarea label="Address" name="address" value={formData.address} onChange={handleChange} />
          <Checkbox
            label="Is Office Staff"
            name="is_officeStaff"
            checked={formData.is_officeStaff}
            onChange={handleChange}
            />
          <Checkbox
            name="is_deleverystaff"
            label="Is Delivery Staff"
            checked={formData.is_deleverystaff}
            onChange={handleChange}
            />
          <Checkbox
            name="is_hubadmin"
            label="Is Hub Admin"
            checked={formData.is_hubadmin}
            onChange={handleChange}
            />
            <Checkbox
            name="is_active"
            label="Is Active"
            checked={formData.is_active}
            onChange={handleChange}
            />
       
    </DialogBody>
    <DialogFooter className="space-y-2 sm:space-y-0 sm:flex sm:justify-between">
      <Button variant="outlined" color="red" onClick={handleOpen} className="w-full sm:w-auto">
        Close
      </Button>
      <Button variant="gradient" color="green" type="submit" className="w-full sm:w-auto">
        Update
      </Button>
    </DialogFooter>
  </form>
  </div>
  <ToastContainer className="z-50" />
</Dialog>





      <Card className="w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          
          <div className="flex w-full shrink-0 gap-2 md:w-max">
           
            <Button onClick={()=>setOpenRegister(!openRegister)} className="flex items-center gap-3" color="blue" size="sm">
              <FiUserPlus strokeWidth={2} className="h-4 w-4" /> Add staff
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head,index) => (
                <th key={index} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (staff, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={staff.id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={staff.user.profile_picture}
                          alt={staff.user.name}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography variant="small" color="blue-gray" className="font-bold">
                        {staff.user.name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {staff.address}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {staff.joining_date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={staff.user.is_active ? "Active" :"Inactive"}
                          color={
                            staff.user.is_active  ? "green" : "red"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3 ">
                         <div className="h-9 rounded-md border border-blue-gray-50 p-1">
                       
                        {staff.is_hubadmin? "Hub admin" : staff.is_deleverystaff ? "Delevery Staff" : "Office Staff"}
                        </div> 
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton onClick={()=>handleOpen(staff.id)} variant="text" color="blue-gray">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <div className=''>
          
        <Button variant="outlined" color="blue-gray" className='' size="sm">
          Previous
        </Button>
        </div>
        <div className="sm:flex items-center gap-2">
          <IconButton variant="outlined" color="blue-gray" size="sm">
            1
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            2
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            3
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            8
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            9
          </IconButton>
          <IconButton variant="text" color="blue-gray" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" color="blue-gray" size="sm">
          Next
        </Button>
      </CardFooter>
      
    </Card>

    </>
  )
}


export default HubDetails