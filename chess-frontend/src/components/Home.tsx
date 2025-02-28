import { useNavigate } from "react-router-dom"

export const Home = () => {
    const navigate = useNavigate();

    return <div className="flex  justify-center pt-[5%] ">
       <div className="mr-16">
            <img className="w-96" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtijPdS01yUeV_dNNXkGly8AdBYhPid4r5pw&s" alt="chess image"/>
       </div>
       <div className="flex-col mt-12">
        <div className="text-4xl text-white font-bold">
            play chess on the #1 site 
        </div>
        <div>
            <button className="text-white font-bold bg-green-600 rounded-md px-12 py-3 mt-8" onClick={()=> {
                navigate('/game')
            }}>Play online</button>
        </div>
       </div>
    </div>
}