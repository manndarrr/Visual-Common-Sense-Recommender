import { Upload, Sparkles, Eye } from "lucide-react";
import { useState, useCallback } from "react";

const HeroSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  }, []);


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

          {uploadedImage ? (
            <div className="space-y-4">
              <img
                src={uploadedImage}
                alt="Uploaded preview"
                className="max-h-48 mx-auto rounded-lg object-cover"
              />
              <p className="text-sm text-muted-foreground">Image uploaded! (Demo mode — analysis coming soon)</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto group-hover:bg-primary/10 transition-colors">
                <Upload className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-foreground font-medium text-lg">Drop your image here</p>
                <p className="text-muted-foreground text-sm mt-1">or click to browse • PNG, JPG up to 10MB</p>
              </div>
            </div>
          )}
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
            <span>Aesthetic Matching</span>
          </div>
          <div className="w-px h-4 bg-border hidden md:block" />
          <div className="hidden md:flex items-center gap-2 text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
            <span>AI-Powered</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
