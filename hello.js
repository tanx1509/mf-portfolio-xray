const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

const {
  FaGlobe, FaBrain, FaHome, FaTimesCircle, FaCheckCircle,
  FaChartBar, FaLock, FaDatabase, FaFire, FaBolt,
  FaTrophy, FaShieldAlt, FaRobot, FaHeartbeat,
  FaExclamationTriangle, FaArrowRight, FaChartLine,
  FaBuilding, FaMobile, FaRunning, FaHandshake,
} = require("react-icons/fa");

async function icon(Comp, color = "#C0392B", size = 512) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Comp, { color, size: String(size) })
  );
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

async function svgToPng(svgStr, w, h) {
  const buf = await sharp(Buffer.from(svgStr)).resize(w, h).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ── PALETTE: Bain white + red, Axis Bank density ──────────────
const RED      = "C0392B";
const REDHEX   = "#C0392B";
const RED2     = "E74C3C";   // brighter red accent
const RED3     = "8B0000";   // deep crimson
const REDLGT   = "FDF0EF";   // blush bg for highlight panels
const REDMID   = "FAD4CF";   // slightly deeper blush
const WHITE    = "FFFFFF";
const BLACK    = "111111";
const DGRAY    = "2C2C2C";
const MGRAY    = "555555";
const LGRAY    = "AAAAAA";
const BORDER   = "DDDDDD";
const OFFWH    = "FAFAFA";
const GREEN    = "1A8A3A";
const AMBER    = "CC7700";
const GOLD     = "B8860B";

const W = 13.3;
const H = 7.5;

// ══════════════════════════════════════════════
// SVG CHARTS  — white bg, red accent
// ══════════════════════════════════════════════

// 1. LTV:CAC bar chart
const ltvSvg = `<svg width="500" height="210" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E74C3C"/><stop offset="100%" stop-color="#8B0000"/>
    </linearGradient>
    <filter id="gs"><feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="500" height="210" fill="#FAFAFA" rx="4"/>
  <text x="14" y="16" font-size="9.5" fill="#888" font-family="Calibri" font-weight="bold" letter-spacing="1.5">LTV : CAC RATIO  BY REGION</text>
  <line x1="14" y1="20" x2="486" y2="20" stroke="#DDD" stroke-width="0.5"/>
  <!-- Grid lines -->
  <line x1="50" y1="30" x2="50"  y2="168" stroke="#EEE" stroke-width="0.8"/>
  <line x1="50" y1="168" x2="486" y2="168" stroke="#DDD" stroke-width="0.8"/>
  <line x1="50" y1="100" x2="486" y2="100" stroke="#EEE" stroke-width="0.5" stroke-dasharray="3,3"/>
  <line x1="50" y1="68"  x2="486" y2="68"  stroke="#EEE" stroke-width="0.5" stroke-dasharray="3,3"/>
  <!-- India bar — full height, glowing red -->
  <rect x="62"  y="30"  width="72" height="138" fill="url(#rg)" rx="3" filter="url(#gs)"/>
  <text x="98"  y="26"  font-size="15" fill="#C0392B" font-family="Calibri" font-weight="bold" text-anchor="middle">16.5×</text>
  <text x="98"  y="184" font-size="11" fill="#333"    font-family="Calibri" font-weight="bold" text-anchor="middle">India</text>
  <!-- SEA bar -->
  <rect x="175" y="86"  width="72" height="82"  fill="#DDDDDD" rx="3"/>
  <text x="211" y="82"  font-size="13" fill="#888" font-family="Calibri" font-weight="bold" text-anchor="middle">~10×</text>
  <text x="211" y="184" font-size="10" fill="#888" font-family="Calibri" text-anchor="middle">SEA</text>
  <!-- NA bar -->
  <rect x="288" y="109" width="72" height="59"  fill="#E8E8E8" rx="3"/>
  <text x="324" y="105" font-size="13" fill="#AAA" font-family="Calibri" font-weight="bold" text-anchor="middle">5.4×</text>
  <text x="324" y="184" font-size="10" fill="#AAA" font-family="Calibri" text-anchor="middle">NA</text>
  <!-- EU bar -->
  <rect x="400" y="122" width="72" height="46"  fill="#EFEFEF" rx="3"/>
  <text x="436" y="118" font-size="13" fill="#BBB" font-family="Calibri" font-weight="bold" text-anchor="middle">~4.3×</text>
  <text x="436" y="184" font-size="10" fill="#BBB" font-family="Calibri" text-anchor="middle">Europe</text>
  <!-- 2.4× badge -->
  <rect x="152" y="44" width="110" height="22" fill="#FDF0EF" rx="3" stroke="#C0392B" stroke-width="0.8"/>
  <text x="207" y="58" text-anchor="middle" font-size="10.5" fill="#C0392B" font-family="Calibri" font-weight="bold">India 2.4× more efficient</text>
  <text x="207" y="198" text-anchor="middle" font-size="8.5" fill="#AAA" font-family="Calibri">Source: Bain &amp; Company Case Data 2024</text>
</svg>`;

// 2. Dataset gap — 800× visual
const gapSvg = `<svg width="440" height="118" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rg2" x1="1" y1="0" x2="0" y2="0">
      <stop offset="0%" stop-color="#E74C3C"/><stop offset="100%" stop-color="#C0392B"/>
    </linearGradient>
    <filter id="gs2"><feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="440" height="118" fill="#FAFAFA" rx="4"/>
  <text x="14" y="15" font-size="9.5" fill="#888" font-family="Calibri" font-weight="bold" letter-spacing="1.5">AI TRAINING DATA  ·  COMPETITIVE GAP</text>
  <line x1="14" y1="19" x2="426" y2="19" stroke="#DDD" stroke-width="0.5"/>
  <!-- PulseX — tiny bar, glowing -->
  <rect x="14" y="28" width="6" height="22" fill="url(#rg2)" rx="1" filter="url(#gs2)"/>
  <text x="26"  y="43" font-size="12" fill="#C0392B" font-family="Calibri" font-weight="bold">PulseX: 600K devices (current)</text>
  <!-- Incumbents — massive bar -->
  <rect x="14" y="60" width="406" height="22" fill="#E8E8E8" rx="2"/>
  <text x="26"  y="75" font-size="11" fill="#888" font-family="Calibri">Incumbents (Google Fit / Apple Health): 500M+ datapoints</text>
  <!-- Gap badge -->
  <rect x="312" y="26" width="100" height="24" fill="#FDF0EF" rx="4" stroke="#C0392B" stroke-width="1"/>
  <text x="362" y="42" text-anchor="middle" font-size="12" fill="#C0392B" font-family="Calibri" font-weight="bold">GAP: ~800×</text>
  <text x="220" y="100" text-anchor="middle" font-size="9" fill="#AAA" font-family="Calibri">Enterprise AI pivot requires scale PulseX does not yet have  ·  IDC / Bain Case Data 2024</text>
</svg>`;

// 3. Wearables CAGR by region — horizontal bars
const cagrSvg = `<svg width="420" height="175" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rg3" x1="1" y1="0" x2="0" y2="0">
      <stop offset="0%" stop-color="#E74C3C"/><stop offset="100%" stop-color="#C0392B"/>
    </linearGradient>
    <filter id="gs3"><feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="420" height="175" fill="#FAFAFA" rx="4"/>
  <text x="14" y="16" font-size="9.5" fill="#888" font-family="Calibri" font-weight="bold" letter-spacing="1.5">WEARABLES CAGR  ·  BY REGION  (2024–2030)</text>
  <line x1="14" y1="20" x2="406" y2="20" stroke="#DDD" stroke-width="0.5"/>
  <!-- India -->
  <rect x="14" y="28" width="220" height="22" fill="url(#rg3)" rx="2" filter="url(#gs3)"/>
  <text x="242" y="43" font-size="13" fill="#C0392B" font-family="Calibri" font-weight="bold">22%  ★ Highest</text>
  <!-- SEA -->
  <rect x="14" y="58" width="168" height="20" fill="#CCCCCC" rx="2"/>
  <text x="190" y="72" font-size="11.5" fill="#777" font-family="Calibri">19%  SEA</text>
  <!-- Middle East -->
  <rect x="14" y="86" width="124" height="20" fill="#D8D8D8" rx="2"/>
  <text x="146" y="100" font-size="11" fill="#999" font-family="Calibri">15%  Middle East</text>
  <!-- Europe -->
  <rect x="14" y="114" width="116" height="20" fill="#E3E3E3" rx="2"/>
  <text x="138" y="128" font-size="11" fill="#AAA" font-family="Calibri">14%  Europe</text>
  <!-- LATAM -->
  <rect x="14" y="142" width="108" height="20" fill="#EFEFEF" rx="2"/>
  <text x="130" y="156" font-size="11" fill="#BBB" font-family="Calibri">13%  LATAM</text>
  <text x="210" y="170" text-anchor="middle" font-size="8.5" fill="#AAA" font-family="Calibri">Source: Bain &amp; Company Case Data 2024  ·  Mordor Intelligence 2025</text>
</svg>`;

// 4. Smart ring India 2023→2024
const ringSvg = `<svg width="310" height="145" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rg4" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E74C3C"/><stop offset="100%" stop-color="#8B0000"/>
    </linearGradient>
    <filter id="gs4"><feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="310" height="145" fill="#FAFAFA" rx="4"/>
  <text x="14" y="16" font-size="9.5" fill="#888" font-family="Calibri" font-weight="bold" letter-spacing="1">INDIA SMART RING SHIPMENTS</text>
  <line x1="14" y1="20" x2="296" y2="20" stroke="#DDD" stroke-width="0.5"/>
  <!-- 2023 bar -->
  <rect x="40"  y="82" width="70" height="50" fill="#E0E0E0" rx="3"/>
  <text x="75"  y="78" text-anchor="middle" font-size="14" fill="#AAA" font-family="Calibri" font-weight="bold">113K</text>
  <text x="75"  y="144" text-anchor="middle" font-size="10.5" fill="#888" font-family="Calibri">2023</text>
  <!-- 2024 bar — glowing red, 3x taller -->
  <rect x="165" y="28" width="70" height="104" fill="url(#rg4)" rx="3" filter="url(#gs4)"/>
  <text x="200" y="24" text-anchor="middle" font-size="14" fill="#C0392B" font-family="Calibri" font-weight="bold">323K</text>
  <text x="200" y="144" text-anchor="middle" font-size="10.5" fill="#333" font-family="Calibri" font-weight="bold">2024</text>
  <!-- Arrow + label -->
  <line x1="115" y1="80" x2="158" y2="60" stroke="#C0392B" stroke-width="1.5" marker-end="url(#arr)"/>
  <rect x="102" y="52" width="52" height="18" fill="#FDF0EF" rx="3"/>
  <text x="128" y="64" text-anchor="middle" font-size="10.5" fill="#C0392B" font-family="Calibri" font-weight="bold">+186%</text>
  <text x="155" y="132" text-anchor="middle" font-size="8" fill="#AAA" font-family="Calibri">Source: IDC India 2024</text>
</svg>`;

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";

  // ── pre-render icons ──────────────────────────────────────────
  const [
    iGlobe, iBrain, iHome,  iCross,    iTick,
    iLock,  iDB,    iChart, iHeartbeat,iFire,
    iBolt,  iTrophy,iShield,iRobot,    iRun,
    iBuild, iMob,   iHS,
  ] = await Promise.all([
    icon(FaGlobe),               icon(FaBrain,  "#CC7700"),
    icon(FaHome,   "#888888"),   icon(FaTimesCircle,"#AAAAAA"),
    icon(FaCheckCircle,"#1A8A3A"),
    icon(FaLock,   "#C0392B"),   icon(FaDatabase,"#C0392B"),
    icon(FaChartBar,"#C0392B"),  icon(FaHeartbeat,"#C0392B"),
    icon(FaFire,   "#C0392B"),   icon(FaBolt,   "#B8860B"),
    icon(FaTrophy, "#B8860B"),   icon(FaShieldAlt,"#C0392B"),
    icon(FaRobot,  "#CC7700"),   icon(FaRunning,"#C0392B"),
    icon(FaBuilding,"#C0392B"),  icon(FaMobile, "#C0392B"),
    icon(FaHandshake,"#C0392B"),
  ]);

  const [ltvImg, gapImg, cagrImg, ringImg] = await Promise.all([
    svgToPng(ltvSvg,  500, 210),
    svgToPng(gapSvg,  440, 118),
    svgToPng(cagrSvg, 420, 175),
    svgToPng(ringSvg, 310, 145),
  ]);

  // ══════════════════════════════════════════════════════════════
  // SLIDE — "The Trap of Three Options"
  // DNA: White bg · Red headers/accents · Axis Bank density
  // Layout: thin title → 3-col options left · matrix right · bottom bar
  // ══════════════════════════════════════════════════════════════
  const sl = pres.addSlide();
  sl.background = { color: WHITE };

  // ── TOP RED RULE ──────────────────────────────────────────────
  sl.addShape(pres.shapes.RECTANGLE, {
    x:0, y:0, w:W, h:0.055, fill:{color:RED}, line:{color:RED,width:0}
  });

  // ── TITLE ZONE ────────────────────────────────────────────────
  sl.addText("STRATEGIC FRAMING  ·  SLIDE 02", {
    x:0.2, y:0.08, w:5, h:0.16,
    fontSize:7, color:LGRAY, fontFace:"Calibri", margin:0, charSpacing:2.5
  });
  sl.addText("The Trap of Three Options", {
    x:0.2, y:0.22, w:9.6, h:0.38,
    fontSize:22, bold:true, color:BLACK, fontFace:"Calibri", margin:0
  });
  sl.addText([
    {text:"PulseX isn't choosing a market. It's choosing what kind of ",
     options:{color:MGRAY, fontSize:8.5, italic:true}},
    {text:"company to become",
     options:{color:RED, bold:true, fontSize:8.5, italic:true}},
    {text:" — and only one path simultaneously solves the data problem, the capital problem, and the moat problem.",
     options:{color:MGRAY, fontSize:8.5, italic:true}},
  ], { x:0.2, y:0.58, w:11, h:0.18, fontFace:"Calibri", margin:0 });

  // Bain badge
  sl.addShape(pres.shapes.RECTANGLE, {
    x:W-2.24, y:0.1, w:2.06, h:0.32,
    fill:{color:RED}, line:{color:RED,width:0}
  });
  sl.addText("BAIN & COMPANY  ◉", {
    x:W-2.24, y:0.1, w:2.06, h:0.32,
    fontSize:7.5, bold:true, color:WHITE, align:"center", valign:"middle",
    fontFace:"Calibri", margin:0
  });

  // Top separator
  sl.addShape(pres.shapes.LINE, {
    x:0, y:0.8, w:W, h:0,
    line:{color:BORDER, width:0.6}
  });

  // ── LAYOUT CONSTANTS ──────────────────────────────────────────
  const sY   = 0.82;   // section start Y
  const botH = 0.72;   // bottom bar height
  const sH   = H - sY - botH - 0.2;  // content height = 5.26

  // Left options: 3 cols each ~2.68 wide | Right matrix: 5.7 wide
  const OPT_W  = 4.1;
  const OPT_GAP= 0.1;
  const OPT_X  = [0.2, 0.2+OPT_W+OPT_GAP, 0.2+(OPT_W+OPT_GAP)*2];
  const MAT_X  = 0.2 + (OPT_W+OPT_GAP)*3 + 0.1;  // ~12.8 — wait, rethink

  // Actually: 3 option cards on LEFT half, matrix on RIGHT half
  // Left half = 7.8", right half = 5.3"
  const LW = 7.78;
  const RX = 8.02;
  const RW = W - RX - 0.18;  // ~5.1

  // Option card widths inside left half
  const cW  = (LW - 0.2 - OPT_GAP*2) / 3;  // ~2.46
  const cX  = [
    0.2,
    0.2 + cW + OPT_GAP,
    0.2 + (cW + OPT_GAP)*2,
  ];

  // ── RIGHT COLUMN — MATRIX ────────────────────────────────────
  sl.addShape(pres.shapes.RECTANGLE, {
    x:RX, y:sY, w:RW, h:0.3,
    fill:{color:RED}, line:{color:RED,width:0}
  });
  sl.addText("Strategic Option Assessment", {
    x:RX, y:sY, w:RW, h:0.3,
    fontSize:9, bold:true, color:WHITE, align:"center", valign:"middle",
    fontFace:"Calibri", margin:0
  });
  sl.addShape(pres.shapes.RECTANGLE, {
    x:RX, y:sY+0.3, w:RW, h:sH-0.3,
    fill:{color:OFFWH}, line:{color:BORDER, width:0.5}
  });

  // Matrix column headers
  const mc = [
    {lbl:"PARAMETER",   x:RX+0.04, w:1.22},
    {lbl:"DOMESTIC",    x:RX+1.28, w:1.18},
    {lbl:"ENT. AI",     x:RX+2.48, w:1.18},
    {lbl:"INDIA ★",     x:RX+3.68, w:1.34},
  ];
  const mHdrY = sY+0.34;
  mc.forEach(c => {
    sl.addText(c.lbl, {
      x:c.x, y:mHdrY, w:c.w, h:0.2,
      fontSize:6.5, bold:true, color:BLACK, align:"center",
      fontFace:"Calibri", margin:0
    });
  });

  // Dashed red border on INDIA column
  sl.addShape(pres.shapes.RECTANGLE, {
    x:mc[3].x-0.04, y:sY+0.3, w:mc[3].w+0.06, h:sH-0.3,
    fill:{color:WHITE, transparency:100},
    line:{color:RED, width:1.5, dashType:"dash"}
  });

  const rc = {High:GREEN, Medium:AMBER, Low:"AAAAAA"};
  const matRows = [
    {p:"Revenue\nPotential",
     d:{r:"Low",    t:"Capped TAM.\nApple leads."},
     e:{r:"Medium", t:"800× data\ngap to win."},
     i:{r:"High",   t:"$114.7M Y1.\n22% CAGR."}},
    {p:"Gross\nMargin",
     d:{r:"Medium", t:"Hardware\nonly. ~45%."},
     e:{r:"High",   t:"AI 75% GM —\nif achieved."},
     i:{r:"High",   t:"51.5% blended\nY1 GM."}},
    {p:"Data\nMoat Built",
     d:{r:"Low",    t:"No new data.\nSame market."},
     e:{r:"Low",    t:"Need scale\nbefore entry."},
     i:{r:"High",   t:"500K India\nbiometric nodes."}},
    {p:"CAC\nEfficiency",
     d:{r:"Low",    t:"$95 NA CAC.\nSaturated."},
     e:{r:"Medium", t:"Long B2B\nsales cycles."},
     i:{r:"High",   t:"$40 CAC.\nLTV:CAC 16.5×."}},
    {p:"Competitive\nMoat",
     d:{r:"Low",    t:"Apple Watch\n+141% India."},
     e:{r:"Low",    t:"Google Fit\n800× data."},
     i:{r:"High",   t:"DPDP moat.\nCan't replicate."}},
    {p:"Time to\nProfit",
     d:{r:"Medium", t:"Short-term.\nLimited scale."},
     e:{r:"Low",    t:"Years away.\nData first."},
     i:{r:"High",   t:"8-mo sub\npayback."}},
  ];

  const tStart = mHdrY + 0.22;
  const rH = (sH - 0.3 - 0.22) / matRows.length;

  matRows.forEach((row, i) => {
    const ry = tStart + i*rH;
    const bg = i%2===0 ? WHITE : "F6F2F2";
    sl.addShape(pres.shapes.RECTANGLE, {
      x:RX+0.02, y:ry, w:RW-0.04, h:rH-0.01,
      fill:{color:bg}, line:{color:BORDER,width:0.3}
    });
    sl.addText(row.p, {
      x:mc[0].x, y:ry+0.02, w:mc[0].w, h:rH-0.06,
      fontSize:6.5, bold:true, color:BLACK, align:"center", valign:"middle",
      fontFace:"Calibri", margin:0
    });
    [
      {col:mc[1], val:row.d},
      {col:mc[2], val:row.e},
      {col:mc[3], val:row.i},
    ].forEach(({col, val}) => {
      sl.addText([
        {text:val.r+"\n", options:{bold:true, color:rc[val.r], fontSize:7.5}},
        {text:val.t,       options:{color:MGRAY, fontSize:6}}
      ], {
        x:col.x+0.04, y:ry+0.02, w:col.w-0.08, h:rH-0.06,
        align:"center", valign:"middle", fontFace:"Calibri", margin:0
      });
    });
  });

  // Weighted score boxes below table
  const wsY = tStart + matRows.length*rH + 0.04;
  const wsH = sY + sH - wsY - 0.04;
  const scores = [
    {lbl:"DOMESTIC",  score:"2.4/5.0", color:"AAAAAA", sub:"Eliminated"},
    {lbl:"ENT. AI",   score:"2.8/5.0", color:AMBER,    sub:"Premature"},
    {lbl:"INDIA ★",   score:"3.85/5.0",color:RED,      sub:"The Move"},
  ];
  const swW = (mc[3].x + mc[3].w - mc[1].x) / 3 - 0.04;
  scores.forEach((s, i) => {
    const sx = mc[1].x + i*(swW+0.04);
    sl.addShape(pres.shapes.RECTANGLE, {
      x:sx, y:wsY, w:swW, h:wsH,
      fill:{color: i===2 ? REDLGT : OFFWH},
      line:{color: i===2 ? RED : BORDER, width: i===2 ? 1.3 : 0.5}
    });
    if(i===2) sl.addShape(pres.shapes.RECTANGLE, {
      x:sx, y:wsY, w:swW, h:0.04,
      fill:{color:RED}, line:{color:RED,width:0}
    });
    sl.addText(s.score, {
      x:sx, y:wsY+0.02, w:swW, h:wsH*0.55,
      fontSize:13.5, bold:true, color:s.color, align:"center", valign:"middle",
      fontFace:"Calibri", margin:0
    });
    sl.addText(s.sub, {
      x:sx, y:wsY+wsH*0.55, w:swW, h:wsH*0.4,
      fontSize:7, bold:true, color:s.color, align:"center",
      fontFace:"Calibri", margin:0
    });
  });
  sl.addText("Weighted Score", {
    x:mc[0].x, y:wsY, w:mc[0].w, h:wsH,
    fontSize:6.5, bold:true, color:MGRAY, align:"center", valign:"middle",
    fontFace:"Calibri", margin:0
  });
  // Source pill for matrix
  sl.addShape(pres.shapes.RECTANGLE, {
    x:RX+0.04, y:sY+sH-0.18, w:RW-0.08, h:0.16,
    fill:{color:REDLGT}, line:{color:REDLGT,width:0}
  });
  sl.addText("Source: Bain & Company Case Data 2024  ·  IDC India 2024  ·  Sacra / TechCrunch 2024  ·  Grand View Research 2024", {
    x:RX+0.06, y:sY+sH-0.18, w:RW-0.1, h:0.16,
    fontSize:6, color:RED, italic:true, fontFace:"Calibri", margin:0, valign:"middle"
  });

  // ── LEFT COLUMNS — 3 OPTION CARDS ────────────────────────────

  // Card headers row
  const cardDefs = [
    {
      num:"01", status:"ELIMINATED",  statusColor:"888888", headerBg:"888888",
      icon:iHome,
      title:"Domestic\nDeepening",   titleColor:"888888",
      hook:"You become a better Fitbit.",
      verdict:"ELIMINATED — a stronger PulseX still loses to Apple Watch in 18 months.",
      verdictColor:"888888",
      bg:OFFWH, border:"CCCCCC", boldBorder:false,
      points:[
        {head:"Apple Watch +141% India 2024", body:"Even in India — their backyard — Apple is winning the premium wave. Garmin fitness alone is $1.77B. You cannot out-hardware platforms with 10× your R&D."},
        {head:"boAt revenue -5% FY24", body:"Domestic market leaders are in a race-to-the-bottom on ASP. Mass-market smartwatch ASP fell to $19.8. No subscription revenues to speak of."},
        {head:"Zero data moat", body:"Deepening domestic adds zero geographic diversity to PulseAI's training set. Same 600K devices, same market, same incumbents — forever."},
      ],
      chartImg: null,
      stat:"$19.8", statLbl:"India avg ASP\n(IDC 2024)", statColor:"AAAAAA",
    },
    {
      num:"02", status:"PREMATURE",   statusColor:AMBER,     headerBg:AMBER,
      icon:iRobot,
      title:"Enterprise\nAI Pivot",  titleColor:AMBER,
      hook:"Right destination. Wrong timing.",
      verdict:"PREMATURE — Enterprise AI is the exit, not the entry. Scale first.",
      verdictColor:AMBER,
      bg:"FFFDF5", border:"DDD0AA", boldBorder:false,
      points:[
        {head:"800× data gap vs. incumbents", body:"600K devices. Google Fit and Apple Health have 500M+ datapoints. No enterprise insurer or corporate wellness buyer will stake risk models on a dataset this thin."},
        {head:"Oura has 5.5M rings. WHOOP has ~$350M ARR.", body:"Both are better-funded, data-richer, and already selling enterprise. Pivoting now means entering a fight you can't win yet."},
        {head:"PulseAI needs India to win enterprise", body:"The India training dataset — 500K Indian biometric profiles — is exactly what makes PulseAI India-native and unbeatable for Indian insurers."},
      ],
      chartImg: gapImg,
      stat:"800×", statLbl:"Data gap\nvs. incumbents", statColor:AMBER,
    },
    {
      num:"03", status:"THE MOVE",    statusColor:RED,       headerBg:RED,
      icon:iGlobe,
      title:"International\nExpansion ★", titleColor:RED,
      hook:"Hardware funds the AI war chest.",
      verdict:"THE MOVE — India builds the data. The data builds the AI. The AI wins enterprise.",
      verdictColor:RED,
      bg:REDLGT, border:RED, boldBorder:true,
      points:[
        {head:"$40 CAC. LTV:CAC = 16.5×", body:"Cheapest CAC globally. 2.4× more capital-efficient than NA ($95 CAC). Every rupee deployed goes 2.4× further than North America."},
        {head:"Smart rings +186% in 2024", body:"The commoditized smartwatch market collapsed -34.4%. The premium biometrics market (rings, bands) is the only category where ASPs went UP. PulseX is built for exactly this wave."},
        {head:"DPDP Act = PulseX's moat", body:"Every global incumbent must rebuild their cloud architecture to comply. PulseX's $3M localization budget buys the barrier that keeps Oura, Apple, and Google out."},
      ],
      chartImg: ringImg,
      stat:"16.5×", statLbl:"India LTV:CAC\n(Bain 2024)", statColor:RED,
    },
  ];

  const cardHeaderH = 0.28;
  const cardH = sH;

  cardDefs.forEach((card, ci) => {
    const cx = cX[ci];

    // Glow outline for card 3
    if(card.boldBorder) {
      sl.addShape(pres.shapes.RECTANGLE, {
        x:cx-0.035, y:sY-0.035, w:cW+0.07, h:cardH+0.07,
        fill:{color:"F0C0C0"}, line:{color:"F0C0C0",width:0}
      });
    }

    // Card background
    sl.addShape(pres.shapes.RECTANGLE, {
      x:cx, y:sY, w:cW, h:cardH,
      fill:{color:card.bg},
      line:{color:card.border, width:card.boldBorder?1.4:0.5}
    });
    if(card.boldBorder) sl.addShape(pres.shapes.LINE, {
      x:cx, y:sY, w:cW, h:0,
      line:{color:RED2, width:1}
    });

    // Header bar
    sl.addShape(pres.shapes.RECTANGLE, {
      x:cx, y:sY, w:cW, h:cardHeaderH,
      fill:{color:card.headerBg}, line:{color:card.headerBg,width:0}
    });

    // Status chip
    const chipW = cW*0.58;
    sl.addText("OPTION "+card.num+"  —  "+card.status, {
      x:cx+0.3, y:sY, w:chipW, h:cardHeaderH,
      fontSize:7, bold:true, color:WHITE, valign:"middle",
      fontFace:"Calibri", margin:0, charSpacing:0.5
    });

    // Status icon (tick/cross/check)
    const statusIcon = ci===2 ? iTick : (ci===1 ? iRobot : iCross);
    sl.addImage({data:statusIcon, x:cx+0.06, y:sY+0.04, w:0.2, h:0.2});

    // Icon + Title
    sl.addImage({data:card.icon, x:cx+0.12, y:sY+cardHeaderH+0.1, w:0.34, h:0.34});
    sl.addText(card.title, {
      x:cx+0.54, y:sY+cardHeaderH+0.1, w:cW-0.68, h:0.42,
      fontSize:ci===2?14.5:14, bold:true, color:card.titleColor,
      fontFace:"Calibri", margin:0
    });

    // Hook italic
    sl.addText(card.hook, {
      x:cx+0.1, y:sY+cardHeaderH+0.56, w:cW-0.2, h:0.2,
      fontSize:8.5, bold:true, italic:true, color:ci===2?DGRAY:card.titleColor,
      fontFace:"Calibri", margin:0
    });

    sl.addShape(pres.shapes.LINE, {
      x:cx+0.1, y:sY+cardHeaderH+0.79, w:cW-0.2, h:0,
      line:{color:card.border, width:0.5}
    });

    // 3 bullet points
    const ptAreaY = sY+cardHeaderH+0.83;
    const chartH_reserved = card.chartImg ? 0.82 : 0;
    const statH = 0.54;
    const verdictH = 0.32;
    const ptAreaH = cardH - cardHeaderH - 0.83 - chartH_reserved - statH - verdictH - 0.1;
    const ptH = ptAreaH / 3;

    card.points.forEach((pt, pi) => {
      const py = ptAreaY + pi*ptH;
      // accent bar
      sl.addShape(pres.shapes.RECTANGLE, {
        x:cx+0.1, y:py+0.08, w:0.05, h:ptH-0.24,
        fill:{color:card.titleColor}, line:{color:card.titleColor,width:0}
      });
      sl.addText(pt.head, {
        x:cx+0.22, y:py+0.04, w:cW-0.34, h:0.2,
        fontSize:8, bold:true, color:ci===2?DGRAY:BLACK,
        fontFace:"Calibri", margin:0
      });
      sl.addText(pt.body, {
        x:cx+0.22, y:py+0.24, w:cW-0.34, h:ptH-0.3,
        fontSize:7.5, color:MGRAY, fontFace:"Calibri", margin:0, valign:"top"
      });
      if(pi<2) sl.addShape(pres.shapes.LINE, {
        x:cx+0.1, y:py+ptH-0.04, w:cW-0.2, h:0,
        line:{color:card.border, width:0.3}
      });
    });

    // Stat block
    const stY = ptAreaY + ptAreaH;
    sl.addShape(pres.shapes.RECTANGLE, {
      x:cx+0.1, y:stY, w:cW-0.2, h:statH-0.04,
      fill:{color:ci===2?REDLGT:WHITE}, line:{color:card.border,width:0.5}
    });
    sl.addText(card.stat, {
      x:cx+0.16, y:stY+0.02, w:cW-0.32, h:statH*0.58,
      fontSize:20, bold:true, color:card.statColor, align:"center",
      fontFace:"Calibri", margin:0
    });
    sl.addText(card.statLbl, {
      x:cx+0.12, y:stY+statH*0.56, w:cW-0.24, h:statH*0.4,
      fontSize:7, color:MGRAY, align:"center", fontFace:"Calibri", margin:0
    });

    // Chart image
    if(card.chartImg) {
      const chY = stY + statH;
      sl.addImage({data:card.chartImg, x:cx+0.08, y:chY, w:cW-0.16, h:chartH_reserved-0.04});
    }

    // Verdict italic
    const vY = sY + cardH - verdictH - 0.04;
    sl.addShape(pres.shapes.RECTANGLE, {
      x:cx, y:vY, w:cW, h:verdictH+0.04,
      fill:{color: ci===2?"FFF8E8":ci===2?"FFF8E8":ci===0?"F5F5F5":REDLGT},
      line:{color:card.border, width:0}
    });
    sl.addShape(pres.shapes.LINE, {
      x:cx, y:vY, w:cW, h:0,
      line:{color:card.border, width:0.5}
    });
    sl.addText(card.verdict, {
      x:cx+0.1, y:vY+0.02, w:cW-0.2, h:verdictH,
      fontSize:7.5, bold:true, italic:true, color:card.verdictColor,
      fontFace:"Calibri", margin:0, valign:"middle"
    });
  });

  // LTV chart floats in right col below matrix if space
  // Actually put it in bottom of right col
  // Actually: put CAGR chart in full right col instead — we already have stat scores
  // Let's add the LTV chart at the very bottom of left side as an inset
  // Place CAGR chart just above the bottom bar on the right
  const cagrY = sY + sH - 1.7;
  sl.addImage({data:cagrImg, x:RX+0.04, y:cagrY, w:RW-0.08, h:1.62});

  // ── BOTTOM RED BAR — Stats + Kill-shot ────────────────────────
  const botY = H - botH - 0.18;

  sl.addShape(pres.shapes.RECTANGLE, {
    x:0, y:botY, w:W, h:botH,
    fill:{color:RED}, line:{color:RED,width:0}
  });
  sl.addShape(pres.shapes.LINE, {
    x:0, y:botY, w:W, h:0,
    line:{color:RED2, width:1}
  });

  // 6 stat tiles
  const stats = [
    {val:"16.5×", lbl:"India LTV:CAC",         ico:iTrophy},
    {val:"2.4×",  lbl:"CAC efficiency vs. NA",  ico:iBolt},
    {val:"$40",   lbl:"India CAC",              ico:iHeartbeat},
    {val:"22%",   lbl:"India wearables CAGR",   ico:iChart},
    {val:"$114.7M",lbl:"Y1 India revenue",      ico:iDB},
    {val:"+186%", lbl:"Smart ring growth 2024", ico:iFire},
  ];
  const stW = (W - 0.36) / stats.length - 0.04;
  stats.forEach((st, i) => {
    const sx = 0.18 + i*(stW+0.04);
    sl.addImage({data:st.ico, x:sx+0.06, y:botY+0.05, w:0.2, h:0.2});
    sl.addText(st.val, {
      x:sx+0.28, y:botY+0.04, w:stW-0.32, h:0.28,
      fontSize:18, bold:true, color:WHITE, fontFace:"Calibri", margin:0
    });
    sl.addText(st.lbl, {
      x:sx, y:botY+0.3, w:stW, h:0.14,
      fontSize:6.5, color:"FFCCCC", align:"center", fontFace:"Calibri", margin:0
    });
    if(i<5) sl.addShape(pres.shapes.LINE, {
      x:sx+stW+0.02, y:botY+0.06, w:0, h:0.42,
      line:{color:"A82020", width:0.5}
    });
  });

  // Kill-shot line
  sl.addShape(pres.shapes.LINE, {
    x:0.18, y:botY+0.47, w:W-0.36, h:0,
    line:{color:"AA1515", width:0.5}
  });
  sl.addImage({data:iFire, x:0.2, y:botY+0.5, w:0.2, h:0.2});
  sl.addText([
    {text:"India is the training ground.   ",
     options:{color:WHITE, bold:true, fontSize:9.5}},
    {text:"The globally superior AI is the product.   ",
     options:{color:"FFDDDD", bold:true, fontSize:9.5, italic:true}},
    {text:"Enterprise B2B lock-in is the terminal exit.",
     options:{color:WHITE, bold:true, fontSize:9.5}},
  ], {x:0.46, y:botY+0.5, w:W-0.66, h:0.2, fontFace:"Calibri", margin:0, valign:"middle"});

  // ── FOOTER ────────────────────────────────────────────────────
  sl.addShape(pres.shapes.LINE, {
    x:0, y:H-0.2, w:W, h:0, line:{color:BORDER, width:0.4}
  });
  sl.addText("Source: IDC India 2024  ·  Bain & Company Case Data 2024  ·  Garmin SEC FY2024  ·  Sacra/TechCrunch (Oura) 2024  ·  Grand View Research 2024  ·  Mordor Intelligence 2025", {
    x:0.18, y:H-0.19, w:9.5, h:0.17,
    fontSize:5.8, color:LGRAY, italic:true, fontFace:"Calibri", margin:0
  });
  sl.addText("BRAINWARS 2026  ·  Team PulseX", {
    x:W-2.8, y:H-0.19, w:2.62, h:0.17,
    fontSize:6, color:LGRAY, align:"right", fontFace:"Calibri", margin:0
  });

  await pres.writeFile({ fileName: "/home/claude/pulsex_s2_final.pptx" });
  console.log("DONE.");
}

main().catch(e => { console.error(e); process.exit(1); });