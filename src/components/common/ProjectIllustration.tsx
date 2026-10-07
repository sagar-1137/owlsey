import React from "react";
import type { ProjectVisual } from "@/data/projectCases";

/**
 * Schematic product illustrations for cases without a shareable screenshot
 * (NDA work, internal tools). Drawn in the site's own language — ink panels,
 * hairline rails, one indigo accent — at the same 16:10 ratio as the real
 * screenshots, so every case page has a visual that fits the frame.
 *
 * They depict the *kind* of system, never a client's actual interface.
 */
const W = 1440;
const H = 900;

/** A text placeholder bar. */
const Bar = ({ x, y, w, h = 12, accent = false }: { x: number; y: number; w: number; h?: number; accent?: boolean }) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} className={accent ? "pi-accent-fill" : "pi-bar"} />
);

/** A rounded panel. */
const Panel = ({ x, y, w, h, strong = false }: { x: number; y: number; w: number; h: number; strong?: boolean }) => (
  <rect x={x} y={y} width={w} height={h} rx={14} className={strong ? "pi-panel-strong" : "pi-panel"} />
);

/** App chrome shared by the UI-style visuals: sidebar + top bar. */
const AppShell = ({ children, nav = 6 }: { children: React.ReactNode; nav?: number }) => (
  <>
    <rect x={0} y={0} width={260} height={H} className="pi-sidebar" />
    <circle cx={60} cy={64} r={18} className="pi-accent-fill" />
    <Bar x={92} y={58} w={110} />
    {Array.from({ length: nav }, (_, i) => (
      <g key={i}>
        <rect x={40} y={140 + i * 58} width={18} height={18} rx={5} className={i === 0 ? "pi-accent-fill" : "pi-bar"} />
        <Bar x={74} y={143 + i * 58} w={i === 0 ? 120 : 90 + ((i * 23) % 50)} accent={i === 0} />
      </g>
    ))}
    <rect x={260} y={0} width={W - 260} height={84} className="pi-topbar" />
    <rect x={300} y={24} width={360} height={36} rx={18} className="pi-panel" />
    <circle cx={W - 64} cy={42} r={18} className="pi-bar" />
    {children}
  </>
);

const Dashboard = () => (
  <AppShell>
    <Bar x={300} y={124} w={280} h={22} />
    <Bar x={300} y={160} w={180} />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <Panel x={300 + i * 272} y={204} w={250} h={130} />
        <Bar x={326 + i * 272} y={232} w={110} h={10} />
        <Bar x={326 + i * 272} y={268} w={80 + i * 10} h={30} accent={i === 1} />
      </g>
    ))}
    <Panel x={300} y={360} w={700} h={480} />
    <Bar x={330} y={392} w={200} h={14} />
    {[0.55, 0.8, 0.45, 0.95, 0.7, 0.6, 0.85, 0.5, 0.9, 0.75].map((v, i) => (
      <rect key={i} x={340 + i * 64} y={800 - v * 330} width={36} height={v * 330} rx={6} className={i === 3 ? "pi-accent-fill" : "pi-bar-strong"} />
    ))}
    <Panel x={1024} y={360} w={376} h={480} />
    <Bar x={1054} y={392} w={150} h={14} />
    {Array.from({ length: 7 }, (_, i) => (
      <g key={i}>
        <circle cx={1070} cy={452 + i * 54} r={14} className={i === 0 ? "pi-accent-fill" : "pi-bar"} />
        <Bar x={1098} y={446 + i * 54} w={130 + ((i * 37) % 90)} h={10} />
        <Bar x={1330} y={446 + i * 54} w={40} h={10} />
      </g>
    ))}
  </AppShell>
);

const Commerce = () => (
  <>
    <rect x={0} y={0} width={W} height={84} className="pi-topbar" />
    <circle cx={64} cy={42} r={20} className="pi-accent-fill" />
    <Bar x={98} y={36} w={140} />
    <rect x={480} y={22} width={480} height={40} rx={20} className="pi-panel" />
    {[0, 1, 2].map((i) => <circle key={i} cx={W - 160 + i * 50} cy={42} r={14} className="pi-bar" />)}
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <circle cx={420 + i * 150} cy={170} r={44} className="pi-panel-strong" />
        <Bar x={390 + i * 150} y={232} w={60} h={10} />
      </g>
    ))}
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <Panel x={60 + i * 336} y={290} w={312} h={420} />
        <rect x={84 + i * 336} y={314} width={264} height={250} rx={10} className="pi-media" />
        <path d={`M${150 + i * 336} 470 l40 -60 l40 60 z`} className="pi-accent-stroke" fill="none" />
        <Bar x={84 + i * 336} y={590} w={180} />
        <Bar x={84 + i * 336} y={620} w={110} h={16} accent={i === 1} />
        <rect x={84 + i * 336} y={656} width={264} height={36} rx={18} className={i === 1 ? "pi-accent-fill" : "pi-bar"} />
      </g>
    ))}
    <Panel x={60} y={740} w={W - 120} h={110} />
    {[0, 1, 2, 3].map((i) => <Bar key={i} x={100 + i * 330} y={790} w={200} />)}
  </>
);

const Docs = () => (
  <>
    <rect x={0} y={0} width={W} height={84} className="pi-topbar" />
    <circle cx={64} cy={42} r={20} className="pi-accent-fill" />
    <Bar x={98} y={36} w={130} />
    <rect x={500} y={22} width={440} height={40} rx={20} className="pi-panel" />
    <rect x={0} y={84} width={300} height={H - 84} className="pi-sidebar" />
    {Array.from({ length: 11 }, (_, i) => (
      <Bar key={i} x={i % 4 === 0 ? 40 : 64} y={130 + i * 52} w={i % 4 === 0 ? 150 : 120 + ((i * 29) % 60)} accent={i === 1} />
    ))}
    <Bar x={360} y={130} w={220} h={10} />
    <Bar x={360} y={170} w={520} h={40} />
    <Bar x={360} y={226} w={380} h={40} />
    <rect x={360} y={290} width={70} height={5} rx={2.5} className="pi-accent-fill" />
    {[0, 1, 2].map((i) => <Bar key={i} x={360} y={330 + i * 30} w={[700, 640, 520][i]} />)}
    <rect x={360} y={440} width={720} height={300} rx={14} className="pi-code" />
    {Array.from({ length: 8 }, (_, i) => (
      <g key={i}>
        <Bar x={390} y={472 + i * 32} w={40} h={10} accent={i % 3 === 0} />
        <Bar x={450 + ((i * 40) % 120)} y={472 + i * 32} w={180 + ((i * 53) % 260)} h={10} />
      </g>
    ))}
    {[0, 1].map((i) => <Bar key={i} x={360} y={776 + i * 30} w={[660, 480][i]} />)}
    <rect x={1150} y={120} width={2} height={360} className="pi-bar" />
    {Array.from({ length: 6 }, (_, i) => <Bar key={i} x={1172} y={130 + i * 46} w={130 + ((i * 31) % 80)} h={10} accent={i === 0} />)}
  </>
);

const Pipeline = () => {
  const stages = ["Input", "Syntax", "Domain", "Mailbox", "Result"];
  return (
    <>
      <Bar x={120} y={110} w={260} h={20} />
      <Bar x={120} y={146} w={180} />
      {stages.map((_, i) => {
        const x = 120 + i * 250;
        return (
          <g key={i}>
            {i > 0 && <path d={`M${x - 70} 330 H${x}`} className="pi-accent-stroke" strokeDasharray="8 8" />}
            <rect x={x} y={250} width={180} height={160} rx={16} className={i === stages.length - 1 ? "pi-panel-accent" : "pi-panel"} />
            <circle cx={x + 40} cy={292} r={16} className={i === stages.length - 1 ? "pi-accent-fill" : "pi-bar-strong"} />
            <Bar x={x + 24} y={330} w={120} h={12} />
            <Bar x={x + 24} y={360} w={80} h={10} />
          </g>
        );
      })}
      <Panel x={120} y={480} w={1200} h={330} />
      <Bar x={150} y={510} w={200} h={14} />
      <path d="M150 760 H1290" className="pi-rail" />
      <path d="M150 600 H1290" className="pi-rail" strokeDasharray="6 10" />
      <path
        d="M150 730 C 250 700, 330 720, 420 690 S 600 650, 700 700 S 880 640, 980 670 S 1160 620, 1290 650"
        className="pi-accent-stroke"
        fill="none"
        strokeWidth={4}
      />
      {[420, 700, 980].map((x) => <circle key={x} cx={x} cy={x === 700 ? 700 : x === 420 ? 690 : 670} r={8} className="pi-accent-fill" />)}
    </>
  );
};

const Security = () => (
  <>
    {Array.from({ length: 9 }, (_, i) => {
      const y = 140 + i * 72;
      const flagged = i % 3 === 1;
      return (
        <g key={i}>
          <circle cx={150} cy={y} r={16} className={flagged ? "pi-accent-fill" : "pi-bar-strong"} />
          <Bar x={182} y={y - 6} w={140} h={12} />
          <path d={`M330 ${y} C 480 ${y}, 520 450, 640 450`} className={flagged ? "pi-accent-stroke" : "pi-rail"} fill="none" />
        </g>
      );
    })}
    <path d="M720 260 L860 310 V450 C860 560 800 630 720 670 C640 630 580 560 580 450 V310 Z" className="pi-panel-accent" />
    <path d="M670 455 l35 35 l70 -80" className="pi-accent-stroke" fill="none" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <path d={`M860 450 C 960 450, 980 ${260 + i * 190}, 1080 ${260 + i * 190}`} className={i === 1 ? "pi-accent-stroke" : "pi-rail"} fill="none" />
        <rect x={1080} y={220 + i * 190} width={250} height={80} rx={14} className={i === 1 ? "pi-panel-accent" : "pi-panel"} />
        <circle cx={1116} cy={260 + i * 190} r={14} className={i === 1 ? "pi-accent-fill" : "pi-bar-strong"} />
        <Bar x={1144} y={254 + i * 190} w={140} h={12} />
      </g>
    ))}
  </>
);

const Workflow = () => {
  const nodes = [
    [120, 200], [120, 520], [470, 360], [820, 200], [820, 520], [1170, 360],
  ];
  const links = [[0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5]];
  return (
    <>
      {links.map(([a, b], i) => {
        const [x1, y1] = nodes[a];
        const [x2, y2] = nodes[b];
        return (
          <path
            key={i}
            d={`M${x1 + 220} ${y1 + 60} C ${x1 + 300} ${y1 + 60}, ${x2 - 80} ${y2 + 60}, ${x2} ${y2 + 60}`}
            className={i === 2 || i === 4 ? "pi-accent-stroke" : "pi-rail"}
            fill="none"
          />
        );
      })}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={220} height={120} rx={16} className={i === 2 ? "pi-panel-accent" : "pi-panel"} />
          <rect x={x + 22} y={y + 24} width={36} height={36} rx={10} className={i === 2 ? "pi-accent-fill" : "pi-bar-strong"} />
          <Bar x={x + 72} y={y + 30} w={110} h={12} />
          <Bar x={x + 22} y={y + 80} w={150} h={10} />
        </g>
      ))}
      <Panel x={120} y={720} w={1270} h={110} />
      {[0, 1, 2, 3].map((i) => <Bar key={i} x={160 + i * 310} y={768} w={200} accent={i === 0} />)}
    </>
  );
};

const Messaging = () => (
  <>
    <rect x={420} y={60} width={600} height={780} rx={40} className="pi-panel" />
    <rect x={420} y={60} width={600} height={100} rx={40} className="pi-topbar" />
    <circle cx={490} cy={110} r={24} className="pi-accent-fill" />
    <Bar x={530} y={98} w={160} h={12} />
    <Bar x={530} y={118} w={90} h={10} />
    {[
      [0, 190, 320, false], [1, 290, 260, true], [0, 380, 360, false], [1, 490, 300, true], [0, 590, 240, false],
    ].map(([side, y, w, accent], i) => {
      const width = Number(w);
      const x = side ? 980 - width : 460;
      return <rect key={i} x={x} y={Number(y)} width={width} height={70} rx={20} className={accent ? "pi-panel-accent" : "pi-panel-strong"} />;
    })}
    {[0, 1, 2].map((i) => <rect key={i} x={460 + i * 180} y={690} width={160} height={46} rx={23} className={i === 0 ? "pi-accent-fill" : "pi-bar"} />)}
    <rect x={460} y={760} width={520} height={52} rx={26} className="pi-panel-strong" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <path d={`M1020 ${300 + i * 150} H1140`} className={i === 1 ? "pi-accent-stroke" : "pi-rail"} strokeDasharray="8 8" />
        <Panel x={1140} y={260 + i * 150} w={220} h={80} />
        <Bar x={1166} y={292 + i * 150} w={140} h={12} accent={i === 1} />
      </g>
    ))}
  </>
);

const Monitor = () => (
  <AppShell nav={5}>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <Panel x={300 + i * 365} y={124} w={340} h={140} />
        <circle cx={340 + i * 365} cy={168} r={10} className={i === 2 ? "pi-accent-fill" : "pi-bar-strong"} />
        <Bar x={362 + i * 365} y={162} w={120} h={12} />
        <Bar x={330 + i * 365} y={204} w={140 + i * 20} h={30} accent={i === 2} />
      </g>
    ))}
    <Panel x={300} y={290} w={1100} h={330} />
    <path d="M330 560 H1370" className="pi-rail" />
    <path
      d="M330 520 L420 500 L510 512 L600 470 L690 486 L780 430 L870 450 L960 380 L1050 410 L1140 350 L1230 372 L1370 320"
      className="pi-accent-stroke"
      fill="none"
      strokeWidth={4}
    />
    <path d="M330 540 L460 532 L590 536 L720 520 L850 526 L980 510 L1110 516 L1370 500" className="pi-rail" fill="none" strokeWidth={3} />
    {[780, 1140].map((x) => <circle key={x} cx={x} cy={x === 780 ? 430 : 350} r={10} className="pi-accent-fill" />)}
    <Panel x={300} y={646} w={1100} h={210} />
    {Array.from({ length: 4 }, (_, i) => (
      <g key={i}>
        <circle cx={340} cy={690 + i * 44} r={8} className={i === 0 ? "pi-accent-fill" : "pi-bar-strong"} />
        <Bar x={366} y={684 + i * 44} w={260} h={12} />
        <Bar x={1220} y={684 + i * 44} w={140} h={12} />
      </g>
    ))}
  </AppShell>
);

const VISUALS: Record<ProjectVisual, React.FC> = {
  commerce: Commerce,
  dashboard: Dashboard,
  docs: Docs,
  pipeline: Pipeline,
  security: Security,
  workflow: Workflow,
  messaging: Messaging,
  monitor: Monitor,
};

export const ProjectIllustration: React.FC<{ visual?: ProjectVisual; title: string; className?: string }> = ({
  visual = "dashboard",
  title,
  className = "",
}) => {
  const Visual = VISUALS[visual];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`project-illustration ${className}`.trim()}
      role="img"
      aria-label={`Illustration of the ${title} system`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={W} height={H} className="pi-bg" />
      <Visual />
    </svg>
  );
};
