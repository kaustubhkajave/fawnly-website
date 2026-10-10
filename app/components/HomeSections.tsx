"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneMockup } from "./PhoneMockup";
import { AppStoreButton } from "./AppStoreButton";
import { faqItems } from "../content/faqs";

export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducedMotion) {
      gsap.to(ref.current.querySelectorAll(".orb"), { y: -18, duration: 2.8, stagger: .4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }

    let stopped = false;
    import("three").then(THREE => {
      if (stopped || !canvas.current || !ref.current) return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
      camera.position.z = 8;
      const renderer = new THREE.WebGLRenderer({ canvas: canvas.current, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      const dots = new THREE.Group();
      const material = new THREE.MeshBasicMaterial({ color: 0x0c7658, transparent: true, opacity: .25 });
      for (let i = 0; i < 22; i++) {
        const dot = new THREE.Mesh(new THREE.SphereGeometry(.045, 8, 8), material);
        dot.position.set((i % 6 - 2.5) * .55, Math.sin(i * 1.7) * .6 + (Math.floor(i / 6) - 1) * .65, 0);
        dots.add(dot);
      }
      scene.add(dots);
      const resize = () => {
        if (!canvas.current || !ref.current) return;
        const { width, height } = ref.current.getBoundingClientRect();
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };
      resize();
      window.addEventListener("resize", resize);
      const frame = () => {
        if (stopped) return;
        if (!reducedMotion) dots.rotation.z += .0008;
        renderer.render(scene, camera);
        requestAnimationFrame(frame);
      };
      frame();
    });
    return () => { stopped = true; };
  }, []);

  return (
    <div className="hero-visual grid-dots" ref={ref}>
      <canvas ref={canvas} className="scene-canvas" aria-hidden="true" />
      <span className="orb one" /><span className="orb two" />
      <div className="hero-badge"><img src="/images/app-icon-128.png" width={42} height={42} alt="" /></div>
      <PhoneMockup priority className="hero-phone" sizes="(max-width: 850px) 63vw, 305px" src="/images/screens/latest/home-sheep-meadow.webp" alt="Fawnly Home in the Sheep Meadow illustrated theme showing 4,645 steps, distance, active calories, floors, 46% of a 10,000-step goal, and a weekly chart" />
      <PhoneMockup className="side-shot left" sizes="(max-width: 850px) 34vw, 185px" src="/images/screens/latest/home-warm-green.webp" alt="Fawnly Home in the calm Warm Green theme" />
      <PhoneMockup className="side-shot right" sizes="(max-width: 850px) 34vw, 185px" src="/images/screens/latest/share-card.webp" alt="Fawnly share card in the Heart Bloom theme" />
    </div>
  );
}

const features = [
  ["01", "Your day at a glance", "See Apple Health steps, walking and running distance, active energy, floors, and progress toward a daily goal."],
  ["02", "Week, month & year history", "Explore totals, daily averages, best days, goal streaks, recent days, and distance across richer history views."],
  ["03", "Outdoor activity recording", "Record a Walk with active time, GPS distance, pace, an Apple Maps route, and optional live session steps."],
  ["04", "Widgets & Live Activities", "Keep today’s progress on your Home Screen and follow active recordings from the Lock Screen or Dynamic Island."],
  ["05", "Private route history", "Recorded activities and precise route points stay local. Restore eligible Fawnly workouts you previously saved to Apple Health."],
  ["06", "Themes & hero fonts", "Choose calm color themes, expressive illustrated scenes, readability treatments, and a hero-number style that feels like yours."],
  ["07", "Beautiful share cards", "Turn a day, week, month, or recorded route into a thoughtful card, then share only through the destination you choose."],
  ["08", "Flexible settings", "Set your step goal, choose miles or kilometres, switch your Home metric, and control optional reminders."],
];

export function Features() {
  return (
    <section id="features" className="section">
      <div className="wrap">
        <div className="section-intro">
          <div><span className="eyebrow">A fuller walking companion</span><h2 className="h2">Everything you need.<br /><span className="serif">Nothing you don’t.</span></h2></div>
          <p>Fawnly turns movement into a calm daily rhythm—from your Apple Health summary to outdoor activities, history, widgets, and private routes.</p>
        </div>
        <div className="features-grid">
          {features.map(([n, title, description]) => <article className="card feature" key={title}><span className="feature-num">{n}</span><div><h3 className="h3">{title}</h3><p>{description}</p></div></article>)}
        </div>
      </div>
    </section>
  );
}

const stories = [
  ["Your day, in one calm glance", "Follow steps, distance, active calories, floors, and goal progress in a Home view that stays quiet and clear.", "/images/screens/latest/home-warm-green.webp", "Fawnly Home in the Warm Green theme showing 4,645 steps, distance, active calories, floors, goal progress, and a weekly chart"],
  ["Steps or distance, your way", "Lead with steps or make distance the big number on Home, in miles or kilometres. Your other stats and the weekly chart stay right below.", "/images/screens/latest/home-distance.webp", "Fawnly Home leading with 2.1 miles of distance, with steps, active calories, and floors below"],
  ["Watch your progress take shape", "Move between Week, Month, and Year history to see totals, averages, best days, streaks, and distance over time.", "/images/screens/latest/history-month.webp", "Fawnly Month history showing 77,472 total steps, a daily totals chart, goal days, daily average, best day, and distance"],
  ["Make the app feel like yours", "Choose from calm classic themes and illustrated worlds, then adjust the treatment and hero-number style for readability.", "/images/screens/latest/themes.webp", "Fawnly theme picker previewing Sheep Meadow with Clear, Fade, Wash, and Tint treatments and other illustrated themes"],
  ["Share progress, thoughtfully", "Create polished day, week, or month cards. Route cards use a normalized silhouette instead of an Apple Maps background or raw coordinates.", "/images/screens/latest/share-card.webp", "Fawnly day share card in the Heart Bloom theme showing 4,645 steps"],
];

export function ScreenshotStory() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = gsap.utils.toArray<HTMLElement>(ref.current.querySelectorAll(".story-item"));
    items.forEach(item => gsap.fromTo(item, { y: 34, opacity: .55 }, { y: 0, opacity: 1, duration: .8, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 82%", once: true } }));
  }, []);

  return (
    <section className="section story" ref={ref}>
      <div className="wrap story-grid">
        <div className="sticky"><span className="eyebrow">A softer way to stay moving</span><h2 className="h2">Small steps.<br /><span className="serif">A richer story.</span></h2><p className="muted story-intro">Fawnly keeps the useful detail close while giving your movement room to feel personal.</p></div>
        <div className="story-list">{stories.map(([title, description, src, alt]) => <article className="story-item" key={title}><div className="story-copy"><span className="eyebrow">{title}</span><p>{description}</p></div><PhoneMockup className="story-phone" src={src} alt={alt} /></article>)}</div>
      </div>
    </section>
  );
}

const themes = [
  ["Warm Green", "green"],
  ["Honeydew Meadow", "honeydew"],
  ["Fawn Pond", "pond"],
  ["Heart Bloom", "rose"],
  ["Sheep Meadow", "meadow"],
  ["Maple Brook", "maple"],
];

const widgets = [
  ["sheep-meadow", "Sheep Meadow"],
  ["fawn-pond", "Fawn Pond"],
  ["honeydew-meadow", "Honeydew Meadow"],
  ["maple-brook", "Maple Brook"],
  ["heart-bloom", "Heart Bloom"],
];

export function Themes() {
  return (
    <section id="themes" className="section themes">
      <div className="wrap">
        <div className="section-intro">
          <div><span className="eyebrow themes-eyebrow">Calm or illustrated</span><h2 className="h2">A little color<br /><span className="serif">goes a long way.</span></h2></div>
          <p className="muted">Move from a quiet classic palette to an illustrated pond, meadow, brook, or bloom—then choose Clear, Fade, Wash, or Tint. With Fawnly Plus, your Home Screen widget wears the same theme.</p>
        </div>
        <div className="theme-grid">{themes.map(([name, style]) => <div className={`theme ${style}`} key={name}>{name}</div>)}</div>
        <div className="widget-showcase" aria-label="Fawnly themed Home Screen widgets">
          {widgets.map(([file, name]) => <img key={file} src={`/images/widgets/${file}-520w.webp`} srcSet={`/images/widgets/${file}-520w.webp 520w, /images/widgets/${file}.webp 1030w`} sizes="(max-width: 850px) 46vw, 340px" width={1030} height={484} loading="lazy" decoding="async" alt={`Fawnly medium Home Screen widget in the ${name} theme showing today’s steps, goal progress, distance, calories, and floors`} />)}
        </div>
        <p className="widget-note">Themed widgets with Fawnly Plus</p>
      </div>
    </section>
  );
}

export function Activities() {
  return (
    <section id="activities" className="section activities">
      <div className="wrap activities-grid">
        <div><span className="eyebrow">Outdoor activities, when you want them</span><h2 className="h2">Record the walk.<br /><span className="serif">Keep the route private.</span></h2><p>Start a Walk and follow active time, GPS distance, current and average pace, and an Apple Maps route. With background location, your recording can continue while Fawnly is off screen.</p><ul className="clean-list"><li>Pause, resume, and return to an activity in progress</li><li>Optional live steps during the session</li><li>Lock Screen and Dynamic Island Live Activity</li><li>Optional save and restore through Apple Health</li></ul></div>
        <PhoneMockup className="activity-phone" width={1310} height={2710} src="/images/screens/latest/activity-recording.webp" alt="Fawnly recording an outdoor walk with an Apple Maps route, active time, distance, pace, steps, pause, and finish controls" />
      </div>
    </section>
  );
}

export function Plus() {
  return (
    <section className="section plus">
      <div className="wrap plus-grid">
        <div><span className="eyebrow plus-eyebrow">Go further with Fawnly Plus</span><h2 className="h2">More ways to move.<br /><span className="serif">More ways to make it yours.</span></h2><p>Fawnly Plus is an optional monthly or yearly subscription. Localized pricing is shown before purchase.</p><AppStoreButton /></div>
        <ul>
          <li>All premium and illustrated themes</li>
          <li>Home Screen widgets in your theme</li>
          <li>Custom hero fonts and distance-first Home</li>
          <li>Month and Year history, plus older periods</li>
          <li>Week and Month share cards</li>
          <li>Paced Walk, Hike, and Run recording</li>
          <li>Privacy-conscious activity route cards</li>
          <li>Optional weekly step-card recap</li>
        </ul>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="section"><div className="wrap faq-grid"><div><span className="eyebrow">A few gentle answers</span><h2 className="h2">Questions,<br /><span className="serif">answered.</span></h2></div><div className="faq">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
  );
}
