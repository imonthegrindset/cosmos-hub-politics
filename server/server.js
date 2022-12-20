const express = require('express');
const cors = require('cors');
const app = express();

let validators;
let proposals;
let atoms;
let votes;


app.use(
    cors({
        origin: 'http://localhost:3000'
    })
)

app.use(express.static('build'));

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

async function getValidatorVotes (account) {

    let response = await fetch(`https://api.mintscan.io/v1/cosmos/account/${account}/votes`);
    votes = response.json();
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
    res.json(await atoms);
})

app.get('/votes', async (req, res) => {
    await getValidatorVotes(req.query.account)
    res.json(await votes);
})


app.listen(4000)