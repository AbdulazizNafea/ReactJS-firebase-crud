import React, {useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import fireDb from '../firebase';


const Home = () => {

  const [data , setData] = useState({});


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
  }, []);

const onDelete= (id)=>{
  if(window.confirm('Are you sure you want delete this user?')){
    fireDb.child(`conacts/${id}`).remove((err)=> {
      if(err){
        toast.error(err)
      }else{
        toast.success("user deleted successfully");
      }
    })
  }
}
  return (
      <div className="">
       <table>
         <tr>
         <td>id</td>
         <td>name</td>
         <td>p</td>
         <td> email</td>

         </tr>
       {Object.keys(data).map((id,index) =>{
         return(
          <tr key={id}> 
          <th> {index + 1}</th>
            <td>{data[id].name}</td>
            <td>{data[id].email}</td>
            <td>{data[id].contact}</td>
            <td>{data[id].id}</td>
            <td>
              <Link to={`/update/${id}`}>
                <button>Edit</button>
              </Link>
             
                <button onClick={ ()=> onDelete(id)}>Delete</button>
             
              <Link to={`/view/${id}`}>
                <button>view</button>
              </Link>


            </td>


            </tr>
         )
       })}
         
       </table>



      </div>
      
  );
}

export default Home;
