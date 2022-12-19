import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams , useNavigate } from "react-router-dom"

const CoursesListPage = () => {
    const [data, setData] = useState(undefined)
    const [search, setSearch] = useState("")

    useEffect(() => {getData()},[])

    async function getData() {
        try {
            const { data } = await axios.get(`http://localhost:4000/courses`);
            let varsi = {"data":[{"id":"63117e3a36ef23055edbf086","name":"Web Programming 1","rating":5}]}
            setData(data.data);
        } catch (error) {
            console.error(error.message || error);
            return navigate("/pg404")
        }
    }


    return(
        <div className="container m-5 p-2 bg-body rounded">
            <form class="d-flex col-md-4 col-lg-4 offset-md-4 offest-lg-4" role="search" onSubmit={handleSearch()}>
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={() => {setSearch(Event.target.value)}}/>
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <hr/>

        </div>
    )

}

export default CoursesListPage