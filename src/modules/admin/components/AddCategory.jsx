import { 
    Card, 
    CardBody, 
    Typography,
    Button,
    CardFooter,
    IconButton ,
    Tooltip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Chip,
    Textarea,
    CardHeader
  
  } from '@material-tailwind/react';
  import {
    ChevronUpDownIcon,
    PlusCircleIcon
  } from "@heroicons/react/24/outline";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import React, { useState } from 'react';
  import api from '../../../axiosInterceptor';
  import { useQuery  } from 'react-query';
  import { PencilIcon } from "@heroicons/react/24/solid";
  import { FiUserPlus } from 'react-icons/fi';
  // import { queryClient } from 'react-query';
  const fetchCategory = async () => {
    const response = await api.get(`product/categories/`);
    console.log(response.data);
  
    return response.data;
  };
  
  function  AddCategory() {
    const { data: category, isLoading, isError, refetch } = useQuery(['category', fetchCategory], () => fetchCategory(), {
      refetchInterval: 120000, // 2 minutes in milliseconds
    });
    const [item,setitem]=useState([])
    const [add,setAdd]=useState(false)
    const [data, setData] = useState({
      name: '',
      description: '',
      price: '',
    });
    const TABLE_HEAD = ["Name", "Price", "Description","Status",'Edit'];
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
        queryClient.invalidateQueries(['category', fetchCategory]);
        setEdit(!edit)
        
        // e.target.reset();
  
        console.log(response);
        // alert(`${response.data} Hub has been created successfully`);
      } catch (error) {
        console.error(error);
        toast.error(error?.response.data?.message)
        toast.error(error?.response.data?.name[0])
 
  
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
        queryClient.invalidateQueries(['category', fetchCategory]);
        setAdd(!add)
        
        // e.target.reset();
  
        console.log(response);
        // alert(`${response.data} Hub has been created successfully`);
      } catch (error) {
        console.error(error);
        console.log("herereeeeeeeeeeeeeeeeee");
        toast.error(error?.response.data?.name[0])
        toast.error(error?.response.data?.message)
  
  
        // Handle error: Display an error message to the admins or perform other actions.
      }
    }
    return (
  <>
      <div className='mt-10'>
      <Card className="h-full w-full">
      <CardHeader variant="gradient" color="blue" className="mb-2 p-6">
            <Typography variant="h6" color="white">
              Category
            </Typography>
          </CardHeader>
          <div className='float-right mr-8'>
            <PlusCircleIcon onClick={()=>setAdd(!add)}   color='rgb(50,152,238)' className=' w-9 rounded h-9 float-right '/>
          </div>
      <CardBody className="overflow-scroll px-0">
      {/* <Button onClick={()=>setAdd(!add)} className='float-right m-5'>Add</Button> */}

        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
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
                  <tr 
                  // key={name}
                  >
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {/* {job} */}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue"
                          className="font-normal opacity-70 max-w-sm break-words"
                        >
                          {item.price}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          >
                          {/* {job} */}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue"
                          className="font-normal opacity-70 max-w-sm break-words"
                        >
                          {item.description}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          // value={online ? "online" : "offline"}
                          // color={online ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit">
                        <IconButton onClick={()=>handleOpen(item.id)} variant="text">
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
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
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
  