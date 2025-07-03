import LandingPageLayout from "./landingPage/page";
import AboutLayoutPage from "./aboutLayout/page";
import MediaGalleryLayout from "./medaiGallery/page";

export default function Home() {
  return (
    <>
      <LandingPageLayout />
      <AboutLayoutPage />
      <MediaGalleryLayout />
      <div className="fixed bottom-0 left-0 right-0 h-45 md:h-45 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-90"></div>

    </>
  );
}
