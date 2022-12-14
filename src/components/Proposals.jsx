import { useState } from 'react'

export default function Proposals(props) {

    const [copied, setCopied] = useState(false);
    return (
        <div className='lg:px-40 lg:py-20 flex flex-col gap-5 sm:px-10 sm:py-10 md:px-20 md:py-20'>

            <div className=" font-Titillium px-6 w-100 border-2 border-indigo-700 rounded-md bg-gradient-to-br from-violet-100 to-white p-3 shadow-lg">
                <div>
                    <div className='flex flex-row justify-between '>
                        <div>
                            <h1 className="pt-2 px-1 lg:text-3xl sm:text-2xl text-indigo-700 font-bold ">PROPOSAL 82</h1>
                            <div className="flex flex-row justify-start items-center">
                                <div className='flex lg:flex-row md:flex-row sm:flex-col sm:gap-1 lg:items-center md:items-center sm:justify-center'>
                                    <h5 className="pl-1 py-1 text-indigo-700 sm:text-sm">181AADM117291akad2028mzki900</h5>
                                    <div className='flex flex-row w-full items-center'>
                                        <span onClick={() => { setCopied(true) }} className="lg:mx-3 md:mx-3 sm:mx-0 sm:mr-3 text-center cursor-pointer rounded-md px-2 text-sm border-2 border-indigo-700 bg-indigo-700 text-white hover:bg-white hover:text-indigo-700">Copy</span><div className={copied ? "block text-indigo-700 text-sm mr-3" : "hidden"}>✓</div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className='sm:text-sm'>
                            <h1 className="rounded-md py-1 px-1 lg:text-3xl sm:text-2xl text-white bg-rose-400 font-bold flex items-center justify-center ">REJECTED</h1>
                            <div className='py-2 text-indigo-700 lg flex flex-row gap-2'><strong>VOTING PERIOD</strong> <span>|</span> <span >11/11/2011</span> to <span>22/22/2022</span></div>
                        </div>
                    </div>
                </div>
                <div data-id='prop-description' className='flex flex-col gap-3 mb-5'>
                    <div className='w-full flex flex-row items-center justify-between pt-3 px-1'>
                        <h1 className="lg:text-3xl text-indigo-700 font-bold sm:text-2xl">DESCRIPTION</h1>

                    </div>

                    <div className='w-100 h-80 bg-white rounded-lg overflow-y-auto flex flex-col gap-3'>
                        <h2 className='text-3xl flex flex-row justify-between py-5 px-5 text-indigo-700 font-semibold w-full bg-violet-100'>Title <div className='text-indigo-700 text-lg font-regular'>proposed by <span className='text-2xl ml-1 font-semibold'>Informal Systems</span></div></h2>
                        <p className='w-full sm:text-sm h-100 lg:text-md w-100 text-md py-5 px-5 text-indigo-700 overflow-y-auto '>Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.
                            Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.h.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.h.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.h
                            .Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.h.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.h.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph
                            .h.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.h.Paragraph.Paragraph.Paragraph.Paragraph.Paragraph.</p>
                    </div>
                </div>
            </div>

            <div className=" font-Titillium px-6 w-100 border-2 border-indigo-700 rounded-md bg-gradient-to-br from-violet-100 to-white p-3 shadow-lg">

                <h1 className="pt-2 px-1 lg:text-3xl sm:text-2xl text-indigo-700 font-bold ">DATA </h1>
                <div className='w-full mt-3'>

                    <div className='w-full flex flex-row gap-5'>
                        <div className='w-1/2'>
                            <div className='w-full flex flex-col'>
                                <h1 className="py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg mt-5 flex flex-row gap-3 justify-between"> Validator Votes
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
                            <h1 className="w-full py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg mt-5">Turnout Rank</h1>
                            <div className="w-full py-3 px-3 text-indigo-700 font-medium lg:text-2xl sm:text-lg">Proposal 82 is the <strong>#1 proposal</strong> ranked by voter turnout</div>
                            <div className="w-full py-1 flex flex-col lg:text-lg sm:text-sm ">
                                <div className="flex flex-row justify-between bg-white px-3 py-1 rounded-t-md">
                                    <span>Yes</span><span className="text-indigo-700 font-semibold">10000 votes</span>
                                </div>
                                <div className="flex flex-row justify-between bg-violet-100 px-3 py-1">
                                    <span>No</span><span className="text-indigo-700 font-semibold">10000 votes</span>
                                </div>
                                <div className="flex flex-row justify-between bg-white px-3 py-1">
                                    <span>No With Veto</span><span className="text-indigo-700 font-semibold">10000 votes</span>
                                </div>
                                <div className="flex flex-row justify-between bg-violet-100 px-3 py-1 rounded-b-md">
                                    <span>Abstain</span><span className="text-indigo-700 font-semibold ">10000 votes</span>
                                </div>
                            </div>
                            <h1 className="w-full py-3 px-3 bg-white text-indigo-700 text-xl  rounded-lg mt-5">Participation rate</h1>
                            <div className="w-full py-3 px-3 text-indigo-700 font-medium lg:text-2xl sm:text-lg"> Proposal 82 had a participation rate of <strong>74% </strong> amongst ATOM stakers </div>
                        </div>
                    </div>

                    <div className='w-full flex flex-row gap-5'>
                        
                    </div>
                    

                </div>
            </div>

        </div>
    )
}