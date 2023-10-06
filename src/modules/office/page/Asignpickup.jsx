import React,{useEffect,useState} from 'react'
import api from '../officeaxiosInterceptor';
import { 
    Input,
    Checkbox,
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
    Button,
    Select,
    Option
 } from "@material-tailwind/react";
function Asignpickup() {
    const [items,setItems]=useState([])
    const [select,setSelect]=useState([])
    const [pickup,setPickup]=useState([])
    const [checkedItems, setCheckedItems] = useState([]);
    useEffect(() => {
        (async()=>{
            
            api.get(`hub/deliverystaff/`).then((response)=>{
                console.log(response.data)
                setItems(response.data)
            })

            api.get(`product/order/pending_order/`).then((response)=>{
                console.log(response.data)
                setPickup(response.data)
            })
            
            
        })()
    }, []);


    const handleSelect = (event)=>{
        console.log('Event:', event);
        setSelect(event);
    }
    const handleCheckboxChange = (event, pick) => {
        const isChecked = event.target.checked;
        if (isChecked) {
          // If checkbox is checked, add pick.id to the checkedItems array
          setCheckedItems([...checkedItems, pick.id]);
        } else {
          // If checkbox is unchecked, remove pick.id from the checkedItems array
          setCheckedItems(checkedItems.filter((id) => id !== pick.id));
        }
      };

    const handleSubmit=async()=>{
        console.log('Checked Items:', checkedItems);
        api.post(`product/worksheet/`,{"orders":checkedItems,"user":select.id}).then((response)=>{
            console.log(response.data)
            window.location.reload();
        })
    }
  return (
    <div className='h-screen'>
      <div className='mb-4 mt-2 w-full p-5 '>

      <Select  onChange={handleSelect} name='deleveryboy'  color="indigo" label="deleveryboy">
            {items.map((cat) => (
              <Option value={cat} >{cat["user"].name}</Option>
              ))}
          </Select>
      </div>
      <Card className='h-3/4 overflow-scroll bg-blue-gray-100 '>

        <List className=''>
          {
        pickup.map((pick)=>(
            <ListItem className="space-y-6  bg-white" key={pick.id}>
            <label
            //   htmlFor="vertical-list-react"
            htmlFor={`checkbox-${pick.id}`}

              className="flex w-full cursor-pointer items-center px-3 py-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                //   id="vertical-list-react"
                  ripple={false}
                  color='teal'
                  id={`checkbox-${pick.id}`}
                  className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                  onChange={(event) => handleCheckboxChange(event, pick)}
                />
              </ListItemPrefix>
              <div>

              <Typography color="blue-gray" className="font-medium">
                {pick.order_id}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                <span className='font-medium '>From Address:</span>{pick.booking.from_address}
              </Typography>
              </div>
            </label>
          </ListItem>

))

}
    </List>
    </Card>
    <Button className='float-right m-5  ' onClick={handleSubmit}>Submit</Button>

    </div>
  )
}

export default Asignpickup
