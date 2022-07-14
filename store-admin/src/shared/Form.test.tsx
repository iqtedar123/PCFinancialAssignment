import { render, screen } from "@testing-library/react";
import Form from "./Form";

const Children = () => <div data-testid="child">Child</div>;
const onSubmit = jest.fn();

const props = {
  onSubmit,
  disabled: false,
  submitLabel: "Submit",
  readOnly: false,
};
describe("Form", () => {
  it("renders", () => {
    render(
      <Form {...props}>
        <Children />
      </Form>
    );
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    expect(screen.getByText(/Child/i)).toBeInTheDocument();
  });
});
