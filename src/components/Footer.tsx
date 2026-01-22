import { Github, Linkedin, Sparkles, Code2 } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-[#0a0a0f] mt-auto relative overflow-hidden">
            {/* Background glow for footer */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-blue-500/5 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    <div className="flex flex-col items-center md:items-start gap-1">
                        <h3 className="font-semibold text-white/80 tracking-tight">SEO Prompt Architect</h3>
                        <p className="text-xs text-white/40 font-mono">
                            © 2026 - Tüm hakları saklıdır
                        </p>
                    </div>

                    {/* Cool Attribution Badge */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-full blur opacity-20 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <div className="relative flex items-center gap-2 px-6 py-2 bg-black rounded-full leading-none border border-white/10 group-hover:border-white/20 transition-colors">
                            <Code2 className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-sm font-medium text-gray-300">
                                <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-blue-400 transition-all duration-300">
                                    Enes
                                </span>
                                <span className="text-gray-500 mx-1">tarafından</span>
                                <span className="inline-flex items-center justify-center">
                                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20 animate-[pulse_2s_ease-in-out_infinite] group-hover:text-cyan-300" />
                                </span>
                                <span className="text-gray-500 ml-1">ile geliştirildi</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/EnessEyup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all hover:scale-110"
                            title="GitHub Profilim"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/enes-ey%C3%BCpo%C4%9Flu-a0987a265"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-blue-400 transition-all hover:scale-110"
                            title="LinkedIn Profilim"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
