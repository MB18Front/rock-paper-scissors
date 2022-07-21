/* eslint-disable jsx-a11y/alt-text */
import logo from "./images/logo.svg";
import rock from "./images/icon-rock.svg";
import paper from "./images/icon-paper.svg";
import scissors from "./images/icon-scissors.svg";
import React from 'react';

//game variables (we need to this vars in two or more than 2 functions that's why this vars is global)
let score = 0;
export function GameScore() {
  return (
    //this functional component writed y JSX syntax
    <div className="game-box container text-white mx-100 d-flex justify-content-center align-items-baseline">
      <div className="game-items d-flex container p-sm-4 m-sm-5 p-3 m-3 border">
        <div className="col-6">
          <img id="game-logo" src={logo} />
        </div>
        <div className="col-6" id="user-score">
          <div className="bg-white text-center">
            <p className="p-0 m-0"><b>SCORE</b></p>
            <p className="p-0 m-0" id="score"><b>{score}</b></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export function SelectBox() {
  return (
    <div className="game-main-btn container d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="paper__ col-6">
            <button id="paper" onClick={U_selected_p}  className="btn bg-light">
            <img src={paper}/>
          </button>
        </div>
        <div className="scissors__ col">
          <button id="scissors" className="btn bg-light" onClick={U_selected_S}>
            <img src={scissors}/>
          </button>
        </div>
          <div className="rock__ col">
          <button id="rock" className="btn bg-light" onClick={U_selected_R}>
            <img src={rock}/>
          </button>
        </div>
      </div>
      <div id="show-selected-btns" className="d-none position-relative m-0 p-0 container">
        <div>
          <p className="pic-txt">YOU PICKED</p>
          <div id="user__" className="text-center"></div>
        </div>
        <div className="text-light info container">
          <h2 id="info" className="border p-2 "></h2>
          <button classNames="btn " onClick={restart} id="play-again">PLAY AGAIN</button>
        </div>
        <div>
          <div id="com__" className="text-center">
            <p className="pic-txt">COM PICKED</p>

          </div>
        </div>
      </div>
    </div>
  );
};
let isSelected = false;
let user_selected;
let com_selected;
// handle the click events

function U_selected_p() {
  //paper btn click handler
  if (!isSelected) {
    user_selected = document.getElementById('paper').parentElement; // we select parent element of paper because we styled the parent element
    //we need to create a element like paper and his parent because we use append and if user selected btn = com selected btn then we have only one btn in screen and it's a big bug
    create_copy(user_selected , document.getElementById('user__'));
    isSelected = true;
    com_selector();
  }
};
function U_selected_R() {
  if (!isSelected) {
    user_selected = document.getElementById('rock').parentElement;
    create_copy(user_selected , document.getElementById('user__'));
    isSelected = true;
    com_selector();
  };
};
function U_selected_S() {
  if (!isSelected) {
    user_selected = document.getElementById('scissors').parentElement;
    create_copy(user_selected , document.getElementById('user__'));
    isSelected = true;
    com_selector();
  };
};
function create_copy(element , sendTo) {
  let copyed_parent = document.createElement('div');
  element.classList.forEach(classNames => {
    copyed_parent.classList.add(classNames); // parent elements haven't is or another attribute then I only need parent element class because i set style for parent elements!
  });
  // copying buttons
  //buttons have two attributes(class and id) , I add a another new Id to name copyed
  let btn = element.firstChild;
  let copyed_btn = document.createElement('button');
  let btn_id = btn.id;
  //adding class to button 
  btn.classList.forEach(classNames => {
    copyed_btn.classList.add(classNames)
  });
  copyed_btn.setAttribute('id', btn_id);
  // copying button inner img element
  let images = {
    "rock": rock,
    "paper": paper, 
    "scissors": scissors
    //key words = elements id and we can set inner image with element id :)
  };
  let inner_img_el = document.createElement('img');
  inner_img_el.setAttribute('src', images[btn_id]);
  sendTo.append(copyed_parent);
  copyed_parent.appendChild(copyed_btn);
  copyed_btn.appendChild(inner_img_el);

  //showing the selected and copyed elements with user and com
  document.getElementById('show-selected-btns').classList.replace('d-none', 'd-flex');
  document.querySelector('.row').classList.add('d-none');
};
function com_selector() {
  let btns_arr = [document.getElementById('rock'), document.getElementById('scissors'), document.getElementById('paper')];
  let selected_index = Math.floor(Math.random() * 2);
  com_selected = btns_arr[selected_index].parentElement;
  create_copy(com_selected, document.getElementById('com__'));
  WL_test();//check the if's and return win or lose
};
function WL_test() {
  const info = document.getElementById('info');
  const user = document.querySelector('#user__ button').id;
  const com = document.querySelector('#com__ button').id;
  if ((user === 'rock' && com === 'scissors') || (user === 'scissors' && com === 'paper') || (user === 'paper' && com === 'rock')) {
    info.innerHTML = "YOU WIN";
    score++;
    document.getElementById('score').innerHTML = score;
  } else if (user === com) {
    info.innerHTML = "DRAW!";
  } else {
    info.innerHTML = 'COM WIN !';
  };
};
function restart() {
  const userSelected_delete = document.getElementById('user__').firstChild;
  const comSelected_delete = document.getElementById('com__').lastChild; //we have to delete copyed items
  userSelected_delete.remove();
  comSelected_delete.remove();

  document.getElementById('show-selected-btns').classList.replace('d-flex', 'd-none'); //hide the selected btns disply
  document.querySelector('.row').classList.remove('d-none'); // come back to select box
  isSelected = false; // now user can select another button
}