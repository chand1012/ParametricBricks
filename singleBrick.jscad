function main () {
    let outercube = cube({size: [8, 8, 9.6], center:true});
    let innercube = translate([0,0,-3.2], cube({size: [4.8, 4.8, 9.6], center:true}));
    let stud = translate([0,0,9.6/2], cylinder({r:4.8/2, h:3.2, center:true}));
    let shape = difference(outercube, innercube);
    let finalshape = union(shape, stud);
    return finalshape;
}