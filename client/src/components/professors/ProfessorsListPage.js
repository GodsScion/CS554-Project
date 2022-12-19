import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const xss = require('xss')

const ProfessorsListPage = () => {
    const [data, setData] = useState(undefined)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    useEffect(() => {getData()},[])

    async function getData() {
        try {
            const { data } = await axios.get(`http://localhost:4000/courses`);
            setData(data.data);
        } catch (error) {
            console.error(error.message || error);
            return navigate("/pg404")
        }
    }

    function handleSearch(e) {
        e.preventDefault()
    }


    return(
        <div className="container m-5 p-2 bg-body rounded">
            <hr/>
            <h1>Courses: </h1>
            <hr/>
            <form className="d-flex col-md-4 col-lg-4 offset-md-4 offest-lg-4" role="search" onSubmit={handleSearch}>
                <input className="form-control me-2" type="search" placeholder="Search courses name" aria-label="Search" onChange={(e) => {setSearch(xss(e.target.value).trim())}}/>
                <button className="btn btn-primary" type="submit">Search</button>
            </form>
            <hr/>
            {search && search.length > 0 && 
            <div className="container">
               <h2>Results for "{search}" </h2>
               <br/>
               {data && data.length>0 && data.filter(course => course.name.toLowerCase().includes(search.toLowerCase())).length > 0 && <span className="subtitle"><aside>Click on course for more info</aside></span>}
               <div>
                    {data.filter(course => course.name.toLowerCase().includes(search.toLowerCase())).map(
                        (course) => {
                            return <div key={course.id} className="card mb-2" onClick={() => {navigate(`/courses/${course.id}`)}}>
                                            <div className="card-body onHoverShadow" >
                                                <h3 className="card-title">{course.name}</h3>
                                                <h4 className="card-title">Rating: {course.rating} / 5</h4>
                                            </div>
                                    </div> 
                        })}
                </div>
                {data && data.length>0 && data.filter(course => course.name.toLowerCase().includes(search.toLowerCase()).length < 1)
                 && <p>Looks like nothings matching <strong>"{search}"</strong>!, Try a different name..</p>}
            </div>}
            {(!search || search.length < 1) && 
            <div className="container">
                <h2>List of all courses: </h2>
                <br/>
                <div className="container rounded border p-2">
                    {data && data.length>0 && <span className="subtitle"><aside>Click on course for more info</aside></span>}
                    {data && data.length>0 && data.map(
                        (course) => {
                            return <div key={course.id} className="card mb-2" onClick={() => {navigate(`/courses/${course.id}`)}}>
                                            <div className="card-body onHoverShadow" >
                                                <h3 className="card-title">{course.name}</h3>
                                                <h4 className="card-title">Rating: {course.rating} / 5</h4>
                                            </div>
                                    </div> 
                        }
                    )}
                    {(!data || data.length<1) && <p>LOL, looks like no courses are available! Happy holidays.</p> }
                </div>
            </div>
            }
        <br/>
        <br/>
        </div>
    )

}

export default ProfessorsListPage