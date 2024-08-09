import './output.css';
import { useState, useEffect } from 'react';
import daresJSON from './dares.json';

function LoadingScreen(){
  return <div className="loadingScreen fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-blue-900">
    <p className="pacifico-regular w-min text-center text-6xl text-white">Drink or Dare</p>
  </div>
}

function Menu({warningScreenOn}){
  return <div className="w-screen h-20 fixed top-0 left-0 bg-blue-900 flex justify-between items-center px-5">
    <p className="pacifico-regular text-white text-xl">Drink or Dare</p>
    <div onClick={() => warningScreenOn(true)} className="group flex items-center justify-center w-12 h-12">
      <div className="bg-white group-active:bg-white/60 absolute rounded-full w-12 h-1 rotate-45"></div>
      <div className="bg-white group-active:bg-white/60 absolute rounded-full w-12 h-1 rotate-n45"></div>
    </div>
  </div>
}

function ViewRules({changeScreen}){
  return <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
    <p className="text-blue-900 text-5xl font-bold">Rules</p>
    <div className="p-8 bg-white rounded-3xl font-medium text-2xl text-center mx-8">It is like truth or dare except there is no dare, instead of a dare the player has to drink a 40ml shot of alcohol.</div>
    <button onClick={() => changeScreen("ModifyPlayers")} className="w-fit active:bg-green-500/70 bg-green-500 rounded-full py-4 px-6 text-white text-2xl font-medium">Start new Game</button>
  </div>
}

function Drink({current, changeScreen}){
  return <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
    <p className="text-blue-900 text-center text-5xl font-bold">{current}</p>
    <div className="p-8 bg-white rounded-3xl font-medium text-2xl text-center mx-8">Did {current} drink the shot?</div>
    <button onClick={() => changeScreen("DrinkOrDare")} className="w-fit active:bg-green-500/70 bg-green-500 rounded-full py-4 px-6 text-white text-2xl font-medium">Yes, continue</button>
  </div>
}

function Dare({current, changeScreen, dare}){
  return <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
    <p className="text-blue-900 text-center text-5xl font-bold">{current}</p>
    <div className="p-8 bg-white rounded-3xl font-medium text-2xl text-center mx-8">{dare}</div>
    <button onClick={() => changeScreen("DrinkOrDare")} className="w-fit active:bg-green-500/70 bg-green-500 rounded-full py-4 px-6 text-white text-2xl font-medium">Continue</button>
  </div>
}

function WarningScreen({message, changeScreen, warningScreenOn}){
  return <div className="fixed w-screen h-screen flex justify-center items-center px-9">
    <div className="shadow-1 flex flex-col gap-4 w-full p-8 bg-white rounded-3xl">
      <p className="text-center text-2xl font-medium">{message}</p>
      <div className="w-full flex gap-4">
        <button onClick={() => {changeScreen("MainScreen");warningScreenOn(false)}} className="w-full active:bg-red-500/70 bg-red-500 rounded-full py-2 text-white text-2xl font-medium">Yes</button>
        <button onClick={() => warningScreenOn(false)} className="w-full active:bg-green-500/70 bg-green-500 rounded-full py-2 text-white text-2xl font-medium">No</button>
      </div>
    </div>
  </div>
}

function DrinkOrDare({changeScreen, current}){
  return <div className="h-screen w-screen px-8 flex flex-col items-center justify-center gap-5">
    <p className="text-blue-900 text-center text-5xl font-bold">{current},<br/>your turn!</p>
    <div onClick={() => changeScreen("Drink")} className="active:text-blue-900 active:border-blue-900 active:bg-transparent border-8 border-blue-900 flex items-center justify-center text-white text-5xl pacifico-regular w-full h-1/4 rounded-3xl bg-blue-900">Drink</div>
    <div onClick={() => changeScreen("Dare")} className="active:text-white active:bg-blue-900 flex items-center justify-center text-blue-900 text-5xl pacifico-regular w-full h-1/4 rounded-3xl bg-transparent border-8 border-blue-900">Dare</div>
  </div>
}

function ModifyPlayers({players = [], addP, removeP, startGame }){
  return <div className="flex flex-col h-screen w-screen items-center justify-start gap-5 pt-32 px-8">
    <p className="text-3xl font-bold text-blue-900">Modify Players</p>
    <div className="flex w-full flex-col gap-2">
      {players.map(el => (
        <div className="flex">
          <input value={el} className="playerInput bg-white text-2xl py-5 px-6 w-full rounded-l-full" type="text" disabled></input>
          <div onClick={ () => removeP(el) } className="flex items-center justify-center w-24 bg-red-500 active:bg-red-600 rounded-r-full">
            <div className="h-1 bg-white rounded-full w-9"></div>
          </div>
        </div>
      ))}
      <div className="flex">
        <input id="playerInput" className="text-2xl py-5 px-6 w-full rounded-l-full" type="text" placeholder="Add player..."></input>
        <div onClick={ () => addP() } className="flex items-center justify-center w-24 bg-blue-900 active:bg-blue-700 rounded-r-full">
          <div className="absolute h-1 bg-white rounded-full w-9"></div>
          <div className="absolute h-1 bg-white rounded-full w-9 rotate-90"></div>
        </div>
      </div>
    </div>
    <button onClick={() => startGame()} className="text-white active:bg-blue-700 text-2xl w-full bg-blue-900 rounded-full py-5">Start Game</button>
  </div>
}

function MainScreen({ changeScreen }){
  return <div className="flex flex-col gap-5 items-center justify-center h-screen w-screen px-8">
    <p className="pacifico-regular text-center w-min text-6xl text-blue-900">Drink or Dare</p>
    <button onClick={ () => changeScreen("ModifyPlayers") } className="text-white active:bg-blue-700 text-2xl w-full bg-blue-900 rounded-full py-5">Start new Game</button>
    <button onClick={() => changeScreen("ViewRules")} className="text-white active:bg-blue-700 text-2xl w-full bg-blue-900 rounded-full py-5">View Rules</button>
  </div>
}

function App() {
  const[MainElement, setMainElement] = useState(<LoadingScreen/>);
  const[warningOn, setWarningOn] = useState(false);
  const[players, setPlayers] = useState(Array(0));
  const[menuOn, setMenuOn] = useState(false);
  const[warningMessage, setWarningMessage] = useState("Are you sure you want to end the game?");
  let current, playersIt = 0;
  let dares = daresJSON.split("#");
  let dare, prevDareId = -1;
  useEffect(() => {
    document.title = "Drink or Dare";
    setTimeout(() => setMainElement(<MainScreen changeScreen={changeScreen}/>), 2000);
  }, [])
  function getRandomInt(max, prevDare) {
    let i = prevDare;
    while(i == prevDare)
      i = Math.floor(Math.random() * max);
    prevDareId = i;
    return i;
  }
  function startGame(){
    if(players.length < 2)
      alert("You must add at least 2 players!");
    else{
      changeScreen("DrinkOrDare");
    }
  }
  function addPlayer(){
    if(!document.querySelector("#playerInput").value)
      return;
    players.push(document.querySelector("#playerInput").value);
    document.querySelector("#playerInput").value = null;
    changeScreen("ModifyPlayers");
  }
  function removePlayer(param){
    let index = players.indexOf(param);
    let arr1 = players.slice(0, index);
    let arr2 = players.slice(index+1, players.length);
    players.splice(0, players.length);
    players.push(...arr1, ...arr2);
    changeScreen("ModifyPlayers");
  }
  function warningScreenOn(on){
    setWarningOn(on);
  }
  function changeScreen(el){
    switch(el){
      case "MainScreen":
      setMainElement(<MainScreen changeScreen={changeScreen}/>);
      setMenuOn(false);
      playersIt = 0;
      break;
      case "ModifyPlayers":
      setMainElement(<ModifyPlayers startGame={startGame} players={players} addP={addPlayer} removeP={removePlayer}/>);
      setMenuOn(true);
      setWarningMessage("Exit to main screen?");
      break;
      case "DrinkOrDare":
      current = players[playersIt];
      playersIt = (playersIt < players.length - 1) ? playersIt + 1 : 0;
      setMainElement(<DrinkOrDare current={current} changeScreen={changeScreen}/>);
      setWarningMessage("Are you sure you want to end the game?");
      break;
      case "Drink":
      setMainElement(<Drink current={current} changeScreen={changeScreen}/>);
      break;
      case "Dare":
      dare = dares[getRandomInt(dares.length, prevDareId)];
      setMainElement(<Dare dare={dare} current={current} changeScreen={changeScreen}/>);
      break;
      case "ViewRules":
      setMainElement(<ViewRules changeScreen={changeScreen}/>);
      setMenuOn(true);
      setWarningMessage("Exit rules?");
      break;
    }
  }
  let menu = <Menu warningScreenOn={warningScreenOn}/>;
  if(!warningOn){
    if(menuOn)
      return <>{menu}{MainElement}</>;
    else
      return MainElement;
  }
  else{
    let warningScreen = <WarningScreen message={warningMessage} changeScreen={changeScreen} warningScreenOn={warningScreenOn}/>;
    return <>{menu}{warningScreen}{MainElement}</>;
  }
}

export default App;