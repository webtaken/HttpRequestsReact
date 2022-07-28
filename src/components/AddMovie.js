import React, { useState, useRef } from 'react';

import classes from './AddMovie.module.css';

function AddMovie(props) {
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  const [error, setError] = useState(null);

  function submitHandler(event) {
    event.preventDefault();

    setError(null);
    // could add validation here...
    const title = titleRef.current.value;
    const openingText = openingTextRef.current.value;
    const releaseDate = releaseDateRef.current.value;
    if (title.trim().length === 0 ||
      openingText.trim().length === 0 ||
      releaseDate.trim().length === 0) {
      titleRef.current.value = "";
      openingTextRef.current.value = "";
      releaseDateRef.current.value = "";
      setError("Title, Opening Text and Release Date must not be empty ⚠");
      return;
    }

    const movie = {
      title: title,
      openingText: openingText,
      releaseDate: releaseDate,
    };

    props.onAddMovie(movie);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default AddMovie;
