import React, {useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import RestaurantReview from '../api/RestaurantReview';
import { RestaurantsContext } from '../context/RestaurantsContext';
import StarRating from './StarRating';

const RestaurantList = (props) => {
  const {restaurants,setRestaurants} = useContext(RestaurantsContext);
  let history = useHistory();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await RestaurantReview.get("/");
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [setRestaurants]);

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  }

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantReview.delete(`/${id}`)
      setRestaurants(restaurants.filter(restaurant => {
        return restaurant.id !== id;
      }))
    } catch (err) {
      console.log(err);
    }
  }

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`)
  }

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">No reviews</span>
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating}/>
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    )
  }

  return (
    <div className="list-group">
      <table className="table table-dark table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.map((restaurant) => {
          return (
            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
            <td>{restaurant.name}</td>
            <td>{restaurant.location}</td>
            <td>{"$".repeat(restaurant.price_range)}</td>
            <td>{renderRating(restaurant)}</td>
            <td>
              <button 
              className="btn btn-warning"
              onClick = {(e) => handleUpdate(e, restaurant.id)}
              >Update
              </button>
            </td>
            <td>
              <button 
                className="btn btn-danger"
                onClick={(e) => handleDelete(e, restaurant.id)}
              >
                Delete
              </button>
            </td>
          </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList;
