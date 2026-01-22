"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
            <div className="bg-slate-800 border border-slate-700 text-slate-200 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="font-medium">{message}</span>
            </div>
        </div>
    );
}
