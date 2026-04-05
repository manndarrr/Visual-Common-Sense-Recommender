import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { imageBase64, mimeType } = await req.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Step 1: Use Gemini Vision to analyze the image's "cognitive vibe"
    const analysisResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are VibeMatch, a visual-common sense AI that decodes the "cognitive vibe" of images. 
You analyze aesthetics, mood, texture, era, and feeling — not just objects.

When analyzing an image, you must return a JSON object with these EXACT fields:
{
  "vibe_name": "A short evocative name for the vibe (e.g., 'Dark Academia', 'Coastal Grandmother', 'Industrial Loft', 'Cyberpunk Noir')",
  "vibe_description": "A poetic 1-2 sentence description of the aesthetic feeling",
  "dominant_colors": ["array of 3-5 dominant color names that match baseColour values like: Black, White, Blue, Navy Blue, Grey, Brown, Red, Green, Pink, Beige, Cream, Maroon, Purple, Olive, Teal, Tan, Khaki, Orange, Yellow, Gold, Silver, Multi, Charcoal, Burgundy, Coffee Brown, Rust, Lavender, Peach, Mauve, Turquoise Blue, Steel, Nude, Off White, Magenta, Lime Green, Sea Green, Mustard, Taupe, Grey Melange, Fluorescent Green"],
  "suggested_categories": ["array of 2-4 matching fashion categories from: Topwear, Bottomwear, Shoes, Watches, Bags, Innerwear, Dress, Sandal, Flip Flops, Accessories, Fragrance, Jewellery, Lips, Eyes, Nails, Skin Care, Hair, Ties, Belts, Wallets, Socks, Scarves, Gloves, Headwear, Loungewear and Nightwear, Saree, Free Gifts, Cufflinks, Stoles, Sunglasses, Umbrellas"],
  "suggested_usage": ["array of 1-3 usage contexts from: Casual, Ethnic, Formal, Sports, Smart Casual, Travel, Party, Home"],
  "suggested_season": ["array of 1-2 seasons from: Summer, Winter, Fall, Spring"],
  "suggested_gender": "One of: Men, Women, Unisex, Boys, Girls — pick the most likely target based on the vibe",
  "aesthetic_tags": ["array of 5-8 aesthetic descriptor tags like: minimalist, rugged, vintage, luxurious, bohemian, edgy, earthy, sporty, refined, urban, tropical, cozy, sleek, avant-garde, romantic, grunge, preppy, classic, modern, organic, bold, soft, structured, eclectic, ethereal, industrial"]
}

CRITICAL: Return ONLY valid JSON, no markdown, no code blocks, no explanation.`
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: `data:${mimeType || "image/jpeg"};base64,${imageBase64}` },
              },
              {
                type: "text",
                text: "Analyze the cognitive vibe of this image. What aesthetic world does it belong to? Return the structured JSON analysis.",
              },
            ],
          },
        ],
      }),
    });

    if (!analysisResponse.ok) {
      const errText = await analysisResponse.text();
      console.error("AI gateway error:", analysisResponse.status, errText);
      if (analysisResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (analysisResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted. Add funds at Settings > Workspace > Usage" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI analysis failed: ${analysisResponse.status}`);
    }

    const aiResult = await analysisResponse.json();
    const rawContent = aiResult.choices?.[0]?.message?.content || "";
    
    // Parse the JSON from the AI response (handle potential markdown wrapping)
    let vibeAnalysis;
    try {
      const jsonStr = rawContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      vibeAnalysis = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", rawContent);
      throw new Error("Failed to parse vibe analysis");
    }

    // Step 2: Query products matching the vibe
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const colors = vibeAnalysis.dominant_colors || [];
    const categories = vibeAnalysis.suggested_categories || [];
    const usages = vibeAnalysis.suggested_usage || [];
    const seasons = vibeAnalysis.suggested_season || [];
    const gender = vibeAnalysis.suggested_gender || "Unisex";

    // Build a smart query that matches on multiple criteria with scoring
    // We do multiple queries and merge for best results
    let allProducts: any[] = [];

    // Primary: color + category match
    if (colors.length > 0 && categories.length > 0) {
      const { data } = await supabase
        .from("products")
        .select("*")
        .in("base_colour", colors)
        .in("article_type", categories)
        .limit(20);
      if (data) allProducts.push(...data);
    }

    // Secondary: color + usage match
    if (colors.length > 0 && usages.length > 0) {
      const { data } = await supabase
        .from("products")
        .select("*")
        .in("base_colour", colors)
        .in("usage", usages)
        .limit(20);
      if (data) allProducts.push(...data);
    }

    // Tertiary: category + season match
    if (categories.length > 0 && seasons.length > 0) {
      const { data } = await supabase
        .from("products")
        .select("*")
        .in("article_type", categories)
        .in("season", seasons)
        .limit(20);
      if (data) allProducts.push(...data);
    }

    // Fallback: just colors
    if (allProducts.length < 10 && colors.length > 0) {
      const { data } = await supabase
        .from("products")
        .select("*")
        .in("base_colour", colors)
        .limit(30);
      if (data) allProducts.push(...data);
    }

    // Deduplicate by id
    const seen = new Set<number>();
    const uniqueProducts = allProducts.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });

    // Score and rank products
    const scored = uniqueProducts.map((p) => {
      let score = 0;
      if (colors.includes(p.base_colour)) score += 3;
      if (categories.includes(p.article_type)) score += 3;
      if (usages.includes(p.usage)) score += 2;
      if (seasons.includes(p.season)) score += 1;
      if (p.gender === gender || p.gender === "Unisex") score += 1;
      return { ...p, _score: score };
    });

    scored.sort((a, b) => b._score - a._score);
    const topProducts = scored.slice(0, 24);

    return new Response(
      JSON.stringify({
        vibe: vibeAnalysis,
        products: topProducts,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("analyze-vibe error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
