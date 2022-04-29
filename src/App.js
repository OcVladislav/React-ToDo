import logo from './logo.svg';
import React from 'react';
import './App.css';
import image from "./Assets/icon-sun.svg"
import ContainerTaskCreator from './Components/ContainerTaskCreator';
import Clock from './Components/Clock';


const themes = {
  dark: {
    fontColor: "blueviolet",
    background: "black"
  },
  light: {
    fontColor: "#000000",
    background: "#eeeeee"
  }
}

export const ThemeFontContext = React.createContext(themes.dark)

function App() {
  return (
    <ThemeFontContext.Provider value={themes.dark}>
      <div className="App">
        <div className="TodoTitle">
          <h1>TODO</h1>
          <Clock />
          <img src={image} />
        </div>
        <ContainerTaskCreator />
      </div>
    </ThemeFontContext.Provider>
  );
}

export default App;
