import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const heroImage = "/assets/main.png";
const diningImage = "/assets/int2.png";
const banquetImage = "/assets/banq.png";
const occasionImage = "/assets/int1.png";
const logoImage = "/assets/logo.png";

const highlights = [
  { number: "01", title: "The room", copy: "A high-ceiling contemporary dining space where architecture, warmth and atmosphere meet.", image: diningImage },
  { number: "02", title: "The table", copy: "Reservation-led dining designed to make every visit feel personal, unhurried and worth remembering.", image: heroImage },
  { number: "03", title: "The occasion", copy: "A pillar-free banquet hall for celebrations, gatherings and beautifully considered events.", image: banquetImage },
];

const eventDetails = [
  { icon: Users, eyebrow: "Capacity", title: "50—250 guests", copy: "A flexible, pillar-free banquet hall built for intimate gatherings and grand celebrations." },
  { icon: Sparkles, eyebrow: "Atmosphere", title: "30+ lighting themes", copy: "Shape the mood with a lighting language that feels right for your moment, from understated to dramatic." },
  { icon: CalendarDays, eyebrow: "Hospitality", title: "Built for moments", copy: "From everyday dining to weddings, corporate events, live performances and DJ-led evenings." },
];

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`section-label ${light ? "section-label-light" : ""}`}><span className="section-label-line" /><span>{children}</span></div>;
}

function ReservationModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"choices" | "email">("choices");
  const [guests, setGuests] = useState(2);

  const submitEmailRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Cuore reservation request — ${data.get("date") || "date to be confirmed"}`;
    const body = `Hello Cuore team,\n\nI would like to request a table.\nDate: ${data.get("date")}\nSession: ${data.get("session")}\nGuests: ${guests}\nPhone: ${data.get("phone")}\n\nThank you.`;
    window.location.href = `mailto:hello@masaladiaries.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (mode === "choices") {
    return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="reservation-choice-title"><div className="reservation-modal"><button className="modal-close" onClick={onClose} aria-label="Close reservation options"><X size={18} /></button><SectionLabel>Reservation only</SectionLabel><h2 id="reservation-choice-title">Choose your<br /><em>way to Cuore.</em></h2><p className="modal-intro">Our team is ready to help you plan your table. Choose the quickest option below.</p><div className="reservation-choices"><a className="reservation-choice" href="tel:+919099031031"><span className="choice-icon"><Phone size={18} /></span><span><strong>Call directly</strong><small>+91 90990 31031</small></span><ArrowUpRight size={16} /></a><a className="reservation-choice" href="https://wa.me/919099031031?text=Hello%20Cuore%20team%2C%20I%27d%20like%20to%20reserve%20a%20table." target="_blank" rel="noreferrer"><span className="choice-icon"><span className="whatsapp-glyph">w</span></span><span><strong>Chat on WhatsApp</strong><small>Message the reservations team</small></span><ArrowUpRight size={16} /></a><button className="reservation-choice" onClick={() => setMode("email")}><span className="choice-icon"><Mail size={18} /></span><span><strong>Request by email</strong><small>Fill in your preferred details</small></span><ArrowUpRight size={16} /></button></div><small>For banquet enquiries and events, please call or WhatsApp us directly.</small></div></div>;
  }

  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="reservation-email-title"><div className="reservation-modal"><button className="modal-close" onClick={onClose} aria-label="Close reservation form"><X size={18} /></button><button className="modal-back" onClick={() => setMode("choices")}><ArrowUpRight size={14} className="rotate-left" /> Back to options</button><SectionLabel>Request by email</SectionLabel><h2 id="reservation-email-title">Make it a<br /><em>Cuore moment.</em></h2><p className="modal-intro">Share your preferred details and your email app will open with a ready-to-send request.</p><form onSubmit={submitEmailRequest}><div className="form-grid"><label><span>Date</span><div className="input-wrap"><CalendarDays size={15} /><input name="date" type="date" required defaultValue="2026-10-10" /></div></label><label><span>Session</span><div className="input-wrap"><Clock3 size={15} /><select name="session" defaultValue="7:30 PM"><option>12:30 PM</option><option>2:00 PM</option><option>7:30 PM</option><option>9:00 PM</option></select><ChevronDown size={14} /></div></label></div><div className="guest-field"><span>Guests</span><div className="guest-stepper"><button type="button" aria-label="Decrease guests" onClick={() => setGuests(Math.max(1, guests - 1))}><Minus size={15} /></button><strong>{guests.toString().padStart(2, "0")}</strong><button type="button" aria-label="Increase guests" onClick={() => setGuests(Math.min(20, guests + 1))}><Plus size={15} /></button></div></div><label><span>Phone number</span><div className="input-wrap"><Phone size={15} /><input name="phone" type="tel" required placeholder="+91 00000 00000" /></div></label><button className="button button-solid button-full" type="submit">Open email request <Mail size={16} /></button><small>Request email: hello@masaladiaries.in</small></form></div></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(0);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return <div className="site-shell">
    <div className="top-note"><span>Built by heart · Experienced by you</span><span className="top-note-dot" /><span>Rajkot · Open daily 11 AM—11 PM</span></div>
    <header className="site-header"><button className="brand brand-logo" onClick={() => scrollTo("home")} aria-label="Cuore home"><span className="logo-lockup"><img src={logoImage} alt="Cuore by Masala Diaries" /></span></button><nav className={`main-nav ${menuOpen ? "nav-open" : ""}`}><button onClick={() => scrollTo("story")}>The Cuore story</button><button onClick={() => scrollTo("experience")}>The experience</button><button onClick={() => scrollTo("banquet")}>Banquets</button><button onClick={() => scrollTo("visit")}>Find us</button><button className="nav-reserve" onClick={() => { setReservationOpen(true); setMenuOpen(false); }}>Reserve a table <ArrowUpRight size={14} /></button></nav><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></header>

    <main>
      <section className="hero" id="home"><img className="hero-image" src={heroImage} alt="The warm, high-ceiling dining room at Cuore by Masala Diaries" /><div className="hero-shade" /><div className="hero-grain" /><div className="hero-content container"><div className="hero-kicker"><span className="kicker-rule" /><span>Cuore · Rajkot</span></div><h1>Built by<br /><em>heart.</em></h1><p className="hero-copy">A space where ambience meets moments — considered dining, thoughtful details and hospitality that stays with you.</p><div className="hero-actions"><button className="button button-solid" onClick={() => setReservationOpen(true)}>Reserve a table <ArrowUpRight size={16} /></button><a className="button button-outline-light" href="https://drive.google.com/file/d/12RDm1yXoSuwT2SC4AuZv5DloucsoXlq8/view" target="_blank" rel="noreferrer">View menu <ArrowUpRight size={16} /></a></div></div><div className="hero-side-note"><span>Rajkot · Gujarat</span><span>Near New 150 Ft. Ring Road</span></div><button className="scroll-cue" onClick={() => scrollTo("story")} aria-label="Scroll to discover"><span>Discover</span><ArrowDown size={16} /></button></section>

      <section className="intro section-dark" id="story"><div className="container intro-grid"><div className="intro-aside"><span className="vertical-word">CUORE / MASALA DIARIES</span><span className="vertical-rule" /></div><div className="intro-main"><SectionLabel>Welcome to Cuore</SectionLabel><h2>Where ambience<br /><em>meets moments.</em></h2><p className="lead-copy">Cuore by Masala Diaries is a premium hospitality destination in Rajkot, bringing refined dining and large-format celebrations together in one thoughtfully designed space.</p><p className="lead-copy lead-copy-small">From a warm table for two to a full-scale occasion, every detail is built around how you want to feel.</p><button className="text-link" onClick={() => scrollTo("experience")}>Explore the experience <ArrowUpRight size={16} /></button></div><div className="intro-stat"><span className="stat-number">11—11</span><span className="stat-rule" /><span>Open daily<br />for your moments</span></div></div></section>

      <section className="menu-section section-paper" id="experience"><div className="container"><div className="section-heading-row"><div><SectionLabel light>The Cuore experience</SectionLabel><h2>Designed for<br /><em>your kind of evening.</em></h2></div><div className="heading-note">A room to settle into.<br />A table to return to.<br />A celebration to remember.</div></div><div className="dish-feature"><div className="dish-image-wrap"><img src={highlights[activeHighlight].image} alt={highlights[activeHighlight].title} /><span className="dish-image-label">Cuore / {highlights[activeHighlight].number}</span></div><div className="dish-details"><div className="dish-number">{highlights[activeHighlight].number} <span>/ 03</span></div><h3>{highlights[activeHighlight].title}</h3><p>{highlights[activeHighlight].copy}</p><div className="dish-price">A space for every mood</div><div className="dish-nav"><button onClick={() => setActiveHighlight((activeHighlight + highlights.length - 1) % highlights.length)} aria-label="Previous highlight"><ArrowUpRight size={17} className="rotate-left" /></button><button onClick={() => setActiveHighlight((activeHighlight + 1) % highlights.length)} aria-label="Next highlight"><ArrowUpRight size={17} /></button></div></div></div><div className="dish-list">{highlights.map((highlight, index) => <button key={highlight.number} className={`dish-list-item ${index === activeHighlight ? "is-active" : ""}`} onClick={() => setActiveHighlight(index)}><span>{highlight.number}</span><span>{highlight.title}</span><span>Cuore</span><ArrowUpRight size={14} /></button>)}</div><div className="menu-footer"><p>Reservation basis only<br /><span>Call +91 90990 31031 to find your table.</span></p><button className="button button-outline-dark" onClick={() => setReservationOpen(true)}>Reserve your table <ArrowUpRight size={16} /></button></div></div></section>

      <section className="story section-dark" id="banquet"><div className="container story-grid"><div className="story-image"><img src={occasionImage} alt="Candlelit celebration dining setup" /><div className="image-caption"><span>For your moment</span><span>Celebrations at Cuore</span></div></div><div className="story-copy"><SectionLabel>For the occasion</SectionLabel><h2>Make the moment<br /><em>worth remembering.</em></h2><p>Cuore’s premium banquet hall is a pillar-free space made for elegant celebrations and grand gatherings. Bring your people together in a room that can become exactly what the occasion needs.</p><p>With a capacity of 50–250 guests and more than 30 mood-lighting themes, the setting can move from understated to spectacular without losing its warmth.</p><button className="text-link light-link" onClick={() => window.location.href = "tel:+919099031031"}>Enquire about your event <ArrowUpRight size={16} /></button></div></div></section>

      <section className="experience section-cream"><div className="container"><div className="experience-head"><div><SectionLabel>Made for moments</SectionLabel><h2>The Cuore<br /><em>standard.</em></h2></div><p>From the first welcome to the final photograph, the details are designed to feel considered.</p></div><div className="experience-grid">{eventDetails.map(({ icon: Icon, eyebrow, title, copy }, index) => <div className="experience-card" key={title}><div className="experience-icon"><Icon size={20} strokeWidth={1.4} /></div><span className="card-index">0{index + 1}</span><span className="card-eyebrow">{eyebrow}</span><h3>{title}</h3><p>{copy}</p><button className="circle-arrow" onClick={() => setReservationOpen(true)} aria-label={`Enquire about ${title}`}><ArrowUpRight size={16} /></button></div>)}</div></div></section>

      <section className="quote-section section-paper"><div className="container quote-inner"><div className="quote-mark">“</div><blockquote>Every part of your day<br /><em>has its own story.</em></blockquote><div className="quote-credit"><span className="quote-rule" /><span>Cuore by Masala Diaries · Rajkot</span></div></div></section>

      <section className="visit section-dark" id="visit"><div className="container visit-grid"><div><SectionLabel>Find your way here</SectionLabel><h2>Come for the room.<br /><em>Stay for the moment.</em></h2><div className="visit-actions"><button className="button button-solid" onClick={() => setReservationOpen(true)}>Reserve a table <ArrowUpRight size={16} /></button><a className="button button-outline-light" href="tel:+919099031031"><Phone size={15} /> Call now</a></div></div><div className="visit-details"><div className="detail"><MapPin size={17} /><div><strong>Beside Coconut County Party Lawns</strong><span>Near New 150 Ft. Ring Road, Rajkot<br />Gujarat 360004, India</span></div></div><div className="detail"><Clock3 size={17} /><div><strong>Open daily · 11:00 AM—11:00 PM</strong><span>Reservation sessions: 12:30 PM · 2:00 PM<br />7:30 PM · 9:00 PM</span></div></div><div className="detail"><Phone size={17} /><div><strong>+91 90990 31031</strong><span>Reservations & banquet enquiries</span></div></div></div></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-top"><div className="footer-brand"><div className="brand static-brand brand-logo"><span className="logo-lockup"><img src={logoImage} alt="Cuore by Masala Diaries" /></span></div><p>Built by heart.<br />Experienced by you.</p></div><div className="footer-links"><div><span>Explore</span><button onClick={() => scrollTo("story")}>The Cuore story</button><button onClick={() => scrollTo("experience")}>The experience</button><button onClick={() => scrollTo("banquet")}>Banquets</button></div><div><span>Stay connected</span><a href="https://www.instagram.com/cuorebymasaladiaries/" target="_blank" rel="noreferrer"><Instagram size={15} /> Instagram</a><a href="tel:+919099031031"><Phone size={15} /> +91 90990 31031</a><a href="mailto:hello@masaladiaries.in"><Mail size={15} /> Enquiries</a></div></div></div><div className="container footer-bottom"><span>© 2026 Cuore by Masala Diaries</span><span className="ventures"><strong>OUR VENTURES</strong><span>Masala Diaries</span><i>|</i><span>Downtown Restro Cafe</span></span><span>Rajkot, Gujarat</span></div></footer>
    <button className="floating-reserve" onClick={() => setReservationOpen(true)}><span>Reserve</span><ArrowUpRight size={15} /></button>
    {reservationOpen && <ReservationModal onClose={() => setReservationOpen(false)} />}
  </div>;
}

export { Home };
