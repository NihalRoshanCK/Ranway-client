import React,{useState} from 'react'
import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Button,  
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,  
} from "@material-tailwind/react";
import jwt_decode from 'jwt-decode';
import api from "../axiosInterceptor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserData } from '../../../hooks/useUserData';

const fetchUserData = async (userId) => {
    const response = await api.get(`auths/user/${userId}/`);
    return response.data;
  };
function Profile() {
    var token=localStorage.getItem('access')
  var decoded = jwt_decode(token);
  const userId = decoded.user_id;
   const { data: user, isLoading, isError, refetch } = useUserData(api, userId);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
  });
  const handleOpen = (value) => {
    setData({
      name: user?.name || '',
      email: user?.email || '',
      age: user?.age || '',
      phone: user?.phone || '',
    });
    setOpenDialog(value);
  }
  const handleUpdate=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    console.log(data);
    if (!data.name){
      return toast.warning('name  is required')
    }else if (!data.email) {
      return toast.warning('email  is requird')
    }else if (!data.phone) {
      return toast.warning('phone number is requird')
    }

    if (!isValidName(data.name)) {
      return toast.warning('Enter a valid name format')
    }else if (!isValidEmail(data.email)) {
      return toast.warning('Enter a valid email format')
    }else if (!isValidPhone(data.phone)) {
      return toast.warning('Enter a valid phone number format requires 10 digit')
    }
    if (selectedImage){
      const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      data.profile_picture = selectedImage;
      if (!allowedFileTypes.includes(data.profile_picture.type)) {
        return toast.warning("Invalid file type. Please select a .jpg, .jpeg, .png, or .gif file.");
      }else{
        // console.log("ixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        formData.append('profile_picture', selectedImage)
      }
    }
    if (data.password){
      if (!data.current_password) {
        return toast.warning('Current password is requird to update password')
      }
      if (!data.conform_password) {
        return toast.warning('conform password is requird to update password')
      }
      if (!isValidPassword(data.password)) {
        return toast.warning('Password requires at least one uppercase letter, one lowercase letter, and one special character')
      }
      if (data.password !=data.conform_password){
        return toast.warning('password is not matching')
      }
      formData.append('new_password', data.password)
      formData.append('current_password', data.current_password)
    }
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    
    api.patch(`auths/user/${userId}/`,formData)
          .then((response) => {
          toast.success('profile updated')
          setTimeout(function() {
            setOpenDialog(false);
          }, 2000);
          refetch()
          })
          .catch((error) => {
            console.error(error);

          });

  }
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
  const isValidPassword = (password) => {
    // Password validation using regular expression
    // Requires at least one uppercase letter, one lowercase letter, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  return (
    <>
    {isLoading && <div>Loading...</div>}
    {isError && <div>Error loading user data.</div>}

    <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://imgs.search.brave.com/Mm1uoXquVhpY1L8mxinbbjaR8n2oWkfAje6OCxlMqbQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3bob3RvLTE1/MDM2MTQ0NzItOGM5/M2Q1NmU5MmNlP2l4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4bGVI/QnBiM0psTFdabFpX/UjhNVGg4Zkh4bGJu/d3dmSHg4Zkh3PSZ3/PTEwMDAmcT04MA)] bg-cover	bg-center">
      <div className="absolute inset-0 h-full w-full  bg-blue-500/50" />
    </div>
    <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
      <div className='sm:flex justify-between'>

      <CardBody className="p-4  ">

        {user && (
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="sm:flex sm:space-y-3 items-center gap-6">
              <Avatar
                src={user?.profile_picture}
                alt={user.name ? user?.name : user?.email}
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
              <div>
                <Typography variant="h5"  color={user.name ? "blue-gray" : "red"} className="mb-1 break-all">
                  <span className='text-xl'>Name :</span> {user.name ? user?.name : "Edit the name"} 
                </Typography>
                <Typography variant=" " color= "blue-gray"  className="mb-1 break-all">
                <span className=' text-xl'>Phone :</span> {user?.phone}
                </Typography>
                <Typography variant=" " color= "blue-gray"  className="mb-1 break-all">
                <span className=' text-xl'>Email :</span> {user?.email}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600 break-all"
                  >
                  Hub admin
                </Typography>
              </div>
            </div>
          </div>
        ) }
      
      </CardBody>
      <div className='p-2'>
        <Button color='gray' onClick={handleOpen} >Edit</Button>
      </div>

    </div>
  <ToastContainer className="z-50" />
      
    </Card>
    <Dialog className='max-h-screen overflow-y-auto'
        open={openDialog}
        size= {"md"}
        handler={handleOpen}
      >
        <DialogHeader>Update</DialogHeader>
        <form onSubmit={handleUpdate} encType="multipart/form-data" >

        <DialogBody className='p-2 space-y-4 py-4' divider>
          <Input className=''onChange={(e) =>
            setData({
              ...data,
              name: e.target.value,
            })
          } value={data?.name} label='name'color='indigo' />
          <Input className='' onChange={(e) =>
            setData({
              ...data,
              email: e.target.value,
            })
          } value={data?.email} label='email'color='indigo' />
          <Input className='' onChange={(e) =>
            setData({
              ...data,
              phone: e.target.value,
            })
          } value={data?.phone} label='phone'color='indigo' />
          <Input type='file' color='indigo' onChange={(e) => setSelectedImage(e.target.files[0])}   name='profile_picture' label="Photo"/>
          <Input className='' onChange={(e) =>
            setData({
              ...data,
              current_password: e.target.value,
            })
          } type='password' label='current password'color='indigo' />
          <Input className='' onChange={(e) =>
            setData({
              ...data,
              password: e.target.value,
            })
          } type='password' label='password'color='indigo' />
          <Input className='' onChange={(e) =>
            setData({
              ...data,
              conform_password: e.target.value,
            })
          }type='password' label='conform password'color='indigo' />
        </DialogBody>
        <DialogFooter className='flex-col space-y-3'>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
            >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            type='submit'
            // onClick={() => handleOpen(null)}
            >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
            </form>
  <ToastContainer className="z-50" />

      </Dialog>
  </>
  )
}

export default Profile
