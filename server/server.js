const express = require('express');
const cors = require('cors');
const app = express();

let validators;
let proposals;
let atoms;


app.use(
    cors({
        origin: 'http://localhost:3000'
    })
)

app.use(getValidators)
app.use(getProposals)
app.use(getAtoms)


async function getValidators(req, res, next) {
    let response = await fetch('https://api.mintscan.io/v1/cosmos/validators');
    validators = response.json()

    next();
}


async function getProposals(req, res, next) {
    let response = await fetch('https://api.mintscan.io/v1/cosmos/proposals');
    proposals = response.json()

    next();
}

async function getAtoms (req, res, next) {
    let response = await fetch('https://api.mintscan.io/v1/utils/params/chain/cosmos');
    atoms = response.json();

    next();
}



app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/validators', async (req, res) => {
    res.json(await validators);
})

app.get('/proposals', async (req, res) => {
    res.json(await proposals);
})

app.get('/atoms', async (req, res) => {
    console.log(await atoms)
    res.json(await atoms);
})


app.listen(4000)