import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { Tent, Home, Droplets, Flame, Leaf, Instagram } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger } from
"@/components/ui/accordion";
import heroImage from "@/assets/hero-resort.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease }
  })
};

const features = [
{
  icon: Tent,
  title: "New Glamping Sites",
  desc: "Private, intentional stays designed for deep rest and reconnection."
},
{
  icon: Home,
  title: "Earth Studios",
  desc: "Grounded, design-forward spaces inspired by natural materials and quiet living."
},
{
  icon: Droplets,
  title: "Bath House",
  desc: "A communal ritual space for renewal, reset, and slowing down."
},
{
  icon: Flame,
  title: "The Hike → Plunge → Sauna Circuit",
  desc: "Start the fire. Take the trail. Return to heat. Cold plunge. Repeat."
}];


const faqs = [
{
  q: "When does Outercamp 2.0 open?",
  a: "Expansion is planned for 2026. Waitlist members will receive booking access first."
},
{
  q: "Where is Outercamp located?",
  a: "In the mountains of Western North Carolina."
},
{
  q: "Is this an investment opportunity?",
  a: "Waitlist members will be the first notified if crowdfunding opportunities open."
},
{
  q: "How many founding spots are there?",
  a: "Founding access is limited and will close once capacity is reached."
}];


const coreValues = [
"Simplicity (Minimalist Maxxing)",
"Grounding – Rooted in the earth",
"Slowness – Life at walking pace",
"Comforts That Count – Built with intention",
"Immersion – Like a backcountry camp spot",
"Gathering – For the people who matter most"];


const benefits = [
"First access to book Outercamp 2.0",
"Founding member pricing",
"Private pre-launch updates",
"Invitation to early crowdfunding opportunities (if opened)"];


/* ── Reusable form component ── */
const WaitlistForm = ({
  variant = "light"


}: {variant?: "light" | "dark";}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      setSubmitted(true);
      setName("");
      setEmail("");
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-8 rounded-lg border ${
        variant === "dark" ?
        "border-sand/20 bg-foreground/80" :
        "border-border bg-background"}`
        }>

        <Leaf className="w-10 h-10 text-primary mx-auto mb-4" />
        <p
          className={`font-serif text-2xl mb-2 ${
          variant === "dark" ? "text-sand-light" : "text-foreground"}`
          }>

          You're on the list
        </p>
        <p
          className={`text-sm ${
          variant === "dark" ? "text-sand/70" : "text-muted-foreground"}`
          }>

          We'll be in touch with exclusive updates.
        </p>
      </motion.div>);

  }

  const inputClass =
  variant === "dark" ?
  "w-full px-5 py-4 bg-foreground/60 border border-sand/20 text-sand-light font-sans text-sm placeholder:text-sand/40 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow" :
  "w-full px-5 py-4 bg-background border border-border text-foreground font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow";

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
      <input
        type="text"
        required
        maxLength={100}
        placeholder="First Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass} />

      <input
        type="email"
        required
        maxLength={255}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass} />

      <button
        type="submit"
        className="w-full px-8 py-4 bg-primary text-primary-foreground font-sans text-sm tracking-widest uppercase hover:bg-forest-light transition-colors duration-300">

        🔓 Unlock Founding Access
      </button>
      <p
        className={`text-xs text-center ${
        variant === "dark" ? "text-sand/50" : "text-muted-foreground"}`
        }>

        {variant === "dark" ?
        "Opening 2026. Limited founding access." :
        "Founding rates will be limited. No spam. Ever."}
      </p>
    </form>);

};

/* ── Page ── */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── SECTION 1: HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Mountain glamping landscape at Outercamp"
            className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-foreground/55" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="font-serif text-5xl md:text-7xl font-light text-sand-light leading-[1.1] mb-6">
            Be First to Experience Outercamp 2.0

          </motion.h1>
          <motion.h2
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="font-sans text-lg md:text-xl text-sand/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">

            Join the Founding Waitlist for Our 11-Unit Mountain Eco-Resort
            Expansion Opening in 2026.
          </motion.h2>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}>

            <WaitlistForm variant="dark" />
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: STORY / SOCIAL PROOF ─── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}>

            <motion.h2
              custom={0}
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8 text-center">

              900 Miles. Barefoot. Built by the Trail.
            </motion.h2>
            <motion.div
              custom={1}
              variants={fadeUp}
              className="font-sans text-muted-foreground leading-relaxed space-y-5 text-lg">

              <p>
                In 2025, my brother and I walked 900 miles across North Carolina
                — starting barefoot — from Outercamp to the Outer Banks along
                the Mountain-to-Sea Trail.
              </p>
              <p>
                We began with 1,000 followers.
                <br />
                46 days later, 15,800 people were walking with us.
              </p>
              <p>
                Our community unlocked our comforts along the way:
                <br />
                Shoes. Coffee. Swimming holes. Hot food. Showers.
              </p>
              <p className="font-medium text-foreground">
                That journey now guides Outercamp 2.0.
              </p>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUp}
              className="mt-12 text-center">

              <a
                href="#final-cta"
                className="inline-block px-8 py-4 border border-primary text-primary font-sans text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-300">

                Join the Founding Waitlist
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: WHAT IT'S ABOUT ─── */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}>

            <motion.h2
              custom={0}
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl font-light text-foreground mb-6 text-center">

              What Outercamp 2.0 Is Really About
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="font-sans text-lg text-muted-foreground leading-relaxed mb-10 text-center">

              Outercamp 2.0 is a 2x expansion of our mountain glamping retreat —
              designed to create more space for nature, deeper rest, and
              meaningful gathering.
            </motion.p>
            <motion.ul custom={2} variants={fadeUp} className="space-y-3">
              {coreValues.map((v) =>
              <li
                key={v}
                className="font-sans text-foreground flex items-start gap-3">

                  <span className="text-primary mt-1">•</span>
                  <span>{v}</span>
                </li>
              )}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 4: WHAT WE'RE BUILDING ─── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16">

            <motion.h2
              custom={0}
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl font-light text-foreground">

              What We're Building
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {features.map((f, i) =>
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
              variants={fadeUp}
              className="text-center group">

                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                  <f.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                  {f.title}
                </h3>
                <p className="font-sans text-muted-foreground leading-relaxed text-sm">
                  {f.desc}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: WHY JOIN NOW ─── */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}>

            <motion.h2
              custom={0}
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl font-light text-foreground mb-10 text-center">

              Why Join the Founding Waitlist?
            </motion.h2>
            <motion.ul custom={1} variants={fadeUp} className="space-y-4 mb-10">
              {benefits.map((b) =>
              <li
                key={b}
                className="font-sans text-foreground flex items-start gap-3 text-lg">

                  <span className="text-primary">✔</span>
                  <span>{b}</span>
                </li>
              )}
            </motion.ul>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="font-sans text-foreground font-semibold text-lg text-center mb-10">

              Once founding spots are claimed, they're gone.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="text-center">
              <a
                href="#final-cta"
                className="inline-block px-8 py-4 bg-primary text-primary-foreground font-sans text-sm tracking-widest uppercase hover:bg-forest-light transition-colors duration-300">

                Secure Founding Access
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 6: FINAL CTA ─── */}
      <section
        id="final-cta"
        className="py-24 md:py-32 bg-foreground text-sand-light">

        <div className="container mx-auto px-6 max-w-xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}>

            <motion.h2
              custom={0}
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl font-light mb-4">

              Be Part of the First Footprints.
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="font-sans text-sand/80 mb-10 leading-relaxed">

              More experiences in nature. With the people you love. Built with
              intention.
            </motion.p>
            <motion.div custom={2} variants={fadeUp}>
              <WaitlistForm variant="dark" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 7: FAQ ─── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}>

            <motion.h2
              custom={0}
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl font-light text-foreground mb-12 text-center">

              Frequently Asked Questions
            </motion.h2>
            <motion.div custom={1} variants={fadeUp}>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) =>
                <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="font-sans text-foreground text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 bg-foreground text-sand/70">
        <div className="container mx-auto px-6 text-center space-y-4">
          <a
            href="https://www.instagram.com/outercamp.us/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sand/70 hover:text-sand-light transition-colors font-sans text-sm">

            <Instagram className="w-5 h-5" />
            @outercamp.us
          </a>
          <div className="flex items-center justify-center gap-4 text-xs font-sans tracking-widest uppercase">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>© 2026 Outercamp</span>
          </div>
        </div>
      </footer>
    </div>);

};

export default Index;