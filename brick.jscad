// ignore
var lego_units = 1.6; // mm
var stud_distance = 8; // mm
var stud_height = 1.6; // mm

function calculate_studs(l, w) {
    let returnVectors = [];
    let i, j;
    for (i=0; i<l; i++) {
        for (j=0; j<w; j++) {
            returnVectors.push([i*stud_distance, j*stud_distance, 9.8]);
        }
    }
    return returnVectors;
}
