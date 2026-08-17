let speciesData = {};
let observations = {};


// Load species data

fetch("data/species.json")
    .then(response => response.json())
    .then(data => {

        speciesData = data;

        renderQuestions();

    })
    .catch(error => {

        console.error("Could not load species data:", error);

    });


// --------------------------------------------------
// Main question renderer
// --------------------------------------------------

function renderQuestions() {

    const questions = document.getElementById("questions");

    questions.innerHTML = `

        <!-- 01 ENVIRONMENT -->

        <div class="identifier-question">

            <h2>
                01. What environment was the specimen collected from?
            </h2>

            <div class="identifier-options">

                ${choiceButton(
                    "Marine",
                    "environment",
                    "marine"
                )}

                ${choiceButton(
                    "Freshwater",
                    "environment",
                    "freshwater"
                )}

                ${choiceButton(
                    "Terrestrial",
                    "environment",
                    "terrestrial"
                )}

                ${choiceButton(
                    "Unknown",
                    "environment",
                    "unknown"
                )}

            </div>

            <div id="environment-extra"></div>

        </div>


        <!-- 02 EYES -->

        <div class="identifier-question">

            <h2>
                02. Are eyes present?
            </h2>

            <div class="identifier-options">

                ${choiceButton(
                    "Present",
                    "eyes_present",
                    true
                )}

                ${choiceButton(
                    "Absent",
                    "eyes_present",
                    false
                )}

                ${choiceButton(
                    "Unknown",
                    "eyes_present",
                    "unknown"
                )}

            </div>

            <div id="eyes-extra"></div>

        </div>


        <!-- 03 PLATES -->

        <div class="identifier-question">

            <h2>
                03. Are cuticular plates present?
            </h2>

            <div class="identifier-options">

                ${choiceButton(
                    "Present",
                    "plates_present",
                    true
                )}

                ${choiceButton(
                    "Absent",
                    "plates_present",
                    false
                )}

                ${choiceButton(
                    "Unknown",
                    "plates_present",
                    "unknown"
                )}

            </div>

            <div id="plates-extra"></div>

        </div>


        <!-- 04 CLAVAE -->

        <div class="identifier-question">

            <h2>
                04. Are clavae present?
            </h2>

            <div class="identifier-options">

                ${choiceButton(
                    "Present",
                    "clavae_present",
                    true
                )}

                ${choiceButton(
                    "Absent",
                    "clavae_present",
                    false
                )}

                ${choiceButton(
                    "Unknown",
                    "clavae_present",
                    "unknown"
                )}

            </div>

            <div id="clavae-extra"></div>

        </div>


        <!-- 05 MEDIAN CIRRUS -->

        ${cirrusQuestion(
            "05",
            "Is a median cephalic cirrus present?",
            "median_cephalic"
        )}


        <!-- 06 INTERNAL CIRRI -->

        ${cirrusQuestion(
            "06",
            "Are internal cephalic cirri present?",
            "internal_cephalic"
        )}


        <!-- 07 EXTERNAL CIRRI -->

        ${cirrusQuestion(
            "07",
            "Are external cephalic cirri present?",
            "external_cephalic"
        )}


        <!-- 08 LATERAL CIRRI -->

        ${cirrusQuestion(
            "08",
            "Are lateral cirri present?",
            "lateral"
        )}


        <!-- 09 CIRRUS E -->

        ${cirrusQuestion(
            "09",
            "Is cirrus E present?",
            "cirrus_E"
        )}


        <!-- 10 OTHER CIRRI -->

        <div class="identifier-question">

            <h2>
                10. Are other identifiable cirri present?
            </h2>

            <div class="identifier-options">

                ${choiceButton(
                    "Present",
                    "other_cirri",
                    true
                )}

                ${choiceButton(
                    "Absent",
                    "other_cirri",
                    false
                )}

                ${choiceButton(
                    "Unknown",
                    "other_cirri",
                    "unknown"
                )}

            </div>

            <div id="other-cirri-extra"></div>

        </div>


        <!-- 11 SENSORY SPINES -->

        <div class="identifier-question">

            <h2>
                11. Are sensory spines or papillae present?
            </h2>

            <div class="identifier-options">

                ${choiceButton(
                    "Present",
                    "sensory_structures",
                    true
                )}

                ${choiceButton(
                    "Absent",
                    "sensory_structures",
                    false
                )}

                ${choiceButton(
                    "Unknown",
                    "sensory_structures",
                    "unknown"
                )}

            </div>

            <div id="sensory-extra"></div>

        </div>


        <!-- 12 LEG I -->

        ${legQuestion("12", "I")}


        <!-- 13 LEG II -->

        ${legQuestion("13", "II")}


        <!-- 14 LEG III -->

        ${legQuestion("14", "III")}


        <!-- 15 LEG IV -->

        ${legQuestion("15", "IV")}


        <!-- FIND MATCHES -->

        <div class="find-matches-container">

            <button
                class="find-matches-button"
                onclick="findMatches()"
            >
                Find Matches
            </button>

        </div>

    `;

}


// --------------------------------------------------
// Button generator
// --------------------------------------------------

function choiceButton(label, key, value) {

    return `
        <button
            type="button"
            onclick='recordAnswer("${key}", ${JSON.stringify(value)})'
        >
            ${label}
        </button>
    `;

}


// --------------------------------------------------
// Cirrus question generator
// --------------------------------------------------

function cirrusQuestion(number, question, key) {

    return `

        <div class="identifier-question">

            <h2>
                ${number}. ${question}
            </h2>

            <div class="identifier-options">

                ${choiceButton(
                    "Present",
                    "cirri." + key,
                    true
                )}

                ${choiceButton(
                    "Absent",
                    "cirri." + key,
                    false
                )}

                ${choiceButton(
                    "Unknown",
                    "cirri." + key,
                    "unknown"
                )}

            </div>

        </div>

    `;

}


// --------------------------------------------------
// Leg question generator
// --------------------------------------------------

function legQuestion(number, leg) {

    return `

        <div class="identifier-question">

            <h2>
                ${number}. Leg pair ${leg}
            </h2>


            <h3>
                How many claws are present on each leg?
            </h3>

            <div class="identifier-options">

                ${choiceButton(
                    "2 claws",
                    `legs.${leg}.claws`,
                    2
                )}

                ${choiceButton(
                    "3 claws",
                    `legs.${leg}.claws`,
                    3
                )}

                ${choiceButton(
                    "4 claws",
                    `legs.${leg}.claws`,
                    4
                )}

                ${choiceButton(
                    "Different between left and right",
                    `legs.${leg}.claws`,
                    "different"
                )}

                ${choiceButton(
                    "Other",
                    `legs.${leg}.claws`,
                    "other"
                )}

                ${choiceButton(
                    "Unknown",
                    `legs.${leg}.claws`,
                    "unknown"
                )}

            </div>


            <h3>
                How are the claws arranged in size?
            </h3>

            <div class="identifier-options">

                ${choiceButton(
                    "Approximately equal",
                    `legs.${leg}.claw_arrangement`,
                    "approximately_equal"
                )}

                ${choiceButton(
                    "Progressively longer from inner → outer",
                    `legs.${leg}.claw_arrangement`,
                    "progressively_longer_inner_to_outer"
                )}

                ${choiceButton(
                    "Progressively shorter from inner → outer",
                    `legs.${leg}.claw_arrangement`,
                    "progressively_shorter_inner_to_outer"
                )}

                ${choiceButton(
                    "Inner claws larger",
                    `legs.${leg}.claw_arrangement`,
                    "inner_larger"
                )}

                ${choiceButton(
                    "Outer claws larger",
                    `legs.${leg}.claw_arrangement`,
                    "outer_larger"
                )}

                ${choiceButton(
                    "Other",
                    `legs.${leg}.claw_arrangement`,
                    "other"
                )}

                ${choiceButton(
                    "Unknown",
                    `legs.${leg}.claw_arrangement`,
                    "unknown"
                )}

            </div>


            <h3>
                Are claw accessory points present?
            </h3>

            <div class="identifier-options">

                ${choiceButton(
                    "Present",
                    `legs.${leg}.accessory_points`,
                    true
                )}

                ${choiceButton(
                    "Absent",
                    `legs.${leg}.accessory_points`,
                    false
                )}

                ${choiceButton(
                    "Unknown",
                    `legs.${leg}.accessory_points`,
                    "unknown"
                )}

            </div>


            <h3>
                How are the basal spurs arranged?
            </h3>

            <div class="identifier-options">

                ${choiceButton(
                    "Widely divergent",
                    `legs.${leg}.basal_spur_arrangement`,
                    "widely_divergent"
                )}

                ${choiceButton(
                    "Slightly divergent",
                    `legs.${leg}.basal_spur_arrangement`,
                    "slightly_divergent"
                )}

                ${choiceButton(
                    "Closely parallel",
                    `legs.${leg}.basal_spur_arrangement`,
                    "closely_parallel"
                )}

                ${choiceButton(
                    "Parallel",
                    `legs.${leg}.basal_spur_arrangement`,
                    "parallel"
                )}

                ${choiceButton(
                    "Other",
                    `legs.${leg}.basal_spur_arrangement`,
                    "other"
                )}

                ${choiceButton(
                    "Unknown",
                    `legs.${leg}.basal_spur_arrangement`,
                    "unknown"
                )}

            </div>


            <h3>
                In what direction are the basal spurs oriented?
            </h3>

            <div class="identifier-options">

                ${choiceButton(
                    "Horizontal",
                    `legs.${leg}.basal_spur_orientation`,
                    "horizontal"
                )}

                ${choiceButton(
                    "Upward",
                    `legs.${leg}.basal_spur_orientation`,
                    "upward"
                )}

                ${choiceButton(
                    "Downward",
                    `legs.${leg}.basal_spur_orientation`,
                    "downward"
                )}

                ${choiceButton(
                    "Toward the claw",
                    `legs.${leg}.basal_spur_orientation`,
                    "toward_claw"
                )}

                ${choiceButton(
                    "Away from the claw",
                    `legs.${leg}.basal_spur_orientation`,
                    "away_from_claw"
                )}

                ${choiceButton(
                    "Other",
                    `legs.${leg}.basal_spur_orientation`,
                    "other"
                )}

                ${choiceButton(
                    "Unknown",
                    `legs.${leg}.basal_spur_orientation`,
                    "unknown"
                )}

            </div>

        </div>

    `;

}


// --------------------------------------------------
// Record answers
// --------------------------------------------------

function recordAnswer(key, value) {

    setNestedValue(observations, key, value);

    updateConditionalQuestions();

}


// --------------------------------------------------
// Store nested observation values
// --------------------------------------------------

function setNestedValue(object, path, value) {

    const parts = path.split(".");

    let current = object;

    for (let i = 0; i < parts.length - 1; i++) {

        if (!current[parts[i]]) {
            current[parts[i]] = {};
        }

        current = current[parts[i]];

    }

    current[parts[parts.length - 1]] = value;

}


// --------------------------------------------------
// Conditional questions
// --------------------------------------------------

function updateConditionalQuestions() {

    updateEyeQuestion();
    updatePlateQuestion();
    updateClavaeQuestion();
    updateEnvironmentQuestion();
    updateOtherCirriQuestion();
    updateSensoryQuestion();

}


// --------------------------------------------------
// Environment
// --------------------------------------------------

function updateEnvironmentQuestion() {

    const container =
        document.getElementById("environment-extra");

    if (!container) return;

    if (
        observations.environment === "marine" ||
        observations.environment === "freshwater"
    ) {

        container.innerHTML = `

            <div class="identifier-followup">

                <h3>
                    What was the specimen associated with?
                </h3>

                <div class="identifier-options">

                    ${choiceButton(
                        "Algae",
                        "ecological_association",
                        "algae"
                    )}

                    ${choiceButton(
                        "Sediment",
                        "ecological_association",
                        "sediment"
                    )}

                    ${choiceButton(
                        "Seagrass / aquatic vegetation",
                        "ecological_association",
                        "seagrass"
                    )}

                    ${choiceButton(
                        "Coral / reef substrate",
                        "ecological_association",
                        "coral"
                    )}

                    ${choiceButton(
                        "Rock",
                        "ecological_association",
                        "rock"
                    )}

                    ${choiceButton(
                        "Other",
                        "ecological_association",
                        "other"
                    )}

                    ${choiceButton(
                        "Unknown",
                        "ecological_association",
                        "unknown"
                    )}

                </div>

            </div>

        `;

    }

    else if (observations.environment === "terrestrial") {

        container.innerHTML = `

            <div class="identifier-followup">

                <h3>
                    What was the specimen associated with?
                </h3>

                <div class="identifier-options">

                    ${choiceButton(
                        "Moss",
                        "ecological_association",
                        "moss"
                    )}

                    ${choiceButton(
                        "Lichen",
                        "ecological_association",
                        "lichen"
                    )}

                    ${choiceButton(
                        "Leaf litter",
                        "ecological_association",
                        "leaf_litter"
                    )}

                    ${choiceButton(
                        "Soil",
                        "ecological_association",
                        "soil"
                    )}

                    ${choiceButton(
                        "Vegetation",
                        "ecological_association",
                        "vegetation"
                    )}

                    ${choiceButton(
                        "Other",
                        "ecological_association",
                        "other"
                    )}

                    ${choiceButton(
                        "Unknown",
                        "ecological_association",
                        "unknown"
                    )}

                </div>

            </div>

        `;

    }

    else {

        container.innerHTML = "";

    }

}


// --------------------------------------------------
// Eyes
// --------------------------------------------------

function updateEyeQuestion() {

    const container =
        document.getElementById("eyes-extra");

    if (!container) return;

    if (observations.eyes_present === true) {

        container.innerHTML = `

            <div class="identifier-followup">

                <h3>
                    What color are the eyes?
                </h3>

                <div class="identifier-options">

                    ${choiceButton(
                        "Black",
                        "eyes_color",
                        "black"
                    )}

                    ${choiceButton(
                        "Brown",
                        "eyes_color",
                        "brown"
                    )}

                    ${choiceButton(
                        "Red",
                        "eyes_color",
                        "red"
                    )}

                    ${choiceButton(
                        "Orange",
                        "eyes_color",
                        "orange"
                    )}

                    ${choiceButton(
                        "Other",
                        "eyes_color",
                        "other"
                    )}

                    ${choiceButton(
                        "Unknown",
                        "eyes_color",
                        "unknown"
                    )}

                </div>

            </div>

        `;

    }

    else {

        container.innerHTML = "";

    }

}


// --------------------------------------------------
// Plates
// --------------------------------------------------

function updatePlateQuestion() {

    const container =
        document.getElementById("plates-extra");

    if (!container) return;

    if (observations.plates_present === true) {

        container.innerHTML = `

            <div class="identifier-followup">

                <h3>
                    Where are the cuticular plates present?
                </h3>

                <p>
                    Select all that apply.
                </p>

                <div class="identifier-options">

                    ${multiButton(
                        "Dorsal",
                        "plate_locations",
                        "dorsal"
                    )}

                    ${multiButton(
                        "Ventral",
                        "plate_locations",
                        "ventral"
                    )}

                    ${multiButton(
                        "Scapular",
                        "plate_locations",
                        "scapular"
                    )}

                    ${multiButton(
                        "Median",
                        "plate_locations",
                        "median"
                    )}

                    ${multiButton(
                        "Paired",
                        "plate_locations",
                        "paired"
                    )}

                    ${multiButton(
                        "Pseudosegmental",
                        "plate_locations",
                        "pseudosegmental"
                    )}

                    ${multiButton(
                        "Caudal / terminal",
                        "plate_locations",
                        "caudal_terminal"
                    )}

                    ${multiButton(
                        "Lateral",
                        "plate_locations",
                        "lateral"
                    )}

                    ${multiButton(
                        "Other",
                        "plate_locations",
                        "other"
                    )}

                    ${multiButton(
                        "Unknown",
                        "plate_locations",
                        "unknown"
                    )}

                </div>

            </div>

        `;

    }

    else {

        container.innerHTML = "";

    }

}


// --------------------------------------------------
// Clavae
// --------------------------------------------------

function updateClavaeQuestion() {

    const container =
        document.getElementById("clavae-extra");

    if (!container) return;

    if (observations.clavae_present === true) {

        container.innerHTML = `

            <div class="identifier-followup">

                <h3>
                    Which types of clavae are present?
                </h3>

                <p>
                    Select all that apply.
                </p>

                <div class="identifier-options">

                    ${multiButton(
                        "Primary clavae",
                        "clavae_types",
                        "primary"
                    )}

                    ${multiButton(
                        "Secondary clavae",
                        "clavae_types",
                        "secondary"
                    )}

                    ${multiButton(
                        "Other",
                        "clavae_types",
                        "other"
                    )}

                    ${multiButton(
                        "Unknown",
                        "clavae_types",
                        "unknown"
                    )}

                </div>

            </div>

        `;

    }

    else {

        container.innerHTML = "";

    }

}


// --------------------------------------------------
// Other cirri
// --------------------------------------------------

function updateOtherCirriQuestion() {

    const container =
        document.getElementById("other-cirri-extra");

    if (!container) return;

    if (observations.other_cirri === true) {

        container.innerHTML = `

            <div class="identifier-followup">

                <h3>
                    Where are the other cirri located?
                </h3>

                <p>
                    Select all that apply.
                </p>

                <div class="identifier-options">

                    ${multiButton(
                        "Head",
                        "other_cirri_locations",
                        "head"
                    )}

                    ${multiButton(
                        "Lateral",
                        "other_cirri_locations",
                        "lateral"
                    )}

                    ${multiButton(
                        "Dorsal",
                        "other_cirri_locations",
                        "dorsal"
                    )}

                    ${multiButton(
                        "Near leg I",
                        "other_cirri_locations",
                        "near_leg_I"
                    )}

                    ${multiButton(
                        "Near leg II",
                        "other_cirri_locations",
                        "near_leg_II"
                    )}

                    ${multiButton(
                        "Near leg III",
                        "other_cirri_locations",
                        "near_leg_III"
                    )}

                    ${multiButton(
                        "Near leg IV",
                        "other_cirri_locations",
                        "near_leg_IV"
                    )}

                    ${multiButton(
                        "Other",
                        "other_cirri_locations",
                        "other"
                    )}

                    ${multiButton(
                        "Unknown",
                        "other_cirri_locations",
                        "unknown"
                    )}

                </div>

            </div>

        `;

    }

    else {

        container.innerHTML = "";

    }

}


// --------------------------------------------------
// Sensory structures
// --------------------------------------------------

function updateSensoryQuestion() {

    const container =
        document.getElementById("sensory-extra");

    if (!container) return;

    if (observations.sensory_structures === true) {

        container.innerHTML = `

            <div class="identifier-followup">

                <h3>
                    Where are sensory spines or papillae present?
                </h3>

                <p>
                    Select all that apply.
                </p>

                <div class="identifier-options">

                    ${multiButton(
                        "Head",
                        "sensory_locations",
                        "head"
                    )}

                    ${multiButton(
                        "Leg I",
                        "sensory_locations",
                        "leg_I"
                    )}

                    ${multiButton(
                        "Leg II",
                        "sensory_locations",
                        "leg_II"
                    )}

                    ${multiButton(
                        "Leg III",
                        "sensory_locations",
                        "leg_III"
                    )}

                    ${multiButton(
                        "Leg IV",
                        "sensory_locations",
                        "leg_IV"
                    )}

                    ${multiButton(
                        "Dorsal",
                        "sensory_locations",
                        "dorsal"
                    )}

                    ${multiButton(
                        "Lateral",
                        "sensory_locations",
                        "lateral"
                    )}

                    ${multiButton(
                        "Other",
                        "sensory_locations",
                        "other"
                    )}

                    ${multiButton(
                        "Unknown",
                        "sensory_locations",
                        "unknown"
                    )}

                </div>

            </div>

        `;

    }

    else {

        container.innerHTML = "";

    }

}


// --------------------------------------------------
// Multi-select buttons
// --------------------------------------------------

function multiButton(label, key, value) {

    return `
        <button
            type="button"
            onclick='toggleMultiAnswer("${key}", "${value}", this)'
        >
            ${label}
        </button>
    `;

}


function toggleMultiAnswer(key, value, button) {

    if (!observations[key]) {
        observations[key] = [];
    }

    const index =
        observations[key].indexOf(value);

    if (index === -1) {

        observations[key].push(value);

        button.classList.add("selected");

    }

    else {

        observations[key].splice(index, 1);

        button.classList.remove("selected");

    }

}


// --------------------------------------------------
// Find matches
// --------------------------------------------------

function findMatches() {

    const results =
        document.getElementById("results");

    let matches = [];


    for (const id in speciesData) {

        const species = speciesData[id];

        if (!species.identification) {
            continue;
        }


        if (speciesMatches(
            species.identification,
            observations
        )) {

            matches.push(species);

        }

    }


    if (matches.length === 0) {

        results.innerHTML = `

            <div class="identifier-result">

                <h2>
                    No matches found
                </h2>

                <p>
                    No species currently match the
                    characteristics you selected.
                </p>

            </div>

        `;

        return;

    }


    results.innerHTML = `

        <div class="identifier-result">

            <h2>
                Possible matches
            </h2>

            <p>
                Based on the observations you entered:
            </p>

            ${matches.map(species => `

                <p>

                    <strong>

                        <a href="${species.page}">

                            <i>
                                ${species.scientific_name}
                            </i>

                        </a>

                    </strong>

                    ${species.authority || ""}

                </p>

            `).join("")}

        </div>

    `;

}


// --------------------------------------------------
// Species matching
// --------------------------------------------------

function speciesMatches(speciesID, observations) {

    for (const key in observations) {

        const observedValue =
            observations[key];

        if (
            observedValue === undefined ||
            observedValue === "unknown"
        ) {
            continue;
        }


        const speciesValue =
            getNestedValue(speciesID, key);


        if (speciesValue === undefined) {
            continue;
        }


        if (Array.isArray(observedValue)) {

            if (!Array.isArray(speciesValue)) {
                continue;
            }

            const allMatch =
                observedValue.every(
                    value =>
                        speciesValue.includes(value)
                );

            if (!allMatch) {
                return false;
            }

        }

        else {

            if (speciesValue !== observedValue) {
                return false;
            }

        }

    }

    return true;

}


// --------------------------------------------------
// Get nested value
// --------------------------------------------------

function getNestedValue(object, path) {

    const parts =
        path.split(".");

    let current =
        object;

    for (const part of parts) {

        if (
            current === undefined ||
            current === null
        ) {

            return undefined;

        }

        current =
            current[part];

    }

    return current;

}
