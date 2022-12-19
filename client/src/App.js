import React from "react";
//import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

//import { AuthProvider } from "./firebase/Auth";
//import PrivateRoute from "./components/PrivateRoute";
import CoursePage from "./components/courses/CoursePage";
import CoursesListPage from "./components/courses/CoursesListPage";
import ProfessorPage from "./components/professors/ProfessorPage";
import ProfessorsListPage from "./components/professors/ProfessorsListPage";
import Page404 from "./components/Page404";
import Page400 from "./components/Pg400";
import Discussions from "./components/discussions/Discussions";
import ChatRoom from "./components/discussions/ChatRoom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// removed from package.json in dependencies "web-vitals": "^2.1.4"

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navigation />
        </header>
      </div>
      <div className="App-body">
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>

          <Route path="/courses/:id" element={<CoursePage />}></Route>
          <Route path="/courses" element={<CoursesListPage />}></Route>

          <Route path="/professors/:id" element={<ProfessorPage />}></Route>
          <Route path="/professors" element={<ProfessorsListPage />}></Route>
          
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/discussions/:roomId" element={<ChatRoom />} />
          
          <Route path="/pg404" element={<Page404 />}></Route>
          <Route path="/pg400/:msg" element={<Page400 />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
