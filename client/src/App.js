import React from "react";
import "./App.css";

import Home from "./components/Home";

import Page404 from "./components/Page404";
import Page400 from "./components/Pg400";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// removed from package.json in dependencies "web-vitals": "^2.1.4"

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="flex">
            <h3 className="App-title">Marvel API</h3>
          </div>
          <nav>
            <Link className="showlink" to="/">
              Home
            </Link>
            <Link className="showlink" to="/characters/page/1">
              Characters
            </Link>
            <Link className="showlink" to="/comics/page/1">
              Comics
            </Link>
            <Link className="showlink" to="/stories/page/1">
              Stories
            </Link>
          </nav>
        </header>
        <br />
        <br />
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="/pg404" element={<Page404 />}></Route>
            <Route path="/pg400/:msg" element={<Page400 />}></Route>
            <Route path="*" element={<Page404 />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
