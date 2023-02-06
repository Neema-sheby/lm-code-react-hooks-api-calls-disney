/////////////////////////////////////////////////////////////////////////////////////////

import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import App from "./App";

/////////////////////////////////////////////////////////////////////////////////////////

//---Test 1-------------------------

it("renders The World of Disney title", () => {
  render(<App />);
  const titleElement = screen.getByText(/The World of Disney/i);
  expect(titleElement).toBeInTheDocument();
});

//---Test 2-------------------------

it("checks if the button 'Show Favourite' toggles to 'Show All and viceversa'", async () => {
  const user = UserEvent.setup();

  render(<App />);

  const buttonShow = screen.getByText(/Show Favourites/i);

  expect(buttonShow).toHaveTextContent(/Show Favourites/i);

  await user.click(buttonShow);

  expect(buttonShow).toHaveTextContent(/Show All/i);

  await user.click(buttonShow);

  expect(buttonShow).toHaveTextContent(/Show Favourites/i);
});
