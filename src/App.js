import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const fetchTours = async () => {
    // const response = await fetch(url);
    // const tours = awiat response.json();
    const { data } = await axios(url);
    const tours = data;
    setLoading(false);
    setTours(tours);
  };
  const handleRemove = (id) => {
    let newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };
  useEffect(() => {
    fetchTours();
  }, []);
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No Tours Left!</h2>
          <button className="btn" onClick={fetchTours}>
            Refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} handleRemove={handleRemove} />
    </main>
  );
};

export default App;
