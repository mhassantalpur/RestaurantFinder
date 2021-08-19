require("dotenv").config();
const express = require("express");
const bp = require('body-parser');
const cors = require("cors");
const db = require("./db");
const app = express();

app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// get all restaurants
app.get("/api/v1/restaurants", async(req,res) => {
  try {

    const restaurantRatingData = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id"
    )

    res.status(200).json({
      status: "success",
      results: restaurantRatingData.rows.length,
      data: {
        restaurants: restaurantRatingData.rows
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// read a single restaurant
app.get("/api/v1/restaurants/:id", async(req,res) => {
  try {
    // paramterized query where 'id=$1' is replaced for the actual paramter value (id=req.params.id)
    const restaurant = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id=$1", [req.params.id]);

    const reviews = await db.query("SELECT * FROM reviews where restaurant_id=$1", [req.params.id]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows
      },
    })
  } catch (err) {
    console.log(err);
  }
});

// create a single restaurant
app.post("/api/v1/restaurants", async(req,res) => {
  try{
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0]
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// update a single restaurant
app.put("/api/v1/restaurants/:id", async(req,res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name=$1, location=$2, price_range=$3 where id=$4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0]
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// delete a single restaurant
app.delete("/api/v1/restaurants/:id", async(req,res) => {
  try {
    const results = await db.query(
      "DELETE FROM restaurants where id=$1",
      [req.params.id]
    );
    res.status(204).json({
      status: "success"
    });
  } catch (err) {
    console.log(err);
  }
})

app.post("/api/v1/restaurants/:id/addReview", async(req,res) => {
  try {
    const review = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: review.rows[0]
      }
    });
  } catch(err) {console.log(err)}
})

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});