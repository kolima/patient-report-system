import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { mockClinicBranding, mockReportData, mockTemplateConfig } from "@/test/fixtures";
import { ReportRenderer } from "./ReportRenderer";

describe("ReportRenderer", () => {
  it("renders visible blocks from the template config", () => {
    render(
      <ReportRenderer config={mockTemplateConfig} reportData={mockReportData} clinicBranding={mockClinicBranding} />,
    );

    expect(screen.getByRole("heading", { name: "Jane Doe's Health Report" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Your Health Status" })).toBeInTheDocument();
    expect(screen.getByText(/Your metabolic markers are improving steadily/)).toBeInTheDocument();
  });

  it("skips hidden blocks", () => {
    const config = {
      ...mockTemplateConfig,
      blocks: mockTemplateConfig.blocks.map((block) =>
        block.type === "summary" ? { ...block, visible: false } : block,
      ),
    };

    render(<ReportRenderer config={config} reportData={mockReportData} clinicBranding={mockClinicBranding} />);

    expect(screen.queryByRole("heading", { name: "Your Health Status" })).not.toBeInTheDocument();
  });

  it("applies compact density spacing class", () => {
    const config = {
      ...mockTemplateConfig,
      theme: { ...mockTemplateConfig.theme, density: "compact" as const },
    };

    const { container } = render(
      <ReportRenderer config={config} reportData={mockReportData} clinicBranding={mockClinicBranding} />,
    );

    expect(container.querySelector("article")).toHaveClass("space-y-6");
  });
});
