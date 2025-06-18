function displayRecipe(response) {
    console.log("poem generated");
    new Typewriter("#recipe", {
        strings: response.data.answer,
        autoStart: true,
        delay: 1,
        cursor:"",
    });
}


function generateRecipe(event) {
    event.preventDefault();

    let instructionsInput = document.querySelector("#user-instructions");

    let apiKey = "4ca34d5d8f2236d063ft0036baa47coc";
    let prompt = `Create a vegan recipe for "${instructionsInput.value}" in clean HTML only. Do not include any markdown, comments or explanation. Just output valid HTML. Sign the recipe with 'SheCodes AI' inside a <strong> element at the end of the poem`;
    let context = "You are smart and sweet expert in cusine who love to create short and easy vegan recipes. Your mission is to generate an easy and short vegan recipe in basic HTML and separate each line with a <br />_. Make sure to fallow the user instructions";
    let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

    let recipeElement = document.querySelector("#recipe");
    recipeElement.classList.remove("hidden");
    recipeElement.innerHTML = `<div class="generating">⌛ Generating Vegan recipe with ${instructionsInput.value}👌</div>`;

    console.log("Generating recipe");
    console.log(`Prompt: ${prompt}`);
    console.log(`Context: ${context}`);
    
    axios.get(apiURL).then(displayRecipe);
}


let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);

document.getElementById("next-recipe-button").addEventListener("click", function() {
    document.querySelector("form").dispatchEvent(new Event("submit"));
});

document.getElementById("download-pdf-button").addEventListener("click", function () {
    const recipeElement = document.querySelector(".recipe");
    
    if (recipeElement) {
        const hadHidden =
            recipeElement.classList.contains("hidden");
        
        if (hadHidden) {
            recipeElement.classList.remove("hidden");
        }

        const opt = {
            margin: 0.5,
            filename: 'vegan_recipe.pdf',
            image: {type:'jpeg', quality: 0.98},
            html2canvas: {scale: 2},
            jsPDF: {unit:'in', format:'letter', orientation:'portrait'}
        };

        html2pdf().set(opt).from(recipeElement).save().then(() =>
        {
            if (hadHidden){
                recipeElement.classList.add("hidden");
            }
        });
    }
});