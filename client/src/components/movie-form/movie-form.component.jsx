import React, { useState } from 'react';
import './movie-form.styles.scss';
import Forminput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { act } from 'react-dom/test-utils';
import { FiX } from 'react-icons/fi';

const MovieForm = ({
  movieFormFields,
  movieFieldsChangeHandler,
  actorSearchChangeHandler,
  producerSearchChangeHandler,
  producerSearchField,
  actorSearchField,
  producerSearchList,
  actorSearchList,
  addActor,
  removeActor,
  setProducer,
  removeProducer,
  handleMovieSubmit,
  setShowActorForm,
  setShowMovieForm,
  setShowProducerForm,
}) => {
  const { name, yearOfRelease, plot, poster, actors, producer } =
    movieFormFields;

  return (
    <div className="movie-form-container">
      <form onSubmit={handleMovieSubmit}>
        <Forminput
          type="text"
          required
          label="name"
          name="name"
          value={name}
          onChange={movieFieldsChangeHandler}
        />
        <Forminput
          type="date"
          required
          onChange={movieFieldsChangeHandler}
          label="release date"
          name="yearOfRelease"
          value={yearOfRelease}
          min="1920-01-01"
          max="2022-12-31"
          //  in production I would set the max date to today's date
        />
        <Forminput
          type="text"
          required
          label="plot"
          name="plot"
          value={plot}
          onChange={movieFieldsChangeHandler}
        />
        <Forminput
          type="text"
          required
          label="image uri"
          name="poster"
          value={poster}
          onChange={movieFieldsChangeHandler}
        />
        <Forminput
          type="text"
          label="search and add actors"
          name="actorfield"
          onChange={actorSearchChangeHandler}
          value={actorSearchField}
        />
        {actors && (
          <div className="actor_list">
            {actors.map((actor) => (
              <span className="actor" key={actor.id}>
                {actor.name} <FiX onClick={() => removeActor(actor)} />{' '}
              </span>
            ))}
          </div>
        )}
        {actorSearchList && (
          <ul className="actor_search_list">
            {actorSearchList.map((actor) => {
              return (
                <li
                  className="actor"
                  onClick={() => addActor(actor)}
                  key={actor.id}
                >
                  {actor.name}
                </li>
              );
            })}
          </ul>
        )}
        <p
          style={{ fontSize: 8, letterSpacing: -0.5, cursor: 'pointer' }}
          onClick={() => {
            setShowActorForm(true);
            setShowMovieForm(false);
          }}
        >
          didn't find actor?, create actor profile
        </p>

        <Forminput
          type="text"
          label="search producer"
          onChange={producerSearchChangeHandler}
          value={producerSearchField}
        />
        <div>
          {producer.name && producer.name.length > 1 && (
            <h4>
              {producer.name}
              <FiX onClick={() => removeProducer()} />
            </h4>
          )}
        </div>
        {producerSearchList && (
          <ul className="producer_search_list">
            {producerSearchList.map((producer) => {
              return (
                <li
                  className="producer"
                  onClick={() => setProducer(producer)}
                  key={producer.id}
                >
                  {producer.name}
                </li>
              );
            })}
          </ul>
        )}
        <p
          style={{
            fontSize: 8,
            letterSpacing: -0.5,
            cursor: 'pointer',
            marginBottom: 10,
          }}
          onClick={() => {
            setShowProducerForm(true);
            setShowMovieForm(false);
          }}
        >
          didn't find producer?, create producer profile
        </p>
        <button>submit</button>
      </form>
    </div>
  );
};

export default MovieForm;
