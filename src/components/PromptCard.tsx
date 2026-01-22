import { useState, useEffect } from "react";
import { Copy, Check, Terminal } from "lucide-react";

interface PromptCardProps {
    title: string;
    content: string;
    index: number;
}

export function PromptCard({ title, content, index }: PromptCardProps) {
    const [copied, setCopied] = useState(false);
    const [time, setTime] = useState("");

    useEffect(() => {
        setTime(new Date().toLocaleTimeString());
    }, []);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass-card rounded-xl overflow-hidden flex flex-col h-full group transition-all duration-300 hover:translate-y-[-4px] hover:shadow-blue-500/10 hover:border-blue-500/30">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 font-mono text-sm border border-blue-500/20">
                        0{index + 1}
                    </div>
                    <h3 className="font-semibold text-white/90 group-hover:text-blue-300 transition-colors">
                        {title}
                    </h3>
                </div>

                <button
                    onClick={handleCopy}
                    className={`
            relative p-2 rounded-lg transition-all duration-300 border border-transparent
            ${copied
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'hover:bg-white/10 text-white/40 hover:text-white border-white/5'
                        }
          `}
                    title="Kopyala"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}

                    {/* Tooltip */}
                    {copied && (
                        <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-green-500/90 backdrop-blur text-white text-[10px] font-medium rounded shadow-lg animate-fade-in-up">
                            Kopyalandı!
                        </div>
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-0 relative bg-[#0d1117] group-hover:bg-[#0f141c] transition-colors">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

                {/* Terminal decorative bar */}
                <div className="absolute top-0 right-4 h-full w-px bg-white/5 pointer-events-none" />

                <pre className="p-5 overflow-x-auto text-sm font-mono leading-relaxed text-blue-100/70 custom-scrollbar h-full relative z-10 selection:bg-blue-500/30">
                    {content ? (
                        <code className="block whitespace-pre-wrap">{content}</code>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-white/20 gap-3">
                            <Terminal className="w-8 h-8 opacity-20" />
                            <span className="text-xs uppercase tracking-widest opacity-50">Giriş bekleniyor...</span>
                        </div>
                    )}
                </pre>
            </div>

            {/* Footer Status Bar */}
            <div className="px-4 py-2 bg-[#0a0d12] border-t border-white/5 text-[10px] text-white/20 font-mono flex justify-between items-center">
                <span>Zaman: {time}</span>
                <span>UTF-8</span>
            </div>
        </div>
    );
}
