import React, { useEffect, useReducer, useState } from "react";
import "./makeHamburger.scss";
import bottomBun from "../../assets/foodParts/hamburger/bottombun.svg"
import cheese from "../../assets/foodParts/hamburger/cheese.svg"
import lettuce from "../../assets/foodParts/hamburger/lettuce.svg"
import patty from "../../assets/foodParts/hamburger/patty.svg"
import tomato from "../../assets/foodParts/hamburger/tomato.svg"
import topBun from "../../assets/foodParts/hamburger/topbun.svg"
import { relative } from "path";






const parts = {
  topBun: {
    view: topBun,
    price: 1.5,
    macros: {
      carbs: 1,
      protein: 0,
      fiber: 0,
      fat: 0,
    },
  },
  bottomBun: {
    view: bottomBun,
    price: 1.5,
    macros: {
      carbs: 1,
      protein: 0,
      fiber: 0,
      fat: 0,
    },
  },
  patty: {
    view: patty,
    price: 5,
    macros: {
      carbs: 0,
      protein: 1,
      fiber: 0,
      fat: 0,
    },
  },
  cheese: {
    view: cheese,
    price: 1,
    macros: {
      carbs: 0,
      protein: 0,
      fiber: 0,
      fat: 1,
    },
  },
  lettuce: {
    view: lettuce,
    price: 2,
    macros: {
      carbs: 0,
      protein: 0,
      fiber: 1,
      fat: 0,
    },
  },
  tomato: {
    view: tomato,
    price: 2,
    macros: {
      carbs: 0,
      protein: 0,
      fiber: 1,
      fat: 0,
    },
  },
}

const initialState = { contents: [parts.topBun, parts.bottomBun] };

function reducer(state, action) {
  let tmp = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "addPatty":

      tmp.contents.splice(1, 0, parts.patty)
      return {
        contents: tmp.contents
      }
      break;
    case "addCheese":

      tmp.contents.splice(1, 0, parts.cheese)
      return {
        contents: tmp.contents
      }
      break;
    case "addLettuce":

      tmp.contents.splice(1, 0, parts.lettuce)
      return {
        contents: tmp.contents
      }
      break;
    case "addTomato":

      tmp.contents.splice(1, 0, parts.tomato)
      return {
        contents: tmp.contents
      }
      break;
    case "deletePartsById":

      if ((action.payload == 0) || (action.payload == (state.contents.length - 1))) {
        return state;
      }
      tmp.contents.splice(action.payload, 1)
      return {
        contents: tmp.contents
      }
      break;

    default:
      break;
  }
}


const MakeHamburger = ({ recieveFood }) => {

  const [state, dispatch] = useReducer(reducer, initialState);


  const getTotalPrice = () => {
    let price = 0;
    state.contents.forEach((item, index) => {
      price += item.price
    })

    return price;
  }

  const getTotalCarbs = () => {
    let carbs = 0;
    state.contents.forEach((item, index) => {
      carbs += item.macros.carbs
    })
    return carbs;
  }

  const getTotalFat = () => {
    let fat = 0;
    state.contents.forEach((item, index) => {
      fat += item.macros.fat
    })
    return fat;
  }

  const getTotalFiber = () => {
    let fiber = 0;
    state.contents.forEach((item, index) => {
      fiber += item.macros.fiber
    })
    return fiber;
  }

  const getTotalProtein = () => {
    let protein = 0;
    state.contents.forEach((item, index) => {
      protein += item.macros.protein
    })
    return protein;
  }

  const getTotalMacros = () => {
    return {
      carbs: getTotalCarbs(),
      protein: getTotalProtein(),
      fiber: getTotalFiber(),
      fat: getTotalFat(),
    }
  }


  const drawParts = () => {

    

    let parts = [];

    let positionOffSet = 0;

    let z = state.contents.length;

    state.contents.map(function (part, index) {

      parts.push(
        
          <div className="row no-gutters"  style={{ position: 'relative', zIndex: z, top: positionOffSet }}>
          <div className="col">
            <button className="transparentButton" onClick={() => { dispatch({ type: 'deletePartsById', payload: index }) }} >
              <img className="partImg" src={part.view}></img>
            </button>
          </div>
        </div>
        
        
      )
      
      if(part.view == cheese){
        positionOffSet -= 90;
        z--;
      }

      if(part.view == lettuce){
        positionOffSet -= 15;
        z--;
      }

    })

    return parts;
  }

  return (
    <div id="food" className="container">
      <h1>Let's make Max a burger</h1>
      <p>Select what goes on the burger</p>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="row">
              <div className="col">
                <button className="transparentButton" onClick={() => { dispatch({ type: 'addCheese' }) }}>
                  <img className="selectPartImg" src={cheese}></img>
                </button>
              </div>
              <div className="col">
                <p>Cheese</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <button className="transparentButton" onClick={() => { dispatch({ type: 'addLettuce' }) }}>
                  <img className="selectPartImg" src={lettuce}></img>
                </button>
              </div>
              <div className="col">
                <p>Lettuce</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <button className="transparentButton" onClick={() => { dispatch({ type: 'addPatty' }) }}>
                  <img className="selectPartImg" src={patty}></img>
                </button>
              </div>
              <div className="col"><p>Patty</p></div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <button className="transparentButton" onClick={() => { dispatch({ type: 'addTomato' }) }} >
                  <img className="selectPartImg" src={tomato}></img>
                </button>
              </div>
              <div className="col"><p>Tomato</p></div>
            </div>

          </div>
          <div className="col-6 ">


            <h1>Total price: {getTotalPrice()}</h1>
            <p>({getTotalCarbs() ? getTotalCarbs() + " carbs" : null}{getTotalFat() ? ", " + getTotalFat() + " fat" : null}
              {getTotalFiber() ? ", " + getTotalFiber() + " fiber" : null}{getTotalProtein() ? ", " + getTotalProtein() + " protein" : null})</p>
            <button onClick={() => { recieveFood(getTotalMacros()) }}>Feed this burger</button>



            {drawParts()}

          </div>
        </div>
      </div>


    </div>
  );
};

export default MakeHamburger;
