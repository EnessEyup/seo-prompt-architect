import { useState, useRef, useEffect } from "react";
import { Upload, X, Loader2, Download, Image as ImageIcon, FileImage, RefreshCw, CheckCircle2 } from "lucide-react";

export function ImageConverter() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [convertedSize, setConvertedSize] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Reset when component unmounts to free memory
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            if (convertedUrl) URL.revokeObjectURL(convertedUrl);
        };
    }, [previewUrl, convertedUrl]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) validateAndSetFile(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) validateAndSetFile(file);
    };

    const validateAndSetFile = (file: File) => {
        if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setConvertedUrl(null);
            setConvertedSize(null);
            setError(null);
        } else {
            setError("Lütfen sadece PNG veya JPG formatında dosya yükleyiniz.");
        }
    };

    const convertToWebP = async () => {
        if (!selectedFile || !previewUrl) return;

        setIsConverting(true);
        setError(null);

        // Artificial delay to show the nice loading animation
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const img = new Image();
            img.src = previewUrl;
            await new Promise((resolve) => (img.onload = resolve));

            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("Canvas context hatası");

            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        setConvertedUrl(URL.createObjectURL(blob));
                        setConvertedSize(blob.size);
                        setIsConverting(false);
                    } else {
                        throw new Error("Dönüştürme başarısız");
                    }
                },
                "image/webp",
                0.8
            );
        } catch {
            setError("Görsel dönüştürülürken bir hata oluştu. Lütfen tekrar deneyin.");
            setIsConverting(false);
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const handleDownload = () => {
        if (convertedUrl && selectedFile) {
            const link = document.createElement("a");
            link.href = convertedUrl;
            const originalName = selectedFile.name.replace(/\.[^/.]+$/, "");
            link.download = `${originalName}.webp`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const clearAll = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setConvertedUrl(null);
        setConvertedSize(null);
        setError(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="w-full max-w-6xl mx-auto mt-24 mb-20 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {/* Header Badge */}
            <div className="flex justify-center mb-8">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md text-white/80 shadow-xl">
                    <ImageIcon className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium tracking-wide">Görsel Optimizasyon Aracı</span>
                </div>
            </div>

            <div className="glass-card rounded-3xl p-1 border-white/10 shadow-2xl overflow-hidden min-h-[400px] relative transition-all duration-500 hover:shadow-blue-900/10">

                {!selectedFile ? (
                    // EMPTY STATE
                    <div
                        className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 text-center cursor-pointer group hover:bg-white/[0.02] transition-all rounded-[22px] border border-transparent hover:border-white/5 relative overflow-hidden"
                        onClick={() => inputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        {/* Ambient Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <input type="file" ref={inputRef} onChange={handleFileSelect} accept="image/png,image/jpeg" className="hidden" />

                        <div className="w-24 h-24 mb-8 relative">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500" />
                            <div className="relative w-full h-full bg-[#0a0d12] border border-white/10 rounded-full flex items-center justify-center shadow-2xl group-hover:-translate-y-2 transition-transform duration-300">
                                <Upload className="w-10 h-10 text-white/50 group-hover:text-blue-400 transition-colors" />
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Görsel Yükle</h3>
                        <p className="text-white/40 text-base max-w-sm mx-auto leading-relaxed mb-8">
                            JPG veya PNG dosyalarınızı sürükleyip bırakın<br />veya seçmek için tıklayın
                        </p>

                        <div className="flex gap-3 text-xs font-mono text-white/20 uppercase tracking-widest">
                            <span className="px-3 py-1 rounded bg-white/5 border border-white/5">PNG</span>
                            <span className="px-3 py-1 rounded bg-white/5 border border-white/5">JPG</span>
                            <span className="px-3 py-1 rounded bg-white/5 border border-white/5">WEBP</span>
                        </div>
                    </div>
                ) : (
                    // WORKSPACE STATE
                    <div className="bg-[#0a0d12]/50 p-6 md:p-8 rounded-[22px] h-full">

                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                    <FileImage className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-lg leading-tight truncate max-w-[200px] md:max-w-md">{selectedFile.name}</h4>
                                    <p className="text-white/40 text-sm font-mono mt-1">{formatSize(selectedFile.size)} • {selectedFile.type.split('/')[1].toUpperCase()}</p>
                                </div>
                            </div>
                            <button onClick={clearAll} className="p-3 hover:bg-white/5 rounded-xl text-white/40 hover:text-white transition-all hover:rotate-90 duration-300" title="Kapat">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* Left: Preview */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-end px-1">
                                    <span className="text-sm font-medium text-white/60">Orijinal Görsel</span>
                                </div>
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#050505] border border-white/10 shadow-inner group">
                                    {/* Checkerboard pattern for transparency */}
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                    <img src={previewUrl!} alt="Preview" className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]" />
                                </div>
                            </div>

                            {/* Right: Action or Result */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-end px-1">
                                    <span className="text-sm font-medium text-white/60">
                                        {convertedUrl ? "Optimize Edilmiş Sonuç" : "İşlem"}
                                    </span>
                                </div>

                                {!convertedUrl ? (
                                    <div className="h-full flex flex-col justify-center items-center p-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.01]">
                                        <div className="text-center mb-8 max-w-xs">
                                            <h5 className="text-xl font-semibold text-white mb-2">WebP'ye Dönüştür</h5>
                                            <p className="text-white/40 text-sm">Görsel kalitesini koruyarak dosya boyutunu %90'a kadar düşürün.</p>
                                        </div>

                                        <button
                                            onClick={convertToWebP}
                                            disabled={isConverting}
                                            className="w-full max-w-xs py-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-medium text-lg shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30 transition-all hover:-translate-y-1 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                        >
                                            {isConverting ? <Loader2 className="w-6 h-6 animate-spin" /> : <RefreshCw className="w-6 h-6" />}
                                            <span>{isConverting ? "Dönüştürülüyor..." : "Dönüştürmeyi Başlat"}</span>
                                        </button>

                                        {error && <p className="mt-4 text-red-400 text-sm bg-red-500/10 px-4 py-2 rounded-lg">{error}</p>}
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col gap-6 animate-in slide-in-from-right-4 fade-in duration-500">
                                        {/* Success Card */}
                                        <div className="flex-1 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-4 opacity-50"><CheckCircle2 className="w-24 h-24 text-green-500/10 -rotate-12" /></div>

                                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20 mb-4 animate-[bounce_1s_ease-out]">
                                                <CheckCircle2 className="w-8 h-8 text-black" />
                                            </div>

                                            <h3 className="text-2xl font-bold text-white mb-1">İşlem Tamamlandı!</h3>
                                            <p className="text-green-200/60 text-sm mb-6">Görseliniz başarıyla optimize edildi.</p>

                                            <div className="grid grid-cols-2 gap-4 w-full mb-6">
                                                <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                                                    <p className="text-xs text-white/40 uppercase">Yeni Boyut</p>
                                                    <p className="text-lg font-mono font-bold text-green-400">{formatSize(convertedSize!)}</p>
                                                </div>
                                                <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                                                    <p className="text-xs text-white/40 uppercase">Kazanç</p>
                                                    <p className="text-lg font-mono font-bold text-green-400">%{((1 - (convertedSize! / selectedFile.size)) * 100).toFixed(0)}</p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleDownload}
                                                className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl flex items-center justify-center gap-3"
                                            >
                                                <Download className="w-5 h-5" />
                                                İndir (.webp)
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
