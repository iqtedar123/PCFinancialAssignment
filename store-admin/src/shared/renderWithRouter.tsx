import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";

export const renderWithRouter = (Comp: () => EmotionJSX.Element) =>
  render(<BrowserRouter>{Comp()}</BrowserRouter>);
