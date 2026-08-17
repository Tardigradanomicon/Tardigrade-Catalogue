let speciesData = {};

let observations = {};


// Load species data

fetch("data/species.json")
    .then(response => response.json())
    .then(data => {

        speciesData = data;

        showQuestions();

    });


// Questions

function showQuestions() {

    const questions = document.getElementById("questions");

    questions.innerHTML = `

        <div class="identifier-question">

            <h2>What environment was the specimen collected from?</h2>

            <button onclick="answer('environment', 'marine')">
                Marine
            </button>

            <button onclick="answer('environment', 'freshwater')">
                Freshwater
            </button>

            <button onclick="answer('environment', 'terrestrial')">
                Terrestrial
            </button>

            <button onclick="answer('environment', 'unknown')">
                Unknown
            </button>

        </div>

    `;
}


// Store an observation

function answer(character, value) {

    observations[character] = value;

    calculateResults();

}


// Compare observations with species

function calculateResults() {

    const results = document.getElementById("results");

    let matches = [];


    for (const id in speciesData) {

        const species = speciesData[id];

        let score = 0;
        let possible = 0;


        if (observations.environment) {

            possible++;

            if (
                species.identification.environment
                === observations.environment
            ) {

                score++;

            }

        }


        const compatibility =
            possible > 0
                ? score / possible
                : 0;


        if (compatibility > 0) {

            matches.push({
                species: species,
                compatibility: compatibility
            });

        }

    }


    displayResults(matches);

}


// Display results

function displayResults(matches) {

    const results = document.getElementById("results");

    if (matches.length === 0) {

        results.innerHTML = `
            <p>No possible matches found.</p>
        `;

        return;

    }


    results.innerHTML = `

        <h2>Possible matches</h2>

    `;


    matches.forEach(match => {

        const percentage =
            Math.round(match.compatibility * 100);


        results.innerHTML += `

            <div class="identifier-result">

                <strong>
                    <i>${match.species.scientific_name}</i>
                </strong>

                <p>
                    ${percentage}% compatibility
                </p>

            </div>

        `;

    });

}
