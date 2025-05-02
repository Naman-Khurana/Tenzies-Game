import { useState,useEffect } from "react"


export default function TimeCounter(props){
    const [timer,setTimer]=useState(0);
    let timerIsOn=props.isOn;
    
    
    useEffect(()=>{
        let interval;
        if(timerIsOn){
            interval=setInterval(()=>{
            setTimer(prev=>prev+1);
            },1000);
        }else{
            clearInterval(interval);
        }
        return()=> clearInterval(interval);
    },[timerIsOn])


    return(
        <>
            {timer}
        </>
    )
}