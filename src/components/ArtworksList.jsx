import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ArtworksList() {
  const [artworks, setArtworks] = useState([]);
  const [availableCategories, setAavailableCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  // let availableCategories
  useEffect(() => {
    fetchArtworks();
  }, [page, searchTerm, categoryFilter]);


  const fetchArtworks = async () => {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=10`);

    const data = await response.json();
    setArtworks(data.data);
    getUniqueCategories(data.data);
  };


  const getUniqueCategories = (data) => {
    const uniqueCategories = new Set();
  
    data.forEach(obj => {
      obj.category_titles.forEach(category => {
        uniqueCategories.add(category);
      });
    });
    setAavailableCategories(Array.from(uniqueCategories));
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    // console.log(event.target.value)
    setCategoryFilter(event.target.value);
  };

  const filteredArtworks = artworks.filter(artwork => {
    if (categoryFilter && !artwork.category_titles.includes(categoryFilter)) {
      return false;
    }
    if (searchTerm) {
      const titleMatch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatch = artwork.description? artwork.description.toLowerCase().includes(searchTerm.toLowerCase()): "";
      return titleMatch || descriptionMatch;
    }
    return true;
  });

  return (
    <div>
      <h1>Artworks List</h1>
      <div>
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {availableCategories &&  <select value={categoryFilter} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {availableCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
}
      </div>
      {filteredArtworks.length > 0 ? (
        <ul>
          {filteredArtworks.map((artwork) => (
            <li key={artwork.id}>
              <Link to={`/artwork/${artwork.id}`}>
                <p>{artwork.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No artworks found.</p>
      )}
      <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}

export default ArtworksList;
