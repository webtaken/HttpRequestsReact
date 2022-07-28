import React, { useState, useEffect, useCallback } from "react";
import 'dotenv/config';

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";



function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null); // clearing any last error
    try {
      // you can also try to configure environment files (.env) 
      // and replace line bellow with: 
      // const response = await fetch(process.env.FIREBASE_APP_API);
      const response = await fetch("<your-firebase-url/movies.json>");

      if (!response.ok) {
        throw new Error("Something went wrong fetching the data :(");
      }

      const data = await response.json();
      console.log(data);

      const transformedMovies = [];
      for (const idMovie in data) {
        transformedMovies.push({
          id: idMovie,
          title: data[idMovie].title,
          openingText: data[idMovie].openingText,
          releaseDate: data[idMovie].releaseDate,
        });
      }
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false); // no loading anymore
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    // you can also try to configure environment files (.env) 
    // and replace line bellow with: 
    // const response = await fetch(process.env.FIREBASE_APP_API);
    const response = await fetch("<your-firebase-url/movies.json>", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log(data);
  };

  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (movies.length === 0) {
    content = <p>Found no movies.</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
