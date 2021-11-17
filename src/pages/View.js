import React, { useState, useEffect } from 'react'
import fireDb from '../firebase';
import { Link, useParams } from "react-router-dom";
import './View.css';


const View = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fireDb.child(`conacts/${id}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                setUser({ ...snapshot.val() });
            } else {
                setUser({});
            }
        });

    }, [id]);

    console.log("user", user);
    return (
        <div style={{ marginTop: "50px", }}>
            <div className="card">
                <div className="card-header">
                    <p>
                        user details
                    </p>
                </div>
                    <div className="continer">
                        {/* <strong> ID </strong>
                        <span> {id} </span>
                        <br/><br/> */}

                        <strong> #Emp: </strong>
                        <span> {user.emp} </span>
                        <br/><br/>

                        <strong> Name: </strong>
                        <span> {user.name} </span>
                        <br/><br/>
                        
                        <strong> Email: </strong>
                        <span> {user.email} </span>
                        <br/><br/>
                        
                        <strong> Contact: </strong>
                        <span> {user.contact} </span>
                        <br/><br/>
                        
                        <Link to="/">
                            <button className="btn btn-edit">Go Back</button>
                        </Link>
                        
                    </div>
            </div>
        </div>
    )
}
export default View
