import { useState } from "react";
import { HeroSection } from "./HeroSection";
import { PhotoGallery } from "./PhotoGallery";
import { Timeline } from "./Timeline";
import { EventLocation } from "./EventLocation";
import { Gifts } from "./Gifts";
import { RSVPForm } from "./RSVPForm";
import { MusicPlayer } from "./MusicPlayer";

export function Home() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);

  return (
    <div className="flex flex-col">
      <HeroSection onOpen={() => setIsMusicPlaying(true)} />

      <MusicPlayer
        isPlaying={isMusicPlaying}
        setIsPlaying={setIsMusicPlaying}
        isVideoActive={isVideoActive}
      />
      <PhotoGallery onVideoStateChange={(active) => setIsVideoActive(active)} />
      <Timeline />
      <EventLocation />
      <Gifts />
      <RSVPForm />
    </div>
  );
}
