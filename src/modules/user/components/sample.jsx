// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';
// import { BACKEND_BASE_URL } from '../common/CommonUrl';
// import { toast } from 'react-hot-toast';

// function Otp() {

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const email = queryParams.get('email');
//   const navigate = useNavigate()
//    const [message, setMessage] = useState('')

  
//   const inputRef = useRef({})


//   const [otp, setOtp] = useState({                       //setting 6 objects for 6 different inputs 
//     digitOne: "",
//     digitTwo: "",
//     digitThree: "",
//     digitFour: "",
//     digitFive: "",
//     digitSix: "",
//   }); 


 
//   useEffect(() => {                                       //when the page opening time the first input will be default selected by using this useeffect
//     inputRef.current[0].focus()

//     // inputRef.current[0].addEventListener("paste", pasteText)

//     // return () => inputRef.current[0].removeEventListener("paste", pasteText)
//   },[]);


//   // const pasteText = (event) => {
//   //     const pastedText = event.clipboardData.getData("text")
      
//   //     const fieldValues = {};
//   //     Object.keys(otp).forEach((keys, index) => {
//   //       fieldValues[keys] = pastedText[index]
//   //       setOtp(fieldValues)
//   //       inputRef.current[5].focus()
//   //     })

//   // };


                  
//   const handleBackspace = (e, index) => {                // this function is to remove the otp values from the input field while clicking the backspace button
//       if ( e.key === 'Backspace') {

//         if (index > 0) {                                  // only go back upto first input field 
//           inputRef.current[index - 1].focus()             // moving back to the previous input field
//         }
        
//       }
//   }



//   const handleChange = (e, index) => {
//     const {name, value} = e.target;                        // extracts the name and value properties from the e.target object

//     if (/[^0-9]/g.test(value)) {                            // Prevent non-integer values (special characters, alphabets, etc.)
//         return
//     }

//     setOtp(prev => ({                                      //used to update the state of the component. It sets the OTP (One-Time Password) state, but it does so in a way that only the last character of the value is stored for the corresponding name.
//       ...prev,
//       [name]: value.slice(-1),                             //extracts the last character of the value entered in the input field. 
//     }));

//     if ( value && index < 5) {                             // automatically shift focus to the next input field in a sequence of OTP input fields.
//       inputRef.current[index + 1].focus()                  //refers to the next input field, and .focus() is used to set focus on that field, making it ready for user input.  
//     } 
   
//   }
 
 
//   const renderInput = () => {

//     return Object.keys(otp).map((keys, index) => (                        //otp is a state object containing the OTP digits as key-value pairs, this will give an array of keys corresponding to the OTP digits.
//       <input 
//         key={index}                                                       // efficiently update and manage the list of input fields. It should be a unique identifier for each element in the list.
//         ref={ (element) => ( inputRef.current[index] = element ) }        //This sets a reference to each input element using the inputRef object. 
//         type="text" 
//         value={otp[keys]}
//         name={keys} 
//         className='border-2 w-8 sm:w-16 py-1 mb-3 rounded-lg mr-1 
//                     md:mr-3 text-center text-lg'
//         onChange={ (event) => handleChange(event, index) }
//         onKeyUp={ (e) => handleBackspace(e, index) }
//       />

//     ))

//   }



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const otpString = otp.digitOne + otp.digitTwo + otp.digitThree + otp.digitFour + otp.digitFive + otp.digitSix;

//     console.log(otpString);
//     console.log(email);
//     try {
//       const response = await axios.post(`${BACKEND_BASE_URL}/api/verifyotp/`,{
//         email: email, // Assuming you have the 'email' state in your component
//         otp: otpString 
//       })
//       console.log(response);
//       console.log(response.status,'---------response');
//       if (response.data.status === 200) {
//         // OTP verification successful, redirect to the login page
//         toast.success("OTP Verification Success")
//         navigate('/login');
//       } else {
//         // Handle OTP verification failure
//         toast.error('OTP verification failed.');
//       }
//     }
//     catch (error) {
//       setMessage(error.response.data.error);
//     }
//   };

   

//   return (
//     <div>
//       <div className=' bg-gray-600 w-screen h-screen'>
//         <div className='flex justify-center'>
//           <form onSubmit={handleSubmit} className='mt-36 flex flex-col items-center' action="">
//             <h3 className='text-3xl text-center font-black py-6 mb-12'>Please Fill In the Otp</h3>
//             <div> { renderInput() } </div>
//             <div>
//               <button className='text-lg px-3 py-2 mt-10 border border-solid border-[#3b3b3b] rounded-lg bg-green-700 hover:bg-green-500 hover:text-white' type='submit'>Submit</button>
//             </div>
            
//           </form>
//           <p>{message}</p>
//         </div>
//       </div>
//     </div>

//   )
// }

// export default Otp
import React from 'react'

function sample() {
  return (
    <div>
      
    </div>
  )
}

export default sample
