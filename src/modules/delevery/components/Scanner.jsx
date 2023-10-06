import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-scanner';

function Test({result,setResult,setScan}) {
  const [delay, setDelay] = useState(500);

  const handleError = (err) => {
    console.error(err);
  };

  const handleScan = (data) => {
    console.log(data,"dataaaaaaaaaaaaaaaaaaaa");
    if (data!=null){
      console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      setResult(data);
      setScan(false)
    }
    
    
  };

  useEffect(() => {
    const previewStyle = {
      height: 500,
      width: 320,
    };

    // You can set up any other side effects here if needed.

    return () => {
      // Cleanup code here (if needed) when the component unmounts.
    };
  }, []);
  console.log(result?.text,"resultresultresultresult");

  return (
    <div className='w-full'>
      <QrReader
        delay={delay}
        style={{
          
        }}
        onError={handleError}
        onScan={handleScan}
      />
      
      <p>{result?.text}</p>
    </div>
  );
}

export default Test;