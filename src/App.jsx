import { useEffect, useState } from 'react'
import './App.css'
import Die from "./Die"
import { renderToReadableStream } from 'react-dom/server';
import { isFunctionTypeNode } from 'typescript';
import { nanoid, random } from 'nanoid';
import Confetti from 'react-confetti'
import TimeCounter from "./TimeCounter" 
function App() {
  const [randomNumbers,setRandomNumbers]=useState(()=> generateAllNewDice());
  const [counter ,setCounter]=useState(0)
  
  // let counter=0;
  const randomFitting=randomNumbers.map((prev) => {
    
    return <Die key={prev.id} id={prev.id} value={prev.value} isHeld={prev.isHeld} hold={hold} />
  })

  function generateAllNewDice(){
    let arr=[];
    for(let i=0;i<10;i++){
      let rNum=Math.ceil(Math.random()*6);
      const arrObject= {
        value : rNum,
        isHeld : false,
        id: nanoid()
      }
      arr.push(arrObject);
    }
    return arr;
  }

  function hold(targetId){
    setRandomNumbers(prev=> 
      prev.map(die=>{
        return {
          ...die,
          isHeld: (targetId===die.id && !die.isHeld) ? !die.isHeld : die.isHeld  
          
        }
      })
    )
  }


  
  function rollDice(){
    if(!checkAllSelected){
      setRandomNumbers(prev=>
      prev.map(die=>{
        return {
          ...die,
          value : !die.isHeld ? Math.ceil(Math.random()*6) : die.value
        }
      })
    )
    setCounter(prev=>prev+1);
  }
    else{
      setNewGame()

    }

    
  }

  function checkGameWon(){
    let result=true;
    
    if(randomNumbers.every(die=> die.isHeld) && randomNumbers.every(die=>die.value===randomNumbers[0].value) ){
      console.log("won")
      return true;
    }

    return false;
    
  }

  function setNewGame(){
    setRandomNumbers(generateAllNewDice);
    setCounter(0);
    
  }
  const checkAllSelected= randomNumbers.every(die=>die.isHeld)
  const checkStart=!(randomNumbers.every(die=>!die.isHeld) ) || (counter > 0)
  // console.log(checkStart)
checkGameWon()

  return (
    <main>
      {checkStart && < TimeCounter  isOn={checkStart && !checkAllSelected} />}
      <header>Tenzies</header>
      <p>
      Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <section className="dice-grid"> 
        {randomFitting}
      </section >
      
      <h3>Roll Counter: {counter} </h3>
      <section className="buttons-grid">
        <button className="roll-dice center" onClick={rollDice}>{checkAllSelected? "New Game" : "Roll"}</button>
        <button className="roll-dice" onClick={setNewGame}>Restart</button>
      </section>
      {checkGameWon() &&<Confetti />}
    </main>
  )
}

export default App
