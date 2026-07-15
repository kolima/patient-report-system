import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormField } from "./FormField";

describe("FormField", () => {
  it("associates label with input and shows description", () => {
    render(
      <FormField label="Clinic name" htmlFor="clinic-name" description="Shown on patient reports">
        <input id="clinic-name" />
      </FormField>,
    );

    expect(screen.getByLabelText("Clinic name")).toBeInTheDocument();
    expect(screen.getByText("Shown on patient reports")).toBeInTheDocument();
  });

  it("shows validation errors", () => {
    render(
      <FormField label="Email" error="Enter a valid email address">
        <input />
      </FormField>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email address");
  });
});
