import { HeroSection } from "@/components/HeroSection";
import { useOutletContext } from "react-router-dom";

export default function HomePage() {
  const { headerVisible } = useOutletContext() || { headerVisible: false };
  
  return (
    <div>
      <HeroSection headerVisible={headerVisible} />
    </div>
  );
}