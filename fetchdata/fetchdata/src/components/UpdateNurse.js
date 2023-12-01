import { set } from "lodash";
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router";



export default function UpdateNurse(){
    const [nurse,setNurse]=useState({});
    const[id,setId]=useState();

    const [gender,setgender] = useState();
    
   
    const [name, setname] = useState("");
    const [mobile, setmobile] = useState("");
    const [email, setemail] = useState("");
    const[status,setStatus]=useState();
    const[patientId,setpatientId]=useState('-');
    const[deviceId,setdeviceId]=useState('-');
    const[result,setresult]=useState('-')
    const navigate=useNavigate();
   
    

    useEffect(()=>{
        const fetch=async()=>{
            const data=new URLSearchParams(window.location.search).get('data');
            const parsedData=JSON.parse(data);
            setNurse(parsedData);
            setId(parsedData.id);
            setname(parsedData.name);
            setmobile(parsedData.mobile);
            setemail(parsedData.email);
            setStatus(parsedData.status);
            

        }
        fetch();
    },[]);
    
    const handleDelete=async(id)=>{
        const response= await fetch(`https://localhost:7275/api/Nurse/Delete/${id}`,
        {
             method:'DELETE',
 
         });
         if(response.ok)
         {
             console.log('Delete success');
             navigate(-1);
         }
         else{
             console.error('Error in deleting the data');
         }
 
 
     } 
     const handleUpdate=async(id)=>{
         const updatedPatient={...nurse,name,mobile,email,status};
         const response=await fetch(`https://localhost:7275/api/Nurse/UpdateNurse/${id}?name=${name}&mobile=${mobile}&patientId=${nurse.patientId}&deviceId=${nurse.deviceId}&email=${email}&result=${nurse.result}&status=${status}`,{
             method:'PUT',
             headers:{
                 'Content-Type':'application/json',
             },
             body:JSON.stringify(updatedPatient),
         });
         if(response.ok)
         {
             console.log('Update Success');
             navigate(-1);
          
         }
         else{
             console.error('Error in  updating Patient');
         }
     }

   

    return(
        <>

        <center>
        <h1 >You're Viewing the patient <b>{nurse.name} </b>details.</h1> <br/>
        
        <form >
        <input type="text" value={name} placeholder="firstname" onChange={(e) => setname(e.target.value)}></input><br /><br /> 
         
         <input type="text" value={mobile} placeholder="mobile" onChange={(e) => setmobile(e.target.value)}></input><br /><br />
        
         <input type="text" value={email} placeholder="email" onChange={(e) => setemail(e.target.value)}></input><br /><br />

         {/* <input type="text" value={status} placeholder="Status" onChange={(e) => setemail(e.target.value)}></input><br /><br /> */}

         <select name='status' value={status} onChange={(e)=>setStatus(e.target.value)}>
         <option value='' >Choose Status</option>
         <option value='Free' >Free</option>
         <option value='Assigned' >Assigned</option>

         </select> <br/> <br/> 
        
        </form>
        <button className="btn btn-danger mr-2" onClick={() => handleDelete(id)}>Delete</button> &nbsp; &nbsp;&nbsp; 
        <button className="btn btn-warning mr-2" onClick={() => handleUpdate(id)}>Update</button> &nbsp; &nbsp;&nbsp;

        </center>
       

        </>
    ) 
}