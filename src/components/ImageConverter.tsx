import { useState, useRef } from "react";
import { Upload, X, Loader2, Download, Image as ImageIcon, FileImage, RefreshCw } from "lucide-react";

export function ImageConverter() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [convertedSize, setConvertedSize] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
        <div className="w-full max-w-5xl mx-auto mt-24 mb-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-white/60">
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Görsel Optimizasyon Aracı</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="glass-card rounded-2xl p-6 md:p-8 border-white/5 relative overflow-hidden transition-all duration-500">

                {!selectedFile ? (
                    // Empty State - Upload Area
                    <div
                        className="border border-dashed border-white/10 rounded-xl p-16 text-center hover:border-blue-500/30 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer group relative overflow-hidden"
                        onClick={() => inputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <div className="absolute inset-0 bg-blue-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <input
                            type="file"
                            ref={inputRef}
                            onChange={handleFileSelect}
                            accept="image/png,image/jpeg"
                            className="hidden"
                        />

                        <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-500/10 border border-white/5 group-hover:border-blue-500/20">
                            <Upload className="w-8 h-8 text-white/40 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">Görsel Yükle</h3>
                        <p className="text-white/40 text-sm max-w-md mx-auto">
                            PNG veya JPG dosyalarınızı sürükleyip bırakın veya seçmek için tıklayın
                        </p>
                    </div>
                ) : (
                    // Active State - File Loaded
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                    <FileImage className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm truncate max-w-[200px] md:max-w-md">{selectedFile.name}</p>
                                    <p className="text-white/40 text-xs uppercase tracking-wider">{formatSize(selectedFile.size)} • {selectedFile.type.split('/')[1].toUpperCase()}</p>
                                </div>
                            </div>
                            <button
                                onClick={clearAll}
                                className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors"
                                title="İptal Et"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                            {/* Original Preview */}
                            <div className="space-y-3 relative group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-xl pointer-events-none flex flex-col justify-end p-4">
                                    <p className="text-white/80 text-sm font-medium">Orijinal</p>
                                </div>
                                <div className="relative rounded-xl overflow-hidden aspect-video bg-[#0a0d12] border border-white/10 flex items-center justify-center">
                                    <img src={previewUrl!} alt="Orijinal" className="max-w-full max-h-full object-contain p-2" />
                                </div>
                            </div>

                            {/* Action / Result Area */}
                            <div className="flex flex-col justify-center h-full gap-4">
                                {!convertedUrl ? (
                                    <div className="flex flex-col justify-center h-full gap-4 p-6 rounded-xl bg-white/[0.02] border border-white/5">
                                        <div className="text-center space-y-2 mb-4">
                                            <h4 className="text-white font-medium">WebP&apos;ye Dönüştür</h4>
                                            <p className="text-white/40 text-sm">Dosya boyutunu optimize ederek performansı artırın.</p>
                                        </div>
                                        <button
                                            onClick={convertToWebP}
                                            disabled={isConverting}
                                            className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isConverting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span>İşleniyor...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <RefreshCw className="w-5 h-5" />
                                                    <span>Dönüştürmeyi Başlat</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3 relative group animate-in fade-in zoom-in duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-xl pointer-events-none flex flex-col justify-end p-4">
                                            <p className="text-green-400 text-sm font-medium">Optimize Edildi</p>
                                        </div>

                                        <div className="relative rounded-xl overflow-hidden aspect-video bg-[#0a0d12] border border-green-500/20 flex items-center justify-center">
                                            <img src={convertedUrl} alt="Converted" className="max-w-full max-h-full object-contain p-2" />

                                            {/* Floating Stats Badge */}
                                            <div className="absolute top-3 right-3 bg-green-500/10 backdrop-blur-md border border-green-500/20 text-green-400 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                                                {formatSize(convertedSize!)}
                                            </div>
                                        </div>

                                        <div className="flex gap-2 items-center justify-between p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                                            <div className="text-xs text-green-400/80">
                                                <span className="font-bold">{((1 - (convertedSize! / selectedFile.size)) * 100).toFixed(0)}%</span> oranında küçültüldü
                                            </div>
                                            <button
                                                onClick={handleDownload}
                                                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-md transition-colors flex items-center gap-2 shadow-lg shadow-green-900/20"
                                            >
                                                <Download className="w-4 h-4" /> İndir
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-in shake">
                                {error}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
