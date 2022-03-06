import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const ApiKey = "563492ad6f91700001000001a5d5f1e3ff3f4edf8240a145017f683e";
/* const ApiKey = "563492ad6f91700001000001706a06406b8942558b295ff8f7eae80b"; */

function App() {
  async function fetchPhotosByTerm(searchTerm) {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${searchTerm}`,
      {
        headers: {
          Authorization: ApiKey,
        },
      }
    );
    const json = await response.json();

    setPhotos(json.photos);
    setNextPagePhoto(json.next_page);
  }

  async function loadMorePhotos() {
    setLoading(true);
    try {
      const response = await fetch(nextPagePhoto, {
        headers: {
          Authorization: ApiKey,
        },
      });
      const json = await response.json();
      setPhotos([...photos, ...json.photos]);
      setNextPagePhoto(json.next_page);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setNewImages(false);
  }

  function event(e) {
    let windowRelativeBottom =
      document.documentElement.getBoundingClientRect().bottom;
    if (windowRelativeBottom < document.documentElement.clientHeight + 10) {
      setNewImages(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchPhotosByTerm(searchTerm);
  }

  const [photos, setPhotos] = useState([]);
  const [newImages, setNewImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadNextPage, setLoadNextPage] = useState(0);
  const [nextPagePhoto, setNextPagePhoto] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPhotosByTerm("dog");
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", event);
    return () => document.removeEventListener("scroll", event);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!newImages) return;
    setLoadNextPage((old) => old + 1);
  }, [newImages]);

  useEffect(() => {
    loadMorePhotos();
  }, [loadNextPage]);

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            className="form-input"
            placeholder="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        <h1 className="loading">{loading && "Loading..."}</h1>
      </section>
    </main>
  );
}

export default App;
