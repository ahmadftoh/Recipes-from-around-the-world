/// <Reference types="../@types/jquery" />;
let searchByNameInput = document.getElementById(`searchByName`);
let searchByFirstLetterInput = document.getElementById(`searchByFirstLetter`);
let searchOpener = document.getElementById(`Search`);
let CategoriesOpener = document.getElementById(`Categories`);
let AreaOpener = document.getElementById(`Area`);
let IngrediantsOpener = document.getElementById(`Ingrediants`);
let ContactsOpener = document.getElementById(`Contacts`);
let enterYourNameInput = document.getElementById(`enterYourName`);
let enterYourEmailInput = document.getElementById(`enterYourEmail`);
let yourMobileNumberInput = document.getElementById(`yourMobileNumber`);
let enterYourAgeInput = document.getElementById(`enterYourAge`);
let enterYourPasswordInput = document.getElementById(`enterYourPassword`);
let renterYourPasswordInput = document.getElementById(`renterYourPassword`);


$(searchOpener).on(`click`,function(){
    $(`.searchplace`).removeClass(`d-none`);
    $(`.searchplace`).siblings().addClass(`d-none`);
    $(`#side`).animate({ left: "-241px" });
    $(`#open`).removeClass(`d-none`);
    $(`#close`).addClass(`d-none`);
});
$(CategoriesOpener).on(`click`,function(){ getCata()});
$(CategoriesOpener).on(`click`, function(){
    $(`#cata`).removeClass(`d-none`);
    $(`#cata`).siblings().addClass(`d-none`);
    $(`#side`).animate({ left: "-241px" });
    $(`#open`).removeClass(`d-none`);
    $(`#close`).addClass(`d-none`);
});

$(AreaOpener).on(`click`,function(){ getArea()});
$(AreaOpener).on(`click`, function(){
    $(`#are`).removeClass(`d-none`);
    $(`#are`).siblings().addClass(`d-none`);
    $(`#side`).animate({ left: "-241px" });
    $(`#open`).removeClass(`d-none`);
    $(`#close`).addClass(`d-none`);
});
$(IngrediantsOpener).on(`click`,function(){ getIngrediants()});
$(IngrediantsOpener).on(`click`, function(){
    $(`#ingred`).removeClass(`d-none`);
    $(`#ingred`).siblings().addClass(`d-none`);
    $(`#side`).animate({ left: "-241px" });
    $(`#open`).removeClass(`d-none`);
    $(`#close`).addClass(`d-none`);
});
$(ContactsOpener).on(`click`, function(){
    $(`#contacto`).removeClass(`d-none`);
    $(`#contacto`).siblings().addClass(`d-none`);
    $(`#side`).animate({ left: "-241px" });
    $(`#open`).removeClass(`d-none`);
    $(`#close`).addClass(`d-none`);
});
$(function () {
  $(".loader").fadeOut(500, function () {
    $(".loadingspinner").slideUp(500, function () {
      $(`body`).css({ overflow: `auto` });
    });
  });
  $(".loadingspinner").remove();
});

$(`#open`).on(`click`, function () {
  $(`#side`).animate({ left: "0" });
  $(`#open`).addClass(`d-none`);
  $(`#close`).removeClass(`d-none`);
});
$(`#open`).on(`click`);
$(`#close`).on(`click`, function () {
  $(`#side`).animate({ left: "-241px" });
  $(`#open`).removeClass(`d-none`);
  $(`#close`).addClass(`d-none`);
});
getData();
async function getData() {
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  let final = await data.json(); 
  d = await final.meals;
displayData(d)
};

function displayData(a) {    
    let cartona = ``;
    for (i = 0; i < a.length; i++) {
      cartona += ` 
      <div class="col-md-3">
                      <div onclick="getMealDetails('${a[i].idMeal}')" class="item position-relative overflow-hidden mb-3">
                          <img class="w-100 " src="${a[i].strMealThumb}" alt="">
                          <div class="imglayer position-absolute top-0 end-0 start-0 bottom-0 d-flex align-items-center ps-1 "><p class="fs-2 lead">${a[i].strMeal}</p></div>
                      </div>
                  </div>
                  
                  `;
    }
    document.getElementById("cont").innerHTML = cartona;
   
};
async function getMealDetails(x){
    // console.log(x);
    let mealById = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${x}`);
    let theMeal = await mealById.json(); 
    // console.log(theMeal);
    let mela = await theMeal.meals;

    // console.log(mela[0]);
    displayClickedMeal(mela)
};
function displayClickedMeal(y){
// console.log(y);

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (y[0][`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${y[0][`strMeasure${i}`]} ${y[0][`strIngredient${i}`]}</li>`
        }
    }

    let tags = y[0].strTags?.split(",")
   
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4 text-white">
                <img class="w-100 rounded-3" src="${y[0].strMealThumb}"
                    alt="">
                    <h2>${y[0].strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${y[0].strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${y[0].strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${y[0].strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${y[0].strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${y[0].strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    document.getElementById(`cont`).innerHTML = cartoona;
}
// 
// displaying data at search page from search by name///////////////////////////////////////////
async function getMealByFirstLetter() {
    let resault = await fetch(`https://themealdb.com/api/json/v1/1/search.php?f=${searchByFirstLetterInput.value}`);
    let finalo = await resault.json(); 
    
    let letter = await finalo.meals;
    // console.log(letter.length);

    displayByLetter(letter);
};

function displayByLetter(letter){
    console.log(letter[1].idMeal);
    let boxa = ``;
    for (i = 0; i < letter.length; i++) {
      boxa += ` 
      <div class="col-md-3">
                      <div class="item position-relative overflow-hidden mb-3">
                          <img class="w-100 " src="${letter[i].strMealThumb}" alt="">
                          <div class="imglayer position-absolute top-0 end-0 start-0 bottom-0 d-flex align-items-center ps-1 "><p class="fs-2 lead">${letter[i].strIngredient1}</p></div>
                      </div>
                  </div>
                  
                  `;
    }
    document.getElementById("searchResault").innerHTML = boxa;
}
async function getMealByName() {
    let theMeal = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${searchByNameInput.value}`);
    let MealByName = await theMeal.json(); 
    let namo = await MealByName.meals;
    // console.log(namo); 

displayByName(namo)

};
function displayByName(namo){
    let loksha = ``;
    for (i = 0; i < namo.length; i++) {
      loksha += ` 
      <div class="col-md-3">
                      <div  class="item position-relative overflow-hidden mb-3">
                          <img class="w-100 " src="${namo[i].strMealThumb}" alt="">
                          <div class="imglayer position-absolute top-0 end-0 start-0 bottom-0 d-flex align-items-center ps-1 "><p class="fs-2 lead">${namo[i].strIngredient1}</p></div>
                      </div>
                  </div>
                  
                  `;
    }
    document.getElementById("searchResault").innerHTML = loksha;
};


async function getCata() {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let final = await data.json(); 
    catageroy = await final.categories;
//   console.log(catageroy);
  displayByCata(catageroy)

};
function displayByCata(catageroy){
    let shekara = ``;
    for (i = 0; i < catageroy.length; i++) {
      shekara += ` 
                      <div class="col-md-3">
                      <div onclick="getCategoryMeals('${catageroy[i].strCategory}')"  class="item position-relative overflow-hidden mb-3">
                          <img class="w-100 " src="${catageroy[i].strCategoryThumb}" alt="">
                          <div class="imglayer position-absolute top-0 end-0 start-0 bottom-0 d-flex flex-column text-center align-items-center ps-1 "><p class="fs-2 lead">${catageroy[i].strCategory}</p>
                          <p class="fs-6 lead">${catageroy[i].strCategoryDescription.split(" ").slice(0,10).join(" ")}</p></div>
                      </div>
                  </div>
                  
                  `;
    }
    document.getElementById("cataPlcae").innerHTML = shekara;
};
async function getCategoryMeals(e){
console.log(e); 
let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e}`);
let final = await data.json(); 
cataMeals = await final.meals;
console.log(cataMeals);
cataShow(cataMeals)
};
function cataShow(q){
    let loksha = ``;
    for (i = 0; i < q.length; i++) {
      loksha += ` 
      <div class="col-md-3">
                      <div  class="item position-relative overflow-hidden mb-3">
                          <img class="w-100 " src="${q[i].strMealThumb}" alt="">
                          <div class="imglayer position-absolute top-0 end-0 start-0 bottom-0 d-flex align-items-center ps-1 "><p class="fs-2 lead">${q[i].strMeal}</p></div>
                      </div>
                  </div>
                  
                  `;
    }
    document.getElementById("cataPlcae").innerHTML = loksha;
};

async function getArea() {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let final = await data.json(); 
    area = await final.meals;
//   console.log(area[1].strArea);
//   displayByCata(catageroy)
displayArea(area)
};
// www.themealdb.com/api/json/v1/1/list.php?a=list   strArea
function displayArea(area){
    let cartonaa = ``;
    for (i = 0; i < area.length; i++) {
      cartonaa += ` 
                         <div onclick="filterByArea('${area[i].strArea}')" class="col-md-3 text-white text-center">
                        <div class="item position-relative overflow-hidden mb-3">
                            <i class="fa-solid fa-house"></i>
                            <p class="fs-2 lead">${area[i].strArea}</p>
                            
                        </div>
                    </div>
                  
                  `;
    }
    document.getElementById("area").innerHTML = cartonaa;
};
async function filterByArea(e){
    // console.log(e);
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${e}`);
    let final = await data.json(); 
    let areaFood = await final.meals; 
    console.log(areaFood);
    displayByArea(areaFood)
};
function displayByArea(w){
let cartona = ``;
for (let i = 0 ; i< w.length;i++){
    cartona+=`<div class="col-md-3">
                  <div   class="item position-relative overflow-hidden mb-3">
                    <img class="w-100 " src="${w[i].strMealThumb}" alt="">
                    <div class="imglayer position-absolute top-0 end-0 start-0 bottom-0 d-flex align-items-center ps-1 ">
                     <p class="fs-2 lead">${w[i].strMeal}</p>
                    </div>
                   </div>
               </div>`;
}
document.getElementById(`area`).innerHTML=cartona;
};
async function getIngrediants() {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let final = await data.json(); 
    let ingrediants = await final.meals; 
    
    // let desco =  ingrediants[i].strDescription.split(" ").slice(0,20).join(" "); 
    displayIngrediants(ingrediants.slice(0, 20));
};


function displayIngrediants(ingrediants){
    // console.log(typeof ingrediants[i].strDescription);
    let cartonaa = ``;
    for (i = 0; i < ingrediants.length ; i++) {
      cartonaa += ` 
                          <div onclick="getinnerDetails('${ingrediants[i].strIngredient}')" class="col-md-3 text-white text-center">
                        <div class="item position-relative overflow-hidden mb-3">
                            <i class="fa-solid fa-drumstick-bite"></i>
                            <h3>${ingrediants[i].strIngredient}</h3>
                            <p>${ingrediants[i].strDescription.split(" ").slice(0,20).join(" ")}</p> 
                            
                        </div>
                    </div>
                  
                  `;
    }
    document.getElementById("ingr").innerHTML = cartonaa;
};
async function getinnerDetails(e){
    console.log(e);
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${e}`);
    let final = await data.json(); 
    let ins = await final.meals; 
    // console.log(ins);
    displayByIngrediants(ins)
};
function displayByIngrediants(l){
    let cartonaa = ``;
    for (i = 0; i < l.length ; i++) {
      cartonaa += ` 
                         <div class="col-md-3">
                      <div onclick="getMealDetails('${l[i].idMeal}')" class="item position-relative overflow-hidden mb-3">
                          <img class="w-100 " src="${l[i].strMealThumb}" alt="">
                          <div class="imglayer position-absolute top-0 end-0 start-0 bottom-0 d-flex align-items-center ps-1 "><p class="fs-2 lead">${l[i].strMeal}</p></div>
                      </div>
                  </div>
                  
                  `;
    }
    document.getElementById("ingr").innerHTML = cartonaa;
}
function validateInputs(element){
    var myRegEx ={
        enterYourName : /^[a-zA-Z]+$/,
        enterYourEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        yourMobileNumber:/^01[0-9]{9}$/,
        enterYourAge:/^(1[89]|[2-4][0-9])$/,        
        enterYourPassword:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,        
        renterYourPassword:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        
    }
    if(myRegEx[element.id].test(element.value)==true){
        element.classList.add(`is-valid`);
        element.classList.remove(`is-invalid`);
        element.nextElementSibling.classList.replace("d-block","d-none");
        $(`#SubmitBtn`).removeClass(`disabled`);
        
    }
    else{
        element.classList.remove(`is-valid`);
        element.classList.add(`is-invalid`);        
        element.nextElementSibling.classList.replace("d-none","d-block"); 
        $(`#SubmitBtn`).addClass(`disabled`);
    }

};

// $(`.item`).on(`click`,function(e){
//     console.log(e.target.innerHTML);

// });

