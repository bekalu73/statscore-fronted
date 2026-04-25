interface BadgeProps {
    variant: 'green' | 'orange' | 'red' | 'yellow' | 'purple' | 'gray' | 'live';
    children: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeProps['variant'], string> = {
    green: 'bg-green-badge text-green-accent border border-green-accent/20',
    orange: 'bg-orange-badge text-orange-accent border border-orange-accent/20',
    red: 'bg-[#EE5E52] text-white border border-red-accent/20',
    yellow: 'bg-yellow-badge text-yellow-accent border border-yellow-accent/20',
    purple: 'bg-purple-accent/20 text-purple-accent border border-purple-accent/20',
    gray: 'bg-bg-card text-text-secondary border border-border-primary',
    live: 'bg-green-badge text-green-accent border border-green-accent/30 animate-pulse-live',
};

const sizeStyles: Record<'sm' | 'md', string> = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-0.5 text-xs',
};

export default function Badge({ variant, children, className = '', size = 'sm' }: BadgeProps) {
    return (
        <span
            className={`
        inline-flex items-center gap-0.5 rounded-md font-semibold leading-none
        ${variantStyles[variant]} ${sizeStyles[size]} ${className}
      `}
        >
            {children}
        </span>
    );
}
