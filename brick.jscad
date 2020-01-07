// ignore

//parameters
const l = 2;
const w = 4;

// unit constants
const units = 1.6; // mm
const stud_distance = 8; // mm
const stud_height = units; // mm
const stud_radius = 1.5 * units; // mm
const brick_height = 6 * units;
// accounts for corners
const tolerance = units; //mm 

// functions
function calculate_studs(l, w) {
    let brick_length = l * stud_distance;
    let returnVectors = [];
    let i, j;
    for (i = 0; i < l; i++) {
        for (j = 0; j < w; j++) {
            returnVectors.push([(i * stud_distance) - (brick_length/2) + (2.5*units), (j * stud_distance) + (2*units), units*3.5]);
        }
    }
    return returnVectors;
}

function generate_studs(l, w, stud) {
    let returnVectors = calculate_studs(l, w);
    let i;
    let returnObjects = [];
    for (i = 0; i < returnVectors.length; i++) {
        returnObjects.push(translate(returnVectors[i], stud))
    }
    return returnObjects;
}

function generate_walls(l, w) {
    let brick_length = l * stud_distance;
    let brick_width = w * stud_distance;
    let l_wall = cube({
        size: [brick_length, units, brick_height],
        center: true
    });
    let w_wall = cube({
        size: [units, brick_width, brick_height],
        center: true
    });
    let t_wall = cube({
        size: [brick_length, brick_width, units],
        center: true
    });
    let sides = []; // will be 5 translated cubes
    sides.push(l_wall);
    sides.push(translate([0, brick_width-units, 0], l_wall));
    sides.push(translate([brick_length/2 - units/2, brick_width/2 - (units/2), 0], w_wall));
    sides.push(translate([-brick_length/2 + units/2, brick_width/2 - (units/2), 0], w_wall));
    sides.push(translate([0, brick_width/2 - (units/2), brick_height/2 - (units/2)], t_wall));
    return union(sides);
}

// function calculate_cylinders(l, w) {
//     let stud_positions = calculate_studs(l, w);

// }

// function generate_cylinders(l, w, big, small) {
    
// }

// main function

function main() {
    // reused objects
    let stud = cylinder({
        r: stud_radius,
        h: stud_height,
        center: true
    });
    let big_cylinder = difference(cylinder({
        r: 3.2,
        h: 8 * units,
        center: true
    }), cylinder({
        r: 2.4,
        h: 8 * units,
        center: true
    }));
    let small_cylinder = cylinder({
        r: units,
        h: 8 * units,
        center: true
    });
    let shell = generate_walls(Math.floor(l), Math.floor(w));
    let studs = generate_studs(Math.floor(l), Math.floor(w), stud);
    return union(shell, studs);
}