"use strict";

import { person, Employee, Point, CPoint } from 'hello';
import { readFile } from 'fs';
import path from 'path';
import * as xml from 'xml2js';

let pt = new Point(1, 1);
let cpt = new CPoint(pt.x, pt.y, 'Blue');

console.log("Point: " + pt);
console.log("Color Point: " + cpt);

for (let i of cpt) {
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

let rootDir = process.cwd();
let filepath = path.join(rootDir, "input.xml");

function ProcessAction(action) {
    for (let stepId = 0; stepId < action.Step.length; ++stepId) {
        let step = action.Step[stepId];
        console.log(`Seq: ${step.$.seq} Step: ${step._}`);
        if (step.Action !== null && step.Action !== undefined) {
            ProcessActions(step.Action);
        }
    }
}

function ProcessActions(actions) {
    for (let actId = 0; actId < actions.length; ++actId) {
        let action = actions[actId];
        ProcessAction(action);
    }
}

function ProcessXml(err, result) {
    console.log(JSON.stringify(result));
    for (let actId = 0; actId < result.Operation.Action.length; ++actId) {
        let action = result.Operation.Action[actId];
        ProcessAction(action);
    }
}

readFile(filepath, (err, data) => {
    let sXml = data.toString();
    let parser = new xml.Parser();
    parser.parseString(sXml, ProcessXml)
});
