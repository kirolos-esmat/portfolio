// ============================================================
// Terminal Portfolio — Kirolos Esmat  (Futuristic Edition)
// ============================================================

(function () {
  "use strict";

  // ── Portfolio Data ──────────────────────────────────────────
  const DATA = {
    name: "Kirolos Esmat",
    title: "DevOps Engineer & Mobile Developer",
    location: "Alexandria, Egypt",
    university: "AASTMT",
    email: "kirolos.esmat10@gmail.com",
    github: "https://github.com/kirolos-esmat",
    linkedin: "https://linkedin.com/in/kirolosesmat",

    projects: [
      {
        name: "Skrew Calculator",
        desc: "Card game score tracker · Published App",
        tags: ["Flutter", "Dart", "Firebase", "State Management", "UI/UX"],
        date: "Dec 2024",
        live: true,
      },
      {
        name: "Cyber Park",
        desc: "AR Smart Parking · Graduation Project · A+ Grade",
        tags: ["Flutter", "Dart", "Firebase", "AR Core", "Google Maps"],
        date: "2023",
        live: false,
      },
    ],

    experience: [
      {
        role: "Founder & Developer",
        company: "Hedwig Devs",
        period: "Dec 2024 — Present",
        desc: "Founded Hedwig Devs to build and publish mobile applications.",
        tags: ["Flutter", "Dart", "Firebase", "App Store", "CI/CD"],
      },
      {
        role: "Server Administrator",
        company: "Nashat Metry Office",
        period: "Jan — Mar 2024",
        desc: "Managed Linux-based server infrastructure with TrueNAS and Docker.",
        tags: ["Linux", "Docker", "TrueNAS", "Bash", "Networking"],
      },
      {
        role: "Web Developer",
        company: "RoboNation",
        period: "Jan — Mar 2023",
        desc: "Built and maintained websites. Managed hosting and domains.",
        tags: ["HTML", "CSS", "JavaScript", "Hosting", "Performance"],
      },
    ],

    skills: {
      "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "Terraform", "Ansible"],
      "CI/CD & Automation": ["Jenkins", "GitHub Actions", "Git", "Bash"],
      "Server & Infra": ["Linux", "TrueNAS", "Nginx", "SSH", "Networking"],
      "Monitoring": ["Grafana", "Prometheus", "Log Management"],
      "Mobile": ["Flutter", "Dart", "Firebase", "AR Core"],
      "Web": ["HTML", "CSS", "JavaScript", "PHP"],
      "Languages": ["Python", "Java", "MySQL", "CLI Tools"],
      "Spoken": ["Arabic · Native", "English · Fluent", "French · Intermediate"],
    },

    certificates: [
      { name: "DevOps Development Training", issuer: "STEM Center", icon: "⚙️" },
      { name: "AWS Cloud Foundations", issuer: "AWS Academy", icon: "☁️" },
      { name: "Introduction to DevOps", issuer: "Coursera", icon: "🔄" },
      { name: "Intro to Cloud Computing", issuer: "Coursera", icon: "☁️" },
      { name: "AI Career Essentials", issuer: "ALX", icon: "🤖" },
      { name: "McKinsey Forward", issuer: "McKinsey & Co.", icon: "📊" },
      { name: "Notion Professional", issuer: "Udemy", icon: "📝" },
    ],
  };

  const USER = "kirolosesmat";
  const HOST = "portfolio";

  // ── DOM ────────────────────────────────────────────────────
  const output = document.getElementById("term-output");
  const input = document.getElementById("term-input");

  // ── State ──────────────────────────────────────────────────
  const cmdHistory = [];
  let histIdx = -1;

  // ── Helpers ────────────────────────────────────────────────
  function esc(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function createBlock() {
    const block = document.createElement("div");
    block.className = "cmd-block";
    output.appendChild(block);
    // trigger animation
    requestAnimationFrame(() => {
      block.style.opacity = "1";
      block.style.transform = "translateY(0)";
    });
    output.scrollTop = output.scrollHeight;
    return block;
  }

  function addToBlock(block, html) {
    const div = document.createElement("div");
    div.className = "term-line";
    div.innerHTML = html;
    block.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  function print(html) {
    const div = document.createElement("div");
    div.className = "term-line";
    div.innerHTML = html;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  function gap(target) {
    const fn = target ? (h) => addToBlock(target, h) : print;
    fn("&nbsp;");
  }

  function makeTags(tags) {
    return tags.map((t) => `<span class="tag-pill">${t}</span>`).join("");
  }

  function promptHTML() {
    return `<span class="p-user">${USER}</span><span class="p-at">@</span><span class="p-host">${HOST}</span><span class="p-sep">:</span><span class="p-dir">~</span><span class="p-dollar">$</span>`;
  }

  // ── Commands ───────────────────────────────────────────────
  const COMMANDS = {};

  COMMANDS.help = function () {
    const b = createBlock();
    addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron">❯</span> ${promptHTML()} help</span>`);
    addToBlock(b, '<hr class="term-divider">');
    addToBlock(b, '&nbsp;');

    const sections = [
      {
        name: "Navigation",
        cmds: [
          ["help",  "Show this cheatsheet"],
          ["clear", "Clear the terminal"],
          ["exit",  "Return to homepage"],
        ],
      },
      {
        name: "Profile",
        cmds: [
          ["whoami",   "Display profile info"],
          ["neofetch", "System-style overview"],
          ["contact",  "Show contact info"],
        ],
      },
      {
        name: "Portfolio",
        cmds: [
          ["projects",     "List all projects"],
          ["skills",       "Show skill categories"],
          ["experience",   "Work experience timeline"],
          ["certificates", "List certifications"],
        ],
      },
      {
        name: "Utilities",
        cmds: [
          ["date",        "Print current date/time"],
          ["echo <text>", "Echo text back"],
          ["history",     "Show command history"],
          ["matrix <opt>","Start/Stop matrix effect"],
          ["reload",      "Refresh the terminal"],
        ],
      },
    ];

    sections.forEach((sec, idx) => {
      addToBlock(b, `<span class="c-purple" style="font-weight:600">${sec.name}</span>`);
      sec.cmds.forEach(([cmd, desc]) => {
        const pad = ' '.repeat(Math.max(0, 16 - cmd.length));
        addToBlock(b, `  <span class="c-blue">${esc(cmd)}</span>${pad} <span class="c-muted">${desc}</span>`);
      });
      if (idx < sections.length - 1) addToBlock(b, '&nbsp;');
    });
    addToBlock(b, '&nbsp;');
    if (window.innerWidth < 600) {
      addToBlock(b, '<span class="c-muted">  Type cmd & press Enter</span>');
    } else {
      addToBlock(b, '<span class="c-muted">  ↑↓ history  ·  Tab autocomplete  ·  Ctrl+L clear</span>');
    }
  };

  COMMANDS.whoami = function () {
    const b = createBlock();
    addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron">❯</span> ${promptHTML()} whoami</span>`);
    addToBlock(b, '<hr class="term-divider">');
    addToBlock(b, "&nbsp;");
    addToBlock(b, `  <span class="c-purple glow-text" style="font-size:15px;font-weight:700">${DATA.name}</span>`);
    addToBlock(b, `  <span class="c-blue">${DATA.title}</span>`);
    addToBlock(b, "&nbsp;");
    addToBlock(b, `  <span class="c-muted">📍</span> <span class="c-white">${DATA.location}</span> · <span class="c-muted">${DATA.university}</span>`);
    addToBlock(b, "&nbsp;");
    addToBlock(b, '  <span class="c-white">CS Graduate specializing in DevOps, Cloud infrastructure,</span>');
    addToBlock(b, '  <span class="c-white">and Mobile Development. Experienced in AWS, IaC, CI/CD,</span>');
    addToBlock(b, '  <span class="c-white">and building scalable solutions through automation.</span>');
    addToBlock(b, "&nbsp;");
  };

  COMMANDS.projects = function () {
    const b = createBlock();
    addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron">❯</span> ${promptHTML()} projects</span>`);
    addToBlock(b, '<hr class="term-divider">');
    addToBlock(b, '<span class="c-purple glow-text">🚀 Projects</span>');
    addToBlock(b, "&nbsp;");

    DATA.projects.forEach((p) => {
      const status = p.live
        ? '<span class="status-live">LIVE</span>'
        : '<span class="c-muted" style="font-size:11px">[Completed]</span>';
      addToBlock(b, `  <span class="c-orange" style="font-weight:600">▸ ${p.name}</span>  ${status}`);
      addToBlock(b, `    <span class="c-muted">${p.desc}</span>`);
      addToBlock(b, `    ${makeTags(p.tags)}`);
      addToBlock(b, `    <span class="c-muted" style="font-size:11px">${p.date}</span>`);
      addToBlock(b, "&nbsp;");
    });
  };

  COMMANDS.skills = function () {
    const b = createBlock();
    addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron">❯</span> ${promptHTML()} skills</span>`);
    addToBlock(b, '<hr class="term-divider">');
    addToBlock(b, '<span class="c-purple glow-text">⚡ Skills</span>');
    addToBlock(b, "&nbsp;");

    const colors = ["c-purple", "c-blue", "c-pink", "c-orange", "c-green", "c-cyan", "c-yellow", "c-red"];
    let ci = 0;
    Object.entries(DATA.skills).forEach(([cat, items]) => {
      const color = colors[ci++ % colors.length];
      addToBlock(b, `  <span class="${color}" style="font-weight:600">▸ ${cat}</span>`);
      addToBlock(b, `    ${makeTags(items)}`);
      addToBlock(b, "&nbsp;");
    });
  };

  COMMANDS.experience = function () {
    const b = createBlock();
    addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron">❯</span> ${promptHTML()} experience</span>`);
    addToBlock(b, '<hr class="term-divider">');
    addToBlock(b, '<span class="c-purple glow-text">💼 Experience</span>');
    addToBlock(b, "&nbsp;");

    DATA.experience.forEach((e) => {
      addToBlock(b, `  <span class="c-green" style="font-weight:600">▸ ${e.role}</span> <span class="c-muted">@</span> <span class="c-purple">${e.company}</span>`);
      addToBlock(b, `    <span class="c-muted">${e.period}</span>`);
      addToBlock(b, `    <span class="c-white">${e.desc}</span>`);
      addToBlock(b, `    ${makeTags(e.tags)}`);
      addToBlock(b, "&nbsp;");
    });
  };

  COMMANDS.certificates = function () {
    const b = createBlock();
    addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron">❯</span> ${promptHTML()} certificates</span>`);
    addToBlock(b, '<hr class="term-divider">');
    addToBlock(b, '<span class="c-purple glow-text">🏆 Certificates</span>');
    addToBlock(b, "&nbsp;");

    DATA.certificates.forEach((c) => {
      addToBlock(b, `  ${c.icon} <span class="c-white" style="font-weight:500">${c.name}</span>`);
      addToBlock(b, `     <span class="c-muted">${c.issuer}</span>`);
    });
    addToBlock(b, "&nbsp;");
  };

  COMMANDS.contact = function () {
    const b = createBlock();
    addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron">❯</span> ${promptHTML()} contact</span>`);
    addToBlock(b, '<hr class="term-divider">');
    addToBlock(b, '<span class="c-purple glow-text">📬 Contact</span>');
    addToBlock(b, "&nbsp;");
    addToBlock(b, `  <span class="c-muted">Email</span>     <span class="c-white">${DATA.email}</span>`);
    addToBlock(b, `  <span class="c-muted">GitHub</span>    <span class="c-blue">${DATA.github}</span>`);
    addToBlock(b, `  <span class="c-muted">LinkedIn</span>  <span class="c-purple">${DATA.linkedin}</span>`);
    addToBlock(b, "&nbsp;");
  };

  COMMANDS.neofetch = function () {
    const b = createBlock();
    addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron">❯</span> ${promptHTML()} neofetch</span>`);
    addToBlock(b, '<hr class="term-divider">');
    addToBlock(b, '&nbsp;');

    const art = [
      '<span class="c-blue">  ╭────────────────────╮</span>',
      '<span class="c-blue">  │</span>  <span class="c-purple">██╗  ██╗███████╗</span>  <span class="c-blue">│</span>',
      '<span class="c-blue">  │</span>  <span class="c-purple">██║ ██╔╝██╔════╝</span>  <span class="c-blue">│</span>',
      '<span class="c-blue">  │</span>  <span class="c-purple">█████╔╝ █████╗  </span>  <span class="c-blue">│</span>',
      '<span class="c-blue">  │</span>  <span class="c-blue">██╔═██╗ ██╔══╝  </span>  <span class="c-blue">│</span>',
      '<span class="c-blue">  │</span>  <span class="c-blue">██║  ██╗███████╗</span>  <span class="c-blue">│</span>',
      '<span class="c-blue">  │</span>  <span class="c-muted">╚═╝  ╚═╝╚══════╝</span>  <span class="c-blue">│</span>',
      '<span class="c-blue">  ╰────────────────────╯</span>',
      '<span class="c-muted">          │    │</span>',
      '<span class="c-muted">       ───┴────┴───</span>',
    ];

    const colors = ['#7c3aed', '#8b5cf6', '#a855f7', '#6366f1', '#3b82f6', '#2563eb', '#1d4ed8', '#06b6d4'];
    let bar = '';
    colors.forEach((c) => {
      bar += `<span style="background:${c};color:${c};">███</span>`;
    });

    const info = [
      `<span class="c-purple" style="font-weight:600">${USER}</span><span class="c-muted">@</span><span class="c-blue" style="font-weight:600">${HOST}</span>`,
      '<span class="c-muted">──────────────────────</span>',
      `<span class="c-purple">OS</span>         <span class="c-white">DevOps & Mobile Dev</span>`,
      `<span class="c-purple">Host</span>       <span class="c-white">${DATA.location}</span>`,
      `<span class="c-purple">Kernel</span>     <span class="c-white">CS @ ${DATA.university}</span>`,
      `<span class="c-blue">Shell</span>      <span class="c-white">portfolio-term v2.0</span>`,
      `<span class="c-blue">Uptime</span>     <span class="c-white">Since 2023</span>`,
      bar,
    ];

    const isMobile = window.innerWidth <= 850;
    
    if (isMobile) {
      addToBlock(b, '<div class="ascii-art">');
      art.forEach((line) => addToBlock(b, line));
      addToBlock(b, '</div>');
      addToBlock(b, '<br>');
      info.forEach((line) => addToBlock(b, line));
    } else {
      const maxLines = Math.max(art.length, info.length);
      for (let i = 0; i < maxLines; i++) {
        const left = art[i] || '                                    ';
        const right = info[i] || '';
        addToBlock(b, `${left}   ${right}`);
      }
    }


    addToBlock(b, '&nbsp;');
  };

  COMMANDS.echo = function (args) {
    const b = createBlock();
    addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron">❯</span> ${promptHTML()} echo ${esc(args.join(" "))}</span>`);
    addToBlock(b, '<hr class="term-divider">');
    addToBlock(b, esc(args.join(" ")));
  };

  COMMANDS.history = function () {
    const b = createBlock();
    addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron">❯</span> ${promptHTML()} history</span>`);
    addToBlock(b, '<hr class="term-divider">');
    if (cmdHistory.length === 0) {
      addToBlock(b, '<span class="c-muted">No commands in history yet.</span>');
      return;
    }
    cmdHistory.forEach((cmd, i) => {
      addToBlock(b, `  <span class="c-muted">${(i + 1).toString().padStart(3)}</span>  ${esc(cmd)}`);
    });
  };

  COMMANDS.date = function () {
    const b = createBlock();
    addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron">❯</span> ${promptHTML()} date</span>`);
    addToBlock(b, '<hr class="term-divider">');
    addToBlock(b, `<span class="c-white">${new Date().toString()}</span>`);
  };

  COMMANDS.clear = function () {
    output.innerHTML = "";
  };

  COMMANDS.exit = function () {
    const b = createBlock();
    addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron">❯</span> ${promptHTML()} exit</span>`);
    addToBlock(b, '<hr class="term-divider">');
    addToBlock(b, '<span class="c-muted">Goodbye! Redirecting...</span>');
    setTimeout(() => {
      let homeUrl = "../index.html";
      try {
        if (localStorage.getItem("lang") === "ar") homeUrl = "../ar/index.html";
      } catch (e) {}
      window.location.href = homeUrl;
    }, 800);
  };

  COMMANDS.reload = function () {
    const b = createBlock();
    addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron">❯</span> ${promptHTML()} reload</span>`);
    addToBlock(b, '<hr class="term-divider">');
    addToBlock(b, '<span class="c-muted">Reloading...</span>');
    setTimeout(() => location.reload(), 500);
  };

  COMMANDS.matrix = function (args) {
    const b = createBlock();
    addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron">❯</span> ${promptHTML()} matrix ${esc(args.join(" "))}</span>`);
    addToBlock(b, '<hr class="term-divider">');
    
    const sub = args[0] ? args[0].toLowerCase() : "";
    const toggleBtn = document.getElementById("matrix-toggle");
    const clickEvent = new Event("click");

    if (sub === "stop" || sub === "off") {
      if (toggleBtn.classList.contains("active")) {
        toggleBtn.dispatchEvent(clickEvent); // Trigger existing toggle logic
        addToBlock(b, '<span class="c-muted">Matrix rain stopped.</span>');
      } else {
        addToBlock(b, '<span class="c-muted">Matrix rain is already off.</span>');
      }
    } else if (sub === "start" || sub === "on") {
      if (!toggleBtn.classList.contains("active")) {
        toggleBtn.dispatchEvent(clickEvent);
        addToBlock(b, '<span class="c-muted">Matrix rain started.</span>');
      } else {
        addToBlock(b, '<span class="c-muted">Matrix rain is already on.</span>');
      }
    } else {
       // Toggle if no arg
       toggleBtn.dispatchEvent(clickEvent);
       const state = toggleBtn.classList.contains("active") ? "started" : "stopped";
       addToBlock(b, `<span class="c-muted">Matrix rain ${state}.</span>`);
    }
  };

  // ── Execute ────────────────────────────────────────────────
  function exec(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    cmdHistory.push(trimmed);
    histIdx = cmdHistory.length;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (COMMANDS[cmd]) {
      COMMANDS[cmd](args);
    } else {
      const b = createBlock();
      b.style.borderLeftColor = "var(--neon-red)";
      addToBlock(b, `<span class="cmd-header"><span class="cmd-chevron" style="color:var(--neon-red)">✗</span> ${promptHTML()} ${esc(trimmed)}</span>`);
      addToBlock(b, '<hr class="term-divider">');
      addToBlock(b, `<span class="c-red">command not found: ${esc(cmd)}</span>`);
      addToBlock(b, '<span class="c-muted">Type <span class="c-cyan">help</span> to see available commands.</span>');
    }
  }

  // ── Input handling ─────────────────────────────────────────
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      exec(input.value);
      input.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx > 0) {
        histIdx--;
        input.value = cmdHistory[histIdx];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx < cmdHistory.length - 1) {
        histIdx++;
        input.value = cmdHistory[histIdx];
      } else {
        histIdx = cmdHistory.length;
        input.value = "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.value.trim().toLowerCase();
      if (partial) {
        const match = Object.keys(COMMANDS).find((c) => c.startsWith(partial));
        if (match) input.value = match;
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      COMMANDS.clear();
    }
  });

  document.addEventListener("click", () => input.focus());

  // ── Mobile Keyboard Fix ────────────────────────────────────
  function scrollToInput() {
    // Delay to allow keyboard to pop up
    setTimeout(() => {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  }

  input.addEventListener("focus", scrollToInput);
  window.addEventListener("resize", () => {
    if (document.activeElement === input) scrollToInput();
  });

  // ── Boot Sequence ──────────────────────────────────────────
  function boot() {
    let d = 0;

    const ascii = [
      '<span class="c-purple">█ █ █ █▀█ █▀█ █   █▀█ █▀▀</span>   <span class="c-blue">█▀▄▀█ █▀▀ ▀█▀ █▀█ █ █</span>',
      '<span class="c-purple">█▀▄ █ █▀▄ █ █ █   █ █ ▀▀█</span>   <span class="c-blue">█ █ █ █▀▀  █  █▀▄  █ </span>',
      '<span class="c-purple">█ █ █ █ █ █▄█ █▄▄ █▄█ ▄▄█</span>   <span class="c-blue">█   █ █▄▄  █  █ █  █ </span>',
      '&nbsp;',
      '<span class="c-muted">── </span><span class="c-blue">Portfolio Terminal v2.0</span><span class="c-muted"> ──</span>',
    ];

    // ASCII art name
    ascii.forEach((line) => {
      setTimeout(() => print(`<div class="ascii-art">${line}</div>`), d);
      d += 50;
    });

    // Loading bar
    setTimeout(() => {
      print('&nbsp;');
      print('<span class="c-muted">  Initializing system...</span>');
      print('  <span class="boot-bar"><span class="boot-bar-fill"></span></span>');
    }, d);
    d += 1600;

    // System info
    setTimeout(() => {
      print('&nbsp;');
      print(`  <span class="c-cyan">✓</span> <span class="c-muted">System ready</span>  ·  <span class="c-purple">${USER}@${HOST}</span>  ·  <span class="c-muted">v2.0</span>`);
      print('&nbsp;');
      print('  <span class="c-muted">Type</span> <span class="c-blue">help</span> <span class="c-muted">to see available commands</span>');
      print('&nbsp;');
      input.focus();
    }, d);
  }

  boot();
})();
