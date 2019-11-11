import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
 

class Gallery extends React.Component {
  
  state = {
    galleryItems: [1, 2].map((i) => <img src={`/images/shirt${i}.png`} width="500" height="400"></img>),
  }
 
  responsive = {
    0: { items: 1 },
    1024: { items: 1 },
  }
 
  onSlideChange(e) {
    console.debug('Item`s position during a change: ', e.item)
    console.debug('Slide`s position during a change: ', e.slide)
  }
 
  onSlideChanged(e) {
    console.debug('Item`s position after changes: ', e.item)
    console.debug('Slide`s position after changes: ', e.slide)
  }
 
  render() {
    return (
      <AliceCarousel
        items={this.state.galleryItems}
        responsive={this.responsive}
        autoPlayInterval={2000}
        autoPlayDirection="rtl"
        autoPlay={true}
        fadeOutAnimation={true}
        mouseTrackingEnabled={true}
        playButtonEnabled={true}
        disableAutoPlayOnAction={true}
        onSlideChange={this.onSlideChange}
        onSlideChanged={this.onSlideChanged}
      />
    )
  }
}

export default Gallery