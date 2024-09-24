import React from "react";
import { createContext,useState } from "react";

export const FeedbackContext=createContext()
const FeedbackContextProvider = ({children}) => {
    const[feedback,Setfeedback]=useState([{
        id:1,
        value:'UI',
        name:'Ahmed',
    }])
  return (
    <FeedbackContext.Provider value={feedback}>
        {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContextProvider
