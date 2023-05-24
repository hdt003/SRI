import React, { useEffect, useState } from 'react'
import {db} from '../firebase'
import { getDoc,updateDoc } from "firebase/firestore"; 
import { doc } from "firebase/firestore"; 
import diet from "../images/diet.png"
import edit from "../images/edit.png"
import editlight from "../images/edit-light.png"
export default function Profile(props) {
    // console.clear();
    let [fname,setFName]=useState("")
    let [lname,setLName]=useState("")
    let [email,setEmail]=useState("")
    let [dietplan,setDietplan]=useState(0)   
    let [calory,setcalory]=useState(Number.MAX_VALUE)   
    let [clicked,setclicked]=useState(0)
    let [num,setnum]=useState(1)
    useEffect(() => {
        async function fetchData() {
            const docRef =  doc(db, "users", props.uid);
            // await setDoc(doc(db, "users",user_id), docData);
            const docSnap =  await getDoc(docRef);
            if (docSnap.exists()) {
                let data=docSnap.data();
                // console.log("Userdata:",data);
                setEmail(data.email);
                setFName(data.fname);
                setLName(data.lname);
                setDietplan(data.dietplan);
                setcalory(data.calory);
            }
            else {
            // doc.data() will be undefined in this case
            console.log("Data not load!");
            }     
        }
        fetchData();
      },[]);
    //   update user data
  async function updateData(){
    const docRef = doc(db, "users", props.uid);
    if(checknum()===false)
    {
        setnum(0)
        setclicked(1)
        return;
    }
    else{
        setnum(1)
    }
    const data = {
      dietplan: 1,
      calory: calory
    };
    updateDoc(docRef, data)
    .then(docRef => {
        console.log("A New Document Field has been added to an existing document");
    })
    .catch(error => {
        console.log(error);
    })
  }
  function checknum()
{ 
  if (isNaN(calory)) 
  {
    return false;
  }
}
  return (
    <div>
        <div className="container">

            <h3 className='text-center' style={{color: `${props.mode==="dark"?"white":"black"}`}}>Your Profile</h3>
            <div >
                <div className='row'>
            <h4 className={`p-3 col-2 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`} style={{minWidth:"90px"}}>First Name:</h4>
            <h4 className={`p-3 mx-2 col-8 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`}>{fname}</h4>
            </div>
            <div className='row'>
            <h4 className={`p-3 col-2 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`} style={{minWidth:"90px"}}>Last Name:</h4>
            <h4 className={`p-3 mx-2 col-8 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`}>{lname}</h4>
            </div>
            <div className='row'>
            <h4 className={`p-3 col-2 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`} style={{minWidth:"90px"}}>Email:</h4>
            <h4 className={`p-3 mx-2 col-8 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`}>{email}</h4>
            {/* <h2 className='p-3 bg-info bg-opacity-10 border border-info  rounded-3'>Gender:</h2>
            <h2 className='p-3 bg-info bg-opacity-10 border border-info  rounded-3'>Age:</h2> */}
            </div>
            {dietplan?<div className='row'>
            <h4 className={`p-3 col-2 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`} style={{minWidth:"90px"}}>Calory limit:</h4>
            <h4 className={`p-3 mx-2 col-7 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`}>{calory}   
            </h4>
            <img src={props.mode==="light"?edit :editlight} className={`p-3 mx-2 col-1 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"} bg-opacity-25 border border-light  rounded-3`} style={{ height: "65px",width:"65px"}}  alt="..." onClick={()=>{setclicked(!clicked)}}/>        
            </div>:""}
            {!dietplan ? <div className={`card-body my-3 text text-${props.mode==="light"?"dark":"white"}`}>
                <h4 >Do You want to add diet plan?</h4>
                <div>
                <button className="btn btn-danger fw-bold btn-lg col-1 mx-2" onClick={() => {setclicked(1);setDietplan(1);updateData()}}>Yes</button>
                <button className="btn btn-danger fw-bold btn-lg col-1 mx-2">No</button>
                </div>
            </div>:""}
            {clicked ?
                <div className="my-3 row">
                <div className='col-7'>
                <img src={diet} style={{ height: "500px",}} className="card-img-top" alt="..."/>
                </div>
                <div className='col-5'>
                <label htmlFor="exampleFormControlInput1" className="form-label">Enter Maximum calories required for each day<b className='text text-danger'>*</b></label>
                <input className={`form-control ${props.mode==="light"?"light1":"dark1"}`} style={{background:`${props.mode==="light"?"white":"rgb(24,24,24)"}`,color:`${props.mode==="light"?"black":"white"}`}} id="exampleFormControlInput2" placeholder="Enter calories" onChange={(event)=>{setcalory(parseFloat(event.target.value))}}/>
                <br />
                {!num && <><div className='d-flex justify-content-center text-danger fw-bold'>Calory is a number</div><br/></>}
                <div className='d-flex justify-content-center'>
                <button className="btn btn-danger fw-bold btn-md col-4 my-3 " onClick={() => {setclicked(0);updateData()}}>Set Calories</button>
                </div>
                </div>
            </div>:""}
            
            {/* <Diet mode={props.mode}/> */}
            </div>
        </div>
    </div>
  )
}