import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ArtworkDetail() {
  const [artwork, setArtwork] = useState(null);
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    fetchArtwork();
  }, [id]);

  const fetchArtwork = async () => {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
    const data = await response.json();
    console.log(data);
    setArtwork(data.data);
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div>
      <h1>Artwork Detail</h1>
      {artwork ? (
        <div>
          <h2>{artwork.title}</h2>
          <p>Artist: {artwork.artist_display}</p>
          <p>Date: {artwork.date_display}</p>
          <p>Main Reference Number: {artwork.main_reference_number}</p>
          <img src={artwork.thumbnail ? artwork.thumbnail.lqip : ""} alt={artwork.title} width="200px" height="200px"/>
          <p>Dimensions: {artwork.dimensions ? artwork.dimensions : "No Dimensions"}</p>
          <Link to="/">Back to List</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ArtworkDetail;