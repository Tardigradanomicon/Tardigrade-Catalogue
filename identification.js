let speciesData = {};
let observations = {};


// ===============================
// LOAD SPECIES DATA
// ===============================

fetch("data/species.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not load species.json");
        }

        return response.json();
    })
    .then(data => {

        speciesData = data;

        observations = {};

        showEnvironmentQuestion();

    })
    .catch(error => {

        console.error("Could not load species data:", error);

        document.getElementById("questions").innerHTML = `
            <div class="identifier-result">
                <h2>Unable to load identification data</h2>
                <p>
                    There was a problem loading the species database.
                </p>
            </div>
        `;

    });


// ===============================
// QUESTION RENDERING
// ===============================

function renderQuestion(title, options) {

    const questions = document.getElementById("questions");

    questions.innerHTML = `

        <div class="identifier-question">

            <h2>
                ${title}
            </h2>

            <div class="identifier-options">

                ${options.map(option => `

                    <button onclick="${option.action}">
                        ${option.label}
                    </button>

                `).join("")}

            </div>

        </div>

    `;
}


// ===============================
// ENVIRONMENT
// ===============================

function showEnvironmentQuestion() {

    renderQuestion(

        "What environment was the specimen collected from?",

        [
            {
                label: "Marine",
                action: "answerEnvironment('marine')"
            },
            {
                label: "Freshwater",
                action: "answerEnvironment('freshwater')"
            },
            {
                label: "Terrestrial",
                action: "answerEnvironment('terrestrial')"
            },
            {
                label: "Unknown",
                action: "answerEnvironment('unknown')"
            }
        ]

    );

}


function answerEnvironment(value) {

    observations.environment = value;

    if (value === "terrestrial") {

        showTerrestrialAssociationQuestion();

    } else if (
        value === "marine" ||
        value === "freshwater"
    ) {

        showAquaticAssociationQuestion();

    } else {

        showEyesQuestion();

    }

}


// ===============================
// ECOLOGICAL ASSOCIATION
// ===============================

function showTerrestrialAssociationQuestion() {

    renderQuestion(

        "What was the specimen associated with?",

        [
            {
                label: "Moss",
                action: "answerEcologicalAssociation('moss')"
            },
            {
                label: "Lichen",
                action: "answerEcologicalAssociation('lichen')"
            },
            {
                label: "Leaf litter",
                action: "answerEcologicalAssociation('leaf_litter')"
            },
            {
                label: "Soil",
                action: "answerEcologicalAssociation('soil')"
            },
            {
                label: "Vegetation",
                action: "answerEcologicalAssociation('vegetation')"
            },
            {
                label: "Other",
                action: "answerEcologicalAssociation('other')"
            },
            {
                label: "Unknown",
                action: "answerEcologicalAssociation('unknown')"
            }
        ]

    );

}


function showAquaticAssociationQuestion() {

    renderQuestion(

        "What was the specimen associated with?",

        [
            {
                label: "Algae",
                action: "answerEcologicalAssociation('algae')"
            },
            {
                label: "Sediment",
                action: "answerEcologicalAssociation('sediment')"
            },
            {
                label: "Seagrass / aquatic vegetation",
                action: "answerEcologicalAssociation('aquatic_vegetation')"
            },
            {
                label: "Coral / reef substrate",
                action: "answerEcologicalAssociation('coral_reef')"
            },
            {
                label: "Rock",
                action: "answerEcologicalAssociation('rock')"
            },
            {
                label: "Other",
                action: "answerEcologicalAssociation('other')"
            },
            {
                label: "Unknown",
                action: "answerEcologicalAssociation('unknown')"
            }
        ]

    );

}


function answerEcologicalAssociation(value) {

    observations.ecological_association = value;

    showEyesQuestion();

}


// ===============================
// EYES
// ===============================

function showEyesQuestion() {

    renderQuestion(

        "Are eyes present?",

        [
            {
                label: "Present",
                action: "answerEyes('present')"
            },
            {
                label: "Absent",
                action: "answerEyes('absent')"
            },
            {
                label: "Unknown",
                action: "answerEyes('unknown')"
            }
        ]

    );

}


function answerEyes(value) {

    observations.eyes = {
        present: value
    };

    if (value === "present") {

        showEyeColorQuestion();

    } else {

        showPlatesQuestion();

    }

}


function showEyeColorQuestion() {

    renderQuestion(

        "What color are the eyes?",

        [
            {
                label: "Black",
                action: "answerEyeColor('black')"
            },
            {
                label: "Brown",
                action: "answerEyeColor('brown')"
            },
            {
                label: "Red",
                action: "answerEyeColor('red')"
            },
            {
                label: "Orange",
                action: "answerEyeColor('orange')"
            },
            {
                label: "Other",
                action: "answerEyeColor('other')"
            },
            {
                label: "Unknown",
                action: "answerEyeColor('unknown')"
            }
        ]

    );

}


function answerEyeColor(value) {

    observations.eyes.color = value;

    showPlatesQuestion();

}


// ===============================
// PLATES
// ===============================

function showPlatesQuestion() {

    renderQuestion(

        "Are cuticular plates present?",

        [
            {
                label: "Present",
                action: "answerPlates('present')"
            },
            {
                label: "Absent",
                action: "answerPlates('absent')"
            },
            {
                label: "Unknown",
                action: "answerPlates('unknown')"
            }
        ]

    );

}


function answerPlates(value) {

    observations.plates = {
        present: value
    };

    if (value === "present") {

        showPlateLocationQuestion();

    } else {

        showClavaeQuestion();

    }

}


function showPlateLocationQuestion() {

    renderQuestion(

        "Where are cuticular plates present?",

        [
            {
                label: "Dorsal",
                action: "answerPlateLocation('dorsal')"
            },
            {
                label: "Ventral",
                action: "answerPlateLocation('ventral')"
            },
            {
                label: "Scapular",
                action: "answerPlateLocation('scapular')"
            },
            {
                label: "Median",
                action: "answerPlateLocation('median')"
            },
            {
                label: "Paired",
                action: "answerPlateLocation('paired')"
            },
            {
                label: "Pseudosegmental",
                action: "answerPlateLocation('pseudosegmental')"
            },
            {
                label: "Caudal / terminal",
                action: "answerPlateLocation('caudal_terminal')"
            },
            {
                label: "Lateral",
                action: "answerPlateLocation('lateral')"
            },
            {
                label: "Other",
                action: "answerPlateLocation('other')"
            },
            {
                label: "Unknown",
                action: "answerPlateLocation('unknown')"
            }
        ]

    );

}


function answerPlateLocation(value) {

    observations.plates.locations = [value];

    showClavaeQuestion();

}


// ===============================
// CLAVAE
// ===============================

function showClavaeQuestion() {

    renderQuestion(

        "Are clavae present?",

        [
            {
                label: "Present",
                action: "answerClavae('present')"
            },
            {
                label: "Absent",
                action: "answerClavae('absent')"
            },
            {
                label: "Unknown",
                action: "answerClavae('unknown')"
            }
        ]

    );

}


function answerClavae(value) {

    observations.clavae = {
        present: value
    };

    if (value === "present") {

        showClavaeTypeQuestion();

    } else {

        showCirrusQuestion("median_cephalic");

    }

}


function showClavaeTypeQuestion() {

    renderQuestion(

        "Which types of clavae are present?",

        [
            {
                label: "Primary clavae",
                action: "answerClavaeType('primary')"
            },
            {
                label: "Secondary clavae",
                action: "answerClavaeType('secondary')"
            },
            {
                label: "Both primary and secondary",
                action: "answerClavaeType('both')"
            },
            {
                label: "Other",
                action: "answerClavaeType('other')"
            },
            {
                label: "Unknown",
                action: "answerClavaeType('unknown')"
            }
        ]

    );

}


function answerClavaeType(value) {

    observations.clavae.type = value;

    showCirrusQuestion("median_cephalic");

}


// ===============================
// CIRRI
// ===============================

const cirrusQuestions = {

    median_cephalic: "Is a median cephalic cirrus present?",

    internal_cephalic: "Are internal cephalic cirri present?",

    external_cephalic: "Are external cephalic cirri present?",

    lateral: "Are lateral cirri present?",

    E: "Is cirrus E present?"

};


function showCirrusQuestion(type) {

    renderQuestion(

        cirrusQuestions[type],

        [
            {
                label: "Present",
                action: `answerCirrus('${type}', 'present')`
            },
            {
                label: "Absent",
                action: `answerCirrus('${type}', 'absent')`
            },
            {
                label: "Unknown",
                action: `answerCirrus('${type}', 'unknown')`
            }
        ]

    );

}


function answerCirrus(type, value) {

    if (!observations.cirri) {

        observations.cirri = {};

    }

    observations.cirri[type] = {
        present: value
    };


    const order = [
        "median_cephalic",
        "internal_cephalic",
        "external_cephalic",
        "lateral",
        "E"
    ];

    const index = order.indexOf(type);

    if (index < order.length - 1) {

        showCirrusQuestion(order[index + 1]);

    } else {

        showOtherCirriQuestion();

    }

}


function showOtherCirriQuestion() {

    renderQuestion(

        "Are other identifiable cirri present?",

        [
            {
                label: "Present",
                action: "answerOtherCirri('present')"
            },
            {
                label: "Absent",
                action: "answerOtherCirri('absent')"
            },
            {
                label: "Unknown",
                action: "answerOtherCirri('unknown')"
            }
        ]

    );

}


function answerOtherCirri(value) {

    observations.cirri.other = {
        present: value,
        locations: []
    };

    if (value === "present") {

        showOtherCirriLocationQuestion();

    } else {

        showSensoryStructuresQuestion();

    }

}


function showOtherCirriLocationQuestion() {

    renderQuestion(

        "Where are the other cirri located?",

        [
            {
                label: "Head",
                action: "answerOtherCirriLocation('head')"
            },
            {
                label: "Lateral",
                action: "answerOtherCirriLocation('lateral')"
            },
            {
                label: "Dorsal",
                action: "answerOtherCirriLocation('dorsal')"
            },
            {
                label: "Near leg I",
                action: "answerOtherCirriLocation('near_leg_I')"
            },
            {
                label: "Near leg II",
                action: "answerOtherCirriLocation('near_leg_II')"
            },
            {
                label: "Near leg III",
                action: "answerOtherCirriLocation('near_leg_III')"
            },
            {
                label: "Near leg IV",
                action: "answerOtherCirriLocation('near_leg_IV')"
            },
            {
                label: "Other",
                action: "answerOtherCirriLocation('other')"
            },
            {
                label: "Unknown",
                action: "answerOtherCirriLocation('unknown')"
            }
        ]

    );

}


function answerOtherCirriLocation(value) {

    observations.cirri.other.locations = [value];

    showSensoryStructuresQuestion();

}


// ===============================
// SENSORY SPINES / PAPILLAE
// ===============================

function showSensoryStructuresQuestion() {

    renderQuestion(

        "Are sensory spines or papillae present?",

        [
            {
                label: "Present",
                action: "answerSensoryStructures('present')"
            },
            {
                label: "Absent",
                action: "answerSensoryStructures('absent')"
            },
            {
                label: "Unknown",
                action: "answerSensoryStructures('unknown')"
            }
        ]

    );

}


function answerSensoryStructures(value) {

    observations.sensory_spines_papillae = {
        present: value,
        locations: []
    };

    if (value === "present") {

        showSensoryLocationQuestion();

    } else {

        showLegQuestion("I");

    }

}


function showSensoryLocationQuestion() {

    renderQuestion(

        "Where are sensory spines/papillae present?",

        [
            {
                label: "Head",
                action: "answerSensoryLocation('head')"
            },
            {
                label: "Leg I",
                action: "answerSensoryLocation('leg_I')"
            },
            {
                label: "Leg II",
                action: "answerSensoryLocation('leg_II')"
            },
            {
                label: "Leg III",
                action: "answerSensoryLocation('leg_III')"
            },
            {
                label: "Leg IV",
                action: "answerSensoryLocation('leg_IV')"
            },
            {
                label: "Dorsal",
                action: "answerSensoryLocation('dorsal')"
            },
            {
                label: "Lateral",
                action: "answerSensoryLocation('lateral')"
            },
            {
                label: "Other",
                action: "answerSensoryLocation('other')"
            },
            {
                label: "Unknown",
                action: "answerSensoryLocation('unknown')"
            }
        ]

    );

}


function answerSensoryLocation(value) {

    observations.sensory_spines_papillae.locations = [value];

    showLegQuestion("I");

}


// ===============================
// LEGS
// ===============================

const legOrder = ["I", "II", "III", "IV"];


function showLegQuestion(leg) {

    renderQuestion(

        `How many claws are present on each leg of Leg pair ${leg}?`,

        [
            {
                label: "2 claws",
                action: `answerLegClaws('${leg}', 2)`
            },
            {
                label: "3 claws",
                action: `answerLegClaws('${leg}', 3)`
            },
            {
                label: "4 claws",
                action: `answerLegClaws('${leg}', 4)`
            },
            {
                label: "Different between left and right",
                action: `answerLegClaws('${leg}', 'different')`
            },
            {
                label: "Other",
                action: `answerLegClaws('${leg}', 'other')`
            },
            {
                label: "Unknown",
                action: `answerLegClaws('${leg}', 'unknown')`
            }
        ]

    );

}


function answerLegClaws(leg, value) {

    if (!observations.legs) {

        observations.legs = {};

    }

    if (!observations.legs[leg]) {

        observations.legs[leg] = {};

    }

    observations.legs[leg].claws = value;

    showLegArrangementQuestion(leg);

}


function showLegArrangementQuestion(leg) {

    renderQuestion(

        `How are the claws of Leg pair ${leg} arranged in size?`,

        [
            {
                label: "Approximately equal",
                action: `answerLegArrangement('${leg}', 'approximately_equal')`
            },
            {
                label: "Progressively longer from inner → outer",
                action: `answerLegArrangement('${leg}', 'progressively_longer_inner_to_outer')`
            },
            {
                label: "Progressively shorter from inner → outer",
                action: `answerLegArrangement('${leg}', 'progressively_shorter_inner_to_outer')`
            },
            {
                label: "Inner claws larger",
                action: `answerLegArrangement('${leg}', 'inner_larger')`
            },
            {
                label: "Outer claws larger",
                action: `answerLegArrangement('${leg}', 'outer_larger')`
            },
            {
                label: "Other",
                action: `answerLegArrangement('${leg}', 'other')`
            },
            {
                label: "Unknown",
                action: `answerLegArrangement('${leg}', 'unknown')`
            }
        ]

    );

}


function answerLegArrangement(leg, value) {

    observations.legs[leg].claw_arrangement = value;

    showLegAccessoryPointQuestion(leg);

}


function showLegAccessoryPointQuestion(leg) {

    renderQuestion(

        `Are claw accessory points present on Leg pair ${leg}?`,

        [
            {
                label: "Present",
                action: `answerLegAccessoryPoints('${leg}', true)`
            },
            {
                label: "Absent",
                action: `answerLegAccessoryPoints('${leg}', false)`
            },
            {
                label: "Unknown",
                action: `answerLegAccessoryPoints('${leg}', 'unknown')`
            }
        ]

    );

}


function answerLegAccessoryPoints(leg, value) {

    observations.legs[leg].claw_accessory_points = value;

    if (value === true) {

        showAccessoryPointLocationQuestion(leg);

    } else {

        showBasalSpurArrangementQuestion(leg);

    }

}


function showAccessoryPointLocationQuestion(leg) {

    renderQuestion(

        `Which claws possess accessory points on Leg pair ${leg}?`,

        [
            {
                label: "Primary claws",
                action: `answerAccessoryPointLocation('${leg}', 'primary_claws')`
            },
            {
                label: "Secondary claws",
                action: `answerAccessoryPointLocation('${leg}', 'secondary_claws')`
            },
            {
                label: "Inner claws",
                action: `answerAccessoryPointLocation('${leg}', 'inner_claws')`
            },
            {
                label: "Outer claws",
                action: `answerAccessoryPointLocation('${leg}', 'outer_claws')`
            },
            {
                label: "Basal spurs",
                action: `answerAccessoryPointLocation('${leg}', 'basal_spurs')`
            },
            {
                label: "Other",
                action: `answerAccessoryPointLocation('${leg}', 'other')`
            },
            {
                label: "Unknown",
                action: `answerAccessoryPointLocation('${leg}', 'unknown')`
            }
        ]

    );

}


function answerAccessoryPointLocation(leg, value) {

    observations.legs[leg].accessory_point_locations = [value];

    showBasalSpurArrangementQuestion(leg);

}


// ===============================
// BASAL SPURS
// ===============================

function showBasalSpurArrangementQuestion(leg) {

    renderQuestion(

        `How are the basal spurs of Leg pair ${leg} arranged?`,

        [
            {
                label: "Widely divergent",
                action: `answerBasalSpurArrangement('${leg}', 'widely_divergent')`
            },
            {
                label: "Slightly divergent",
                action: `answerBasalSpurArrangement('${leg}', 'slightly_divergent')`
            },
            {
                label: "Closely parallel",
                action: `answerBasalSpurArrangement('${leg}', 'closely_parallel')`
            },
            {
                label: "Parallel",
                action: `answerBasalSpurArrangement('${leg}', 'parallel')`
            },
            {
                label: "Other",
                action: `answerBasalSpurArrangement('${leg}', 'other')`
            },
            {
                label: "Unknown",
                action: `answerBasalSpurArrangement('${leg}', 'unknown')`
            }
        ]

    );

}


function answerBasalSpurArrangement(leg, value) {

    observations.legs[leg].basal_spur_arrangement = value;

    showBasalSpurOrientationQuestion(leg);

}


function showBasalSpurOrientationQuestion(leg) {

    renderQuestion(

        `In what direction are the basal spurs of Leg pair ${leg} oriented?`,

        [
            {
                label: "Horizontal",
                action: `answerBasalSpurOrientation('${leg}', 'horizontal')`
            },
            {
                label: "Upward",
                action: `answerBasalSpurOrientation('${leg}', 'upward')`
            },
            {
                label: "Downward",
                action: `answerBasalSpurOrientation('${leg}', 'downward')`
            },
            {
                label: "Toward the claw",
                action: `answerBasalSpurOrientation('${leg}', 'toward_claw')`
            },
            {
                label: "Away from the claw",
                action: `answerBasalSpurOrientation('${leg}', 'away_from_claw')`
            },
            {
                label: "Other",
                action: `answerBasalSpurOrientation('${leg}', 'other')`
            },
            {
                label: "Unknown",
                action: `answerBasalSpurOrientation('${leg}', 'unknown')`
            }
        ]

    );

}


function answerBasalSpurOrientation(leg, value) {

    observations.legs[leg].basal_spur_orientation = value;

    const index = legOrder.indexOf(leg);

    if (index < legOrder.length - 1) {

        showLegQuestion(legOrder[index + 1]);

    } else {

        showResult();

    }

}


// ===============================
// RESULTS
// ===============================

function showResult() {

    const results = document.getElementById("results");

    let matches = [];

    for (const id in speciesData) {

        const species = speciesData[id];

        if (!species.identification) {
            continue;
        }

        if (
            species.identification.environment
            &&
            species.identification.environment !== observations.environment
        ) {
            continue;
        }

        matches.push(species);

    }


    if (matches.length === 0) {

        results.innerHTML = `

            <div class="identifier-result">

                <h2>No matches found</h2>

                <p>
                    No species currently match all
                    available observations.
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
                        <a href="${species.page}">
                            <i>${species.scientific_name}</i>
                        </a>
                    </strong>
                </p>

            `).join("")}

        </div>

    `;

}
