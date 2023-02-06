import MyContext from "./MyContext";
import { useEffect, useState } from "react";




const myState = (props) => { 
  
  // total data of active customer
    const [cart, setCart] = useState([]);
    const [bNumber,setBnumber]=useState(0)

      //  get previous cart from localStorage when app start
  useEffect(() => {
      if(localStorage.getItem("cart")!==null){
        setCart(JSON.parse(localStorage.getItem("cart")))
        // console.log("mystate useeffect",localStorage.getItem("cart"))
      }
  }, [])


  async function getNo(){
    const recordNo=await fetch("/api/recordBill", {
      method: "GET",
    });
    const number=await recordNo.json()
     setBnumber(number)
    //  console.log("run getNo")
  }

 useEffect(() => {
  getNo()
  // console.log("getno code useeffect is running")
  }, [])
   
    
  return (
    <MyContext.Provider value={{cart, setCart,bNumber,getNo}}>
        {props.children }
    </MyContext.Provider>                                
  )}

export default myState