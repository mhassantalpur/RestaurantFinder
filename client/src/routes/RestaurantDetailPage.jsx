import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantReview from '../api/RestaurantReview';
import { RestaurantsContext } from '../context/RestaurantsContext';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

const RestaurantDetailPage = () => {
  const {id} = useParams();
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await RestaurantReview.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
      } catch (err) {console.log(err)}
    }
    fetchData();
  }, [id, setSelectedRestaurant]);
  return (
    <div> 
      {selectedRestaurant && (
        <>
        <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
        <div className="text-center">
          <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
          <span className="text-warning ml-1">
            {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "(0)"}
          </span>
        </div>
        <div className="mt-3">
          <Reviews reviews={selectedRestaurant.reviews}/>
        </div>
        <AddReview />
        </>
      )} 
    </div>
  )
}

export default RestaurantDetailPage;
