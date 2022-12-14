import Dropdown from "./Dropdown"
import DropdownDisplay from "./DropdownPercentage"
import PieChart from "./PieChart"
import HorizontalBarChart from "../BarChart"
import { useState, useEffect, useRef } from "react"

export default function ValidatorProfile(props) {
    const [copied, setCopied] = useState(false);
    return (
        <div className='lg:px-40 lg:py-20 flex flex-col gap-5 sm:px-10 sm:py-10 md:px-20 md:py-20'>

            <div className="flex flex-row gap-5 w-1/2 relative h-[4rem]">
                <div className="absolute"><Dropdown /></div>
                <div className="absolute left-[22rem]"><DropdownDisplay /></div>
            </div>

            <div className=" font-Titillium px-6 w-100 border-2 border-indigo-700 rounded-md bg-gradient-to-br from-violet-100 to-white p-3 shadow-lg">
                <div>
                    <h1 className="pt-2 px-1 text-3xl text-indigo-700 font-bold">VALIDATOR Governance Profile</h1>
                    <div className="flex flex-row justify-start items-center gap-3">
                        <h5 className="px-1 py-1 text-indigo-700">cosmos17291akad2028mzki900</h5>
                        <span onClick={() => {setCopied(true)}}className="text-center cursor-pointer rounded-md px-2 text-sm border-2 border-indigo-700 bg-indigo-700 text-white hover:bg-white hover:text-indigo-700">Copy</span><span className={copied ? "block text-indigo-700 text-sm" : "hidden"}>Copied!</span>
                    </div>
                </div>

                <div className="flex flex-col gap-10">
                    <div className="flex flex-row w-full gap-10">
                        <div className="flex flex-col w-1/2">

                            <div className="w-full ">
                                <h1 className="w-full py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg mt-5">Voting Power</h1>
                                <div className="w-full py-3 px-3 text-indigo-700 font-medium lg:text-2xl sm:text-lg h-1/2">This Validator has a voting power of <strong>4.74%</strong></div>
                            </div>

                            <div className="w-full ">
                                <h1 className="w-full py-3 px-3 bg-white text-indigo-700 lg:text-xl sm:text-md  rounded-lg mt-5 flex flex-row justify-between">Rate of Voting
                                    <div className="flex flex-row gap-3">
                                        <span>past</span>
                                        <select className="bg-white  border-2 outline-none border-indigo-700 rounded-md text-sm font-semibold lg:px-1 sm:px-0 sm:py-0">
                                            <option value="">45 Proposals</option>
                                            <option value="">25 Proposals</option>
                                            <option value="">10 Proposals</option>
                                        </select>
                                    </div>
                                </h1>
                                <div className="w-full py-3 px-3 text-indigo-700 font-medium lg:text-2xl sm:text-lg">This Validator has a voting rate of <strong>67%</strong> in the past <strong>45</strong> proposals</div>
                                <div className="w-full py-1 flex flex-col lg:text-lg sm:text-sm ">
                                    <div className="flex flex-row justify-between bg-white px-3 py-1 rounded-t-md">
                                        <span>Yes</span><span className="text-indigo-700 font-semibold">20%</span>
                                    </div>
                                    <div className="flex flex-row justify-between bg-violet-100 px-3 py-1">
                                        <span>Yes</span><span className="text-indigo-700 font-semibold">20%</span>
                                    </div>
                                    <div className="flex flex-row justify-between bg-white px-3 py-1">
                                        <span>Yes</span><span className="text-indigo-700 font-semibold">20%</span>
                                    </div>
                                    <div className="flex flex-row justify-between bg-violet-100 px-3 py-1 rounded-b-md">
                                        <span>Yes</span><span className="text-indigo-700 font-semibold ">20%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-1/2 flex flex-col'>
                            <h1 className="py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg mt-5"> Proposal Votes</h1>
                            <div className="h-full py-3 px-3 flex flex-col overflow-y-scroll max-h-80">
                                <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 pb-3">
                                    <span>Prop Number</span><span>Vote</span><div className="flex-auto flex justify-end">View Proposal Details</div>
                                </div>
                                <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                    <span>Prop Number</span><span>Vote</span><div className="flex-auto flex justify-end">View Proposal Details</div>
                                </div>
                                <div className="flex flex-row start  gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                    <span>Prop Number</span><span>Vote</span><div className="flex-auto flex justify-end">View Proposal Details</div>
                                </div>
                                <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                    <span>Prop Number</span><span>Vote</span><div className="flex-auto flex justify-end">View Proposal Details</div>
                                </div>
                                <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                    <span>Prop Number</span><span>Vote</span><div className="flex-auto flex justify-end">View Proposal Details</div>
                                </div>
                                <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                    <span>Prop Number</span><span>Vote</span><div className="flex-auto flex justify-end">View Proposal Details</div>
                                </div>
                                <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                    <span>Prop Number</span><span>Vote</span><div className="flex-auto flex justify-end">View Proposal Details</div>
                                </div>
                                <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                    <span>Prop Number</span><span>Vote</span><div className="flex-auto flex justify-end">View Proposal Details</div>
                                </div>
                                <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                    <span>Prop Number</span><span>Vote</span><div className="flex-auto flex justify-end">View Proposal Details</div>
                                </div>
                                <div className="flex flex-row start gap-20 lg:text-lg sm:text-sm text-indigo-700 border-b-2 border-indigo-700 py-3">
                                    <span>Prop Number</span><span>Vote</span><div className="flex-auto flex justify-end">View Proposal Details</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ...........CHARTS............ */}


                </div>


            </div>
            <div className=" font-Titillium px-6 w-100 border-2 border-indigo-700 rounded-md bg-gradient-to-br from-violet-100 to-white p-3 shadow-lg">
                <div>
                    <h1 className="pt-2 px-1 text-3xl text-indigo-700 font-bold">Data Charts</h1>
                </div>
                <div className="flex flex-row gap-10 w-full py-5 min">
                    <div className="lg:w-1/3 h-80 flex flex-col items-center gap-5 sm:w-1/2">
                        <h1 className="py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg w-full">Pie Chart</h1>
                        <div className="w-full h-60 flex justify-center">
                            <PieChart />
                        </div>
                    </div>
                    <div className="lg:w-2/3 h-80 sm:w-1/2">
                        <h1 className="py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg ">Bar Chart</h1>
                        <div className="w-full h-60 flex mt-6">
                            <HorizontalBarChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}