import React, { useContext, useState } from 'react';
import RestaurantReview from '../api/RestaurantReview';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
  const {addRestaurants} = useContext(RestaurantsContext);
  const [name,setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange,setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantReview.post("/", {
        name,
        location,
        price_range: priceRange
      })
      addRestaurants(response.data.data.restaurant);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="row">
      <form action="">
        <div className="row">
          <div className="col">
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="form-control" 
              placeholder="name"
            />
          </div>
          <div className="col">
            <input 
              type="text" 
              value={location} 
              onChange={e => setLocation(e.target.value)} 
              className="form-control" 
              placeholder="location"
            />
          </div>
          <div className="col">
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
          <div className="col">
            <button 
              className="btn btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
                Add
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant;
