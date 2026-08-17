let speciesData = {};
let observations = {};


// ============================================================
// LOAD SPECIES DATA
// ============================================================

fetch("data/species.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not load species.json");
        }

        return response.json();
    })
    .then(data => {

        speciesData = data;

        renderIdentification();

    })
    .catch(error => {

        console.error("Could not load species data:", error);

        document.getElementById("questions").innerHTML = `
            <div class="identifier-result">
                <h2>Unable to load species data</h2>
                <p>
                    There was a problem loading the identification database.
                </p>
            </div>
        `;

    });


// ============================================================
// RENDER ALL BASE QUESTIONS
// ============================================================

function renderIdentification() {

    const questions = document.getElementById("questions");

    questions.innerHTML = `

        <!-- 01 ENVIRONMENT -->

        <div class="identifier-question">

            <h2>
                <span class="question-number">01</span>
                Environment
            </h2>

            <p>
                What environment was the specimen collected from?
            </p>

            <div class="identifier-options">

                ${radioButton(
                    "environment",
                    "marine",
                    "Marine"
                )}

                ${radioButton(
                    "environment",
                    "freshwater",
                    "Freshwater"
                )}

                ${radioButton(
                    "environment",
                    "terrestrial",
                    "Terrestrial"
                )}

                ${radioButton(
                    "environment",
                    "unknown",
                    "Unknown"
                )}

            </div>

            <div id="ecology-question"></div>

        </div>


        <!-- 02 EYES -->

        <div class="identifier-question">

            <h2>
                <span class="question-number">02</span>
                Eyes
            </h2>

            <p>
                Are eyes present?
            </p>

            <div class="identifier-options">

                ${radioButton(
                    "eyes.present",
                    true,
                    "Present"
                )}

                ${radioButton(
                    "eyes.present",
                    false,
                    "Absent"
                )}

                ${radioButton(
                    "eyes.present",
                    "unknown",
                    "Unknown"
                )}

            </div>

            <div id="eye-color-question"></div>

        </div>


        <!-- 03 PLATES -->

        <div class="identifier-question">

            <h2>
                <span class="question-number">03</span>
                Cuticular plates
            </h2>

            <p>
                Are cuticular plates present?
            </p>

            <div class="identifier-options">

                ${radioButton(
                    "plates.present",
                    true,
                    "Present"
                )}

                ${radioButton(
                    "plates.present",
                    false,
                    "Absent"
                )}

                ${radioButton(
                    "plates.present",
                    "unknown",
                    "Unknown"
                )}

            </div>

            <div id="plate-location-question"></div>

        </div>


        <!-- 04 CLAVAE -->

        <div class="identifier-question">

            <h2>
                <span class="question-number">04</span>
                Clavae
            </h2>

            <p>
                Are clavae present?
            </p>

            <div class="identifier-options">

                ${radioButton(
                    "clavae.present",
                    true,
                    "Present"
                )}

                ${radioButton(
                    "clavae.present",
                    false,
                    "Absent"
                )}

                ${radioButton(
                    "clavae.present",
                    "unknown",
                    "Unknown"
                )}

            </div>

            <div id="clavae-type-question"></div>

        </div>


        <!-- 05 MEDIAN CEPHALIC CIRRUS -->

        ${cirrusQuestion(
            "05",
            "Median cephalic cirrus",
            "median_cephalic"
        )}


        <!-- 06 INTERNAL CEPHALIC CIRRI -->

        ${cirrusQuestion(
            "06",
            "Internal cephalic cirri",
            "internal_cephalic"
        )}


        <!-- 07 EXTERNAL CEPHALIC CIRRI -->

        ${cirrusQuestion(
            "07",
            "External cephalic cirri",
            "external_cephalic"
        )}


        <!-- 08 LATERAL CIRRI -->

        ${cirrusQuestion(
            "08",
            "Lateral cirri",
            "lateral"
        )}


        <!-- 09 CIRRUS E -->

        ${cirrusQuestion(
            "09",
            "Cirrus E",
            "cirrus_E"
        )}


        <!-- 10 OTHER CIRRI -->

        <div class="identifier-question">

            <h2>
                <span class="question-number">10</span>
                Other cirri
            </h2>

            <p>
                Are other identifiable cirri present?
            </p>

            <div class="identifier-options">

                ${radioButton(
                    "cirri.other.present",
                    true,
                    "Present"
                )}

                ${radioButton(
                    "cirri.other.present",
                    false,
                    "Absent"
                )}

                ${radioButton(
                    "cirri.other.present",
                    "unknown",
                    "Unknown"
                )}

            </div>

            <div id="other-cirri-question"></div>

        </div>


        <!-- 11 SENSORY SPINES / PAPILLAE -->

        <div class="identifier-question">

            <h2>
                <span class="question-number">11</span>
                Sensory spines / papillae
            </h2>

            <p>
                Are sensory spines or papillae present?
            </p>

            <div class="identifier-options">

                ${radioButton(
                    "sensory_structures.present",
                    true,
                    "Present"
                )}

                ${radioButton(
                    "sensory_structures.present",
                    false,
                    "Absent"
                )}

                ${radioButton(
                    "sensory_structures.present",
                    "unknown",
                    "Unknown"
                )}

            </div>

            <div id="sensory-location-question"></div>

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

        <div class="identifier-submit">

            <button
                type="button"
                class="find-matches-button"
                onclick="findMatches()"
            >
                Find Matches
            </button>

        </div>

    `;

}


// ============================================================
// BASIC RADIO BUTTON
// ============================================================

function radioButton(name, value, label) {

    const id =
        name.replace(/\./g, "-") +
        "-" +
        String(value).replace(/\s+/g, "-");

    return `

        <label class="identifier-option">

            <input
                type="radio"
                name="${name}"
                value="${value}"
                onchange="recordObservation('${name}', this.value)"
            >

            <span>
                ${label}
            </span>

        </label>

    `;

}


// ============================================================
// CIRRUS QUESTION
// ============================================================

function cirrusQuestion(number, title, key) {

    return `

        <div class="identifier-question">

            <h2>
                <span class="question-number">${number}</span>
                ${title}
            </h2>

            <p>
                Is ${title.toLowerCase()} present?
            </p>

            <div class="identifier-options">

                ${radioButton(
                    `cirri.${key}.present`,
                    true,
                    "Present"
                )}

                ${radioButton(
                    `cirri.${key}.present`,
                    false,
                    "Absent"
                )}

                ${radioButton(
                    `cirri.${key}.present`,
                    "unknown",
                    "Unknown"
                )}

            </div>

        </div>

    `;

}


// ============================================================
// LEG QUESTION
// ============================================================

function legQuestion(number, leg) {

    return `

        <div class="identifier-question">

            <h2>
                <span class="question-number">${number}</span>
                Leg pair ${leg}
            </h2>

            <p>
                How many claws are present on each leg of
                leg pair ${leg}?
            </p>

            <div class="identifier-options">

                ${radioButton(
                    `legs.${leg}.claws`,
                    2,
                    "2 claws"
                )}

                ${radioButton(
                    `legs.${leg}.claws`,
                    3,
                    "3 claws"
                )}

                ${radioButton(
                    `legs.${leg}.claws`,
                    4,
                    "4 claws"
                )}

                ${radioButton(
                    `legs.${leg}.claws`,
                    "different",
                    "Different between left and right"
                )}

                ${radioButton(
                    `legs.${leg}.claws`,
                    "other",
                    "Other"
                )}

                ${radioButton(
                    `legs.${leg}.claws`,
                    "unknown",
                    "Unknown"
                )}

            </div>


            <div class="leg-followup">

                <p>
                    How are the claws arranged in size?
                </p>

                <div class="identifier-options">

                    ${radioButton(
                        `legs.${leg}.claw_arrangement`,
                        "approximately_equal",
                        "Approximately equal"
                    )}

                    ${radioButton(
                        `legs.${leg}.claw_arrangement`,
                        "progressively_longer_inner_to_outer",
                        "Progressively longer from inner → outer"
                    )}

                    ${radioButton(
                        `legs.${leg}.claw_arrangement`,
                        "progressively_shorter_inner_to_outer",
                        "Progressively shorter from inner → outer"
                    )}

                    ${radioButton(
                        `legs.${leg}.claw_arrangement`,
                        "inner_larger",
                        "Inner claws larger"
                    )}

                    ${radioButton(
                        `legs.${leg}.claw_arrangement`,
                        "outer_larger",
                        "Outer claws larger"
                    )}

                    ${radioButton(
                        `legs.${leg}.claw_arrangement`,
                        "other",
                        "Other"
                    )}

                    ${radioButton(
                        `legs.${leg}.claw_arrangement`,
                        "unknown",
                        "Unknown"
                    )}

                </div>

            </div>


            <div class="leg-followup">

                <p>
                    Are claw accessory points present?
                </p>

                <div class="identifier-options">

                    ${radioButton(
                        `legs.${leg}.accessory_points`,
                        true,
                        "Present"
                    )}

                    ${radioButton(
                        `legs.${leg}.accessory_points`,
                        false,
                        "Absent"
                    )}

                    ${radioButton(
                        `legs.${leg}.accessory_points`,
                        "unknown",
                        "Unknown"
                    )}

                </div>

            </div>


            <div class="leg-followup">

                <p>
                    How are the basal spurs arranged?
                </p>

                <div class="identifier-options">

                    ${radioButton(
                        `legs.${leg}.basal_spur_arrangement`,
                        "widely_divergent",
                        "Widely divergent"
                    )}

                    ${radioButton(
                        `legs.${leg}.basal_spur_arrangement`,
                        "slightly_divergent",
                        "Slightly divergent"
                    )}

                    ${radioButton(
                        `legs.${leg}.basal_spur_arrangement`,
                        "closely_parallel",
                        "Closely parallel"
                    )}

                    ${radioButton(
                        `legs.${leg}.basal_spur_arrangement`,
                        "parallel",
                        "Parallel"
                    )}

                    ${radioButton(
                        `legs.${leg}.basal_spur_arrangement`,
                        "other",
                        "Other"
                    )}

                    ${radioButton(
                        `legs.${leg}.basal_spur_arrangement`,
                        "unknown",
                        "Unknown"
                    )}

                </div>

            </div>


            <div class="leg-followup">

                <p>
                    In what direction are the basal spurs oriented?
                </p>

                <div class="identifier-options">

                    ${radioButton(
                        `legs.${leg}.basal_spur_orientation`,
                        "horizontal",
                        "Horizontal"
                    )}

                    ${radioButton(
                        `legs.${leg}.basal_spur_orientation`,
                        "upward",
                        "Upward"
                    )}

                    ${radioButton(
                        `legs.${leg}.basal_spur_orientation`,
                        "downward",
                        "Downward"
                    )}

                    ${radioButton(
                        `legs.${leg}.basal_spur_orientation`,
                        "toward_claw",
                        "Toward the claw"
                    )}

                    ${radioButton(
                        `legs.${leg}.basal_spur_orientation`,
                        "away_from_claw",
                        "Away from the claw"
                    )}

                    ${radioButton(
                        `legs.${leg}.basal_spur_orientation`,
                        "other",
                        "Other"
                    )}

                    ${radioButton(
                        `legs.${leg}.basal_spur_orientation`,
                        "unknown",
                        "Unknown"
                    )}

                </div>

            </div>

        </div>

    `;

}


// ============================================================
// RECORD OBSERVATION
// ============================================================

function recordObservation(path, value) {

    const parts = path.split(".");

    let current = observations;

    for (let i = 0; i < parts.length - 1; i++) {

        if (!current[parts[i]]) {
            current[parts[i]] = {};
        }

        current = current[parts[i]];

    }

    const finalKey = parts[parts.length - 1];

    // Convert boolean strings back into booleans

    if (value === "true") {
        value = true;
    }

    else if (value === "false") {
        value = false;
    }

    else if (
        value !== "unknown" &&
        value !== "other" &&
        value !== "different" &&
        !isNaN(value)
    ) {
        value = Number(value);
    }

    current[finalKey] = value;


    updateConditionalQuestions();

}


// ============================================================
// CONDITIONAL QUESTIONS
// ============================================================

function updateConditionalQuestions() {

    const environment =
        observations.environment;

    const eyes =
        observations.eyes?.present;

    const plates =
        observations.plates?.present;

    const clavae =
        observations.clavae?.present;

    const otherCirri =
        observations.cirri?.other?.present;

    const sensory =
        observations.sensory_structures?.present;


    // --------------------------------------------------------
    // ECOLOGY
    // --------------------------------------------------------

    const ecologyContainer =
        document.getElementById("ecology-question");

    if (
        environment === "marine" ||
        environment === "freshwater"
    ) {

        ecologyContainer.innerHTML = `

            <div class="conditional-question">

                <p>
                    What was the specimen associated with?
                </p>

                <div class="identifier-options">

                    ${radioButton(
                        "ecology.association",
                        "algae",
                        "Algae"
                    )}

                    ${radioButton(
                        "ecology.association",
                        "sediment",
                        "Sediment"
                    )}

                    ${radioButton(
                        "ecology.association",
                        "seagrass",
                        "Seagrass / aquatic vegetation"
                    )}

                    ${radioButton(
                        "ecology.association",
                        "coral",
                        "Coral / reef substrate"
                    )}

                    ${radioButton(
                        "ecology.association",
                        "rock",
                        "Rock"
                    )}

                    ${radioButton(
                        "ecology.association",
                        "other",
                        "Other"
                    )}

                    ${radioButton(
                        "ecology.association",
                        "unknown",
                        "Unknown"
                    )}

                </div>

            </div>

        `;

    }

    else if (environment === "terrestrial") {

        ecologyContainer.innerHTML = `

            <div class="conditional-question">

                <p>
                    What was the specimen associated with?
                </p>

                <div class="identifier-options">

                    ${radioButton(
                        "ecology.association",
                        "moss",
                        "Moss"
                    )}

                    ${radioButton(
                        "ecology.association",
                        "lichen",
                        "Lichen"
                    )}

                    ${radioButton(
                        "ecology.association",
                        "leaf_litter",
                        "Leaf litter"
                    )}

                    ${radioButton(
                        "ecology.association",
                        "soil",
                        "Soil"
                    )}

                    ${radioButton(
                        "ecology.association",
                        "vegetation",
                        "Vegetation"
                    )}

                    ${radioButton(
                        "ecology.association",
                        "other",
                        "Other"
                    )}

                    ${radioButton(
                        "ecology.association",
                        "unknown",
                        "Unknown"
                    )}

                </div>

            </div>

        `;

    }

    else {

        ecologyContainer.innerHTML = "";

    }


    // --------------------------------------------------------
    // EYE COLOR
    // --------------------------------------------------------

    const eyeColorContainer =
        document.getElementById("eye-color-question");

    if (eyes === true) {

        eyeColorContainer.innerHTML = `

            <div class="conditional-question">

                <p>
                    What color are the eyes?
                </p>

                <div class="identifier-options">

                    ${radioButton(
                        "eyes.color",
                        "black",
                        "Black"
                    )}

                    ${radioButton(
                        "eyes.color",
                        "brown",
                        "Brown"
                    )}

                    ${radioButton(
                        "eyes.color",
                        "red",
                        "Red"
                    )}

                    ${radioButton(
                        "eyes.color",
                        "orange",
                        "Orange"
                    )}

                    ${radioButton(
                        "eyes.color",
                        "other",
                        "Other"
                    )}

                    ${radioButton(
                        "eyes.color",
                        "unknown",
                        "Unknown"
                    )}

                </div>

            </div>

        `;

    }

    else {

        eyeColorContainer.innerHTML = "";

    }


    // --------------------------------------------------------
    // PLATE LOCATIONS
    // --------------------------------------------------------

    const plateContainer =
        document.getElementById("plate-location-question");

    if (plates === true) {

        plateContainer.innerHTML = `

            <div class="conditional-question">

                <p>
                    Where are cuticular plates present?
                </p>

                <div class="identifier-options">

                    ${checkbox(
                        "plates.locations",
                        "dorsal",
                        "Dorsal"
                    )}

                    ${checkbox(
                        "plates.locations",
                        "ventral",
                        "Ventral"
                    )}

                    ${checkbox(
                        "plates.locations",
                        "scapular",
                        "Scapular"
                    )}

                    ${checkbox(
                        "plates.locations",
                        "median",
                        "Median"
                    )}

                    ${checkbox(
                        "plates.locations",
                        "paired",
                        "Paired"
                    )}

                    ${checkbox(
                        "plates.locations",
                        "pseudosegmental",
                        "Pseudosegmental"
                    )}

                    ${checkbox(
                        "plates.locations",
                        "caudal",
                        "Caudal / terminal"
                    )}

                    ${checkbox(
                        "plates.locations",
                        "lateral",
                        "Lateral"
                    )}

                    ${checkbox(
                        "plates.locations",
                        "other",
                        "Other"
                    )}

                    ${checkbox(
                        "plates.locations",
                        "unknown",
                        "Unknown"
                    )}

                </div>

            </div>

        `;

    }

    else {

        plateContainer.innerHTML = "";

    }


    // --------------------------------------------------------
    // CLAVAE TYPES
    // --------------------------------------------------------

    const clavaeContainer =
        document.getElementById("clavae-type-question");

    if (clavae === true) {

        clavaeContainer.innerHTML = `

            <div class="conditional-question">

                <p>
                    Which types of clavae are present?
                </p>

                <div class="identifier-options">

                    ${checkbox(
                        "clavae.types",
                        "primary",
                        "Primary clavae"
                    )}

                    ${checkbox(
                        "clavae.types",
                        "secondary",
                        "Secondary clavae"
                    )}

                    ${checkbox(
                        "clavae.types",
                        "other",
                        "Other"
                    )}

                    ${checkbox(
                        "clavae.types",
                        "unknown",
                        "Unknown"
                    )}

                </div>

            </div>

        `;

    }

    else {

        clavaeContainer.innerHTML = "";

    }


    // --------------------------------------------------------
    // OTHER CIRRI
    // --------------------------------------------------------

    const otherCirriContainer =
        document.getElementById("other-cirri-question");

    if (otherCirri === true) {

        otherCirriContainer.innerHTML = `

            <div class="conditional-question">

                <p>
                    Where are the other cirri located?
                </p>

                <div class="identifier-options">

                    ${checkbox(
                        "cirri.other.locations",
                        "head",
                        "Head"
                    )}

                    ${checkbox(
                        "cirri.other.locations",
                        "lateral",
                        "Lateral"
                    )}

                    ${checkbox(
                        "cirri.other.locations",
                        "dorsal",
                        "Dorsal"
                    )}

                    ${checkbox(
                        "cirri.other.locations",
                        "near_leg_I",
                        "Near leg I"
                    )}

                    ${checkbox(
                        "cirri.other.locations",
                        "near_leg_II",
                        "Near leg II"
                    )}

                    ${checkbox(
                        "cirri.other.locations",
                        "near_leg_III",
                        "Near leg III"
                    )}

                    ${checkbox(
                        "cirri.other.locations",
                        "near_leg_IV",
                        "Near leg IV"
                    )}

                    ${checkbox(
                        "cirri.other.locations",
                        "other",
                        "Other"
                    )}

                    ${checkbox(
                        "cirri.other.locations",
                        "unknown",
                        "Unknown"
                    )}

                </div>

            </div>

        `;

    }

    else {

        otherCirriContainer.innerHTML = "";

    }


    // --------------------------------------------------------
    // SENSORY STRUCTURE LOCATIONS
    // --------------------------------------------------------

    const sensoryContainer =
        document.getElementById("sensory-location-question");

    if (sensory === true) {

        sensoryContainer.innerHTML = `

            <div class="conditional-question">

                <p>
                    Where are sensory spines or papillae present?
                </p>

                <div class="identifier-options">

                    ${checkbox(
                        "sensory_structures.locations",
                        "head",
                        "Head"
                    )}

                    ${checkbox(
                        "sensory_structures.locations",
                        "leg_I",
                        "Leg I"
                    )}

                    ${checkbox(
                        "sensory_structures.locations",
                        "leg_II",
                        "Leg II"
                    )}

                    ${checkbox(
                        "sensory_structures.locations",
                        "leg_III",
                        "Leg III"
                    )}

                    ${checkbox(
                        "sensory_structures.locations",
                        "leg_IV",
                        "Leg IV"
                    )}

                    ${checkbox(
                        "sensory_structures.locations",
                        "dorsal",
                        "Dorsal"
                    )}

                    ${checkbox(
                        "sensory_structures.locations",
                        "lateral",
                        "Lateral"
                    )}

                    ${checkbox(
                        "sensory_structures.locations",
                        "other",
                        "Other"
                    )}

                    ${checkbox(
                        "sensory_structures.locations",
                        "unknown",
                        "Unknown"
                    )}

                </div>

            </div>

        `;

    }

    else {

        sensoryContainer.innerHTML = "";

    }

}


// ============================================================
// CHECKBOX
// ============================================================

function checkbox(path, value, label) {

    return `

        <label class="identifier-option">

            <input
                type="checkbox"
                value="${value}"
                onchange="recordCheckbox('${path}', '${value}', this.checked)"
            >

            <span>
                ${label}
            </span>

        </label>

    `;

}


// ============================================================
// RECORD CHECKBOX
// ============================================================

function recordCheckbox(path, value, checked) {

    const parts = path.split(".");

    let current = observations;

    for (let i = 0; i < parts.length - 1; i++) {

        if (!current[parts[i]]) {
            current[parts[i]] = {};
        }

        current = current[parts[i]];

    }

    const finalKey = parts[parts.length - 1];

    if (!Array.isArray(current[finalKey])) {
        current[finalKey] = [];
    }

    if (checked) {

        if (!current[finalKey].includes(value)) {
            current[finalKey].push(value);
        }

    }

    else {

        current[finalKey] =
            current[finalKey].filter(item => item !== value);

    }

}


// ============================================================
// FIND MATCHES
// ============================================================

function findMatches() {

    const results =
        document.getElementById("results");

    const matches = [];

    for (const id in speciesData) {

        const species =
            speciesData[id];

        if (!species.identification) {
            continue;
        }

        const score =
            compareObservations(
                observations,
                species.identification
            );

        if (score !== null) {

            matches.push({
                species: species,
                score: score
            });

        }

    }


    matches.sort((a, b) => b.score - a.score);


    if (matches.length === 0) {

        results.innerHTML = `

            <div class="identifier-result">

                <h2>No matches found</h2>

                <p>
                    No species currently in the catalogue
                    are consistent with the observations provided.
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
                The catalogue found ${matches.length}
                species consistent with the observations provided.
            </p>

            <div class="identifier-results-list">

                ${matches.map(match => `

                    <p>

                        <strong>
                            <a href="${match.species.page}">
                                <i>${match.species.scientific_name}</i>
                            </a>
                        </strong>

                        <span>
                            ${match.species.authority || ""}
                        </span>

                    </p>

                `).join("")}

            </div>

        </div>

    `;

}


// ============================================================
// COMPARE OBSERVATIONS
// ============================================================

function compareObservations(
    userObservations,
    speciesIdentification
) {

    let score = 0;

    const result =
        compareObject(
            userObservations,
            speciesIdentification
        );

    if (result.conflict) {
        return null;
    }

    score = result.score;

    return score;

}


// ============================================================
// RECURSIVE COMPARISON
// ============================================================

function compareObject(
    observations,
    speciesData
) {

    let score = 0;


    for (const key in observations) {

        const observedValue =
            observations[key];

        const speciesValue =
            speciesData?.[key];


        // ----------------------------------------------------
        // Ignore unanswered / unknown observations
        // ----------------------------------------------------

        if (
            observedValue === undefined ||
            observedValue === null ||
            observedValue === "unknown"
        ) {
            continue;
        }


        // ----------------------------------------------------
        // Unknown species data cannot contradict the user
        // ----------------------------------------------------

        if (
            speciesValue === undefined ||
            speciesValue === null ||
            speciesValue === "unknown"
        ) {
            continue;
        }


        // ----------------------------------------------------
        // Nested objects
        // ----------------------------------------------------

        if (
            typeof observedValue === "object" &&
            !Array.isArray(observedValue)
        ) {

            const nested =
                compareObject(
                    observedValue,
                    speciesValue
                );

            if (nested.conflict) {
                return {
                    conflict: true,
                    score: 0
                };
            }

            score += nested.score;

            continue;

        }


        // ----------------------------------------------------
        // Arrays
        // ----------------------------------------------------

        if (Array.isArray(observedValue)) {

            if (!Array.isArray(speciesValue)) {
                continue;
            }

            for (const value of observedValue) {

                if (!speciesValue.includes(value)) {

                    return {
                        conflict: true,
                        score: 0
                    };

                }

                score++;

            }

            continue;

        }


        // ----------------------------------------------------
        // Boolean / number / string comparison
        // ----------------------------------------------------

        if (observedValue !== speciesValue) {

            return {
                conflict: true,
                score: 0
            };

        }

        score++;

    }


    return {
        conflict: false,
        score: score
    };

}
