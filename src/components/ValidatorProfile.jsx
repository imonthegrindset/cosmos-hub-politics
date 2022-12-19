import Dropdown from "./Dropdown"
import DropdownDisplay from "./DropdownPercentage"
import PieChart from "./PieChart"
import { useState, useEffect, useRef } from "react"
import { Link } from 'react-router-dom'

export default function ValidatorProfile(props) {

    const [copied, setCopied] = useState(false);
    const [update, setUpdate] = useState(false);
    const [renderAgain, setRenderAgain] = useState(false);
    const [votingPower, setVotingPower] = useState('')
    const [votes, setVotes] = useState([])
    const [percentageDisplay, setPercentageDisplay] = useState(true)
    const [votingRate, setVotingRate] = useState('');
    const [votingRateInteger, setVotingRateInteger] = useState(0)
    const [filteredVotes, setFilteredVotes] = useState([])
    const [pastPropsValue, setPastPropsValue] = useState(45);
    const [firstRender, setFirstRender] = useState(true);
    const [voteOptionsStats, setVoteOptionsStats] = useState([{ no: [0], yes: [0], veto: [0], abstain: [0] }]);
    const [chartData, setChartData] = useState([1, 2, 3, 4])

    const pastProposals = useRef();

    // useEffect(() => {
    //     // if(props.sentUpdate) {
    //     //     setUpdate(true);
    //     // } else {
    //     //     return
    //     // }
    //     return () => {
    //         props.getCurrentValidator("")
    //         // props.sendUpdate(false)
    //     }
    // }, [])

    useEffect(() => { // if first possible solution does not work, try to put && !sentUpdate after first Render here
        if (firstRender) {
            setFirstRender(false);
            return;
        }
        fetch('https://api.mintscan.io/v1/utils/params/chain/cosmos')
            .then(res => {
                return res.json()
            })
            .then(data => {
                let bondedAtoms = data.params.staking_pool.pool.bonded_tokens;
                bondedAtoms = Number(bondedAtoms.substr(0, bondedAtoms.length - 6));
                let validatorAtoms = Number(props.currentValidator.tokens.substr(0, props.currentValidator.tokens.length - 6));
                let votingPower = ((validatorAtoms / bondedAtoms) * 100);
                setVotingPower(votingPower.toFixed(2).toString() + '%');
            })

        fetch(`https://api.mintscan.io/v1/cosmos/account/${props.currentValidator.account_address}/votes`)
            .then(res => {
                return res.json()
            }).then(data => {
                let array = [];
                array.push(data);
                setVotes(array[0].votes);
            })
    }, [update, props.sentUpdate])
    //possible solution put sentUpdate as a parameter to trigger this too

    useEffect(() => {
        if (firstRender) { setFirstRender(false); }
        if (!firstRender) { calculateVotingRate(pastProposals.current.value) }
    }, [votes])

    useEffect(() => {
        let votingRate = (filteredVotes.length / pastPropsValue) * 100;
        setVotingRate(votingRate.toFixed(2));
        calculateVotingProportions(filteredVotes);
    }, [pastPropsValue])

    useEffect(() => {
        let votingRate = (filteredVotes.length / pastPropsValue) * 100;
        setVotingRate(votingRate.toFixed(2));
        calculateVotingProportions(filteredVotes);
    }, [renderAgain])

    useEffect(() => {
        if (percentageDisplay) {
            setChartData([voteOptionsStats[0].yes[0], voteOptionsStats[0].no[0], voteOptionsStats[0].veto[0], voteOptionsStats[0].abstain[0]])
        } else {
            setChartData([voteOptionsStats[0].yes[1], voteOptionsStats[0].no[1], voteOptionsStats[0].veto[1], voteOptionsStats[0].abstain[1]])
        }
    }, [voteOptionsStats])

    useEffect(() => {
        if (percentageDisplay) {
            setChartData([voteOptionsStats[0].yes[0], voteOptionsStats[0].no[0], voteOptionsStats[0].veto[0], voteOptionsStats[0].abstain[0]])
        } else {
            setChartData([voteOptionsStats[0].yes[1], voteOptionsStats[0].no[1], voteOptionsStats[0].veto[1], voteOptionsStats[0].abstain[1]])
        }
    }, [percentageDisplay])



    const updateState = (value) => {
        setUpdate(value);
    }

    const changeDisplay = (value) => {
        setPercentageDisplay(value);
    }

    const calculateVotingRate = (value) => {
        let pastValue;
        if (value === '45 Proposals') { pastValue = 45 };
        if (value === '25 Proposals') { pastValue = 25 };
        if (value === '10 Proposals') { pastValue = 10 };
        let proposalCutOff = (Number(props.proposals[0].id) - pastValue)
        let filtered = votes.filter(vote => vote.proposal_id > proposalCutOff)

        setFilteredVotes(filtered);
        setPastPropsValue(pastValue);
        setVotingRateInteger(filtered.length);
        setRenderAgain(!renderAgain);
    }

    const calculateVotingProportions = (filtered) => {
        let abstainVotes = filtered.filter(vote => vote.votes[0].option === 'VOTE_OPTION_ABSTAIN');
        let vetoVotes = filtered.filter(vote => vote.votes[0].option === 'VOTE_OPTION_NO_WITH_VETO');
        let yesVotes = filtered.filter(vote => vote.votes[0].option === 'VOTE_OPTION_YES');
        let noVotes = filtered.filter(vote => vote.votes[0].option === 'VOTE_OPTION_NO');

        let voteOptions =
            [{
                no: [((noVotes.length / filtered.length) * 100).toFixed(2), noVotes.length],
                yes: [((yesVotes.length / filtered.length) * 100).toFixed(2), yesVotes.length],
                veto: [((vetoVotes.length / filtered.length) * 100).toFixed(2), vetoVotes.length],
                abstain: [((abstainVotes.length / filtered.length) * 100).toFixed(2), abstainVotes.length]
            }]

        setVoteOptionsStats(voteOptions);
    }


    const changeSelectValuePastProps = (value) => {
        calculateVotingRate(value);
    }


    const text = useRef();

    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(text.current.textContent);
            console.log('Content copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }



    return (
        <div className='lg:px-40 lg:py-20 flex flex-col gap-5 sm:px-10 sm:py-10 md:px-20 md:py-20'>

            <div className="flex flex-row gap-5 w-1/2 relative h-[4rem]">
                <div className="absolute"><Dropdown validators={props.validators} getCurrentValidator={props.getCurrentValidator} updateState={updateState} /></div>
                <div className="absolute left-[22rem]"><DropdownDisplay changeDisplay={changeDisplay} /></div>
            </div>

            <div className=" font-Titillium px-6 w-100 border-2 border-indigo-700 rounded-md bg-gradient-to-br from-violet-100 to-white p-3 shadow-lg">

                {props.currentValidator.length === 0 ? (

                    <h1 className="pt-2 px-1 text-3xl text-indigo-700 font-bold">NO DATA, SELECT YOUR VALIDATOR</h1>
                ) : (
                    <>
                        <div>
                            <h1 className="pt-2 px-1 text-3xl text-indigo-700 font-bold">{props.currentValidator.moniker} <span className="text-lg font-regular">Governance Profile</span></h1>
                            <div className="flex flex-row justify-start items-center gap-3">
                                <h5 ref={text} className="px-1 py-1 text-indigo-700">{props.currentValidator.account_address}</h5>
                                <span onClick={() => { copyContent(); setCopied(true) }} className="text-center cursor-pointer rounded-md px-2 text-sm border-2 border-indigo-700 bg-indigo-700 text-white hover:bg-white hover:text-indigo-700">Copy</span><span className={copied ? "block text-indigo-700 text-sm" : "hidden"}>Copied!</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-10">
                            <div className="flex flex-row w-full gap-10">
                                <div className="flex flex-col w-1/2">

                                    <div className="w-full ">
                                        <h1 className="w-full py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg mt-5  border-[1px] border-indigo-200">Voting Power</h1>
                                        <div className="w-full py-3 px-3 text-indigo-700 font-medium lg:text-2xl sm:text-lg h-1/2">This Validator has a voting power of <strong className="text-2xl">{votingPower}</strong></div>
                                    </div>

                                    <div className="w-full ">
                                        <h1 className="w-full py-3 px-3 bg-white text-indigo-700 lg:text-xl sm:text-md  rounded-lg mt-5 flex flex-row justify-between  border-[1px] border-indigo-200">Voting Activity
                                            <div className="flex flex-row gap-3">
                                                <span>past</span>
                                                <select ref={pastProposals} onChange={(e) => { changeSelectValuePastProps(e.target.value) }} className="bg-white  border-2 outline-none border-indigo-700 rounded-md text-sm font-semibold lg:px-1 sm:px-0 sm:py-0">
                                                    <option >45 Proposals</option>
                                                    <option >25 Proposals</option>
                                                    <option >10 Proposals</option>
                                                </select>
                                            </div>
                                        </h1>
                                        {percentageDisplay ? (
                                            <div className="w-full py-3 px-3 text-indigo-700 font-medium lg:text-2xl sm:text-lg">This Validator has a voting rate of <strong>{votingRate}%</strong> in the past <strong>{pastPropsValue}</strong> proposals</div>
                                        ) : (
                                            <div className="w-full py-3 px-3 text-indigo-700 font-medium lg:text-2xl sm:text-lg">This Validator has voted on <strong>{votingRateInteger}</strong> of the past <strong>{pastPropsValue}</strong> proposals</div>
                                        )}

                                        <div className="w-full py-1 flex flex-col lg:text-lg sm:text-sm ">
                                            {percentageDisplay ? (
                                                <>
                                                    <div className="flex flex-row justify-between bg-white px-3 py-1 rounded-t-md">
                                                        <span className="text-indigo-700">Yes</span><span className="text-indigo-700 font-semibold">{voteOptionsStats[0].yes[0]}% of the votes</span>
                                                    </div><div className="flex flex-row justify-between bg-violet-100 px-3 py-1">
                                                        <span className="text-indigo-700">No</span><span className="text-indigo-700 font-semibold">{voteOptionsStats[0].no[0]}% of the votes</span>
                                                    </div><div className="flex flex-row justify-between bg-white px-3 py-1">
                                                        <span className="text-indigo-700">No With Veto</span><span className="text-indigo-700 font-semibold">{voteOptionsStats[0].veto[0]}% of the votes</span>
                                                    </div><div className="flex flex-row justify-between bg-violet-100 px-3 py-1 rounded-b-md">
                                                        <span className="text-indigo-700">Abstain</span><span className="text-indigo-700 font-semibold ">{voteOptionsStats[0].abstain[0]}% of the votes</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex flex-row justify-between bg-white px-3 py-1 rounded-t-md">
                                                        <span className="text-indigo-700">Yes</span><span className="text-indigo-700 font-semibold">{voteOptionsStats[0].yes[1]} votes</span>
                                                    </div><div className="flex flex-row justify-between bg-violet-100 px-3 py-1">
                                                        <span className="text-indigo-700">No</span><span className="text-indigo-700 font-semibold">{voteOptionsStats[0].no[1]} votes</span>
                                                    </div><div className="flex flex-row justify-between bg-white px-3 py-1">
                                                        <span className="text-indigo-700">No With Veto</span><span className="text-indigo-700 font-semibold">{voteOptionsStats[0].veto[1]} votes</span>
                                                    </div><div className="flex flex-row justify-between bg-violet-100 px-3 py-1 rounded-b-md">
                                                        <span className="text-indigo-700">Abstain</span><span className="text-indigo-700 font-semibold ">{voteOptionsStats[0].abstain[1]} votes</span>
                                                    </div>
                                                </>
                                            )}

                                        </div>
                                    </div>
                                </div>

                                <div className='w-1/2 flex flex-col'>
                                    <h1 className="py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg mt-5  border-[1px] border-indigo-200 flex flex-row justify-between"> Proposal Votes
                                        <div>
                                            <span>sort by</span>
                                            <select className="bg-white  border-2 outline-none border-indigo-700 rounded-md text-sm font-semibold lg:px-1 sm:px-0 sm:py-0 ml-3">
                                                <option value="">Recent</option>
                                                <option value="">Turnout</option>
                                            </select>
                                        </div>
                                    </h1>
                                    <div className="h-full py-3 px-3 flex flex-col overflow-y-scroll max-h-80">
                                        {votes.map(vote => {
                                            return (
                                                <>
                                                    {
                                                        votes.indexOf(vote) === 0 ? (
                                                            <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 pb-3">
                                                                <span>Proposal {vote.proposal_id}</span>
                                                                {vote.votes[0].option === 'VOTE_OPTION_YES' ? (
                                                                    <div style={{ color: 'green' }}>YES</div>
                                                                ) : vote.votes[0].option === 'VOTE_OPTION_NO' ? (
                                                                    <div style={{ color: 'rgb(214, 0, 0)' }}>NO</div>
                                                                ) : vote.votes[0].option === 'VOTE_OPTION_ABSTAIN' ? (
                                                                    <div style={{ color: 'rgb(65, 65, 65)' }}>ABSTAIN</div>
                                                                ) : vote.votes[0].option === 'VOTE_OPTION_NO_WITH_VETO' ? (
                                                                    <div style={{ color: 'rgb(214, 0, 0)' }}>NO WITH VETO</div>
                                                                ) : (
                                                                    <span></span>
                                                                )}
                                                                <Link className="flex-auto flex justify-end" to='/proposals' onClick={() => {
                                                                    function sendProp() {
                                                                        props.proposals.map(prop => {
                                                                            if (prop.id == vote.proposal_id) {
                                                                                props.getCurrentProposal(prop);
                                                                            }
                                                                        })

                                                                    };
                                                                    sendProp();

                                                                }
                                                                }>
                                                                    <div className=" transition ease-out delay-50 text-color hover:text-indigo-400 " >View Proposal Details</div>
                                                                </Link>

                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-row gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                                                <span>Proposal {vote.proposal_id}</span>
                                                                {vote.votes[0].option === 'VOTE_OPTION_YES' ? (
                                                                    <div style={{ color: 'green' }}>YES</div>
                                                                ) : vote.votes[0].option === 'VOTE_OPTION_NO' ? (
                                                                    <div style={{ color: 'rgb(214, 0, 0)' }}>NO</div>
                                                                ) : vote.votes[0].option === 'VOTE_OPTION_ABSTAIN' ? (
                                                                    <div style={{ color: 'rgb(65, 65, 65)' }}>ABSTAIN</div>
                                                                ) : vote.votes[0].option === 'VOTE_OPTION_NO_WITH_VETO' ? (
                                                                    <div style={{ color: 'rgb(214, 0, 0)' }}>NO WITH VETO</div>
                                                                ) : (
                                                                    <span></span>
                                                                )}
                                                                <Link className="flex flex-auto justify-end" to="/proposals" onClick={() => {
                                                                    function sendProp() {
                                                                        props.proposals.map(prop => {
                                                                            if (prop.id == vote.proposal_id) {
                                                                                props.getCurrentProposal(prop);
                                                                            }
                                                                        })

                                                                    };
                                                                    sendProp();


                                                                }
                                                                }>
                                                                    <div className="transition ease-out delay-50 text-color hover:text-indigo-400">View Proposal Details</div>
                                                                </Link>
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div></>
                )}


                {/* ...........CHARTS............ */}

            </div>

            {props.currentValidator.length === 0 ? (
                <div></div>
            ) : (
                <>
                    <div className=" font-Titillium px-6 w-100 border-2 border-indigo-700 rounded-md bg-gradient-to-br from-violet-100 to-white p-3 shadow-lg">
                        <div>
                            <h1 className="pt-2 px-1 text-3xl text-indigo-700 font-bold">DATA</h1>
                        </div>
                        <div className="flex flex-row gap-10 w-full py-5 min">
                            <div className="w-full  flex flex-col items-center gap-5">
                                <h1 className="py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg w-full  border-[1px] border-indigo-200 flex flex-row justify-between">Voting Activity Chart ({percentageDisplay ? "Percentage" : "Numeric"})
                                    <div className="flex flex-row gap-3">
                                    </div>
                                </h1>
                                <h1 className="flex flex-row w-full text-2xl font-bold px-1 text-indigo-700">Past {pastPropsValue} proposals</h1>
                                <div className="w-full h-80 flex justify-center">

                                    <PieChart voteOptionsStats={voteOptionsStats} percentageDisplay={percentageDisplay} chartData={chartData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}


        </div>



    )
}