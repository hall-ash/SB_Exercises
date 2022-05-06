import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it(`doesn't crash when rendering`, () => {
  render(<Carousel/>);
});

it('matches snapshot', () => {
  const { asFragment } = render(<Carousel/>);
  expect(asFragment()).toMatchSnapshot();
});

it("moves to the next image when the right arrow is clicked", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it('moves to the prev image when the left arrow is clicked', () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move to second image
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument(); // first image
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument(); // second image

  // move backward in the carousel
  const leftArrow = queryByTestId('left-arrow');
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument(); // first image
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument(); // second image
});

it('hides the left arrow when on the first image', () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  const leftArrow = queryByTestId('left-arrow');
  const rightArrow = queryByTestId('right-arrow');
  const firstImg = queryByAltText("Photo by Richard Pasquarella on Unsplash");

  // expect the first image and right arrow to show, but not the left arrow
  expect(firstImg).toBeInTheDocument(); 
  expect(rightArrow).toBeInTheDocument(); 
  expect(leftArrow).not.toBeInTheDocument(); 

});

it('hides the right arrow when on the last image', () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  const rightArrow = queryByTestId('right-arrow');
  
  // move to last image 
  const totalImgs = 3;
  for (let imgIdx = 0; imgIdx < totalImgs; ++imgIdx) {
    fireEvent.click(rightArrow);
  }

  const leftArrow = queryByTestId('left-arrow');
  const lastImg = queryByAltText("Photo by Josh Post on Unsplash");

  // expect the last image and left arrow to show, but not the right arrow
  expect(lastImg).toBeInTheDocument(); 
  expect(leftArrow).toBeInTheDocument(); 
  expect(rightArrow).not.toBeInTheDocument(); 

})