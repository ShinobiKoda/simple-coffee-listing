import { useEffect, useState } from "react";
import { Coffee } from "../types/type";
import { FetchCoffee } from "../api/FetchCoffe";


const DisplayLists = () => {
  const [data, setData] = useState<Coffee[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await FetchCoffee();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    };
    getData();
  }, []);

  console.log(data);

  {
    error && <p>Error: {error}</p>;
  }

  return (
    <div className="w-full bg-[#121315]">
      <div className="header-img"></div>

      <div className="w-full h-full px-4">
        <div className="bg-[#1c1d1f] w-full max-w-[700px] mx-auto rounded-md px-6 py-4 mt-[-10rem] text-white flex flex-col gap-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Our Collection</h1>
            <p className="text-">
              Introducing our Coffee Collection, a selection of unique coffees
              from different roast types and origins, expertly roasted in small
              batches and shipped fresh weekly.
            </p>
            <div>
              <button>All Products</button>
              <button>Available Now</button>
            </div>
          </div>
          <div className="flex flex-col gap-[4rem] w-full">
            {data ? (
              data.map((coffee) => {
                const { image, price, name, rating, id, popular, available } = coffee;
                return (
                  <div key={id} className="w-full flex flex-col gap-2">
                    <div className="w-full rounded-lg overflow-hidden relative">
                      <img src={image} alt={name} className="w-full"/>
                      {popular && <p className="px-3 py-1 absolute top-2 left-2 bg-[#bf9954] text-black font-bold rounded-[1rem]">Popular</p>}
      
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <p className="w-full flex items-center justify-between">
                        <span>{name}</span>
                        <span>{price}</span>
                      </p>
                      <div>
                        {rating ? (
                          <p className="flex items-center">
                            <img src="/images/Star_fill.svg" alt="" />
                          <span>{rating}</span>
                          </p>): (
                          <p className="flex items-center">
                            <img src="/images/Star.svg" alt="" />
                            <span>No Rating</span>
                          </p>)}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Loading</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayLists;
