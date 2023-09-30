import React, { useEffect, useState } from 'react'


import api from '../../../axiosInterceptor';

import { PencilIcon } from "@heroicons/react/24/solid";
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
  Select,
  Option

} from "@material-tailwind/react";

import { useParams } from 'react-router-dom';
import UpdateModel from './UpdateModel';
 
const TABLE_HEAD = ["Staff", "Address", "joining Date", "Status", "Contact no", "Edit"];
 
// const TABLE_ROWS = [
//   {
//     img: "/img/logos/logo-spotify.svg",
//     name: "Spotify",
//     amount: "$2,500",
//     date: "Wed 3:00pm",
//     status: "paid",
//     account: "visa",
//     accountNumber: "1234",
//     expiry: "06/2026",
//   },
//   {
//     img: "/img/logos/logo-amazon.svg",
//     name: "Amazon",
//     amount: "$5,000",
//     date: "Wed 1:00pm",
//     status: "paid",
//     account: "master-card",
//     accountNumber: "1234",
//     expiry: "06/2026",
//   },
//   {
//     img: "/img/logos/logo-pinterest.svg",
//     name: "Pinterest",
//     amount: "$3,400",
//     date: "Mon 7:40pm",
//     status: "pending",
//     account: "master-card",
//     accountNumber: "1234",
//     expiry: "06/2026",
//   },
//   {
//     img: "/img/logos/logo-google.svg",
//     name: "Google",
//     amount: "$1,000",
//     date: "Wed 5:00pm",
//     status: "paid",
//     account: "visa",
//     accountNumber: "1234",
//     expiry: "06/2026",
//   },
//   {
//     img: "/img/logos/logo-netflix.svg",
//     name: "netflix",
//     amount: "$14,000",
//     date: "Wed 3:30am",
//     status: "cancelled",
//     account: "visa",
//     accountNumber: "1234",
//     expiry: "06/2026",
//   },
// ];
function HubDetails() {
  const [open, setOpen] = useState(false);
  const [staff,setStaff]=useState([])
  const[TABLE_ROWS,setTABLE_ROWS]=useState([])
  const [openRegister,setOpenRegister]=useState(false)
  const [hub,setHub]=useState([])
  const [formData, setFormData] = useState({
    name: '', // Default value
    email: '', // Default value
    age: '',
    phone:'',
    address:'',
    is_officeStaff:false,
    is_deleverystaff:false,
    is_active:false, // Default value
    // ... other form fields
  });
  const isValidEmail = (email) => {
    // Simple email format validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (staff && staff.age !== undefined) {
      setFormData((prevData) => ({
        ...prevData,
        name: staff.user.name,
        email: staff.user.email,
        age: staff.age,
        phone: staff.user.phone,
        address: staff.address,
        is_active: staff.user.is_active,
        is_officeStaff: staff.is_officeStaff,
        is_deleverystaff: staff.is_deleverystaff,
      }));
    }
  }, [staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSelect = (event)=>{
    console.log('Event:', event);
    setSelect(event);
}
  const handleupdate = async (e,staffId) => {
    e.preventDefault();
    const inputObject = Object.fromEntries(Object.entries(formData));
    const errors = {};
      console.log(inputObject);
      if (!inputObject.email) {
        return toast.warning('email is required')
      } else if (!isValidEmail(inputObject.email)) {
        return toast.warning('enter a correct email format')
      }else if (!inputObject.age) {
        return toast.warning('age is required')
      }

      api.patch(`hub/staff/${staffId}/`,inputObject)
          .then((response) => {
          // console.log("alllllllllllllllllllllll",response.data);
          // console.log("Staffffffffffffffffffffff",response.data.staffs);
          // setTABLE_ROWS(response.data.staffs)
          console.log("yessssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
          setOpen(!open)
          })
          .catch((error) => {
            console.error(error);
          });
  }
  const handleOpen = (id) =>{ 
    setOpen(!open);
    api.get(`hub/staff/${id}`)
          .then((response) => {
          // console.log("alllllllllllllllllllllll",response.data);
          console.log("SingleStaffffffffffffffffffffff",response.data);
          // setTABLE_ROWS(response.data.staffs)
          setStaff(response.data)
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
    
      // Append other form data fields to formData as needed
      formData.append('name', e.target.name.value);
      formData.append('email', e.target.email.value);
      formData.append('age', e.target.age.value);
      formData.append('phone', e.target.phone.value);
      formData.append('address', e.target.address.value);
      // formData.append('staff', e.target.staff.value);
      const staffs=e.target.staff.value
      formData.append(staffs, true);
      formData.append('password', e.target.password.value);
      // formData.append('conform_password', e.target.conform_password.value);
      formData.append('hub', id)
      console.log(formData);
      // Check if password and confirm password match
      if (e.target.password.value === e.target.conform_password.value) {
        // Send the formData in your API request
        api.post(`hub/staff/`, formData)
          .then((response) => {
            console.log("Response:", response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    };
    useEffect(() => {
        // Example API request using the api instance
        api.get(`admins/hub/${id}`)
          .then((response) => {
          setTABLE_ROWS(response.data.staffs)
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

  return (
    <Card className="h-full w-full">
          <Dialog open={openRegister} handler={()=>setOpenRegister(!openRegister)}>
            <form onSubmit={handleRegister} encType="multipart/form-data">

        <DialogHeader>Add Staff</DialogHeader>
        <DialogBody divider className="h-[40rem] overflow-y-scroll space-y-4">
          {/* <div className='space-y-3'> */}

          <Input label='Name' name='name' type='text' color='indigo'/>
          <Input label='E-mail' name='email' type='email' color='indigo'/>
          <Input type='number' label='Age' name='age' color='indigo' />
          <Input type='file' color='indigo' name='profile_picture' label="Photo"/>
          <Input type='number' color='indigo' name='phone' label="Phone"/>
          <Textarea color='indigo' name='address' label="address"/>
          <Radio
        name="staff"
        ripple={false}
        // icon={<Icon />}
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
      <Input type='password' color='indigo' name='password' label="Password"/>
      <Input type='password' color='indigo' name='conform_password' label="Conform Password"/>

          <div className="flex gap-10">
      
    </div>

        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={()=>setOpenRegister(!openRegister)}>
            close
          </Button>
          <Button type='submit' variant="gradient" color="green" onClick={""}>
            Save changes
          </Button>
        </DialogFooter>
            </form>
      </Dialog>
       <Dialog open={open} handler={handleOpen}>
    <div className="flex items-center justify-between">
      <DialogHeader>Update </DialogHeader>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-3 h-5 w-5"
        onClick={handleOpen}
      >
        <path
          fillRule="evenodd"
          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
          clipRule="evenodd"
          />
      </svg>
    </div>

    <form onSubmit={(e) => handleupdate(e,staff.id)}>
    <DialogBody divider>
      <div className="grid gap-6">
        <Input label="Username" name='name' value={formData.name} onChange={handleChange} />
        <Input label="Email" name='email' value={formData.email} onChange={handleChange} />

        <Input label="Age" name='age'  value={formData.age} onChange={handleChange} />
        {/* <Input label="age" name='is_officeStaff' value={staff.user.name} /> */}
        <Input label="Phone" name='phone'  value={formData.phone} onChange={handleChange} />
        <Textarea label="Address" name='address' value={formData.address} onChange={handleChange} />
        <div className='flex'>
        <Checkbox label="Is_officeStaff" name='is_officeStaff' checked={formData.is_officeStaff} onChange={handleChange}/>
        <Checkbox name='Is_deleverystaff' label="is_deleverystaff" checked={formData.is_deleverystaff} onChange={handleChange} />
        <Checkbox name='Is_active' label="is_active" checked={formData.is_active} onChange={handleChange} />
        </div>

      </div>
    </DialogBody>
    <DialogFooter className="space-x-2">
      <Button variant="outlined" color="red" onClick={handleOpen}>
        close
      </Button>
      <Button variant="gradient" color="green" type='submit'>
        send message
      </Button>
    </DialogFooter>
        </form>
  </Dialog>

      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            {/* <Typography variant="h5" color="blue-gray">
              Recent Transactions
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last transactions
            </Typography> */}
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            {/* <div className="w-full md:w-72">
              <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
            </div> */}
            <Button onClick={()=>setOpenRegister(!openRegister)} className="flex items-center gap-3" color="blue" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Add staff
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
                         <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                          {/*<Avatar
                            src={
                              account === "visa"
                                ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                            }
                            size="sm"
                            alt={staff.i}
                            variant="square"
                            className="h-full w-full object-contain p-1"
                          />*/}
                        {staff.is_deleverystaff ? "DeleveryStaff" : "Officestaff"}
                        </div> 
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {/* {account.split("-").join(" ")} {accountNumber} */}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {/* {expiry} */}
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
        <Button variant="outlined" color="blue-gray" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
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

  )
}

export default HubDetails
