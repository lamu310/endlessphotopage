import React from "react";

const Photo = ({ alt, src, photographer, photographer_url }) => {
  return (
    <article className="photo">
      <img src={src.original} alt={alt} />
      <div className="photo-info">
        <div>
          Potographer:
          <a href={photographer_url}>
            <h4>{photographer}</h4>
          </a>
        </div>
      </div>
    </article>
  );
};

export default Photo;
