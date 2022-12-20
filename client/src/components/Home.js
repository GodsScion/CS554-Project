import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    return (
        <div className="container bg-body rounded m-5 p-4">
            <h1>Home</h1>
            <br />
            <p>
                We all have gone through the same confusion during the course registration countless
                times, which course to choose and to do under which professor. Corstash helps avoid
                that confusion or at least helps in reducing it by providing reviews on the course and
                feedback on professors from the senior students. This is a platform for students to
                interact and discuss various topics related to courses offered at the Stevens Institute of
                Technology
            </p>
            <br />
            <p>Some useful links:</p>
            <nav>
                <Link className="link-text" to='/courses'>
                    All Courses Page
                </Link>
                <br />
                <Link className="link-text" to='/professors'>
                    All Professors Page
                </Link>
                <br />
                <Link className="link-text" to='/discussions'>
                    All Discussions
                </Link>
                <br />
            </nav>
            <br />
            <br />
        </div>
    )
}

export default Home;