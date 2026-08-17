let speciesData = {};
let observations = {};

let currentQuestion = 0;
let questions = [];


// ============================================================
// LOAD SPECIES DATA
// ============================================================

fetch("data/species.json")
    .then(response => response.json())
    .then(data => {

        speciesData = data;

        buildQuestions();
        showQuestion();

    })
    .catch(error => {

        console.error("Could not load species data:", error);

    });


// ============================================================
// QUESTION DEFINITIONS
// ============================================================

function buildQuestions() {

    questions = [

        // ----------------------------------------------------
        // ENVIRONMENT
        // ----------------------------------------------------

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


        // ----------------------------------------------------
        // TERRESTRIAL ECOLOGY
        // ----------------------------------------------------

        {
            id: "terrestrial_association",
            question: "What was the specimen associated with?",
            type: "multiple",
            options: [
                ["moss", "Moss"],
                ["lichen", "Lichen"],
                ["leaf_litter", "Leaf litter"],
                ["soil", "Soil"],
                ["vegetation", "Vegetation"],
                ["other", "Other"],
                ["unknown", "Unknown"]
            ],
            condition: () =>
                observations.environment === "terrestrial"
        },


        // ----------------------------------------------------
        // MARINE / FRESHWATER ECOLOGY
        // ----------------------------------------------------

        {
            id: "aquatic_association",
            question: "What was the specimen associated with?",
            type: "multiple",
            options: [
                ["algae", "Algae"],
                ["sediment", "Sediment"],
                ["seagrass", "Seagrass / aquatic vegetation"],
                ["coral", "Coral / reef substrate"],
                ["rock", "Rock"],
                ["other", "Other"],
                ["unknown", "Unknown"]
            ],
            condition: () =>
                observations.environment === "marine" ||
                observations.environment === "freshwater"
        },


        // ----------------------------------------------------
        // EYES
        // ----------------------------------------------------

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
            options: [
                ["black", "Black"],
                ["brown", "Brown"],
                ["red", "Red"],
                ["orange", "Orange"],
                ["other", "Other"],
                ["unknown", "Unknown"]
            ],
            condition: () =>
                observations.eyes === true
        },


        // ----------------------------------------------------
        // CUTICULAR PLATES
        // ----------------------------------------------------

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
            ],
            condition: () =>
                observations.plates === true
        },


        // ----------------------------------------------------
        // CLAVAE
        // ----------------------------------------------------

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
            options: [
                ["primary", "Primary clavae"],
                ["secondary", "Secondary clavae"],
                ["other", "Other"],
                ["unknown", "Unknown"]
            ],
            condition: () =>
                observations.clavae === true
        },


        // ----------------------------------------------------
        // CIRRI
        // ----------------------------------------------------

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
            ],
            condition: () =>
                observations.other_cirri === true
        },


        // ----------------------------------------------------
        // SENSORY SPINES / PAPILLAE
        // ----------------------------------------------------

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
            ],
            condition: () =>
                observations.sensory_structures === true
        },


        // ----------------------------------------------------
        // LEG PAIRS
        // ----------------------------------------------------

        ...buildLegQuestions("I"),
        ...buildLegQuestions("II"),
        ...buildLegQuestions("III"),
        ...buildLegQuestions("IV"),


        // ----------------------------------------------------
        // CLAW ACCESSORY POINTS
        // ----------------------------------------------------

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
            options: [
                ["primary", "Primary claws"],
                ["secondary", "Secondary claws"],
                ["inner", "Inner claws"],
                ["outer", "Outer claws"],
                ["basal_spurs", "Basal spurs"],
                ["other", "Other"],
                ["unknown", "Unknown"]
            ],
            condition: () =>
                observations.claw_accessory_points === true
        },


        // ----------------------------------------------------
        // ADVANCED / FUTURE QUESTIONS
        // ----------------------------------------------------

        {
            id: "buccal_tube_morphology",
            question: "What is the buccal tube morphology?",
            type: "single",
            options: [
                ["thin", "Thin"],
                ["wide", "Wide"],
                ["other", "Other"],
                ["unknown", "Unknown"]
            ],
            advanced: true
        }

    ];

}


// ============================================================
// LEG QUESTION BUILDER
// ============================================================

function buildLegQuestions(leg) {

    return [

        {
            id: `leg_${leg}_claws`,
            question: `How many claws are present on each leg of Leg pair ${leg}?`,
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
            id: `leg_${leg}_claw_arrangement`,
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
            id: `leg_${leg}_sensory_structures`,
            question: `Are sensory spines or papillae present on Leg ${leg}?`,
            type: "single",
            options: [
                [true, "Present"],
                [false, "Absent"],
                ["unknown", "Unknown"]
            ]
        },


        {
            id: `leg_${leg}_basal_spur_arrangement`,
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
            id: `leg_${leg}_basal_spur_orientation`,
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
        }

    ];

}


// ============================================================
// SHOW CURRENT QUESTION
// ============================================================

function showQuestion() {

    const questionsContainer =
        document.getElementById("questions");

    const visibleQuestions =
        questions.filter(question => {

            if (!question.condition) {
                return true;
            }

            return question.condition();

        });


    if (currentQuestion >= visibleQuestions.length) {

        showResult();
        return;

    }


    const question =
        visibleQuestions[currentQuestion];


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

    const visibleQuestions =
        questions.filter(question => {

            if (!question.condition) {
                return true;
            }

            return question.condition();

        });


    const question =
        visibleQuestions[currentQuestion];


    const selectedValue =
        question.options[optionIndex][0];


    observations[question.id] =
        selectedValue;


    currentQuestion++;

    showQuestion();

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


    results.innerHTML = `

        <div class="identifier-result">

            <h2>
                Most likely results
            </h2>

            <p>
                Matches are ranked according to the
                characters currently available in the catalogue.
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

    let totalWeight = 0;
    let matchedWeight = 0;


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


        const weight = 1;

        totalWeight += weight;


        if (valuesMatch(observed, expected)) {

            matchedWeight += weight;

        }

    }


    if (totalWeight === 0) {
        return 0;
    }


    return Math.round(
        (matchedWeight / totalWeight) * 100
    );

}


// ============================================================
// VALUE COMPARISON
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
