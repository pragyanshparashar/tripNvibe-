const variants = {
  primary:
    'bg-sunset text-white shadow-soft hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-deep-800 text-cream-50 hover:bg-deep-700 hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'bg-transparent text-deep-800 border-2 border-deep-800/20 hover:border-coral-500 hover:text-coral-600',
  ghost: 'bg-transparent text-deep-700 hover:bg-deep-900/5',
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
