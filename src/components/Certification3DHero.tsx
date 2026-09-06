import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Certification3DHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0.3, 0.2, 5.2);
    camera.lookAt(0.1, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Master Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // ==================== LIGHTING ====================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x90b0e0, 2.0);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xffeedd, 2.2, 15);
    accentLight.position.set(0, 3, 3);
    scene.add(accentLight);

    // ==================== TEXTURE CANVAS FOR CERTIFICATE ====================
    const certCanvas = document.createElement('canvas');
    certCanvas.width = 1024;
    certCanvas.height = 1360;
    const ctx = certCanvas.getContext('2d');
    if (ctx) {
      // Dark glassy slate background
      const grad = ctx.createLinearGradient(0, 0, 1024, 1360);
      grad.addColorStop(0, '#1c1f24');
      grad.addColorStop(0.5, '#121417');
      grad.addColorStop(1, '#0b0d0f');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1360);

      // Fine border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 14;
      ctx.strokeRect(40, 40, 944, 1280);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 60, 904, 1240);

      // Top Header Typography
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '600 38px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '8px';
      ctx.fillText('KNOWLEDGE', 512, 280);
      ctx.fillText('BUILDS', 512, 350);
      ctx.fillText('OPPORTUNITIES', 512, 420);

      // Horizontal accent rule
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(380, 480);
      ctx.lineTo(644, 480);
      ctx.stroke();

      // Official Ribbon Seal in Center
      const sealY = 720;
      // Outer ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(512, sealY, 130, 0, Math.PI * 2);
      ctx.stroke();

      // Inner dashed ring
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(512, sealY, 110, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Center Star / Emblem
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '70px serif';
      ctx.fillText('★', 512, sealY + 25);

      // Ribbon tails
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.beginPath();
      ctx.moveTo(460, sealY + 110);
      ctx.lineTo(430, sealY + 240);
      ctx.lineTo(480, sealY + 210);
      ctx.lineTo(512, sealY + 240);
      ctx.lineTo(544, sealY + 210);
      ctx.lineTo(594, sealY + 240);
      ctx.lineTo(564, sealY + 110);
      ctx.closePath();
      ctx.fill();

      // Bottom subtext
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '300 24px monospace';
      ctx.letterSpacing = '4px';
      ctx.fillText('VALIDATED CREDENTIALS // 2026', 512, 1180);
    }

    const certTexture = new THREE.CanvasTexture(certCanvas);
    certTexture.needsUpdate = true;

    // ==================== 1. FLOATING GLASS CERTIFICATE PLAQUE ====================
    const plaqueGeometry = new THREE.BoxGeometry(2.3, 3.1, 0.08);

    // Front material with texture, back/sides translucent glass
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x22262c,
      metalness: 0.15,
      roughness: 0.18,
      transmission: 0.6,
      transparent: true,
      opacity: 0.92,
      ior: 1.52,
      thickness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const frontCertMaterial = new THREE.MeshStandardMaterial({
      map: certTexture,
      roughness: 0.25,
      metalness: 0.2,
    });

    // Box faces: [+X, -X, +Y, -Y, +Z (front), -Z (back)]
    const plaqueMaterials = [
      glassMaterial,
      glassMaterial,
      glassMaterial,
      glassMaterial,
      frontCertMaterial,
      glassMaterial,
    ];

    const plaqueMesh = new THREE.Mesh(plaqueGeometry, plaqueMaterials);
    plaqueMesh.position.set(0.0, 0.1, 0.4);
    plaqueMesh.rotation.set(-0.06, 0.14, 0.02);
    masterGroup.add(plaqueMesh);

    // ==================== 2. STONE MONOLITHS / GEOMETRIC PEDESTALS ====================
    const stoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x2b2e34,
      roughness: 0.85,
      metalness: 0.12,
    });

    // Main angled rear block
    const block1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.8, 1.5), stoneMaterial);
    block1.position.set(-0.7, 0.6, -0.7);
    block1.rotation.set(0.25, -0.4, 0.18);
    masterGroup.add(block1);

    // Secondary lower block
    const block2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.4, 1.3), stoneMaterial);
    block2.position.set(0.9, -1.1, -0.5);
    block2.rotation.set(-0.15, 0.35, -0.12);
    masterGroup.add(block2);

    // Small floating cube left
    const block3 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), stoneMaterial);
    block3.position.set(-1.6, -0.8, 0.6);
    block3.rotation.set(0.4, 0.5, 0.3);
    masterGroup.add(block3);

    // ==================== 3. CHROME SPHERES ====================
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.05,
    });

    const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.35, 32, 32), chromeMaterial);
    sphere1.position.set(1.9, 0.3, 0.8);
    masterGroup.add(sphere1);

    const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 24), chromeMaterial);
    sphere2.position.set(-1.8, 1.2, 0.2);
    masterGroup.add(sphere2);

    // Subtle floating particles
    const particleCount = 28;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 7;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particles);

    // ==================== MOUSE PARALLAX ====================
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.4;
      targetY = -y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ==================== ANIMATION LOOP ====================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Gentle floating bob & interactive perspective
      plaqueMesh.position.y = 0.1 + Math.sin(elapsed * 1.2) * 0.05;
      plaqueMesh.rotation.y = 0.14 + Math.cos(elapsed * 0.8) * 0.02 + mouseX * 0.35;
      plaqueMesh.rotation.x = -0.06 + Math.sin(elapsed * 0.9) * 0.02 + mouseY * 0.25;

      // Chrome spheres orbiting slowly
      sphere1.position.y = 0.3 + Math.sin(elapsed * 1.4 + 1) * 0.12;
      sphere1.position.x = 1.9 + Math.cos(elapsed * 0.9) * 0.08;

      sphere2.position.y = 1.2 + Math.cos(elapsed * 1.6) * 0.1;
      sphere2.position.x = -1.8 + Math.sin(elapsed * 1.1) * 0.07;

      // Stones subtle motion
      block1.rotation.y = -0.4 + Math.sin(elapsed * 0.4) * 0.02;
      block3.rotation.x = 0.4 + elapsed * 0.15;
      block3.rotation.y = 0.5 + elapsed * 0.12;

      // Subtle particle swirl
      particles.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] select-none cursor-grab active:cursor-grabbing"
    />
  );
}
