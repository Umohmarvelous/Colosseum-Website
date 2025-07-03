"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Volume2, VolumeX, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Sample data with online dummy images
const imageData = [
    {
        id: 1,
        src: "https://picsum.photos/300/400?random=1",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-64",
    },
    {
        id: 2,
        src: "https://picsum.photos/280/500?random=2",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-80",
    },
    {
        id: 3,
        src: "https://picsum.photos/320/350?random=3",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-56",
    },
    {
        id: 4,
        src: "https://picsum.photos/290/450?random=4",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-72",
    },
    {
        id: 5,
        src: "https://picsum.photos/310/380?random=5",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-64",
    },
    {
        id: 6,
        src: "https://picsum.photos/270/420?random=6",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-68",
    },
    {
        id: 7,
        src: "https://picsum.photos/300/480?random=7",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-76",
    },
    {
        id: 8,
        src: "https://picsum.photos/285/360?random=8",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-60",
    },
    // Additional images for "view more"
    {
        id: 9,
        src: "https://picsum.photos/295/440?random=9",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-70",
    },
    {
        id: 10,
        src: "https://picsum.photos/275/390?random=10",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-64",
    },
    {
        id: 11,
        src: "https://picsum.photos/305/460?random=11",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-74",
    },
    {
        id: 12,
        src: "https://picsum.photos/290/340?random=12",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-58",
    },
    {
        id: 13,
        src: "https://picsum.photos/280/410?random=13",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-66",
    },
    {
        id: 14,
        src: "https://picsum.photos/300/370?random=14",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-62",
    },
    {
        id: 15,
        src: "https://picsum.photos/285/450?random=15",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-72",
    },
    {
        id: 16,
        src: "https://picsum.photos/295/320?random=16",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-54",
    },
    {
        id: 17,
        src: "https://picsum.photos/310/430?random=17",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-68",
    },
    {
        id: 18,
        src: "https://picsum.photos/275/380?random=18",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-64",
    },
    {
        id: 19,
        src: "https://picsum.photos/300/470?random=19",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-76",
    },
    {
        id: 20,
        src: "https://picsum.photos/285/350?random=20",
        title: "ERROR WHILE LOADING THE MEDIA...",
        height: "h-60",
    },
]

const videoData = [
    {
        id: 1,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "https://picsum.photos/400/300?random=101",
        title: "Big Buck Bunny",
        description:
            "A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.",
        duration: "10:34",
        views: "2.1M",
        height: "h-64",
    },
    {
        id: 2,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnail: "https://picsum.photos/300/400?random=102",
        title: "Elephants Dream",
        description: "The story of two strange characters exploring a capricious and seemingly infinite machine.",
        duration: "10:53",
        views: "1.8M",
        height: "h-80",
    },
    {
        id: 3,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://picsum.photos/450/250?random=103",
        title: "For Bigger Blazes",
        description: "A short film showcasing the power of visual storytelling through dynamic cinematography.",
        duration: "15:05",
        views: "956K",
        height: "h-56",
    },
    {
        id: 4,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://picsum.photos/350/350?random=104",
        title: "For Bigger Escapes",
        description: "An adventure through breathtaking landscapes and thrilling moments of discovery.",
        duration: "15:05",
        views: "1.2M",
        height: "h-72",
    },
    {
        id: 5,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        thumbnail: "https://picsum.photos/500/300?random=105",
        title: "For Bigger Fun",
        description: "A celebration of joy and entertainment that brings people together through shared experiences.",
        duration: "60:09",
        views: "3.4M",
        height: "h-68",
    },
    {
        id: 6,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        thumbnail: "https://picsum.photos/380/280?random=106",
        title: "Sintel",
        description: "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales.",
        duration: "14:48",
        views: "1.5M",
        height: "h-60",
    },
    // Additional videos for "view more"
    {
        id: 7,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        thumbnail: "https://picsum.photos/400/300?random=107",
        title: "Tears of Steel",
        description: "A group of warriors and scientists must fight to protect their city.",
        duration: "12:14",
        views: "890K",
        height: "h-76",
    },
    {
        id: 8,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
        thumbnail: "https://picsum.photos/350/280?random=108",
        title: "Volkswagen GTI Review",
        description: "An in-depth review of the iconic Volkswagen GTI performance hatchback.",
        duration: "8:42",
        views: "654K",
        height: "h-58",
    },
    {
        id: 9,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        thumbnail: "https://picsum.photos/420/320?random=109",
        title: "We Are Going On Bullrun",
        description: "Join us on an epic road trip adventure across scenic landscapes.",
        duration: "11:17",
        views: "1.1M",
        height: "h-70",
    },
    {
        id: 10,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
        thumbnail: "https://picsum.photos/380/300?random=110",
        title: "What Car Can You Get For A Grand",
        description: "Exploring the best budget car options available for under $1000.",
        duration: "9:28",
        views: "723K",
        height: "h-64",
    },
]

export default function MediaGallery() {
    const [activeTab, setActiveTab] = useState("images")
    const [selectedVideo, setSelectedVideo] = useState<any>(null)
    const [videoVolumes, setVideoVolumes] = useState<{ [key: number]: number }>({})
    const [videoMuted, setVideoMuted] = useState<{ [key: number]: boolean }>({})
    const [showAllImages, setShowAllImages] = useState(false)
    const [showAllVideos, setShowAllVideos] = useState(false)
    const videoRefs = useRef<{ [key: number]: HTMLVideoElement }>({})
    const observerRef = useRef<IntersectionObserver | null>(null)

    // Get displayed images based on showAllImages state
    const displayedImages = showAllImages ? imageData : imageData.slice(0, 8)
    const displayedVideos = showAllVideos ? videoData : videoData.slice(0, 6)

    useEffect(() => {
        // Initialize video volumes
        const initialVolumes: { [key: number]: number } = {}
        const initialMuted: { [key: number]: boolean } = {}
        videoData.forEach((video) => {
            initialVolumes[video.id] = 0.3
            initialMuted[video.id] = true
        })
        setVideoVolumes(initialVolumes)
        setVideoMuted(initialMuted)

        // Intersection Observer for scroll animations
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in-view")
                    }
                })
            },
            { threshold: 0.1, rootMargin: "50px" },
        )

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [])

    useEffect(() => {
        // Auto-play videos when media tab is active
        if (activeTab === "media") {
            setTimeout(() => {
                displayedVideos.forEach((video) => {
                    const videoElement = videoRefs.current[video.id]
                    if (videoElement) {
                        videoElement.play().catch((error) => {
                            if (error.name !== "AbortError") {
                                console.warn("Video autoplay error:", error)
                            }
                        })
                    }
                })
            }, 500)
        } else {
            // Pause all videos when switching away from media tab
            videoData.forEach((video) => {
                const videoElement = videoRefs.current[video.id]
                if (videoElement) {
                    videoElement.pause()
                }
            })
        }
    }, [activeTab, displayedVideos])

    useEffect(() => {
        // Observe elements for scroll animations
        const elements = document.querySelectorAll(".scroll-animate")
        elements.forEach((el) => {
            if (observerRef.current) {
                observerRef.current.observe(el)
            }
        })
    }, [activeTab, showAllImages, showAllVideos])

    const toggleVideoMute = (videoId: number) => {
        setVideoMuted((prev) => ({
            ...prev,
            [videoId]: !prev[videoId],
        }))
        const video = videoRefs.current[videoId]
        if (video) {
            video.muted = !videoMuted[videoId]
        }
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-8 sm:py-12 md:py-16">
            {/* Animated Background */}
            <div className="fixed inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-red-900/20 to-yellow-900/20 animate-gradient-shift"></div>
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="floating-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                        <div className="shape shape-4"></div>
                        <div className="shape shape-5"></div>
                    </div>
                </div>
            </div>

            {/* Title Section */}
            <div className="relative z-10 text-left py-8 pb-0 md:py-16 animate-fade-in">
                <h1 className="italic text-3xl z-90 sm:text-4xl md:text-6xl lg:text-7xl font-serif font-normal text-[#ddff04] mb-4 animate-slide-up">
                    Gallery
                </h1>
                <h1 className="text-8xl text-gray-800 font-impact top-4 absolute font-bold">What i can offer</h1>
                {/* <p className="text-base sm:text-lg md:text-xl text-gray-400 animate-slide-up animation-delay-200">
                    Explore our collection of images and videos
                </p> */}
            </div>

            {/* Tab Navigation - Centered */}
            <div className="relative z-10 border-b border-gray-900 mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center space-x-4 sm:space-x-8">
                        <button
                            onClick={() => setActiveTab("images")}
                            className={`py-3 sm:py-4 px-4 sm:px-6 border-b-2 font-medium text-sm sm:text-lg transition-all duration-500 transform hover:scale-110 ${activeTab === "images"
                                ? "border-[#ddff04] text-[#ddff04] scale-105"
                                : "border-transparent text-[#ddff04] hover:text-gray-300"
                                }`}
                        >
                            Images
                        </button>
                        <button
                            onClick={() => setActiveTab("media")}
                            className={`py-3 sm:py-4 px-4 sm:px-6 border-b-2 font-medium text-sm sm:text-lg transition-all duration-500 transform hover:scale-110 ${activeTab === "media"
                                ? "border-[#ddff04] text-[#ddff04] scale-105"
                                : "border-transparent text-[#ddff04] hover:text-gray-300"
                                }`}
                        >
                            Video
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto">
                {activeTab === "images" && (
                    <div className="relative">

                        {/* Masonry Grid Layout */}
                        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-2 sm:gap-3 space-y-2 sm:space-y-3">
                            {displayedImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className={`relative group cursor-pointer break-inside-avoid scroll-animate transition-all duration-700 hover:scale-105 hover:z-10 hover:shadow-xl`}
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        transform: "translateZ(0)",
                                    }}
                                >
                                    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-red-900 via-red-800 to-red-900 border border-red-700/30 shadow-lg hover:shadow-red-500/30 transition-all duration-500">
                                        {/* Background Image */}
                                        <div
                                            className={`w-full ${image.height} bg-cover bg-center opacity-20 hover:opacity-30 transition-opacity duration-500`}
                                            style={{ backgroundImage: `url(${image.src})` }}
                                        ></div>

                                        {/* Error Card Content */}
                                        <div className="absolute inset-0 flex items-start justify-start p-3 sm:p-4">
                                            <div className="text-white">
                                                <h3 className="font-bold text-xs sm:text-sm leading-tight text-red-100">{image.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* View More Images Button */}
                        {!showAllImages && (
                            <div className="z-90 flex justify-center mb-8 animate-fade-in">
                                <button
                                    onClick={() => setShowAllImages(true)}
                                    className="bg-gradient-to-r from-[#ddff04] to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-500 hover:scale-110 hover:shadow-lg text-sm sm:text-base"
                                >
                                    View all
                                </button>
                            </div>
                        )}
                        {/* Bottom gradient overlay */}

                    </div>
                )}

                {activeTab === "media" && (
                    <div className="relative">
                        {/* View More Videos Button */}
                        {!showAllVideos && (
                            <div className="flex justify-center mb-8 animate-fade-in">
                                <button
                                    onClick={() => setShowAllVideos(true)}
                                    className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-500 hover:scale-110 hover:shadow-lg text-sm sm:text-base"
                                >
                                    View More Videos
                                </button>
                            </div>
                        )}
                        {/* Video Grid - Same size as images */}
                        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-1 sm:gap-2 space-y-1 sm:space-y-2">
                            {displayedVideos.map((video, index) => (
                                <div
                                    key={video.id}
                                    className="relative group cursor-pointer break-inside-avoid scroll-animate hover:scale-105 transition-all duration-700 hover:z-10 hover:shadow-xl"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                    onClick={() => setSelectedVideo(video)}
                                >
                                    <div
                                        className={`relative overflow-hidden rounded-lg bg-gray-900 shadow-xl transition-all duration-500 ${video.height}`}
                                    >
                                        <video
                                            ref={(el) => {
                                                if (el) videoRefs.current[video.id] = el
                                            }}
                                            className="w-full h-full object-cover"
                                            muted={videoMuted[video.id]}
                                            loop
                                            playsInline
                                            autoPlay
                                        >
                                            <source src={video.src} type="video/mp4" />
                                        </video>

                                        {/* Video Controls Overlay */}
                                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <Button
                                                size="lg"
                                                className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white border-0 hover:scale-125 transition-all duration-300"
                                            >
                                                <Play className="w-6 sm:w-8 h-6 sm:h-8 fill-white" />
                                            </Button>
                                        </div>

                                        {/* Volume Control */}
                                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-slide-in-right">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white transition-all duration-300 hover:scale-110"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    toggleVideoMute(video.id)
                                                }}
                                            >
                                                {videoMuted[video.id] ? (
                                                    <VolumeX className="w-3 sm:w-4 h-3 sm:h-4" />
                                                ) : (
                                                    <Volume2 className="w-3 sm:w-4 h-3 sm:h-4" />
                                                )}
                                            </Button>
                                        </div>

                                        {/* Video Info */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 sm:p-3">
                                            <h3 className="font-semibold text-white mb-1 text-xs sm:text-sm truncate">{video.title}</h3>
                                            <div className="flex items-center space-x-2 text-xs text-gray-300">
                                                <span>{video.duration}</span>
                                                <span>{video.views} views</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom gradient overlay */}
                    </div>
                )}
            </div>

            {/* Video Modal */}
            <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
                <DialogContent className="max-w-6xl w-full h-[80vh] bg-black border-gray-800 p-0">
                    {selectedVideo && (
                        <div className="flex flex-col lg:flex-row h-full">
                            {/* Video Player */}
                            <div className="flex-1 relative">
                                <video className="w-full h-full object-contain" controls autoPlay>
                                    <source src={selectedVideo.src} type="video/mp4" />
                                </video>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white"
                                    onClick={() => setSelectedVideo(null)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Video Description */}
                            <div className="w-full lg:w-80 p-4 sm:p-6 bg-gray-900 overflow-y-auto">
                                <h2 className="text-lg sm:text-xl font-bold text-white mb-4">{selectedVideo.title}</h2>
                                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                                    <Badge variant="secondary">{selectedVideo.duration}</Badge>
                                    <span>{selectedVideo.views} views</span>
                                </div>
                                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{selectedVideo.description}</p>

                                <div className="mt-6 pt-6 border-t border-gray-700">
                                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Video Details</h3>
                                    <div className="space-y-2 text-sm text-gray-400">
                                        <div>Duration: {selectedVideo.duration}</div>
                                        <div>Views: {selectedVideo.views}</div>
                                        <div>Quality: HD 1080p</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Page-wide bottom gradient overlay */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-30 md:h-30 bg-gradient-to-t from-black via-white/50 to-transparent pointer-events-none z-50"></div> */}

            {/* Custom Styles - Removed glow effects */}
            <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.1); }
          50% { transform: rotate(180deg) scale(1); }
          75% { transform: rotate(270deg) scale(1.1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-gradient-shift {
          animation: gradient-shift 20s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }

        .scroll-animate {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .scroll-animate.animate-in-view {
          opacity: 1;
          transform: translateY(0);
        }

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          background: linear-gradient(45deg, rgba(255, 0, 150, 0.1), rgba(0, 255, 255, 0.1));
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .shape-1 {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 120px;
          height: 120px;
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 60px;
          height: 60px;
          top: 80%;
          left: 20%;
          animation-delay: 4s;
        }

        .shape-4 {
          width: 100px;
          height: 100px;
          top: 10%;
          right: 30%;
          animation-delay: 1s;
        }

        .shape-5 {
          width: 90px;
          height: 90px;
          top: 40%;
          left: 50%;
          animation-delay: 3s;
        }

        @media (max-width: 640px) {
          .shape {
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>
        </div>
    )
}
