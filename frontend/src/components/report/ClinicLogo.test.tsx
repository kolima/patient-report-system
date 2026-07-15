import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ClinicLogo } from "./ClinicLogo";

describe("ClinicLogo", () => {
  it("renders an image when src is provided", () => {
    render(<ClinicLogo src="/logos/sunrise.svg" alt="Sunrise Clinic logo" name="Sunrise Clinic" />);

    expect(screen.getByRole("img", { name: "Sunrise Clinic logo" }).getAttribute("src")).toContain(
      "/logos/sunrise.svg",
    );
  });

  it("falls back to initials when the image fails to load", () => {
    const { container } = render(<ClinicLogo src="/broken-logo.svg" alt="Broken logo" name="Sunrise Clinic" />);

    const image = container.querySelector("img");
    expect(image).not.toBeNull();
    fireEvent.error(image as HTMLImageElement);

    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByLabelText("Broken logo")).toHaveTextContent("SC");
  });

  it("keeps caller sizing classes without conflicting height utilities", () => {
    render(
      <ClinicLogo src="/logos/sunrise.svg" alt="Sunrise Clinic logo" name="Sunrise Clinic" className="h-10 w-auto" />,
    );

    const image = screen.getByRole("img", { name: "Sunrise Clinic logo" });
    expect(image.className).toContain("h-10");
    expect(image.className).not.toContain("h-auto");
    expect(image.className).toContain("inline-block");
    expect(image.className).toContain("w-fit");
  });

  it("recovers the image preview when a previously broken src is fixed", () => {
    const { container, rerender } = render(
      <ClinicLogo src="/broken-logo.svg" alt="Sunrise Clinic logo" name="Sunrise Clinic" />,
    );

    fireEvent.error(container.querySelector("img") as HTMLImageElement);
    expect(screen.getByLabelText("Sunrise Clinic logo")).toHaveTextContent("SC");

    rerender(<ClinicLogo src="/logos/sunrise.svg" alt="Sunrise Clinic logo" name="Sunrise Clinic" />);

    expect(screen.getByRole("img", { name: "Sunrise Clinic logo" }).getAttribute("src")).toContain(
      "/logos/sunrise.svg",
    );
  });

  it("returns null when there is no src and no name", () => {
    const { container } = render(<ClinicLogo src="" alt="" />);

    expect(container).toBeEmptyDOMElement();
  });
});
