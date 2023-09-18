import React, { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  const [updatedTitle, setUpdatedTitle] = useState();

  //file upload state
  const [fileUpload, setFileUpload] = useState(null);
  console.log(fileUpload);

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(auth.currentUser.uid);
      const userData = filteredData.filter(data => data.userId == auth.currentUser.uid)
      setMovieList(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await deleteDoc(movieDoc);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await updateDoc(movieDoc, {title:updatedTitle});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async() => {
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Auth />

      <div>
        <input
          type="text"
          placeholder="Movie title..."
          className="border border-black p-2"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Release date..."
          type="number"
          className="border border-black p-2"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> Received an Oscar</label>
        <button
          onClick={onSubmitMovie}
          className="bg-gray-200 px-4 py-2 border border-black"
        >
          Submit Movie
        </button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1
              className={`text-3xl ${
                movie.receivedAnOscar ? "text-green-400" : "text-red-500"
              }`}
            >
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input
              className="border border-black p-2 mx-4"
              type="text"
              placeholder="new title..."
              onChange={(e)=>setUpdatedTitle(e.target.value)}
            />
            <button 
            onClick={()=>updateMovieTitle(movie.id)}
            className="bg-gray-200 px-4 py-2 border border-black">
              Update title
            </button>
          </div>
        ))}
      </div>

      <div>
        <input type="file"  onChange={(e)=>setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
};

export default App;
