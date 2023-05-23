import React, { useState } from "react";
import uploadimg from "../component/upload.jpeg";
import { collection, doc, setDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

import {db} from "../firebase";

function Photo() {
  const [imageUpload, setImageUpload] = useState();
  const [imgUrl, setImgUrl] = useState("");
  var [counter, setCounter] = useState(0);

  const uploadFile = async () => {
    if (!imageUpload) return;

    const imageRef = ref(storage, `PhotoHandler/images/${imageUpload.name}`);

   await  uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImgUrl(url);
     
       
const images= collection(db, "images");
     
      
     setDoc(doc(images), {
    url: url, view:1});
     
     
  
        window.alert("Upload success");
      
      });
    });
  };

  const handleClick = () => {
    navigator.clipboard
      .writeText(imgUrl)
      .then(() => {
        window.alert("Link copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };
 
  const incrementViewCount = async () => {
   
      counter=counter+1;
      setCounter(counter);
    
    
  }; 
 
  return (
    <div style={{background:"#b3e6ff" ,height:900,boxShadow:100}}>
      <br />
      <div className="text-center border" style={{marginLeft:50,marginRight:50, padding:10,background:"white"}}>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}>Upload</button>
      <br />
      <br />
      <img
        src={!imgUrl ? uploadimg : imgUrl}
        alt="imagehere"
        height={400}
        width={400}
        onClick={incrementViewCount}
      />
      </div>

      {imgUrl && (
        <div className="border" style={{marginLeft:50,marginRight:50, padding:10,background:"white"}}>
          
          <br />
          <p>view:{counter}</p>
          <br />
          <h2>Generated Url:</h2>
          <a href={imgUrl}  onClick={incrementViewCount} target="_blank" rel="noreferrer">
            {imgUrl}
          </a>
          <br />
          <button onClick={handleClick}>Copy to Share</button>
        </div>
      )}
    </div>
  );
}

export default Photo;
