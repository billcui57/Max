
import logo from './logo.svg';
import './App.scss';
import treesTop from './assets/background/Trees-top.svg';
import treesMiddle from './assets/background/Trees-middle.svg';
import Tomagatchi from './tamagotchi/tamagotchi';
import Feed from './feed/feed';
import React, { useEffect, useReducer, useState } from "react";




function init(initialStatus) {
  if (localStorage.getItem('status')) {
    return JSON.parse(localStorage.getItem('status'));
  } else {
    return initialStatus;
  }
}


function reducer(state, action) {

  switch (action.type) {

    case "initialize":
      return {
        stats: action.payload.stats
      };
    case "noFood":
      return {
        stats: {
          ...state.stats,
          happiness: state.stats.happiness - 1 > 0 ? state.stats.happiness - 1 : 0,
          health: state.stats.health - 1 > 0 ? state.stats.health - 1 : 0,
        }
      };
    case "noThirst":
      return {
        stats: {
          ...state.stats,
          happiness: state.stats.happiness - 2 > 0 ? state.stats.happiness - 2 : 0,
          health: state.stats.health - 1 > 0 ? state.stats.health - 1 : 0,
        }
      };
    case "noHappiness":
      return {
        stats: {
          ...state.stats,
          health: state.stats.health - 1 > 0 ? state.stats.health - 1 : 0,
        }
      };
    case "decrementCarbs":
      return {
        stats: {
          ...state.stats,
          food: {
            ...state.stats.food,
            carbs: state.stats.food.carbs - 1 > 0 ? state.stats.food.carbs - 1 : 0,
          }
        }
      };
    case "decrementFat":
      return {
        stats: {
          ...state.stats,
          food: {
            ...state.stats.food,
            carbs: state.stats.food.fat - 1 > 0 ? state.stats.food.fat - 1 : 0,
          }
        }
      };
    case "decrementFiber":
      return {
        stats: {
          ...state.stats,
          food: {
            ...state.stats.food,
            carbs: state.stats.food.fiber - 1 > 0 ? state.stats.food.fiber - 1 : 0,
          }
        }
      };
    case "decrementProtein":
      return {
        stats: {
          ...state.stats,
          food: {
            ...state.stats.food,
            carbs: state.stats.food.protein - 1 > 0 ? state.stats.food.protein - 1 : 0,
          }
        }
      };
    case "incrementHappiness":
      return {
        stats: {
          ...state.stats,
          happiness: state.stats.happiness + 1 < 5 ? state.stats.happiness + 1 : 5
        }
      };

      case "assignMacros":
        return {
          stats: {
            ...state.stats,
            food:{
              carbs: state.stats.food.carbs + action.payload.carbs < 5 ? state.stats.food.carbs + action.payload.carbs : 5,
              protein: state.stats.food.protein + action.payload.protein < 5 ? state.stats.food.protein + action.payload.protein : 5,
              fiber: state.stats.food.fiber + action.payload.fiber < 5 ? state.stats.food.fiber + action.payload.fiber : 5,
              fat: state.stats.food.fat + action.payload.fat < 5 ? state.stats.food.fat + action.payload.fat : 5,
            }
          }
        }
    case "reset":
      return init(initialStatus)
    default:
      throw new Error();
  }
}


const initialStatus = {
  stats: {
    health: 5,
    food:
    {
      carbs: 5,
      fat: 5,
      fiber: 5,
      protein: 5
    },
    happiness: 5,
    thirst: 5,
  }
};


function App() {

  const [displayAction, setDisplayAction] = useState("none")
  const [status, dispatch] = useReducer(reducer, initialStatus, init);

  useEffect(() => {
    localStorage.setItem('status', JSON.stringify(status));
    //api set call here
  }, [status])


  




  const renderAction = (option) => {

    switch (option) {
      case "feed":
        return <Feed dispatch = {dispatch} ></Feed>
        break;
      case "none":
        return;
        break;
      default:
        throw new RangeError("Invalid detail Type!");
        break;
    }
  }


  const showDisplayAction = (action) => {

    const anchor = document.querySelector('#actionPlaceHolder')
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start', inline: "nearest" })

    setDisplayAction(action)
  }



  return (
    <div className="App text-center">
      <Tomagatchi  status={status} showDisplayAction={showDisplayAction} dispatch = {dispatch}></Tomagatchi>
      <div id = "actionPlaceHolder">{renderAction(displayAction)}</div>
      
      <div id="background" className="background">
        <img className="background-tile" src={treesTop}></img>
        <img className="background-tile" src={treesMiddle}></img>
        <img className="background-tile" src={treesMiddle}></img>
        <img className="background-tile" src={treesMiddle}></img>
        <img className="background-tile" src={treesMiddle}></img>
        <img className="background-tile" src={treesMiddle}></img>
        <img className="background-tile" src={treesMiddle}></img>
        <img className="background-tile" src={treesMiddle}></img>
        <img className="background-tile" src={treesMiddle}></img>
        <h3 className="footer-author">Made by Bill Cui</h3>
        <p className="footer-creds">Thanks Yvonne Fung for helping with the design!</p>
      </div>
    </div>
  );
}

export default App;
