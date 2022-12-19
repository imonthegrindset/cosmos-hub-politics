import { Link } from "react-router-dom"
import atom from '../picwish.png'
export default function Home(props) {
    return (
        <div className='min-h-[40rem] lg:px-40 lg:py-60 md:px-20 md:py-20 sm:px-10 sm:py-20 flex flex-row sm:gap-20 items-center overflow-hidden lg:mt-[-3rem] md:mt-0 sm:mt-0'>

            <div className="flex flex-col gap-5">
                <h1 className="font-Titillium lg:text-6xl md:text-5xl sm:text-5xl text-indigo-700 font-bold">Visualize Cosmos Hub Governance Data</h1>
                <h3 className="font-Titillium lg:text-4xl md:text-3xl sm:text-3xl text-indigo-700 font-regular">The validators you delegate to should align with you politically.</h3>
                <div className='flex flex-row gap-5 mt-3'>
                    <Link to='/validators'>
                        <div className='text-xl bg-indigo-700 text-white font-Titillium py-3 px-3 
                rounded-md border-2 border-indigo-700 cursor-pointer transition ease-out delay-50 bg-color
                 hover:bg-white hover:text-indigo-700'>See Validator Data</div>
                    </Link>
                    <Link to='/proposals'>
                        <div className='text-xl bg-indigo-700 text-white font-Titillium py-3 px-3 
                rounded-md border-2 border-indigo-700 cursor-pointer transition ease-out delay-50 bg-color
                 hover:bg-white hover:text-indigo-700 '>See Proposal Data</div>
                    </Link>

                </div>
            </div>
            <img src={atom} alt="atom token" className="h-[23rem] sm:hidden md:hidden aspect-ratio-square lg:flex items-center ml-[5rem] "/>
        </div>
    )
}

