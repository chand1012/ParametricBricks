$fn = 50;

union () {
    difference() {
        cube([8, 8, 9.6], center=true);
        translate([0, 0, -3.2]) {
         cube([4.8, 4.8, 3.2*3], center=true);
        }
    }
    translate([0,0,9.6/2]) {
       cylinder(d=4.8, h=1.6*2, center=true);
    }
}