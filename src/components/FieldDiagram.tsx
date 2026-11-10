import React from 'react';
import { RuleDecision } from '../types/rules';

interface FieldDiagramProps {
  decision: RuleDecision;
}

export const FieldDiagram: React.FC<FieldDiagramProps> = ({ decision }) => {
  const isDiscReturned = decision.discAction === 'returned_to_thrower';
  const isReceiverAwarded = decision.discAction === 'stays_with_receiver';
  const isTurnover = decision.discAction === 'turnover_at_spot';
  const isBrick = decision.discAction === 'taken_at_brick_or_goal';

  return (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-inner text-slate-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-400">
            USAU Regulation Field Action Visualizer
          </h4>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          70yd Pitch + 2x 20yd Endzones
        </span>
      </div>

      {/* Field SVG Illustration */}
      <div className="relative w-full overflow-hidden rounded-xl border border-slate-700 bg-emerald-950/40">
        <svg
          viewBox="0 0 700 240"
          className="w-full h-auto select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Turf field background */}
          <rect x="0" y="0" width="700" height="240" fill="#064e3b" opacity="0.8" />

          {/* Alternating grass stripes */}
          {[...Array(14)].map((_, i) => (
            <rect
              key={i}
              x={i * 50}
              y="0"
              width="25"
              height="240"
              fill="#047857"
              opacity="0.12"
            />
          ))}

          {/* Perimeter boundary lines */}
          <rect
            x="10"
            y="10"
            width="680"
            height="220"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeOpacity="0.8"
          />

          {/* Defending Endzone Line (left) */}
          <line
            x1="130"
            y1="10"
            x2="130"
            y2="230"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeDasharray="6,4"
          />
          <text
            x="70"
            y="125"
            fill="#a7f3d0"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            letterSpacing="2"
            transform="rotate(-90 70 125)"
          >
            DEFENDING ENDZONE (20 YD)
          </text>

          {/* Attacking Endzone Line (right) */}
          <line
            x1="570"
            y1="10"
            x2="570"
            y2="230"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeDasharray="6,4"
          />
          <text
            x="630"
            y="125"
            fill="#a7f3d0"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            letterSpacing="2"
            transform="rotate(90 630 125)"
          >
            ATTACKING ENDZONE (20 YD)
          </text>

          {/* Brick Marks (X mark 20 yards from each endzone in center) */}
          {/* Left Brick Mark */}
          <g transform="translate(230, 120)">
            <line x1="-8" y1="-8" x2="8" y2="8" stroke="#fbbf24" strokeWidth="2.5" />
            <line x1="8" y1="-8" x2="-8" y2="8" stroke="#fbbf24" strokeWidth="2.5" />
            <text x="0" y="22" fill="#fbbf24" fontSize="9" textAnchor="middle" fontWeight="bold">
              BRICK (20yd)
            </text>
          </g>

          {/* Right Brick Mark */}
          <g transform="translate(470, 120)">
            <line x1="-8" y1="-8" x2="8" y2="8" stroke="#fbbf24" strokeWidth="2.5" />
            <line x1="8" y1="-8" x2="-8" y2="8" stroke="#fbbf24" strokeWidth="2.5" />
            <text x="0" y="22" fill="#fbbf24" fontSize="9" textAnchor="middle" fontWeight="bold">
              BRICK (20yd)
            </text>
          </g>

          {/* Midfield Center line subtle indicator */}
          <line
            x1="350"
            y1="10"
            x2="350"
            y2="230"
            stroke="#ffffff"
            strokeWidth="1"
            strokeOpacity="0.25"
          />

          {/* Visual Players & Disc depending on Call Outcome */}
          {/* Thrower (Offense) */}
          <g transform="translate(210, 120)">
            <circle cx="0" cy="0" r="14" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
              T
            </text>
            <text x="0" y="-18" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">
              Thrower
            </text>
          </g>

          {/* Marker (Defense) */}
          <g transform="translate(235, 110)">
            <circle cx="0" cy="0" r="13" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
              M
            </text>
            <text x="0" y="-17" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">
              Marker
            </text>
          </g>

          {/* Receiver (Offense) downfield */}
          <g transform="translate(530, 95)">
            <circle cx="0" cy="0" r="14" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
              R
            </text>
            <text x="0" y="-18" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">
              Receiver
            </text>
          </g>

          {/* Defender on Receiver */}
          <g transform="translate(545, 80)">
            <circle cx="0" cy="0" r="13" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
              D
            </text>
            <text x="0" y="-17" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">
              Defender
            </text>
          </g>

          {/* Flight trajectory line */}
          <path
            d="M 225 120 Q 380 40 520 95"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="4,4"
            opacity="0.8"
          />

          {/* Disc Position Indicator */}
          {isDiscReturned && (
            <g transform="translate(205, 105)">
              <ellipse cx="0" cy="0" rx="10" ry="5" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />
              {/* Return arrow */}
              <path
                d="M 320 70 Q 260 70 215 100"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                markerEnd="url(#arrow)"
              />
              <text x="0" y="20" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">
                DISC RETURNS HERE
              </text>
            </g>
          )}

          {isReceiverAwarded && (
            <g transform="translate(540, 110)">
              <ellipse cx="0" cy="0" rx="11" ry="6" fill="#f8fafc" stroke="#10b981" strokeWidth="2" />
              <text x="0" y="22" fill="#86efac" fontSize="10" fontWeight="bold" textAnchor="middle">
                DISC STAYS HERE
              </text>
            </g>
          )}

          {isTurnover && (
            <g transform="translate(420, 150)">
              <ellipse cx="0" cy="0" rx="10" ry="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              <circle cx="0" cy="0" r="15" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
              <text x="0" y="25" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">
                TURNOVER ON TURF
              </text>
            </g>
          )}

          {isBrick && (
            <g transform="translate(230, 95)">
              <ellipse cx="0" cy="0" rx="10" ry="5" fill="#f8fafc" stroke="#fbbf24" strokeWidth="2" />
              <text x="0" y="-12" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
                TAKEN AT BRICK MARK
              </text>
            </g>
          )}

          {/* Marker Definition */}
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Dynamic Caption */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-xs gap-2 border-t border-slate-800 pt-2 text-slate-300">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
            <span>Offense</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <span>Defense</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-1.5 rounded-full bg-white border border-slate-400 inline-block" />
            <span>175g Ultrastar</span>
          </span>
        </div>
        <div className="text-emerald-300 font-medium">
          {decision.possessionSummary}
        </div>
      </div>
    </div>
  );
};
