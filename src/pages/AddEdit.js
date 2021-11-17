import React,{useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import './AddEdit.css';
//import {getDatabase , ref ,set}  from "firebase/database";
// import 'firebase/compat/database';
import fireDb from '../firebase'
import { Link, useNavigate, useParams } from 'react-router-dom';


const initialState = {
    emp:"",
    name:"",
    email:"",
    contact:"",
};

const AddEdit = () => {

 const [state, setState] = useState(initialState);
 const [data, setData] = useState({});

 const {emp,name, email, contact} = state;
 
 const history = useNavigate();
 const {id} = useParams();
 
 useEffect(() => {
    fireDb.child("conacts").on("value" , (snapshot)=>{
      if(snapshot.val() !== null) {
        setData( { ...snapshot.val() });
      }else{
        setData({});
      }
    })
    
    return () => {
      setData({});
    }
  }, [id]);

  useEffect(() => {
    if(id){
        setState({ ...data[id]})
    }else{
        setState({ ...initialState})
    }
    return()=>{
        setState({ ...initialState})
    }
  }, [id ,data])






 const handleInputChange = (e) => {
    const {name,value} = e.target;
    setState({ ...state, [name]: value  });
 };

 const handleSubmit = (e) => 
 {
    e.preventDefault();
    if(!emp ||!name || !email || !contact)
    {
        toast.error("please provide value in each input field");
    }
    else
    {
        if(!id){
         fireDb.child("conacts").push(state, (err) =>{
            if(err){
                toast.error("System error"+err);
            }else{
                toast.success("user added successfully")
            }
         });
        } else{
            fireDb.child(`conacts/${id}`).set(state, (err) =>{
                if(err){
                    toast.error("System error"+err);
                }else{
                    toast.success("user updated successfully")
                }
            });
        }


        setTimeout( ()=> history("/"), 500);





    //     try {
    //     const fireDb = getDatabase();
    //     set(ref(fireDb, 'conacts/'+id), state );      
    //     toast.success("Contact Added Successfully");
    //     setTimeout( ()=> history("/"), 500);
    // } catch (error) {
    //         toast.error("System error =>081-048-9");
    //     }

    }
    //setTimeout( ()=> history("/"), 500);
    
 };

 return (
        <div style={{marginTop: "100px"}}>
            <form 
            style={{margin: "auto" , padding: "15px" , maxWidth: "400px" , alignContent:"center"}}
            onSubmit={handleSubmit}            
            >

                <label htmlFor="id"> Emp ID </label>
                <input
                 type="text" 
                 id="emp" 
                 name="emp" 
                 placeholder="Emp Id..." 
                 value={emp || ""} 
                 onChange={handleInputChange}
                 />

                <label htmlFor="name"> Name </label>
                <input
                 type="text" 
                 id="name" 
                 name="name" 
                 placeholder="Your Name..." 
                 value={name || ""} 
                 onChange={handleInputChange}
                 />
                
                <label htmlFor="emai"> Email </label>
                <input
                 type="email" 
                 id="email" 
                 name="email" 
                 placeholder="Your Email..." 
                 value={email || ""} 
                 onChange={handleInputChange}
                 />

                <label htmlFor="contact"> Contact </label>
                <input
                 type="number"
                 id="contact" 
                 name="contact" 
                 placeholder="Your Contact..." 
                 value={contact || ""} 
                 onChange={handleInputChange}
                 />
                 
                <input type="submit" value={id ? "update" : "save"}  />
            </form>
            <Link to={"/"} className="link">cancel</Link>
        </div>
    )
}
export default AddEdit
