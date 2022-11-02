import { useState, useEffect } from 'react';
import './movie-create.styles.scss';
import useRequest from '../../hooks/use-request';

import React from 'react';
import MovieForm from '../../components/movie-form/movie-form.component';
import { useNavigate } from 'react-router-dom';
import ActorForm from '../../components/actor-form/actor-form.component';
import ProducerForm from '../../components/producer-form/producer-form.component';
const INITIAL_MOVIE_FORM_FIELDS = {
  name: '',
  yearOfRelease: '',
  plot: '',
  poster: '',
  actors: [],
  producer: {},
};
const INITIAL_ACTOR_FORM_FIELDS = {
  name: '',
  dob: '',
  gender: '',
  bio: '',
};
const INITIAL_PRODUCER_FORM_FIELDS = {
  name: '',
  dob: '',
  gender: '',
  bio: '',
};
const INITIAL_SHOW_FORM_STATE = {
  showMovieForm: true,
  showActorForm: false,
  showProducerForm: false,
};

const MovieCreate = () => {
  const [movieFormFields, setMovieFormFields] = useState(
    INITIAL_MOVIE_FORM_FIELDS
  );
  const [actorFormFields, setActorFormFields] = useState(
    INITIAL_ACTOR_FORM_FIELDS
  );
  const [producerFormFields, setProducerFormFields] = useState(
    INITIAL_PRODUCER_FORM_FIELDS
  );
  const [actorSearchField, setActorSearchField] = useState('');
  const [producerSearchField, setProducerSearchField] = useState('');
  const [actorSearchList, setActorSearchList] = useState([]);
  const [producerSearchList, setProducerSearchList] = useState([]);
  const { name, yearOfRelease, plot, poster, actors, producer } =
    movieFormFields;
  const [showForm, setShowForm] = useState(INITIAL_SHOW_FORM_STATE);

  const navigate = useNavigate();
  const { doRequest: searchActorRequest, errors: searchActorErrors } =
    useRequest({
      url: 'http://localhost:5000/api/searchactor',
      body: {
        searchActorField: actorSearchField,
      },
      method: 'post',
      onSuccess: (data) => setActorSearchList(data.actors),
    });
  const { doRequest: searchProducerRequest, errors: searchProducerErrors } =
    useRequest({
      url: 'http://localhost:5000/api/searchproducer',
      body: {
        searchProducerField: producerSearchField,
      },
      method: 'post',
      onSuccess: (data) => setProducerSearchList(data.producers),
    });
  const { doRequest: createActorRequest, errors: createActorErrors } =
    useRequest({
      url: 'http://localhost:5000/api/actor',
      method: 'post',
      body: actorFormFields,
      onSuccess: () => {
        setActorFormFields(INITIAL_ACTOR_FORM_FIELDS);
        setShowActorForm(false);
        setShowMovieForm(true);
      },
    });

  const { doRequest: createMovieRequest, errors: movieErrors } = useRequest({
    url: 'http://localhost:5000/api/movie',
    method: 'post',
    body: {
      name,
      yearOfRelease,
      plot,
      poster,
      actors: actors.map((actor) => actor.id),
      producer: producer.id,
    },
    onSuccess: () => navigate('/'),
  });
  const { doRequest: createProducerRequest, errors: createProducerErrors } =
    useRequest({
      url: 'http://localhost:5000/api/producer',
      method: 'post',
      body: producerFormFields,
      onSuccess: () => {
        setProducerFormFields(INITIAL_PRODUCER_FORM_FIELDS);
        setShowProducerForm(false);
        setShowMovieForm(true);
      },
    });
  useEffect(() => {
    if (actorSearchField === '') {
      setActorSearchList([]);
      return;
    }
    searchActorRequest();
  }, [actorSearchField]);
  useEffect(() => {
    if (producerSearchField === '') {
      setProducerSearchList([]);
      return;
    }
    searchProducerRequest();
  }, [producerSearchField]);

  const removeActor = (actor) => {
    let { actors } = movieFormFields;
    actors = actors.filter((currentActor) => currentActor.id !== actor.id);
    setMovieFormFields({ ...movieFormFields, actors });
  };

  const addActor = (actor) => {
    const { actors } = movieFormFields;
    const isActorAlreadyPresent = actors.find(
      (currentActor) => currentActor.id === actor.id
    );
    if (isActorAlreadyPresent) {
      return;
    }
    setMovieFormFields({
      ...movieFormFields,
      actors: [...actors, { name: actor.name, id: actor.id }],
    });
  };
  const movieFieldsChangeHandler = (event) => {
    const { name, value } = event.target;
    setMovieFormFields({ ...movieFormFields, [name]: value });
  };
  const actorFieldsChangeHandler = (event) => {
    const { name, value } = event.target;
    setActorFormFields({ ...actorFormFields, [name]: value });
  };
  const producerFieldsChangeHandler = (event) => {
    const { name, value } = event.target;

    setProducerFormFields({ ...producerFormFields, [name]: value });
  };

  const actorSearchChangeHandler = (event) => {
    setActorSearchField(event.target.value);
  };
  const producerSearchChangeHandler = (event) => {
    setProducerSearchField(event.target.value);
  };
  const setProducer = (producer) => {
    setMovieFormFields({
      ...movieFormFields,
      producer: { id: producer.id, name: producer.name },
    });
  };

  const setShowMovieForm = () => {
    setShowForm({
      showMovieForm: true,
      showActorForm: false,
      showProducerForm: false,
    });
  };
  const setShowActorForm = () => {
    setShowForm({
      showMovieForm: false,
      showActorForm: true,
      showProducerForm: false,
    });
  };
  const setShowProducerForm = () => {
    setShowForm({
      showMovieForm: false,
      showActorForm: false,
      showProducerForm: true,
    });
  };
  const removeProducer = (producer) => {
    setMovieFormFields({ ...movieFormFields, producer: {} });
  };
  const handleCreateActorSubmit = (event) => {
    event.preventDefault();
    createActorRequest();
  };
  const handleCreateProducerSubmit = (event) => {
    event.preventDefault();
    createProducerRequest();
  };
  const handleMovieSubmit = (event) => {
    event.preventDefault();
    createMovieRequest();
  };
  const { showMovieForm, showActorForm, showProducerForm } = showForm;
  return (
    <div>
      {showMovieForm && (
        <MovieForm
          movieFormFields={movieFormFields}
          movieFieldsChangeHandler={movieFieldsChangeHandler}
          actorSearchField={actorSearchField}
          producerSearchField={producerSearchField}
          actorSearchChangeHandler={actorSearchChangeHandler}
          producerSearchChangeHandler={producerSearchChangeHandler}
          actorSearchList={actorSearchList}
          producerSearchList={producerSearchList}
          showActorForm={showActorForm}
          addActor={addActor}
          removeActor={removeActor}
          setProducer={setProducer}
          removeProducer={removeProducer}
          createMovieRequest={createMovieRequest}
          createMovie={true}
          setShowActorForm={setShowActorForm}
          setShowMovieForm={setShowMovieForm}
          setShowProducerForm={setShowProducerForm}
          handleMovieSubmit={handleMovieSubmit}
          movieErrors={movieErrors}
        />
      )}
      {showActorForm && (
        <div>
          <button
            onClick={() => {
              setShowMovieForm();
            }}
          >
            show movie Form
          </button>
          <ActorForm
            actorFormFields={actorFormFields}
            actorFieldsChangeHandler={actorFieldsChangeHandler}
            handleCreateActorSubmit={handleCreateActorSubmit}
          />
        </div>
      )}
      {showProducerForm && (
        <div>
          <button
            onClick={() => {
              setShowMovieForm();
            }}
          >
            show movie form
          </button>

          <ProducerForm
            producerFormFields={producerFormFields}
            producerFieldsChangeHandler={producerFieldsChangeHandler}
            handleCreateProducerSubmit={handleCreateProducerSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default MovieCreate;
