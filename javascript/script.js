//here navbar responisve
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//  food recipe come using API loigc here

let result = document.getElementById("result");

let searchBtn = document.getElementById("search-btn");

let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";  //API 

searchBtn.addEventListener("click", () => {

  let userInp = document.getElementById("user-inp").value;

  if (userInp.length == 0) {
    result.innerHTML = `<h3>Input File Cannot Be Empty</h3>`;
  }
   else {

    //here getting recipe from API
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        let myMeal = data.meals[0];
        console.log(myMeal);
        console.log(myMeal.strMealThumb); //image
        console.log(myMeal.strMeal);  //food name
        console.log(myMeal.strArea);  //food area
        console.log(myMeal.strInstructions);  //intractions

        let count = 1;
        let ingredients = []; //store ingredients

        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal["strMeasure" + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);   //add ingredients
          }
        }
        console.log(ingredients);

        //using js to show that recipe

        result.innerHTML = `<img src=${myMeal.strMealThumb} class='center'>
      <div class="details">
          <h2>${myMeal.strMeal}</h2>
          <h4>${myMeal.strArea}</h4>
      </div>
  
      <div id="ingredient-con">
      </div>
      <div id="recipe">
          <button id="hide-recipe">X</button>
          <pre id="instructions">${myMeal.strInstructions}</pre>
      </div>
      <div>
      <button id="show-recipe">View Recipe</button>
      `;

        let ingredientCon = document.getElementById("ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        });

        // hide recipe code here

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });

        // show recipe code here when click on view recipe button
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        result.innerHTML = `<h3>Opps ! Dish Recipe Not Available </h3>`;
      });
  }
});
