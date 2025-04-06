import React from 'react';

const Review = () => {
    return (
        <div id="review" style={{ padding: 20 }}>
            <h1 id="write">WRITE YOUR REVIEW</h1><br />
            <textarea name="review" id="reviews" style={{ width: '100%', height: 150 }}></textarea>
        </div>
    );
};

export default Review;
