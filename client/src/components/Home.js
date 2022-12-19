import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container bg-body rounded">
            <h1>Home</h1>
            <br />
            <p>
                The purpose of this web app is to complete Lab 4 of CS 554 and to gain knowledge and marks, mainly marks.
            </p>
            <p>
                Jokes Aside!
            </p>
            <br />
            <p>
                This Marvel API app will let you view for different characters, stories and comics.
            </p>
            <p>
                Click on the top four links and feel free to explore.
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
        </div>
    )
}

export default Home;