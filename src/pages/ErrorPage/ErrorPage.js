import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function ErrorPage() {

    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            navigate("/");
        }, 2000)
        
    },[navigate])
  return (
    <div>
        <h1 className="text-center"> No Such Page </h1>
    </div>
  )
}
