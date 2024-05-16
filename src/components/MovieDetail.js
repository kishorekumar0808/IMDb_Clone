import React from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Movie Detail for ID: {id}</h1>
    </div>
  );
};

export default MovieDetail;
