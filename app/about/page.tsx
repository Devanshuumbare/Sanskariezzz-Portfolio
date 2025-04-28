"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Instagram, Linkedin, Twitter } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold">Sanskariezzz</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Our work", href: "/#designs" },
                { name: "Services", href: "/#services" },
                { name: "Blog", href: "/blog" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-purple-400 transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
            <Button className="rounded-full bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all overflow-hidden group relative">
              <motion.span className="relative z-10" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                Let&apos;s Connect
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-20"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </Button>
          </div>
        </div>
      </header>

      {/* About Hero Section */}
      <section className="pt-32 pb-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl font-bold mb-6">About Us</h1>
              <p className="text-xl mb-6 text-zinc-300">Hi There!</p>
              <p className="text-zinc-400 mb-6">
                Sanskariezzz is a dynamic creative agency founded in 2018, specializing in comprehensive digital
                solutions. We've built our reputation on delivering exceptional creative services that combine technical
                expertise with innovative vision.
              </p>
              <p className="text-zinc-400 mb-8">
                Our multidisciplinary team excels in graphic design, web development, social media marketing, tech
                solutions, and podcasting. We believe in creating meaningful digital experiences that not only look
                stunning but effectively communicate your message and achieve your business goals.
              </p>
              <div className="flex gap-4">
                <Link href="#skills">
                  <Button className="bg-white text-black hover:bg-zinc-200">Our Services</Button>
                </Link>
                <Link href="#experience">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Our Journey
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-lg overflow-hidden border-4 border-zinc-800">
                <Image
                  src="/placeholder.svg?height=600&width=500&text=Designer"
                  alt="Designer"
                  width={500}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
              <motion.div
                className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg z-0"
                animate={{
                  top: ["-1.5rem", "-1rem", "-1.5rem"],
                  right: ["-1.5rem", "-2rem", "-1.5rem"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              I&apos;ve developed a diverse set of skills that allow me to create compelling designs across various
              mediums.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Creative Services",
                skills: ["Graphic Design", "Web Design", "UI/UX Design", "Brand Identity", "Motion Graphics"],
              },
              {
                title: "Digital Marketing",
                skills: [
                  "Social Media Management",
                  "Content Strategy",
                  "Influencer Marketing",
                  "SEO Optimization",
                  "Analytics & Reporting",
                ],
              },
              {
                title: "Tech Solutions",
                skills: [
                  "Web Development",
                  "App Development",
                  "E-commerce Solutions",
                  "CMS Implementation",
                  "API Integration",
                ],
              },
              {
                title: "Media Production",
                skills: ["Podcasting", "Video Production", "Audio Editing", "Live Streaming", "Virtual Events"],
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-800 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                      <span className="text-zinc-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Since our founding, Sanskariezzz has grown from a small design studio to a full-service creative agency.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                period: "2022 - Present",
                title: "Full-Service Creative Agency",
                company: "Expansion Phase",
                description:
                  "Expanded our services to include tech solutions, podcasting, and comprehensive digital marketing strategies, serving clients across multiple industries globally.",
              },
              {
                period: "2020 - 2022",
                title: "Digital Marketing Integration",
                company: "Growth Phase",
                description:
                  "Integrated social media marketing and content creation services, building a team of specialists and establishing partnerships with major platforms and influencers.",
              },
              {
                period: "2018 - 2020",
                title: "Design Studio Launch",
                company: "Foundation Phase",
                description:
                  "Started as a specialized design studio focusing on graphic design and web development, building our initial client base and establishing our creative approach.",
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-10 relative pl-8 border-l-2 border-zinc-800"
              >
                <div className="absolute -left-1.5 top-0">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                </div>
                <div className="text-sm text-purple-400 mb-1">{job.period}</div>
                <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                <div className="text-zinc-300 mb-2">{job.company}</div>
                <p className="text-zinc-400">{job.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Our diverse team of specialists brings together expertise across design, technology, marketing, and media
              production.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                period: "12 Specialists",
                degree: "Creative Department",
                institution: "Design & Development",
                description:
                  "Our creative team combines artistic vision with technical skills to deliver stunning visual solutions and seamless digital experiences.",
              },
              {
                period: "8 Specialists",
                degree: "Marketing Department",
                institution: "Strategy & Analytics",
                description:
                  "Our marketing experts craft data-driven strategies that amplify your brand's voice and connect with your target audience across platforms.",
              },
              {
                period: "6 Specialists",
                degree: "Media Production",
                institution: "Audio & Video",
                description:
                  "Our media team produces engaging podcasts, videos, and live streams that tell your story and build meaningful connections with your audience.",
              },
              {
                period: "5 Specialists",
                degree: "Tech Solutions",
                institution: "Development & Integration",
                description:
                  "Our tech team builds robust digital infrastructure that powers your online presence with cutting-edge technologies and seamless functionality.",
              },
            ].map((team, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-800 rounded-lg p-6"
              >
                <div className="text-sm text-purple-400 mb-1">{team.period}</div>
                <h3 className="text-xl font-bold mb-1">{team.degree}</h3>
                <div className="text-zinc-300 mb-2">{team.institution}</div>
                <p className="text-zinc-400">{team.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Let&apos;s Connect</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We're always excited to discuss new projects, creative collaborations, or how we can help bring your
              vision to life.
            </p>
          </motion.div>

          <div className="flex justify-center gap-4 mb-12">
            {[
              { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
              { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
              { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
              { icon: <Github className="w-5 h-5" />, label: "GitHub" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-purple-500 transition-colors"
              >
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </div>

          <div className="text-center">
            <Link href="/#contact">
              <Button className="bg-white text-black hover:bg-zinc-200">
                Contact Us <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-zinc-500">© 2025 Sanskariezzz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
