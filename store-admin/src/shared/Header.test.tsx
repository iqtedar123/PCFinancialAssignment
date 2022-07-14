import { fireEvent, render, screen } from "@testing-library/react";
import * as API from "./api";
import Header from "./Header";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

const logoutSpy = jest.spyOn(API, "logout");

describe("Header", () => {
  it("renders", () => {
    render(<Header />);
    expect(screen.getByTestId(/header/i)).toBeInTheDocument();
    expect(screen.getByTestId(/home/i)).toBeInTheDocument();
    expect(screen.getByTestId(/logout/i)).toBeInTheDocument();
  });
  it("handles logout", async () => {
    await render(<Header />);
    fireEvent.click(screen.getByTestId(/logout/i));
    expect(logoutSpy).toHaveBeenCalled();
    // expect(mockedUsedNavigate).toHaveBeenCalled();
  });
});
