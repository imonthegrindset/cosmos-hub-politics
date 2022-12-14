import React, { useState } from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'

const DropdownDisplay = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [display, setDisplay] = useState(["Percentage", "Numeric"]
    )

    return (
        <div className="bg-white border-2 border-indigo-700 text-indigo-700 w-60 px-4 py-1 rounded-md font-Titillium">
            <button className='text-xl font-semibold w-full flex justify-start relative py-2' onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "Select Display" : "Select Display"}
                {isExpanded ? <BiUpArrowAlt className="absolute right-0 top-3" /> : <BiDownArrowAlt className="absolute right-0 top-3" />}
            </button>
            {isExpanded && (
                <ul className="overflow-hidden">
                    {display.map(option => {
                        return (
                            <li key={Math.random() * 182} className='transition ease-out 50 py-2 cursor-pointer hover:translate-x-4'>{option}</li>
                        )
                    })}
                </ul>

            )}
        </div>
    );
};

export default DropdownDisplay;