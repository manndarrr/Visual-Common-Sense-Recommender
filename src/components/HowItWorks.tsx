import { Camera, Brain, ShoppingBag } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Upload Any Image",
    description: "Snap a photo of a space, outfit, or aesthetic that inspires you. Our system accepts any visual input.",
  },
  {
    icon: Brain,
    title: "AI Decodes the Vibe",
    description: "Our visual-common sense engine identifies the cognitive style — the mood, era, texture, and feeling behind the image.",
  },
  {
    icon: ShoppingBag,
    title: "Get Curated Matches",
    description: "Receive product recommendations that share the same aesthetic DNA, not just surface-level keywords.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient-gold">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Three steps from visual inspiration to perfectly matched products.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-card rounded-2xl p-8 border border-border hover:border-primary/20 transition-all group vibe-card"
            >
              {/* Step number */}
              <span className="absolute top-6 right-6 text-6xl font-heading font-bold text-muted/60">
                {index + 1}
              </span>

              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
