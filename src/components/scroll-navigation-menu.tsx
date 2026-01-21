"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X, Home, Newspaper, Map, Shield, FileText, Moon, Sun, LogOut, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useClerk, useUser } from "@clerk/nextjs"
import { initThemeFromStorage, useThemeStore } from "@/store/theme"

interface MenuItem {
  id: number
  title: string
  url: string
  icon: React.ReactNode
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Home",
    url: "/",
    icon: <Home className="w-5 h-5" />
  },
  {
    id: 2,
    title: "News",
    url: "/news",
    icon: <Newspaper className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Roadmap",
    url: "/roadmap",
    icon: <Map className="w-5 h-5" />
  },
  {
    id: 4,
    title: "Awareness",
    url: "/awareness",
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 5,
    title: "Blog",
    url: "/blog",
    icon: <FileText className="w-5 h-5" />
  }
]

export default function ScrollNavigationMenu() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const pathname = usePathname()
  const { signOut } = useClerk()
  const { isSignedIn } = useUser()
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  
  const { scrollY } = useScroll()

  React.useEffect(() => {
    initThemeFromStorage()
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100)
  })

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleSignOut = async () => {
    try {
      await signOut()
      toggleMenu()
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  // Hide navbar on auth pages
  if (pathname === "/sign-in" || pathname === "/sign-up") return null

  // Variant 5 for the popup menu
  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    closed: {
      y: 20,
      opacity: 0,
      scale: 0.8
    },
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  }

  const hamburgerVariants = {
    normal: { rotate: 0, scale: 1 },
    scrolled: { rotate: 360, scale: 1.1 }
  }

  return (
    <>
      {/* Full Navbar - visible when not scrolled */}
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isScrolled ? -100 : 0,
          opacity: isScrolled ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-black/80 backdrop-blur-md border-b border-border dark:border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="text-2xl font-bold text-foreground">
                Cyber Security Hub
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={item.url}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                    {hoveredItem === item.id && (
                      <motion.div
                        layoutId="navbar-hover"
                        className="absolute inset-0 bg-muted rounded-md -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </motion.button>

              {/* Authentication Buttons */}
              {isSignedIn ? (
                <motion.button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-destructive transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </motion.button>
              ) : (
                <>
                  <Link href="/sign-in">
                    <motion.button
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LogIn className="w-5 h-5" />
                      <span>Sign In</span>
                    </motion.button>
                  </Link>
                  <Link href="/sign-up">
                    <motion.button
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <UserPlus className="w-5 h-5" />
                      <span>Sign Up</span>
                    </motion.button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMenu}
                className="p-1.5 rounded-md text-foreground hover:text-primary focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Floating Hamburger - visible when scrolled */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isScrolled ? 1 : 0,
          opacity: isScrolled ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50"
      >
        <motion.button
          onClick={toggleMenu}
          className="w-10 h-10 sm:w-14 sm:h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center"
          variants={hamburgerVariants}
          animate={isScrolled ? "scrolled" : "normal"}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="w-4 h-4 sm:w-6 sm:h-6" />
        </motion.button>
      </motion.div>

      {/* Floating Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={toggleMenu}
            />

            {/* Menu Container */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="relative bg-background border border-border rounded-3xl p-8 shadow-2xl min-w-[300px]">
                {/* Close Button */}
                <motion.button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 p-2 text-foreground hover:text-primary rounded-full hover:bg-muted"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Menu Items */}
                <div className="space-y-4 mt-8">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={item.url}
                        onClick={toggleMenu}
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted transition-colors group"
                      >
                        <motion.div
                          className="text-primary"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.icon}
                        </motion.div>
                        <span className="text-lg font-medium text-foreground group-hover:text-primary">
                          {item.title}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Theme Toggle in Mobile Menu */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => {
                        toggleTheme()
                        toggleMenu()
                      }}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted transition-colors group w-full"
                    >
                      <motion.div
                        className="text-primary"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        {theme === "dark" ? (
                          <Moon className="w-5 h-5" />
                        ) : (
                          <Sun className="w-5 h-5" />
                        )}
                      </motion.div>
                      <span className="text-lg font-medium text-foreground group-hover:text-primary">
                        {theme === "dark" ? "Light Mode" : "Dark Mode"}
                      </span>
                    </button>
                  </motion.div>

                  {/* Authentication in Mobile Menu */}
                  {isSignedIn ? (
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        onClick={() => {
                          handleSignOut()
                          toggleMenu()
                        }}
                        className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted transition-colors group w-full text-destructive"
                      >
                        <motion.div
                          className="text-destructive"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <LogOut className="w-5 h-5" />
                        </motion.div>
                        <span className="text-lg font-medium group-hover:text-destructive">
                          Sign Out
                        </span>
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href="/sign-in"
                          onClick={toggleMenu}
                          className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted transition-colors group w-full"
                        >
                          <motion.div
                            className="text-primary"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <LogIn className="w-5 h-5" />
                          </motion.div>
                          <span className="text-lg font-medium text-foreground group-hover:text-primary">
                            Sign In
                          </span>
                        </Link>
                      </motion.div>
                      <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href="/sign-up"
                          onClick={toggleMenu}
                          className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted transition-colors group w-full bg-primary/10"
                        >
                          <motion.div
                            className="text-primary"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <UserPlus className="w-5 h-5" />
                          </motion.div>
                          <span className="text-lg font-medium text-foreground group-hover:text-primary">
                            Sign Up
                          </span>
                        </Link>
                      </motion.div>
                    </>
                  )}
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -right-2 w-3 h-3 bg-secondary rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </>
  )
}

