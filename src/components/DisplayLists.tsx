import { useEffect, useState } from "react";
import { Coffee } from "../types/type";
import { FetchCoffee } from "../api/FetchCoffe";
import SkeletonLoader from "./SkeletonLoader";

const DisplayLists = () => {
  const [data, setData] = useState<Coffee[] | null>(null);
  const [filteredData, setFilteredData] = useState<Coffee[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await FetchCoffee();
        setData(result);
        setFilteredData(result);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (filter === "available") {
      setFilteredData(data?.filter(coffee => coffee.available) || null);
    } else {
      setFilteredData(data);
    }
  }, [filter, data]);

  const handleFilterChange = (filterType: string) => {
    setFilter(filterType);
  };

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
              <button
                className={`p-2 rounded-md cursor-pointer hover:opacity-90 ${filter === "all" ? "bg-[#4d5562]" : "bg-[#2c2f33]"}`}
                onClick={() => handleFilterChange("all")}
              >
                All Products
              </button>
              <button
                className={`p-2 rounded-md cursor-pointer hover:opacity-90 ${filter === "available" ? "bg-[#4d5562]" : "bg-[#2c2f33]"}`}
                onClick={() => handleFilterChange("available")}
              >
                Available Now
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-[4rem] w-full lg:grid lg:grid-cols-3">
            {loading ? (
              <SkeletonLoader />
            ) : (
              filteredData && (
                filteredData.map((coffee) => {
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
                      className="w-full flex flex-col gap-4 max-w-[450px] mx-auto"
                    >
                      <div className="w-full rounded-lg overflow-hidden relative">
                        <img src={image} alt={name} className="w-full" />
                        {popular && (
                          <p className="px-3 py-1 absolute top-2 left-2 bg-[#f5c769] text-black font-bold rounded-[1rem]">
                            Popular
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <p className="w-full flex items-center justify-between font-semibold">
                          <span>{name}</span>
                          <span className="p-1 bg-[#9dbba8] text-black font-semibold rounded-md">{price}</span>
                        </p>
                        <div className="flex justify-between items-center font-semibold">
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
                            {votes>0 && (
                              <span className="text-[#63676f]">
                                ({votes} votes)
                              </span>
                            )}
                          </div>
                          <div>
                            {
                              !available && (
                                <span className="text-red-600 font-semibold">Sold Out</span>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayLists;
