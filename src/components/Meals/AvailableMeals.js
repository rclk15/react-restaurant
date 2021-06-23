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
  console.log("meals");
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(); //undefined

  console.log("available meals");
  useEffect(() => {
    console.log("effect");

    const getMeals = async () => {
      const response = await fetch(
        "https://react-custom-73305-default-rtdb.firebaseio.com/meals"
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("Something went wrong!");
        // lines after this won't execute!
      }
      const dataJson = await response.json();
      console.log(dataJson);

      let loadedMeals = [];

      for (const key in dataJson) {
        console.log(dataJson[key]);
        loadedMeals.push({
          id: key,
          name: dataJson[key].name,
          description: dataJson[key].description,
          price: dataJson[key].price,
        });
      }
      console.log(1);
      setMeals(loadedMeals);
      console.log(2);
      setIsLoading(false);
    };
    // try {
    //   // since getMeals is async, but we can't await here b/c useEffect cannot
    //   // take async function. have to use .catch instead of just catch for the
    //   // error thrown in getMeals. A rejected promise will be returned.
    //   getMeals();
    // } catch {
    //   setIsLoading(false);
    //   setError(error.message); // this message is what we set above!
    // }
    getMeals().catch((error) => {
      console.log(3);
      setIsLoading(false);
      console.log(4);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loadingmeals}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealList = meals.map((meal) => <MealItem key={meal.id} meal={meal} />);

  return (
    <section className={classes.meals}>
      {/* {isLoading && <section><p>Loading!</p></section>}
      {isLoading ? console.log("test") : console.log("done")} */}
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
