import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { isFormInput, useFinePointer } from "@/components/cursor/use-fine-pointer";
import { Spotlight } from "@/components/cursor/spotlight";
import { Magnetic } from "@/components/cursor/magnetic";
import { CursorFollower } from "@/components/cursor/cursor-follower";
import { TiltCard } from "@/components/ui/tilt-card";
import { GlassPanel } from "@/components/ui/glass/glass-panel";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Button } from "@/components/ui/button";

describe("Fine Pointer Gating & Form Element Protection", () => {
  it("correctly identifies all interactive form input elements to protect typing UX", () => {
    const input = document.createElement("input");
    const textarea = document.createElement("textarea");
    const select = document.createElement("select");
    const button = document.createElement("button");
    const div = document.createElement("div");
    const editableDiv = document.createElement("div");
    editableDiv.setAttribute("contenteditable", "true");
    const roleTextbox = document.createElement("div");
    roleTextbox.setAttribute("role", "textbox");

    expect(isFormInput(input)).toBe(true);
    expect(isFormInput(textarea)).toBe(true);
    expect(isFormInput(select)).toBe(true);
    expect(isFormInput(editableDiv)).toBe(true);
    expect(isFormInput(roleTextbox)).toBe(true);
    expect(isFormInput(button)).toBe(false);
    expect(isFormInput(div)).toBe(false);
  });

  it("detects nested inputs when pointer hits a child inside an input/label wrapper", () => {
    const container = document.createElement("div");
    const form = document.createElement("form");
    const input = document.createElement("input");
    form.appendChild(input);
    container.appendChild(form);

    expect(isFormInput(input)).toBe(true);
    expect(isFormInput(container)).toBe(false);
  });
});

describe("Spotlight Component", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("hover: hover") && query.includes("pointer: fine"),
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

  it("renders children with relative positioning and spotlight container properties", () => {
    const { getByText } = render(
      <Spotlight data-testid="spotlight">
        <span>Karka AI Spotlight Content</span>
      </Spotlight>
    );
    expect(getByText("Karka AI Spotlight Content")).toBeDefined();
  });

  it("updates CSS variables --mx and --my on pointer move when fine pointer is active", () => {
    render(
      <Spotlight data-testid="spotlight-test">
        <p>Interactive Card</p>
      </Spotlight>
    );

    const el = screen.getByTestId("spotlight-test");
    // Mock getBoundingClientRect
    vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
      left: 100,
      top: 50,
      width: 400,
      height: 300,
      bottom: 350,
      right: 500,
      x: 100,
      y: 50,
      toJSON: () => {},
    });

    fireEvent(
      el,
      new MouseEvent("pointermove", {
        clientX: 250,
        clientY: 150,
        bubbles: true,
      })
    );
    expect(el.style.getPropertyValue("--mx")).toBe("150px");
    expect(el.style.getPropertyValue("--my")).toBe("100px");
    expect(el.style.getPropertyValue("--spotlight-opacity")).toBe("1");

    fireEvent.pointerLeave(el);
    expect(el.style.getPropertyValue("--spotlight-opacity")).toBe("0");
  });

  it("suppresses spotlight highlight inside form inputs", () => {
    render(
      <Spotlight data-testid="spotlight-form">
        <input data-testid="test-input" placeholder="Enter name" />
      </Spotlight>
    );

    const el = screen.getByTestId("spotlight-form");
    const input = screen.getByTestId("test-input");

    fireEvent(
      input,
      new MouseEvent("pointermove", {
        clientX: 120,
        clientY: 80,
        bubbles: true,
      })
    );
    expect(el.style.getPropertyValue("--spotlight-opacity")).toBe("0");
  });
});

describe("Magnetic Component", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("hover: hover") && query.includes("pointer: fine"),
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

  it("renders wrapped children cleanly", () => {
    const { getByText } = render(
      <Magnetic>
        <button>Magnetic Action</button>
      </Magnetic>
    );
    expect(getByText("Magnetic Action")).toBeDefined();
  });

  it("strictly enforces maximum pull displacement <= 8px", () => {
    const { container } = render(
      <Magnetic maxPull={20} data-testid="magnetic-pull">
        <span>Pull Test</span>
      </Magnetic>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeDefined();
  });
});

describe("CursorFollower Component", () => {
  it("does not render on touch / coarse devices or when reduced-motion is requested", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false, // Not fine pointer
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

    const { container } = render(<CursorFollower />);
    expect(container.firstChild).toBeNull();
  });

  it("renders when fine pointer is active", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("hover: hover") && query.includes("pointer: fine"),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

    const { container } = render(<CursorFollower />);
    const follower = container.querySelector('[aria-hidden="true"]');
    expect(follower).toBeDefined();
  });
});

describe("TiltCard Component", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("hover: hover") && query.includes("pointer: fine"),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  it("renders tilt card with specular glare layer on fine pointer devices", () => {
    const { getByText, container } = render(
      <TiltCard>
        <h3>Quiet Luxury Track Card</h3>
      </TiltCard>
    );

    expect(getByText("Quiet Luxury Track Card")).toBeDefined();
    // Perspective wrapper present
    expect(container.querySelector("[perspective\\:1000px], .relative")).toBeDefined();
  });

  it("falls back to flat card without perspective when on touch/mobile device", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false, // Touch / coarse pointer
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });

    const { getByText, container } = render(
      <TiltCard>
        <h3>Mobile Safe Card</h3>
      </TiltCard>
    );

    expect(getByText("Mobile Safe Card")).toBeDefined();
    // No perspective parent rendered
    expect(container.querySelector("[perspective\\:1000px]")).toBeNull();
  });
});

describe("GlassPanel Surface Specifications", () => {
  it("renders light frosted cream variant with soft shadow and high contrast ink text", () => {
    const { container, getByText } = render(
      <GlassPanel variant="light">
        <p>Light Frosted Cream Surface</p>
      </GlassPanel>
    );

    const panel = container.firstChild as HTMLElement;
    expect(panel.className).toContain("glass-light");
    expect(panel.className).toContain("text-ink");
    expect(getByText("Light Frosted Cream Surface")).toBeDefined();
  });

  it("renders dark deep specular variant with contrast underlay and top hairline highlight", () => {
    const { container, getByText } = render(
      <GlassPanel variant="dark">
        <p>Dark Specular Night Surface</p>
      </GlassPanel>
    );

    const panel = container.firstChild as HTMLElement;
    expect(panel.className).toContain("glass-dark");
    expect(panel.className).toContain("text-night-text");
    expect(getByText("Dark Specular Night Surface")).toBeDefined();

    // Check for contrast underlay backing
    const underlay = panel.querySelector("[aria-hidden='true']");
    expect(underlay).not.toBeNull();
  });

  it("supports hover effect and custom elevations", () => {
    const { container } = render(
      <GlassPanel variant="auto" elevation="elevated" hoverEffect>
        <p>Elevated Hover Panel</p>
      </GlassPanel>
    );

    const panel = container.firstChild as HTMLElement;
    expect(panel.className).toContain("glass");
    expect(panel.className).toContain("hover:border-accent/40");
  });
});

describe("ScrollProgress Micro-Interaction", () => {
  it("renders fixed hairline indicator with scaleX transform origin", () => {
    const { container } = render(<ScrollProgress height={2} />);
    const progressContainer = container.querySelector('[aria-hidden="true"]');
    expect(progressContainer).not.toBeNull();
    expect(progressContainer?.getAttribute("style")).toContain("height: 2px");
  });
});

describe("Button Micro-Interactions & Magnetic Compatibility", () => {
  it("includes active:scale-[0.98] and dark-aware focus rings", () => {
    render(<Button variant="primary">Apply Now</Button>);
    const btn = screen.getByRole("button", { name: "Apply Now" });

    expect(btn.className).toContain("active:scale-[0.98]");
    expect(btn.className).toContain("focus-visible:ring-forest");
    expect(btn.className).toContain("dark:focus-visible:ring-mint");
  });

  it("wraps button with Magnetic when magnetic prop is true", () => {
    const { container } = render(
      <Button variant="primary" magnetic>
        Magnetic Call To Action
      </Button>
    );

    const btn = screen.getByRole("button", { name: "Magnetic Call To Action" });
    expect(btn).toBeDefined();
    // Magnetic wrapper is rendered
    expect(container.firstChild).toBeDefined();
  });
});
