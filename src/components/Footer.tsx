import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-heading font-semibold text-foreground">VibeMatch</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Multimodal Visual-Common Sense Recommender
        </p>
      </div>
    </footer>
  );
};

export default Footer;
