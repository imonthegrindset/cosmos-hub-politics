import React, { useState, useEffect} from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import { AiOutlineArrowRight } from 'react-icons/ai'

const Dropdown = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const sendCurrentValidator = (val) => {
        props.getCurrentValidator(val)
        props.updateState(!value);
        setValue(!value);
    }

    const changeInputValue = (e) => {
        setInputValue(e.target.value)
        console.log(e.target.value)
    }


    return (
        <div className="bg-white border-2 border-indigo-700 text-indigo-700 w-80 px-4 py-1 rounded-md font-Titillium">
            <button className='text-xl font-semibold w-full flex justify-start relative py-2' onClick={() => setExpanded(!expanded)}>
                {expanded ? "Select Your Validator" : "Select Your Validator"}
                {expanded ? <BiUpArrowAlt className="absolute right-0 top-3" /> : <BiDownArrowAlt className="absolute right-0 top-3" />}
            </button>
            {expanded && (
                <ul className="overflow-y-scroll overflow-x-hidden h-80 ">
                    {props.validators.map(validator => {
                        return (
                            <li key={Math.random() * 182} onClick={() => {sendCurrentValidator(validator)}} className='transition ease-out 50 py-2 cursor-pointer hover:translate-x-4'>{props.validators.indexOf(validator) + 1} | {validator.moniker}</li>
                        )
                    })}
                </ul>


            )}
        </div>
    );
};


export default Dropdown;
