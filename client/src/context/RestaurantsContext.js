import React, {useState, createContext} from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {
  const [restaurants, setRestaurants] = useState([]);
  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant])
  };
  const [selectedRestaurant,setSelectedRestaurant] = useState(null);

  return (
    <RestaurantsContext.Provider 
      value={{
        restaurants: restaurants, 
        setRestaurants, 
        addRestaurants, 
        selectedRestaurant, 
        setSelectedRestaurant
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  )
}