import React from "react";

const Pagination = (props) => {
  const { pageNumberProp, onNext, onPrevious } = props;

  return (
    <div className="flex justify-center">
      <div
        onClick={onPrevious}
        className="m-4 p-2 border-2 text-center hover:bg-gray-200 cursor-pointer rounded-md"
        style={{ maxWidth: "200px", width: "100%", fontWeight: "bold" }}
      >
        Previous
      </div>
      <div className="m-4 pl-5 pr-5 border-2 border-r-5 flex items-center justify-center rounded-md">
        {pageNumberProp}
      </div>
      <div
        onClick={onNext}
        className="m-4 p-2 border-2 text-center hover:bg-gray-200 cursor-pointer rounded-md"
        style={{ maxWidth: "200px", width: "100%", fontWeight: "bold" }}
      >
        Next
      </div>
    </div>
  );
};

export default Pagination;
