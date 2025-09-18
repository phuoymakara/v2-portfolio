"use client"

import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Terminal } from "lucide-react"
import { useEffect, useState } from "react"
import { FEATURE_PROJECTS, WORK_EXPERIENCES } from "@/constants"
import Image from "next/image"
import dynamic from "next/dynamic"
import Turnstile, { useTurnstile } from "react-turnstile";

const ThemeToggle = dynamic(()=>
  import("@/components/theme-toggle").then((mod) => mod.ThemeToggle)
);
const Input = dynamic(()=>
  import("@/components/ui/input").then((mod) => mod.Input)
);
const Textarea = dynamic(()=>
  import("@/components/ui/textarea").then((mod) => mod.Textarea)
);
const Button = dynamic(()=>
  import("@/components/ui/button").then((mod) => mod.Button)
);
const Badge = dynamic(()=>
  import("@/components/ui/badge").then((mod) => mod.Badge)
);
const Card = dynamic(()=>
  import("@/components/ui/card").then((mod) => mod.Card)
);
const CardContent = dynamic(()=>
  import("@/components/ui/card").then((mod) => mod.CardContent)
);
const CardTitle = dynamic(()=>
  import("@/components/ui/card").then((mod) => mod.CardTitle)
);



export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [turnstileStatus, setTurnstileStatus] = useState<
    "success" | "error" | "expired" | "required"
  >("required");
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />

      {/* Fixed scroll progress bar */}
      {/* <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div> */}

      {/* Circular scroll progress indicator */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-muted opacity-20"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
              className="text-primary transition-all duration-300 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">{Math.round(scrollProgress)}%</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-card bg-cover bg-center opacity-5"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>

        <div
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              Available for new projects
            </span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Hi, I'm a<span className="block text-primary font-bold">Mark Bee</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            I build modern web applications with clean code and great user experiences. Let's create something amazing
            together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
            <Button
              aria-label="View My Work"
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 hover:scale-105 transition-all duration-300"
            >
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              aria-label="Get In Touch"
              variant="outline"
              size="lg"
              className="border-2 font-medium px-8 py-3 hover:scale-105 transition-all duration-300 bg-transparent"
            >
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
          </div>

          <div className="absolute bottom-[-5rem] left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-semibold mb-4">
                  About Me
                </span>
                <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
                  Passionate about <span className="text-accent">crafting code</span>
                </h2>
              </div>
              <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                I'm a passionate full-stack developer with over 2 years of experience building scalable web
                applications. I specialize in React, Next.js, Node.js, and modern database technologies, always focusing
                on clean, maintainable code and exceptional user experiences.
              </p>
              <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
                When I'm not coding, you'll find me exploring new frameworks, contributing to open source projects, or
                mentoring fellow developers. I believe in continuous learning and staying at the forefront of web
                technology.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { text: "React & Next.js", className: "bg-accent text-accent-foreground" },
                  { text: "TypeScript", className: "bg-primary text-primary-foreground" },
                  { text: "Node.js & APIs", className: "bg-accent text-accent-foreground" },
                  { text: "Database Design", className: "bg-primary text-primary-foreground" },
                  { text: "Cloud & DevOps", className: "bg-accent text-accent-foreground" },
                  { text: "UI/UX Design", className: "bg-primary text-primary-foreground" },
                ].map((badge, index) => (
                  <Badge
                    key={badge.text}
                    className={`${badge.className} px-4 py-2 hover:scale-105 transition-transform duration-300 animate-in fade-in slide-in-from-bottom-4 justify-center`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {badge.text}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="relative">
                <div className="aspect-square bg-card rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:rotate-2">
                  <Image
                    src={'https://avatars.githubusercontent.com/u/198045355?v=4&size=800'}
                    width={100}
                    height={100}
                    alt="profile"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-accent to-primary rounded-full opacity-20 animate-pulse"></div>
                <div
                  className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full opacity-20 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold mb-4">
              Career Journey
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Professional <span className="text-primary">Timeline</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30"></div>

            <div className="space-y-12">
              {WORK_EXPERIENCES.map((item, index) => (
                <div
                  key={index}
                  className="w-full relative flex items-start animate-in fade-in slide-in-from-left-8 duration-1000"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>

                  <div className="ml-20">
                    <Card className="w-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="font-heading text-xl text-foreground font-semibold">{item.role}</h3>
                            <p className="font-body text-accent font-medium">{item.company}</p>
                          </div>
                          <Badge 
                              aria-label="skills-year"
                          className="bg-primary/10 text-primary border-primary/20 mt-2 md:mt-0 w-fit">
                            {item.year}
                          </Badge>
                        </div>
                        <p className="font-body text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, skillIndex) => (
                            <Badge
                              aria-label="skills"
                              key={skillIndex}
                              className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 transition-colors duration-300"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl text-center text-foreground mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURE_PROJECTS.map((project, index) => (
              <Card
                key={index}
                className="group cursor-pointer gap-0 py-0 overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-0 animate-in fade-in slide-in-from-bottom-8 "
                style={{ animationDelay: `${index * 150}ms`, animationDuration: "1000ms" }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image 
                  src={project.image}
                  width={100}
                  height={100}
                  alt={project.title}
                  loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 "

                  />
                </div>
                <CardContent className="p-6">
                  <Badge 
                  aria-label="category"
                  className="bg-accent text-accent-foreground border-accent/20 mb-3 group-hover:bg-accent/90 transition-colors duration-300">
                    {project.category}
                  </Badge>
                  <CardTitle className="font-heading text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <p className="font-body text-sm text-muted-foreground mb-3">{project.tech}</p>
                  <div className="flex items-center text-muted-foreground group-hover:text-accent transition-colors duration-300">
                    <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-body text-sm">View Code</span>
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-32 px-6 bg-gradient-to-br from-card to-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold mb-4">
              Get In Touch
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
              Let's Build <span className="text-primary">Something Great</span>
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? I'd love to discuss your project and explore how we can work together.
            </p>
          </div>

          <Card className="border-0 shadow-2xl animate-in fade-in slide-in-from-bottom-8 delay-300 hover:shadow-3xl transition-shadow duration-500">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="animate-in fade-in slide-in-from-left-4 duration-1000 delay-500">
                    <label className="font-body font-semibold text-foreground block mb-2">Name</label>
                    <Input
                      className="bg-input border-border focus:ring-2 focus:ring-primary transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="animate-in fade-in slide-in-from-right-4 duration-1000 delay-500">
                    <label className="font-body font-semibold text-foreground block mb-2">Email</label>
                    <Input
                      type="email"
                      className="bg-input border-border focus:ring-2 focus:ring-primary transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
                  <label className="font-body font-semibold text-foreground block mb-2">Project Type</label>
                  <Input
                    className="bg-input border-border focus:ring-2 focus:ring-primary transition-all duration-300"
                    placeholder="Web App, API Development, E-commerce, etc."
                  />
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-900">
                  <label className="font-body font-semibold text-foreground block mb-2">Message</label>
                  <Textarea
                    className="bg-input border-border min-h-32 focus:ring-2 focus:ring-primary transition-all duration-300"
                    placeholder="Tell me about your project requirements, tech stack preferences, and timeline..."
                  />
                </div>
              <Turnstile
              className="dark:bg-black dark:text-white"
              sitekey={`0x4AAAAAAB1uB25mU9eEGhAW`}
              retry="auto"
              refreshExpired="auto"
              onError={() => {
                setTurnstileStatus("error");
              }}
              onExpire={() => {
                setTurnstileStatus("expired");
              }}
              onVerify={() => {
                setTurnstileStatus("success");
              }}
            />
                <Button
                disabled={turnstileStatus!=='success'}
                  aria-label="send message"
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-4 text-lg hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 delay-1000">
                  <Terminal className="mr-2 h-5 w-5" />
                  Send Message
                  <Mail className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h3 className="font-heading text-3xl text-sidebar-foreground mb-4">Stay Connected</h3>
            <p className="font-body text-lg text-sidebar-foreground/70 mb-8">
              Follow my coding journey and latest projects on GitHub and LinkedIn
            </p>
            <div className="flex justify-center gap-6">
              {[Github, Linkedin, Mail].map((Icon, index) => (
                <Button
                  aria-label="social media"
                  key={index}
                  variant="ghost"
                  size="lg"
                  className="text-sidebar-primary hover:bg-sidebar-primary hover:text-sidebar-primary-foreground hover:scale-110 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100 + 1200}ms` }}
                >
                  <Icon className="h-6 w-6" />
                </Button>
              ))}
            </div>
          </div>
          <div className="border-t border-sidebar-border pt-8 text-center animate-in fade-in duration-1000 delay-1500">
            <p className="font-body text-sidebar-foreground/60">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
