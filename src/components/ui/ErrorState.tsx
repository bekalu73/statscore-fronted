import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

export default function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-red-accent/10 flex items-center justify-center mb-4">
              <AlertCircle className="size-8 text-red-accent" />
            </div>
            <p className="text-text-primary font-medium mb-1">{message}</p>
            <p className="text-text-secondary text-sm mb-4">Please try again later</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/80 cursor-pointer transition-colors"
                >
                    Retry
                </button>
            )}
        </div>
    );
}
