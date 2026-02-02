// src/components/Toast.tsx
export default function Toast({ message, visible }: { message: string; visible: boolean }) {
    if (!visible) return null;

    return (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
            <div className="bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
                <span>🎉</span>
                <span className="font-medium">{message}</span>
            </div>
        </div>
    );
}