// const Pagination = ({
//   currentPage,
//   totalItems,
//   itemsPerPage,
//   onPageChange,
// }) => {
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center mt-4 text-xs">
//       {/* Previous Button */}
//       <button
//         onClick={handlePrev}
//         disabled={currentPage === 1}
//         className="px-4 py-1 mr-2 text-white bg-[#575757] rounded-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
//       >
//         Previous
//       </button>

//       {/* Page Numbers */}
//       <span className=" font-semibold text-[#575757]">
//         Page {currentPage} of {totalPages}
//       </span>

//       {/* Next Button */}
//       <button
//         onClick={handleNext}
//         // disabled={currentPage === totalPages}
//         className="px-4 py-1 ml-2 text-white bg-[#575757] rounded-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
//       >
//         Next
//       </button>
//     </div>
//   );
// };
// export default Pagination;

export const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 text-xs">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-4 py-1 mr-2 text-white bg-[#575757] rounded-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span className="font-semibold text-[#575757]">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages} // Fix here
        className="px-4 py-1 ml-2 text-white bg-[#575757] rounded-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};
export default Pagination

