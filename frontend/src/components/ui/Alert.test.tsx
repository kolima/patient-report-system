import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders message content with alert role", () => {
    render(<Alert variant="error">Something went wrong</Alert>);

    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
  });

  it("calls retry and dismiss handlers", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    const onDismiss = vi.fn();

    render(
      <Alert onRetry={onRetry} onDismiss={onDismiss}>
        Try again
      </Alert>,
    );

    await user.click(screen.getByRole("button", { name: "Retry" }));
    await user.click(screen.getByRole("button", { name: "Dismiss" }));

    expect(onRetry).toHaveBeenCalledOnce();
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
