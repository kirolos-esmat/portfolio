/**
 * Interactive 3D Physics Lanyard Name Tag
 * - Compact proportions matching a real conference badge
 * - Verlet rope physics with Catmull-Rom ribbon strap
 * - Correct logo orientation (never reversed)
 * - Muted dark titanium lighting (no glare)
 * - Smooth interpolated rendering + fixed-step physics
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') return;
  if (document.body.classList.contains('page-sub')) return;

  const isAr = document.documentElement.lang === 'ar';
  const basePath = isAr ? '../' : '';
  const photoUrl = basePath + 'images/photo.png';
  const logoUrl = basePath + 'images/logo-transparent.png';

  let canvas = document.getElementById('badge-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'badge-canvas';
    document.body.appendChild(canvas);
  }

  /* ── THREE.JS SCENE ── */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    32,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0, 12);

  // Balanced dark studio lighting — toned down to prevent washout and glare
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.50);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 0.25);
  mainLight.position.set(2, 5, 4);
  scene.add(mainLight);

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.06);
  rimLight.position.set(-3, -2, 2);
  scene.add(rimLight);

  /* ── HELPERS ── */
  function screenToWorld(sx, sy, tz) {
    tz = tz || 0;
    const ndcX = (sx / window.innerWidth) * 2 - 1;
    const ndcY = -(sy / window.innerHeight) * 2 + 1;
    const v = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera);
    const dir = v.sub(camera.position).normalize();
    const d = (tz - camera.position.z) / dir.z;
    return camera.position.clone().add(dir.multiplyScalar(d));
  }

  /* ── DYNAMIC RESPONSIVE PHYSICS CONFIG ── */
  function getPhysicsConfig() {
    const w = window.innerWidth;
    if (w < 480) {
      // Mobile phone: badge hangs safely in top corner, completely clear of title & bio
      return {
        segLen: 0.048,
        badgeOffset: 0.16,
        baseScale: 0.50,
        anchorX: isAr ? w - 42 : 42,
        anchorY: 8,
        zInspect: 6.4,
        inspectY: 0.07,
        inspScale: 1.16
      };
    } else if (w < 768) {
      // Tablet / small screen
      return {
        segLen: 0.09,
        badgeOffset: 0.32,
        baseScale: 0.70,
        anchorX: isAr ? w - 60 : 60,
        anchorY: -14,
        zInspect: 6.8,
        inspectY: 0.08,
        inspScale: 1.15
      };
    }
    // Desktop: generous strap hanging beside container
    return {
      segLen: 0.22,
      badgeOffset: 0.722,
      baseScale: 1.0,
      anchorX: isAr ? w - 145 : 145,
      anchorY: -20,
      zInspect: 8.1,
      inspectY: 0,
      inspScale: 1.10
    };
  }

  function getAnchorScreenPos() {
    const cfg = getPhysicsConfig();
    return { x: cfg.anchorX, y: cfg.anchorY };
  }

  /* ── TEXTURE: FRONT CARD ── */
  function createFrontTex(photoImg) {
    const w = 1280, h = 2048;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const g = c.getContext('2d');
    g.imageSmoothingEnabled = true;
    g.imageSmoothingQuality = 'high';

    // 1. Deep solid matte obsidian carbon chassis (zero bright glare)
    g.fillStyle = '#04060a';
    g.fillRect(0, 0, w, h);

    // Subtle dark corner vignette
    g.fillStyle = 'rgba(0, 0, 0, 0.35)';
    g.fillRect(0, 0, w, h);

    // Outer card edge precision border (Sleek satin titanium, zero cyan neon glow)
    g.save();
    const borderGrad = g.createLinearGradient(0, 0, w, h);
    borderGrad.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
    borderGrad.addColorStop(0.3, 'rgba(148, 163, 184, 0.12)');
    borderGrad.addColorStop(0.7, 'rgba(148, 163, 184, 0.10)');
    borderGrad.addColorStop(1, 'rgba(255, 255, 255, 0.18)');
    g.strokeStyle = borderGrad;
    g.lineWidth = 4;
    g.beginPath();
    g.roundRect(20, 20, w - 40, h - 40, 52);
    g.stroke();

    // Inner hairline accent
    g.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    g.lineWidth = 1.5;
    g.beginPath();
    g.roundRect(32, 32, w - 64, h - 64, 42);
    g.stroke();
    g.restore();

    // Top lanyard slot hole with metallic bevel
    g.save();
    g.fillStyle = '#010204';
    g.beginPath();
    g.roundRect(w / 2 - 95, 42, 190, 40, 20);
    g.fill();
    g.strokeStyle = 'rgba(255, 255, 255, 0.20)';
    g.lineWidth = 3;
    g.stroke();
    g.restore();

    // 2. Header: Centered Pill Tag (Generous spacing from slot hole and photo)
    g.save();
    g.textAlign = 'center';
    const tagW = 420, tagH = 50, tagX = (w - tagW) / 2, tagY = 120;
    g.fillStyle = 'rgba(15, 23, 42, 0.90)';
    g.beginPath();
    g.roundRect(tagX, tagY, tagW, tagH, 16);
    g.fill();
    g.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    g.lineWidth = 2;
    g.stroke();

    // Active status dot (crisp emerald pip, no bright halo glow)
    g.fillStyle = '#10b981';
    g.beginPath();
    g.arc(tagX + 30, tagY + 25, 6, 0, Math.PI * 2);
    g.fill();

    g.fillStyle = '#94a3b8';
    g.font = '800 21px "SF Mono", monospace';
    g.fillText('DEV // CLOUD · VERIFIED PASS', w / 2 + 10, tagY + 32);
    g.restore();

    // 3. Centerpiece: High-Resolution Circular Portrait (Pure, crystal-clear, zero haze or glow)
    const cx = w / 2;
    const cy = 445;
    const cr = 225; // 450px diameter: prominent, crisp, shows full photo details

    g.save();
    // Dark backplate
    g.fillStyle = '#020305';
    g.beginPath();
    g.arc(cx, cy, cr + 4, 0, Math.PI * 2);
    g.fill();

    // Clean crisp titanium bezel ring (Solid, razor-sharp hairline, zero glow)
    g.strokeStyle = 'rgba(255, 255, 255, 0.20)';
    g.lineWidth = 3;
    g.beginPath();
    g.arc(cx, cy, cr + 1.5, 0, Math.PI * 2);
    g.stroke();

    // Circular portrait clipping
    g.beginPath();
    g.arc(cx, cy, cr, 0, Math.PI * 2);
    g.clip();

    if (photoImg && photoImg.complete && photoImg.naturalWidth > 0) {
      g.filter = 'contrast(1.08) brightness(1.02) saturate(1.04)';
      g.drawImage(photoImg, cx - cr, cy - cr, cr * 2, cr * 2);
      g.filter = 'none';
    } else {
      g.fillStyle = '#0f172a';
      g.fillRect(cx - cr, cy - cr, cr * 2, cr * 2);
    }
    g.restore();

    // 4. Name & Title (Bold, High-Contrast, Legible, with clean spacing)
    g.save();
    g.textAlign = 'center';

    // Full Name
    g.fillStyle = '#ffffff';
    g.font = '900 84px "Inter", -apple-system, sans-serif';
    g.letterSpacing = '-0.5px';
    g.fillText('KIROLOS ESMAT', cx, 755);

    // Primary Role
    g.fillStyle = '#38bdf8';
    g.font = '800 36px "Inter", sans-serif';
    g.fillText('DevOps & Cloud Engineer', cx, 820);

    // University / Location (Alexandria, Egypt)
    g.fillStyle = '#94a3b8';
    g.font = '700 22px "SF Mono", monospace';
    g.letterSpacing = '2px';
    g.fillText('AASTMT COMPUTER SCIENCE · ALEXANDRIA, EG', cx, 874);

    // Sleek hairline divider
    g.strokeStyle = 'rgba(255, 255, 255, 0.10)';
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(110, 922);
    g.lineTo(w - 110, 922);
    g.stroke();
    g.restore();

    // 5. Tech Stack Badges (2 prominent, high-contrast rows, balanced margins)
    const drawPillRow = (items, yCenter) => {
      g.save();
      g.font = '800 22px "SF Mono", monospace';
      const gap = 16;
      const padd = 24;
      const hPill = 52;
      const rPill = 12;

      const widths = items.map(t => g.measureText(t).width + padd * 2);
      const totalW = widths.reduce((a, b) => a + b, 0) + (items.length - 1) * gap;
      let startX = (w - totalW) / 2;

      items.forEach((txt, idx) => {
        const pw = widths[idx];
        const py = yCenter - hPill / 2;

        g.fillStyle = 'rgba(15, 23, 42, 0.95)';
        g.beginPath();
        g.roundRect(startX, py, pw, hPill, rPill);
        g.fill();

        g.strokeStyle = 'rgba(255, 255, 255, 0.14)';
        g.lineWidth = 1.5;
        g.stroke();

        g.fillStyle = '#e2e8f0';
        g.textAlign = 'center';
        g.fillText(txt, startX + pw / 2, yCenter + 7.5);

        startX += pw + gap;
      });
      g.restore();
    };

    drawPillRow(['AWS', 'DOCKER', 'KUBERNETES', 'TERRAFORM'], 980);
    drawPillRow(['CI/CD', 'PYTHON', 'FLUTTER', 'LINUX'], 1052);

    // Capabilities tag
    g.save();
    g.textAlign = 'center';
    g.fillStyle = '#64748b';
    g.font = '700 18px "SF Mono", monospace';
    g.letterSpacing = '1.8px';
    g.fillText('INFRASTRUCTURE AS CODE · CLOUD ARCHITECTURE · AUTOMATION', cx, 1125);

    // Hairline divider
    g.strokeStyle = 'rgba(255, 255, 255, 0.10)';
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(110, 1170);
    g.lineTo(w - 110, 1170);
    g.stroke();
    g.restore();

    // 6. Security Credential / Smart Chip Section
    g.save();
    g.textAlign = 'center';

    // Centered Security Chip (Matte satin bronze/gold, no blinding white glare)
    const chipW = 180, chipH = 110;
    const chipX = (w - chipW) / 2, chipY = 1210;
    const chipGrad = g.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
    chipGrad.addColorStop(0, '#78350f');
    chipGrad.addColorStop(0.3, '#b45309');
    chipGrad.addColorStop(0.6, '#d97706');
    chipGrad.addColorStop(1, '#92400e');
    g.fillStyle = chipGrad;
    g.beginPath();
    g.roundRect(chipX, chipY, chipW, chipH, 14);
    g.fill();

    // Chip contact etching
    g.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    g.lineWidth = 2.5;
    g.beginPath();
    g.roundRect(chipX + 20, chipY + 16, chipW - 40, chipH - 32, 9);
    g.moveTo(chipX + chipW / 2, chipY + 16);
    g.lineTo(chipX + chipW / 2, chipY + chipH - 16);
    g.moveTo(chipX + 20, chipY + chipH / 2);
    g.lineTo(chipX + chipW - 20, chipY + chipH / 2);
    g.stroke();

    // Chip clearance label
    g.fillStyle = '#94a3b8';
    g.font = '700 20px "SF Mono", monospace';
    g.letterSpacing = '1.2px';
    g.fillText('SECURITY AUTHENTICATOR // CLEARANCE: LVL-4', cx, 1362);

    // Hairline divider
    g.strokeStyle = 'rgba(255, 255, 255, 0.10)';
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(110, 1405);
    g.lineTo(w - 110, 1405);
    g.stroke();

    // Centered Barcode
    const barPattern = [
      4, 2, 6, 2, 7, 3, 2, 5, 2, 4, 7, 2, 3, 5, 2, 6, 3, 2, 8, 2, 4, 6, 2, 3, 5, 2, 7, 3, 2, 5,
      4, 2, 6, 3, 2, 7, 2, 4, 6, 2, 3, 5, 2, 8, 2, 4, 6, 2, 3, 5, 2, 7, 3, 2, 5, 2, 6, 3, 2, 4,
      5, 2, 7, 3, 2, 6, 2, 4, 8, 2, 3, 5, 2, 6, 3, 2, 7, 2, 4, 5, 3, 6, 2, 5, 3, 7, 2, 4, 6, 2
    ];
    const barGap = 5;
    const totalBarWidth = barPattern.reduce((acc, bw) => acc + bw, 0) + (barPattern.length - 1) * barGap;
    let currBx = (w - totalBarWidth) / 2;
    const barY = 1445;
    const barH = 95;
    g.fillStyle = '#cbd5e1';
    barPattern.forEach(bw => {
      g.fillRect(currBx, barY, bw, barH);
      currBx += bw + barGap;
    });

    // Centered Barcode serial label
    g.fillStyle = '#94a3b8';
    g.font = '800 24px "SF Mono", monospace';
    g.letterSpacing = '1.5px';
    g.fillText('SERIAL: KE-2026-ENG-84021 // AASTMT-CS', cx, 1585);

    // Hairline divider
    g.strokeStyle = 'rgba(255, 255, 255, 0.10)';
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(110, 1630);
    g.lineTo(w - 110, 1630);
    g.stroke();

    // 7. Bottom Contactless & Verification Details
    g.fillStyle = '#38bdf8';
    g.font = '800 24px "SF Mono", monospace';
    g.fillText('((( · )))  ENCRYPTED CONTACTLESS CREDENTIAL', cx, 1700);

    g.fillStyle = '#10b981';
    g.font = '700 22px "SF Mono", monospace';
    g.fillText('● STATUS: ACTIVE & VERIFIED · VALID THRU 2028', cx, 1770);

    g.fillStyle = '#64748b';
    g.font = '600 18px "SF Mono", monospace';
    g.fillText('OFFICIAL PORTFOLIO CREDENTIAL · GRAB & MOVE WITH POINTER', cx, 1845);
    g.restore();

    return new THREE.CanvasTexture(c);
  }

  /* ── TEXTURE: BACK CARD ── */
  function createBackTex(logoImg) {
    const w = 1280, h = 2048;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const g = c.getContext('2d');
    g.imageSmoothingEnabled = true;
    g.imageSmoothingQuality = 'high';

    // Deep luxury matte dark finish (no bright glare)
    g.fillStyle = '#04060a';
    g.fillRect(0, 0, w, h);

    // Outer border (Satin titanium)
    g.save();
    g.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    g.lineWidth = 4;
    g.beginPath();
    g.roundRect(20, 20, w - 40, h - 40, 52);
    g.stroke();
    g.restore();

    // Top slot hole
    g.save();
    g.fillStyle = '#010204';
    g.beginPath();
    g.roundRect(w / 2 - 95, 42, 190, 40, 20);
    g.fill();
    g.strokeStyle = 'rgba(255, 255, 255, 0.20)';
    g.lineWidth = 3;
    g.stroke();
    g.restore();

    // Magnetic stripe
    g.fillStyle = '#010204';
    g.fillRect(0, 130, w, 160);
    g.fillStyle = 'rgba(255, 255, 255, 0.12)';
    g.fillRect(0, 130, w, 2);
    g.fillRect(0, 288, w, 2);

    // NFC Wireless wave icon
    g.save();
    g.textAlign = 'center';
    g.fillStyle = '#38bdf8';
    g.font = '800 30px "SF Mono", monospace';
    g.fillText('((( · )))  CONTACTLESS CREDENTIAL', w / 2, 380);
    g.restore();

    // Central Logo Box
    const lw = 520, lh = 280, lx = (w - lw) / 2, ly = 440;
    g.save();
    g.fillStyle = 'rgba(255, 255, 255, 0.03)';
    g.beginPath();
    g.roundRect(lx, ly, lw, lh, 28);
    g.fill();
    g.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    g.lineWidth = 2;
    g.stroke();

    if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
      const dw = 380, dh = 190;
      g.drawImage(logoImg, (w - dw) / 2, ly + (lh - dh) / 2, dw, dh);
    }
    g.restore();

    // Text details
    g.save();
    g.textAlign = 'center';

    g.fillStyle = '#ffffff';
    g.font = '900 64px "Inter", sans-serif';
    g.fillText('KIROLOS ESMAT', w / 2, 800);

    g.fillStyle = '#38bdf8';
    g.font = '800 28px "SF Mono", monospace';
    g.fillText('DEVOPS & CLOUD ARCHITECTURE', w / 2, 860);

    g.fillStyle = '#94a3b8';
    g.font = '500 24px "Inter", sans-serif';
    g.fillText('Scan to connect or explore projects online', w / 2, 920);

    // QR Code
    const qx = w / 2 - 140, qy = 980;
    const qw = 280;
    g.fillStyle = '#ffffff';
    g.beginPath();
    g.roundRect(qx, qy, qw, qw, 24);
    g.fill();

    g.fillStyle = '#05070d';
    function drawQrMarker(mx, my) {
      g.fillRect(mx, my, 66, 66);
      g.fillStyle = '#ffffff';
      g.fillRect(mx + 11, my + 11, 44, 44);
      g.fillStyle = '#05070d';
      g.fillRect(mx + 21, my + 21, 24, 24);
    }
    drawQrMarker(qx + 22, qy + 22);
    drawQrMarker(qx + qw - 88, qy + 22);
    drawQrMarker(qx + 22, qy + qw - 88);

    for (let r = 0; r < 8; r++) {
      for (let col = 0; col < 8; col++) {
        if ((r * 8 + col * 13) % 3 === 0) {
          g.fillRect(qx + 104 + col * 9, qy + 104 + r * 9, 7, 7);
        }
      }
    }

    g.fillStyle = '#38bdf8';
    g.font = '700 26px "SF Mono", monospace';
    g.fillText('github.com/kirolos-esmat', w / 2, 1350);

    g.fillStyle = '#64748b';
    g.font = '600 20px "SF Mono", monospace';
    g.fillText('ALEXANDRIA, EG · ALL RIGHTS RESERVED © 2026', w / 2, 1410);
    g.restore();

    return new THREE.CanvasTexture(c);
  }

  /* ── TEXTURE: STRAP ── */
  function createStrapTex(logoImg) {
    const w = 256, h = 1024;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const g = c.getContext('2d');

    // Deep woven matte ribbon
    g.fillStyle = '#0a0c12';
    g.fillRect(0, 0, w, h);

    // Fine woven texture
    g.fillStyle = 'rgba(255, 255, 255, 0.025)';
    for (let y = 0; y < h; y += 3) g.fillRect(0, y, w, 1.5);

    // Dual edge stitching
    g.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    g.lineWidth = 2;
    g.setLineDash([6, 5]);
    g.beginPath();
    g.moveTo(12, 0); g.lineTo(12, h);
    g.moveTo(w - 12, 0); g.lineTo(w - 12, h);
    g.stroke();
    g.setLineDash([]);

    // Logo repeats along strap — exactly 4 logos evenly spaced at 256px intervals
    // This guarantees 100% seamless, identical spacing when the texture wraps!
    const numLogos = 4;
    const slotH = h / numLogos; // exactly 256px
    const lw = 150, lh = 75;

    for (let i = 0; i < numLogos; i++) {
      const slotCenterY = i * slotH + slotH / 2;
      const ly = slotCenterY - lh / 2;
      const lx = (w - lw) / 2;

      if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
        g.save();
        g.globalAlpha = 0.82;
        g.drawImage(logoImg, lx, ly, lw, lh);
        g.restore();
      } else {
        g.fillStyle = 'rgba(56, 189, 248, 0.7)';
        g.font = '800 32px "Inter", sans-serif';
        g.textAlign = 'center';
        g.fillText('KE', w / 2, slotCenterY + 10);
      }
    }

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  /* ── 3D BADGE GEOMETRY ── */
  // Smaller card: ~0.85 x 1.36 world units (was 1.15 x 1.84)
  const CARD_W = 0.85;
  const CARD_H = 1.36;
  const CARD_D = 0.022;
  const R = 0.06;

  // Helper to create a card face geometry that matches the exact rounded card perimeter (no sharp corners!)
  function createCardFaceGeometry(shape, width, height) {
    const geom = new THREE.ShapeGeometry(shape, 24);
    const pos = geom.attributes.position;
    const count = pos.count;
    const uvs = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      uvs[i * 2] = (pos.getX(i) + width / 2) / width;
      uvs[i * 2 + 1] = (pos.getY(i) + height / 2) / height;
    }
    geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geom.computeVertexNormals();
    return geom;
  }

  function buildBadge(frontTex, backTex) {
    const grp = new THREE.Group();

    // Rounded rect chassis shape
    const s = new THREE.Shape();
    s.moveTo(-CARD_W / 2 + R, -CARD_H / 2);
    s.lineTo(CARD_W / 2 - R, -CARD_H / 2);
    s.quadraticCurveTo(CARD_W / 2, -CARD_H / 2, CARD_W / 2, -CARD_H / 2 + R);
    s.lineTo(CARD_W / 2, CARD_H / 2 - R);
    s.quadraticCurveTo(CARD_W / 2, CARD_H / 2, CARD_W / 2 - R, CARD_H / 2);
    s.lineTo(-CARD_W / 2 + R, CARD_H / 2);
    s.quadraticCurveTo(-CARD_W / 2, CARD_H / 2, -CARD_W / 2, CARD_H / 2 - R);
    s.lineTo(-CARD_W / 2, -CARD_H / 2 + R);
    s.quadraticCurveTo(-CARD_W / 2, -CARD_H / 2, -CARD_W / 2 + R, -CARD_H / 2);

    const geom = new THREE.ExtrudeGeometry(s, {
      depth: CARD_D,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.006,
      bevelThickness: 0.006,
    });
    geom.center();

    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0x121620, roughness: 0.6, metalness: 0.1,
    });
    grp.add(new THREE.Mesh(geom, edgeMat));

    // Front face — uses exact matching rounded ShapeGeometry (MeshBasicMaterial preserves 100% text contrast & true black depth)
    const faceGeom = createCardFaceGeometry(s, CARD_W, CARD_H);
    const frontMat = new THREE.MeshBasicMaterial({
      map: frontTex,
    });
    const front = new THREE.Mesh(faceGeom, frontMat);
    front.position.z = CARD_D / 2 + 0.007;
    grp.add(front);

    // Back face — identical rounded perimeter, flipped for back view
    const backMat = new THREE.MeshBasicMaterial({
      map: backTex,
    });
    const back = new THREE.Mesh(faceGeom.clone(), backMat);
    back.position.z = -CARD_D / 2 - 0.007;
    back.rotation.y = Math.PI;
    grp.add(back);

    // Premium satin chrome lanyard hardware
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0xcdd6df,
      metalness: 0.88,
      roughness: 0.26,
    });

    // 1. Metal eyelet rim reinforcing the punch slot hole
    const slotRim = new THREE.Mesh(
      new THREE.TorusGeometry(0.028, 0.0045, 10, 24),
      metalMat,
    );
    slotRim.position.set(0, CARD_H / 2 - 0.040, 0);
    grp.add(slotRim);

    // 2. Oval clip ring looping vertically through the card slot
    const clipLoop = new THREE.Mesh(
      new THREE.TorusGeometry(0.032, 0.0055, 12, 28),
      metalMat,
    );
    clipLoop.position.set(0, CARD_H / 2 - 0.014, 0);
    clipLoop.rotation.y = 0.15; // subtle realistic 3D angle
    grp.add(clipLoop);

    // 3. Swivel barrel collar above the clip loop
    const swivelBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.011, 0.011, 0.020, 16),
      metalMat,
    );
    swivelBarrel.position.set(0, CARD_H / 2 + 0.024, 0);
    grp.add(swivelBarrel);

    const swivelCollar = new THREE.Mesh(
      new THREE.TorusGeometry(0.013, 0.003, 8, 16),
      metalMat,
    );
    swivelCollar.position.set(0, CARD_H / 2 + 0.024, 0);
    swivelCollar.rotation.x = Math.PI / 2;
    grp.add(swivelCollar);

    // 4. Ribbon crimp bracket clamping the lanyard strap
    const ribbonClamp = new THREE.Mesh(
      new THREE.BoxGeometry(STRAP_W + 0.008, 0.018, 0.020),
      metalMat,
    );
    ribbonClamp.position.set(0, CARD_H / 2 + 0.042, 0);
    grp.add(ribbonClamp);

    const clampRivet = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0035, 0.0035, 0.024, 12),
      metalMat,
    );
    clampRivet.position.set(0, CARD_H / 2 + 0.042, 0);
    clampRivet.rotation.x = Math.PI / 2;
    grp.add(clampRivet);

    // Invisible hit box
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitMesh = new THREE.Mesh(
      new THREE.BoxGeometry(CARD_W + 0.25, CARD_H + 0.4, 0.5), hitMat,
    );
    grp.add(hitMesh);

    return { group: grp, hitMesh: hitMesh };
  }

  /* ── RIBBON STRAP ── */
  const STRAP_SEGS = 24;
  const STRAP_W = 0.1;
  const STRAP_V_REPEAT = 1.6; // Harmonious logo repeat along strap length

  function createRibbonGeom() {
    const g = new THREE.BufferGeometry();
    const nv = (STRAP_SEGS + 1) * 2;
    const pos = new Float32Array(nv * 3);
    const uvs = new Float32Array(nv * 2);
    const idx = [];

    for (let i = 0; i <= STRAP_SEGS; i++) {
      // Top of strap (i=0) has higher V; bottom of strap (i=STRAP_SEGS) has lower V
      // This ensures the logo is right-side up (heading up towards anchor)
      const v = (1 - i / STRAP_SEGS) * STRAP_V_REPEAT;

      // Vertex 0 (LEFT edge of ribbon): u = 0 (left of logo: "KE")
      uvs[i * 4]     = 0;
      uvs[i * 4 + 1] = v;

      // Vertex 1 (RIGHT edge of ribbon): u = 1 (right of logo: heartbeat pulse)
      uvs[i * 4 + 2] = 1;
      uvs[i * 4 + 3] = v;

      if (i < STRAP_SEGS) {
        const r1 = i * 2, r2 = (i + 1) * 2;
        // Winding order for front-facing triangles facing +Z:
        idx.push(r1, r2, r1 + 1, r1 + 1, r2, r2 + 1);
      }
    }

    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    g.setIndex(idx);
    return g;
  }

  // Up vector for ribbon perpendicular (fixed Z-forward to avoid gimbal artifacts)
  const _upVec = new THREE.Vector3(0, 0, 1);

  function updateRibbon(geom, points, clampWorldPos, clampWorldRight) {
    const curve = new THREE.CatmullRomCurve3(points);
    const pa = geom.attributes.position;
    const hw = STRAP_W * 0.5;

    for (let i = 0; i <= STRAP_SEGS; i++) {
      if (i === STRAP_SEGS && clampWorldPos && clampWorldRight) {
        // Physical hardware lock: ribbon end matches the clamp position and width vector!
        const vi = i * 6;
        pa.array[vi]     = clampWorldPos.x - clampWorldRight.x * hw;
        pa.array[vi + 1] = clampWorldPos.y - clampWorldRight.y * hw;
        pa.array[vi + 2] = clampWorldPos.z - clampWorldRight.z * hw;

        pa.array[vi + 3] = clampWorldPos.x + clampWorldRight.x * hw;
        pa.array[vi + 4] = clampWorldPos.y + clampWorldRight.y * hw;
        pa.array[vi + 5] = clampWorldPos.z + clampWorldRight.z * hw;
        continue;
      }

      const t = i / STRAP_SEGS;
      const pt = curve.getPoint(t);
      const tan = curve.getTangent(t).normalize();

      let perp = new THREE.Vector3().crossVectors(tan, _upVec).normalize();
      if (perp.lengthSq() < 0.001) {
        perp.set(-1, 0, 0);
      }
      perp.multiplyScalar(hw);

      const vi = i * 6;
      pa.array[vi]     = pt.x + perp.x;
      pa.array[vi + 1] = pt.y + perp.y;
      pa.array[vi + 2] = pt.z + perp.z;

      pa.array[vi + 3] = pt.x - perp.x;
      pa.array[vi + 4] = pt.y - perp.y;
      pa.array[vi + 5] = pt.z - perp.z;
    }

    pa.needsUpdate = true;
    geom.computeVertexNormals();
  }

  /* ── VERLET ROPE PHYSICS ── */
  const N_NODES = 7;
  const nodes = [];

  class PNode {
    constructor() {
      this.x = 0; this.y = 0; this.z = 0;
      this.px = 0; this.py = 0; this.pz = 0;
      this.pinned = false;
    }
    set(x, y, z) {
      this.x = this.px = x;
      this.y = this.py = y;
      this.z = this.pz = z;
    }
  }

  for (let i = 0; i < N_NODES; i++) nodes.push(new PNode());
  nodes[0].pinned = true;

  const SEG_LEN = 0.22;
  const BADGE_OFFSET = 0.722;
  const GRAVITY = -14.0;
  const DAMPING = 0.965;

  function initDrop(anchor) {
    nodes[0].set(anchor.x, anchor.y, anchor.z);
    // Smooth natural pendulum drop: rope starts taut at gentle ~18 deg angle
    const swingAngle = isAr ? 0.32 : -0.32;
    let cumDist = 0;
    const pcfg = getPhysicsConfig();

    for (let i = 1; i < N_NODES; i++) {
      const rest = i === N_NODES - 2 ? pcfg.badgeOffset : pcfg.segLen;
      cumDist += rest;
      const nx = anchor.x + Math.sin(swingAngle) * cumDist;
      const ny = anchor.y - Math.cos(swingAngle) * cumDist;
      const nz = 0.03 * Math.sin((i / (N_NODES - 1)) * Math.PI);
      nodes[i].set(nx, ny, nz);
    }
  }

  function stepPhysics(dt, dragging, target) {
    const dt2 = dt * dt;
    const pcfg = getPhysicsConfig();

    for (let i = 1; i < N_NODES; i++) {
      const n = nodes[i];
      if (i === N_NODES - 1 && dragging && target) {
        // Smooth drag spring
        const k = 0.35;
        const vx = (target.x - n.x) * k;
        const vy = (target.y - n.y) * k;
        const vz = (target.z - n.z) * k;
        n.px = n.x; n.py = n.y; n.pz = n.z;
        n.x += vx; n.y += vy; n.z += vz;
        continue;
      }

      const vx = (n.x - n.px) * DAMPING;
      const vy = (n.y - n.py) * DAMPING;
      const vz = (n.z - n.pz) * DAMPING;
      n.px = n.x; n.py = n.y; n.pz = n.z;
      n.x += vx;
      n.y += vy + GRAVITY * dt2;
      n.z += vz;
    }

    // Z damping — pull z gently toward 0 to keep badge in plane
    for (let i = 1; i < N_NODES; i++) {
      nodes[i].z *= 0.98;
    }

    // Constraint relaxation
    for (let iter = 0; iter < 8; iter++) {
      for (let i = 0; i < N_NODES - 1; i++) {
        const a = nodes[i], b = nodes[i + 1];
        const rest = i === N_NODES - 2 ? pcfg.badgeOffset : pcfg.segLen;
        let dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
        let dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001;
        let diff = (dist - rest) / dist;

        if (a.pinned) {
          b.x -= dx * diff;
          b.y -= dy * diff;
          b.z -= dz * diff;
        } else if (i + 1 === N_NODES - 1 && dragging) {
          a.x += dx * diff;
          a.y += dy * diff;
          a.z += dz * diff;
        } else {
          const h = diff * 0.5;
          a.x += dx * h; a.y += dy * h; a.z += dz * h;
          b.x -= dx * h; b.y -= dy * h; b.z -= dz * h;
        }
      }
    }
  }

  /* ── MOUSE / TOUCH INTERACTION & INSPECT MODE ── */
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-999, -999);
  let isDragging = false;
  let isHovered = false;
  const dragTarget = new THREE.Vector3();
  const dragOffset = new THREE.Vector3();
  let badgeHitMesh = null;
  let prevPtr = { x: 0, y: 0 };
  let ptrVel = { x: 0, y: 0 };

  // Click vs Drag discrimination & Inspect Mode State
  let isBadgePointerDown = false;
  let downPtr = { x: 0, y: 0 };
  let downTime = 0;
  let movedBeyondThreshold = false;

  let isInspecting = false;
  let inspectProgress = 0; // 0 (hanging) -> 1 (inspected)
  let inspectFlipped = false;
  let inspectOrbitX = 0;
  let inspectOrbitY = 0;
  let isInspectOrbiting = false;

  // Inspect UI elements
  let backdrop = document.getElementById('badge-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'badge-backdrop';
    document.body.appendChild(backdrop);
  }

  let closeBtn = document.querySelector('.badge-close-btn');
  if (!closeBtn) {
    closeBtn = document.createElement('button');
    closeBtn.className = 'badge-close-btn';
    closeBtn.setAttribute('aria-label', isAr ? 'إغلاق المعاينة' : 'Close badge view');
    closeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    document.body.appendChild(closeBtn);
  }

  let hint = document.querySelector('.badge-inspect-hint');
  if (!hint) {
    hint = document.createElement('div');
    hint.className = 'badge-inspect-hint';
    document.body.appendChild(hint);
  }

  function updateHintText() {
    if (!hint) return;
    const isMobile = window.innerWidth < 640;
    if (isAr) {
      hint.textContent = 'اسحب للتدوير · اضغط للقلب · اضغط بالخارج للإغلاق';
    } else if (isMobile) {
      hint.textContent = 'Drag to rotate · Click to flip · Tap outside to close';
    } else {
      hint.textContent = 'Drag to rotate · Click to flip · Click outside or ESC to close';
    }
  }
  updateHintText();
  window.addEventListener('resize', updateHintText);

  function openInspect() {
    if (isInspecting) return;
    isInspecting = true;
    updateHintText();
    document.body.classList.add('badge-inspecting');
    document.body.style.cursor = 'grab';
    inspectOrbitX = 0;
    inspectOrbitY = 0;
    inspectFlipped = false;
  }

  function closeInspect() {
    if (!isInspecting) return;
    isInspecting = false;
    document.body.classList.remove('badge-inspecting');
    canvas.style.pointerEvents = 'none';
    document.body.style.cursor = '';
    isInspectOrbiting = false;
  }

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeInspect();
  });

  backdrop.addEventListener('click', (e) => {
    e.stopPropagation();
    closeInspect();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isInspecting) {
      closeInspect();
    }
  });

  function getPtr(e) {
    const cx = e.touches && e.touches.length > 0
      ? e.touches[0].clientX
      : (e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : e.clientX);
    const cy = e.touches && e.touches.length > 0
      ? e.touches[0].clientY
      : (e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientY : e.clientY);
    mouse.x = (cx / window.innerWidth) * 2 - 1;
    mouse.y = -(cy / window.innerHeight) * 2 + 1;
    return { cx, cy };
  }

  function onDown(e) {
    if (e.target && e.target.closest && e.target.closest('.badge-close-btn')) {
      return;
    }

    const { cx, cy } = getPtr(e);
    raycaster.setFromCamera(mouse, camera);
    if (!badgeHitMesh) return;

    const hits = raycaster.intersectObject(badgeHitMesh, true);

    if (isInspecting) {
      if (hits.length > 0) {
        isBadgePointerDown = true;
        downPtr = { x: cx, y: cy };
        downTime = performance.now();
        movedBeyondThreshold = false;
        isInspectOrbiting = true;
        prevPtr = { x: cx, y: cy };
        document.body.style.cursor = 'grabbing';
        if (e.cancelable) e.preventDefault();
      } else {
        closeInspect();
      }
    } else {
      if (hits.length > 0) {
        isBadgePointerDown = true;
        downPtr = { x: cx, y: cy };
        downTime = performance.now();
        movedBeyondThreshold = false;
        isDragging = true;
        canvas.style.pointerEvents = 'auto';
        document.body.style.cursor = 'grabbing';
        const hp = hits[0].point;
        const last = nodes[N_NODES - 1];
        dragOffset.set(last.x - hp.x, last.y - hp.y, last.z - hp.z);
        dragTarget.copy(hp).add(dragOffset);
        prevPtr = { x: cx, y: cy };
        ptrVel = { x: 0, y: 0 };
        if (e.cancelable) e.preventDefault();
      }
    }
  }

  function onMove(e) {
    const { cx, cy } = getPtr(e);

    if (isBadgePointerDown) {
      const dist = Math.hypot(cx - downPtr.x, cy - downPtr.y);
      if (dist > 7) {
        movedBeyondThreshold = true;
      }
    }

    if (isInspecting) {
      if (isInspectOrbiting) {
        const dx = cx - prevPtr.x;
        const dy = cy - prevPtr.y;
        inspectOrbitY += dx * 0.007;
        inspectOrbitX += dy * 0.005;
        inspectOrbitX = Math.max(-0.65, Math.min(0.65, inspectOrbitX));
        prevPtr = { x: cx, y: cy };
      } else {
        raycaster.setFromCamera(mouse, camera);
        if (badgeHitMesh) {
          const hits = raycaster.intersectObject(badgeHitMesh, true);
          document.body.style.cursor = hits.length > 0 ? 'grab' : 'default';
        }
      }
    } else {
      if (isDragging) {
        ptrVel.x = cx - prevPtr.x;
        ptrVel.y = cy - prevPtr.y;
        prevPtr = { x: cx, y: cy };
        const last = nodes[N_NODES - 1];
        const wp = screenToWorld(cx, cy, last.z);
        dragTarget.copy(wp).add(dragOffset);
      } else {
        raycaster.setFromCamera(mouse, camera);
        if (badgeHitMesh) {
          const hits = raycaster.intersectObject(badgeHitMesh, true);
          if (hits.length > 0) {
            if (!isHovered) { isHovered = true; document.body.style.cursor = 'grab'; }
          } else if (isHovered) {
            isHovered = false; document.body.style.cursor = '';
          }
        }
      }
    }
  }

  function onUp(e) {
    if (isInspecting) {
      if (isBadgePointerDown) {
        const elapsed = performance.now() - downTime;
        if (!movedBeyondThreshold && elapsed < 400) {
          inspectFlipped = !inspectFlipped;
        }
        isInspectOrbiting = false;
        isBadgePointerDown = false;
        document.body.style.cursor = 'grab';
      }
    } else {
      if (isBadgePointerDown) {
        const elapsed = performance.now() - downTime;
        if (!movedBeyondThreshold && elapsed < 450) {
          isDragging = false;
          isBadgePointerDown = false;
          openInspect();
        } else if (isDragging) {
          isDragging = false;
          isBadgePointerDown = false;
          canvas.style.pointerEvents = 'none';
          document.body.style.cursor = isHovered ? 'grab' : '';

          const last = nodes[N_NODES - 1];
          last.px = last.x - ptrVel.x * 0.02;
          last.py = last.y + ptrVel.y * 0.02;
        }
      }
    }
  }

  window.addEventListener('mousedown', onDown, { passive: false });
  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('mouseup', onUp, { passive: true });
  window.addEventListener('touchstart', onDown, { passive: false });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', onUp, { passive: true });

  /* ── LOAD ASSETS & INIT ── */
  function loadImg(url) {
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  Promise.all([loadImg(photoUrl), loadImg(logoUrl)]).then(([photo, logo]) => {
    const fTex = createFrontTex(photo);
    const bTex = createBackTex(logo);
    const sTex = createStrapTex(logo);

    // Maximum anisotropic filtering for razor-sharp typography at any 3D angle
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    fTex.anisotropy = maxAniso;
    fTex.generateMipmaps = true;
    fTex.minFilter = THREE.LinearMipmapLinearFilter;
    fTex.magFilter = THREE.LinearFilter;

    bTex.anisotropy = maxAniso;
    bTex.generateMipmaps = true;
    bTex.minFilter = THREE.LinearMipmapLinearFilter;
    bTex.magFilter = THREE.LinearFilter;

    sTex.anisotropy = maxAniso;

    const badge = buildBadge(fTex, bTex);
    scene.add(badge.group);
    badgeHitMesh = badge.hitMesh;

    const ribbonGeom = createRibbonGeom();
    const ribbonMat = new THREE.MeshStandardMaterial({
      map: sTex, roughness: 0.9, metalness: 0.02, side: THREE.DoubleSide,
    });
    scene.add(new THREE.Mesh(ribbonGeom, ribbonMat));

    const anchorSc = getAnchorScreenPos();
    const anchor = screenToWorld(anchorSc.x, anchorSc.y, 0);
    initDrop(anchor);

    function onResize() {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      const asp = getAnchorScreenPos();
      const wa = screenToWorld(asp.x, asp.y, 0);
      nodes[0].set(wa.x, wa.y, wa.z);
    }
    window.addEventListener('resize', onResize);
    onResize();

    /* ── ANIMATION LOOP ── */
    let lastT = 0;
    let acc = 0;
    const FDT = 1 / 60; // Fixed step at 60Hz

    // Smoothed rotation initialized to match the initial swing angle
    const initAngle = isAr ? 0.32 : -0.32;
    const rot = { x: 0, y: 0, z: -initAngle };
    let angVelY = 0, angVelX = 0;

    function loop(now) {
      requestAnimationFrame(loop);

      if (!lastT) {
        lastT = now;
        return;
      }
      const rawDt = (now - lastT) / 1000;
      lastT = now;
      const dt = Math.min(rawDt, 0.033);

      // Update anchor
      const asp = getAnchorScreenPos();
      const wa = screenToWorld(asp.x, asp.y, 0);
      nodes[0].x = wa.x; nodes[0].y = wa.y; nodes[0].z = wa.z;

      // Fixed timestep physics
      acc += dt;
      const maxSteps = 4; // Prevent too many steps per frame
      let steps = 0;
      while (acc >= FDT && steps < maxSteps) {
        stepPhysics(FDT, isDragging, dragTarget);
        acc -= FDT;
        steps++;
      }
      if (steps >= maxSteps) acc = 0; // Drop remaining time

      // Inspect transition progress
      const targetProgress = isInspecting ? 1.0 : 0.0;
      const speed = isInspecting ? 0.12 : 0.14;
      inspectProgress += (targetProgress - inspectProgress) * speed;
      if (Math.abs(targetProgress - inspectProgress) < 0.004) {
        inspectProgress = targetProgress;
      }
      const tEase = inspectProgress * inspectProgress * (3 - 2 * inspectProgress);

      // Hanging physics position:
      const last = nodes[N_NODES - 1];
      const hangPos = new THREE.Vector3(last.x, last.y, last.z);

      // Inspect target position & scale from dynamic responsive config:
      const pcfg = getPhysicsConfig();
      const mob = window.innerWidth < 640;
      const inspectPos = new THREE.Vector3(0, pcfg.inspectY, pcfg.zInspect);

      const currentPos = new THREE.Vector3().lerpVectors(hangPos, inspectPos, tEase);
      badge.group.position.copy(currentPos);

      // Scale interpolation
      const baseScale = pcfg.baseScale;
      const inspScale = pcfg.inspScale;
      const currentScale = THREE.MathUtils.lerp(baseScale, inspScale, tEase);
      badge.group.scale.set(currentScale, currentScale, currentScale);

      // Orientation calculation:
      // 1. Normal physics hanging orientation
      const prev = nodes[N_NODES - 2];
      const upDir = new THREE.Vector3(
        prev.x - last.x, prev.y - last.y, prev.z - last.z,
      ).normalize();

      const tRoll = Math.atan2(upDir.x, upDir.y);
      const tPitch = Math.atan2(upDir.z, Math.sqrt(upDir.x * upDir.x + upDir.y * upDir.y));

      const velX = (last.x - last.px) * 15;
      const velZ = (last.z - last.pz) * 15;
      angVelY = angVelY * 0.92 + velX * 0.04;
      angVelX = angVelX * 0.92 + velZ * 0.04;

      const dRotX = tPitch + angVelX * 0.25;
      const dRotY = angVelY * 0.4;
      const dRotZ = -tRoll;

      const lerpF = 0.1;
      rot.x += (dRotX - rot.x) * lerpF;
      rot.y += (dRotY - rot.y) * lerpF;
      rot.z += (dRotZ - rot.z) * lerpF;

      // 2. Inspect mode orientation
      const targetTiltX = -mouse.y * 0.15;
      const targetTiltY = mouse.x * 0.20;
      const baseFlipY = inspectFlipped ? Math.PI : 0;
      if (!isInspectOrbiting) {
        inspectOrbitX *= 0.95;
      }
      const inspRotX = targetTiltX + inspectOrbitX;
      const inspRotY = baseFlipY + targetTiltY + inspectOrbitY;
      const inspRotZ = -mouse.x * 0.04;

      // 3. Blend rotations
      const finalRotX = THREE.MathUtils.lerp(rot.x, inspRotX, tEase);
      const finalRotY = THREE.MathUtils.lerp(rot.y, inspRotY, tEase);
      const finalRotZ = THREE.MathUtils.lerp(rot.z, inspRotZ, tEase);

      badge.group.rotation.set(finalRotX, finalRotY, finalRotZ);
      badge.group.updateMatrixWorld(true);

      // Physical hardware clamp world anchor:
      // Local center of clamp is at (0, CARD_H * 0.5 + 0.038, 0)
      const clampWorldPos = new THREE.Vector3(0, CARD_H * 0.5 + 0.038, 0).applyMatrix4(badge.group.matrixWorld);
      const clampWorldRight = new THREE.Vector3(1, 0, 0).applyQuaternion(badge.group.quaternion).normalize();
      const clampWorldUp = new THREE.Vector3(0, 1, 0).applyQuaternion(badge.group.quaternion).normalize();
      const clampLeadIn = clampWorldPos.clone().addScaledVector(clampWorldUp, mob ? 0.08 : 0.16);

      // Build spline points for ribbon
      const pts = [];
      // Point 0: Anchor pinned at ceiling
      pts.push(new THREE.Vector3(nodes[0].x, nodes[0].y, nodes[0].z));

      const arcYSag = mob ? 0.10 : 0.35;
      for (let i = 1; i <= 4; i++) {
        const t = i / 5;
        const pPhys = new THREE.Vector3(nodes[i].x, nodes[i].y, nodes[i].z);

        const arcX = THREE.MathUtils.lerp(nodes[0].x, clampLeadIn.x, t);
        const arcY = THREE.MathUtils.lerp(nodes[0].y, clampLeadIn.y, t) - Math.sin(t * Math.PI) * arcYSag * (1 - tEase * 0.5);
        const arcZ = THREE.MathUtils.lerp(nodes[0].z, clampLeadIn.z, t);
        const pArc = new THREE.Vector3(arcX, arcY, arcZ);

        const pFinal = new THREE.Vector3().lerpVectors(pPhys, pArc, tEase);
        pts.push(pFinal);
      }

      // Point 5: Lead-in directly along badge axis into top of clamp bracket
      pts.push(clampLeadIn);

      // Point 6: Terminus inside the metal crimp bracket
      pts.push(clampWorldPos);

      updateRibbon(ribbonGeom, pts, clampWorldPos, clampWorldRight);

      renderer.render(scene, camera);
    }

    requestAnimationFrame(loop);
  });
})();
