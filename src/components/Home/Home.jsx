import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:4000/poster/list');
        const moviesData = await response.json();

        if (!Array.isArray(moviesData)) {
          console.error('Unexpected moviesData format:', moviesData);
          return;
        }

        const firstTwoMovies = moviesData.slice(0, 2);
        
        const detailedMovies = await Promise.all(
          firstTwoMovies.map(async (movie) => {
            const detailsResponse = await fetch(`http://localhost:4000/poster/details/${movie.slug}`);
            const movieDetails = await detailsResponse.json();
            return { ...movie, ...movieDetails };
          })
        );

        setMovies(detailedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="home-container">
      <img src="curtain.jpg" alt="Curtain" className="curtain-image" />

      <section className="latest-news">
        <h2 className="news-title">Sidste nyt...</h2>

        <div className="movie-module-container">
          {movies.map((movie) => (
            <div className="movie-module" key={movie.id}>
              <div className="poster"><img src={movie.image} alt={movie.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
              <div className="details">
                <h3 className="movie-title">{movie.name}</h3>
                <div className="badge">{movie?.genres?.[0]?.title ?? 'N/A'}</div>
                <p className="description" dangerouslySetInnerHTML={{ __html: movie.description }}></p>
                <button className="cta-button">Læs mere</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
