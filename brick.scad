l = 2;
w = 4;

units = 1.6;
stud_distance = 8;
stud_height = units;
stud_radius = units * 1.5;
brick_height = 6 * units;
tolerance = units;

function pythagoras(c1, c2) = sqrt(pow(c1, 2) + pow(c2, 2));

module generate_walls(l, w) {
    brick_length = l * stud_distance;
    brick_width = w * stud_distance;
    union() {
        cube([brick_length, units, brick_height], center=true);
        translate([0, brick_width-units, 0]) cube([brick_length, units, brick_height], center=true);
        translate([brick_length/2 - units/2, brick_width/2 - (units/2), 0]) cube([units, brick_width, brick_height], center=true);
        translate([-brick_length/2 + units/2, brick_width/2 - (units/2), 0]) cube([units, brick_width, brick_height], center=true);
        translate([0, brick_width/2 - (units/2), brick_height/2 - (units/2)]) cube([brick_length, brick_width, units], center=true);
    };
}

module studs(l, w) {
    brick_length = l * stud_distance
    vectors = [
        
    ];
    for (stud_location = vectors) {
        translate (stud_location) cylinder(h=stud_height, r=stud_radius, center=true);
    }
}

generate_walls(l, w);
studs(l, w);