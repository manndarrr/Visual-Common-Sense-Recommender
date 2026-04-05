import { Sparkles } from "lucide-react";

const AnalyzingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="glassmorphic rounded-3xl p-12 max-w-md text-center">
        {/* Animated rings */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDelay: "0.3s" }} />
          <div className="absolute inset-4 rounded-full border-2 border-primary/40 animate-ping" style={{ animationDelay: "0.6s" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary animate-pulse-slow" />
          </div>
        </div>

        <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
          Decoding the Vibe
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Our AI is analyzing the aesthetic DNA of your image — identifying mood, texture, era, and feeling...
        </p>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-pulse-slow"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyzingOverlay;
