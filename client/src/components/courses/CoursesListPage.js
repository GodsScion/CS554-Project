import React, { useEffect, useState } from "react"
import axios from "axios"
import check from "../validations"
import { useParams , useNavigate } from "react-router-dom"

const CoursesListPage = () => {
    const [data, setData] = useState(undefined)
    const [search, setSearch] = useState("")

    useEffect(() => {getData()},[])

    async function getData() {
        try {
            check.isValidNum(id);
        } catch (error) {
            console.error(error.message || error);
            return navigate(`/pg400/${error.message || error}`);
        }
        try {
            // const { data } = await axios.get(`http://localhost:4000/courses`);
            const {data} = { "data": {
                                        "id": 67899384934793493484,
                                        "name": "CS 554 - Web Programming",
                                        "description": "Something hamana hamana hamana...",
                                        "rating": 5.0,
                                        "professors": [
                                            {
                                                "id": "878799238928932",
                                                "name": "P1",
                                            },
                                            {
                                                "id": "878799238928932",
                                                "name": "P1",
                                            }
                                        ],
                                        "reviews":  [
                                                    {
                                                        "id": 32332232323234554,
                                                        "user": {
                                                                  "id": 23234234234234236,
                                                                  "name": "User 1",
                                                                },
                                                        "rating": 4,
                                                        "review": "Hamana hamana hamana...",
                                                        "votes": 0,
                                                        "createdAt": 2352590245
                                                    },
                                                    {
                                                        "id": 98732233333234554,
                                                        "user": {
                                                                  "id": 232342342342342332,
                                                                  "name": "User 2",
                                                                },
                                                        "rating": 2,
                                                        "review": "Hamana2 hamana2 hamana2...",
                                                        "votes": 0,
                                                        "createdAt": 2352590245
                                                    }
                                                ],
                                        "rating": 5.0,
                                        "isLoggedIn": true
                                    } 
                              }
            setData(data);
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