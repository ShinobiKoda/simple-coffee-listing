import { useEffect, useState } from "react";
import { Coffee } from "../types/type";
import { FetchCoffee } from "../api/FetchCoffe"

const DisplayLists = () => {
    const[data, setData] = useState<Coffee[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const getData = async() => {
            try{
                const result = await FetchCoffee();
                setData(result);
            }catch(err: any){
                setError(err.message || "Something went wrong");
            }
        }
        getData();
    }, [])

    console.log(data);

    {error && <p>Error: {error}</p>}

  return (
    <div className="w-full h-screen bg-[#121315]">
        <div className="header-img">
            
        </div>

        <div className="w-full h-full px-4">

        <div className="bg-[#1c1d1f] w-full max-w-[700px] mx-auto rounded-md px-6 py-4 mt-[-10rem]">
            

        {data ? (
            data.map((coffee)=>(
                <p key={coffee.id}>{coffee.name}</p>
            ))
        ): (
            <p>Loading</p>
        )}
        </div>

        </div>


      
    </div>
  )
}

export default DisplayLists
