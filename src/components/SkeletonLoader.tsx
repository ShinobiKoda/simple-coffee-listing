const SkeletonLoader = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="w-full flex flex-col gap-4 max-w-[450px] mx-auto ">
          <div className="w-full rounded-lg overflow-hidden relative bg-gray-700 h-64 animate-pulse"></div>
          <div className="flex flex-col gap-3 w-full">
            <div className="w-full h-6 bg-gray-700 animate-pulse rounded-md"></div>
            <div className="w-full h-6 bg-gray-700 animate-pulse rounded-md"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
