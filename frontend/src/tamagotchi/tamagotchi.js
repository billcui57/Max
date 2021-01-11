
import React, { useEffect, useReducer, useState } from "react";
import happyFace from "../assets/faces/happyFace.svg";
import deadFace from "../assets/faces/deadFace.svg";
import sadFace from "../assets/faces/sadFace.svg";
import neutralFace from "../assets/faces/neutralFace.svg";
import happinessBarTile from "../assets/statusTiles/happinessBarTile.svg";
import thirstBarTile from "../assets/statusTiles/thirstBarTile.svg";
import foodBarTile from "../assets/statusTiles/foodBarTile.svg";
import healthBarTile from "../assets/statusTiles/healthBarTile.svg";
import informationButton from "../assets/ui/informationButton.svg"
import "./tamagotchi.scss";





const Tamagotchi = ({ status, showDisplayAction, dispatch }) => {


  console.log(status)



  const getFood = () => {
    return Math.min(status.stats.food.carbs, status.stats.food.fat, status.stats.food.fiber, status.stats.food.protein)
  }


  const displayFace = () => {

    const face = () => {
      if (status.stats.health <= 0) {
        return <img key={"deadFace"} className="face" src={deadFace}></img>;
      }

      if (status.stats.happiness <= 1) {
        return <img key={"sadFace"} className="face" src={sadFace}></img>;
      }

      if (status.stats.happiness <= 3) {
        return <img key={"neutralFace"} className="face" src={neutralFace}></img>;
      }

      if (status.stats.happiness <= 5) {
        return <img key={"happyFace"} className="face" src={happyFace}></img>;
      }
    }

    return <button className="transparentButton" onClick={() => { dispatch({ type: 'incrementHappiness' }) }}>{face()}</button>



  };





  const displayStatus = () => {


    const displayBars = (type, amount) => {

      let bar = [];
      switch (type) {
        case "food":
          for (let i = 0; i < amount; i++) {
            bar.push(<button className="transparentButton" onClick={() => { showDisplayAction("feed") }}><img key={"foodBarTile" + i} className="mx-1 statusBarTile" src={foodBarTile}></img></button>);
          }
          break;
        case "thirst":
          for (let i = 0; i < amount; i++) {
            bar.push(<img key={"thirstBarTile" + i} className="mx-1 statusBarTile" src={thirstBarTile}></img>);
          }
          break;
        case "happiness":
          for (let i = 0; i < amount; i++) {
            bar.push(
              <img key={"happinessBarTile" + i} className="mx-1 statusBarTile" src={happinessBarTile}></img>
            );
          }
          break;
        case "health":
          for (let i = 0; i < amount; i++) {
            bar.push(<img key={"healthBarTile" + i} className="mx-1 statusBarTile" src={healthBarTile}></img>);
          }
          break;

        default:
          throw new RangeError("Invalid Status Type!");
          break;
      }
      return <div>{bar}</div>;
    };


    const displayDetail = (type) => {

      const displayDetailBody = (type) => {
        switch (type) {
          case "Hunger":
            return (
              <div>
                <p>Hunger depends on four macros: fiber, protein, carbs, and fat.</p>
                <p>Max's hunger calculated from the minimum of these four values</p>
                <p>For every 3 hours that Max's hunger is at 0, he will lose 1 health and 3 happiness</p>
                <p>You can replenish Max's macros by feeding him food with the appropriate macros</p>
                <p>Here are Max's macros right now:</p>
                <div className="text-center">
                  <h3>Carbs</h3>
                  {displayBars("food", status.stats.food.carbs)}
                  <h3>Protein</h3>
                  {displayBars("food", status.stats.food.protein)}
                  <h3>Fat</h3>
                  {displayBars("food", status.stats.food.fat)}
                  <h3>Fiber</h3>
                  {displayBars("food", status.stats.food.fiber)}
                </div>


              </div>

            );
            break;
          case "Health":
            return (
              <div>
                <p>Health is the most important status for Max.</p>
                <p>If Max's health falls belows 0, he dies!</p>
                <p>Make sure Max does not die by doing things that keeps his health bar above 0, such as ensuring his thirst does not get to 0</p>
              </div>

            );
            break;
          case "Thirst":
            return (
              <div>

              </div>

            );
            break;
          case "Happiness":
            return (
              <div>

              </div>

            );
            break;
          default:
            throw new RangeError("Invalid detail Type!");
            break;
        }
      }

      return <div className="modal fade" id={type + "detailModal"} tabIndex="-1" role="dialog" aria-labelledby={type + "detailModalCenterTitle"} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title" id={type + "detailModalLongTitle"}>{type} Details</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-left">
              {displayDetailBody(type)}
            </div>
          </div>
        </div>
      </div>

    }






    return (
      <div className="container ">
        <div className="row">
          <div className="col-sm">
            <div className="d-flex justify-content-center align-items-start">
              
                <h2>Thirst</h2>
             

              <button className="transparentButton" data-toggle="modal" data-target="#ThirstdetailModal" >
                <img className="infoButtonImg" src={informationButton}  ></img>
              </button>
            </div>
            {displayDetail("Thirst")}
            {displayBars("thirst", status.stats.thirst)}
          </div>
          <div className="col-sm">
            <div className="d-flex justify-content-center align-items-start">
            <button className="transparentButton" onClick={() => { showDisplayAction("feed") }}>
              <h2>Hunger</h2>
              </button>
              <button className="transparentButton" data-toggle="modal" data-target="#HungerdetailModal" >
                <img className="infoButtonImg" src={informationButton}  ></img>
              </button>
            </div>
            {displayDetail("Hunger")}
            {displayBars("food", getFood())}
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <div className="d-flex justify-content-center align-items-start">
              <h2>Health</h2>
              <button className="transparentButton" data-toggle="modal" data-target="#HealthdetailModal">
                <img className="infoButtonImg" src={informationButton}  ></img>
              </button>
            </div>
            {displayDetail("Health")}
            {displayBars("health", status.stats.health)}
          </div>
          <div className="col-sm">
            <div className="d-flex justify-content-center align-items-start">
              <h2>Happiness</h2>
              <button className="transparentButton" data-toggle="modal" data-target="#HappinessdetailModal">
                <img className="infoButtonImg" src={informationButton}  ></img>
              </button>
            </div>
            {displayDetail("Happiness")}
            {displayBars("happiness", status.stats.happiness)}
          </div>
        </div>
      </div>
    );
  };

  const updateStatus = () => {

    dispatch({ type: "decrementCarbs" })


    if (getFood() <= 0) {
      dispatch({ type: 'noFood' })
    }
  };

  const resetStatus = () => {
    localStorage.removeItem("status");
    dispatch({ type: "reset" })
  }

  return (
    <div id="tomagotchi">
      <h1 className="title">Max</h1>
      {status && displayFace()}
      {status && displayStatus()}
      <button onClick={resetStatus}>Reset</button>
      <button onClick={updateStatus}>Update</button>
    </div>
  );
};

export default Tamagotchi;
