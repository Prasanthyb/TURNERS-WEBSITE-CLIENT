import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ThumbsUp } from 'phosphor-react';
import "./CSS/App.css";

// Environment variables
const ApiKey = process.env.REACT_APP_API_KEY;
const AzureEndpoint = process.env.REACT_APP_AZURE_ENDPOINT;

function List() {
  // State variables
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [data, setData] = useState(null);
  const [image, setImage] = useState('');
  const [displayMsg, setDisplayMsg] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [similarCarsData, setSimilarCarsData] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  // Add car to wishlist
  const addToWishlist = (car) => {
    setWishlist((prevWishlist) => [...prevWishlist, car]);
  };

  // Remove car from wishlist
  const removeFromWishlist = (index) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = [...prevWishlist];
      updatedWishlist.splice(index, 1);
      return updatedWishlist;
    });
  };

  // Handle input change for image URL
  const handleOnChange = (e) => {
    setImage(e.target.value);
  };

  // Handle button click to analyze the image
  const onButtonClick = async (e) => {
    e.preventDefault();

    if (image.trim() === '') {
      alert('Please enter an image URL.');
      return;
    }

    setData(null);
    setDisplayMsg('Loading...');

    if (!image.match(/\.(jpg|jpeg|png|webp)$/)) {
      setImage('');
      setDisplayMsg('Invalid image format or URL');
      return;
    }

    try {
      // Fetch options for image analysis
      const fetchOptions = {
        method: 'POST',
        timeout: 50000,
        headers: {
          'Ocp-Apim-Subscription-Key': ApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: image,
        }),
      };

      // Fetch image analysis data from Azure Cognitive Services
      const response = await fetch(
        `${AzureEndpoint}computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags,caption`,
        fetchOptions,
      );

      const parsedData = await response.json();
      setData(parsedData);
      setParsedData(parsedData);

      console.log(parsedData.modelVersion);
      console.log(parsedData.captionResult.text);
      console.log(parsedData.metadata.width);
      console.log(parsedData.metadata.height);
    } catch (error) {
      console.error('There is an error during fetch:', error);
      setDisplayMsg('Sorry, there was an error.');
    }
  };

  // Get similar cars based on the caption
  const getSimilarCars = () => {
    if (!parsedData || !parsedData.captionResult) {
      console.error('Caption result not available.');
      return;
    }

    const sentence = parsedData.captionResult.text;
    const words = sentence.split(' ');
    const secondWord = words[1];

    axios.post('http://localhost:4000/products/cars', { data: secondWord }).then((response) => {
      console.log(response.data);
      setSimilarCarsData(response.data.products);
    });
  };

  return (
    <div>
      {/* Navigation bar */}
      <header className={`navbar ${showMobileMenu ? 'show-mobile-menu' : ''}`}>
        <nav className="navbar">
          <a href="#" className="logo">
            <span className="logo-text">TURNERS</span>
          </a>
          {/* Navigation links */}
          <ul className="menu-links">
            <li><a href="#">Turners Business</a></li>
            <li><a href="#">Explore</a></li>
            <li className="language-item">
              <a href="#">
                <span className="material-symbols-outlined">language</span>
                English
              </a>
            </li>
            <li><a href="#">Become a Customer</a></li>
            <li className="join-btn"><Link to="/">Home</Link></li>
            <span id="close-menu-btn" className="material-symbols-outlined" onClick={closeMobileMenu}>close</span>
          </ul>
          <span id="hamburger-btn" className="material-symbols-outlined" onClick={toggleMobileMenu}>menu</span>
        </nav>
      </header>

      {/* Main content container */}
      <div className="container" style={{ backgroundColor: 'black', width: '2000px', marginLeft: '30px' }}>
        {/* Header */}
        <div>
          <div className="header">
            <h1 style={{ backgroundColor: 'black', fontSize: '48px', color: 'white', padding: '8px', display: 'block' }}>
              Choose Your Favourite Car
            </h1>
          </div>
        </div>

        {/* Input section */}
        <div>
          <div className="input-section">
            <input
              id="imageInput"
              className="inputbox"
              placeholder="Please upload Your favourite Car Image...."
              value={image}
              onChange={handleOnChange}
              style={{
                padding: '15px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                outline: 'none',
                width:'670px',fontSize: '25px'
              }}
            />
            <button className="button" onClick={onButtonClick}
              style={{
                padding: '7px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                fontSize: '18px',
                outline: 'none',
                backgroundColor: 'brown',
                color: 'white'
              }}
            >
              Upload
            </button>
          </div>
        </div>

        {/* Result section */}
        <section className="result-section">
          {image && <img src={image} width={320} height={180} alt={image} />}
          <p className="textclass" style={{
            outline: 'none',
            color: 'white'
          }}>{data && data.captionResult.text}</p>
        </section>

        {/* Get similar cars button */}
        <button onClick={getSimilarCars}
          style={{
            padding: '7px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            fontSize: '20px',
            outline: 'none',
            backgroundColor: 'skyblue',
            color: 'black'
          }}
        >Get Similar Cars from Turners</button>

        {/* Display similar cars */}
        {similarCarsData && (
          <div className="similar-cars-section">
            <h2 style={{
              padding: '7px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
              fontSize: '20px',
              outline: 'none',
              backgroundColor: 'black',
              color: 'white'
            }}>
              Similar Cars from Turners</h2>
            <ul className="similar-cars-list">
              {similarCarsData.map((car) => (
                <li key={car.id} className="similar-car-item">
                  <div>
                    <img src={car.image} alt={car.name} width={100} height={80} />
                  </div>
                  <div style={{
                    padding: '7px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: 'black',
                    color: 'white'
                  }}>
                    <p>Name: {car.name}</p>
                    <p>Color: {car.color}</p>
                    <p>Amount: ${car.amount}</p>
                    <button onClick={() => addToWishlist(car)}>Add to Wishlist</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Wishlist section */}
        <div className="wishlist-section" style={{ backgroundColor: 'lightgreen' }}>
          <h2 style={{ color: 'red' }}>
            <ThumbsUp size={32} />
            Wishlist{' '}
          </h2>
          <ul>
            {wishlist.map((wishlistItem, index) => (
              <li key={index}>
                <img src={wishlistItem.image} alt={wishlistItem.name} width={100} height={80} />
                <p>Name: {wishlistItem.name}</p>
                <p>Color: {wishlistItem.color}</p>
                <p>Amount: ${wishlistItem.amount}</p>
                <button onClick={() => removeFromWishlist(index)}>Remove from Wishlist</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default List;
