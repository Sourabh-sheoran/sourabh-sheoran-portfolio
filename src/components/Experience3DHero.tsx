import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Experience3DHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0.2, 0.2, 5.2);
    camera.lookAt(0, 0, 0);

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc6a15b, 2.2);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xc6a15b, 2.4, 15);
    accentLight.position.set(0, 3, 3);
    scene.add(accentLight);

    // ==================== 1. CANVAS TEXTURE FOR EXPERIENCE CARD ====================
    const plaqueCanvas = document.createElement('canvas');
    plaqueCanvas.width = 1024;
    plaqueCanvas.height = 1024;
    const ctx = plaqueCanvas.getContext('2d');
    if (ctx) {
      // Dark glassy slate gradient
      const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
      grad.addColorStop(0, '#1c1f24');
      grad.addColorStop(0.5, '#121417');
      grad.addColorStop(1, '#0b0d0f');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Fine golden border
      ctx.strokeStyle = 'rgba(198, 161, 91, 0.5)';
      ctx.lineWidth = 14;
      ctx.strokeRect(40, 40, 944, 944);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 60, 904, 904);

      // Glowing Badge Pill
      ctx.fillStyle = 'rgba(198, 161, 91, 0.15)';
      ctx.strokeStyle = 'rgba(198, 161, 91, 0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(100, 100, 340, 64, 32);
      ctx.fill();
      ctx.stroke();

      // Green Pulse Dot
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(136, 132, 10, 0, Math.PI * 2);
      ctx.fill();

      // Badge Text
      ctx.font = 'bold 26px "Helvetica Neue", Arial, sans-serif';
      ctx.fillStyle = '#f5f1ea';
      ctx.fillText('CURRENTLY ACTIVE', 165, 140);

      // Company Title
      ctx.font = 'bold 56px "Helvetica Neue", Arial, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('ARIEDGE.AI', 100, 250);

      // Role Subtitle
      ctx.font = '500 32px "Helvetica Neue", Arial, sans-serif';
      ctx.fillStyle = '#C6A15B';
      ctx.fillText('Full Stack Developer Intern', 100, 305);

      // Core Product
      ctx.font = 'bold 38px "Helvetica Neue", Arial, sans-serif';
      ctx.fillStyle = '#f5f1ea';
      ctx.fillText('BallotNow E-Voting', 100, 410);

      // Description text lines
      ctx.font = '26px "Helvetica Neue", Arial, sans-serif';
      ctx.fillStyle = '#C9C5CC';
      ctx.fillText('• Building full-stack UI & scalable REST APIs', 100, 480);
      ctx.fillText('• Developed Candidate Portal & dynamic routes', 100, 540);
      ctx.fillText('• UI redesign, data fetching & multi-layer QA', 100, 600);

      // Second Company Divider
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(100, 670);
      ctx.lineTo(924, 670);
      ctx.stroke();

      // Galcare Pharmaceuticals preview
      ctx.font = 'bold 36px "Helvetica Neue", Arial, sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('Galcare Pharmaceuticals', 100, 740);

      ctx.font = '24px "Helvetica Neue", Arial, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Frontend Developer • 10k+ Daily Visitors • 99.9% Accuracy', 100, 790);

      // Bottom Signature
      ctx.font = 'bold 24px "Courier New", monospace';
      ctx.fillStyle = 'rgba(198, 161, 91, 0.9)';
      ctx.fillText('SOURABH SHEORAN // PROFESSIONAL TIMELINE', 100, 910);
    }

    const plaqueTexture = new THREE.CanvasTexture(plaqueCanvas);
    plaqueTexture.anisotropy = 16;

    // 3D Plaque Mesh
    const plaqueGeometry = new THREE.BoxGeometry(2.3, 2.3, 0.08);
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x1a1c20, metalness: 0.8, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: 0x1a1c20, metalness: 0.8, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: 0x1a1c20, metalness: 0.8, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: 0x1a1c20, metalness: 0.8, roughness: 0.3 }),
      new THREE.MeshPhysicalMaterial({
        map: plaqueTexture,
        metalness: 0.35,
        roughness: 0.25,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      }),
      new THREE.MeshStandardMaterial({ color: 0x0e1013, metalness: 0.9, roughness: 0.4 }),
    ];

    const plaqueMesh = new THREE.Mesh(plaqueGeometry, materials);
    masterGroup.add(plaqueMesh);

    // Outer Glass Glow Frame
    const frameGeo = new THREE.BoxGeometry(2.45, 2.45, 0.05);
    const frameMat = new THREE.MeshPhysicalMaterial({
      color: 0xc6a15b,
      transparent: true,
      opacity: 0.2,
      roughness: 0.1,
      metalness: 0.8,
      transmission: 0.6,
      thickness: 0.5,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.z = -0.03;
    masterGroup.add(frameMesh);

    // Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(1.8, 0.012, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xc6a15b,
      emissive: 0xc6a15b,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    masterGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.1, 0.008, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.3,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    masterGroup.add(ring2);

    // Floating Particles
    const particlesCount = 75;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 3;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc6a15b,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    masterGroup.add(particleSystem);

    // Mouse Interaction
    let targetRotX = 0.05;
    let targetRotY = -0.15;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotY = mouseX * 0.45;
      targetRotX = -mouseY * 0.35;
    };

    const handleMouseLeave = () => {
      targetRotX = 0.05;
      targetRotY = -0.15;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Rotation Lerp
      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.05;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.05;

      // Gentle Floating Bobbing
      masterGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.06;

      // Orbiting rings rotation
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.25;

      // Particles subtle motion
      particleSystem.rotation.y = elapsedTime * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] cursor-grab active:cursor-grabbing select-none"
      title="Interactive 3D Experience Preview (Move mouse to tilt)"
    />
  );
}
