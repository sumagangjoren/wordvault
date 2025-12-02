import { useNavigate } from "react-router"

function Home() {

    const navigate = useNavigate()

    const input = { padding: 10, fontSize: 16, borderRadius: 8, border: "1px solid #ddd", outline: "none" };

    return (
        <>
            <div className="m-4">
                <input type="text" placeholder="search" style={input} className="w-full mb-8"/>
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="relative my-4 bg-gray-200" onClick={() => navigate('show')}>

                        <div className="text-h3">title</div>
                        <div>word description</div>

                        <div className="rounded-full absolute top-2 right-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                        </div>

                        <div className="grid grid-cols-2 place-content-evenly gap-4">
                            <div className="justify-self-start">Tue, 2 December 2025</div>
                            <div className="justify-self-end">icons</div>
                        </div>

                    </div>
                ))}
                <div className="bottom-2 absolute w-full pr-4">
                    <button className="  bg-green-200 w-full" onClick={() => navigate('create')}>Add</button>
                </div>
            </div>
        </>
    )
}

export default Home