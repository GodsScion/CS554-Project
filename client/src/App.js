import React from "react";
import "./App.css";
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Login from "./components/users/Login";
import Logout from "./components/users/Logout";
import Register from "./components/users/Register";

import Home from "./components/Home";

import CoursePage from "./components/courses/CoursePage";
import CoursesListPage from "./components/courses/CoursesListPage";

import ProfessorPage from "./components/professors/ProfessorPage";
import ProfessorsListPage from "./components/professors/ProfessorsListPage";

import Discussions from "./components/discussions/Discussions";
import ChatRoom from "./components/discussions/ChatRoom";

import Page404 from "./components/Page404";
import Page400 from "./components/Pg400";
import Mediator from "./components/discussions/Mediator";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const logo = require('./components/img/logo.png')


// removed from package.json in dependencies "web-vitals": "^2.1.4"

const App = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const { isUserLoggedIn, img } = user;



  return (
    <Router>
      <div className="App">
        <header className='App-header'>
          <img src={logo} className='logo' alt='logo'></img>
          <nav className="flex">
            <Link className="showlink" to='/'>
              Home
            </Link>

            <Link className="showlink" to='/courses'>
              All Courses
            </Link>

            <Link className="showlink" to='/professors'>
              All Professors
            </Link>

            <Link className="showlink" to='/discussions'>
              All Discussions
            </Link>
          </nav>
          {!isUserLoggedIn && <Link className="btn btn-primary me-4 col-3" to='/login'>Login</Link>}
          {isUserLoggedIn && <img src={img} className="headerPic rounded-circle me-2" alt='profile pic'></img>}
          {isUserLoggedIn && <Link className="btn btn-warning me-4 col-3" to='/logout'>Logout</Link>}

        </header>
      </div>
      <div className="App-body">
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/logout" element={<Logout />}></Route>


          <Route path="/courses/:id" element={<CoursePage />}></Route>
          <Route path="/courses" element={<CoursesListPage />}></Route>

          <Route path="/professors/:id" element={<ProfessorPage />}></Route>
          <Route path="/professors" element={<ProfessorsListPage />}></Route>

          <Route path="/discussions" element={<Discussions />} />
          <Route path="/discussions/:roomId" element={<ChatRoom />} />
          <Route path="/mediator/:roomName" element={<Mediator />} />

          <Route path="/pg404" element={<Page404 />}></Route>
          <Route path="/pg400/:msg" element={<Page400 />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
};

export default App;
