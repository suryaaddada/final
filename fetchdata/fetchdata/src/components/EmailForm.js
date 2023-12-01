import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import './EmailForm.css'




const EmailForm = () => {
    const [name, setName] = useState("");
    const[Email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();

        const serviceId = "service_lr9mb09";
        const templateId = "template_hjtky3k";
        const publicKey ="KqXYWVyrbahI8eQ88";

        const templateParams = {
                 from_name : "Kamal (Admin)",
                 to_email : Email,
                 to_name: name,
                 message : message,

        };

    emailjs.send(serviceId,templateId,templateParams,publicKey)
    .then((response)=>{
       console.log("Email Sent Successfully",response);
       setName('');
       setEmail('');
       setMessage(''); 
       toast.success("Email Sent Sucessfully");
    })
    .catch((error)=>{
        console.error("Error Sending Email",error);
    });

    }

    return (

        <form onSubmit={handleSubmit} className="emailForm" style={{display:"flex",flexDirection:"column"}}>
            <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{width:"20vw"}}
            />

            <input
                type="email"
                placeholder="Your Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                style={{width:"20vw"}}
            />


           <textarea 
           cols="20"
           rows="10"
           placeholder="Enter a Message"
           value={message}
           onChange={(e)=>setMessage(e.target.value)}
           style={{width:"20vw"}}
           >
        
           </textarea>
           <br></br>

           <button type="submit"  style={{width:"20vw"}}>Send Email</button>


<ToastContainer/>
        </form>
    )
}

export default EmailForm