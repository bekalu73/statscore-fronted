interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-bg-card rounded ${className}`}
        />
    );
}

export function MatchCardSkeleton() {
    return (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-surface">
            <Skeleton className="w-10 h-10 rounded" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-6 w-8" />
        </div>
    );
}

export function MatchDetailSkeleton() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between p-6">
                <div className="flex flex-col items-center gap-2">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>
            <div className="space-y-3 px-6">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
        </div>
    );
}
