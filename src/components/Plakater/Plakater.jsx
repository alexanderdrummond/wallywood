import React, { useEffect, useState, useCallback } from 'react';
import './Plakater.css';

function Plakater() {
  const [genres, setGenres] = useState([]);
  const [posters, setPosters] = useState([]);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortType, setSortType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('session'));
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const url = selectedGenre ? `http://localhost:4000/poster/list/${selectedGenre}` : 'http://localhost:4000/poster/list';
    
    fetch(url)
      .then(response => response.json())
      .then(data => setPosters(data));
  }, [selectedGenre]);

  useEffect(() => {
    fetch('http://localhost:4000/genre')
      .then(response => response.json())
      .then(data => setGenres(data));

    fetch('http://localhost:4000/poster/list')
      .then(response => response.json())
      .then(data => setPosters(data));

    const session = JSON.parse(localStorage.getItem('session'));
    setIsLoggedIn(!!session);
  }, []);

  const showPosterDetails = useCallback((poster) => {
    setSelectedPoster(poster);
  }, []);
  

  useEffect(() => {
    if (selectedPoster?.slug) {
      fetch(`http://localhost:4000/poster/details/${selectedPoster.slug}`)
        .then(response => response.json())
        .then(data => setSelectedPoster(data));
    }
  }, [selectedPoster]);

  const addToCart = (poster) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
   
    const existingPosterIndex = cart.findIndex((item) => item.poster_id === poster.poster_id);
    if (existingPosterIndex > -1) {
      cart[existingPosterIndex].quantity += quantity;
    } else {
      cart.push({ ...poster, quantity });
    }
   
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const filteredPosters = posters
  .filter(poster => (minPrice !== null ? poster.price >= minPrice : true))
  .filter(poster => (maxPrice !== null ? poster.price <= maxPrice : true))
  .filter(poster => poster.name.toLowerCase().includes(searchQuery.toLowerCase()))
  .sort((a, b) => {
    switch (sortType) {
      case 'priceHighToLow':
        return b.price - a.price;
      case 'priceLowToHigh':
        return a.price - b.price;
      case 'title':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="plakater-container">
      <div className="header-section">
        <h1>Plakater</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select className="sort-dropdown" onChange={(e) => setSortType(e.target.value)}>
            <option value="">Sortér</option>
            <option value="priceHighToLow">Pris: Høj til Lav</option>
            <option value="priceLowToHigh">Pris: Lav til høj</option>
            <option value="title">Titel</option>
          </select>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '5px' }}
          />
        </div>
      </div>
      <div className="main-content">
        <div className="filter-section">
          <h2>Filtre</h2>
          <h3>Genre</h3>
          <ul>
            {genres.map((genre) => (
              <li
                key={genre.id}
                className={selectedGenre === genre.slug ? 'selected-genre' : ''}
                onClick={() => setSelectedGenre(genre.slug)}
              >
                {genre.title}
              </li>
            ))}
          </ul>
          <h3>Prisområde</h3>
          <div className="price-filter">
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>
        </div>

        <div className="movie-cards-section">
        {selectedPoster ? (
  <div className="details-container">
    <button onClick={(e) => { e.stopPropagation(); setSelectedPoster(null); }}>Go Back</button>
    <div className="details-section" onClick={() => showPosterDetails(selectedPoster)}>
      <img src={selectedPoster.image} alt={selectedPoster.name} className="details-image"/>
      <div className="details-info">
        <h2>{selectedPoster.name}</h2>
        <p>{selectedPoster.description}</p>
        <p>Størrelse: {selectedPoster.width} x {selectedPoster.height} cm</p>
        <p>Varenummer (SKU): {selectedPoster.poster_id}</p>
        <p>{selectedPoster.price} DKK</p>
        <div className="action-container">
          <input type="number" value={quantity} min="1" onChange={(e) => setQuantity(parseInt(e.target.value))} className="quantity-input" />
          <button onClick={() => addToCart(selectedPoster)}>Læg i kurv</button>
          <p className="stock-info">{selectedPoster.stock} på lager</p>
        </div>
      </div>
    </div>
  </div>
) : (
  <div className="grid">
    {filteredPosters.map((poster) => (
      <div key={poster.id} className="movie-card" onClick={() => showPosterDetails(poster)}>
        <img src={poster.image} alt={poster.name} />
        <h3>{poster.name}</h3>
        <p>{poster.price} DKK</p>
        <button onClick={(e) => { e.stopPropagation(); addToCart(poster); }}>Læg i kurv</button>
      </div>
    ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Plakater;
