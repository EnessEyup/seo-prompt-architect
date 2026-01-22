import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";

interface InputSectionProps {
    title: string;
    setTitle: (value: string) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

const PLACEHOLDERS = [
    "Makale başlığını buraya girin...",
    "Örn: 'İş Kazası Tazminat Davaları'",
    "Örn: 'Anlaşmalı Boşanma Protokolü'",
    "Örn: 'Kira Tespit Davası Şartları'",
    "Örn: 'Mirastan Mal Kaçırma Davaları'"
];

export function InputSection({
    title,
    setTitle,
    onGenerate,
    isGenerating
}: InputSectionProps) {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            onGenerate();
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mb-16 relative z-20 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="glass-card rounded-2xl p-2 md:p-3 flex flex-col md:flex-row items-center gap-2 md:gap-3 transition-all duration-500 hover:border-white/10 group">
                <div className="flex-1 w-full relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Sparkles className="w-5 h-5 text-blue-400 opacity-50" />
                    </div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full h-14 md:h-16 pl-14 pr-4 bg-transparent text-lg md:text-xl text-white placeholder-white/20 outline-none focus:placeholder-white/10 transition-all font-light"
                    />

                    {/* Animated Placeholder */}
                    {title.length === 0 && (
                        <div className="absolute inset-y-0 left-14 flex items-center pointer-events-none overflow-hidden">
                            <span className="text-white/20 text-lg md:text-xl truncate animate-fade-in-up key={placeholderIndex}">
                                {PLACEHOLDERS[placeholderIndex]}
                            </span>
                        </div>
                    )}
                </div>

                <button
                    onClick={onGenerate}
                    disabled={isGenerating || !title.trim()}
                    className={`
            h-14 md:h-16 px-8 rounded-xl font-medium text-lg whitespace-nowrap
            text-white shadow-lg transition-all duration-300
            flex items-center gap-3 relative overflow-hidden
            md:w-auto w-full justify-center
            ${!title.trim()
                            ? 'opacity-50 cursor-not-allowed bg-white/5'
                            : 'bg-blue-600 hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] shadow-blue-500/20'
                        }
          `}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Üretiliyor...</span>
                        </>
                    ) : (
                        <>
                            <span>Promptları Üret</span>
                            <ArrowRight className="w-5 h-5 opacity-70" />
                        </>
                    )}

                    {/* Shimmer Effect */}
                    {!isGenerating && title.trim() && (
                        <div className="absolute inset-0 shimmer opacity-30 pointer-events-none mix-blend-overlay" />
                    )}
                </button>
            </div>

            <div className="mt-4 text-center">
                <div className="text-xs text-white/20 flex items-center justify-center gap-2 font-mono">
                    <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10">⌘ + Enter</kbd>
                    <span>ile hızlı üret</span>
                </div>
            </div>
        </div>
    );
}
