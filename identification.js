let speciesData = {};
let observations = {};


// ==================================================
// LOAD SPECIES DATA
// ==================================================

fetch("data/species.json")
    .then(response => response.json())
    .then(data => {

        speciesData = data;

        renderQuestions();

    })
    .catch(error => {

        console.error("Could not load species data:", error);

    });


// ==================================================
// MAIN QUESTION RENDERER
// ==================================================

function renderQuestions() {

    const questions = document.getElementById("questions");

    questions.innerHTML = `

        <!-- ==========================================
             01 ENVIRONMENT
        =========================================== -->

        <div class="identifier-question">

            <h2>01. Environment</h2>

            <h3>
                What environment was the specimen collected from?
            </h3>

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


        <!-- ==========================================
             02 EYES
        =========================================== -->

        <div class="identifier-question">

            <h2>02. Eyes</h2>

            <h3>
                Are eyes present?
            </h3>

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


        <!-- ==========================================
             03 CUTICULAR PLATES
        =========================================== -->

        <div class="identifier-question">

            <h2>03. Cuticular plates</h2>

            <h3>
                Are cuticular plates present?
            </h3>

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


        <!-- ==========================================
             04 CLAVAE
        =========================================== -->

        <div class="identifier-question">

            <h2>04. Clavae</h2>

            <h3>
                Are clavae present?
            </h3>

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


        <!-- ==========================================
             05–09 CIRRI
        =========================================== -->

        ${cirrusQuestion(
            "05",
            "Is a median cephalic cirrus present?",
            "median_cephalic"
        )}

        ${cirrusQuestion(
            "06",
            "Are internal cephalic cirri present?",
            "internal_cephalic"
        )}

        ${cirrusQuestion(
            "07",
            "Are external cephalic cirri present?",
            "external_cephalic"
        )}

        ${cirrusQuestion(
            "08",
            "Are lateral cirri present?",
            "lateral"
        )}

        ${cirrusQuestion(
            "09",
            "Is cirrus E present?",
            "cirrus_E"
        )}


        <!-- ==========================================
             10 OTHER CIRRI
        =========================================== -->

        <div class="identifier-question">

            <h2>10. Other cirri</h2>

            <h3>
                Are other identifiable cirri present?
            </h3>

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


        <!-- ==========================================
             11 SENSORY STRUCTURES
        =========================================== -->

        <div class="identifier-question">

            <h2>11. Sensory spines / papillae</h2>

            <h3>
                Are sensory spines or papillae present?
            </h3>

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


        <!-- ==========================================
             12–15 LEGS
        =========================================== -->

        ${legQuestion("12", "I")}

        ${legQuestion("13", "II")}

        ${legQuestion("14", "III")}

        ${legQuestion("15", "IV")}


        <!-- ==========================================
             FIND MATCHES
        =========================================== -->

        <div class="find-matches-container">

            <button
                type="button"
                class="find-matches-button"
                onclick="findMatches()"
            >
                Find Matches
            </button>

        </div>

    `;

    // Restore the visual state of buttons after initial rendering.
    restoreSelectedButtons();

}


// ==================================================
// SINGLE-SELECT BUTTON
// ==================================================

function choiceButton(label, key, value) {

    const selected =
        getNestedValue(observations, key) === value;

    return `
        <button
            type="button"
            class="identifier-choice-button ${selected ? "selected" : ""}"
            data-key="${key}"
            data-value="${String(value)}"
            onclick="recordAnswer('${key}', ${JSON.stringify(value)}, this)"
        >
            ${label}
        </button>
    `;

}


// ==================================================
// CIRRUS QUESTION
// ==================================================

function cirrusQuestion(number, question, key) {

    return `

        <div class="identifier-question">

            <h2>${number}. Cirri</h2>

            <h3>${question}</h3>

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


// ==================================================
// LEG QUESTION
// ==================================================

function legQuestion(number, leg) {

    return `

        <div class="identifier-question">

            <h2>${number}. Leg pair ${leg}</h2>


            <!-- CLAW COUNT -->

            <div class="identifier-subquestion">

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

            </div>


            <!-- CLAW ARRANGEMENT -->

            <div class="identifier-subquestion">

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

            </div>


            <!-- ACCESSORY POINTS -->

            <div class="identifier-subquestion">

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

            </div>


            <!-- BASAL SPUR ARRANGEMENT -->

            <div class="identifier-subquestion">

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

            </div>


            <!-- BASAL SPUR ORIENTATION -->

            <div class="identifier-subquestion">

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

        </div>

    `;

}


// ==================================================
// RECORD ANSWER
// ==================================================

function recordAnswer(key, value, button) {

    setNestedValue(observations, key, value);

    // Note: we no longer hand-toggle classes here. The single
    // restoreSelectedButtons() call inside updateConditionalQuestions()
    // is now the ONLY thing that decides which buttons look selected,
    // so there's one source of truth instead of two competing ones.

    updateConditionalQuestions();

}


// ==================================================
// SET NESTED VALUE
// ==================================================

function setNestedValue(object, path, value) {

    const parts = path.split(".");

    let current = object;

    for (let i = 0; i < parts.length - 1; i++) {

        if (
            typeof current[parts[i]] !== "object" ||
            current[parts[i]] === null
        ) {

            current[parts[i]] = {};

        }

        current = current[parts[i]];

    }

    current[parts[parts.length - 1]] = value;

}


// ==================================================
// GET NESTED VALUE
// ==================================================

function getNestedValue(object, path) {

    const parts = path.split(".");

    let current = object;

    for (const part of parts) {

        if (
            current === undefined ||
            current === null
        ) {

            return undefined;

        }

        current = current[part];

    }

    return current;

}


// ==================================================
// FLATTEN OBSERVATIONS
//
// Answers to nested questions (cirri.*, legs.<leg>.*) are stored
// as real nested objects, e.g. observations.legs.I.claws = 4.
// speciesMatches() needs each individual leaf answer as its own
// dotted-path key (e.g. "legs.I.claws") so it can be checked one
// character at a time against the species data. This walks the
// observations tree and produces exactly that.
//
// Arrays (multi-select answers like ecological_association) are
// treated as leaves and are NOT descended into.
// ==================================================

function flattenObservations(object, prefix = "") {

    let flat = {};

    for (const key in object) {

        const value = object[key];

        const fullKey =
            prefix ? `${prefix}.${key}` : key;

        if (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value)
        ) {

            Object.assign(
                flat,
                flattenObservations(value, fullKey)
            );

        }

        else {

            flat[fullKey] = value;

        }

    }

    return flat;

}


// ==================================================
// CONDITIONAL QUESTIONS
// ==================================================

function updateConditionalQuestions() {

    updateEnvironmentQuestion();
    updateEyeQuestion();
    updatePlateQuestion();
    updateClavaeQuestion();
    updateOtherCirriQuestion();
    updateSensoryQuestion();

    // Resync every button's "selected" class exactly once, after
    // all follow-up sections above have finished rebuilding their
    // HTML. Previously each of the six functions above called this
    // itself, meaning a single click could trigger up to six full
    // -page re-syncs back to back — wasteful, and the likely source
    // of the selection state looking glitchy/inconsistent.
    restoreSelectedButtons();

}


// ==================================================
// ENVIRONMENT FOLLOW-UP
// ==================================================

function updateEnvironmentQuestion() {

    const container =
        document.getElementById("environment-extra");

    if (!container) return;

    if (
        observations.environment === "marine" ||
        observations.environment === "freshwater"
    ) {

        const values = [
            ["Algae", "algae"],
            ["Sediment", "sediment"],
            ["Seagrass / aquatic vegetation", "seagrass"],
            ["Coral / reef substrate", "coral"],
            ["Rock", "rock"],
            ["Other", "other"],
            ["Unknown", "unknown"]
        ];

        container.innerHTML = `

            <div class="identifier-followup">

                <h3>
                    What was the specimen associated with?
                </h3>

                <div class="identifier-options">

                    ${values.map(item =>
                        multiButton(
                            item[0],
                            "ecological_association",
                            item[1]
                        )
                    ).join("")}

                </div>

            </div>

        `;

    }

    else if (
        observations.environment === "terrestrial"
    ) {

        const values = [
            ["Moss", "moss"],
            ["Lichen", "lichen"],
            ["Leaf litter", "leaf_litter"],
            ["Soil", "soil"],
            ["Vegetation", "vegetation"],
            ["Other", "other"],
            ["Unknown", "unknown"]
        ];

        container.innerHTML = `

            <div class="identifier-followup">

                <h3>
                    What was the specimen associated with?
                </h3>

                <div class="identifier-options">

                    ${values.map(item =>
                        multiButton(
                            item[0],
                            "ecological_association",
                            item[1]
                        )
                    ).join("")}

                </div>

            </div>

        `;

    }

    else {

        container.innerHTML = "";

    }

}


// ==================================================
// EYE FOLLOW-UP
// ==================================================

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

                    ${multiButton(
                        "Black",
                        "eyes_color",
                        "black"
                    )}

                    ${multiButton(
                        "Brown",
                        "eyes_color",
                        "brown"
                    )}

                    ${multiButton(
                        "Red",
                        "eyes_color",
                        "red"
                    )}

                    ${multiButton(
                        "Orange",
                        "eyes_color",
                        "orange"
                    )}

                    ${multiButton(
                        "Other",
                        "eyes_color",
                        "other"
                    )}

                    ${multiButton(
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


// ==================================================
// PLATE FOLLOW-UP
// ==================================================

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

                    ${[
                        ["Dorsal", "dorsal"],
                        ["Ventral", "ventral"],
                        ["Scapular", "scapular"],
                        ["Median", "median"],
                        ["Paired", "paired"],
                        ["Pseudosegmental", "pseudosegmental"],
                        ["Caudal / terminal", "caudal_terminal"],
                        ["Lateral", "lateral"],
                        ["Other", "other"],
                        ["Unknown", "unknown"]
                    ].map(item =>
                        multiButton(
                            item[0],
                            "plate_locations",
                            item[1]
                        )
                    ).join("")}

                </div>

            </div>

        `;

    }

    else {

        container.innerHTML = "";

    }

}


// ==================================================
// CLAVAE FOLLOW-UP
// ==================================================

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


// ==================================================
// OTHER CIRRI FOLLOW-UP
// ==================================================

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

                    ${[
                        ["Head", "head"],
                        ["Lateral", "lateral"],
                        ["Dorsal", "dorsal"],
                        ["Near leg I", "near_leg_I"],
                        ["Near leg II", "near_leg_II"],
                        ["Near leg III", "near_leg_III"],
                        ["Near leg IV", "near_leg_IV"],
                        ["Other", "other"],
                        ["Unknown", "unknown"]
                    ].map(item =>
                        multiButton(
                            item[0],
                            "other_cirri_locations",
                            item[1]
                        )
                    ).join("")}

                </div>

            </div>

        `;

    }

    else {

        container.innerHTML = "";

    }

}


// ==================================================
// SENSORY FOLLOW-UP
// ==================================================

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

                    ${[
                        ["Head", "head"],
                        ["Leg I", "leg_I"],
                        ["Leg II", "leg_II"],
                        ["Leg III", "leg_III"],
                        ["Leg IV", "leg_IV"],
                        ["Dorsal", "dorsal"],
                        ["Lateral", "lateral"],
                        ["Other", "other"],
                        ["Unknown", "unknown"]
                    ].map(item =>
                        multiButton(
                            item[0],
                            "sensory_locations",
                            item[1]
                        )
                    ).join("")}

                </div>

            </div>

        `;

    }

    else {

        container.innerHTML = "";

    }

}


// ==================================================
// MULTI-SELECT BUTTON
// ==================================================

function multiButton(label, key, value) {

    const current =
        observations[key] || [];

    const selected =
        current.includes(value);

    return `
        <button
            type="button"
            class="identifier-choice-button ${selected ? "selected" : ""}"
            data-key="${key}"
            data-value="${value}"
            onclick="toggleMultiAnswer('${key}', '${value}', this)"
        >
            ${label}
        </button>
    `;

}


function toggleMultiAnswer(key, value, button) {

    if (!observations[key]) {

        observations[key] = [];

    }


    // "Unknown" should behave as an exclusive answer.
    if (value === "unknown") {

        observations[key] = ["unknown"];

        restoreSelectedButtons();

        return;

    }


    // Selecting a real value removes Unknown.
    observations[key] =
        observations[key].filter(
            item => item !== "unknown"
        );


    const index =
        observations[key].indexOf(value);


    if (index === -1) {

        observations[key].push(value);

    }

    else {

        observations[key].splice(index, 1);

    }

    restoreSelectedButtons();

}


// ==================================================
// RESTORE SELECTED BUTTONS
// ==================================================

function restoreSelectedButtons() {

    document
        .querySelectorAll(".identifier-choice-button")
        .forEach(button => {

            const key =
                button.dataset.key;

            const value =
                button.dataset.value;


            const stored =
                getNestedValue(observations, key);


            let selected = false;


            if (Array.isArray(stored)) {

                selected =
                    stored.includes(value);

            }

            else {

                selected =
                    String(stored) === value;

            }


            button.classList.toggle(
                "selected",
                selected
            );

        });

}


// ==================================================
// FIND MATCHES
// ==================================================

function findMatches() {

    const results =
        document.getElementById("results");

    let matches = [];


    for (const id in speciesData) {

        const species =
            speciesData[id];


        if (!species.identification) {

            continue;

        }


        if (
            speciesMatches(
                species.identification,
                observations
            )
        ) {

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


// ==================================================
// SPECIES MATCHING
// ==================================================

function speciesMatches(speciesID, observations) {

    // Flatten first: nested answers (cirri.*, legs.<leg>.*) live as
    // real nested objects in `observations`, so a plain `for...in`
    // over the top level would only ever see keys like "legs" or
    // "cirri" pointing at whole objects — never the individual
    // leaf answers like "legs.I.claws" that getSpeciesCharacter()
    // actually knows how to look up. That mismatch was silently
    // failing every species with any leg/cirrus answer recorded.
    const flatObservations =
        flattenObservations(observations);

    for (const key in flatObservations) {

        const observedValue =
            flatObservations[key];


        // ------------------------------------------
        // UNKNOWN = IGNORE THIS CHARACTER
        // ------------------------------------------

        if (
            observedValue === undefined ||
            observedValue === null ||
            observedValue === "unknown"
        ) {

            continue;

        }


        // ------------------------------------------
        // MULTI-SELECT OBSERVATIONS
        // ------------------------------------------

        if (Array.isArray(observedValue)) {

            // Empty selection means no information.
            if (observedValue.length === 0) {

                continue;

            }


            // If Unknown is selected, ignore this field.
            if (
                observedValue.includes("unknown")
            ) {

                continue;

            }

        }


        // ------------------------------------------
        // GET SPECIES CHARACTER
        // ------------------------------------------

        const speciesValue =
            getSpeciesCharacter(
                speciesID,
                key
            );


        // ------------------------------------------
        // IMPORTANT:
        // If the catalogue does not yet have data for
        // this character, DO NOT eliminate the species.
        // ------------------------------------------

        if (speciesValue === undefined) {

            continue;

        }


        // ------------------------------------------
        // MULTI-SELECT MATCHING
        // ------------------------------------------

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


        // ------------------------------------------
        // SINGLE VALUE MATCHING
        // ------------------------------------------

        else {

            if (
                speciesValue !== observedValue
            ) {

                return false;

            }

        }

    }


    return true;

}


// ==================================================
// NORMALIZE SPECIES DATA
//
// This lets the identifier work with the current
// JSON structure while we continue expanding it.
// ==================================================

function getSpeciesCharacter(species, key) {


    // ------------------------------------------
    // ENVIRONMENT
    // ------------------------------------------

    if (key === "environment") {

        return species.environment;

    }


    // ------------------------------------------
    // EYES
    // ------------------------------------------

    if (key === "eyes_present") {

        if (
            species.eyes &&
            typeof species.eyes === "object"
        ) {

            return species.eyes.present;

        }

        if (
            typeof species.eyes === "boolean"
        ) {

            return species.eyes;

        }

        return undefined;

    }


    if (key === "eyes_color") {

        if (
            species.eyes &&
            typeof species.eyes === "object"
        ) {

            return species.eyes.color;

        }

        return undefined;

    }


    // ------------------------------------------
    // PLATES
    // ------------------------------------------

    if (key === "plates_present") {

        if (
            species.plates &&
            typeof species.plates === "object"
        ) {

            return species.plates.present;

        }

        if (
            typeof species.plates === "boolean"
        ) {

            return species.plates;

        }

        return undefined;

    }


    if (key === "plate_locations") {

        if (
            species.plates &&
            species.plates.locations !== undefined
        ) {

            return species.plates.locations;

        }

        return undefined;

    }


    // ------------------------------------------
    // CLAVAE
    // ------------------------------------------

    if (key === "clavae_present") {

        if (
            species.clavae &&
            typeof species.clavae === "object"
        ) {

            if (
                species.clavae.present !== undefined
            ) {

                return species.clavae.present;

            }


            const primary =
                species.clavae.primary === true;

            const secondary =
                species.clavae.secondary === true;


            return primary || secondary;

        }

        return undefined;

    }


    // ------------------------------------------
    // CLAVAE TYPES
    // ------------------------------------------

    if (key === "clavae_types") {

        if (!species.clavae) {

            return undefined;

        }

        const types = [];

        if (species.clavae.primary === true) {

            types.push("primary");

        }

        if (species.clavae.secondary === true) {

            types.push("secondary");

        }

        return types;

    }


    // ------------------------------------------
    // OTHER CIRRI (top-level Q10 — distinct from
    // the per-cirrus "cirri.<name>" keys below)
    // ------------------------------------------

    if (key === "other_cirri") {

        if (
            species.cirri &&
            species.cirri.other !== undefined
        ) {

            return normalizePresentValue(
                species.cirri.other
            );

        }

        return undefined;

    }


    if (key === "other_cirri_locations") {

        if (
            species.cirri &&
            species.cirri.other &&
            species.cirri.other.locations !== undefined
        ) {

            return species.cirri.other.locations;

        }

        return undefined;

    }


    // ------------------------------------------
    // SENSORY STRUCTURES (top-level Q11 — distinct
    // from the per-leg "legs.<leg>.sensory_structures")
    // ------------------------------------------

    if (key === "sensory_structures") {

        if (
            species.sensory_structures &&
            typeof species.sensory_structures === "object"
        ) {

            return species.sensory_structures.present;

        }

        if (
            typeof species.sensory_structures === "boolean"
        ) {

            return species.sensory_structures;

        }

        return undefined;

    }


    if (key === "sensory_locations") {

        if (
            species.sensory_structures &&
            species.sensory_structures.locations !== undefined
        ) {

            return species.sensory_structures.locations;

        }

        return undefined;

    }


    // ------------------------------------------
    // CIRRI
    // ------------------------------------------

    if (key.startsWith("cirri.")) {

        const cirrusKey =
            key.substring(6);


        if (!species.cirri) {

            return undefined;

        }


        // diakidius uses "E"
        if (
            cirrusKey === "cirrus_E"
        ) {

            if (
                species.cirri.cirrus_E !== undefined
            ) {

                return normalizePresentValue(
                    species.cirri.cirrus_E
                );

            }


            if (
                species.cirri.E !== undefined
            ) {

                return normalizePresentValue(
                    species.cirri.E
                );

            }


            return undefined;

        }


        if (
            species.cirri[cirrusKey] !== undefined
        ) {

            return normalizePresentValue(
                species.cirri[cirrusKey]
            );

        }


        return undefined;

    }


    // ------------------------------------------
    // LEGS
    // ------------------------------------------

    if (key.startsWith("legs.")) {

        const parts =
            key.split(".");

        const leg =
            parts[1];

        const character =
            parts[2];


        if (
            !species.legs ||
            !species.legs[leg]
        ) {

            return undefined;

        }


        const legData =
            species.legs[leg];


        // Current JSON uses sensory_spine and
        // anterior_papilla separately.
        if (
            character === "sensory_structures"
        ) {

            return (
                legData.sensory_structures === true ||
                legData.sensory_spine === true ||
                legData.anterior_papilla === true
            );

        }


        // Accessory points
        if (
            character === "accessory_points"
        ) {

            if (
                legData.accessory_points !== undefined
            ) {

                return legData.accessory_points;

            }

            // Older species record format.
            if (
                species.claw_accessory_points !== undefined
            ) {

                return species.claw_accessory_points;

            }

            return undefined;

        }


        if (
            legData[character] !== undefined
        ) {

            return legData[character];

        }


        return undefined;

    }


    // ------------------------------------------
    // EVERYTHING ELSE
    // ------------------------------------------

    return getNestedValue(
        species,
        key
    );

}


// ==================================================
// NORMALIZE PRESENT / ABSENT VALUES
// ==================================================

function normalizePresentValue(value) {

    if (
        typeof value === "boolean"
    ) {

        return value;

    }


    if (
        value &&
        typeof value === "object" &&
        value.present !== undefined
    ) {

        return value.present;

    }


    return value;

}
