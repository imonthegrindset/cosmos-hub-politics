const express = require('express');
const cors = require('cors');
const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000'
    })
)


function getValidators() {

}

function getProposals() {

}

function getAtom() {

}

function getSelectedValidatorVotes() {

}


app.get('/', (req, res) => {
    res.send('hello world')
})


app.listen(4000)