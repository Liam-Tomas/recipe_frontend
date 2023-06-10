import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

// Define your styled components here
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom:30px;
`;

const ImageColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  
  img {
    max-width: 100%;
    height: auto;
    max-height:500px; /* Adjust the height as desired */
  }
`;


const TextColumn = styled.div`
  width:30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

function RecipeDetails() {
  const { bookId } = useParams(); // Get the bookId from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true at the start of your fetch function
      try {
        const response = await fetch(`http://localhost:3000/books/${bookId}`);

        if (response.ok) {
          const bookData = await response.json();
          setBook(bookData);
        } else {
          console.error(`Error retrieving book details: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Set loading to false after your fetch function finishes
      }
    };

    fetchData();
  }, [bookId]);

  // While the book details are loading, render a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If book is null, render nothing
  if (!book) {
    return null;
  }

  // If book is not null, render the book details
  return (
    <Container>
      <DetailsContainer>
        <ImageColumn>
          {book.cover_art_url && <img src={book.cover_art_url} alt={book.title || "Book"} />}
        </ImageColumn>
        <TextColumn>
          <h2>{book.title || "Title not available"}</h2>
          <h3>By {book.authors ? book.authors.join(', ') : "Author(s) not available"}</h3>
          <p>{book.summary || "No summary available"}</p>
          <Button onClick={() => navigate(-1)} variant="contained">Back</Button>

        </TextColumn>
      </DetailsContainer>

    </Container>
  );
}

export default RecipeDetails;
