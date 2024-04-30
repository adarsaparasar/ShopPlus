import React, { useState , useEffect } from 'react';
import axios from 'axios';

const Review = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    // Fetch data from the Express API when the component mounts
    axios.get('https://shopplus-oej3.onrender.com/api/v1/reviews')
      .then(response => {       
        setReviews(response.data);
      })
      .catch(error => {       
        alert('hello there is error');
        console.error('Error fetching reviews:', error);
      });
  }, []); 
  useEffect(() => {
    const calculateAverageRating = (reviews) => {
      if (reviews.length === 0) {
        return 0;
      }
  
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      return averageRating.toFixed(2);;
    };
  
    const average = calculateAverageRating(reviews);
    setAverageRating(average);
  }, [reviews]);
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://shopplus-oej3.onrender.com/api/v1/reviews', { rating, reviewText });
      alert('Review submitted successfully!');
      setRating(0);
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
       alert('Error submitting review. Please try again later.');
    }
  };

  const stars = [1, 2, 3, 4, 5];


  return (
    <>
      <p>Average Rating: {averageRating}</p>
      <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputGroup}>
        <label htmlFor="rating" style={styles.label}>Rating:</label>
        <div style={styles.starContainer}>
          {stars.map((value) => (
            <Star key={value} filled={value <= rating} onClick={() => handleRatingChange(value)} />
          ))}
          </div>
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="reviewText" style={styles.label}>Review:</label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={handleReviewTextChange}
          rows={4}
          cols={50}
          style={styles.textarea}
        />
      </div>
      <button type="submit" style={styles.submitButton}>Submit </button>
      </form>
      
    
      <ul style={styles.reviewsList}>        
        {reviews.map(review => (
          <li key={review._id} style={styles.reviewItem}>
            <p>Rating: {review.rating}</p>
             <p>Review: {review.reviewText}</p>
            <hr style={styles.hr}/>
          </li>
          ))}
        </ul>
        
      </>

  );
};

const Star = ({ filled, onClick }) => {
  return (
    <span style={styles.star} onClick={onClick}>
      {filled ? '★' : '☆'}
    </span>
  );
};

const styles = {
  form: {
    maxWidth: 'auto',
    margin:'0.5rem' ,
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  starContainer: {
    display: 'flex',
  },
  star: {
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  reviewsList: {
    listStyle: 'none',
    padding: 0,
  },
  reviewItem: {
    marginBottom: '20px',
  },
  hr: {
    borderTop: '1px solid #ccc',
  },
};

export default Review;
