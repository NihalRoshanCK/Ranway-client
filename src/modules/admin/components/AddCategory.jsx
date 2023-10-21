import { Card, CardBody, CardHeader, Typography,Button,CardFooter,IconButton ,Tooltip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Radio,
    Textarea
  
  } from '@material-tailwind/react';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import React, { useState ,useEffect} from 'react';
  import api from '../../../axiosInterceptor';
  import { useQuery } from 'react-query';
  import { PencilIcon } from "@heroicons/react/24/solid";
  import { FiUserPlus } from 'react-icons/fi';
  const fetchCategory = async () => {
    const response = await api.get(`product/categories/`);
    console.log(response.data);
  
    return response.data;
  };
  
  function  AddCategory() {
    const { data: category, isLoading, isError } = useQuery(['category', fetchCategory], () => fetchCategory());
    const [item,setitem]=useState([])
    const [add,setAdd]=useState(false)
    const [data, setData] = useState({
      name: '',
      description: '',
      price: '',
    });
    const TABLE_HEAD = ["Name", "Price", "Description",'Edit'];
    const [edit,setEdit]=useState(false)
    
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;
      setData({ ...data, [name]: newValue });
    };
    const handleOpen=async(id)=>{
      api.get(`product/categories/${id}`)
            .then((response) => {
            console.log("SingleStaffffffffffffffffffffff",response.data);
            setData(response.data)
            // setTABLE_ROWS(response.data.staffs)
            setitem(response.data)
            setEdit(true)
            })
            .catch((error) => {
              console.error(error);
            });
    }
    const handleEdit=()=>{
      setEdit(!edit)
    }
    const handleCatagoryEdit=async(e)=>{
      e.preventDefault();
      // const formData = new FormData();
      // const inputObject = Object.fromEntries(formData);
      if (!data.name){
        return toast.warning(' name  is required')
      }else if (!data.price) {
        return toast.warning('Price is requird')
      }else if (!data.description) {
        return toast.warning('description is requred')
      }
  
      try {
        // Send the POST request to create the Hub, Staff, and CustomUser
        const response = await api.patch(`product/categories/${data.id}/`, data);
        toast.success("updated")
        setEdit(!edit)
        
        // e.target.reset();
  
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
      
    }
    const handleAddCatagory=async(e)=>{
      e.preventDefault()
      // console.log("in");
      const formData = new FormData(e.target);
      const inputObject = Object.fromEntries(formData);
      console.log(inputObject);
      if (!inputObject.name){
        return toast.warning(' name  is required')
      }else if (!inputObject.price) {
        return toast.warning('Price is requird')
      }else if (!inputObject.description) {
        return toast.warning('description is requred')
      }
      try {
        // Send the POST request to create the Hub, Staff, and CustomUser
        const response = await api.post('product/categories/', inputObject);
        toast.success("Added")
        setAdd(!add)
        
        // e.target.reset();
  
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
    }
    return (
  <>
      <div className='mt-10'>
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Category
            </Typography>
          </CardHeader>
          <CardBody>
          <Button onClick={()=>setAdd(!add)} className='float-right m-5'>Add</Button>
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
              {category && category.map(
                (item, index) => {
                  const isLast = index === category.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={item.id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {/* // <Avatar
                          //   src={staff.user.profile_picture}
                          //   alt={staff.user.name}
                          //   size="md"
                          //   className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          // /> */}
                          <Typography variant="small" color="blue-gray" className="font-bold">
                          {item.name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.price}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.description}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit">
                          <IconButton onClick={()=>handleOpen(item.id)} variant="text" color="blue-gray">
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
      </div>
  
    <Dialog open={edit} className='max-h-screen overflow-y-auto pb-10' handler={setEdit}>
    <form className='' 
    // onSubmit={handleCatagoryEdit}
    onSubmit={handleCatagoryEdit}
     encType="multipart/form-data">
  
    <DialogHeader>Edit category</DialogHeader>
    <DialogBody divider className=" space-y-4 p-2">
    <Input label='Name' value={data?.name} onChange={handleChange}  name='name' type='text' color='indigo'/>
    <Input label='price' value={data?.price} onChange={handleChange}  name='price'  color='indigo'/>
    <Textarea color='indigo' value={data?.description} onChange={handleChange}   name='description' label="description"/>
    </DialogBody>
    <DialogFooter className="space-y-4 sm:space-y-0 sm:flex sm:justify-between">
    <Button variant="outlined" color="red" onClick={()=>handleEdit(!edit)} className="w-full sm:w-auto">
    Close
    </Button>
    <Button variant="gradient" color="green" type="submit" className="w-full sm:w-auto ">
    Add
    </Button>
    </DialogFooter>
              </form>
              <ToastContainer className={"z-50"} />
        </Dialog>   



        <Dialog open={add} className='max-h-screen overflow-y-auto pb-10' handler={()=>setAdd(!add)}>
    <form className='' 
    // onSubmit={handleCatagoryEdit}
    onSubmit={handleAddCatagory}>
  
    <DialogHeader>Add category</DialogHeader>
    <DialogBody divider className=" space-y-4 p-2">
    <Input label='Name'   name='name' type='text' color='indigo'/>
    <Input label='price'  name='price'  color='indigo'/>
    <Textarea color='indigo'  name='description' label="description"/>
    </DialogBody>
    <DialogFooter className="space-y-4 sm:space-y-0 sm:flex sm:justify-between">
    <Button variant="outlined" color="red" onClick={()=>setAdd(!add)} className="w-full sm:w-auto">
    Close
    </Button>
    <Button variant="gradient" color="green" type="submit" className="w-full sm:w-auto ">
    Add
    </Button>
    </DialogFooter>
              </form>
              <ToastContainer className={"z-50"} />
        </Dialog>
  </>
    );
  }
  
  export default AddCategory;
  