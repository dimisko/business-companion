import { motion } from "framer-motion";
import { Download, Mail, MessageCircle, Linkedin, Github, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StackerGame } from "@/components/StackerGame";

// ─── Edit your info here ───────────────────────────────────────────────────
const PROFILE_DATA = {
  name: "Dime Mishkov",
  headline: "Co-Founder @ JasITi | Java Software Engineer @ HTEC",
  bio: "Senior Java Engineer and Technical Lead building scalable backend systems for healthcare and enterprise. Clean architecture. Fast delivery.",
  imagePath: `${import.meta.env.BASE_URL}profile.jpg`,   // drop profile.jpg in public/
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
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

const avatarVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.1 } },
};

const ACTIONS = [
  { label: "Get My CV",  href: PROFILE_DATA.cvPath,               icon: Download,       primary: true,  download: "Dime-Mishkov-CV.pdf" },
  { label: "Email me",   href: `mailto:${PROFILE_DATA.email}`,    icon: Mail,           primary: false },
  { label: "WhatsApp",   href: PROFILE_DATA.whatsapp,             icon: MessageCircle,  primary: false, external: true },
  { label: "LinkedIn",   href: PROFILE_DATA.linkedin,             icon: Linkedin,       primary: false, external: true },
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
        className="w-full max-w-[460px] relative z-10 pt-16 mt-8 mb-8"
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

          <CardContent className="pt-20 pb-8 px-6 sm:px-8 flex flex-col items-center text-center">

            {/* Identity */}
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="w-full mb-6">
              <motion.h1 variants={itemVariants} className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1.5">
                {PROFILE_DATA.name}
              </motion.h1>
              <motion.h2 variants={itemVariants} className="text-primary font-medium text-[15px] sm:text-base mb-4 leading-snug">
                {PROFILE_DATA.headline}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-sm text-muted-foreground leading-relaxed text-pretty max-w-[340px] mx-auto">
                {PROFILE_DATA.bio}
              </motion.p>
            </motion.div>

            {/* Mini game — replaces skill chips */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.5 }}
              className="w-full mb-7"
            >
              <StackerGame />
            </motion.div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-7" />

            {/* Action buttons */}
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="w-full flex flex-col gap-3">
              {ACTIONS.map((action, i) => (
                <motion.div key={i} variants={itemVariants} className="w-full">
                  <Button
                    asChild
                    variant={action.primary ? "default" : "secondary"}
                    className={`w-full h-13 rounded-2xl text-[15px] font-semibold group transition-all duration-300 hover-elevate active-elevate ${
                      action.primary
                        ? "bg-primary text-primary-foreground shadow-[0_4px_20px_-5px_rgba(30,136,229,0.4)] hover:shadow-[0_8px_25px_-5px_rgba(30,136,229,0.6)] border border-primary/50"
                        : "bg-secondary/60 hover:bg-secondary/90 border border-white/5 backdrop-blur-sm text-foreground"
                    }`}
                  >
                    <a
                      href={action.href}
                      download={"download" in action ? action.download : undefined}
                      target={"external" in action && action.external ? "_blank" : undefined}
                      rel={"external" in action && action.external ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-center w-full py-3.5"
                    >
                      <action.icon className="w-[18px] h-[18px] mr-2.5 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                      {action.label}
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Secondary links */}
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="mt-8 flex flex-col items-center gap-4 w-full">
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
                className="text-[11px] text-muted-foreground/30 hover:text-muted-foreground/70 transition-colors"
                aria-label="Mensa email"
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
