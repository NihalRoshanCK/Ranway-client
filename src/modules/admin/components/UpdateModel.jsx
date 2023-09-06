import React from 'react'
import {
    Checkbox,
    Button,
    Input,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
  } from "@material-tailwind/react";
function UpdateModel({staff},{setStaff},{open},{setOpen},{handleupdate},{handleOpen}) {
    
  return (
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

          <form onSubmit={handleupdate()}>
    <DialogBody divider>
      <div className="grid gap-6">
        <Input label="Username" name='name' value='' />
        <Input label="Email" name='email' value='' />

        <Input label="Age" name='age' value='' />
        {/* <Input label="age" name='is_officeStaff' value={staff.user.name} /> */}
        <Input label="Phone" name='Phone' value='' />
        <Textarea label="Address" name='address' value=''/>
        <div className='flex'>
        <Checkbox label="Is_officeStaff" name='is_officeStaff' value={staff.is_officeStaff} />
        <Checkbox name='Is_deleverystaff' label="is_deleverystaff" value={staff.is_deleverystaff} />
        <Checkbox name='Is_active' label="is_active" />
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
    )
}

export default UpdateModel
