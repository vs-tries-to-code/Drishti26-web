import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ---- Hero (Wireframe - 1) ----
const heroBg = "/home/drishti-take-1.png";
const heroLogo = "/home/dishti-logo.png";
const heroLine1 = "/home/line-1.svg";
const heroLine2 = "/home/line-2.svg";

// ---- Ideas Don't Ask Permission (Wireframe - 4) ----
const ideasEmblem = "/home/ideas-emblem.png";
const ideasVectorLine = "/home/ideas-vector-line.svg";

// ---- Event Categories (Wireframe - 6) ----
const categoriesPhoto = "/home/categories-photo.png";
const arrowDownRight = "/home/arrow-down-right.svg";

// ---- Featured Events (Wireframe - 5) ----
const featuredEventPoster = "/home/featured-event-poster.png";

// ---- Aftermovie (Wireframe - 3) ----
const aftermovieVideo = "/home/aftermovie.mp4";
const aftermovieLogo = "/home/aftermovie-logo.png";
const aftermovieLine = "/home/aftermovie-line.svg";

// ---- Gallery (Wireframe - 7) ----
const galleryImage1 = "/home/gallery-1.png";
const galleryImage2 = "/home/gallery-2.png";
const galleryImage3 = "/home/gallery-3.png";
const galleryImage4 = "/home/gallery-4.png";
const galleryImage5 = "/home/gallery-5.png";

const coreValues = ["INNOVATION", "FUTURE", "COLLABORATION", "EXCELLANCE", "LEGACY"];

// The preview follows the hovered row with an alternating tilt.
const workshopItems = [
  { title: "WORKSHOPS", textOffset: "left-0", image: categoriesPhoto, top: 83, left: 682, rotate: -11.17 },
  { title: "COMPETITIONS", textOffset: "left-[70px]", image: categoriesPhoto, top: 243, left: 752, rotate: 11.17 },
  { title: "TALKS AND PANELS", textOffset: "left-0", image: categoriesPhoto, top: 403, left: 682, rotate: -11.17 },
  { title: "EXHIBITIONS", textOffset: "left-0", image: categoriesPhoto, top: 563, left: 752, rotate: 11.17 },
  { title: "PRO SHOWS", textOffset: "left-0", image: categoriesPhoto, top: 723, left: 682, rotate: -11.17 },
];

// Replace `image` with each event's actual poster once you have final artwork —
// the Figma design currently reuses the same placeholder poster for all four cards.
const featuredEvents = [
  { image: featuredEventPoster },
  { image: featuredEventPoster },
  { image: featuredEventPoster },
  { image: featuredEventPoster },
];

const galleryImages = [
  { src: galleryImage1, className: "left-[511px] top-[228px] h-[543px] w-[394px]" },
  { src: galleryImage2, className: "left-[937px] top-[105px] h-[395px] w-[287px]" },
  { src: galleryImage3, className: "left-[190px] top-[538px] h-[395px] w-[287px]" },
  { src: galleryImage4, className: "left-[144px] top-[303px] h-[216px] w-[287px]" },
  { src: galleryImage5, className: "left-[939px] top-[555px] h-[216px] w-[287px]" },
];

function Home() {
  const [activeWorkshopItem, setActiveWorkshopItem] = useState("");
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const categoryImageRef = useRef(null);

  const handleWorkshopItemClick = (title) => {
    setActiveWorkshopItem(title);
  };

  const handleCategoryEnter = (index) => setHoveredCategoryIndex(index);
  const handleCategoryLeave = (index) => {
    setHoveredCategoryIndex((current) => (current === index ? null : current));
  };

  // Reveal + tilt the category photo in on hover/focus, reverse it on leave/blur.
  useEffect(() => {
    const el = categoryImageRef.current;
    if (!el) return;

    gsap.killTweensOf(el);

    if (hoveredCategoryIndex !== null) {
      const { top, left, rotate: targetRotate } = workshopItems[hoveredCategoryIndex];
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.85, rotate: 0, top, left },
        {
          opacity: 1,
          scale: 1,
          rotate: targetRotate,
          top,
          left,
          duration: 0.55,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        scale: 0.85,
        rotate: 0,
        duration: 0.35,
        ease: "power2.in",
      });
    }
  }, [hoveredCategoryIndex]);

  const handleRegistration = (eventIndex) => {
    window.dispatchEvent(
      new CustomEvent("featured-event-registration", {
        detail: { eventIndex },
      }),
    );
  };

  const moveFeatured = (direction) => {
    setFeaturedIndex((current) =>
      Math.min(1, Math.max(0, current + direction)),
    );
  };

  return (
    <main className="relative w-full overflow-x-hidden bg-black">
      <Navbar />

      {/* ============ HERO (Wireframe - 1) ============ */}
      <section
        className="relative h-[1024px] w-full overflow-hidden bg-white"
        aria-labelledby="drishti-title"
      >
        <img
          className="absolute left-0 top-0 h-full w-full object-cover"
          alt=""
          aria-hidden="true"
          src={heroBg}
        />
        <div className="absolute left-11 top-[512px] font-['Space_Grotesk-Regular',Helvetica] text-base font-normal leading-[normal] tracking-[0] text-white opacity-60">
          FEST UNLIKE ANY OTHER
        </div>
        <img
          className="absolute left-0 top-[542px] h-0.5 w-[413px]"
          alt=""
          aria-hidden="true"
          src={heroLine1}
        />
        <img
          className="absolute left-[1032px] top-[542px] h-0.5 w-[408px]"
          alt=""
          aria-hidden="true"
          src={heroLine2}
        />
        <div className="absolute left-[1222px] top-[512px] text-right font-['Space_Grotesk-Regular',Helvetica] text-base font-normal leading-[normal] tracking-[0] text-white opacity-60">
          REWIND AND REJOICE
        </div>
        <h1
          id="drishti-title"
          className="absolute left-[calc(50%_-_319px)] top-[736px] font-['Bietro_DEMO-Regular',Helvetica] text-[180px] font-normal leading-[normal] tracking-[0] text-white"
        >
          DRISHTI
        </h1>
      </section>

      {/* ============ IDEAS DON'T ASK PERMISSION (Wireframe - 4) ============ */}
      <section
        className="relative h-[1639px] w-full overflow-hidden bg-black"
        aria-labelledby="hero-title"
      >
        <div
          className="absolute bottom-[130px] left-[-197px] h-[395px] w-[608px] rotate-[18.51deg] rounded-[303.78px/197.65px] bg-[#d9d9d9] opacity-[0.24] blur-[208.1px]"
          aria-hidden="true"
        />
        <div
          className="absolute left-[935px] top-[216px] h-[527px] w-[810px] rotate-[-6.92deg] rounded-[405px/263.5px] bg-[#d9d9d9] opacity-[0.24] blur-[208.1px]"
          aria-hidden="true"
        />
        <div
          className="absolute left-[315px] top-[1052px] h-[527px] w-[810px] rotate-[-6.92deg] rounded-[405px/263.5px] bg-[#d9d9d9] opacity-[0.24] blur-[208.1px]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[125px] left-[1026px] h-[250px] w-96 rotate-[18.51deg] rounded-[192.19px/125.04px] bg-[#d9d9d9] opacity-[0.24] blur-[208.1px]"
          aria-hidden="true"
        />
        <div
          id="hero-title"
          className="absolute left-[189px] top-[849px] w-[1062px] bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(225,157,0,1)_92%)] bg-clip-text text-center font-['Bietro_DEMO-Regular',Helvetica] text-8xl font-normal leading-[96px] tracking-[0] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
        >
          IDEAS DON&apos;T ASK PERMISSION
        </div>
        <aside
          className="absolute left-24 top-[378px] flex w-[186px] flex-col items-start gap-[26px] opacity-50"
          aria-label="Core values"
        >
          <ul className="m-0 flex w-full list-none flex-col gap-[26px] p-0">
            {coreValues.map((value, index) => (
              <li
                className={`relative self-stretch font-['Space_Grotesk-Regular',Helvetica] text-[22px] font-normal leading-[22px] tracking-[0] text-white ${
                  index === 0 ? "mt-[-1px]" : ""
                }`}
                key={value}
              >
                {value}
              </li>
            ))}
          </ul>
        </aside>
        <img
          className="absolute left-[71px] top-[353px] h-[263px] w-0.5"
          alt=""
          aria-hidden="true"
          src={ideasVectorLine}
        />
        <img
          className="absolute left-[507px] top-[226px] h-[506px] w-[421px] aspect-[0.83]"
          alt="Gold geometric innovation emblem"
          src={ideasEmblem}
        />
        <p className="absolute bottom-[373px] left-[210px] w-[1019px] text-center font-['Space_Grotesk-Regular',Helvetica] text-2xl font-normal leading-[33.6px] tracking-[0] text-white">
          Lorem ipsum dolor sit amet consectetur. Leo in velit tristique morbi
          facilisi facilisis vestibulum in. Odio rutrum eu nisi tempor sit vel.
          Sed dignissim viverra interdum nunc at diam turpis. Integer odio risus
          aliquam maecenas porttitor.
        </p>
      </section>

      {/* ============ EVENT CATEGORIES (Wireframe - 6) ============ */}
      <section className="relative h-[1250px] w-full bg-black" aria-label="Event categories">
        <div
          className="absolute left-[calc(50.00%_-_610px)] top-[calc(50.00%_-_377px)] flex w-[1220px] flex-col items-start gap-[47px]"
          aria-label="Available event categories"
        >
          {workshopItems.map((item, index) => (
            <div
              key={item.title}
              className="relative h-[113px] w-full self-stretch border-b border-white"
              onMouseEnter={() => handleCategoryEnter(index)}
              onMouseLeave={() => handleCategoryLeave(index)}
              onFocus={() => handleCategoryEnter(index)}
              onBlur={() => handleCategoryLeave(index)}
            >
              <button
                type="button"
                className={`all-unset absolute ${item.textOffset} top-9 z-10 block w-[1062px] cursor-pointer bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(225,157,0,1)_92%)] bg-clip-text text-left font-['Bietro_DEMO-Regular',Helvetica] text-[64px] font-normal leading-[64px] tracking-[0] text-transparent [-webkit-text-fill-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white`}
                onClick={() => handleWorkshopItemClick(item.title)}
                aria-pressed={activeWorkshopItem === item.title}
              >
                {item.title}
              </button>
              <button
                type="button"
                className="all-unset absolute left-[1104px] top-2 z-10 block h-[104px] w-[104px] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={() => handleWorkshopItemClick(item.title)}
                aria-label={`View ${item.title.toLowerCase()}`}
                aria-pressed={activeWorkshopItem === item.title}
              >
                <img
                  className="absolute left-[22.16%] top-[22.16%] h-[77.84%] w-[77.84%]"
                  alt=""
                  aria-hidden="true"
                  src={arrowDownRight}
                />
              </button>
            </div>
          ))}
        </div>
        <img
          ref={categoryImageRef}
          className="pointer-events-none absolute h-[443px] w-[358px] object-cover opacity-0"
          alt={
            hoveredCategoryIndex !== null
              ? `${workshopItems[hoveredCategoryIndex].title} preview`
              : ""
          }
          aria-hidden={hoveredCategoryIndex === null}
          src={workshopItems[hoveredCategoryIndex ?? 0].image}
        />
      </section>

      {/* ============ FEATURED EVENTS (Wireframe - 5) ============ */}
      <section
        className="relative h-[1250px] w-full overflow-hidden bg-black"
        aria-labelledby="featured-events-heading"
      >
        <div
          className="absolute left-[-197px] top-[130px] h-[395px] w-[608px] rotate-[18.51deg] rounded-[303.78px/197.65px] bg-[#d9d9d9] opacity-[0.24] blur-[208.1px]"
          aria-hidden="true"
        />
        <div
          className="absolute left-[895px] top-[292px] h-[527px] w-[810px] rotate-[-6.92deg] rounded-[405px/263.5px] bg-[#d9d9d9] opacity-[0.24] blur-[208.1px]"
          aria-hidden="true"
        />
        <div
          className="absolute left-[137px] top-[1023px] h-[527px] w-[595px] rotate-[-6.92deg] rounded-[297.65px/263.5px] bg-[#d9d9d9] opacity-[0.24] blur-[208.1px]"
          aria-hidden="true"
        />
        <h2
          id="featured-events-heading"
          className="absolute left-[107px] top-[205px] w-[1062px] bg-[linear-gradient(143deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,1)_45%,rgba(255,255,255,0.3)_100%)] bg-clip-text text-8xl font-normal leading-[96px] tracking-[0] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] font-['Bietro_DEMO-Regular',Helvetica]"
        >
          FEATURED EVENTS
        </h2>
        <p className="absolute left-[107px] top-[313px] whitespace-nowrap font-['Space_Grotesk-Regular',Helvetica] text-[22px] font-normal leading-[30.8px] tracking-[0] text-white">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <button
          type="button"
          className="absolute left-[48px] top-[680px] z-10 flex h-12 w-12 rotate-90 items-center justify-center border border-white disabled:cursor-not-allowed disabled:opacity-30"
          onClick={() => moveFeatured(-1)}
          disabled={featuredIndex === 0}
          aria-label="Previous featured events"
        >
          <img className="h-6 w-6" src={arrowDownRight} alt="" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="absolute right-[48px] top-[680px] z-10 flex h-12 w-12 -rotate-90 items-center justify-center border border-white disabled:cursor-not-allowed disabled:opacity-30"
          onClick={() => moveFeatured(1)}
          disabled={featuredIndex === featuredEvents.length - 1}
          aria-label="Next featured events"
        >
          <img className="h-6 w-6" src={arrowDownRight} alt="" aria-hidden="true" />
        </button>
        <div className="absolute left-[107px] top-[403px] w-[calc(100%-107px)] overflow-hidden">
          <div
            className="flex w-max items-center gap-[11px] transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${featuredIndex * 412}px)` }}
          >
          {featuredEvents.map((event, index) => (
            <article
              key={index}
              className="relative h-[569px] w-[401px] shrink-0 overflow-hidden border border-solid border-white"
            >
              <img
                className="absolute left-0 top-0 h-[501px] w-[401px] object-cover"
                alt={`Featured event ${index + 1}`}
                src={event.image}
              />
              <button
                type="button"
                className="absolute left-px top-[501px] flex h-[68px] w-[397px] cursor-pointer items-center justify-between px-[13px] text-left"
                aria-label={`Register now for featured event ${index + 1}`}
                onClick={() => handleRegistration(index)}
              >
                <span className="font-['Space_Grotesk-Regular',Helvetica] text-[32px] font-normal leading-8 tracking-[0] text-white">
                  REGISTER NOW
                </span>
                <img
                  className="h-8 w-8 -rotate-90"
                  alt=""
                  aria-hidden="true"
                  src={arrowDownRight}
                />
              </button>
            </article>
          ))}
          </div>
        </div>
      </section>

      {/* ============ AFTERMOVIE (Wireframe - 3) ============ */}
      <section className="relative h-[1024px] w-full bg-black">
        <div className="absolute left-1/2 top-1/2 h-[999px] w-[1415px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <video
            className="absolute left-0 top-0 h-full w-full object-cover opacity-80"
            src={aftermovieVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-label="Drishti '24 aftermovie"
          />
          <img
            className="pointer-events-none absolute left-[10px] top-[898px] h-px w-[1375px]"
            alt=""
            aria-hidden="true"
            src={aftermovieLine}
          />
          <p className="pointer-events-none absolute left-[55px] top-[925px] whitespace-nowrap font-['Mango_Grotesque-SemiBold',Helvetica] text-[58px] leading-[normal] text-white">
            DRISHTI &lsquo;24
          </p>
          <p className="pointer-events-none absolute left-[1205px] top-[925px] whitespace-nowrap font-['Mango_Grotesque-SemiBold',Helvetica] text-[58px] leading-[normal] text-white">
            AFTERMOVIE
          </p>
        </div>
        <img
          className="pointer-events-none absolute left-[709px] top-[943px] h-[45px] w-[47px] object-cover"
          alt="Drishti"
          src={aftermovieLogo}
        />
      </section>

      {/* ============ GALLERY (Wireframe - 7) ============ */}
      <section className="relative h-[1024px] w-full bg-black" aria-label="Event gallery">
        <div className="absolute left-1/2 top-1/2 h-[999px] w-[1415px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          {galleryImages.map((image, index) => (
            <img
              key={index}
              className={`absolute ${image.className} object-cover opacity-80`}
              alt={`Gallery photo ${index + 1}`}
              src={image.src}
            />
          ))}
        </div>
      </section>

      {/* ============ READY TO BUILD THE FUTURE? (Wireframe - 8) ============ */}
      <section
        className="relative flex h-[1404px] w-full flex-col items-center bg-black"
        aria-label="Registration call to action"
      >
        <p className="mt-[201px] font-['Bietro_DEMO-Regular',Helvetica] text-[156px] leading-none text-white">
          DRISHTI
        </p>
        <div className="mt-[98px] w-[715px] text-center font-['Clash_Display-Medium',Helvetica] text-[72px] leading-[normal] tracking-[1.44px] text-white">
          <p className="m-0">READY TO BUILD</p>
          <p className="m-0">THE FUTURE?</p>
        </div>
        <a
          href="#register"
          className="mt-[91px] flex h-[103px] w-[514px] items-center justify-center rounded-[50px] border-2 border-solid border-[#ffc132] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <span className="bg-gradient-to-b from-[#ffc746] via-[52.404%] via-[#ffd779] to-[#8d6200] bg-clip-text text-center font-['Clash_Display-Medium',Helvetica] text-[40px] leading-[normal] text-transparent">
            Register Now
          </span>
        </a>
      </section>

      <Footer />
    </main>
  );
}

export default Home;