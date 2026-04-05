import { useState, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import VibeResults from "@/components/VibeResults";
import AnalyzingOverlay from "@/components/AnalyzingOverlay";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

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

interface AnalysisResult {
  vibe: VibeAnalysis;
  products: Product[];
  uploadedImage: string;
}

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalysisStart = useCallback(() => {
    setIsAnalyzing(true);
    setResult(null);
  }, []);

  const handleAnalysisComplete = useCallback((data: AnalysisResult) => {
    setIsAnalyzing(false);
    setResult(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAnalysisError = useCallback((error: string) => {
    setIsAnalyzing(false);
    toast({
      title: "Analysis Failed",
      description: error,
      variant: "destructive",
    });
  }, [toast]);

  const handleClose = useCallback(() => {
    setResult(null);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {isAnalyzing && <AnalyzingOverlay />}

      {result ? (
        <VibeResults
          vibe={result.vibe}
          products={result.products}
          uploadedImage={result.uploadedImage}
          onClose={handleClose}
        />
      ) : (
        <>
          <HeroSection
            onAnalysisStart={handleAnalysisStart}
            onAnalysisComplete={handleAnalysisComplete}
            onAnalysisError={handleAnalysisError}
          />
          <HowItWorks />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Index;
