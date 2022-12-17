import { useState, useEffect, useRef } from 'react'
import PieChart from './PieChart';
import DropdownProps from './DropdownProps'

export default function Proposals(props) {

    const [copied, setCopied] = useState(false);
    const [update, setUpdate] = useState(false);
    const [turnoutRank, setTurnoutRank] = useState(0);
    const [votesArray, setVotesArray] = useState(['']);
    const [totalAtomsForVote, setTotalAtomsForVote] = useState(0)
    const [stakedAtoms, setStakedAtoms] = useState(0)
    const [participationRate, setParticipationRate] = useState('');
    const [firstRender, setFirstRender] = useState(true);
    const [delegatorsVotingPercentage, setDelegatorsVotingPercentage] = useState([]);



    useEffect(() => {

        setStakedAtoms(props.stakedAtoms);


        fetch('https://api.mintscan.io/v1/cosmos/proposals/82/votes', {
            method: 'get'
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);

            })
    }, [])

    useEffect(() => {
        if(firstRender && props.currentProposal.length === 0) {
            console.log('henlo')
            setFirstRender(false);
            return;
        }
        console.log('rendered')
        let proposalId = props.currentProposal.id;
        getTurnoutRank(proposalId);
        getVoteResults(props.currentProposal);
    }, [update])

    useEffect(() => {
        getParticipationRate();
    }, [votesArray])


    const updateState = (value) => {
        setUpdate(value);
    }

    //written by ChatGPT ;)
    function toReadableDate(dateString) {
        if (dateString === undefined || dateString === null) {
            return
        }
        // Parse the input string to extract the year, month, and day
        const year = dateString.substring(0, 4);
        const month = dateString.substring(5, 7);
        const day = dateString.substring(8, 10);

        // Use the parsed values to construct a human-readable date string
        return `${month}/${day}/${year}`;
    }

    //written by ChatGPT ;)
    function removeLineBreaks(text) {
        if (text === undefined || text === null) {
            return
        }
        return text.replace(/\n/g, "");
    }


    function getTurnoutRank(id) {


        id = props.currentProposal.id;

        props.turnoutProposals.map(proposal => {
            if (proposal.id === id) {
                let rank = props.turnoutProposals.indexOf(proposal) + 1;
                setTurnoutRank(rank);
            }
        })
    }

    function getVoteResults(obj) {
        if (obj.length === 0) {
            return;
        } else {
            
            let yes = Number(obj.yes.substr(0, obj.yes.length - 6))
            let no = Number(obj.no.substr(0, obj.no.length - 6))
            let veto = Number(obj.no_with_veto.substr(0, obj.no_with_veto.length - 6))
            let abs = Number(obj.abstain.substr(0, obj.abstain.length - 6))
            let total = (yes + no + veto + abs)
            
            setTotalAtomsForVote(total);
            let array = [yes.toLocaleString('en-US'), no.toLocaleString('en-US'), veto.toLocaleString('en-US'), abs.toLocaleString('en-US'), total.toLocaleString('en-US')];
            setVotesArray(array);

            
        }

    }

    function getParticipationRate() {
        console.log(totalAtomsForVote, stakedAtoms)
        let pRate = (totalAtomsForVote / stakedAtoms) * 100;

        let participation = pRate.toFixed(2);

        setParticipationRate(participation);
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
                <div className="absolute"><DropdownProps proposals={props.proposals} getCurrentProposal={props.getCurrentProposal} updateState={updateState} /></div>
            </div>

            <div className=" font-Titillium px-6 w-100 border-2 border-indigo-700 rounded-md bg-gradient-to-br from-violet-100 to-white p-3 shadow-lg">
                <div>
                    <div className='flex flex-row justify-between '>
                        <div>
                            <h1 className="pt-2 px-1 lg:text-3xl sm:text-2xl text-indigo-700 font-bold ">PROPOSAL {props.currentProposal.id} </h1>
                            <div className="flex flex-row justify-start items-center">
                                <div className='flex lg:flex-row md:flex-row sm:flex-col sm:gap-1 lg:items-center md:items-center sm:justify-center'>
                                    <h5 ref={text} className="pl-1 py-1 text-indigo-700 sm:text-sm">{props.currentProposal.tx_hash}</h5>
                                    <div className='flex flex-row w-full items-center'>
                                        <span onClick={() => { copyContent(); setCopied(true) }} className="lg:mx-3 md:mx-3 sm:mx-0 sm:mr-3 text-center cursor-pointer rounded-md px-2 text-sm border-2 border-indigo-700 bg-indigo-700 text-white hover:bg-white hover:text-indigo-700">Copy</span><div className={copied ? "block text-indigo-700 text-sm mr-3" : "hidden"}>Copied!</div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className='sm:text-sm'>

                            <h1 className={props.currentProposal.proposal_status === 'PROPOSAL_STATUS_REJECTED' ? (
                                "rounded-md py-1 px-1 lg:text-3xl sm:text-2xl text-white bg-rose-400 font-bold flex items-center justify-center"
                            ) : props.currentProposal.proposal_status === 'PROPOSAL_STATUS_PASSED' ? (
                                "rounded-md py-1 px-1 lg:text-3xl sm:text-2xl text-white bg-green-300 font-bold flex items-center justify-center"
                            ) : props.currentProposal.proposal_status === 'PROPOSAL_STATUS_VOTING_PERIOD' ? (
                                "rounded-md py-1 px-1 lg:text-3xl sm:text-2xl text-white bg-gray-400 font-bold flex items-center justify-center"
                            ) : (
                                'WHAT'
                            )}>
                                {props.currentProposal.proposal_status === 'PROPOSAL_STATUS_REJECTED' ? (
                                    "REJECTED"
                                ) : props.currentProposal.proposal_status === 'PROPOSAL_STATUS_PASSED' ? (
                                    "PASSED"
                                ) : props.currentProposal.proposal_status === 'PROPOSAL_STATUS_VOTING_PERIOD' ? (
                                    "VOTING PERIOD"
                                ) : (
                                    '1) WHAT'
                                )}
                            </h1>
                            <div className='py-2 text-indigo-700 lg flex flex-row gap-2'><strong>VOTING PERIOD</strong> <span>|</span> <span >{toReadableDate(props.currentProposal.voting_start_time)}</span> to <span>{toReadableDate(props.currentProposal.voting_end_time)}</span></div>
                        </div>
                    </div>
                </div>
                <div data-id='prop-description' className='flex flex-col gap-3 mb-5'>
                    <div className='w-full flex flex-row items-center justify-between pt-3 px-1'>
                        <h1 className="lg:text-3xl text-indigo-700 font-bold sm:text-2xl">DESCRIPTION</h1>

                    </div>

                    <div className='w-100 h-80 bg-white rounded-lg overflow-y-auto flex flex-col gap-3'>
                        <h2 className='text-3xl flex flex-row justify-between py-5 px-5 text-indigo-700 font-semibold w-full bg-violet-100'>{props.currentProposal.title}<div className='text-indigo-700 text-lg font-regular'>proposed by <span className='text-2xl ml-1 font-semibold'>{props.currentProposal.moniker ? props.currentProposal.moniker : props.currentProposal.proposer}</span></div></h2>
                        <p className='w-full  h-100 py-5 px-5 text-indigo-700 overflow-y-auto sm:leading-8 lg:leading-8 sm:text-sm lg:text-md  md:text-md md:leading-8'> {removeLineBreaks(props.currentProposal.description)}</p>
                    </div>
                </div>
            </div>

            <div className=" font-Titillium px-6 w-100 border-2 border-indigo-700 rounded-md bg-gradient-to-br from-violet-100 to-white p-3 shadow-lg">

                <h1 className="pt-2 px-1 lg:text-3xl sm:text-2xl text-indigo-700 font-bold ">DATA </h1>
                <div className='w-full mt-3'>

                    <div className='w-full flex flex-row gap-5'>
                        <div className='w-1/2'>
                            <div className='w-full flex flex-col'>
                                <h1 className="py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg mt-5 flex flex-row gap-3 justify-between  border-[1px] border-indigo-200"> Validator Votes
                                    <span className='text-sm '> select Vote
                                        <select name="" id="" className='bg-white  ml-3 border-2 outline-none border-indigo-700 rounded-md text-sm font-semibold lg:px-1 sm:px-0 sm:py-0'>
                                            <option value="">All</option>
                                            <option value="">Yes</option>
                                            <option value="">No</option>
                                            <option value="">NWV</option>
                                            <option value="">Abstain</option>
                                        </select>
                                    </span></h1>
                                <div className="h-full py-3 px-3 flex flex-col overflow-y-scroll max-h-80">
                                    <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 pb-3">
                                        <span>Validator</span><span>Vote</span><div className="flex-auto flex justify-end">View Validator Profile</div>
                                    </div>
                                    <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                        <span>Validator</span><span>Vote</span><div className="flex-auto flex justify-end">View Validator Profile</div>
                                    </div>
                                    <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                        <span>Validator</span><span>Vote</span><div className="flex-auto flex justify-end">View Validator Profile</div>
                                    </div>
                                    <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                        <span>Validator</span><span>Vote</span><div className="flex-auto flex justify-end">View Validator Profile</div>
                                    </div>
                                    <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                        <span>Validator</span><span>Vote</span><div className="flex-auto flex justify-end">View Validator Profile</div>
                                    </div>
                                    <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                        <span>Validator</span><span>Vote</span><div className="flex-auto flex justify-end">View Validator Profile</div>
                                    </div>
                                    <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                        <span>Validator</span><span>Vote</span><div className="flex-auto flex justify-end">View Validator Profile</div>
                                    </div>
                                    <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                        <span>Validator</span><span>Vote</span><div className="flex-auto flex justify-end">View Validator Profile</div>
                                    </div>
                                    <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                        <span>Validator</span><span>Vote</span><div className="flex-auto flex justify-end">View Validator Profile</div>
                                    </div>
                                    <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                        <span>Validator</span><span>Vote</span><div className="flex-auto flex justify-end">View Validator Profile</div>
                                    </div>


                                </div>
                            </div>
                        </div>

                        <div className='w-1/2'>
                            <h1 className="w-full py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg mt-5 border-[1px] border-indigo-200">Turnout Rank</h1>
                            <div className="w-full py-3 px-3 text-indigo-700 font-medium lg:text-2xl sm:text-lg">Proposal {props.currentProposal.id} is <strong>#{turnoutRank}</strong> ranked by voter turnout</div>
                            <div className="w-full py-1 flex flex-col lg:text-lg sm:text-sm ">
                                <div className="flex flex-row justify-between bg-white px-3 py-1 rounded-t-md">
                                    <span className='text-green-500'>Yes</span> <span className="text-indigo-700 font-semibold text-md">{votesArray[0]} ATOM</span>
                                </div>
                                <div className="flex flex-row justify-between bg-violet-100 px-3 py-1">
                                    <span className='text-rose-500'>No</span><span className="text-indigo-700 font-semibold text-md">{votesArray[1]} ATOM</span>
                                </div>
                                <div className="flex flex-row justify-between bg-white px-3 py-1">
                                    <span className='text-rose-700'>No With Veto</span><span className="text-indigo-700 font-semibold text-md">{votesArray[2]} ATOM</span>
                                </div>
                                <div className="flex flex-row justify-between bg-violet-100 px-3 py-1 ">
                                    <span className='text-gray-500'>Abstain</span><span className="text-indigo-700 font-semibold text-md">{votesArray[3]} ATOM</span>
                                </div>
                                <div className="flex flex-row justify-between bg-white px-3 py-1 rounded-b-md">
                                    <span className='font-semibold text-indigo-700'>TOTAL</span><span className="text-indigo-700 font-semibold text-md">{votesArray[4]} ATOM</span>
                                </div>
                            </div>
                            <h1 className="w-full py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg mt-5  border-[1px] border-indigo-200">Participation rate</h1>
                            <div className="w-full py-3 px-3 text-indigo-700 font-medium lg:text-2xl sm:text-lg"> Proposal {props.currentProposal.id} had a participation rate of <strong>{participationRate}% </strong> amongst ATOM stakers </div>
                        </div>
                    </div>

                    <div className='w-full flex flex-row gap-5 mt-8'>
                        <div className="w-1/2 h-80 flex flex-col items-center gap-5 ">
                            <h1 className="py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg w-full  border-[1px] border-indigo-200">Validator Votes</h1>
                            <div className="w-full h-60 flex justify-center">
                                <PieChart />
                            </div>
                        </div>
                        <div className="w-1/2 h-80 flex flex-col items-center gap-5 ">
                            <h1 className="py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg w-full  border-[1px] border-indigo-200">Delegator Votes</h1>
                            <div className="w-full h-60 flex justify-center">
                                <PieChart />
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}