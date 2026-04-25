export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-bg-card flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
            </div>
            <p className="text-text-primary font-medium mb-1">No matches found</p>
            <p className="text-text-secondary text-sm">Check back later for upcoming fixtures</p>
        </div>
    );
}
