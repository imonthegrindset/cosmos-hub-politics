
export default function NavBar(props) {
    return (
        <nav className="bg-indigo-800 flex flex-row gap-12 py-5 px-10 items-center">
            <div className='text-2xl font-Titillium text-white self-center mb-1'>Logo</div>
            <div className='text-lg font-Titillium p-1 px-2 rounded-md text-white transition ease-out delay-50 bg-color hover:bg-indigo-500 cursor-pointer'>Validators</div>
            <div className='text-lg font-Titillium p-1 px-2 rounded-md text-white transition ease-out delay-50 bg-color hover:bg-indigo-500 cursor-pointer'>Proposals</div>
            <div className='text-lg font-Titillium p-1 px-2 rounded-md text-white transition ease-out delay-50 bg-color hover:bg-indigo-500 cursor-pointer'>Individual Address</div>
        </nav>
    )
}