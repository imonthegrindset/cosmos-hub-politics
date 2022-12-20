import { Link } from 'react-router-dom'
export default function NavBar(props) {
    return (
        <>
            <nav className="bg-indigo-800 flex flex-row gap-12 py-5 px-10 items-center">
                <div className='text-2xl font-Titillium text-white self-center mb-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-300'>GovernHUB</div>
                <Link to='/'>
                    <div className='text-lg font-Titillium p-1 px-2 rounded-md text-white transition ease-out delay-50 bg-color hover:bg-indigo-500 cursor-pointer'>Home</div>
                </Link>

                <Link to='/validators'>
                    <div className='text-lg font-Titillium p-1 px-2 rounded-md text-white transition ease-out delay-50 bg-color hover:bg-indigo-500 cursor-pointer'>Validators</div>
                </Link>

                <Link to='/proposals'>
                    <div className='text-lg font-Titillium p-1 px-2 rounded-md text-white transition ease-out delay-50 bg-color hover:bg-indigo-500 cursor-pointer'>Proposals</div>
                </Link>
            </nav>
        </>
    )
}