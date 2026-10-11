import * as React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";
import { PapTimeline, PAP_STEPS } from "@/components/sections/pap/pap-timeline";

class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

describe("Carousel Primitive Component", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("renders with accessible carousel role and aria-roledescription", () => {
    render(
      <Carousel aria-label="Test carousel">
        <CarouselContent>
          <CarouselItem>
            <div>Slide 1 Content</div>
          </CarouselItem>
          <CarouselItem>
            <div>Slide 2 Content</div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    );

    const carousel = screen.getByRole("region", { name: "Test carousel" });
    expect(carousel).toBeDefined();
    expect(carousel.getAttribute("aria-roledescription")).toBe("carousel");
  });

  it("renders screen reader live region announcement", () => {
    const { container } = render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div>Slide 1</div>
          </CarouselItem>
          <CarouselItem>
            <div>Slide 2</div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeDefined();
    expect(liveRegion?.textContent).toContain("Slide 1 of 2");
  });

  it("renders items with slide roledescription and group role", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div>Course 1</div>
          </CarouselItem>
          <CarouselItem>
            <div>Course 2</div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    const slides = screen.getAllByRole("group");
    expect(slides.length).toBe(2);
    expect(slides[0].getAttribute("aria-roledescription")).toBe("slide");
  });

  it("handles keyboard navigation with Home and End keys", () => {
    render(
      <Carousel loop aria-label="Keyboard carousel">
        <CarouselContent>
          <CarouselItem>
            <div>Slide 1</div>
          </CarouselItem>
          <CarouselItem>
            <div>Slide 2</div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    const carousel = screen.getByRole("region", { name: "Keyboard carousel" });
    fireEvent.keyDown(carousel, { key: "End" });
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();

    fireEvent.keyDown(carousel, { key: "Home" });
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it("renders Next/Prev buttons with minimum 44px touch targets", () => {
    render(
      <Carousel loop>
        <CarouselContent>
          <CarouselItem>
            <div>Item 1</div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );

    const prevBtn = screen.getByLabelText("Previous slide");
    const nextBtn = screen.getByLabelText("Next slide");

    expect(prevBtn).toBeDefined();
    expect(nextBtn).toBeDefined();
    expect(prevBtn.className).toContain("touch-target");
    expect(nextBtn.className).toContain("touch-target");
  });

  it("renders pagination dots matching total slides count", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div>A</div>
          </CarouselItem>
          <CarouselItem>
            <div>B</div>
          </CarouselItem>
          <CarouselItem>
            <div>C</div>
          </CarouselItem>
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    );

    const dots = screen.getAllByRole("tab");
    expect(dots.length).toBe(3);
    expect(dots[0].getAttribute("aria-label")).toBe("Go to slide 1");
  });
});

describe("Pay After Placement (PAP) Storytelling Timeline", () => {
  beforeEach(() => {
    window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  it("contains all 8 sequential journey steps in PAP_STEPS", () => {
    expect(PAP_STEPS.length).toBe(8);

    const expectedTitles = [
      "Foundation Sprint",
      "Expert Learning",
      "Shared Success (₹0 Upfront)",
      "Placement Drills",
      "Agile Tribers Commercial Internship",
      "Interview Scheduling",
      "Offer Letter Accepted",
      "Fixed ₹40k Flat Placement Fee",
    ];

    expectedTitles.forEach((title, idx) => {
      expect(PAP_STEPS[idx].title).toBe(title);
      expect(PAP_STEPS[idx].step).toBe(idx + 1);
    });
  });

  it("renders all 8 steps in the timeline UI", () => {
    render(<PapTimeline />);

    expect(screen.getAllByText("Foundation Sprint").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Expert Learning").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Shared Success (₹0 Upfront)").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Placement Drills").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Agile Tribers Commercial Internship").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Interview Scheduling").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Offer Letter Accepted").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Fixed ₹40k Flat Placement Fee").length).toBeGreaterThan(0);
  });

  it("highlights radical transparency: ₹0 upfront and ₹40,000 flat cap", () => {
    render(<PapTimeline />);

    expect(screen.getAllByText("₹0 (Zero Risk)").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Fixed ₹40,000 Flat").length).toBeGreaterThan(0);
    expect(screen.getByText("None (No NBFCs)")).toBeDefined();
    expect(screen.getByText("0% of salary")).toBeDefined();
  });

  it("renders interactive mini-stepper with 8 jump tabs", () => {
    render(<PapTimeline />);

    const stepTabs = screen.getAllByRole("tab");
    expect(stepTabs.length).toBe(8);
  });

  it("calls onApplyClick when Apply button is clicked", () => {
    const handleApply = vi.fn();
    render(<PapTimeline onApplyClick={handleApply} />);

    const applyButton = screen.getByRole("button", { name: /Apply with ₹0 Upfront/i });
    fireEvent.click(applyButton);
    expect(handleApply).toHaveBeenCalledTimes(1);
  });
});
