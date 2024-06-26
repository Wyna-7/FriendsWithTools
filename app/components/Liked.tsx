
'use client'
import React, { useState } from 'react';

const Liked = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = () => {
    setIsLiked(!isLiked); // Toggle the isLiked state
		//TODO If liked send make it available on my Wishlist
  };

  return (
    <div>
      <div className="favorite-icon" onClick={handleLike}>
        {isLiked ? '❤️' : '🤍'}
      </div>
    </div>
  );
};

export default Liked;
