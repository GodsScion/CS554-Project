import React, { useEffect, useState } from "react"
import axios from "axios"
import check from "../validations"
import { useParams , useNavigate } from "react-router-dom"



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
            // const { data } = await axios.get(`http://localhost:4000/courses/${id}`);
            const {data} = { "data": {
                                        "id": 67899384934793493484,
                                        "name": "CS 554 - Web Programming",
                                        "description": "Something hamana hamana hamana...",
                                        "rating": 5.0,
                                        "professors": [
                                            {
                                                "id": "878799238128932",
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
                                                        "id": 98732233333234551,
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
        <div className="container">
            {data && data.reviews.map(
            (review) => {
                return <div key={review.id} className="card mb-2">
                        <div className="card-body onHoverShadow" >
                            <h4 className="card-title">{review.user.name}</h4>
                            <h5 className="card-title">Rating: {review.rating} / 5</h5>
                            <p className="card-text">{review.review}</p>
                            <h6 className="card-subtitle text-muted subtitle">{review.createdAt}</h6>
                        </div>
                       </div> 
                       }
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
            
            const res = await axios.post(`http://localhost:4000/courses/${data.id}/reviews`,sendData);
            getData()
        } catch (error) {
            console.error(error.message || error);
            alert(error.message || error);
        }
    }


    return (
        <div className="container m-5 p-2 bg-body rounded">
            <hr/>
            <h1><strong>{data && data.name}</strong></h1>
            <hr/>
            <h2 className="col-3"><strong>Rating: </strong>{data && data.rating} / 5</h2>
            <hr/>
            <div className="container">
                <h2>Description:</h2>
                <p>{data && data.description}</p>
            </div>
            <hr/>
            <div className="container">
                <h3>Professors:</h3>
                
                {/* data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title={`Click for more info on ${professor.name}`} */}
                {data ? 
                <ul className="list-group">{data.professors.map(
                    (professor) => { return <li key={professor.id} className="list-group-item list-group-item-dark list-group-item-action col-5" 
                                                onClick={() => navigate(`/professors/${professor.id}`)} >{professor.name}</li> }
                )}</ul> 
                : 
                <p>Currently no professors are teaching this course!</p>}
                {data && <span className="subtitle"><aside>Click on professor for more info</aside></span>}
            </div>
            <hr/>
            <div className="container border rounded p-2">
                <div className="row mb-2 justify-content-between aligin-items-end">
                    <h3 className="col-8 align-text-end">Reviews:</h3>
                    {data && data.isLoggedIn && <button type="button" className="btn btn-primary col-3 me-3" data-bs-toggle="modal" data-bs-target="#createReviewModal">Add Review</button>}
                </div>
                <div className="row">
                   {data && reviewsDataShow}
                </div>
            </div>
            <br/>
            <hr/>


            {/* <!-- Vertically centered modal --> */}
            {data && data.isLoggedIn && 
             <div className="modal fade" id="createReviewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Your Review</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={sendReviewData}>
                            <div className="mb-3">
                                <label htmlFor="rating" className="col-form-label">Select your rating:</label>
                                <select id="rating" name="rating" className="form-select col-1" aria-label="Rating" onChange={(e)=>{setRating(e.target.value)}}>
                                    <option value={5}>5 / 5</option>
                                    <option value={4}>4 / 5</option>
                                    <option value={3}>3 / 5</option>
                                    <option value={2}>2 / 5</option>
                                    <option value={1}>1 / 5</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="col-form-label">Type your review:</label>
                                <textarea className="form-control" id="message" name="message" onChange={(e)=>{setMessage(e.target.value)}} 
                                minLength="2" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary me-2 col-3 col-sm-4">Add Review</button>
                            <button type="button" className="btn btn-secondary col-3 col-sm-4" data-bs-dismiss="modal">Cancel</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary col-3 col-sm-4" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
             </div>
            }
        </div>
    );
}

export default CoursePage;