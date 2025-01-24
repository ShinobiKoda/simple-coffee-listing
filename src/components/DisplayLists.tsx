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
    <div>
        <div className="header-img">
            
        </div>

        {data ? (
            data.map((coffee)=>(
                <p key={coffee.id}>{coffee.name}</p>
            ))
        ): (
            <p>Loading</p>
        )}
      
    </div>
  )
}

export default DisplayLists
