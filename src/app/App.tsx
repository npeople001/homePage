import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Mail,
  MessageCircle,
  Instagram,
  Phone,
  ChevronDown,
  ArrowRight,
  Globe,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoImg from "@/imports/ChatGPT_Image_2026__6__11_____06_49_42__5_.png";

function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SlideIn({
  children,
  delay = 0,
  fromLeft = false,
  className = "",
  style: extraStyle,
}: {
  children: React.ReactNode;
  delay?: number;
  fromLeft?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateX(0)"
          : `translateX(${fromLeft ? "-60px" : "60px"})`,
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

const NAV_ITEMS = [
  "Home",
  "About",
  "History",
  "Vision",
  "Why Us",
  "Values",
  "Brands",
  "Products",
  "Global",
  "Contact",
];

const BRAND_NAMES = [
  "MEDI-PEEL",
  "COCO & COCO",
  "SKIN9",
  "EKEL",
  "LALA RECIPE",
  "BELLA C&C",
  "QUEENS RECIPE",
  "MILKY DRESS",
  "KYUNGNAM PHARM",
  "LENS ME",
];

const ROSE = "#e3c7ca";
const DEEP_ROSE = "#b89fa2";
const DARK = "#1a1512";
const CREAM = "#faf8f6";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const snapLockRef = useRef(false);
  const [active, setActive] = useState(0);
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const h = el.clientHeight;
      const idx = Math.round(el.scrollTop / h);
      setActive(idx);
      setNavBg(el.scrollTop > 60);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (snapLockRef.current || event.deltaY <= 18) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const isLeavingHero = el.scrollTop < el.clientHeight * 0.55;
      if (!isLeavingHero) return;

      event.preventDefault();
      snapLockRef.current = true;
      el.scrollTo({ top: el.clientHeight, behavior: "smooth" });
      window.setTimeout(() => {
        snapLockRef.current = false;
      }, 980);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollTo = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: i * el.clientHeight, behavior: "smooth" });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Fixed navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 transition-all duration-500"
        style={{
          background: navBg ? "rgba(250,248,246,0.92)" : "transparent",
          backdropFilter: navBg ? "blur(20px)" : "none",
          borderBottom: navBg ? `1px solid rgba(227,199,202,0.3)` : "none",
        }}
      >
        <button onClick={() => scrollTo(0)} className="flex items-center gap-3">
          <ImageWithFallback
            src={logoImg}
            alt="Npeople logo"
            className="w-9 h-9 object-contain"
          />
          <span
            className="text-lg font-semibold tracking-[0.25em]"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: active === 0 && !navBg ? "#fff" : DARK,
            }}
          >
            NPEOPLE
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item}
              onClick={() => scrollTo(i)}
              className="text-xs tracking-[0.15em] uppercase transition-all duration-300 relative"
              style={{
                color:
                  active === i
                    ? ROSE
                    : active === 0 && !navBg
                    ? "rgba(255,255,255,0.75)"
                    : "#5a4a4c",
                fontWeight: active === i ? 600 : 400,
              }}
            >
              {item}
              {active === i && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: ROSE }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Section nav dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
        {NAV_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="rounded-full transition-all duration-400"
            style={{
              width: "6px",
              height: active === i ? "28px" : "6px",
              background: active === i ? ROSE : "rgba(227,199,202,0.45)",
            }}
          />
        ))}
      </div>

      {/* Scroll container */}
      <div
        ref={containerRef}
        className="w-full h-screen overflow-y-scroll"
        style={{ scrollSnapType: "none" }}
      >
        {/* ── SECTION 1: HERO ───────────────────────────────────────────── */}
        <section
          className="relative w-full h-screen flex items-center justify-center overflow-hidden"
          style={{ scrollSnapAlign: "start" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1741896136113-c33a4fded0b5?w=1920&h=1080&fit=crop&auto=format)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(26,21,18,0.78) 0%, rgba(90,74,76,0.55) 50%, rgba(227,199,202,0.25) 100%)",
            }}
          />

          <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
            <div
              className="inline-block mb-6"
              style={{
                opacity: 1,
                animation: "fadeDown 1s cubic-bezier(0.22,1,0.36,1) 0.2s both",
              }}
            >
              <ImageWithFallback
                src={logoImg}
                alt="Npeople"
                className="w-20 h-20 object-contain mx-auto"
              />
            </div>

            <p
              className="text-xs tracking-[0.55em] mb-5 font-light"
              style={{
                color: ROSE,
                animation: "fadeDown 1s cubic-bezier(0.22,1,0.36,1) 0.4s both",
              }}
            >
              GLOBAL K-BEAUTY DISTRIBUTION PARTNER
            </p>

            <h1
              className="font-bold mb-6 leading-none"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(64px, 12vw, 140px)",
                color: "#ffffff",
                letterSpacing: "-0.02em",
                animation: "fadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.5s both",
              }}
            >
              NPEOPLE
            </h1>

            <div
              className="w-16 h-px mx-auto mb-7"
              style={{
                background: ROSE,
                animation: "scaleX 0.8s ease 0.9s both",
                transformOrigin: "center",
              }}
            />

            <p
              className="text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.82)",
                animation: "fadeUp 1s cubic-bezier(0.22,1,0.36,1) 1s both",
              }}
            >
              Your Premium Partner Leading the Global K-Beauty Market
            </p>

            <p
              className="mt-3 text-sm font-light tracking-widest"
              style={{
                color: "rgba(255,255,255,0.45)",
                animation: "fadeUp 1s ease 1.2s both",
              }}
            >
              Connecting Korean Beauty to the World Since 2016
            </p>

            <div
              className="mt-10 flex items-center justify-center gap-4"
              style={{ animation: "fadeUp 1s ease 1.4s both" }}
            >
              <button
                onClick={() => scrollTo(1)}
                className="px-8 py-3.5 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:scale-105"
                style={{ background: ROSE, color: DARK }}
              >
                Discover More
              </button>
              <button
                onClick={() => scrollTo(9)}
                className="px-8 py-3.5 rounded-full text-sm font-semibold tracking-wider border transition-all duration-300 hover:bg-white hover:text-gray-900"
                style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}
              >
                Contact Us
              </button>
            </div>
          </div>

          <button
            onClick={() => scrollTo(1)}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ color: ROSE, animation: "fadeUp 1s ease 1.6s both" }}
          >
            <span className="text-[10px] tracking-[0.4em]">SCROLL</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </section>

        {/* ── SECTION 2: ABOUT ──────────────────────────────────────────── */}
        <section
          className="w-full h-screen flex items-center overflow-hidden"
          style={{ scrollSnapAlign: "start", background: CREAM }}
        >
          <div className="w-full max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <SlideIn fromLeft delay={0}>
              <p className="text-xs tracking-[0.4em] mb-5 uppercase" style={{ color: DEEP_ROSE }}>
                01 / About Npeople
              </p>
              <h2
                className="font-bold mb-6 leading-none"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 7vw, 88px)", color: DARK }}
              >
                N<span style={{ color: ROSE }}>people</span>
              </h2>
              <div className="w-10 h-px mb-8" style={{ background: DEEP_ROSE }} />

              <div className="space-y-2 mb-8">
                {[
                  { word: "New", desc: "Our spirit of constant innovation" },
                  { word: "Next", desc: "Our vision for the future ahead" },
                  { word: "Nexus", desc: "Connecting people and global markets" },
                  { word: "Nature", desc: "Korea's pure and authentic values" },
                ].map((item, i) => (
                  <FadeUp key={item.word} delay={0.1 + i * 0.1}>
                    <div
                      className="flex items-center gap-5 py-3.5 border-b"
                      style={{ borderColor: "rgba(227,199,202,0.35)" }}
                    >
                      <span
                        className="text-2xl font-bold w-10 flex-shrink-0"
                        style={{ fontFamily: "'Playfair Display', serif", color: ROSE }}
                      >
                        N
                      </span>
                      <div className="flex items-baseline gap-3">
                        <span className="font-semibold tracking-wide text-sm" style={{ color: DARK }}>
                          {item.word}
                        </span>
                        <span className="text-sm" style={{ color: "#8a7a7c" }}>
                          — {item.desc}
                        </span>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>

              <FadeUp delay={0.6}>
                <p className="text-sm leading-relaxed" style={{ color: "#5a4a4c" }}>
                  With years of expertise, Npeople stands at the forefront of K-product exports — sharing Korea's authentic beauty and values with the world through verified brands and trusted partnerships.
                </p>
              </FadeUp>
            </SlideIn>

            <SlideIn delay={0.2}>
              <div className="relative">
                <div
                  className="absolute -top-5 -right-5 w-full h-full rounded-3xl"
                  style={{ background: "rgba(227,199,202,0.18)" }}
                />
                <img
                  src="https://images.unsplash.com/photo-1741896136331-10375875eff4?w=800&h=960&fit=crop&auto=format"
                  alt="K-beauty skincare serums"
                  className="relative rounded-3xl w-full object-cover shadow-2xl"
                  style={{ height: "480px" }}
                />
                <div
                  className="absolute -bottom-6 -left-6 rounded-2xl px-6 py-5"
                  style={{ background: DARK, minWidth: "200px" }}
                >
                  <p className="text-xs tracking-wider mb-1" style={{ color: ROSE }}>FOUNDED</p>
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#fff" }}>2016</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>Daoncompany → Npeople 2025</p>
                </div>
              </div>
            </SlideIn>
          </div>
        </section>

        {/* ── SECTION 3: GROWTH STORY ───────────────────────────────────── */}
        <section
          className="w-full h-screen flex items-center overflow-hidden"
          style={{ scrollSnapAlign: "start", background: DARK }}
        >
          <div className="w-full max-w-7xl mx-auto px-10">
            <FadeUp>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: ROSE }}>
                02 / Growth Story
              </p>
              <h2
                className="font-bold mb-14"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 5vw, 60px)", color: "#fff" }}
              >
                Our Journey
              </h2>
            </FadeUp>

            <div className="relative">
              <div
                className="absolute top-5 left-0 right-0 h-px"
                style={{ background: "rgba(227,199,202,0.15)" }}
              />
              <div className="grid grid-cols-5 gap-5">
                {[
                  { year: "2016", title: "Founded", desc: "Daoncompany established; overseas purchasing service launched" },
                  { year: "2018", title: "Expansion", desc: "Import goods & domestic cosmetics distribution" },
                  { year: "2020–21", title: "SE Asia", desc: "Medi-peel Vietnam distributor; K-beauty brands export" },
                  { year: "2022–23", title: "Japan & Partners", desc: "Duty-free entry, Qoo10 Japan, 10+ brand partnerships" },
                  { year: "2024–25", title: "Global Corp.", desc: "Npeople Co., Ltd — Asia, CIS, Africa expansion" },
                ].map((item, i) => (
                  <FadeUp key={item.year} delay={i * 0.12}>
                    <div className="pt-12">
                      <div
                        className="w-2.5 h-2.5 rounded-full mb-5 -mt-[52px]"
                        style={{ background: ROSE }}
                      />
                      <span
                        className="block mb-2 font-bold"
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: ROSE }}
                      >
                        {item.year}
                      </span>
                      <span className="block text-xs font-semibold tracking-wider mb-2" style={{ color: "#fff" }}>
                        {item.title}
                      </span>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

            <FadeUp delay={0.65}>
              <div
                className="mt-14 px-8 py-5 rounded-2xl"
                style={{
                  background: "rgba(227,199,202,0.07)",
                  border: "1px solid rgba(227,199,202,0.15)",
                }}
              >
                <p className="text-sm italic text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
                  "The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart."
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── SECTION 4: VISION & MISSION ───────────────────────────────── */}
        <section
          className="relative w-full h-screen flex items-center overflow-hidden"
          style={{ scrollSnapAlign: "start", background: "#fff" }}
        >
          <div className="w-full max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 h-full">
            <SlideIn fromLeft delay={0} className="flex flex-col justify-center pr-14 border-r" style={{ borderColor: "rgba(227,199,202,0.3)", borderRightStyle: "solid", borderRightWidth: "1px" }}>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: DEEP_ROSE }}>
                03 / Vision
              </p>
              <h2
                className="font-bold mb-5"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: DARK, lineHeight: 1 }}
              >
                Vision
              </h2>
              <div className="w-10 h-px mb-7" style={{ background: ROSE }} />
              <p className="text-lg leading-relaxed mb-6" style={{ color: "#5a4a4c" }}>
                "To be the trusted global partner delivering authentic K-Beauty experiences worldwide. We create new value for life and dream of a better future for our customers."
              </p>
              <p
                className="text-base font-semibold"
                style={{ color: DEEP_ROSE }}
              >
                Your Premium Partner Leading the Global K-Beauty Market
              </p>

              <div className="mt-10">
                <img
                  src="https://images.unsplash.com/photo-1741896135705-9dfb73461085?w=700&h=220&fit=crop&auto=format"
                  alt="Premium beauty products"
                  className="rounded-2xl w-full object-cover"
                  style={{ height: "160px" }}
                />
              </div>
            </SlideIn>

            <SlideIn delay={0.15} className="flex flex-col justify-center pl-14">
              <h2
                className="font-bold mb-5"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: DARK, lineHeight: 1 }}
              >
                Mission
              </h2>
              <div className="w-10 h-px mb-7" style={{ background: ROSE }} />
              <div className="space-y-6">
                {[
                  "Build a transparent and trustworthy global trade ecosystem",
                  "Deliver authentic Korean brands with verified quality to buyers worldwide",
                  "Connect people and beauty through innovation, trust, and genuine partnership",
                ].map((text, i) => (
                  <FadeUp key={i} delay={0.2 + i * 0.12}>
                    <div className="flex items-start gap-5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                        style={{ background: ROSE, color: DARK }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-base leading-relaxed" style={{ color: "#5a4a4c" }}>{text}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>

              <FadeUp delay={0.6}>
                <div
                  className="mt-10 p-6 rounded-2xl"
                  style={{ background: "rgba(227,199,202,0.12)" }}
                >
                  <p className="text-sm italic" style={{ color: "#8a7a7c" }}>
                    "The supreme happiness in life is the conviction that we are loved."
                  </p>
                </div>
              </FadeUp>
            </SlideIn>
          </div>
        </section>

        {/* ── SECTION 5: WHY NPEOPLE ────────────────────────────────────── */}
        <section
          className="w-full h-screen flex items-center overflow-hidden"
          style={{
            scrollSnapAlign: "start",
            background: `linear-gradient(150deg, ${ROSE} 0%, #f5ede8 55%, ${CREAM} 100%)`,
          }}
        >
          <div className="w-full max-w-7xl mx-auto px-10">
            <FadeUp>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: "#8a6a6c" }}>
                04 / Why Choose Us
              </p>
              <h2
                className="font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: DARK }}
              >
                Why Npeople?
              </h2>
              <p className="text-sm mb-12" style={{ color: "#8a6a6c" }}>
                Four pillars that set us apart as your global K-beauty partner
              </p>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                {
                  num: "01",
                  title: "Competitive Pricing",
                  desc: "Fair and competitive supply pricing with transparent trade terms for global buyers",
                },
                {
                  num: "02",
                  title: "Diverse Brands",
                  desc: "Extensive portfolio spanning skincare, health supplements, hair & body, and K-food",
                },
                {
                  num: "03",
                  title: "Systematic Logistics",
                  desc: "Stable, efficient worldwide logistics ensuring reliable and consistent supply",
                },
                {
                  num: "04",
                  title: "Fast Delivery",
                  desc: "Rapid and accurate supply chain delivering K-beauty products across the globe",
                },
              ].map((item, i) => (
                <FadeUp key={item.num} delay={i * 0.12}>
                  <div
                    className="rounded-3xl p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 8px 40px rgba(26,21,18,0.07)",
                      border: "1px solid rgba(255,255,255,0.8)",
                    }}
                  >
                    <span
                      className="text-5xl font-bold mb-6 block leading-none"
                      style={{ fontFamily: "'Playfair Display', serif", color: "rgba(227,199,202,0.6)" }}
                    >
                      {item.num}
                    </span>
                    <h3
                      className="font-semibold text-base mb-3"
                      style={{ color: DARK }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "#8a7a7c" }}>
                      {item.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: CORE VALUES ────────────────────────────────────── */}
        <section
          className="w-full h-screen flex items-center overflow-hidden"
          style={{ scrollSnapAlign: "start", background: DARK }}
        >
          <div className="w-full max-w-7xl mx-auto px-10">
            <FadeUp>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: ROSE }}>
                05 / Core Values
              </p>
              <h2
                className="font-bold mb-14"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: "#fff" }}
              >
                Our Values
              </h2>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  en: "Integrity",
                  ko: "진실성",
                  desc: "Transparent partnerships and trust-based export operations",
                  shade: ROSE,
                },
                {
                  en: "Quality",
                  ko: "품질",
                  desc: "Only verified, high-quality Korean products delivered globally",
                  shade: DEEP_ROSE,
                },
                {
                  en: "Flexibility",
                  ko: "유연성",
                  desc: "Buyer-centric supply solutions customized to each market",
                  shade: "#a89ea0",
                },
                {
                  en: "Innovation",
                  ko: "혁신",
                  desc: "Leading digital and global K-Beauty trends worldwide",
                  shade: "#8a7a7c",
                },
              ].map((v, i) => (
                <FadeUp key={v.en} delay={i * 0.12}>
                  <div
                    className="rounded-2xl p-7 h-full flex flex-col border-t-2 transition-all duration-300 hover:-translate-y-1 cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderColor: v.shade,
                      border: `1px solid rgba(255,255,255,0.07)`,
                      borderTop: `2px solid ${v.shade}`,
                    }}
                  >
                    <span
                      className="text-xs tracking-widest mb-3 block"
                      style={{ color: v.shade }}
                    >
                      {v.ko}
                    </span>
                    <h3
                      className="text-xl font-semibold mb-4"
                      style={{ fontFamily: "'Playfair Display', serif", color: "#fff" }}
                    >
                      {v.en}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {v.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.55}>
              <div
                className="mt-10 flex items-center gap-6 p-6 rounded-2xl"
                style={{ background: "rgba(227,199,202,0.08)", border: "1px solid rgba(227,199,202,0.15)" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1741896136777-deb999cab264?w=160&h=100&fit=crop&auto=format"
                  alt="Beauty products"
                  className="rounded-xl object-cover flex-shrink-0"
                  style={{ width: "120px", height: "80px" }}
                />
                <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Npeople goes beyond simple distribution — we create genuine value through true partnership, leading the global K-Beauty market together with our clients and brand partners.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── SECTION 7: BRAND NETWORK ─────────────────────────────────── */}
        <section
          className="w-full h-screen flex items-center overflow-hidden"
          style={{ scrollSnapAlign: "start", background: "#fff" }}
        >
          <div className="w-full max-w-7xl mx-auto px-10">
            <FadeUp>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: DEEP_ROSE }}>
                06 / Brand Network
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-12">
                <h2
                  className="font-bold leading-none"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: DARK }}
                >
                  Growing with verified K-Beauty brands
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "#8a7a7c" }}>
                  Npeople collaborates with Korean beauty brands and distribution partners to propose product portfolios tailored to each market.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div
                className="grid grid-cols-2 md:grid-cols-5"
                style={{
                  borderTop: "1px solid rgba(26,21,18,0.12)",
                  borderLeft: "1px solid rgba(26,21,18,0.12)",
                }}
              >
                {BRAND_NAMES.map((brand, i) => (
                  <div
                    key={brand}
                    className="h-32 flex items-center justify-center text-center px-4 transition-all duration-300 hover:bg-[#e3c7ca]"
                    style={{
                      borderRight: "1px solid rgba(26,21,18,0.12)",
                      borderBottom: "1px solid rgba(26,21,18,0.12)",
                    }}
                  >
                    <span
                      className={i % 3 === 0 ? "italic" : ""}
                      style={{
                        fontFamily: i % 2 === 0 ? "'Playfair Display', serif" : "'Inter', sans-serif",
                        fontSize: i % 2 === 0 ? "clamp(22px,2.2vw,34px)" : "clamp(18px,1.8vw,28px)",
                        fontWeight: 700,
                        letterSpacing: "-0.04em",
                        color: "rgba(26,21,18,0.46)",
                      }}
                    >
                      {brand}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── SECTION 8: PRODUCTS ───────────────────────────────────────── */}
        <section
          className="w-full h-screen flex items-center overflow-hidden"
          style={{ scrollSnapAlign: "start", background: CREAM }}
        >
          <div className="w-full max-w-7xl mx-auto px-10">
            <FadeUp>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: DEEP_ROSE }}>
                07 / Product Portfolio
              </p>
              <div className="flex items-end justify-between mb-12">
                <h2
                  className="font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: DARK, lineHeight: 1 }}
                >
                  Key Categories
                </h2>
                <p className="text-sm max-w-xs text-right hidden md:block" style={{ color: "#8a7a7c" }}>
                  Also offering Brand Marketing Support, ODM/OEM Consulting & Global Customized Projects
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  code: "S",
                  title: "Skincare",
                  sub: "스킨케어",
                  items: ["Cleanser", "Toner", "Serum", "Cream", "Mask Pack"],
                  bg: ROSE,
                  img: "https://images.unsplash.com/photo-1741896136069-f3588d8993b5?w=400&h=500&fit=crop&auto=format",
                },
                {
                  code: "H&B",
                  title: "Hair & Body",
                  sub: "헤어 & 바디케어",
                  items: ["Premium Hair Care", "Body Treatment", "Essential Care"],
                  bg: DEEP_ROSE,
                  img: "https://images.unsplash.com/photo-1622910076411-b126ff7e469b?w=400&h=500&fit=crop&auto=format",
                },
                {
                  code: "HS",
                  title: "Health Supplements",
                  sub: "건강기능식품",
                  items: ["Collagen", "Vitamin", "Probiotics"],
                  bg: "#a89ea0",
                  img: "https://images.unsplash.com/photo-1625753783470-ec2ab4efeeec?w=400&h=500&fit=crop&auto=format",
                },
                {
                  code: "I&K",
                  title: "Inner Beauty & K-Food",
                  sub: "이너뷰티 & K-푸드",
                  items: ["Collagen Jelly Stick", "Kombucha", "Functional Foods"],
                  bg: "#8a7a7c",
                  img: "https://images.unsplash.com/photo-1601049413574-214d105b26e4?w=400&h=500&fit=crop&auto=format",
                },
              ].map((cat, i) => (
                <FadeUp key={cat.code} delay={i * 0.1}>
                  <div
                    className="rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-400 hover:scale-[1.02]"
                    style={{ height: "300px" }}
                  >
                    <img
                      src={cat.img}
                      alt={cat.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{ background: `${cat.bg}cc` }}
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <span
                        className="font-bold leading-none"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "48px",
                          color: "rgba(255,255,255,0.2)",
                        }}
                      >
                        {cat.code}
                      </span>
                      <div>
                        <p className="text-xs tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                          {cat.sub}
                        </p>
                        <h3 className="font-semibold text-lg mb-3" style={{ color: "#fff" }}>
                          {cat.title}
                        </h3>
                        <ul className="space-y-1">
                          {cat.items.map((item) => (
                            <li key={item} className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                              · {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 9: GLOBAL NETWORK ─────────────────────────────────── */}
        <section
          className="w-full h-screen flex items-center overflow-hidden"
          style={{
            scrollSnapAlign: "start",
            background: `linear-gradient(160deg, ${CREAM} 0%, rgba(227,199,202,0.25) 100%)`,
          }}
        >
          <div className="w-full max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <SlideIn fromLeft delay={0}>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: DEEP_ROSE }}>
                08 / Global Network
              </p>
              <h2
                className="font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: DARK, lineHeight: 1 }}
              >
                Our Reach
              </h2>
              <div className="w-10 h-px mb-6" style={{ background: ROSE }} />
              <p className="text-sm leading-relaxed mb-10" style={{ color: "#5a4a4c" }}>
                Npeople continuously expands export markets across Asia, CIS, Middle East, Europe, and Africa — partnering with importers and distributors worldwide to spread authentic K-Beauty.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { region: "East Asia", countries: "China · Japan · Vietnam", icon: "🌏" },
                  { region: "South Asia", countries: "India · Bangladesh", icon: "🌿" },
                  { region: "Russia / CIS", countries: "Russia & CIS Nations", icon: "❄️" },
                  { region: "Africa & Europe", countries: "Egypt · Nigeria · Hungary", icon: "🌍" },
                ].map((item, i) => (
                  <FadeUp key={item.region} delay={0.1 + i * 0.1}>
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(227,199,202,0.4)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <span className="text-2xl mb-2 block">{item.icon}</span>
                      <p className="text-sm font-semibold mb-1" style={{ color: DARK }}>{item.region}</p>
                      <p className="text-xs" style={{ color: "#8a7a7c" }}>{item.countries}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>

              <FadeUp delay={0.55}>
                <div
                  className="mt-4 rounded-xl p-4 flex items-center gap-3"
                  style={{ background: ROSE }}
                >
                  <Globe className="w-5 h-5 flex-shrink-0" style={{ color: DARK }} />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: DARK }}>Expanding Worldwide</p>
                    <p className="text-xs" style={{ color: "rgba(26,21,18,0.65)" }}>
                      Côte d'Ivoire · Ghana · and more to come
                    </p>
                  </div>
                </div>
              </FadeUp>
            </SlideIn>

            <SlideIn delay={0.2}>
              <div className="relative h-full flex flex-col justify-center">
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{ height: "420px", background: DARK }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1741896136113-c33a4fded0b5?w=700&h=420&fit=crop&auto=format"
                    alt="Global K-beauty export"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <p
                      className="text-5xl font-bold mb-1"
                      style={{ fontFamily: "'Playfair Display', serif", color: "#fff" }}
                    >
                      10+
                    </p>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                      Countries & Regions Served
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Russia", "China", "Japan", "Vietnam", "India", "Egypt", "Nigeria", "Hungary"].map((c) => (
                        <span
                          key={c}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ background: "rgba(227,199,202,0.2)", color: ROSE }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </section>

        {/* ── SECTION 10: CONTACT ───────────────────────────────────────── */}
        <section
          className="relative w-full h-screen flex items-center overflow-hidden"
          style={{ scrollSnapAlign: "start", background: "#fff" }}
        >
          <div className="w-full max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <SlideIn fromLeft delay={0}>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: DEEP_ROSE }}>
                09 / Contact
              </p>
              <h2
                className="font-bold mb-3 leading-none"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: DARK }}
              >
                Get In Touch
              </h2>
              <div className="w-10 h-px mb-8" style={{ background: ROSE }} />

              <div className="space-y-5">
                {[
                  {
                    Icon: MapPin,
                    label: "ADDRESS",
                    value: "SKY-L65 #915, 200 Wangsan-ro, Dongdaemun-gu, Seoul, Korea",
                    href: undefined,
                  },
                  {
                    Icon: Mail,
                    label: "EMAIL",
                    value: "daoncompany1@daum.net",
                    href: "mailto:daoncompany1@daum.net",
                  },
                  {
                    Icon: Phone,
                    label: "WHATSAPP",
                    value: "+82-10-3392-2533",
                    href: "https://wa.me/821033922533",
                  },
                  {
                    Icon: MessageCircle,
                    label: "KAKAO / WECHAT",
                    value: "KakaoTalk: funbuy  ·  WeChat: daoncom",
                    href: undefined,
                  },
                  {
                    Icon: Instagram,
                    label: "INSTAGRAM",
                    value: "@npeople_",
                    href: "https://instagram.com/npeople_",
                  },
                ].map(({ Icon, label, value, href }) => (
                  <FadeUp key={label} delay={0.1}>
                    <div className="flex items-start gap-4">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(227,199,202,0.2)" }}
                      >
                        <Icon className="w-4 h-4" style={{ color: DEEP_ROSE }} />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.25em] mb-0.5" style={{ color: DEEP_ROSE }}>
                          {label}
                        </p>
                        {href ? (
                          <a href={href} className="text-sm hover:underline" style={{ color: DARK }}>
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm" style={{ color: DARK }}>{value}</p>
                        )}
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>

              <FadeUp delay={0.6}>
                <div className="mt-10 flex items-center gap-4">
                  <a
                    href="mailto:daoncompany1@daum.net"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{ background: ROSE, color: DARK }}
                  >
                    Contact Us <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/821033922533"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider border transition-all duration-300 hover:scale-105"
                    style={{ borderColor: ROSE, color: DARK }}
                  >
                    WhatsApp
                  </a>
                </div>
              </FadeUp>
            </SlideIn>

            <SlideIn delay={0.2}>
              <div className="relative">
                <div
                  className="absolute -top-6 -right-6 w-full h-full rounded-3xl"
                  style={{ background: "rgba(227,199,202,0.15)" }}
                />
                <div className="relative rounded-3xl overflow-hidden" style={{ height: "520px" }}>
                  <img
                    src="https://images.unsplash.com/photo-1741896136777-deb999cab264?w=700&h=900&fit=crop&auto=format"
                    alt="K-beauty products"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-8"
                    style={{
                      background: "linear-gradient(transparent, rgba(26,21,18,0.85))",
                    }}
                  >
                    <p
                      className="text-2xl font-bold mb-2 text-white"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Npeople Co., Ltd
                    </p>
                    <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.7)" }}>
                      Beyond distribution — creating new value through true partnership
                    </p>
                  </div>
                </div>

                <div
                  className="absolute -bottom-5 -left-5 rounded-2xl px-6 py-4 flex items-center gap-4"
                  style={{ background: DARK }}
                >
                  <ImageWithFallback
                    src={logoImg}
                    alt="Npeople"
                    className="w-10 h-10 object-contain"
                  />
                  <div>
                    <p className="text-xs font-bold tracking-widest" style={{ color: ROSE }}>NPEOPLE</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Global K-Beauty Partner</p>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
          <div
            className="absolute left-10 right-10 bottom-5 flex items-center justify-between gap-6 pt-4 text-[11px] tracking-[0.12em]"
            style={{ borderTop: "1px solid rgba(227,199,202,0.45)", color: "#8a7a7c" }}
          >
            <span>Npeople Co., Ltd · SKY-L65 #915, 200 Wangsan-ro, Dongdaemun-gu, Seoul, Korea</span>
            <span>Business Registration No. To be added</span>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleX {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        div::-webkit-scrollbar { display: none; }
        div { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
