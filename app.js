"use strict";

import { person, Employee, Point, CPoint } from 'hello';

let pt = new Point(1,1);
let cpt = new CPoint(pt.x, pt.y, 'Blue');

console.log("Point: " + pt);
console.log("Color Point: " + cpt);

for (let i of cpt){
    console.log(i);
}

let p = new Object(person);
p.name = 'Ed';
p.Announce();

let mgr = new Employee('Manny the manager');

let persons = process.argv.splice(2);
persons.forEach(element => {
    let p = new Employee(element, mgr);
    p.Announce();
});