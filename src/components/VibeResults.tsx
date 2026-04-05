import { X, Sparkles, Tag, Palette, Sun, User } from "lucide-react";

interface VibeAnalysis {
  vibe_name: string;
  vibe_description: string;
  dominant_colors: string[];
  suggested_categories: string[];
  suggested_usage: string[];
  suggested_season: string[];
  suggested_gender: string;
  aesthetic_tags: string[];
}

interface Product {
  id: number;
  gender: string | null;
  master_category: string | null;
  sub_category: string | null;
  article_type: string | null;
  base_colour: string | null;
  season: string | null;
  year: number | null;
  usage: string | null;
  product_display_name: string | null;
  image_filename: string | null;
}

interface VibeResultsProps {
  vibe: VibeAnalysis;
  products: Product[];
  uploadedImage: string;
  onClose: () => void;
}

const VibeResults = ({ vibe, products, uploadedImage, onClose }: VibeResultsProps) => {
  return (
    <section className="py-16 md:py-24 px-6 relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 w-10 h-10 rounded-full border border-border bg-card/80 backdrop-blur-sm flex items-center justify-center hover:border-primary/40 transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Vibe Header - Glassmorphic */}
        <div className="glassmorphic rounded-3xl p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Uploaded image */}
            <div className="w-full md:w-64 h-64 rounded-2xl overflow-hidden flex-shrink-0 border border-border/50">
              <img
                src={uploadedImage}
                alt="Your uploaded image"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Vibe info */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Cognitive Vibe Detected</span>
              </div>

              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-3">
                <span className="text-gradient-gold">{vibe.vibe_name}</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed max-w-2xl">
                {vibe.vibe_description}
              </p>

              {/* Aesthetic Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {vibe.aesthetic_tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/80 text-secondary-foreground border border-border/50 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta chips */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-primary" />
                  <span>{vibe.dominant_colors.join(", ")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-primary" />
                  <span>{vibe.suggested_usage.join(", ")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-primary" />
                  <span>{vibe.suggested_season.join(", ")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" />
                  <span>{vibe.suggested_gender}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Gallery */}
        <div className="mb-8">
          <h3 className="font-heading text-2xl font-semibold mb-2 text-foreground">
            Curated Matches <span className="text-muted-foreground font-normal text-lg">({products.length})</span>
          </h3>
          <p className="text-muted-foreground text-sm">
            Products that share the same aesthetic DNA as your image
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group glassmorphic-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all vibe-card"
            >
              {/* Product Visual */}
              <div className="aspect-square bg-gradient-to-br from-secondary/50 to-secondary/20 flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                  background: `radial-gradient(circle at 30% 30%, hsl(38 90% 55% / 0.2), transparent 70%)`
                }} />
                <div className="text-center relative z-10">
                  <span className="text-3xl mb-2 block">
                    {product.master_category === "Footwear" ? "👟" :
                     product.master_category === "Accessories" ? "👜" :
                     product.sub_category === "Topwear" ? "👔" :
                     product.sub_category === "Bottomwear" ? "👖" :
                     product.sub_category === "Dress" ? "👗" :
                     product.master_category === "Personal Care" ? "✨" :
                     "🏷️"}
                  </span>
                  <p className="text-xs text-muted-foreground font-medium">{product.article_type}</p>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-foreground font-medium text-sm line-clamp-2 mb-2 leading-snug">
                  {product.product_display_name}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.base_colour && (
                    <span className="px-2 py-0.5 rounded-md bg-secondary/60 text-muted-foreground text-xs">
                      {product.base_colour}
                    </span>
                  )}
                  {product.article_type && (
                    <span className="px-2 py-0.5 rounded-md bg-secondary/60 text-muted-foreground text-xs">
                      {product.article_type}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VibeResults;
