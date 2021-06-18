import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// Moved to firebase.
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);

  console.log("available meals");
  useEffect(() => {
    console.log("effect");
    const getMeals = async () => {
      const data = await fetch(
        "https://react-custom-73305-default-rtdb.firebaseio.com/meals.json"
      );
      const dataJson = await data.json();
      console.log(dataJson);

      let loadedMeals = [];

      for (const key in dataJson) {
        console.log(dataJson[key]);
        loadedMeals.push({
          id: key,
          name: dataJson[key].name,
          description: dataJson[key].description,
          price: dataJson[key].price,
        })
      }
      setMeals(loadedMeals);
    };
    getMeals();
  }, []);

  const mealList = meals.map((meal) => (
    <MealItem key={meal.id} meal={meal} />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
