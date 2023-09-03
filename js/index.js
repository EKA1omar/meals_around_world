const R_data = document.getElementById("R_data");
const searchContainer = document.getElementById("searchContainer");
let submitBtn;

// <==========start_Nav==========>
function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

// <==========end_Nav==========>



// <==========start_loding_spin==========>
function spin(){
    $(document).ready(function () {
        $(".logding_spin").fadeOut(2000)
    })
}
function spin_ROW(){
    $(document).ready(function () {
        $(".logding_spin").fadeIn(1).fadeOut(2000)
      
        
    })
}
spin()
// <==========end_loding_spin==========>

// <==========start_get_mealAND_display==========>
async function get_meals() {
    R_data.innerHTML = "";


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    response = await response.json();


    display_meals_on_the_main(response.meals)
}
get_meals()
function display_meals_on_the_main(lol) {
    let barbie = "";

    for (let i = 0; i < lol.length; i++) {
        barbie += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${lol[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${lol[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${lol[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
    }

    R_data.innerHTML = barbie;


}
// <==========end_get_mealAND_display==========>

function displayMeals(lol) {
    spin_ROW()
    let barbie = "";

    for (let i = 0; i < lol.length; i++) {
        barbie += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${lol[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${lol[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${lol[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
    }

    R_data.innerHTML = barbie;
}

// <==========start_get_CategoriesAND_display==========>
async function get_Categories() {
    R_data.innerHTML = "";

    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();

    display_Category(response.categories);

}

function display_Category(bolbol) {
    spin_ROW()
    let hambozo = "";
    for (let i = 0; i < bolbol.length; i++) {
        hambozo += `
        <div class="col-md-3">
            <div onclick="getCategoryMeals('${bolbol[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100 meal-image"  src="${bolbol[i].strCategoryThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute text-center text-black p-2">
                    <h3>${bolbol[i].strCategory}</h3>
                    <p>${bolbol[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div> 
            </div>
        </div>
        `;
    }

    R_data.innerHTML = hambozo;

}

$(".nav-tab li:nth-child(2)").click(function () {
    get_Categories();
});
// <==========end_get_CategoriesAND_display==========>

// <==========start_get_CategorieAND_display==========>
async function getCategoryMeals(category) {

    R_data.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();

    displayMeals(response.meals.slice(0, 20));
}

async function getMealDetails(m_ID) {
   
    R_data.innerHTML = "";

    searchContainer.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m_ID}`);
    response = await response.json();

    displayMealDetails(response.meals[0]);

}

function displayMealDetails(meal) {
    spin_ROW()
    searchContainer.innerHTML = "";

    let ingredients = ``;

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags?.split(",");

    if (!tags) tags = [];

    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }

    let barbie = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2 class="text-white">Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
    `;

    R_data.innerHTML = barbie;
}
// <==========end_get_CategoriesAND_display==========>
// <==========start_get_AreaAND_display==========>

async function getArea() {
    R_data.innerHTML = ""


    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)


}


function displayArea(arr) {
    spin_ROW()
    let barbie = "";

    for (let i = 0; i < arr.length; i++) {
        barbie += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    R_data.innerHTML = barbie
}
// <==========end_get_AreaAND_display==========>
// <==========start_get_IngredientsAND_display==========>
async function getIngredients() {
    R_data.innerHTML = ""


    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()


    displayIngredients(respone.meals.slice(0, 20))


}


function displayIngredients(arr) {
    spin_ROW()
    let barbie = "";

    for (let i = 0; i < arr.length; i++) {
        barbie += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }

    R_data.innerHTML = barbie
}

// <==========end_get_IngredientsAND_display==========>
// <==========start_get_Ingredients&Category&AreaAND_display==========>
async function getCategoryMeals(category) {
    R_data.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
}



async function getAreaMeals(ARy) {
    R_data.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${ARy}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
}


async function getIngredientsMeals(ingds) {
    R_data.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingds}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
}
// <==========end_get_Ingredients&Category&AreaAND_display==========>


// <==========start_get_MealDetailsAND_display==========>
async function getMealDetails(M_ID) {
    R_data.innerHTML = ""
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${M_ID}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
}

function displayMealDetails(meal) {
    spin_ROW()
    searchContainer.innerHTML = "";
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let barbie = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    R_data.innerHTML = barbie
}
// <==========end_get_MealDetailsAND_display==========>
// <==========start_Search==========>

function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    R_data.innerHTML = ""
}

async function searchByName(find) {

    R_data.innerHTML = ""


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${find}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])


}

async function searchByFLetter(find) {

    R_data.innerHTML = ""

    find == "" ? find = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${find}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])


}
// <==========end_Search==========>


// <==========start_Contacts==========>
function showContacts() {
    R_data.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        INPUT_NAME = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        INPUT_EMALI = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        INPUT_PHONE = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        INPUT_AGE = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        INPUT_PASSWORD = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        INPUT_REPASSWORD = true
    })
}
let INPUT_NAME = false;
let INPUT_EMALI = false;
let INPUT_PHONE = false;
let INPUT_AGE = false;
let INPUT_PASSWORD = false;
let INPUT_REPASSWORD = false;




function inputsValidation() {
    if (INPUT_NAME) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (INPUT_EMALI) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (INPUT_PHONE) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (INPUT_AGE) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (INPUT_PASSWORD) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (INPUT_REPASSWORD) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
0 / 5
// <==========end_Contacts==========>