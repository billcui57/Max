
import logo from './logo.svg';
import './App.scss';
import treesTop from './assets/background/Trees-top.svg';
import treesMiddle from './assets/background/Trees-middle.svg';
import Tomagatchi from './tamagotchi/tamagotchi';
import Feed from './feed/feed';
import React, { useEffect, useReducer, useState } from "react";



function reducer(state, action) {

  switch (action.type) {

    case "initialize":
      return {
        ...action.payload,
        status: {
          ...action.payload.status,
          stats: action.payload.status.stats
        }

      };
      case "reset":
      return(initialUser)
    case "noFood":
      return {
        ...action.payload,
        status: {
          ...action.payload.status,
          stats: {
            ...state.status.stats,
            happiness: state.status.stats.happiness - 1 > 0 ? state.status.stats.happiness - 1 : 0,
            health: state.status.stats.health - 1 > 0 ? state.stats.status.health - 1 : 0,
          }
        }
      };
    case "noThirst":
      return {
        ...action.payload,
        status: {
          ...action.payload.status,
          stats: {
            ...state.status.stats,
            happiness: state.status.stats.happiness - 2 > 0 ? state.status.stats.happiness - 2 : 0,
            health: state.status.stats.health - 1 > 0 ? state.stats.status.health - 1 : 0,
          }
        }
      };
    case "noHappiness":
      return {
        ...action.payload,
        status: {
          ...action.payload.status,
          stats: {
            ...state.status.stats,
            health: state.status.stats.health - 1 > 0 ? state.status.stats.health - 1 : 0,
          }
        }
      };
    case "decrementCarbs":
      return {
        ...action.payload,
        status: {
          ...action.payload.status,
          stats: {
            ...state.status.stats,
            food: {
              ...state.status.stats.food,
              carbs: state.status.stats.food.carbs - 1 > 0 ? state.status.stats.food.carbs - 1 : 0,
            }
          }
        }
      };
    case "decrementFat":
      return {
        ...action.payload,
        status: {
          ...action.payload.status,
          stats: {
            ...state.status.stats,
            food: {
              ...state.status.stats.food,
              carbs: state.status.stats.food.fat - 1 > 0 ? state.status.stats.food.fat - 1 : 0,
            }
          }
        }
      };
    case "decrementFiber":
      return {
        ...action.payload,
        status: {
          ...action.payload.status,
          stats: {
            ...state.status.stats,
            food: {
              ...state.status.stats.food,
              carbs: state.status.stats.food.fiber - 1 > 0 ? state.status.stats.food.fiber - 1 : 0,
            }
          }
        }
      };
    case "decrementProtein":
      return {
        ...action.payload,
        status: {
          ...action.payload.status,
          stats: {
            ...state.status.stats,
            food: {
              ...state.status.stats.food,
              carbs: state.status.stats.food.protein - 1 > 0 ? state.status.stats.food.protein - 1 : 0,
            }
          }
        }
      };
    case "incrementHappiness":
      return {
        ...action.payload,
        status: {
          ...action.payload.status,
          stats: {
            ...state.status.stats,
            happiness: state.status.stats.happiness + 1 < 5 ? state.status.stats.happiness + 1 : 5
          }
        }
      };

    case "assignMacros":
      return {
        ...action.payload,
        status: {
          ...action.payload.status,
          stats: {
            ...state.status.stats,
            food: {
              carbs: state.status.stats.food.carbs + action.payload.carbs < 5 ? state.status.stats.food.carbs + action.payload.carbs : 5,
              protein: state.status.stats.food.protein + action.payload.protein < 5 ? state.status.stats.food.protein + action.payload.protein : 5,
              fiber: state.status.stats.food.fiber + action.payload.fiber < 5 ? state.status.stats.food.fiber + action.payload.fiber : 5,
              fat: state.status.stats.food.fat + action.payload.fat < 5 ? state.status.stats.food.fat + action.payload.fat : 5,
            }
          }
        }
      }

    default:
      throw new Error();
  }
}


const initialUser = {
  status: {
    balance: 10,
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
  }

};


function App() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [displayAction, setDisplayAction] = useState("none")
  const [user, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    fetch("/api/users/joe")
    .then(res => res.json())
    .then(
      (result) => {  
        dispatch({type: "initialize", payload:result});
        setIsLoaded(true)
      },
      (error) => {
        console.log(error)
      }
    )

  }, [])


  



  const renderAction = (option) => {

    switch (option) {
      case "feed":
        return <Feed dispatch={dispatch} ></Feed>
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
      {isLoaded ? <Tomagatchi status={user.status} showDisplayAction={showDisplayAction} dispatch={dispatch}></Tomagatchi> : <h1>Loading...</h1>}
      <div id="actionPlaceHolder">{renderAction(displayAction)}</div>

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
