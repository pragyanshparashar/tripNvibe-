import logoIcon from '../../assets/logo-icon.png'

const sizes = {
  sm: { icon: 'h-7 w-7', text: 'text-lg' },
  md: { icon: 'h-9 w-9', text: 'text-xl' },
  lg: { icon: 'h-14 w-14', text: 'text-3xl' },
}

export default function Logo({ size = 'md', className = '' }) {
  const { icon, text } = sizes[size]

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img src={logoIcon} alt="" className={`${icon} rounded-lg object-cover`} />
      <span className={`font-display font-bold ${text}`}>
        <span className="text-teal-600">Tripn</span>
        <span className="text-navy-900">Vibe</span>
      </span>
    </span>
  )
}
