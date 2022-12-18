import React, { useEffect, useState } from "react"
import axios from "axios"
import check from "../validations"
import { useParams , useNavigate, Link } from "react-router-dom"



const CoursePage = () => {
    const navigate = useNavigate()
    const id = useParams().id || 1
    const[data, setData] = useState(undefined)
    const[reviewsData, setReviewsData] = useState(undefined)
    const[reviewsDataShow, setReviewsDataShow] = useState(<p>No reviews posted!</p>)
    const[rating, setRating] = useState(5)
    const[message, setMessage] = useState("")


    async function getData() {
        try {
            check.isValidNum(id);
        } catch (error) {
            console.error(error.message || error);
            return navigate(`/pg400/${error.message || error}`);
        }
        try {
            // const { data } = await axios.get(`http://localhost:4000/api/characters/${id}`);
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
            setReviewsData(data.reviews)
            setData(data);
        } catch (error) {
            console.error(error.message || error);
            return navigate("/pg404")
        }
    }

    useEffect(() => {getData()},[])

    useEffect(() => {
        setReviewsDataShow(
        <div className="card onHoverShadow">
            {data && data.reviews.map(
            (review) => {
                return <div className="card-body onHoverShadow" >
                            <h3 className="card-title">{review.user.name}</h3>
                            <h4 className="card-title">{review.rating}</h4>
                            <p className="card-text">{review.review}</p>
                            <h5 className="card-subtitle mb-2 text-muted">{review.createdAt}</h5>
                </div> }
            )}
        </div>)
    },[reviewsData])

    async function sendReviewData(event) {
        event.preventDefault();
        try {
            let sendData = {
                "rating": rating,
                "review": message,
            }
            const res = await axios.post(`http://localhost:3000/courses/${data.id}/reviews`,sendData);
            getData()
        } catch (error) {
            console.error(error.message || error);
            alert(error.message || error);
        }
    }


    return (
        <div className="container-fluid m-5 p-2 bg-body">
            <hr/>
            <div className="row col-12">
                <h1 className="col-9">{data && data.name}</h1>
                <h1 className="rating col-9">{data && data.rating}</h1>
            </div>
            <hr/>
            <br/>
            <hr/>
            <div className="container">
                <h2>Description:</h2>
                <p>{data && data.description}</p>
            </div>
            <hr/>
            <div className="container">
                <h2>Professors:</h2>
                {data ? 
                <ul className="list-group">{data.professors.map(
                    (professor) => { return <li className="list-group-item" onClick={() => navigate(`/professors/${professor.id}`)}>{professor.name}</li> }
                )}</ul> 
                : 
                <p>Currently no professors are teaching this course!</p>}
            </div>
            <hr/>
            <div className="container bg-body rounded">
                <h2>Reviews:</h2>
                {data && data.isLoggedIn && <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createReviewModal">Add Review</button>}
                {data && reviewsDataShow}
            </div>
            <hr/>


            {/* <!-- Vertically centered modal --> */}
            {data && data.isLoggedIn && 
             <div className="modal fade" id="createReviewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Your Review</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={sendReviewData}>
                            <div className="mb-3">
                                <label for="rating" className="col-form-label">Select your rating:</label>
                                <select id="rating" name="rating" class="form-select col-1" aria-label="Rating" onChange={()=>{setRating(Event.target.value)}}>
                                <option value={5}>5 / 5</option>
                                <option value={4}>4 / 5</option>
                                <option value={3}>3 / 5</option>
                                <option value={2}>2 / 5</option>
                                <option value={1}>1 / 5</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label for="message" className="col-form-label">Type your review:</label>
                                <textarea className="form-control" id="message" name="message" onChange={()=>{setMessage(Event.target.value)}}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Review</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
             </div>
            }

        </div>
    );
}

export default CoursePage;