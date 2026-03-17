import { motion, type Easing } from "framer-motion";
import { Tent, Home, Droplets, Flame, Instagram } from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";
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
  desc: "More private, immersive stays in nature",
  iconColor: "text-primary"
},
{
  icon: Home,
  title: "Earth Studios",
  desc: "Grounded, design-forward dwellings built into the mountain",
  iconColor: "text-primary"
},
{
  icon: Droplets,
  title: "Bath House",
  desc: "Communal spa with sauna, hot tub, cold plunge, and outdoor showers",
  iconColor: "text-primary"
},
{
  icon: Flame,
  title: "Hike → Plunge → Sauna\nReset Circuit",
  desc: "Fire. Trail. Waterfall. Heat. Repeat.",
  iconColor: "text-clay"
}];


const benefits = [
"First access to book before public launch",
"Founding member pricing",
"Early access to gatherings and retreat dates",
"Invites to Founders' Sauna Socials",
"Priority notifications if community investment opens up"];


/* ── Page ── */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* ─── SECTION 1: HERO ─── */}
      <section id="hero" className="relative min-h-[100svh] flex items-start md:items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Mountain glamping landscape at Outercamp"
            className="w-full h-full object-cover"
            loading="eager" />

          <div className="absolute inset-0 bg-foreground/55" />
        </div>

        <div className="relative z-10 text-center px-6 pt-[6.5rem] md:pt-20 max-w-3xl mx-auto">
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="font-serif text-[45px] md:text-[4rem] text-sand-light leading-[1.1] mb-6 font-medium">

            Be First to Experience Outercamp 2.0
          </motion.h1>
          <motion.h2
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="font-sans text-lg md:text-xl text-sand/90 max-w-2xl mx-auto mb-4 leading-relaxed font-light">First access and founding rates for our expanded Blue Ridge glamping retreat — opening 2026. Limited capacity.

          </motion.h2>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={1.5}
            variants={fadeUp}
            className="font-sans text-base text-sand/60 max-w-xl mx-auto mb-6 md:mb-10 italic">

            Life at walking pace. Comforts that count.<br />Built with intention.
          </motion.p>
<motion.div
            initial="hidden"
            animate="visible"
            custom={1.8}
            variants={fadeUp}
            className="hidden md:flex items-center justify-center gap-3 font-sans text-xs text-sand/60 tracking-wide mb-3">
            <span>✓ First booking access</span>
            <span className="text-sand/30">·</span>
            <span>✓ Founders' Sauna Socials</span>
            <span className="text-sand/30">·</span>
            <span>✓ Founding rates</span>
          </motion.div>

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
      <section className="pt-[68px] pb-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}>

            <motion.h2
              custom={0}
              variants={fadeUp}
              className="text-foreground mb-10 text-center font-sans font-normal text-[2rem] md:text-[2.5rem]">

              <span className="font-handwritten">Two Brothers. 900 Miles.</span><br /><span className="font-serif font-light">Built by the Trail.</span>
            </motion.h2>

            <div className="flex flex-col md:flex-row md:items-center md:gap-10">
              <motion.div custom={0.5} variants={fadeUp} className="mb-10 md:mb-0 md:w-1/2 md:flex-shrink-0">
                <figure>
                  <img
                    src={trailImage}
                    alt="Ascending Dobson Knob before a storm in Pisgah National Forest"
                    className="w-full rounded-sm object-cover aspect-[3/4]"
                    loading="lazy" />
                  <figcaption className="mt-3 font-sans text-xs text-muted-foreground italic tracking-wide">
                    Day 3. Ascending Dobson Knob before a storm. Pisgah National Forest.
                  </figcaption>
                </figure>
              </motion.div>

              <motion.div
                custom={1}
                variants={fadeUp}
                className="font-sans text-muted-foreground leading-relaxed space-y-5 text-lg md:w-1/2">

                <p className="text-base">In the fall of 2025, we walked 900 miles across North Carolina — starting barefoot — from Outercamp to the Outer Banks on the Mountains to Sea Trail.</p>
                <p className="text-base">We began with 1,000 followers. Forty-six days later, 15,800 people were walking with us.</p>
                <p className="text-base">Along the way, our community unlocked our comforts:</p>
                <p className="text-foreground font-light leading-loose text-base">
                  Shoes.<br />
                  Coffee.<br />
                  Swimming holes.<br />
                  Hot food.<br />
                  Showers.<br />
                  Fire.
                </p>
                <p className="font-medium text-foreground text-xl">
                  That journey now guides Outercamp 2.0.
                </p>
              </motion.div>
            </div>

            <motion.div custom={2} variants={fadeUp} className="mt-12 text-center">
              <a href="#hero" className="inline-block px-8 py-4 border border-primary text-primary font-sans text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-300">

                Join the Founding Waitlist
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: DREAM OUTCOME ─── */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>

            <motion.h2 custom={0} variants={fadeUp} className="font-serif text-4xl md:text-[2.75rem] font-light text-foreground mb-6 text-center">

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
              <p className="text-foreground font-light">
                Slower mornings. &nbsp;Cold water. &nbsp;Real fire. &nbsp;Shared meals. &nbsp;Time outside.
              </p>
            </motion.div>
            <motion.div custom={2} variants={fadeUp} className="mt-12 text-center">

              <p className="font-serif text-3xl md:text-4xl text-foreground font-light leading-snug">
                This is not a resort.
              </p>
              <p className="font-serif text-3xl md:text-4xl text-clay font-medium mt-2 italic">
                It's a ritual.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 4: WHAT'S COMING ─── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16">

            <motion.h2
              custom={0}
              variants={fadeUp}
              className="font-serif text-4xl md:text-[2.75rem] font-light text-foreground">

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
                  <f.icon className={`w-7 h-7 ${f.iconColor} group-hover:text-primary-foreground transition-colors duration-500`} />
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground mb-3 whitespace-pre-line">
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

            <span className="font-handwritten text-lg">Built intentionally.<br />
            Scaled carefully.<br />
            Limited by design.</span>
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

                  <span className="text-clay">✔︎</span>
                  <span>{b}</span>
                </li>
              )}
            </motion.ul>
            <motion.div custom={2} variants={fadeUp} className="space-y-3 mb-10">
              <p className="font-sans text-foreground text-center text-base">
                Once founding capacity is reached, booking opens publicly at standard rates.
              </p>
              <p className="font-sans text-foreground font-semibold text-base text-center">
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

              Opening 2026. Limited access.
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