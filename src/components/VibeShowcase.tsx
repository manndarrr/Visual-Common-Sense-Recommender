import vibeCyberpunk from "@/assets/vibe-cyberpunk.jpg";
import vibeCoastal from "@/assets/vibe-coastal.jpg";
import vibeAcademia from "@/assets/vibe-academia.jpg";
import vibeIndustrial from "@/assets/vibe-industrial.jpg";
import vibeOrganic from "@/assets/vibe-organic.jpg";

const vibes = [
  {
    image: vibeCyberpunk,
    name: "Cyberpunk",
    description: "Neon-lit, futuristic, tech-forward",
    recommendations: ["Tech-wear Jacket", "LED Desk Lamp", "Matte Black Mug"],
    color: "hsl(280 80% 60%)",
  },
  {
    image: vibeCoastal,
    name: "Coastal Grandmother",
    description: "Breezy, serene, effortlessly upscale",
    recommendations: ["Cashmere Wrap", "Ceramic Vase", "Straw Sunhat"],
    color: "hsl(40 60% 65%)",
  },
  {
    image: vibeAcademia,
    name: "Dark Academia",
    description: "Scholarly, moody, vintage warmth",
    recommendations: ["Fountain Pen", "Wool Blazer", "Brass Desk Lamp"],
    color: "hsl(25 50% 40%)",
  },
  {
    image: vibeIndustrial,
    name: "Industrial",
    description: "Raw, rugged, urban edge",
    recommendations: ["Reclaimed Wood Table", "Matte Floor Lamp", "Leather Sofa"],
    color: "hsl(15 40% 45%)",
  },
  {
    image: vibeOrganic,
    name: "Organic Modern",
    description: "Clean, nature-inspired, minimal warmth",
    recommendations: ["Rattan Stools", "Stoneware Mugs", "Linen Apron"],
    color: "hsl(80 30% 50%)",
  },
];

const VibeShowcase = () => {
  return (
    <section className="py-24 md:py-32 px-6 bg-gradient-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Every Image Has a <span className="text-gradient-gold">Vibe</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how our AI reads the aesthetic DNA of a scene and surfaces products 
            that belong in that world.
          </p>
        </div>

        <div className="grid gap-6">
          {vibes.map((vibe, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl border border-border hover:border-primary/20 overflow-hidden transition-all vibe-card"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-72 h-56 md:h-auto flex-shrink-0 overflow-hidden">
                  <img
                    src={vibe.image}
                    alt={`${vibe.name} aesthetic`}
                    loading="lazy"
                    width={640}
                    height={640}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: vibe.color }}
                    />
                    <h3 className="font-heading text-2xl font-semibold text-foreground">
                      {vibe.name}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-5 text-sm">
                    {vibe.description}
                  </p>

                  {/* Recommended items */}
                  <div className="flex flex-wrap gap-2">
                    {vibe.recommendations.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium border border-border"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="hidden md:flex items-center pr-8">
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                    <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VibeShowcase;
