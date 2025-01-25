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
    <div className="w-full bg-[#121315] h-full">
      <div className="header-img"></div>

      <div className="w-full h-full px-6 max-w-[1440px] mx-auto">
        <div className="bg-[#1c1d1f] w-full mx-auto rounded-md px-8 py-7 mt-[-10rem] text-white flex flex-col gap-4 h-full">
          <div className="text-center flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Our Collection</h1>
            <p className="text-[#63676f] w-full max-w-[600px] mx-auto">
              Introducing our Coffee Collection, a selection of unique coffees
              from different roast types and origins, expertly roasted in small
              batches and shipped fresh weekly.
            </p>
            <div className="flex items-center gap-4 justify-center">
              <button className="p-2 bg-[#4d5562] rounded-md cursor-pointer hover:opacity-90">
                All Products
              </button>
              <button className="p-2 bg-[#4d5562] rounded-md cursor-pointer hover:opacity-90">
                Available Now
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-[4rem] w-full lg:grid lg:grid-cols-3">
            {data ? (
              data.map((coffee) => {
                const {
                  image,
                  price,
                  name,
                  rating,
                  id,
                  popular,
                  available,
                  votes,
                } = coffee;
                return (
                  <div
                    key={id}
                    className="w-full flex flex-col gap-2 max-w-[450px] mx-auto"
                  >
                    <div className="w-full rounded-lg overflow-hidden relative">
                      <img src={image} alt={name} className="w-full" />
                      {popular && (
                        <p className="px-3 py-1 absolute top-2 left-2 bg-[#bf9954] text-black font-bold rounded-[1rem]">
                          Popular
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <p className="w-full flex items-center justify-between">
                        <span>{name}</span>
                        <span>{price}</span>
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                          {rating ? (
                            <p className="flex items-center">
                              <img src="/images/Star_fill.svg" alt="" />
                              <span>{rating}</span>
                            </p>
                          ) : (
                            <p className="flex items-center">
                              <img src="/images/Star.svg" alt="" />
                              <span>No Rating</span>
                            </p>
                          )}
                          {votes && (
                            <span className="text-[#63676f]">
                              ({votes} votes)
                            </span>
                          )}
                        </div>
                        <div>
                          {
                            !available && (
                              <span className="text-red-600">Sold Out</span>
                            )}
                        </div>
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
