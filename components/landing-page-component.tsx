"use client"
import { Menu, Twitter, Instagram, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material"

export default function LandingComponent() {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-fade]")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Marquee Background - Faster and Teal Color */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-55 left-0 w-full overflow-hidden opacity-20">
          <div className="animate-marquee-fast">
            <p className="text-6xl md:text-8xl lg:text-9xl italic font-black text-gray-800 whitespace-nowrap">
              OUTLAWS • COLLECTION • 2024 • FASHION • DESIGN • EXPERIMENTAL • STYLE • CONTEMPORARY • REBEL •
            </p>
          </div>
        </div>

        <div className="absolute top-70 left-0 w-full overflow-hidden opacity-20">
          <div className="animate-marquee-fast-reverse">
            <span className="text-6xl md:text-8xl lg:text-9xl font-black italic text-gray-700 whitespace-nowrap">
              MINIMALIST • BOLD • CREATIVE • INNOVATION • FUTURE • VISION • ARTISTIC • MODERN • SLEEK • DESIGN •
            </span>
          </div>
        </div>

        {/* <div className="absolute top-3/4 left-0 w-full overflow-hidden opacity-15">
          <div className="animate-marquee-fast-slow">
            <span className="text-3xl md:text-5xl lg:text-6xl font-black text-teal-400 whitespace-nowrap">
              LABORATORY • EXPERIMENT • DESIGN • STUDIO • CREATIVE • SPACE • INNOVATION • LAB • WORKSHOP • ART •
            </span>
          </div>
        </div> */}
      </div>

      {/* Fixed Social Media Icons */}
      <div className="fixed left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-4 md:space-y-6">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-800 text-gray-400 hover:text-white transition-all duration-300 w-8 h-8 md:w-10 md:h-10"
        >
          <Twitter className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-800 text-gray-400 hover:text-white transition-all duration-300 w-8 h-8 md:w-10 md:h-10"
        >
          <Instagram className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-800 text-gray-400 hover:text-white transition-all duration-300 w-8 h-8 md:w-10 md:h-10"
        >
          <Phone className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>

      {/* Fixed Page Numbers - Center Right */}
      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-6 md:space-y-8">
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* <div className="w-8 md:w-12 h-px bg-gray-600 transform rotate-45"></div> */}
          <span className="text-xs md:text-sm font-mono text-gray-400">01</span>
        </div>
        {/* <div className="flex items-center space-x-2 md:space-x-4">
          <div className="w-8 md:w-12 h-px bg-gray-600 transform rotate-45"></div>
          <span className="text-xs md:text-sm font-mono text-gray-400">02</span>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="w-8 md:w-12 h-px bg-gray-600 transform rotate-45"></div>
          <span className="text-xs md:text-sm font-mono text-gray-400">03</span>
        </div> */}
      </div>

      {/* Header with Glass Morphism */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-black/20 backdrop-blur-md " : "bg-transparent"
          }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm font-bold tracking-wider text-white">Col</span>

            <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
              <a
                href="#"
                className="text-xs lg:text-sm font-medium tracking-widest text-white hover:text-[#ddff04] transition-colors"
              >
                PRODUCTS
              </a>
              <a
                href="#"
                className="text-xs lg:text-sm font-medium tracking-widest text-white hover:text-[#ddff04] transition-colors"
              >
                ABOUT
              </a>
              <a
                href="#"
                className="text-xs lg:text-sm font-medium tracking-widest text-white hover:text-[#ddff04] transition-colors"
              >
                SHOP
              </a>
            </nav>

            <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white w-8 h-8 md:w-10 md:h-10">
              <Menu className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Large "LAB" overlay behind "lab." */}
      <div className="absolute top-0 md:top-10 right-50 md:right-10 z-0">
        <h2 className="text-[8rem] md:text-[12rem] lg:text-[15rem] xl:text-[18rem] transform -rotate-90 font-black text-[#ddff04] leading-none tracking-tighter select-none">
          LAB
        </h2>
      </div>

      {/* Rotated "THE COLLECTION" text */}
      <div className="hidden lg:block absolute right-0 xl:right-0 top-1/2 transform -translate-y-1/2">
        <p className="text-xs font-medium tracking-[0.3em] text-gray-400 uppercase transform -rotate-90 origin-center whitespace-nowrap">
          THE COLLECTION
        </p>
      </div>

      {/* Page Number "100" for Landing Page */}
      <div
        className="absolute flex items-baseline justify-center flex-row bottom-10 w-auto left-0 md:left-10"
      // style={{
      //   transform: `rotate(180deg) translateY(${scrollY * 0.01}px)`,
      // }}
      >
        <div className="serif text-9xl md:text-8xl lg:text-8xl xl:text-8xl font-black text-gray-900 leading-none select-none"
          style={{
            // fontFamily: 'sans-serif, "Helvetica Neue", "Lucida Grande", Arial',
            fontStretch: "expanded"
          }}>
          001
        </div>
        <div className="relative flex items-center flex-col justify-between w-auto">
        </div>
      </div>

      {/* Landing Page with Parallax */}
      <main className="min-h-screen w-auto items-end justify-end relative z-10">

        {/* Instagram Stats - Only on Landing Page */}
        {/* <div
          className="fixed bottom-4 md:bottom-8 left-4 md:left-8 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 md:px-4 py-2 md:py-3"
          style={{
            transform: `translateY(${scrollY * 0.03}px)`,
          }}
        >
          <p className="text-sm md:text-base text-gray-300">
            <span className="font-bold text-white">23.2M</span> likes on instagram
          </p>
        </div> */}

        {/* From here */}
        <div
          className="w-full max-w-7xl mx-auto mt-20 px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 lg:ml-43 order-2 lg:order-1">
            <div
              id="main-heading"
              data-fade
              className={`space-y-2 relative transition-all duration-1000 ease-out ${visibleElements.has("main-heading") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >

              {/* Main "lab." text */}
              <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-none tracking-tighter">
                  col.
                </h1>
              </div>
            </div>

            <div
              id="description"
              data-fade
              className={`space-y-4 max-w-md transition-all duration-1000 ease-out delay-200 ${visibleElements.has("description") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                The one and only returns this fall with a
                <br />
                journey into new land.
              </p>
              <div className="space-y-2">
                <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">See full album</p>
                <div className="w-8 h-px bg-gray-600"></div>
              </div>
            </div>
          </div>

          {/* Image with Parallax */}
          <div
            id="main-image"
            data-fade
            className={`lg:col-span-6 relative h-[50vh] md:h-[60vh] lg:h-[70vh] order-1 lg:order-2 transition-all duration-1000 ease-out delay-400 ${visibleElements.has("main-image") ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
            }}
          >
            <img
              src="/placeholder.svg?height=600&width=500"
              alt="Fashion model portrait"
              className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 rounded-lg"
            />
          </div>
        </div>

        {/* Bottom controls with Parallax */}
        <div
          id="bottom-controls"
          data-fade
          className={`absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 md:space-x-8 transition-all duration-1000 ease-out delay-600 ${visibleElements.has("bottom-controls") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          style={{
            transform: `translateX(-50%) translateY(${scrollY * 0.08}px)`,
          }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-[4px] md:border-l-[6px] border-l-black border-y-[3px] md:border-y-[4px] border-y-transparent ml-1"></div>
            </div>
            <span className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">Sounds</span>
          </div>
          <div className="text-xs md:text-sm font-mono text-gray-500">4:25</div>
        </div>

        {/* Black gradient overlay at bottom */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-30 md:h-30 bg-gradient-to-t from-black via-white/50 to-transparent pointer-events-none z-50"></div> */}
        <div className="absolute bottom-30 right-15 flex items-center justify-between flex-col z-100">
          <KeyboardArrowUp />
          <KeyboardArrowDown />
        </div>
      </main>

    </div >
  )
}
