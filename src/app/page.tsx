"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { InputSection } from "@/components/InputSection";
import { PromptCard } from "@/components/PromptCard";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { ImageConverter } from "@/components/ImageConverter";
import { Footer } from "@/components/Footer";
import { generatePrompt } from "@/constants/prompts";

// Types
interface PromptData {
  title: string;
  content: string;
}

export default function Home() {
  const [title, setTitle] = useState("");
  const [prompts, setPrompts] = useState<PromptData[]>(Array(4).fill({ title: "", content: "" }));
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setPrompts(Array(4).fill({ title: "", content: "" }));

    // Minimal delay for UX (shimmer effect visibility)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const generatedPrompts = generatePrompt(title);
    setPrompts(generatedPrompts);
    setIsGenerating(false);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-premium selection:bg-blue-500/30 text-white flex flex-col">
      <BackgroundEffects />

      <Header />

      <div className="container mx-auto px-4 pb-20 relative z-10 flex-1 flex flex-col">
        <InputSection
          title={title}
          setTitle={setTitle}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {/* Divider */}
        <div className="w-full max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

        {/* Prompt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
          {prompts.map((prompt, index) => (
            <div
              key={index}
              className="h-[500px] animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <PromptCard
                title={prompt.title}
                content={prompt.content}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

        {/* Image Converter Section */}
        <ImageConverter />

      </div>

      <Footer />
    </main>
  );
}
