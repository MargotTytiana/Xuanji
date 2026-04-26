'use client'
import { useRef } from 'react'

interface Props { size?: number }

export default function BaguaWheel({ size = 480 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)

  const pause  = () => { if (svgRef.current) svgRef.current.style.animationPlayState = 'paused' }
  const resume = () => { if (svgRef.current) svgRef.current.style.animationPlayState = 'running' }

  return (
    <div style={{
      position: 'relative',
      width: Math.min(size, 480), height: Math.min(size, 480),
    }}>
      {/* Atmospheric glow */}
      <div className="animate-pulse-glow" style={{
        position: 'absolute', inset: '-30%', borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <svg
        ref={svgRef}
        viewBox="0 0 500 500"
        className="animate-spin-slow"
        style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 30px rgba(200,184,154,0.12))' }}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {/* Rings */}
        <circle cx="250" cy="250" r="244" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4"/>
        <circle cx="250" cy="250" r="238" fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2"/>
        <circle cx="250" cy="250" r="195" fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15"/>
        <circle cx="250" cy="250" r="140" fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2"/>
        <circle cx="250" cy="250" r="80"  fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.3"/>

        {/* Sector dividers */}
        <g stroke="var(--accent)" strokeWidth="0.5" opacity="0.15">
          <line x1="250" y1="6" x2="250" y2="494"/>
          <line x1="6"   y1="250" x2="494" y2="250"/>
          <line x1="62"  y1="62"  x2="438" y2="438"/>
          <line x1="438" y1="62"  x2="62"  y2="438"/>
        </g>

        {/* Trigrams */}
        {TRIGRAMS.map(t => <Trigram key={t.name} {...t} />)}

        {/* Taiji (counter-rotates) */}
        <g style={{ transformOrigin: '250px 250px', animation: 'spin-slow 40s linear infinite reverse' }}>
          <circle cx="250" cy="250" r="72" fill="var(--trigram, #d4c9b0)" opacity="0.9"/>
          <path d="M250,178 A72,72 0 0,1 250,322 A36,36 0 0,1 250,250 A36,36 0 0,0 250,178 Z" fill="var(--bg)" opacity="0.95"/>
          <circle cx="250" cy="214" r="12" fill="var(--trigram, #d4c9b0)"/>
          <circle cx="250" cy="286" r="12" fill="var(--bg)" opacity="0.95"/>
          <circle cx="250" cy="250" r="72" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4"/>
        </g>

        {/* Outer dashed ring */}
        <circle cx="250" cy="250" r="220" fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2 10" opacity="0.25"/>
      </svg>
    </div>
  )
}

/* ── Trigram renderer ── */
function Trigram({ angle, lines, name }: TrigramDef) {
  const solid = (y: number) => (
    <line x1="-22" y1={y} x2="22" y2={y} stroke="var(--trigram,#d4c9b0)" strokeWidth="3" strokeLinecap="round"/>
  )
  const broken = (y: number) => (<>
    <line x1="-22" y1={y} x2="-5" y2={y} stroke="var(--trigram,#d4c9b0)" strokeWidth="3" strokeLinecap="round"/>
    <line x1="5"   y1={y} x2="22" y2={y} stroke="var(--trigram,#d4c9b0)" strokeWidth="3" strokeLinecap="round"/>
  </>)

  return (
    <g transform={`translate(250,250) rotate(${angle}) translate(0,-215)`}>
      {lines[0] ? solid(-10) : broken(-10)}
      {lines[1] ? solid(0)   : broken(0)}
      {lines[2] ? solid(10)  : broken(10)}
      <text x="0" y="30" fill="var(--accent)" fontSize="11" textAnchor="middle"
        style={{ fontFamily: 'var(--font-serif, serif)' }} opacity="0.7">
        {name}
      </text>
    </g>
  )
}

interface TrigramDef { angle: number; lines: [boolean, boolean, boolean]; name: string }

const TRIGRAMS: TrigramDef[] = [
  { angle: 0,   lines: [true,  true,  true],  name: '乾' },
  { angle: 45,  lines: [false, false, true],  name: '震' },
  { angle: 90,  lines: [true,  false, true],  name: '离' },
  { angle: 135, lines: [false, true,  true],  name: '兑' },
  { angle: 180, lines: [false, false, false], name: '坤' },
  { angle: 225, lines: [true,  false, false], name: '巽' },
  { angle: 270, lines: [false, true,  false], name: '坎' },
  { angle: 315, lines: [true,  false, false], name: '艮' },
]