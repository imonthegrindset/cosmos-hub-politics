
import React, { useState, useEffect} from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import { AiOutlineArrowRight } from 'react-icons/ai'

const DropdownValidatorVote= (props) => {
    const [expanded, setExpanded] = useState(false);
 


    return (
        <div className="bg-white border-[1px] border-indigo-200 text-indigo-700 lg:w-80 md:w-60 sm:w-60 px-4 py-1 rounded-md font-Titillium">
            <button className='text-xl  w-full flex justify-start relative py-2' onClick={() => setExpanded(!expanded)}>
                {expanded ? "Select Validator" : "Select Validator"}
                {expanded ? <BiUpArrowAlt className="absolute right-0 top-3" /> : <BiDownArrowAlt className="absolute right-0 top-3" />}
            </button>
            {expanded && (
                <ul className="overflow-y-scroll overflow-x-hidden h-80 ">
                    {props.validators.map(validator => {
                        return (
                            <li key={Math.random() * 182} onClick={() => {props.getSelectedValidator(validator)} } className='transition ease-out 50 py-2 cursor-pointer hover:translate-x-4'>{props.validators.indexOf(validator) + 1} | {validator.moniker}</li>
                        )
                    })}
                </ul>


            )}
        </div>
    );
};


export default DropdownValidatorVote;
