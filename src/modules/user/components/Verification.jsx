import React, { useState } from 'react';
import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";
  import {
    PlusIcon,
    TrashIcon,
    PhotoIcon,
    PencilIcon,
  } from "@heroicons/react/24/outline";
function Verification({setVarifications,varifications}) {
    const [inputFields, setInputFields] = useState([]);


    const labelProps = {
        variant: "small",
        color: "blue-gray",
        className:
          "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
      };

    const handleInputChange = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setInputType(e.target.value);
    };
  
    const handleAddInput = (item) => {
        console.log("hiiiiiiiiiiiiiiiii",item);
      if (inputFields.length >=5) {
        alert('You can add a maximum of 5 input fields.');
        return;
      }
      const val=Date.now()
      setInputFields([...inputFields, { type: item ,id:val, value: '' ,placeholder :`${item==='text' ? 'title' : 'choose an image'}`}]);
    };
  
    const handleRemoveInput = (index) => {
      // const updatedInputs = [...inputFields];
      // updatedInputs.splice(index, 1);
      // setInputFields(updatedInputs);
      const updatedInputs = inputFields.filter((_, i) => i !== index);
      setInputFields(updatedInputs);
      let newobject={...varifications}
      let n=newobject.length
      delete newobject[index];
      for (let i=index+1;i<=n;i++){
        newobject[i]==newobject[i]-1
      }
      setVarifications(newobject)
    };
  
    const handleInputValueChange = (index, event,item) => {
      // const updatedInputs = [...inputFields];
      // updatedInputs[index].value = newValue;
      // setInputFields(updatedInputs);
      const newobject={...varifications};
      if (!newobject[index]) {
        console.log("innnnnnnnnnnnnnnnnnn");
        newobject[index]={}

          
      }else{
        newobject[index][item]=event;
      }
      setVarifications(newobject)
    };
    console.log(varifications);
  return (
    <>
    <div>
      <div>
        {inputFields.map((input,index) => (
          <div key={index} className=' '>
            <Input
            className=''
            color='indigo'
            title={input?.title}
              type={input.type}
              // value={input.value}
              id={input.id+index}
              label={input.placeholder}
              onChange={(e) => {input.type=='text' ?  handleInputValueChange(index, e.target.value,"main"):  handleInputValueChange(index, e.target.files[0],"main")}}
            />
            <div className='flex gap-2 my-2'>
            <Input color='indigo' id={index+"description"} onChange={(e) => handleInputValueChange(index, e.target.value,"sub")}  label='description'/>
            <Button color='red' type='button' className='rounded-full w-12 h-12  ' onClick={() => handleRemoveInput(index)}><TrashIcon className='w-5 h-5'/></Button>
            </div>
          </div>
        ))}
      </div>
      <div className='float-right'>

      <SpeedDial  >
          <SpeedDialHandler  className='bg-black block'>
            <IconButton  size="lg" className="rounded-full ">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent >
            <div   className="relative rounded-full bg-white w-12 h-12 flex justify-center items-center" >
              <PencilIcon  className="h-5 w-5 "  onClick={()=>handleAddInput('text')}/>
              <Typography {...labelProps} >text</Typography>
            </div>
            <div  className="relative rounded-full bg-white w-12 h-12 flex justify-center items-center">
              <PhotoIcon  className="h-5 w-5" onClick={()=>handleAddInput('file')} />
              <Typography {...labelProps}>PHoto</Typography>
            </div>
            
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
    </>
  )
}

export default Verification