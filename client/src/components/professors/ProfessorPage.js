import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams , useNavigate } from "react-router-dom"
const xss = require('xss');

const ProfessorPage = () => {
    const navigate = useNavigate()
    const id = useParams().id || 1
    const[data, setData] = useState(undefined)
    const[reviewsData, setReviewsData] = useState(undefined)
    const[reviewsDataShow, setReviewsDataShow] = useState(<p>No reviews posted!</p>)
    const[rating, setRating] = useState(5)
    const[message, setMessage] = useState("")
    const[isLoggedIn, setLoggedIn] = useState(false)


    async function getData() {
        try {
            const { data } = await axios.get(`http://localhost:4000/professors/${id}`);
            getStatus()
            setReviewsData(data.data.reviews)
            setData(data.data);
        } catch (error) {
            console.error(error.message || error);
            return navigate("/pg404")
        }
    }

    async function getStatus(){
        try {
            const { data } = await axios.get(`http://localhost:4000/users/status`);
            setLoggedIn(data.data.isUserLoggedIn)
            setLoggedIn(true)
        } catch (error) {
            console.error(error.message || error);

        }
      }

    useEffect(() => {getData()},[id])

    useEffect(() => {
        setReviewsDataShow(
        <div className="container">
            {data && data.reviews.map(
            (review) => {
                return <div key={review.id} className="card mb-2">
                        <div className="card-body" >
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
            let review = message && message.length > 1 ? toString(message).trim() : "";
            let sendData = {
                "rating": rating,
                "review": review,
            }
            const res = await axios.post(`http://localhost:4000/professors/${data.id}/reviews`,sendData);
            if(res){alert("Successfully added review! Please close the review ")}
            getData()
        } catch (error) {
            console.error("Failed to add review.\n" + (error.message || error));
            alert("Failed to add review.\n" + (error.message || error));
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
                <h2>Bio:</h2>
                <p>{data && data.description}</p>
            </div>
            <hr/>
            <div className="container">
                <h3>Professor:</h3>
                
                {/* data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title={`Click for more info on ${professor.name}`} */}
                {data ? 
                <ul className="list-group">{data.courses.map(
                    (course) => { return <li key={course.id} className="list-group-item list-group-item-dark list-group-item-action col-5" 
                                                onClick={() => navigate(`/courses/${course.id}`)} >{course.name}</li> }
                )}</ul> 
                : 
                <p>Currently no courses are teached by this professor!</p>}
                {data && <span className="subtitle"><aside>Click on course for more info</aside></span>}
            </div>
            <hr/>
            <div className="container border rounded p-2">
                <div className="row mb-2 justify-content-between aligin-items-end">
                    <h3 className="col-8 align-text-end">Reviews:</h3>
                    {data && isLoggedIn && <button type="button" className="btn btn-primary col-3 me-3" data-bs-toggle="modal" data-bs-target="#createReviewModal">Add Review</button>}
                    {data && !isLoggedIn && <button type="button" className="btn btn-primary col-3 me-3" onClick={()=>{navigate('/login')}}>Login</button>}
                </div>
                {data && !isLoggedIn && <span className="subtitle"><aside>Only logged in users can post reviews!</aside></span>}
                <div className="row">
                   {data && reviewsDataShow}
                </div>
            </div>
            <br/>
            <hr/>


            {/* <!-- Vertically centered modal --> */}
            {data && isLoggedIn && 
             <div className="modal fade" id="createReviewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Your Review</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={sendReviewData}>
                            <br/>
                            <p className="text-decoration-underline is-red rating">Once a review is posted, it can't be deleted or updated!!! *</p>
                            <br/>
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
                                <textarea className="form-control" id="message" name="message" onChange={(e)=>{setMessage(xss(e.target.value))}} 
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

export default ProfessorPage;