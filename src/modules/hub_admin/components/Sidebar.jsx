import React ,{useState,useEffect} from 'react';

// import HomeIcon from '@heroicons/react/24/solid';

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {SiHomeassistantcommunitystore} from "react-icons/si";
import { open,close } from '../../../Redux/StateReducer';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
function Sidebar() {
  const isOpen=useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const divStyle = {
    // position: "sticky", 
    // top:'20px',// Set the parent element to a positioned element
    // height: "100vh", // 100% of the viewport height
    // width: "100vw", // 100% of the viewport width
    backgroundImage: "linear-gradient(180deg , #414149, #1A1A1A )",
  };
  const text = {
    color: "white",
  };

  const navigate=useNavigate()
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {

    
    setIsMobileView(window.innerWidth < 960);
    
    if (  window.innerWidth >= 960) {
      
      dispatch(open());
      console.log(isOpen); 
    }else if(window.innerWidth <= 960){
      dispatch(close());
      console.log(isOpen); 

    }
  };
  const handleOpen = (value) => {
    onToggle(value);
  };
  const handleLogout=()=>{
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    localStorage.removeItem('role');
    navigate('/hubadminlogin')
    // navigate(-1)
  }
  return (

    <Card
    style={divStyle}
    className={`${
      isOpen &&  isMobileView ? "fixed z-20 h-full overflow-x-hidden" : "hidden lg:block sticky top-4 m-4"
    }   md:h-[calc(95vh)] w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5`}
    >
    <div className=" mb-2 p-4 flex justify-between">
      <Typography style={text} variant="h5" color="text-gray">
        RUNWAY
      </Typography>
      <XMarkIcon
        style={text}
        className={`lg:hidden m-1 h-5 w-5 ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => dispatch(close())}
      />
      
    </div>
    <hr className="my-2 border-blue-gray-50" />
          <List>
            
            <Accordion >
              <Link to={"/hub"}>
               <ListItem className="p-0" >
                <AccordionHeader
                  style={text}
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                  >
                  <ListItemPrefix style={text}>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography
                    style={text}
                    color="blue-gray"
                    className="mr-auto font-normal"
                    >
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
                    </Link>
              <AccordionBody style={text} className="py-1">
                <List className="p-0">
                  <ListItem style={text}>
                    <ListItemPrefix style={text}>
                      <ChevronRightIcon
                        style={text}
                        strokeWidth={3}
                        className="h-3 w-5"
                      />
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem style={text}>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Link to="/hub/huborder" >

            <ListItem style={text}>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Orders
              <ListItemSuffix>
                
              </ListItemSuffix>
            </ListItem>
                  </Link>
                  <ListItem style={text}>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <Link to="/hub/chat" >
            <ListItem style={text}>
              <ListItemPrefix>
                <SiHomeassistantcommunitystore/>
              </ListItemPrefix>
              Chat
              </ListItem>
            </Link>
            <ListItem onClick={handleLogout} className="text-red-500">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
              </ListItem>
          </List>
        </Card>
        
      
  );
}

export default Sidebar;
