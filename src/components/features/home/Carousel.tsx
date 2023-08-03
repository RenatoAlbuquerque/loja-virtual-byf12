import React from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { imageCarousel } from '@/constants/mockImageCrousel';
import { Box, useMediaQuery } from '@mui/material';

export const DemoCarousel = () => {
  const isMD = useMediaQuery('(max-width:640px)');

  return (
    <Box
      width="100%"
      my={4}
      borderTop="3px solid black"
      borderBottom="3px solid black"
      display={isMD ? 'none' : 'block'}
    >
      <Carousel
        autoPlay
        centerMode
        showArrows={false}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        emulateTouch={false}
        interval={3000}
        infiniteLoop
        centerSlidePercentage={40}
      >
        {imageCarousel.map((item: any) => (
          <img src={item.src} key={item.id} height={300} />
        ))}
      </Carousel>
    </Box>

  );
};


