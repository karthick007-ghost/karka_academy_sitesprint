import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";

function ConsumerComponent() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <span data-testid="resolved-theme">{resolvedTheme}</span>
      <button data-testid="btn-dark" onClick={() => setTheme("dark")}>
        Dark
      </button>
      <button data-testid="btn-light" onClick={() => setTheme("light")}>
        Light
      </button>
      <button data-testid="btn-system" onClick={() => setTheme("system")}>
        System
      </button>
      <button data-testid="btn-toggle" onClick={() => toggleTheme()}>
        Toggle
      </button>
    </div>
  );
}

describe("Theme System (ThemeProvider & ThemeToggle)", () => {
  beforeEach(() => {
    // Clear document cookie and data-theme
    document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.style.colorScheme = "";

    // Clear any theme-color meta tag
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.remove();

    // Mock matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("initializes with default light theme and sets DOM attributes", async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ConsumerComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("current-theme").textContent).toBe("light");
    expect(screen.getByTestId("resolved-theme").textContent).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(document.documentElement.style.colorScheme).toBe("light");

    const meta = document.querySelector('meta[name="theme-color"]');
    expect(meta?.getAttribute("content")).toBe("#F7F3EC");
  });

  it("updates DOM and cookie when theme changes to dark", async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ConsumerComponent />
      </ThemeProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId("btn-dark"));
    });

    expect(screen.getByTestId("current-theme").textContent).toBe("dark");
    expect(screen.getByTestId("resolved-theme").textContent).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
    expect(document.cookie).toContain("theme=dark");

    const meta = document.querySelector('meta[name="theme-color"]');
    expect(meta?.getAttribute("content")).toBe("#0B0F14");
  });

  it("toggles between light and dark seamlessly", async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ConsumerComponent />
      </ThemeProvider>
    );

    // Initial state is light
    expect(screen.getByTestId("resolved-theme").textContent).toBe("light");

    // Toggle to dark
    await act(async () => {
      fireEvent.click(screen.getByTestId("btn-toggle"));
    });
    expect(screen.getByTestId("resolved-theme").textContent).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

    // Toggle back to light
    await act(async () => {
      fireEvent.click(screen.getByTestId("btn-toggle"));
    });
    expect(screen.getByTestId("resolved-theme").textContent).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("ThemeToggle renders with proper accessible attributes and switches theme on click", async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole("button", { name: /switch to dark theme/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-pressed", "false");

    await act(async () => {
      fireEvent.click(toggleButton);
    });

    const darkToggleButton = screen.getByRole("button", { name: /switch to light theme/i });
    expect(darkToggleButton).toBeInTheDocument();
    expect(darkToggleButton).toHaveAttribute("aria-pressed", "true");
  });
});
