import { useState, useEffect, useCallback } from 'react'
import { BiReset } from "react-icons/bi"
import './App.css'

function App() {
  const [checker, setChecker] = useState(true);
  const [win, setWin] = useState(false);
  const [winner, setWinner] = useState("");
  

  const [gameArray, setGameArray] = useState([
    {id:1, text:"", disable:false}, {id:2, text:"", disable:false}, {id:3, text:"", disable:false},
    {id:4, text:"", disable:false}, {id:5, text:"", disable:false}, {id:6, text:"", disable:false},
    {id:7, text:"", disable:false}, {id:8, text:"", disable:false}, {id:9, text:"", disable:false},
  ]);

  useEffect(() =>{
    const value = localStorage.getItem("GAME_STATE");
    const confirm = localStorage.getItem("WHO_PLAYS");
    if (value){
      let temp = JSON.parse(value);
      let second = JSON.parse(confirm);
      if (second === undefined){
        setWinner("");
        console.log("nope");
        setChecker(true);
      } else if (second === true){
        setWinner("");
        console.log("something");
        setChecker(second);
      } else if (second == false){
        setWinner("");
        console.log("something");
        setChecker(second);
      }
      setGameArray(temp);
      console.log(second);
    }
  }, []);

  useEffect(() =>{
    localStorage.setItem("GAME_STATE", JSON.stringify(gameArray));
    
    localStorage.setItem("WHO_PLAYS", JSON.stringify(checker));
  }, [gameArray, checker])

  const disableHandler = (id) =>{
    setGameArray(current =>{
      return current.map(now =>{
        if (now.id === id){
          return {...now, disable:true}
        }
        return now
      })
    })
  }


  const reset = () =>{
    setGameArray(current =>{
      return current.map(arr =>{
        return {...arr, text:"", disable:false}
      })
    })
    setWinner("");
  }

  const clickHandler = (id) =>{
    setGameArray(currentArray =>{
        return currentArray.map(arr =>{
            if (arr.id === id){
                if (checker == true){
                  setChecker(false);
                  return {...arr, text:"X"}

              } else if (checker == false) {
                  setChecker(true);
                  return {...arr, text:"0"}
              }
            }
            return arr
        })
    });
  }

  const horizontalHandler = useCallback(() =>{
      for (let i=0; i<9; i+=3){
        if(gameArray[i].text === gameArray[i+1].text && gameArray[i].text === gameArray[i+2].text && gameArray[i].text !== ""){
          if (gameArray[i].text == "0"){
            console.log("O wins");
            setWinner("O wins!");
          } else{
            console.log("X wins");
            setWinner("X wins!");
          }
          setWin(true);
          break;
        }
      }
    },[gameArray])

  const verticalHandler = useCallback(() =>{
    for (let i=0; i<2; i++){
      if(gameArray[i].text === gameArray[i+3].text && gameArray[i].text === gameArray[i+6].text && gameArray[i].text !== ""){
        if (gameArray[i].text == "0"){
          console.log("O wins");
          setWinner("O wins!");
        } else{
          console.log("X wins");
          setWinner("X wins!");
        }
        setWin(true);
        break;
      }
    }
  },[gameArray])

  const diagonalHandler = useCallback(() =>{
    if((gameArray[0].text === gameArray[4].text && gameArray[0].text === gameArray[8].text && gameArray[0].text !== "")
     ||(gameArray[2].text === gameArray[4].text && gameArray[2].text === gameArray[6].text && gameArray[2].text !== ""))
      {
        if (gameArray[4].text == "0"){
          console.log("O wins");
          setWinner("O wins!");
        } else{
          console.log("X wins");
          setWinner("X wins!");
        }
      setWin(true);
    }
  },[gameArray])

  useEffect(() =>{
    horizontalHandler();
    verticalHandler();
    diagonalHandler();
    
  }, [horizontalHandler, verticalHandler, diagonalHandler])

  useEffect(() =>{
    if (win == true){
      setGameArray(current =>{
        return current.map(arr =>{
          return {...arr, disable:true}
        })
      })
    }
  }, [win])



  return (
    <>
      <h1 className="title">Tic-tac-toe</h1>
      <h1 className="winner">{winner}</h1>
      <div className='main'>
        <div className="grid-container">
          {gameArray.map(arr => (
            <button disabled={arr.disable} onClick={() => {clickHandler(arr.id); disableHandler(arr.id);}} className="grid-item" key={crypto.randomUUID()}>{arr.text}</button>
          ))}
        </div>

        <section className="replay">
          <button onClick={reset} ><BiReset size={40}/></button>
        </section>
      </div>
    </>
  )
  
}

export default App
