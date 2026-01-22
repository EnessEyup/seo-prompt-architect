import { Wand2 } from "lucide-react";

export function Header() {
    return (
        <header className="flex flex-col items-center justify-center py-16 relative w-full px-4 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "1s" }} />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 hover:bg-white/10 transition-colors cursor-default animate-fade-in-up">
                <span className="flex h-2 w-2 rounded-full bg-blue-400 relative">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>
                </span>
                <span className="text-xs font-medium text-white/60">v2.5 Kararlı Sürüm</span>
            </div>

            {/* Title Section */}
            <div className="text-center relative z-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Wand2 className="w-12 h-12 text-blue-400 relative z-10 animate-float" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2">
                        SEO Prompt
                        <span className="block text-gradient">Architect</span>
                    </h1>
                </div>
                <p className="text-lg text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
                    Profesyonel Hukuki İçerik Üretim Motoru
                </p>
            </div>
        </header>
    );
}
