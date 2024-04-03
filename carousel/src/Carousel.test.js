import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel from './Carousel';
import TEST_IMAGES from './_testCommon.js';

describe("Carousel Component Tests", () => {

  // Smoke test
  it('renders the Carousel component without crashing', () => {
    render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
  });

  // Snapshot test
  it('matches the snapshot for Carousel component', () => {
    const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("works when you click on the right arrow", function() {
    const { container } = render(
      <Carousel
        photos={TEST_IMAGES}
        title="images for testing"
      />
    );
    // expect the first image to show, but not the second
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();
  });
});

describe("Carousel Component Arrow Functionality", () => {
  it("moves to the previous image when clicking the left arrow on the second image", function() {
    const { container } = render(
      <Carousel
        photos={TEST_IMAGES}
        title="Test Carousel"
      />
    );

    // Makes sure we are on first image
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).toBeInTheDocument();

    // Moves forward in carousel to the second image & verifies that we've moved to second image
    const rightArrow = container.querySelector(".bi-arrow-right-circle");
    fireEvent.click(rightArrow);
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();

    // Attempts to move back to first image w/ left arrow
    const leftArrow = container.querySelector(".bi-arrow-left-circle");
    fireEvent.click(leftArrow);

    // Verifies that carousel actually goes back to prev image when left arrow is clicked
    expect(
      container.querySelector('img[alt="testing image 1"]'));
    expect(
      container.querySelector('img[alt="testing image 2"]'));
  });
});

describe("Carousel Component - Arrow Visibility", () => {
  it("hides the left arrow when on the first image", () => {
    const { queryByTestId } = render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
    expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
  });

  it("hides the right arrow when on the last image", () => {
    const { queryByTestId } = render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
    expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
  });
});