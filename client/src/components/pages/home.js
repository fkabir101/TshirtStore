import React from 'react';
import LargeShirtCard from '../shirtCards/largeCard'

function HomePage(){
  return(
    <div class = ".backgroundColor">
      <LargeShirtCard
        name = 'Shirt'
        price = '9.99'
      />
    </div>
  )
}

export default HomePage;