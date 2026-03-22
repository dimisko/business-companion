import { motion } from "framer-motion";
import { Download, Mail, MessageCircle, Linkedin, Github, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArchDiagram } from "@/components/ArchDiagram";

// ─── Edit your info here ───────────────────────────────────────────────────
const PROFILE_DATA = {
  name: "Dime Mishkov",
  headline: "Co-Founder @ JasITi | Java Software Engineer @ HTEC",
  proof: "14+ years building scalable backend systems",
  bio: "Senior Java Engineer and Technical Lead with 14+ years building scalable, high-performance backend systems for healthcare and enterprise. Known for clean architecture, strong team leadership, and moving fast without breaking things.",
  imagePath: `${import.meta.env.BASE_URL}profile.jpg`,    // drop profile.jpg in public/
  cvPath: `${import.meta.env.BASE_URL}Dime-Mishkov-CV.pdf`, // drop CV in public/
  email: "dime.mishkov@gmail.com",
  whatsapp: "https://wa.me/38970757009",
  linkedin: "https://www.linkedin.com/in/dimemishkov",
  github: "https://github.com/dimisko",
  bold: "https://bold.pro/my/dime-mishkov/476r",
  mensaEmail: "dime.mishkov.mk@member.mensa.org",
};
// ──────────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

const avatarVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.1 } },
};

const PRIMARY_ACTION = { label: "Get My CV", href: PROFILE_DATA.cvPath, icon: Download, download: "Dime-Mishkov-CV.pdf" };
const SECONDARY_ACTIONS = [
  { label: "Email",     href: `mailto:${PROFILE_DATA.email}`, icon: Mail,          ariaLabel: "Email me" },
  { label: "WhatsApp",  href: PROFILE_DATA.whatsapp,          icon: MessageCircle, ariaLabel: "Message on WhatsApp", external: true },
  { label: "LinkedIn",  href: PROFILE_DATA.linkedin,          icon: Linkedin,      ariaLabel: "LinkedIn profile",    external: true },
];

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">

      {/* Background atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] opacity-60" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[460px] relative z-10 pt-16 mt-6 mb-4"
      >
        <Card className="bg-card/70 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/50 relative overflow-visible rounded-[2rem]">

          {/* Top edge glow */}
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Floating avatar */}
          <motion.div variants={avatarVariants} initial="hidden" animate="show" className="absolute -top-16 left-1/2 -translate-x-1/2">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl group-hover:bg-primary/40 transition-colors duration-500" />
              <Avatar className="w-32 h-32 border-[6px] border-background bg-card shadow-2xl relative z-10 transition-transform duration-500 hover:scale-[1.02]">
                <AvatarImage src={PROFILE_DATA.imagePath} alt="Dime Mishkov profile photo" className="object-cover" />
                <AvatarFallback className="text-3xl font-display font-bold text-primary bg-secondary">DM</AvatarFallback>
              </Avatar>
            </div>
          </motion.div>

          <CardContent className="pt-20 pb-6 px-5 sm:px-7 flex flex-col items-center text-center">

            {/* Identity */}
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="w-full">
              <motion.h1 variants={itemVariants} className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1.5">
                {PROFILE_DATA.name}
              </motion.h1>
              <motion.h2 variants={itemVariants} className="text-primary font-medium text-[15px] sm:text-base mb-4 leading-snug">
                {PROFILE_DATA.headline}
              </motion.h2>
              <motion.div variants={itemVariants} className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold">
                  {PROFILE_DATA.proof}
                </p>
              </motion.div>
              <motion.p variants={itemVariants} className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed text-pretty">
                {PROFILE_DATA.bio}
              </motion.p>
            </motion.div>

            {/* Architecture diagram */}
            <motion.div
              variants={itemVariants}
              className="w-full mt-4 mb-4 px-1"
            >
              <ArchDiagram />
            </motion.div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

            {/* Action buttons */}
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="w-full flex flex-col gap-2.5">
              {/* Primary CTA */}
              <motion.div variants={itemVariants} className="w-full">
                <Button
                  asChild
                  className="w-full h-11 rounded-2xl text-[14px] font-semibold group bg-primary text-primary-foreground shadow-[0_4px_20px_-5px_rgba(30,136,229,0.4)] hover:shadow-[0_8px_25px_-5px_rgba(30,136,229,0.6)] border border-primary/50 hover-elevate active-elevate transition-all duration-300"
                >
                  <a href={PRIMARY_ACTION.href} download={PRIMARY_ACTION.download} className="flex items-center justify-center w-full">
                    <PRIMARY_ACTION.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                    {PRIMARY_ACTION.label}
                  </a>
                </Button>
              </motion.div>

              {/* Secondary actions — compact row */}
              <motion.div variants={itemVariants} className="w-full grid grid-cols-3 gap-2">
                {SECONDARY_ACTIONS.map((action, i) => (
                  <Button
                    key={i}
                    asChild
                    variant="secondary"
                    className="h-10 rounded-xl text-[12px] font-semibold group bg-secondary/50 hover:bg-secondary/80 border border-white/5 backdrop-blur-sm text-foreground hover-elevate active-elevate transition-all duration-300 px-2"
                  >
                    <a
                      href={action.href}
                      target={"external" in action && action.external ? "_blank" : undefined}
                      rel={"external" in action && action.external ? "noopener noreferrer" : undefined}
                      aria-label={action.ariaLabel}
                      className="flex items-center justify-center gap-1.5"
                    >
                      <action.icon className="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                      {action.label}
                    </a>
                  </Button>
                ))}
              </motion.div>
            </motion.div>

            {/* Secondary links */}
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="mt-10 flex flex-col items-center gap-5 w-full">
              <div className="flex items-center justify-center gap-6">
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-white transition-colors p-2 hover-elevate"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <div className="w-1 h-1 rounded-full bg-white/10" />
                <a
                  href={PROFILE_DATA.bold}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5 group p-2 hover-elevate"
                >
                  More profile details
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
              <a
                href={`mailto:${PROFILE_DATA.mensaEmail}`}
                className="text-[11px] text-muted-foreground/30 hover:text-muted-foreground/80 transition-colors mt-2"
                aria-label="Mensa Email Contact"
              >
                {PROFILE_DATA.mensaEmail}
              </a>
            </motion.div>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
