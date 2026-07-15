import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { mockClinicBranding, mockReportData } from "@/test/fixtures";
import { HeaderBlock } from "./blocks/HeaderBlock";

describe("HeaderBlock", () => {
  it("renders patient and clinic details in classic layout", () => {
    render(
      <HeaderBlock
        reportData={mockReportData}
        settings={{ layout: "classic", showLogo: true }}
        clinicBranding={mockClinicBranding}
      />,
    );

    expect(screen.getByRole("heading", { name: "Jane Doe's Health Report" })).toBeInTheDocument();
    expect(screen.getAllByText("Sunrise Clinic").length).toBeGreaterThan(0);
    expect(screen.getByText("Dr. Smith")).toBeInTheDocument();
    expect(screen.getByText("Assessment: Jan 15, 2026 · Generated: Jan 20, 2026")).toBeInTheDocument();
  });

  it("uses report data clinic name when branding is absent", () => {
    render(<HeaderBlock reportData={mockReportData} settings={{ layout: "classic", showLogo: false }} />);

    expect(screen.getAllByText("Sunrise Clinic").length).toBeGreaterThan(0);
  });

  it("hides the logo when showLogo is false", () => {
    render(
      <HeaderBlock
        reportData={mockReportData}
        settings={{ layout: "classic", showLogo: false }}
        clinicBranding={mockClinicBranding}
      />,
    );

    expect(screen.queryByAltText("Sunrise Clinic logo")).not.toBeInTheDocument();
  });
});
