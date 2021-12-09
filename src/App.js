import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  const pageSize = 6;
  const [progress, setProgress] = useState(10);
  
  const apiKey = process.env.REACT_APP_API_KEY;
  const setYourProgress = (progress)=> {
    setProgress(progress);
  }

  
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={setYourProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country='in' category ="general"/>}></Route>
            <Route exact path="/business" element={<News setProgress={setYourProgress} apiKey={apiKey}  key="business" pageSize={pageSize} country='in' category ="business"/>}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setYourProgress} apiKey={apiKey}  key="entertainment" pageSize={pageSize} country='in' category ="entertainment"/>}></Route>
            <Route exact path="/sports" element={<News setProgress={setYourProgress} apiKey={apiKey}  key="sports" pageSize={pageSize} country='in' category ="sports"/>}></Route>
            <Route exact path="/health" element={<News setProgress={setYourProgress} apiKey={apiKey}  key="health" pageSize={pageSize} country='in' category ="health"/>}></Route>
            <Route exact path="/science" element={<News setProgress={setYourProgress} apiKey={apiKey}  key="science" pageSize={pageSize} country='in' category ="science"/>}></Route>
            <Route exact path="/technology" element={<News setProgress={setYourProgress} apiKey={apiKey}  key="technology" pageSize={pageSize} country='in' category ="technology"/>}></Route>
          </Routes>
        </Router>
      </div>
    );
  
}

export default App