gsap.registerPlugin(SplitText, ScrambleTextPlugin, ScrollTrigger, SplitText);

gsap.set("h1", { opacity: 1 });

let split = SplitText.create(".header-title", { type: "chars" });
//now animate each character into place from 20px below, fading in:
gsap.from(split.chars, {
  y: 20,
  autoAlpha: 0,
  stagger: 0.02,
  duration: 0.3
});

// Scroll-triggered animations for sections - MUCH FASTER
gsap.utils.toArray("section").forEach((section, i) => {
  const content = section.querySelector(".about-me");
  
  gsap.from(content, {
    y: 30,
    opacity: 0,
    duration: 0.3,
    scrollTrigger: {
      trigger: section,
      start: "top 90%",
      end: "top 70%",
      scrub: 0.5,
      markers: false
    }
  });
});

// Parallax effect for stars - FASTER
gsap.to(".star", {
  yPercent: -30,
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5
  }
});

// Fade in CSS elements with stagger - MUCH FASTER
gsap.utils.toArray(".css-section > *, .css-section-top > *").forEach((element, i) => {
  gsap.from(element, {
    scale: 0.9,
    opacity: 0,
    duration: 0.2,
    delay: i * 0.02,
    scrollTrigger: {
      trigger: ".section3",
      start: "top 80%",
      end: "top 60%",
      scrub: 0.5
    }
  });
});

// Footer animation - FASTER
gsap.from(".footer-content", {
  y: 20,
  opacity: 0,
  duration: 0.3,
  scrollTrigger: {
    trigger: ".footer",
    start: "top 95%",
    end: "top 85%",
    scrub: 0.5
  }
});
