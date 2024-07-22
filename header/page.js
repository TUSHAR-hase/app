"use client"
import Link from "next/link";
import "./header.css"
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
const Header = () => {
    const [detail,setdetail]=useState();
    const router=useRouter();
    const pathname=usePathname();
    useEffect(()=>{
        let data=localStorage.getItem("my_memory");
        if(!data && pathname=="/dashboard"){
            router.push("/signup")
        }else if(data && pathname=="/signup"||data&&pathname=='/login'){
            router.push("/dashboard")
        }
        else{
            setdetail(JSON.parse(data));
        }
    },[])
    const logout=()=>{
        localStorage.removeItem("my_memory");
        router.push("/signup")
        setdetail("");
        
    } 
     const login=()=>{
       router.push("/login")
        
    }

    return (
        <div>
            <nav className="nav">
                <h3 id='logo'>Rv Pizza</h3>
                <div className="navlink"> <Link id="Link" href='/'>Home</Link></div>        
                <div className="navlink"> <Link id="Link" href='/'>Menu</Link></div>
                <div className="navlink"><Link id="Link" href='/'>Contect</Link></div>
                <div className="navlink"><Link id="Link" href='/'>About</Link></div>                   

             <div className="rightnav">
               {detail && detail.name?<>
                <div className="navlink"><Link id="Link" href='/'>Profile</Link></div>
                <div className="navbutton"><button id="button" onClick={logout}>Logout</button></div>
                </>:            <div className="navbutton"><button onClick={login} id="button">Login</button></div>      } 
             
             </div>

            </nav>
        </div>
    )
}
export default Header;