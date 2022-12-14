import { Link } from "react-router-dom"
export default function Home(props) {
    return (
        <div className='px-40 py-60 flex flex-col gap-5 overflow-hidden'>
            <h1 className="font-Titillium text-6xl text-indigo-700 font-bold">Visualize Cosmos Hub Governance Data</h1>
            <h3 className="font-Titillium text-4xl text-indigo-700 font-regular">The validators you delegate to should align with you politically.</h3>
            <div className='flex flex-row gap-5 mt-3'>
                <Link to='/validators'>
                    <div className='text-lg bg-indigo-700 text-white font-Titillium py-3 px-3 
                rounded-md border-2 border-indigo-700 cursor-pointer transition ease-out delay-50 bg-color
                 hover:bg-white hover:text-indigo-700'>See Validator Data</div>
                </Link>
                <div className='text-lg bg-indigo-700 text-white font-Titillium py-3 px-3 
                rounded-md border-2 border-indigo-700 cursor-pointer transition ease-out delay-50 bg-color
                 hover:bg-white hover:text-indigo-700'>See Proposal Data</div>
                <div className='text-lg bg-indigo-700 text-white font-Titillium py-3 px-3 
                rounded-md border-2 border-indigo-700 cursor-pointer transition ease-out delay-50 bg-color
                 hover:bg-white hover:text-indigo-700'>Check an Address</div>
            </div>
        </div>
    )
}