 "use client"
 import { useState } from 'react';
import './sign.css'
import Header from '../header/page';
import { useRouter } from 'next/navigation';
import { Span } from 'next/dist/trace';
const Sign = () => {
    const [name,setname]=useState();
    const [email,setemail]=useState();
    const [password,setpassword]=useState();
    const [conpassword,setconpassword]=useState();
    const [contect,setcontect]=useState();
    const [address,setaddress]=useState();
    const router=useRouter();
    const [passworderror,setpassworderror]=useState(false);
    const [error,seterror]=useState(false);

     const userdata=async()=>{
        if(password!==conpassword){
            setpassworderror(true);
            alert("password and con password not match")
            return false;
          }else{
            setpassworderror(false);
          }
          if(!name||!email||!password||!conpassword||!contect||!address){
            seterror(true)
          
            return false;
          }else{
            seterror(false);
          }
        
        // console.log(name,email,password,conpassword,contect,address)
        let responce=await fetch("http://localhost:3000/api",{
            method:"POST",
            body:JSON.stringify({name,email,password,conpassword,contect,address})
        }) 
        responce=await responce.json();
        console.log(responce);
      if(responce.success){
        const {info}=responce
        delete info.password
        delete info.conpassword
        localStorage.setItem("my_memory",JSON.stringify(info));
        router.push("/dashboard")
      }
     
     }
    return (
        <div>
            <Header></Header>
        <div id='top'>
            <div> <h1 id='h1sign'>Sign Up</h1></div>
            <div id='main'>

                <div id='container1'>
                    <div >
                        <input type='text' className="sign_input"value={name} required onChange={(e)=>{setname(e.target.value)}} placeholder="Enter the Name"></input>{error && !name && <span>Enter name please</span>}
                    </div>
                    <div>
                        <input type='email' className="sign_input" value={email} required onChange={(e)=>{setemail(e.target.value)}} placeholder="Enter the Email"></input>{error && !email&& <span>Enter name please</span>}
                    </div>
                    <div>
                        <input type='password' className="sign_input"value={password} required onChange={(e)=>{setpassword(e.target.value)}} placeholder="Enter the Password"></input>{passworderror && !password&&<span> password and conform password not match</span>}
                    </div>

                </div>
                <div id='container2'>
                    <div>
                        <input type='number' className="sign_input" value={contect} required onChange={(e)=>{setcontect(e.target.value)}} placeholder="Enter the Contect"></input>{error && !contect && <span>Enter contect please</span>}
                    </div>
                    <div>
                        <input type='text' className="sign_input" value={address} required onChange={(e)=>{setaddress(e.target.value)}}placeholder="Enter the Address"></input>{error && !address && <span>Enter name address</span>}
                    </div>
                    <div>
                        <input type='passwoed' className="sign_input" value={conpassword} required onChange={(e)=>{setconpassword(e.target.value)}} placeholder="Enter the conform Password"></input>{passworderror &&!conpassword&&<span> password and conform password not match</span>}
                    </div>

                </div>
            </div>
            <div>
                <button type='submit' onClick={userdata} id="signbutton">Sign Up</button>
            </div>
        </div>
        </div>
    )
}
export default Sign;