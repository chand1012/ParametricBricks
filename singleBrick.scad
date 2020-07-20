$fn = 100;

union() {
    difference() {
        cube([8, 8, 9.6], center=true);
        translate([0, 0, -3.2]) {
            cube([4.8, 4.8, 9.6], center=true);
        };
    };
    translate([0, 0, 9.6/2]) {
        cylinder(h=3.2, r=2.4, center=true);
    };
}