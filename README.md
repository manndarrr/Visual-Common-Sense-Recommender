<div align="center">
  <h1>Multimodal "Visual-Common Sense" Recommender</h1>
  <p><b>Bridging the gap between Raw Visual Input and Semantic Meaning</b></p>
</div>

<br />

## 📖 Project Overview
Traditional search engines look for keywords like "blue chair." This project identifies the **"Cognitive DNA"** of a style. By uploading a single photo, the system reasons through high-level design themes to suggest items that logically belong in that environment—connecting **Visual Input** to **Semantic Meaning**.

---

## Core Features
<table>
  <tr>
    <td width="50%">
      <h3>🔍 Aesthetic Identification</h3>
      <p>Uses <b>Vision Transformers (ViT)</b> to extract latent style features (e.g., Cyberpunk, Dark Academia, Organic Modern).</p>
    </td>
    <td width="50%">
      <h3>Cognitive Reasoning</h3>
      <p>Suggests complementary products (decor, apparel) based on <b>Semantic Alignment</b> rather than just pixel similarity.</p>
    </td>
  </tr>
  <tr>
    <td>
      <h3>High-Speed Retrieval</h3>
      <p>Leverages <b>FAISS (Facebook AI Similarity Search)</b> for millisecond-level vector search across thousands of products.</p>
    </td>
    <td>
      <h3>Modern Interface</h3>
      <p>Interactive <b>Streamlit/Flask</b> dashboard with glassmorphic UI for seamless user uploads and discovery.</p>
    </td>
  </tr>
</table>

---

## Technical Implementation
1. **Feature Extraction:** Pre-trained **CLIP (Contrastive Language-Image Pre-training)** model acts as the "eyes" and "brain."
2. **Vector Space:** Maps images and text into a shared 512-dimension embedding space.
3. **Similarity Logic:** Uses **Cosine Similarity** to find the closest logical matches in the product database.

$$ \text{Similarity} = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|} $$

---

## Cognitive Vibe Examples
> **User Uploads:** A photo of a "Cyberpunk" themed cafe.
> **System Suggests:** A sleek black tech-wear jacket or a futuristic desk lamp.

> **User Uploads:** A photo of a "Dark Academia" study.
> **System Suggests:** A vintage fountain pen or a brass desk lamp.

---

## Author
**Mandar Deshmukh** *T.Y. B.Tech Computer Science & Engineering (AI & DS)* *MIT-WPU*

---
