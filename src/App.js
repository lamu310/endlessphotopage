import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const ApiKey = "563492ad6f91700001000001a5d5f1e3ff3f4edf8240a145017f683e";

function App() {
  async function fetchPhotos() {
    const response = await fetch(
      "https://api.pexels.com/v1/search?query=people",
      {
        headers: {
          Authorization: ApiKey,
        },
      }
    );
    const json = await response.json();

    console.log(json);
    setPhotos(json.photos);
  }

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos();
    console.log(photos);
  }, []);

  return (
    <main>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
