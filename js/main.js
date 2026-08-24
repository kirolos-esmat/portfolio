// ============ THEME ============
// Applied pre-paint by an inline script in <head>; this is a safety net.
const rootEl = document.documentElement;
if (!rootEl.hasAttribute("data-theme")) {
  rootEl.setAttribute(
    "data-theme",
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  );
}

function toggleTheme() {
  const next =
    rootEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
  rootEl.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
  requestAnimationFrame(() => {
    if (window.themeChangeCallback) window.themeChangeCallback();
  });
}

function copyEmail(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const EMAIL = "kirolos.esmat10@gmail.com";
  const toast = document.getElementById("toast");
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  };
  const copyFallback = () => {
    const ta = document.createElement("textarea");
    ta.value = EMAIL;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (err) {}
    document.body.removeChild(ta);
    showToast(ok ? "Email copied!" : "Copy failed — " + EMAIL);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(EMAIL).then(
      () => showToast("Email copied!"),
      copyFallback,
    );
  } else {
    copyFallback();
  }
}

// ============ TYPEWRITER (only on homepage) ============
function initTyping() {
  const typingEl = document.getElementById("typing-text");
  if (!typingEl) return;
  const words = [
    "automate",
    "deploy",
    "build",
    "containerize",
    "monitor",
    "scale",
    "ship",
  ];
  let wordIndex = 0,
    charIndex = 0,
    isDeleting = false;
  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    let typeSpeed = isDeleting ? 60 : 120;
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }
    setTimeout(type, typeSpeed);
  }
  setTimeout(type, 600);
}
initTyping();

// ============ MOUSE SPOTLIGHT EFFECT ============
const spotlight = document.querySelector(".mouse-spotlight");
if (spotlight) {
  let mouseX = 0,
    mouseY = 0;
  let currentX = 0,
    currentY = 0;
  const speed = 0.15; // Lower = smoother but slower

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateSpotlight() {
    // Smooth lerp animation
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;

    spotlight.style.setProperty("--mouse-x", `${currentX}px`);
    spotlight.style.setProperty("--mouse-y", `${currentY}px`);

    requestAnimationFrame(updateSpotlight);
  }

  updateSpotlight();
}

// ============ BACKGROUND SKILLS TEXT ============
const isSubPage = document.body.classList.contains("page-sub");

const homeLines = [
  [
    "AWS - Amazon Web Services cloud platform for scalable infrastructure",
    "Docker - Containerize applications for consistent deployment everywhere",
    "Kubernetes - Orchestrate containers at scale across clusters",
    "Terraform - Infrastructure as Code for reproducible environments",
  ],
  [
    "CI/CD - Continuous Integration and Delivery pipelines for fast shipping",
    "GitHub Actions - Automate workflows directly from your repository",
    "Jenkins - Open source automation server for building and deploying",
    "Ansible - Configuration management and application deployment",
  ],
  [
    "Flutter - Build beautiful cross-platform mobile apps from a single codebase",
    "Dart - Optimized language for fast apps on any platform",
    "Firebase - Backend as a Service with realtime database and auth",
    "Linux - Server administration and system reliability engineering",
  ],
  [
    "Cyber Park - AR smart parking app with real-time availability tracking",
    "Skrew Calculator - Card game score tracker with rankings and history",
    "Grafana - Monitor infrastructure with beautiful dashboards",
    "TrueNAS - Enterprise storage solution management",
  ],
  [
    "Python - Scripting and automation for DevOps workflows",
    "Java - Object-oriented programming for enterprise applications",
    "MySQL - Relational database management and optimization",
    "Bash - Shell scripting for system automation and tooling",
  ],
  [
    "Git - Version control for collaborative development workflows",
    "Virtualization - Virtual machines and hypervisor management",
    "Networking - TCP/IP, DNS, load balancing, and firewalls",
    "Security - Infrastructure hardening and access management",
  ],
  [
    "Alexandria Egypt - B.Sc. Computer Science from AASTMT 2019-2023",
    "AWS Academy Graduate - Cloud Foundations certification",
    "Problem Solving - Analytical thinking and debugging skills",
    "Languages - Arabic Native, English Professional, French Limited",
  ],
  [
    "Manara - Introduction to DevOps and Cloud Computing certificates",
    "ALX AiCE - AI Career Essentials program graduate",
    "McKinsey Forward - Professional development program",
    "Notion - From scratch until professional certification",
  ],
  [
    "Infrastructure as Code - Reproducible and version-controlled infra",
    "Microservices - Distributed architecture design patterns",
    "API Development - RESTful services and integration",
    "Agile Methodology - Iterative development and delivery",
  ],
  [
    "System Reliability - Ensuring uptime and performance at scale",
    "Performance - Optimization and monitoring for fast systems",
    "Automation - Reduce manual work through smart scripting",
    "Collaboration - Working effectively with distributed teams",
  ],
  [
    "Container Orchestration - Managing containerized workloads at scale",
    "Cloud Architecture - Designing scalable cloud-native solutions",
    "DevOps Culture - Bridging development and operations teams",
    "Mobile Development - Cross-platform apps with Flutter and Dart",
  ],
  [
    "Server Administration - Linux systems and storage management",
    "Web Performance - Fast load times and reliable uptime",
    "Video Production - Multimedia content creation and editing",
    "Design - UI/UX principles for clean user interfaces",
  ],
  [
    "Documentation - Clear technical writing and knowledge sharing",
    "Testing - Unit tests and integration testing strategies",
    "Deployment - Zero-downtime releases and rollback strategies",
  ],
  [
    "AWS EC2 - Elastic compute instances for scalable workloads",
    "AWS S3 - Object storage for static assets and backups",
    "AWS Lambda - Serverless functions for event-driven computing",
    "AWS RDS - Managed relational database service",
  ],
  [
    "Docker Compose - Multi-container application orchestration",
    "Helm Charts - Package manager for Kubernetes applications",
    "Prometheus - Metrics collection and alerting framework",
    "Nginx - Reverse proxy and load balancer configuration",
  ],
  [
    "Flutter Widgets - Composable UI components for mobile apps",
    "State Management - Provider and Bloc patterns in Flutter",
    "Firebase Auth - User authentication and authorization",
    "Push Notifications - Real-time user engagement",
  ],
  [
    "SSH - Secure remote server access and management",
    "SSL/TLS - Certificate management and HTTPS configuration",
    "DNS Management - Domain configuration and routing",
    "Load Balancing - Distributing traffic across servers",
  ],
  [
    "Graduation Project A+ - Cyber Park smart parking solution",
    "Published Apps - Skrew Calculator on app stores",
    "Problem Solver - Analytical approach to complex challenges",
    "Team Player - Effective communication and collaboration",
  ],
];

const subLines = [];

// Repeat a small set of marquee rows so the background stays varied
// without hand-duplicating data.
function buildRows(base, count) {
  return Array.from({ length: count }, (_, i) => base[i % base.length]);
}

const projectsLines = buildRows([
  [
    "flutter · dart · firebase · arcore",
    "google-maps · real-time · tracking · parking",
    "state-management · provider · bloc · riverpod",
    "ui-design · material · animations · responsive",
  ],
  [
    "graduation-project · A+ · cyber-park · ar",
    "cross-platform · ios · android · web",
    "score-tracker · rankings · history · stats",
    "published · app-store · play-store · live",
  ],
], 18);

const experienceLines = buildRows([
  [
    "founder · developer · leader · creator",
    "hedwig-devs · skrew · mobile · apps",
    "server-admin · linux · docker · truenas",
    "nashat-metry · alexandria · infrastructure",
  ],
  [
    "robonation · web-dev · html · css · js",
    "hosting · domains · performance · florida",
    "devops · ci-cd · deploy · automate",
    "collaborate · communicate · deliver · grow",
  ],
], 16);

const skillsLines = buildRows([
  [
    "aws · docker · kubernetes · terraform",
    "jenkins · github-actions · ansible · bash",
    "grafana · prometheus · nginx · linux",
    "flutter · dart · firebase · python",
  ],
  [
    "deploy · ship · scale · automate",
    "containerize · orchestrate · monitor · build",
    "provision · configure · secure · optimize",
    "commit · push · merge · release",
  ],
  [
    "ec2 · s3 · lambda · rds",
    "docker-compose · helm · k8s · swarm",
    "ssl · dns · load-balancing · cdn",
    "git · version-control · branching · workflows",
  ],
  [
    "cloud-native · microservices · serverless · iac",
    "ci/cd · pipelines · automation · devops",
    "containers · pods · clusters · nodes",
    "vpc · subnets · security-groups · iam",
  ],
  [
    "linux · ubuntu · centos · shell",
    "nginx · apache · reverse-proxy · caching",
    "mysql · firebase-db · nosql · schemas",
    "python · java · dart · javascript",
  ],
  [
    "monitoring · alerting · logging · tracing",
    "uptime · sla · reliability · resilience",
    "truenas · virtualization · storage · backup",
    "ssh · tunneling · keys · permissions",
  ],
], 18);

const certsLines = buildRows([
  [
    "aws-academy · cloud-foundations · graduate",
    "manara · devops · cloud-computing · intro",
    "alx · aice · ai · career-essentials",
    "mckinsey · forward · professional · growth",
  ],
  [
    "notion · productivity · project-management",
    "learning · growth · development · progress",
    "cloud · devops · ai · leadership",
    "problem-solving · communication · adaptability",
  ],
], 18);

// Detect page from filename
function getPageLines() {
  const path = window.location.pathname;
  if (path.includes("projects")) return projectsLines;
  if (path.includes("experience")) return experienceLines;
  if (path.includes("skills")) return skillsLines;
  if (path.includes("certificates") || path.includes("certs"))
    return certsLines;
  return homeLines;
}

const skillLines = isSubPage ? getPageLines() : homeLines;

function wrapChars(text) {
  return text
    .split("")
    .map((c) =>
      c === " "
        ? '<span class="testimonial-char">&nbsp;</span>'
        : `<span class="testimonial-char">${c}</span>`,
    )
    .join("");
}

function initBackgroundText() {
  if (isSubPage) return;
  const testimonialsBg = document.getElementById("testimonials-bg");
  if (!testimonialsBg) return;
  skillLines.forEach((row, rowIndex) => {
    const rowEl = document.createElement("div");
    rowEl.className = "testimonial-row";
    rowEl.style.paddingLeft = (rowIndex % 4) * 80 + "px";
    row.forEach((text, index) => {
      const parts = text.split(" - ");
      const item = document.createElement("div");
      item.className = "testimonial-item";
      if (parts.length > 1) {
        const title = parts[0];
        const desc = parts.slice(1).join(" - ");
        item.innerHTML = `<span class="testimonial-username">${wrapChars(title)}</span><span class="testimonial-char">&nbsp;</span><span class="testimonial-char">-</span><span class="testimonial-char">&nbsp;</span><span class="testimonial-quote">${wrapChars(desc)}</span>`;
      } else {
        item.innerHTML = `<span class="testimonial-quote">${wrapChars(text)}</span>`;
      }
      rowEl.appendChild(item);
      if (index < row.length - 1) {
        const sep = document.createElement("span");
        sep.className = "testimonial-separator";
        sep.innerHTML =
          '<span class="testimonial-char">&nbsp;</span><span class="testimonial-char">·</span><span class="testimonial-char">&nbsp;</span>';
        rowEl.appendChild(sep);
      }
    });
    testimonialsBg.appendChild(rowEl);
  });
}
initBackgroundText();

// ============ SNAKE GAME ============
const canvas = document.getElementById("snake-canvas");
const ctx = canvas ? canvas.getContext("2d", { alpha: true }) : null;
if (ctx) ctx.imageSmoothingEnabled = false;

const gridSize = 15;
const snakeLength = 4;
let snake = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let gridCols, gridRows, maxXVal, maxYVal, centerCol, centerRow;

function updateGridDimensions() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = false;
  gridCols = Math.floor(canvas.width / gridSize);
  gridRows = Math.floor(canvas.height / gridSize);
  maxXVal = (gridCols - 1) * gridSize;
  maxYVal = (gridRows - 1) * gridSize;
  centerCol = Math.floor(gridCols / 2);
  centerRow = Math.floor(gridRows / 2);
}
if (canvas) updateGridDimensions();

function initSnake() {
  snake = [];
  const startX = (centerCol || 30) * gridSize;
  const startY = Math.floor((gridRows || 40) * 0.2) * gridSize;
  for (let i = 0; i < snakeLength; i++)
    snake.push({ x: startX - i * gridSize, y: startY });
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
}
if (canvas) initSnake();

const snakeEnabled =
  !!canvas &&
  !isSubPage &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (snakeEnabled) {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (direction.y !== 1) nextDirection = { x: 0, y: -1 };
        e.preventDefault();
        break;
      case "ArrowDown":
        if (direction.y !== -1) nextDirection = { x: 0, y: 1 };
        e.preventDefault();
        break;
      case "ArrowLeft":
        if (direction.x !== 1) nextDirection = { x: -1, y: 0 };
        e.preventDefault();
        break;
      case "ArrowRight":
        if (direction.x !== -1) nextDirection = { x: 1, y: 0 };
        e.preventDefault();
        break;
    }
  });
}

let cachedSnakeColor = null;
function getSnakeColor() {
  if (!cachedSnakeColor)
    cachedSnakeColor = getComputedStyle(document.body)
      .getPropertyValue("--snake-color")
      .trim();
  return cachedSnakeColor;
}
function updateSnakeColor() {
  cachedSnakeColor = getComputedStyle(document.body)
    .getPropertyValue("--snake-color")
    .trim();
}

function updateSnake() {
  direction = nextDirection;
  const head = snake[0];
  let newX = head.x + direction.x * gridSize;
  let newY = head.y + direction.y * gridSize;
  if (newX > maxXVal) newX = 0;
  if (newX < 0) newX = maxXVal;
  if (newY > maxYVal) newY = 0;
  if (newY < 0) newY = maxYVal;
  snake.unshift({ x: newX, y: newY });
  snake.pop();
}

let food = null,
  isFirstFoodSpawn = true;
const foodAvoidRadius = 18;

function spawnFood() {
  if (isFirstFoodSpawn) {
    isFirstFoodSpawn = false;
    food = {
      x: Math.floor((gridCols || 60) * 0.2) * gridSize,
      y: Math.floor((gridRows || 40) * 0.5) * gridSize,
    };
    return;
  }
  for (let a = 0; a < 100; a++) {
    const col = Math.floor(Math.random() * (gridCols || 60));
    const row = Math.floor(Math.random() * (gridRows || 40));
    if (
      Math.abs(col - (centerCol || 30)) + Math.abs(row - (centerRow || 20)) <
      foodAvoidRadius
    )
      continue;
    const x = col * gridSize,
      y = row * gridSize;
    if (snake.some((s) => s.x === x && s.y === y)) continue;
    food = { x, y };
    return;
  }
  food = { x: 0, y: 0 };
}

function checkFoodCollision() {
  if (!food) return;
  if (snake[0].x === food.x && snake[0].y === food.y) {
    const tail = snake[snake.length - 1];
    snake.push({ x: tail.x, y: tail.y });
    spawnFood();
  }
}
if (snakeEnabled) setTimeout(spawnFood, 500);

let foodPulse = 0;
function drawSnake(timestamp) {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const color = getSnakeColor();
  const size = gridSize - 2;
  const radius = size / 3.5;

  if (food) {
    foodPulse = (timestamp || 0) * 0.004;
    const pulse = 0.9 + Math.sin(foodPulse) * 0.1;
    const glow = 0.4 + Math.sin(foodPulse) * 0.2;
    ctx.fillStyle = "#4ade80";
    ctx.globalAlpha = glow * 0.15;
    ctx.beginPath();
    ctx.roundRect(food.x - 6, food.y - 6, size + 14, size + 14, radius + 4);
    ctx.fill();
    ctx.fillStyle = "#4ade80";
    ctx.globalAlpha = glow * 0.25;
    ctx.beginPath();
    ctx.roundRect(food.x - 3, food.y - 3, size + 8, size + 8, radius + 2);
    ctx.fill();
    ctx.fillStyle = "#4ade80";
    ctx.globalAlpha = pulse;
    ctx.beginPath();
    ctx.roundRect(food.x + 1, food.y + 1, size, size, radius);
    ctx.fill();
    ctx.fillStyle = "#86efac";
    ctx.globalAlpha = pulse * 0.6;
    ctx.beginPath();
    ctx.roundRect(food.x + 3, food.y + 3, size - 4, size - 4, radius - 1);
    ctx.fill();
  }

  snake.forEach((seg, i) => {
    const alpha = 1 - Math.pow(i / Math.max(snake.length - 1, 1), 1.5) * 0.7;
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.roundRect(seg.x + 1, seg.y + 1, size, size, radius);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// ============ ILLUMINATION ============
function getColors() {
  const s = getComputedStyle(document.body);
  return {
    hidden: s.getPropertyValue("--text-hidden").trim(),
    revealed: s.getPropertyValue("--text-revealed").trim(),
  };
}
function parseColor(c) {
  let r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
  if (r)
    return {
      r: parseInt(r[1], 16),
      g: parseInt(r[2], 16),
      b: parseInt(r[3], 16),
    };
  r = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(c);
  if (r) return { r: parseInt(r[1]), g: parseInt(r[2]), b: parseInt(r[3]) };
  return { r: 128, g: 128, b: 128 };
}
function lerpColor(a, b, t) {
  return `rgb(${Math.round(a.r + (b.r - a.r) * t)},${Math.round(a.g + (b.g - a.g) * t)},${Math.round(a.b + (b.b - a.b) * t)})`;
}

let charElements,
  charPositions = [];
function initCharElements() {
  charElements = document.querySelectorAll(".testimonial-char");
  cacheCharPositions();
}
function cacheCharPositions() {
  charPositions.length = 0;
  if (!charElements) return;
  charElements.forEach((c) => {
    const r = c.getBoundingClientRect();
    charPositions.push({
      el: c,
      x: r.left + r.width / 2,
      y: r.top + r.height / 2,
    });
  });
}
setTimeout(initCharElements, 50);

let cachedColors = null,
  cachedHiddenRgb = null,
  cachedRevealedRgb = null;
const colorLevels = 32;
let colorLookup = [];
function buildColorLookup() {
  colorLookup = [];
  for (let i = 0; i <= colorLevels; i++)
    colorLookup.push(
      lerpColor(cachedHiddenRgb, cachedRevealedRgb, i / colorLevels),
    );
}

let charColorState = null;
function initColorState() {
  charColorState = new Uint8Array(charPositions.length);
  charColorState.fill(255);
}

function updateColorCache() {
  cachedColors = getColors();
  cachedHiddenRgb = parseColor(cachedColors.hidden);
  cachedRevealedRgb = parseColor(cachedColors.revealed);
  updateSnakeColor();
  buildColorLookup();
  if (charColorState) charColorState.fill(255);
  charPositions.forEach(({ el }) => {
    if (colorLookup[0]) el.style.color = colorLookup[0];
  });
}
window.themeChangeCallback = updateColorCache;
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    updateColorCache();
    initColorState();
  });
});

const illuminationRadius = 170,
  foodIlluminationRadius = 180;
const illuminationRadiusSq = illuminationRadius * illuminationRadius;
const foodIlluminationRadiusSq =
  foodIlluminationRadius * foodIlluminationRadius;
let snakeCenters = new Float32Array(200);

function illuminateTestimonials() {
  if (!cachedColors || !cachedHiddenRgb || !cachedRevealedRgb) {
    updateColorCache();
    buildColorLookup();
  }
  if (colorLookup.length === 0) buildColorLookup();
  if (charPositions.length === 0) return;

  const halfGrid = gridSize / 2,
    snakeLen = snake.length;
  if (snakeCenters.length < snakeLen * 2)
    snakeCenters = new Float32Array(snakeLen * 2 + 50);
  let minX = Infinity,
    maxX2 = -Infinity,
    minY = Infinity,
    maxY2 = -Infinity;
  for (let i = 0; i < snakeLen; i++) {
    const cx = snake[i].x + halfGrid,
      cy = snake[i].y + halfGrid;
    snakeCenters[i * 2] = cx;
    snakeCenters[i * 2 + 1] = cy;
    if (cx < minX) minX = cx;
    if (cx > maxX2) maxX2 = cx;
    if (cy < minY) minY = cy;
    if (cy > maxY2) maxY2 = cy;
  }

  const fCX = food ? food.x + halfGrid : 0,
    fCY = food ? food.y + halfGrid : 0;
  if (food) {
    const fmx = fCX - foodIlluminationRadius,
      fMx = fCX + foodIlluminationRadius;
    const fmy = fCY - foodIlluminationRadius,
      fMy = fCY + foodIlluminationRadius;
    if (fmx < minX) minX = fmx;
    if (fMx > maxX2) maxX2 = fMx;
    if (fmy < minY) minY = fmy;
    if (fMy > maxY2) maxY2 = fMy;
  }

  const bMinX = minX - illuminationRadius,
    bMaxX = maxX2 + illuminationRadius;
  const bMinY = minY - illuminationRadius,
    bMaxY = maxY2 + illuminationRadius;

  for (let idx = 0; idx < charPositions.length; idx++) {
    const p = charPositions[idx],
      x = p.x,
      y = p.y;
    if (x < bMinX || x > bMaxX || y < bMinY || y > bMaxY) {
      if (charColorState && charColorState[idx] !== 0) {
        charColorState[idx] = 0;
        p.el.style.color = colorLookup[0];
      }
      continue;
    }
    let minDSq = Infinity;
    for (let i = 0; i < snakeLen; i++) {
      const dx = x - snakeCenters[i * 2],
        dy = y - snakeCenters[i * 2 + 1];
      const dSq = dx * dx + dy * dy;
      if (dSq < minDSq) minDSq = dSq;
      if (dSq < 400) break;
    }
    let intensity = 0;
    if (minDSq < illuminationRadiusSq)
      intensity = 1 - Math.sqrt(minDSq) / illuminationRadius;
    let foodIntensity = 0;
    if (food) {
      const dx = x - fCX,
        dy = y - fCY,
        fDSq = dx * dx + dy * dy;
      if (fDSq < foodIlluminationRadiusSq)
        foodIntensity = 1 - Math.sqrt(fDSq) / foodIlluminationRadius;
    }
    const combined = Math.max(intensity, foodIntensity);
    const eased = combined > 0 ? combined * combined * (3 - 2 * combined) : 0;
    const q = Math.round(eased * colorLevels);
    if (charColorState && charColorState[idx] !== q) {
      charColorState[idx] = q;
      p.el.style.color = colorLookup[q];
    }
  }
}

// ============ GAME LOOP ============
let lastUpdate = 0,
  lastIllumination = 0;
const updateInterval = 70,
  illuminationInterval = 100;

let gameRunning = true;
function gameLoop(timestamp) {
  if (!canvas) return;
  if (document.hidden) {
    requestAnimationFrame(gameLoop);
    return;
  }
  if (timestamp - lastUpdate >= updateInterval) {
    updateSnake();
    checkFoodCollision();
    lastUpdate = timestamp;
  }
  drawSnake(timestamp);
  if (timestamp - lastIllumination >= illuminationInterval) {
    illuminateTestimonials();
    lastIllumination = timestamp;
  }
  requestAnimationFrame(gameLoop);
}

// ============ MOBILE DROPDOWN INTERACTIONS ============
// Handle dropdown clicks on mobile devices (< 1024px screens)
function initMobileDropdowns() {
  const isMobile = () => window.innerWidth < 1024;

  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((navItem) => {
    const navButton = navItem.querySelector(".nav-button");
    const dropdown = navItem.querySelector(".dropdown");

    if (!navButton || !dropdown) return;

    // Toggle dropdown on click for mobile
    navButton.addEventListener("click", (e) => {
      if (!isMobile()) return; // Only on mobile

      e.preventDefault();
      e.stopPropagation();

      // Close other dropdowns
      navItems.forEach((item) => {
        if (item !== navItem) {
          item.classList.remove("active");
        }
      });

      // Toggle current dropdown
      navItem.classList.toggle("active");
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!isMobile()) return;

    const clickedInside = e.target.closest(".nav-item");
    if (!clickedInside) {
      navItems.forEach((item) => item.classList.remove("active"));
    }
  });

  // Close dropdowns when window resizes to desktop
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      navItems.forEach((item) => item.classList.remove("active"));
    }
  });
}

// Initialize mobile dropdowns
initMobileDropdowns();
if (snakeEnabled) setTimeout(() => requestAnimationFrame(gameLoop), 100);

let resizeTimeout = null;
window.addEventListener("resize", () => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (canvas) {
      updateGridDimensions();
      initSnake();
      isFirstFoodSpawn = true;
      spawnFood();
    }
    cacheCharPositions();
    initColorState();
  }, 150);
});

// Handle scroll-based re-caching of positions
let scrollTimeout = null;
window.addEventListener(
  "scroll",
  () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      cacheCharPositions();
    }, 100);
  },
  { passive: true },
);
