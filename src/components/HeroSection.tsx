import { Upload, Sparkles, Eye } from "lucide-react";
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

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

interface HeroSectionProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (data: { vibe: VibeAnalysis; products: Product[]; uploadedImage: string }) => void;
  onAnalysisError: (error: string) => void;
}

const HeroSection = ({ onAnalysisStart, onAnalysisComplete, onAnalysisError }: HeroSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const uploadedImageUrl = URL.createObjectURL(file);
    onAnalysisStart();

    try {
      // Convert to base64
      const buffer = await file.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
      );

      const response = await supabase.functions.invoke("analyze-vibe", {
        body: { imageBase64: base64, mimeType: file.type },
      });

      if (response.error) throw new Error(response.error.message);
      if (response.data?.error) throw new Error(response.data.error);

      onAnalysisComplete({
        vibe: response.data.vibe,
        products: response.data.products,
        uploadedImage: uploadedImageUrl,
      });
    } catch (err) {
      console.error("Analysis error:", err);
      onAnalysisError(err instanceof Error ? err.message : "Analysis failed");
    }
  }, [onAnalysisStart, onAnalysisComplete, onAnalysisError]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/3 blur-[100px] animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Visual-Common Sense AI</span>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          <span className="text-foreground">See the </span>
          <span className="text-gradient-gold">Vibe</span>
          <span className="text-foreground">,</span>
          <br />
          <span className="text-foreground">Not Just the Object</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Upload any image and our AI decodes its aesthetic DNA — recommending products 
          that match the <em className="text-foreground/80">feeling</em>, not just the keywords.
        </p>

        {/* Upload Zone */}
        <div
          className={`upload-zone rounded-2xl p-12 md:p-16 max-w-2xl mx-auto cursor-pointer group ${
            isDragging ? "border-primary/60 shadow-glow" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />

          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto group-hover:bg-primary/10 transition-colors">
              <Upload className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div>
              <p className="text-foreground font-medium text-lg">Drop your image here</p>
              <p className="text-muted-foreground text-sm mt-1">or click to browse • PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 md:gap-12 mt-12 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="w-4 h-4 text-primary" />
            <span>Visual Reasoning</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>44,000+ Products</span>
          </div>
          <div className="w-px h-4 bg-border hidden md:block" />
          <div className="hidden md:flex items-center gap-2 text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
            <span>Gemini Vision AI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
