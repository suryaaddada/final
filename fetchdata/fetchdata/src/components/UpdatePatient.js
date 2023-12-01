import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";


export default function UpdatePatient(){
    const [gender,setgender] = useState();
    const [id,setid]=useState();
    const[jsonData,setJsonData]=useState({});
    const [firstname, setfirstname] = useState("");
    const [mobile, setmobile] = useState("");
    const [email, setemail] = useState("");
    const [dob, setdob] = useState("");
    const [date, setdate] = useState("");
    const navigate=useNavigate();
    const[user,setUser]=useState();

    
     useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams(window.location.search).get('data');
            const parsedData = JSON.parse(params);
            setJsonData(parsedData);
            setid(parsedData.id);
            setfirstname(parsedData.firstname);
            setmobile(parsedData.mobile);
            setemail(parsedData.email);
            setdob(parsedData.dob);
            setdate(parsedData.date);
        };
   
        fetchData();
    }, []); 

    const handleDelete=async(id)=>{
       const response= await fetch(`https://localhost:7275/api/Patient/Delete/${id}`,
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
        const updatedPatient={id,firstname,dob,mobile,date,email};
        const response=await fetch(`https://localhost:7275/api/Patient/UpdatePatient/${jsonData.id}?Firstname=${firstname}&dob =${dob}&mobile=${mobile}&date=${date}&email=${email}`,{
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
          //  toast.success('Updated Successfully')
        }
        else{
            console.error('Error in  updating Patient');
        }
    }

    return(
        <>

        <center>
        <h1 >You're Viewing the patient <b>{jsonData.firstname} </b>details.</h1> <br/>
        
        <form >
        <input type="text" value={firstname} placeholder="firstname" onChange={(e) => setfirstname(e.target.value)}></input><br /><br /> 
        <input type="hidden" value={dob} placeholder="dob" onChange={(e) => setdob(e.target.value)}></input>
         
         <input type="text" value={mobile} placeholder="mobile" onChange={(e) => setmobile(e.target.value)}></input><br /><br />
         <input type="text" value={date} placeholder="date" onChange={(e) => setdate(e.target.value)}></input><br /><br />
        
         <input type="text" value={email} placeholder="email" onChange={(e) => setemail(e.target.value)}></input><br /><br />
        
        </form>
        <button className="btn btn-danger mr-2" onClick={() => handleDelete(id)}>Delete</button> &nbsp; &nbsp;&nbsp; 
        <button className="btn btn-warning mr-2" onClick={() => handleUpdate(jsonData.id)}>Update</button> &nbsp; &nbsp;&nbsp;

        </center>
       

        </>
    ) 
}