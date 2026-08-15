import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown, ArrowUpRight, BriefcaseBusiness, Check, Code2, CreditCard,
  Bot, Database, GraduationCap, Mail, MapPin, Menu, Send, Server, Sparkles, X,
} from 'lucide-react';
import './styles.css';

const PROFILE = {
  email: 'tripathi.mratyunjay.1@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mratyunjay007',
  github: 'https://github.com/mratyunjay-tripathi',
};

const skills = [
  { icon: <CreditCard />, number: '01', title: 'Lending & payments', text: 'End-to-end loan origination, underwriting, disbursal, UPI/NACH collections, settlement, KYC and India Stack integrations.' },
  { icon: <Database />, number: '02', title: 'Backend architecture', text: 'Django microservices, event-driven processing and high-volume PostgreSQL systems designed for scale, isolation and resilience.' },
  { icon: <Server />, number: '03', title: 'Cloud & delivery', text: 'AWS EKS platforms and GitOps delivery workflows built with Kubernetes, Docker, ArgoCD and GitHub Actions.' },
];

const experience = [
  { years: '2023 — Present', role: 'Senior Software Engineer', company: 'Kosh', location: 'Gurugram, India', current: true },
  { years: '2021 — 2022', role: 'Full Stack Developer', company: 'Kosh', location: 'Gurugram, India' },
  { years: 'May — Jul 2019', role: 'Cloud Associate (Internship)', company: 'Ericsson India Global Services', location: 'Noida, India' },
  { years: 'Jan — Feb 2019', role: 'Software Developer (Internship)', company: 'Infinocto Engineers', location: 'Noida, India' },
];

const certifications = ['Certified Ethical Hacker (CEH)', 'DSA Certification', 'Android Developer', 'C++ Advanced', 'Internshala Buildathon'];

const starterQuestions = ['What lending systems have you built?', 'What impact have you delivered?', 'Tell me about your tech stack'];

function TwinChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(null);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi, I’m Mratyunjay’s digital twin. Ask me about his lending and payments work, engineering impact, architecture or leadership experience." },
  ]);

  useEffect(() => {
    if (!open || !messagesRef.current) return;
    const frame = requestAnimationFrame(() => {
      messagesRef.current?.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: messages.length > 1 ? 'smooth' : 'auto',
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [messages, loading, open]);

  const sendMessage = async (text) => {
    const question = (text ?? input).trim();
    if (!question || loading) return;
    const history = messages.slice(1);
    setMessages(current => [...current, { role: 'user', content: question }]);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setMessages(current => [...current, { role: 'assistant', content: data.answer }]);
    } catch (error) {
      setMessages(current => [...current, { role: 'assistant', content: error.message || 'I couldn’t answer just now. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return <div className="twin-chat">
    {open && <section className="chat-panel" aria-label="Chat with Mratyunjay's digital twin">
      <header className="chat-header">
        <div className="chat-avatar"><Bot size={21} /></div>
        <div><strong>Mratyunjay AI</strong><span><i /> Digital twin · Online</span></div>
        <button onClick={() => setOpen(false)} aria-label="Close chat"><X size={19} /></button>
      </header>
      <div className="chat-messages" ref={messagesRef} aria-live="polite">
        {messages.map((message, index) => <div className={`chat-message chat-message--${message.role}`} key={index}>{message.content}</div>)}
        {loading && <div className="chat-message chat-message--assistant chat-typing"><span /><span /><span /></div>}
        {messages.length === 1 && <div className="chat-suggestions">
          {starterQuestions.map(question => <button key={question} onClick={() => sendMessage(question)}>{question}</button>)}
        </div>}
      </div>
      <form className="chat-form" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
        <input value={input} onChange={event => setInput(event.target.value)} maxLength={1000} placeholder="Ask about my profile…" aria-label="Your question" />
        <button type="submit" disabled={!input.trim() || loading} aria-label="Send message"><Send size={17} /></button>
      </form>
      <small>AI answers may be imperfect. Verify important details directly.</small>
    </section>}
    <button className={open ? 'chat-launcher chat-launcher--open' : 'chat-launcher'} onClick={() => setOpen(!open)} aria-label={open ? 'Close digital twin chat' : 'Chat with my digital twin'}>
      {open ? <X /> : <><Sparkles size={20} /><span>Ask my AI twin</span></>}
    </button>
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <nav className={scrolled ? 'nav nav--scrolled' : 'nav'} aria-label="Main navigation">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Mratyunjay Tripathi home">MT<span>.</span></a>
        <div className={menuOpen ? 'nav-links nav-links--open' : 'nav-links'}>
          <a href="#expertise" onClick={closeMenu}>Expertise</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-contact" href={`mailto:${PROFILE.email}`}>Let’s talk <ArrowUpRight size={16} /></a>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <main>
        <section className="hero" id="top">
          <div className="hero-glow" />
          <div className="eyebrow"><span className="status-dot" /> Payments · Lending · Platform Engineering</div>
          <h1>Engineering financial<br />systems that <em>scale.</em></h1>
          <p className="hero-copy">I’m <strong>Mratyunjay Tripathi</strong>, a Senior Software Engineer building payments and lending infrastructure for consumer credit at scale.</p>
          <div className="hero-actions">
            <a className="button button--primary" href={`mailto:${PROFILE.email}`}>Start a conversation <ArrowUpRight size={18} /></a>
            <a className="button button--ghost" href="#experience">Explore my work <ArrowDown size={18} /></a>
          </div>
          <div className="hero-meta">
            <div><span>Based in</span><strong><MapPin size={16} /> Gurugram, India</strong></div>
            <div><span>Experience</span><strong>5+ years</strong></div>
            <div><span>Specialising in</span><strong>Payments & Lending</strong></div>
          </div>
          <div className="scroll-note"><span>SCROLL TO DISCOVER</span><i /></div>
        </section>

        <section className="section expertise" id="expertise">
          <div className="section-heading">
            <div><span className="kicker">01 / EXPERTISE</span><h2>Complex finance into<br /><em>dependable systems.</em></h2></div>
            <p>I combine deep backend engineering, financial-domain knowledge and hands-on leadership to build infrastructure that performs under real-world scale.</p>
          </div>
          <div className="skill-grid">
            {skills.map((skill) => <article className="skill-card" key={skill.number}>
              <div className="skill-card-top"><span className="skill-icon">{skill.icon}</span><span>{skill.number}</span></div>
              <h3>{skill.title}</h3><p>{skill.text}</p>
              <div className="card-line" />
            </article>)}
          </div>
          <div className="stack-row">
            <span>CORE STACK</span>
            <div>{['Python', 'Django REST', 'PostgreSQL', 'Redis', 'Celery', 'AWS EKS', 'Kubernetes', 'ArgoCD', 'React'].map(item => <b key={item}>{item}</b>)}</div>
          </div>
        </section>

        <section className="section experience" id="experience">
          <div className="section-heading section-heading--light">
            <div><span className="kicker">02 / EXPERIENCE</span><h2>Building, learning,<br /><em>leading forward.</em></h2></div>
            <p>From cloud foundations to lending infrastructure, my work is grounded in end-to-end ownership, measurable outcomes and engineering leadership.</p>
          </div>
          <div className="timeline">
            {experience.map((item, index) => <article className="timeline-item" key={`${item.company}-${item.role}`}>
              <div className="timeline-index">0{index + 1}</div>
              <div className="timeline-years">{item.years}{item.current && <span>Current</span>}</div>
              <div className="timeline-main"><h3>{item.role}</h3><p>{item.company}</p>{index === 0 && <small>Leading lending, payments and platform engineering</small>}</div>
              <div className="timeline-location"><MapPin size={15} /> {item.location}</div>
            </article>)}
          </div>
        </section>

        <section className="section about" id="about">
          <div className="about-statement">
            <span className="kicker">03 / ABOUT</span>
            <blockquote>“I build financial infrastructure that is <em>scalable, resilient</em> and grounded in measurable impact.”</blockquote>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p>At Kosh, I have led loan-origination and lending-partner integrations across underwriting, disbursal, UPI/NACH collections and settlement. A five-engineer LOS rebuild serving 30,000 daily users helped scale monthly disbursal from ₹30 crore to ₹100 crore.</p>
              <p>Today, I’m the senior-most engineer on a 15-person technology team and lead a squad of four. My focus is building dependable financial platforms, improving developer velocity and helping teams turn complex systems into clear outcomes.</p>
              <div className="social-links">
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={18} /> LinkedIn <ArrowUpRight size={15} /></a>
                <a href={PROFILE.github} target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub <ArrowUpRight size={15} /></a>
              </div>
            </div>
            <div className="credentials">
              <div className="education-card">
                <GraduationCap />
                <span>EDUCATION</span>
                <h3>B.Tech, Computer Science</h3>
                <p>Jaypee Institute of Information Technology</p>
                <small>2016 — 2020 · Noida, India</small>
              </div>
              <div className="cert-card">
                <div className="cert-title"><BriefcaseBusiness /><span>CREDENTIALS</span></div>
                {certifications.map(cert => <p key={cert}><Check size={15} /> {cert}</p>)}
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <span className="kicker">LET’S BUILD SOMETHING MEANINGFUL</span>
          <h2>Have a project in mind?<br /><em>Let’s talk.</em></h2>
          <a className="email-link" href={`mailto:${PROFILE.email}`}>{PROFILE.email}<ArrowUpRight /></a>
          <div className="contact-orb"><Mail size={28} /></div>
        </section>
      </main>

      <footer>
        <a className="brand brand--footer" href="#top">MT<span>.</span></a>
        <p>© {new Date().getFullYear()} Mratyunjay Tripathi. Built with intention.</p>
        <div><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a></div>
      </footer>
      <TwinChat />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
