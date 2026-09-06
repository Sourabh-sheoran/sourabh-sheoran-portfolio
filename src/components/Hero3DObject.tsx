import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Hero3DObject({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 420;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 5.2);

    // Renderer with full alpha transparency
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights - 360 Studio editorial lighting so all sides stay bright during continuous rotation
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8b8d94, 2.6);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const backKeyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    backKeyLight.position.set(-5, 5, -5);
    scene.add(backKeyLight);

    const fillLight = new THREE.DirectionalLight(0xe4e8f0, 2.0);
    fillLight.position.set(-5, 3, 4);
    scene.add(fillLight);

    const backFillLight = new THREE.DirectionalLight(0xe4e8f0, 2.0);
    backFillLight.position.set(5, -3, -4);
    scene.add(backFillLight);

    const glassInternalGlow = new THREE.PointLight(0xffffff, 2.5, 8);
    glassInternalGlow.position.set(0, 0, 0);
    scene.add(glassInternalGlow);

    // Main rotating group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Create dynamic Canvas Texture for the etched glass typography:
    // BUILD / EXPLORE / IMPROVE / REPEAT
    const createTextCanvas = (flipped = false) => {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 1024;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 1024, 1024);
        if (flipped) {
          ctx.translate(1024, 0);
          ctx.scale(-1, 1);
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 76px -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif';
        ctx.letterSpacing = '14px';

        const lines = ['BUILD', 'EXPLORE', 'IMPROVE', 'REPEAT'];
        const startY = 370;
        const lineHeight = 100;

        lines.forEach((line, i) => {
          ctx.fillText(line, 512, startY + i * lineHeight);
        });
      }
      return c;
    };

    const frontTextTexture = new THREE.CanvasTexture(createTextCanvas(false));
    frontTextTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const backTextTexture = new THREE.CanvasTexture(createTextCanvas(true));
    backTextTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 2. Glass Slate with frosted appearance and beveled luminous rim
    const glassGeo = new THREE.BoxGeometry(2.4, 2.9, 0.08);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe8ecf0,
      metalness: 0.05,
      roughness: 0.18,
      transmission: 0.88,
      thickness: 0.4,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const glassSlate = new THREE.Mesh(glassGeo, glassMat);
    glassSlate.rotation.set(0.12, 0.1, -0.05);

    // Front etched text plane
    const textPlaneGeo = new THREE.PlaneGeometry(2.35, 2.85);
    const frontTextMat = new THREE.MeshBasicMaterial({
      map: frontTextTexture,
      transparent: true,
      opacity: 0.92,
      side: THREE.FrontSide,
    });
    const frontTextMesh = new THREE.Mesh(textPlaneGeo, frontTextMat);
    frontTextMesh.position.z = 0.045;
    glassSlate.add(frontTextMesh);

    // Back etched text plane (so text is readable from both front and back during 360 rotation!)
    const backTextMat = new THREE.MeshBasicMaterial({
      map: backTextTexture,
      transparent: true,
      opacity: 0.92,
      side: THREE.BackSide,
    });
    const backTextMesh = new THREE.Mesh(textPlaneGeo, backTextMat);
    backTextMesh.position.z = -0.045;
    glassSlate.add(backTextMesh);

    // Crisp glowing glass bevel rim
    const glassEdges = new THREE.EdgesGeometry(glassGeo);
    const glassRimMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.65,
    });
    const glassRim = new THREE.LineSegments(glassEdges, glassRimMat);
    glassSlate.add(glassRim);

    masterGroup.add(glassSlate);

    // 3. Realistic Concrete/Granite Stone Cubes
    // Procedural stone noise texture matching the editorial reference image
    const stoneCanvas = document.createElement('canvas');
    stoneCanvas.width = 1024;
    stoneCanvas.height = 1024;
    const sCtx = stoneCanvas.getContext('2d');
    if (sCtx) {
      sCtx.fillStyle = '#6e7077';
      sCtx.fillRect(0, 0, 1024, 1024);

      // Multiple octave granular stone speckling
      for (let i = 0; i < 20000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const size = Math.random() < 0.2 ? 3 : 1.5;
        const isLight = Math.random() > 0.45;
        const alpha = Math.random() * 0.4 + 0.1;
        sCtx.fillStyle = isLight
          ? `rgba(215, 218, 224, ${alpha})`
          : `rgba(45, 47, 52, ${alpha})`;
        sCtx.fillRect(x, y, size, size);
      }
    }
    const stoneTexture = new THREE.CanvasTexture(stoneCanvas);
    stoneTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const stoneMaterial = new THREE.MeshStandardMaterial({
      color: 0xa2a5ac,
      map: stoneTexture,
      roughness: 0.65,
      metalness: 0.08,
    });

    const createStoneCube = (width: number, height: number, depth: number) => {
      const geo = new THREE.BoxGeometry(width, height, depth);
      const mesh = new THREE.Mesh(geo, stoneMaterial);
      const edgeGeo = new THREE.EdgesGeometry(geo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.45,
      });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      mesh.add(edges);
      return mesh;
    };

    // Cube 1: Top-Right behind glass
    const cube1 = createStoneCube(1.1, 1.1, 1.1);
    cube1.position.set(1.0, 1.05, -0.45);
    cube1.rotation.set(0.4, 0.6, 0.3);
    masterGroup.add(cube1);

    // Cube 2: Bottom-Left under glass
    const cube2 = createStoneCube(1.2, 1.2, 1.2);
    cube2.position.set(-1.0, -0.85, 0.35);
    cube2.rotation.set(-0.35, 0.45, -0.2);
    masterGroup.add(cube2);

    // Cube 3: Small floating cube in foreground
    const cube3 = createStoneCube(0.55, 0.55, 0.55);
    cube3.position.set(1.45, -0.88, 0.7);
    cube3.rotation.set(0.6, -0.3, 0.5);
    masterGroup.add(cube3);

    // Cube 4: Background balance cube
    const cube4 = createStoneCube(0.42, 0.42, 0.42);
    cube4.position.set(-1.3, 0.95, -0.7);
    cube4.rotation.set(0.2, 0.8, -0.4);
    masterGroup.add(cube4);

    // 4. Orbiting Wireframe Elliptical Ring
    const ringCurve = new THREE.EllipseCurve(0, 0, 2.25, 1.35, 0, 2 * Math.PI, false, 0);
    const ringPoints = ringCurve.getPoints(120);
    const ringGeometry = new THREE.BufferGeometry().setFromPoints(
      ringPoints.map((p) => new THREE.Vector3(p.x, p.y, 0))
    );
    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
    });
    const orbitRing = new THREE.Line(ringGeometry, ringMaterial);
    orbitRing.rotation.set(Math.PI / 3, 0.25, -Math.PI / 6);
    masterGroup.add(orbitRing);

    // Second faint outer orbital trajectory
    const outerCurve = new THREE.EllipseCurve(0, 0, 2.8, 1.7, 0, 2 * Math.PI, false, 0);
    const outerPoints = outerCurve.getPoints(120);
    const outerRingGeo = new THREE.BufferGeometry().setFromPoints(
      outerPoints.map((p) => new THREE.Vector3(p.x, p.y, 0))
    );
    const outerRingMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
    });
    const outerRing = new THREE.Line(outerRingGeo, outerRingMat);
    outerRing.rotation.set(Math.PI / 2.6, -0.3, Math.PI / 8);
    masterGroup.add(outerRing);

    // 5. Synchronized Floating Spheres
    const sphereGeo = new THREE.SphereGeometry(0.085, 32, 32);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xeef2f7,
      roughness: 0.1,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const sphere1 = new THREE.Mesh(sphereGeo, sphereMat);
    sphere1.position.set(1.9, 0.5, 0.4);
    masterGroup.add(sphere1);

    const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 32, 32), sphereMat);
    sphere2.position.set(-1.75, -0.6, -0.3);
    masterGroup.add(sphere2);

    // Dynamic mouse parallax tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouse.targetX = normX * 0.25;
      mouse.targetY = -normY * 0.2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Clock
    let animId: number;
    let lastTime = performance.now();
    let clockTime = 0;

    const animate = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      clockTime += delta;

      // Mouse parallax smooth dampening
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // CONTINUOUS 360° ROTARY MOTION around vertical Y-axis:
      // Slow, cinematic, seamless continuous rotation (~24 seconds per 360° revolution)
      masterGroup.rotation.y += delta * 0.26;

      // Very subtle floating up-and-down movement & gentle depth
      const floatY = Math.sin(clockTime * 1.1) * 0.12;
      const tiltX = Math.sin(clockTime * 0.7) * 0.05 + 0.12 + mouse.y;
      const tiltZ = Math.cos(clockTime * 0.8) * 0.03 + mouse.x * 0.5;

      masterGroup.position.y = floatY;
      masterGroup.rotation.x = tiltX;
      masterGroup.rotation.z = tiltZ;

      // Orbiting ring slight counter-precession
      orbitRing.rotation.z += delta * 0.08;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Responsive resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || width;
      const newH = container.clientHeight || height;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      glassGeo.dispose();
      glassMat.dispose();
      stoneMaterial.dispose();
      frontTextTexture.dispose();
      backTextTexture.dispose();
      stoneTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
      style={{
        pointerEvents: 'none',
      }}
    />
  );
}
