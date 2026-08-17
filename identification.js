let speciesData = {};
let observations = {};

let currentQuestion = 0;


// ============================================================
// LOAD SPECIES DATA
// ============================================================

fetch("data/species.json")
    .then(response => response.json())
    .then(data => {

        speciesData = data;

        showNextQuestion();

    })
    .catch(error => {

        console.error("Could not load species data:", error);

    });


// ============================================================
// QUESTIONS
// ============================================================

const questions = [

    // --------------------------------------------------------
    // ENVIRONMENT
    // --------------------------------------------------------

    {
        id: "environment",

        question: "What environment was the specimen collected from?",

        type: "single",

        options: [
            ["marine", "Marine"],
            ["freshwater", "Freshwater"],
            ["terrestrial", "Terrestrial"],
            ["unknown", "Unknown"]
        ]
    },


    // --------------------------------------------------------
    // TERRESTRIAL SUBSTRATE
    // --------------------------------------------------------

    {
        id: "terrestrial_substrate",

        question: "What was the specimen associated with?",

        type: "multiple",

        condition: () =>
            observations.environment === "terrestrial",

        options: [
            ["moss", "Moss"],
            ["lichen", "Lichen"],
            ["leaf_litter", "Leaf litter"],
            ["soil", "Soil"],
            ["vegetation", "Vegetation"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    // --------------------------------------------------------
    // MARINE / FRESHWATER ASSOCIATION
    // --------------------------------------------------------

    {
        id: "aquatic_association",

        question: "What was the specimen associated with?",

        type: "multiple",

        condition: () =>
            observations.environment === "marine" ||
            observations.environment === "freshwater",

        options: [
            ["algae", "Algae"],
            ["sediment", "Sediment"],
            ["seagrass", "Seagrass / aquatic vegetation"],
            ["coral", "Coral / reef substrate"],
            ["rock", "Rock"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    // --------------------------------------------------------
    // EYES
    // --------------------------------------------------------

    {
        id: "eyes",

        question: "Are eyes present?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "eye_color",

        question: "What color are the eyes?",

        type: "multiple",

        condition: () =>
            observations.eyes === true,

        options: [
            ["black", "Black"],
            ["brown", "Brown"],
            ["red", "Red"],
            ["orange", "Orange"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    // --------------------------------------------------------
    // CUTICULAR PLATES
    // --------------------------------------------------------

    {
        id: "plates",

        question: "Are cuticular plates present?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "plate_locations",

        question: "Where are the cuticular plates present?",

        type: "multiple",

        condition: () =>
            observations.plates === true,

        options: [
            ["dorsal", "Dorsal"],
            ["ventral", "Ventral"],
            ["scapular", "Scapular"],
            ["median", "Median"],
            ["paired", "Paired"],
            ["pseudosegmental", "Pseudosegmental"],
            ["caudal", "Caudal / terminal"],
            ["lateral", "Lateral"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    // --------------------------------------------------------
    // CLAVAE
    // --------------------------------------------------------

    {
        id: "clavae",

        question: "Are clavae present?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "clavae_types",

        question: "Which types of clavae are present?",

        type: "multiple",

        condition: () =>
            observations.clavae === true,

        options: [
            ["primary", "Primary clavae"],
            ["secondary", "Secondary clavae"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    // ========================================================
    // CIRRI
    // ========================================================

    {
        id: "median_cephalic_cirrus",

        question: "Is a median cephalic cirrus present?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "internal_cephalic_cirri",

        question: "Are internal cephalic cirri present?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "external_cephalic_cirri",

        question: "Are external cephalic cirri present?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "lateral_cirri",

        question: "Are lateral cirri present?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "cirrus_E",

        question: "Is cirrus E present?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "other_cirri",

        question: "Are other identifiable cirri present?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "other_cirri_locations",

        question: "Where are the other cirri located?",

        type: "multiple",

        condition: () =>
            observations.other_cirri === true,

        options: [
            ["head", "Head"],
            ["lateral", "Lateral"],
            ["dorsal", "Dorsal"],
            ["near_leg_I", "Near leg I"],
            ["near_leg_II", "Near leg II"],
            ["near_leg_III", "Near leg III"],
            ["near_leg_IV", "Near leg IV"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    // ========================================================
    // SENSORY SPINES / PAPILLAE
    // ========================================================

    {
        id: "sensory_structures",

        question: "Are sensory spines or papillae present?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "sensory_structure_locations",

        question: "Where are sensory spines or papillae present?",

        type: "multiple",

        condition: () =>
            observations.sensory_structures === true,

        options: [
            ["head", "Head"],
            ["leg_I", "Leg I"],
            ["leg_II", "Leg II"],
            ["leg_III", "Leg III"],
            ["leg_IV", "Leg IV"],
            ["dorsal", "Dorsal"],
            ["lateral", "Lateral"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    // ========================================================
    // LEG I
    // ========================================================

    {
        id: "leg_I_claws",

        question: "How many claws are present on each leg of Leg pair I?",

        type: "single",

        options: [
            [2, "2 claws"],
            [3, "3 claws"],
            [4, "4 claws"],
            ["different", "Different between left and right"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "leg_I_claw_arrangement",

        question: "How are the claws arranged in size?",

        type: "single",

        options: [
            ["equal", "Approximately equal"],
            ["increasing", "Progressively longer from inner → outer"],
            ["decreasing", "Progressively shorter from inner → outer"],
            ["inner_larger", "Inner claws larger"],
            ["outer_larger", "Outer claws larger"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "leg_I_sensory",

        question: "Are sensory spines or papillae present on Leg I?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    // ========================================================
    // LEG II
    // ========================================================

    {
        id: "leg_II_claws",

        question: "How many claws are present on each leg of Leg pair II?",

        type: "single",

        options: [
            [2, "2 claws"],
            [3, "3 claws"],
            [4, "4 claws"],
            ["different", "Different between left and right"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "leg_II_claw_arrangement",

        question: "How are the claws arranged in size?",

        type: "single",

        options: [
            ["equal", "Approximately equal"],
            ["increasing", "Progressively longer from inner → outer"],
            ["decreasing", "Progressively shorter from inner → outer"],
            ["inner_larger", "Inner claws larger"],
            ["outer_larger", "Outer claws larger"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "leg_II_sensory",

        question: "Are sensory spines or papillae present on Leg II?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    // ========================================================
    // LEG III
    // ========================================================

    {
        id: "leg_III_claws",

        question: "How many claws are present on each leg of Leg pair III?",

        type: "single",

        options: [
            [2, "2 claws"],
            [3, "3 claws"],
            [4, "4 claws"],
            ["different", "Different between left and right"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "leg_III_claw_arrangement",

        question: "How are the claws arranged in size?",

        type: "single",

        options: [
            ["equal", "Approximately equal"],
            ["increasing", "Progressively longer from inner → outer"],
            ["decreasing", "Progressively shorter from inner → outer"],
            ["inner_larger", "Inner claws larger"],
            ["outer_larger", "Outer claws larger"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "leg_III_sensory",

        question: "Are sensory spines or papillae present on Leg III?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    // ========================================================
    // LEG IV
    // ========================================================

    {
        id: "leg_IV_claws",

        question: "How many claws are present on each leg of Leg pair IV?",

        type: "single",

        options: [
            [2, "2 claws"],
            [3, "3 claws"],
            [4, "4 claws"],
            ["different", "Different between left and right"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "leg_IV_claw_arrangement",

        question: "How are the claws arranged in size?",

        type: "single",

        options: [
            ["equal", "Approximately equal"],
            ["increasing", "Progressively longer from inner → outer"],
            ["decreasing", "Progressively shorter from inner → outer"],
            ["inner_larger", "Inner claws larger"],
            ["outer_larger", "Outer claws larger"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "leg_IV_sensory",

        question: "Are sensory spines or papillae present on Leg IV?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    // ========================================================
    // CLAW ACCESSORY POINTS
    // ========================================================

    {
        id: "claw_accessory_points",

        question: "Are claw accessory points present?",

        type: "single",

        options: [
            [true, "Present"],
            [false, "Absent"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "accessory_point_locations",

        question: "Which claws possess accessory points?",

        type: "multiple",

        condition: () =>
            observations.claw_accessory_points === true,

        options: [
            ["primary", "Primary claws"],
            ["secondary", "Secondary claws"],
            ["inner", "Inner claws"],
            ["outer", "Outer claws"],
            ["basal_spurs", "Basal spurs"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    // ========================================================
    // BASAL SPURS
    // ========================================================

    {
        id: "basal_spur_arrangement",

        question: "How are the basal spurs arranged?",

        type: "single",

        options: [
            ["widely_divergent", "Widely divergent"],
            ["slightly_divergent", "Slightly divergent"],
            ["closely_parallel", "Closely parallel"],
            ["parallel", "Parallel"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "basal_spur_orientation",

        question: "In what direction are the basal spurs oriented?",

        type: "multiple",

        options: [
            ["horizontal", "Horizontal"],
            ["upward", "Upward"],
            ["downward", "Downward"],
            ["toward_claw", "Toward the claw"],
            ["away_from_claw", "Away from the claw"],
            ["other", "Other"],
            ["unknown", "Unknown"]
        ]
    },


    {
        id: "basal_spurs_between_legs",

        question: "Are the basal spurs similar between leg pairs?",

        type: "single",

        options: [
            [true, "Yes"],
            [false, "No"],
            ["unknown", "Unknown"]
        ]
    }

];


// ============================================================
// FIND NEXT APPLICABLE QUESTION
// ============================================================

function showNextQuestion() {

    const questionsContainer =
        document.getElementById("questions");


    while (
        currentQuestion < questions.length &&
        questions[currentQuestion].condition &&
        !questions[currentQuestion].condition()
    ) {

        currentQuestion++;

    }


    // Finished all questions

    if (currentQuestion >= questions.length) {

        showResult();

        return;

    }


    const question =
        questions[currentQuestion];


    questionsContainer.innerHTML = `

        <div class="identifier-question">

            <h2>
                ${question.question}
            </h2>

            <div class="identifier-options">

                ${question.options.map((option, index) => `

                    <button
                        onclick="answerQuestion(${index})"
                    >
                        ${option[1]}
                    </button>

                `).join("")}

            </div>

        </div>

    `;

}


// ============================================================
// RECORD ANSWER
// ============================================================

function answerQuestion(optionIndex) {

    const question =
        questions[currentQuestion];


    const selectedValue =
        question.options[optionIndex][0];


    if (question.type === "multiple") {

        /*
         * Multiple-selection questions will eventually use
         * checkboxes and a Continue button.
         *
         * For now this records the selected value as an array.
         */

        observations[question.id] = [selectedValue];

    } else {

        observations[question.id] =
            selectedValue;

    }


    currentQuestion++;

    showNextQuestion();

}


// ============================================================
// RESULTS
// ============================================================

function showResult() {

    const results =
        document.getElementById("results");


    let matches = [];


    for (const id in speciesData) {

        const species =
            speciesData[id];


        const score =
            calculateMatch(species);


        matches.push({
            species: species,
            score: score
        });

    }


    matches.sort((a, b) =>
        b.score - a.score
    );


    if (matches.length === 0) {

        results.innerHTML = `

            <div class="identifier-result">

                <h2>
                    No matches found
                </h2>

                <p>
                    No species are currently available
                    in the catalogue.
                </p>

            </div>

        `;

        return;

    }


    results.innerHTML = `

        <div class="identifier-result">

            <h2>
                Most likely results
            </h2>

            <p>
                Based on the observations provided:
            </p>

            ${matches.map(match => `

                <div class="identifier-match">

                    <p>

                        <strong>

                            <a href="${match.species.page}">

                                <i>
                                    ${match.species.scientific_name}
                                </i>

                            </a>

                        </strong>

                    </p>

                    <p>
                        Match:
                        <strong>
                            ${match.score}%
                        </strong>
                    </p>

                </div>

            `).join("")}

        </div>

    `;

}


// ============================================================
// MATCH CALCULATION
// ============================================================

function calculateMatch(species) {

    let total = 0;
    let matched = 0;


    const identification =
        species.identification;


    for (const key in observations) {

        const observed =
            observations[key];


        if (observed === "unknown") {
            continue;
        }


        const expected =
            identification[key];


        if (expected === undefined) {
            continue;
        }


        total++;


        if (
            valuesMatch(
                observed,
                expected
            )
        ) {

            matched++;

        }

    }


    if (total === 0) {
        return 0;
    }


    return Math.round(
        (matched / total) * 100
    );

}


// ============================================================
// COMPARE VALUES
// ============================================================

function valuesMatch(observed, expected) {

    if (observed === expected) {
        return true;
    }


    if (
        Array.isArray(observed) &&
        Array.isArray(expected)
    ) {

        return observed.some(value =>
            expected.includes(value)
        );

    }


    return false;

}


    return false;

}
