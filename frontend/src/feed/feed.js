import React, { useEffect, useReducer, useState } from "react";
import "./feed.scss";

import burgerImg from "../assets/wholeFoods/hamburger.svg"
import iceCreamImg from "../assets/wholeFoods/ice-cream.svg"
import pizzaImg from "../assets/wholeFoods/pizza.svg"
import sushiImg from "../assets/wholeFoods/sushi.svg"
import tacoImg from "../assets/wholeFoods/taco.svg"
import saladImg from "../assets/wholeFoods/salad.svg"
import MakeHamburger from "./makeHamburger/makeHamburger";

const Feed = ({dispatch}) => {


  const [makingWhat, setMakingWhat] = useState("none");

  const showMakeFood = (food) => {
    const anchor = document.querySelector('#makeFoodPlaceHolder')
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start', inline: "nearest" })

    setMakingWhat(food)

  }

  
  const recieveFood = (macros) => {
    dispatch({type: "assignMacros", payload: macros})
    setMakingWhat("none")
    const anchor = document.querySelector('#tomagotchi')
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start', inline: "nearest" })
  }

  

  const renderMakeFood = (option) => {

    switch (option) {
      case "hamburger":
        return <MakeHamburger recieveFood = {recieveFood}></MakeHamburger>
        break;
      case "none":
        return;
        break;
      default:
        throw new RangeError("Invalid food Type!");
        break;
    }
  }



  return (
    <div id="action" >
      <h1 className="title">Feeding</h1>
      <p>What do you want to make for Max?</p>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-3"><button className="transparentButton" onClick={() => showMakeFood("hamburger")}><img className="foodImg" src={burgerImg}></img></button></div>
          <div className="col-3"><button className="transparentButton" onClick={() => showMakeFood("iceCream")}><img className="foodImg" src={iceCreamImg}></img></button></div>
          <div className="col-3"><button className="transparentButton" onClick={() => showMakeFood("pizza")}><img className="foodImg" src={pizzaImg}></img></button></div>
        </div>
        <div className="row justify-content-center">
          <div className="col-3"><button className="transparentButton" onClick={() => showMakeFood("sushi")}><img className="foodImg" src={sushiImg}></img></button></div>
          <div className="col-3"><button className="transparentButton" onClick={() => showMakeFood("taco")}><img className="foodImg" src={tacoImg}></img></button></div>
          <div className="col-3 "><button className="transparentButton" onClick={() => showMakeFood("salad")}><img className="foodImg" src={saladImg}></img></button></div>
        </div>
      </div>

      <div id = "makeFoodPlaceHolder" >{renderMakeFood(makingWhat)}</div>
      


    </div>
  );
};

export default Feed;
