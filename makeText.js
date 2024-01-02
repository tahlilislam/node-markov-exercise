/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require("./markov");
const axios = require("axios");

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

// Read file and generate text from it //
function makeText(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if(err) {
            console.error(`Cannot read file: ${path}: ${err}`)
            process.exit(1);
        } else {
            generateText(data);
        }
    })
}
/** read URL and make text from it. */
async function makeURLText(url) {
    let resp;
    try {
        resp = await axios.get(url);
    } catch (err) {
        console.error(`Cannot read URL: ${url}: ${err}`)
    }
    console.log(resp.data);
    generateText(resp.data);
}
console.log(process.argv)

let [method, path] = process.argv.slice(2);
if (method === "file") {
    console.log(`...generated text from ${method} ${path}...`)
    text = makeText(path)
} else if (method === 'url') {
    console.log(`...generated text from that ${method}...`)
    text = makeURLText(path)
} else {
    console.error(`ERROR!!! Unknown method ${method}. Use "file" or "url".`)
}
