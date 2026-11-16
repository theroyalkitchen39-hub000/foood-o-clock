import { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ClockSignatureProps {
  /** Increments slightly on user interactions like category changes to give one crisp tick */
  tickOffset?: number;
  size?: number;
  className?: string;
}

/**
 * Signature Clock-Inspired Detail for FOOD O'CLOCK:
 * A precision architectural dial that settles smoothly to the current hour/minute
 * on view and performs a single subtle mechanical tick when the user switches menu views.
 * Never spins continuously. Respects prefers-reduced-motion.
 */
export function ClockSignature({
  tickOffset = 0,
  size = 44,
  className = '',
}: ClockSignatureProps) {
  const prefersReducedMotion = useReducedMotion();

  const { initialHourAngle, initialMinuteAngle } = useMemo(() => {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    return {
      initialHourAngle: hours * 30 + minutes * 0.5,
      initialMinuteAngle: minutes * 6,
    };
  }, []);

  const minuteAngle = initialMinuteAngle + tickOffset * 30;
  const hourAngle = initialHourAngle + tickOffset * 2.5;

  const ticks = Array.from({ length: 12 }, (_, idx) => idx * 30);

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer hairline dial ring */}
        <circle
          cx="32"
          cy="32"
          r="29"
          stroke="rgba(255, 255, 255, 0.16)"
          strokeWidth="1.25"
        />

        {/* 12 architectural hour ticks, with 12 o'clock highlighted in Golden Yellow */}
        {ticks.map((deg, idx) => (
          <line
            key={deg}
            x1="32"
            y1={idx === 0 ? '5' : '6.5'}
            x2="32"
            y2={idx % 3 === 0 ? '11.5' : '9.5'}
            stroke={idx === 0 ? '#FFC400' : 'rgba(255, 255, 255, 0.36)'}
            strokeWidth={idx === 0 ? '2' : '1.25'}
            strokeLinecap="square"
            transform={`rotate(${deg} 32 32)`}
          />
        ))}

        {/* Hour hand */}
        <motion.line
          x1="32"
          y1="32"
          x2="32"
          y2="18.5"
          stroke="#FFFFFF"
          strokeWidth="2.25"
          strokeLinecap="round"
          style={{ originX: '32px', originY: '32px' }}
          initial={
            prefersReducedMotion
              ? { rotate: hourAngle }
              : { rotate: hourAngle - 45, opacity: 0 }
          }
          animate={{ rotate: hourAngle, opacity: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
          }
        />

        {/* Signature Golden Yellow minute hand */}
        <motion.line
          x1="32"
          y1="34"
          x2="32"
          y2="12.5"
          stroke="#FFC400"
          strokeWidth="1.75"
          strokeLinecap="round"
          style={{ originX: '32px', originY: '32px' }}
          initial={
            prefersReducedMotion
              ? { rotate: minuteAngle }
              : { rotate: minuteAngle - 90, opacity: 0 }
          }
          animate={{ rotate: minuteAngle, opacity: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
          }
        />

        {/* Center pin */}
        <circle cx="32" cy="32" r="2.75" fill="#FFC400" />
        <circle cx="32" cy="32" r="1" fill="#080808" />
      </svg>
    </div>
  );
}
