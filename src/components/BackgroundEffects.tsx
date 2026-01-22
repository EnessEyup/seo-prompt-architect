export function BackgroundEffects() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#0a0a0f]" style={{ contain: 'strict' }}>
            {/* Primary Gradient Orb (Blue) - Static or very slow */}
            <div
                className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[100px] mix-blend-screen"
                style={{ transform: 'translateZ(0)', willChange: 'opacity' }}
            />

            {/* Secondary Gradient Orb (Violet) - Static */}
            <div
                className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-violet-600/5 blur-[120px] mix-blend-screen"
                style={{ transform: 'translateZ(0)' }}
            />

            {/* Grid Pattern Overlay - Static */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    backgroundSize: '100px 100px',
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                    transform: 'translateZ(0)'
                }}
            />
        </div>
    );
}
