export const LogoLoader = ({ maintext="Loading...", subtext }) => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div className="bg-white flex justify-center flex-col items-center h-60 w-60 p-5 rounded-lg text-center shadow-xl">
          {/* <img src="/InfiLoaderTransparent.svg" className="h-16 w-16" /> */}
          <div className="animate-[spin_2s_linear_infinite] rounded-full h-32 w-32 ">
          <img src="/loader.png" className="h-32 w-32" />
          </div>
          <p className="mt-2 font-sm text-[14px] text-[#312070]">{maintext}</p>
        </div>
      </div>
    </div>
  );
};
