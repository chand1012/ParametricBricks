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
function pythagoras(c1, c2) {
    return Math.sqrt(Math.pow(c1, 2) + Math.pow(c2, 2));
}

function distance(vect1, vect2) {
    return Math.sqrt(Math.pow((vect2[0]-vect1[0]), 2), Math.pow((vect2[1]-vect1[1]), 2), Math.pow((vect2[2]-vect1[2]), 2))
}

function arrayMatch(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    let i;
    for (i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}

function arrayOfArraysContains(array, testarray) {
    let i;
    for (i = 0; i < array.length; i++) {
        if (arrayMatch(array[i], testarray)) {
            return true
        }
    }
    return false
}

function centerOfVectors(arrayOfVectors) {
    let x = 0;
    let y = 0;
    let z = 0;
    let i;
    let c = arrayOfVectors.length;
    for (i = 0; i < c; i++) {
        x += arrayOfVectors[i][0];
        y += arrayOfVectors[i][1];
        z += arrayOfVectors[i][2];
    }
    return [x / c, y / c, z / c];
}

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

function calculate_cylinders(l, w) {
    let stud_locations = calculate_studs(l, w).sort();
    let cylinder_locations = new Array;
    let group = new Array;
    let groups = new Array;
    let i, j;
    let ws1 = [0, 0, 0];
    let ws2 = [0, 0, 0];
    for (i = 0; i < stud_locations.length; i += 2) {
        j = i + 1;
        ws1 = [stud_locations[i][0] + 8, stud_locations[i][1], stud_locations[i][2]];
        ws2 = [stud_locations[j][0] + 8, stud_locations[j][1], stud_locations[j][2]];
        if (arrayOfArraysContains(stud_locations, ws1) && arrayOfArraysContains(stud_locations, ws2)) {
            group.push([stud_locations[i][0], stud_locations[i][1], 0]);
            group.push([stud_locations[j][0], stud_locations[j][1], 0]);
            group.push([ws1[0], ws1[1], 0]);
            group.push([ws2[0], ws2[1], 0]);    
            groups.push(group);
            group = new Array;
        }
    }
    for (i = 0; i < groups.length; i++) {
        cylinder_locations.push(centerOfVectors(groups[i]));
    }
    return cylinder_locations;
}

function generate_cylinders(l, w, big) {
    let cylinder_locations = calculate_cylinders(l, w);
    let cylinders = [];
    let i;
    for (i=0;i<cylinder_locations.length;i++) {
        cylinders.push(translate(cylinder_locations[i], big));
    }
    return union(cylinders);
}

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
    let cylinders = generate_cylinders(Math.floor(l), Math.floor(w), big_cylinder);
    return union(union(shell, cylinders), studs);
}