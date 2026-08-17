let speciesData = {};
let observations = {};


// Load species data

fetch("data/species.json")
    .then(response => response.json())
    .then(data => {

        speciesData = data;

        showEnvironmentQuestion();

    })
    .catch(error => {

        console.error("Could not load species data:", error);

    });


// Environment question

function showEnvironmentQuestion() {

    const questions = document.getElementById("questions");

    questions.innerHTML = `

        <div class="identifier-question">

            <h2>
                What environment was the specimen collected from?
            </h2>

            <div class="identifier-options">

                <button onclick="answerEnvironment('marine')">
                    Marine
                </button>

                <button onclick="answerEnvironment('freshwater')">
                    Freshwater
                </button>

                <button onclick="answerEnvironment('terrestrial')">
                    Terrestrial
                </button>

                <button onclick="answerEnvironment('unknown')">
                    Unknown
                </button>

            </div>

        </div>

    `;
}


// Record answer

function answerEnvironment(value) {

    observations.environment = value;

    showResult();

}


// Temporary result

function showResult() {

    const results = document.getElementById("results");

    let matches = [];

    for (const id in speciesData) {

        const species = speciesData[id];

        if (
            species.identification.environment
            === observations.environment
        ) {

            matches.push(species);

        }

    }


    if (matches.length === 0) {

        results.innerHTML = `

            <div class="identifier-result">

                <h2>No matches found</h2>

                <p>
                    No species in the current catalogue match
                    this observation.
                </p>

            </div>

        `;

        return;

    }


    results.innerHTML = `

        <div class="identifier-result">

            <h2>Possible matches</h2>

            <p>
                Based on the information currently available:
            </p>

            ${matches.map(species => `

                <p>
                    <strong>
                        <i>${species.scientific_name}</i>
                    </strong>
                </p>

            `).join("")}

        </div>

    `;

}
