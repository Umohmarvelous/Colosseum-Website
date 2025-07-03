"use client"
import { useEffect, useRef, useState } from "react"

export default function AbutPage() {
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
        < section className="min-h-screen bg-black flex items-center justify-center relative" >
            {/* Page Number "200" for About Page */}
            {/* <div
        className="fixed bottom-4 md:bottom-8 left-4 md:left-8 z-40 rotate-180"
        style={{
          transform: `rotate(180deg) translateY(${scrollY * 0.01}px)`,
        }}
      >
        <div className="text-4xl md:text-6xl lg:text-8xl xl:text-[8rem] font-black text-white/5 leading-none select-none">
          200
        </div>
      </div> */}

            <div
                className="w-full max-w-4xl mx-auto px-4 md:px-6 text-center"
                style={{
                    transform: `translateY(${scrollY * 0.05}px)`,
                }}
            >
                <div className="space-y-8 md:space-y-12">
                    <div
                        id="about-heading"
                        data-fade
                        className={`space-y-4 transition-all duration-1000 ease-out ${visibleElements.has("about-heading") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">About Lab</h2>
                    </div>

                    <div
                        id="about-content"
                        data-fade
                        className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center transition-all duration-1000 ease-out delay-200 ${visibleElements.has("about-content") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                        style={{
                            transform: `translateY(${scrollY * 0.03}px)`,
                        }}
                    >
                        <div className="space-y-6 md:space-y-8 text-left">
                            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                                We are a creative laboratory where experimental design meets contemporary fashion. Our mission is to
                                challenge conventional boundaries and create pieces that define the future of style.
                            </p>
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span className="text-sm md:text-base text-gray-400">Experimental Design</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span className="text-sm md:text-base text-gray-400">Contemporary Fashion</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span className="text-sm md:text-base text-gray-400">Future Vision</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 md:space-y-8">
                            <div className="text-left">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Our Vision</h3>
                                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                                    To create a world where fashion transcends traditional limits, where every piece tells a story of
                                    rebellion, creativity, and innovation.
                                </p>
                            </div>
                            <div className="text-left">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">The Process</h3>
                                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                                    Each design begins in our laboratory, where ideas are tested, refined, and transformed into wearable
                                    art that challenges the status quo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Black gradient overlay at bottom */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-30 md:h-30 bg-gradient-to-t from-black via-white/50 to-transparent pointer-events-none z-50"></div> */}
            </section >
    )
}