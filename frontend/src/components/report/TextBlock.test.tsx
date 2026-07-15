import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TextBlock } from "./blocks/TextBlock";

describe("TextBlock", () => {
  it("renders title and custom text", () => {
    render(
      <TextBlock
        reportData={{} as never}
        settings={{
          title: "Notes",
          customText: "Follow up in six weeks.",
        }}
      />,
    );

    expect(screen.getByRole("heading", { name: "Notes" })).toBeInTheDocument();
    expect(screen.getByText("Follow up in six weeks.")).toBeInTheDocument();
  });

  it("returns null when there is no content", () => {
    const { container } = render(<TextBlock reportData={{} as never} settings={{}} />);

    expect(container).toBeEmptyDOMElement();
  });
});
