import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './index.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import ValidatorProfile from './components/ValidatorProfile';
import Proposals from './components/Proposals';

function App() {
  const [validators, setValidators] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [turnoutProposals, setTurnoutProposals] = useState([]);
  const [currentValidator, setCurrentValidator] = useState([]);
  const [currentProposal, setCurrentProposal] = useState([])
  const [stakedAtoms, setStakedAtoms] = useState(0);
  const [sentUpdate, setSentUpdate] = useState(false);


  const getCurrentValidator = (current) => {
    setCurrentValidator(current);
  }

  const getCurrentProposal = (current) => {
    setCurrentProposal(current);
  }

  const sendUpdate = (value) => {
    setSentUpdate(value);
  }

  useEffect(() => {
    fetch('https://api.mintscan.io/v1/utils/params/chain/cosmos')
    .then(res => {
        return res.json()
    })
    .then(data => {
        let bondedAtoms = data.params.staking_pool.pool.bonded_tokens;
        bondedAtoms = Number(bondedAtoms.substr(0, bondedAtoms.length - 6));

        setStakedAtoms(bondedAtoms);
    })

    fetch('https://api.mintscan.io/v1/cosmos/proposals', {
      method: 'get'
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        setProposals(data);
      })

    fetch('https://api.mintscan.io/v1/cosmos/validators', {
      method: 'get'
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        let validatorArray = data;

        let filtered = validatorArray.filter(validator => validatorArray.indexOf(validator) < 175)

        setValidators(filtered);
      })
      
  }, [])

  

  useEffect(() => {
    sortPropsTurnout();
  }, [proposals])


  //SORT PROPOSALS BY TURNOUT
  function sortPropsTurnout() {
    let copyProposals = proposals.slice();
    let sortedTurnout =
      copyProposals.sort((a, b) => {
        let aTotal = (Number(a.yes) + Number(a.no) + Number(a.abstain) + Number(a.no_with_veto)) / 100000;
        let aTurnout = (aTotal / 200000000) * 10;

        let bTotal = (Number(b.yes) + Number(b.no) + Number(b.abstain) + Number(b.no_with_veto)) / 100000;
        let bTurnout = (bTotal / 200000000) * 10;

        if (aTurnout > bTurnout && a.tx_hash !== null) {
          return -1;
        } else {
          return 1;
        }
      })

    setTurnoutProposals(sortedTurnout)
  }

  function promptRotate() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      alert("Please rotate your device to landscape mode for a better viewing experience.");
    }
  }

  return (
    <Router>
      <div className='bg-gradient-to-br from-violet-200 to-white min-h-screen overflow-hidden'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/validators' element={<ValidatorProfile 
          sendUpdate={sendUpdate} sentUpdate={sentUpdate} 
          validators={validators} proposals={proposals} currentValidator={currentValidator} getCurrentValidator={getCurrentValidator} getCurrentProposal={getCurrentProposal}
          currentProposal={currentProposal}/>}></Route>
          <Route path='/proposals' element={<Proposals 
          sendUpdate={sendUpdate} 
          stakedAtoms={stakedAtoms} validators={validators} proposals={proposals}  currentValidator={currentValidator} 
          currentProposal={currentProposal} getCurrentProposal={getCurrentProposal} getCurrentValidator={getCurrentValidator} turnoutProposals={turnoutProposals} />}></Route>
        </Routes>
      </div>

    </Router >
  );
}

export default App;
