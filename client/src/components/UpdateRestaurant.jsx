import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import RestaurantReview from '../api/RestaurantReview';

const UpdateRestaurant = () => {
  let history = useHistory();
  const {id} = useParams();
  const [name,setName] = useState("");
  const [location,setLocation] = useState("");
  const [priceRange,setPriceRange] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await RestaurantReview.get(`/${id}`);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPriceRange(response.data.data.restaurant.price_range);
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurant = await RestaurantReview.put(`/${id}`, {
      name,
      location,
      price_range: priceRange
    });
    history.push("/");
  };
 
  return (
    <div>
      <form action="">
        <div className="form-group">
           <label htmlFor="name">Name</label>
           <input 
            value={name} onChange={(e) => setName(e.target.value)} 
            type="text" 
            id="name" 
            className="form-control" 
          />
        </div>
        <div className="form-group">
           <label htmlFor="location">Location</label>
           <input 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            type="text" 
            id="location" 
            className="form-control" 
          />
        </div>
        <div className="form-group">
           <label htmlFor="price_range">Price Range</label>
           <select 
              value={priceRange} 
              onChange={e => setPriceRange(e.target.value)} 
              className="form-select"
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default UpdateRestaurant;
