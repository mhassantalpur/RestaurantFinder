import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import RestaurantReview from '../api/RestaurantReview';
import Home from '../routes/Home';

const AddReview = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name,setName] = useState("");
  const [reviewText,setReviewText] = useState("");
  const [rating,setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await RestaurantReview.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating
      })
      history.go(0);
    } catch(err) {console.log(err)}
  }

  const handleHome = (e) => {
    history.push("/");
  }

  return (
    <form action="">
      <div className="row">
        <div className="col">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            placeholder="Name"
            value={name}
            onChange = {e => setName(e.target.value)}
          />
        </div>
        <div className="col">
          <label htmlFor="rating">Rating</label>
          <select 
            id="rating" 
            className="form-select"
            value={rating}
            onChange = {e => setRating(e.target.value)}
          >
            <option disabled>Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="review">Review</label>
        <textarea 
          id="review" 
          className="form-control"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>
      <button onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
        &nbsp;&nbsp;&nbsp;
      <button onClick={handleHome} className="btn btn-primary">Home</button>
    </form>
  )
}

export default AddReview;
