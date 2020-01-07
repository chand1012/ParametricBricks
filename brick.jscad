// ignore
// unit constants
const lego_units = 1.6; // mm
const stud_distance = 8; // mm
const stud_height = 1.6; // mm
const stud_radius = 2.4; // mm
const brick_height = lego_units * 6;
// accounts for corners
const tolerance = lego_units; //mm 

// functions
function calculate_studs(l, w) {
    let returnVectors = [];
    let i, j;
    for (i = 0; i < l; i++) {
        for (j = 0; j < w; j++) {
            returnVectors.push([i * stud_distance, j * stud_distance, 9.8]);
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
        size: [brick_length + tolerance, lego_units, brick_height],
        center: true
    });
    let w_wall = cube({
        size: [lego_units, brick_width + tolerance, brick_height],
        center: true
    });
    let t_wall = cube({
        size: [brick_length, brick_width, lego_units],
        center: true
    });
    let sides = []; // will be 5 translated cubes
    sides.push(l_wall);
    sides.push(translate([0, brick_width, 0], l_wall));
    sides.push(translate([brick_length/2, brick_width/2, 0], w_wall));
    sides.push(translate([-brick_length/2, brick_width/2, 0], w_wall));
    sides.push(translate([0, brick_width/2, brick_height/2 - (lego_units/2)], t_wall));
    let l_walls = union(sides[0], sides[1]);
    let w_walls = union(sides[2], sides[3]);
    let shell = union(l_walls, w_walls);
    return union(shell, sides[4]);
}

// function generate_cylinders(l, w) {
//     let returnVectors = [];
//     let i, j;
//     if (l==1) {

//     }
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
        h: 8 * lego_units,
        center: true
    }), cylinder({
        r: 2.4,
        h: 8 * lego_units,
        center: true
    }));
    let small_cylinder = cylinder({
        r: lego_units,
        h: 8 * lego_units,
        center: true
    });
    
}