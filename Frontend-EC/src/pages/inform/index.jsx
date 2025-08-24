import React from "react";
import { ChevronRight, Clover, Leaf, Shrub } from "lucide-react";
import Failure from "./components/failure";
import Success from "./components/success";

function Inform({isSuccess=true}) {
    
  return (
    isSuccess ? <Success/> : <Failure/>
  )
}

export default Inform;
