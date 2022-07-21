import React from 'react';
import ReactDOM from 'react-dom';
import "./bootStrap/bootstrap.min.css";
import {GameScore , SelectBox} from './game';
import "./index.css";
// import "./script";
const root = document.getElementById('root');
ReactDOM.render(
  <>
    <GameScore />
    <SelectBox />
  </> ,
  root
);