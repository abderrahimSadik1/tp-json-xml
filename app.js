const fs = require("fs");
const convert = require("xml-js");
const protobuf = require("protobufjs");

// Charger le fichier .proto
const root = protobuf.loadSync("employee.proto");
const EmployeeList = root.lookupType("Employees");

const employees = [];
employees.push({ id: 1, name: "DOUAA EL FAHIMI", salary: 9000 });
employees.push({ id: 2, name: "AYA EL FAHIMI", salary: 22000 });
employees.push({ id: 3, name: "MARWA EL FAHIMI", salary: 23000 });
employees.push({ id: 4, name: "KARIM BEN ALI", salary: 15000 });
employees.push({ id: 5, name: "SAMIRA MOHAMED", salary: 12000 });
employees.push({ id: 6, name: "YASSINE BELHADJ", salary: 18000 });
employees.push({ id: 7, name: "NOUR EL HADI", salary: 20000 });
employees.push({ id: 8, name: "SALMA ABDELKADER", salary: 14000 });
employees.push({ id: 9, name: "OMAR ZAKARIA", salary: 16000 });
employees.push({ id: 10, name: "FATIMA EL KHAYAT", salary: 13000 });
employees.push({ id: 11, name: "ANASS EL MANSOURI", salary: 25000 });
employees.push({ id: 12, name: "SARA OUHADI", salary: 17000 });
employees.push({ id: 13, name: "ADIL EL BOUAZIZI", salary: 19000 });
employees.push({ id: 14, name: "IMANE AZIZ", salary: 11000 });
employees.push({ id: 15, name: "MOHAMED LAMGHARI", salary: 24000 });
employees.push({ id: 16, name: "JIHANE RAZIKI", salary: 10500 });
employees.push({ id: 17, name: "SAID BENSALEM", salary: 15000 });
employees.push({ id: 18, name: "RANIA EL OUARDI", salary: 22000 });
employees.push({ id: 19, name: "HASSAN AMRANI", salary: 21000 });
employees.push({ id: 20, name: "LAYLA BOUGRINE", salary: 20000 });

let jsonObject = { employee: employees };
let jsonData = JSON.stringify(jsonObject);
const options = { compact: true, ignoreComment: true, spaces: 0 };
let xmlData = "<root>\n" + convert.json2xml(jsonObject, options) + "\n</root>";

// Encodage en Protobuf
let errMsg = EmployeeList.verify(jsonObject);
if (errMsg) {
  throw Error(errMsg);
}
let message = EmployeeList.create(jsonObject); // Crée un message Protobuf
let buffer = EmployeeList.encode(message).finish(); // Encode en format binaire

// Écriture des fichiers
let start = Date.now();
fs.writeFileSync("data.json", jsonData);
let jsonTime = Date.now() - start;

fs.writeFileSync("data.xml", xmlData);
fs.writeFileSync("data.proto", buffer); // Écriture du fichier Protobuf

// Récupération de la taille des fichiers
const jsonFileSize = fs.statSync("data.json").size;
const xmlFileSize = fs.statSync("data.xml").size;
const protoFileSize = fs.statSync("data.proto").size;

console.log(`Taille de 'data.json' : ${jsonFileSize} octets ${jsonTime} ms`);
console.log(`Taille de 'data.xml' : ${xmlFileSize} octets`);
console.log(`Taille de 'data.proto' : ${protoFileSize} octets`);
