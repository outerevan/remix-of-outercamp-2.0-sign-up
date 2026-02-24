import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { Tent, Home, Droplets, Flame, Instagram } from "lucide-react";
import heroImage from "@/assets/hero-resort.jpg";
import trailImage from "@/assets/trail.jpg";

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
  desc: "More private, immersive stays"
},
{
  icon: Home,
  title: "Earth Studios",
  desc: "Grounded, design-forward dwellings built into the mountain"
},
{
  icon: Droplets,
  title: "Bath House",
  desc: "Communal spa space with sauna, hot tub, and outdoor showers"
},
{
  icon: Flame,
  title: "Hike → Plunge → Sauna Circuit",
  desc: "Fire. Trail. Waterfall. Heat. Repeat."
}];


const benefits = [
"First access to book before public launch",
"Founding member pricing",
"Early access to gatherings and retreat dates",
"Priority notification if crowdfunding opportunities open"];


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

          Founding rates and early booking windows are coming your way.
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

        Founding rates and early booking windows will be released to this list before public launch.
      </p>
    </form>);

};

/* ── Page ── */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── SECTION 1: HERO ─── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Mountain glamping landscape at Outercamp"
            className="w-full h-full object-cover"
            loading="eager" />

          <div className="absolute inset-0 bg-foreground/55" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="font-serif text-5xl md:text-7xl text-sand-light leading-[1.1] mb-6 font-medium">

            Be First to Experience Outercamp 2.0
          </motion.h1>
          <motion.h2
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="font-sans text-lg md:text-xl text-sand/90 max-w-2xl mx-auto mb-4 leading-relaxed font-light">Founding access to our expanded Blue Ridge mountain retreat — opening 2026. Limited capacity.


          </motion.h2>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={1.5}
            variants={fadeUp}
            className="font-sans text-base text-sand/60 max-w-xl mx-auto mb-10 italic">

            Life at walking pace. Comforts that count. Built with intention.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}>

            <WaitlistForm variant="dark" />
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2: DEMAND & MOVEMENT ─── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}>

            <motion.h2
              custom={0}
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl font-light text-foreground mb-10 text-center">

              2 Brothers. 900 Miles. Built by the Trail.
            </motion.h2>

            <motion.div custom={0.5} variants={fadeUp} className="mb-10">
              <img
                src={trailImage}
                alt="Brother on the Mountains to Sea Trail with backpack"
                className="w-full max-w-2xl mx-auto rounded-sm object-cover aspect-[4/3]"
                loading="lazy" />

            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUp}
              className="font-sans text-muted-foreground leading-relaxed space-y-5 text-lg max-w-3xl mx-auto">

              <p>
                In 2025, we walked 900 miles across North Carolina — starting barefoot — from Outercamp to the Outer Banks on the Mountains to Sea Trail.
              </p>
              <p>We began with 1,000 followers.
Forty-six days later, 15,800 people were walking with us.
              </p>
              <p>Along the way, our community unlocked our comforts:</p>
              <p className="text-foreground font-light leading-loose">
                Shoes.<br />
                Coffee.<br />
                Swimming holes.<br />
                Hot food. Showers.<br />
                Fire.
              </p>
              <p className="font-medium text-foreground">
                That journey now guides Outercamp 2.0.
              </p>
            </motion.div>

            <motion.div custom={2} variants={fadeUp} className="mt-12 text-center">
              <a
                href="#hero"
                className="inline-block px-8 py-4 border border-primary text-primary font-sans text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-300">

                Join the Founding Waitlist
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: DREAM OUTCOME ─── */}
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

              What Is Outercamp 2.0 Really About?
            </motion.h2>
            <motion.div
              custom={1}
              variants={fadeUp}
              className="font-sans text-lg text-muted-foreground leading-relaxed space-y-5">

              <p>
                Outercamp 2.0 expands from 5 off-grid yurts to an 11-unit eco-retreat and gathering venue in the Blue Ridge Mountains.
              </p>
              <p>But what we're really building is space:</p>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Space to disconnect from noise</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Space to reconnect with the people you love</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Space to reset in nature</span>
                </li>
              </ul>
              <p className="text-foreground font-light leading-loose">Slower mornings. Cold water. Real fire. Shared meals. Time outside.  Being with the people we love.



                <br />
                Cold water.<br />
                Real fire.<br />
                Shared meals.<br />
                Time outside.<br />
                Being with the people we love.
              </p>
            </motion.div>
            <motion.div custom={2} variants={fadeUp} className="mt-12 text-center">

              <p className="font-serif text-3xl md:text-4xl text-foreground font-light leading-snug">
                This is not a resort.
              </p>
              <p className="font-serif text-3xl md:text-4xl text-primary font-medium mt-2 italic">
                It's a ritual.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 4: WHAT'S COMING ─── */}
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

              What's Coming in 2026
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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0}
            variants={fadeUp}
            className="mt-16 text-center font-sans text-foreground leading-loose">

            Built intentionally.<br />
            Scaled carefully.<br />
            Limited by design.
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 5: SCARCITY & BENEFITS ─── */}
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
            <motion.div custom={2} variants={fadeUp} className="space-y-3 mb-10">
              <p className="font-sans text-foreground text-center text-base">
                Once founding capacity is reached, booking opens publicly at standard rates.
              </p>
              <p className="font-sans text-foreground font-semibold text-lg text-center">
                This list determines who gets first access.
              </p>
            </motion.div>
            <motion.div custom={3} variants={fadeUp} className="text-center">
              <a
                href="#hero"
                className="inline-block px-8 py-4 bg-primary text-primary-foreground font-sans text-sm tracking-widest uppercase hover:bg-forest-light transition-colors duration-300">

                Secure Founding Access
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL SECTION: CLOSING CTA ─── */}
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

              Opening 2026. Limited founding access.
            </motion.p>
            <motion.div custom={2} variants={fadeUp}>
              <WaitlistForm variant="dark" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 bg-foreground text-sand/70">
        <div className="container mx-auto px-6 text-center space-y-6">
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

          <div className="border-t border-sand/15 pt-6 mt-6 space-y-2">
            <p className="font-sans text-sand/50 text-sm">Not Ready to Wait?</p>
            <p className="font-sans text-sand/60 text-sm">Our glamping yurts and domes are open now in the Blue Ridge Mountains.

            </p>
            <a
              href="https://outercamp.staydirectly.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-5 py-2.5 border border-sand/30 text-sand/70 font-sans text-xs tracking-widest uppercase hover:border-sand/60 hover:text-sand-light transition-colors duration-300">

              Explore Available Stays →
            </a>
          </div>
        </div>
      </footer>
    </div>);

};

export default Index;