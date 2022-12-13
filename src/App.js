import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './index.css'
import NavBar from './components/NavBar'

function App() {
  // const [validators, setValidators] = useState([]);
  // const [proposals, setProposals] = useState([]);
  // const [turnoutProposals, setTurnoutProposals] = useState([]);
  // const [currentValidator, setCurrentValidator] = useState([]);
  // const [currentProposal, setCurrentProposal] = useState([])


  // const getCurrentValidator = (current) => {
  //   setCurrentValidator(current);
  // }

  // const getCurrentProposal = (current) => {
  //   setCurrentProposal(current);
  // }

  // useEffect(() => {
  //   fetch('https://api.mintscan.io/v1/cosmos/proposals', {
  //     method: 'get'
  //   })
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then(data => {
  //       console.log(data);
  //       setProposals(data);
  //     })

  //   fetch('https://api.mintscan.io/v1/cosmos/validators', {
  //     method: 'get'
  //   })
  //     .then(res => {
  //       return res.json()
  //     })
  //     .then(data => {
  //       let validatorArray = data;

  //       let filtered = validatorArray.filter(validator => validatorArray.indexOf(validator) < 175)
  //       console.log(filtered);

  //       setValidators(filtered);
  //     })


  // }, [])

  // useEffect(() => {
  //   sortPropsTurnout();
  // }, [proposals])

  // function sortPropsTurnout() {
  //   let copyProposals = proposals.slice();
  //   let sortedTurnout =
  //     copyProposals.sort((a, b) => {
  //       let aTotal = (Number(a.yes) + Number(a.no) + Number(a.abstain) + Number(a.no_with_veto)) / 100000;
  //       let aTurnout = (aTotal / 200000000) * 10;

  //       let bTotal = (Number(b.yes) + Number(b.no) + Number(b.abstain) + Number(b.no_with_veto)) / 100000;
  //       let bTurnout = (bTotal / 200000000) * 10;

  //       if (aTurnout > bTurnout && a.tx_hash !== null) {
  //         return -1;
  //       } else {
  //         return 1;
  //       }
  //     })

  //   setTurnoutProposals(sortedTurnout)
  // }

  return (
    <NavBar />
  );
}

export default App;
