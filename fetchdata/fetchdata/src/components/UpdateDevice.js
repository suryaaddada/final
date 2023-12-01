import { useEffect, useState } from "react"

export default function UpdateDevice(){
    const[info,setInfo]=useState({});
    const[name,setname]=useState();
    const[email,setemail]=useState();
    const[status,setStatus]=useState();
    const[patient,setPatients]=useState([]);

    useEffect(()=>{
       const fetch=async()=>{

        const params=new URLSearchParams(window.location.search).get('data');
        const parsedData=JSON.parse(params);
        setInfo(parsedData);
        setname(parsedData.name);
        setemail(parsedData.patientEmail);
        setStatus(parsedData.status);
       } 


       
      
       fetch();
       fetchPatients();
    },[]);
    function fetchPatients() {
        try {
          fetch('https://localhost:7275/api/Patient/GetPatient')
            .then((response) => response.json())
            .then((data) => {
              setPatients(data);
              console.log(data)
            })
            .catch((error) => {
              console.log(error);
            });
        }
        catch (error) {
          console.log(error);
        }
      }
    return(
        <>
        <center>
        <h1> You're Viewing device <b>{name} </b>details</h1> <br/> <br/>

        <form >
            <input type='text' value={name} onChange={(e)=>setname(e.target.value)} ></input> <br/> <br/>
            <select value='email' onChange={(e)=>setemail(e.target.value)}>
                 <option value="">Select Patient Email</option> 
                {patient.map((p)=>(
                    <option key={p.email} value={p.email}>{p.email}</option>
                ))}
            </select> <br/> <br/>
            <select  name='status' value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option value=''>Select Status</option>
                <option value='Free'>Free</option>
                <option value='Assigned'>Assigned</option>
            </select>
            <option value=""></option>

        </form>
        </center>
        </>
    )

}