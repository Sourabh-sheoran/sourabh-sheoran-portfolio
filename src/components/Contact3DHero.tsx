import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Contact3DHero() {
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

    const rimLight = new THREE.DirectionalLight(0xa0c0ff, 2.2);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xffeedd, 2.4, 15);
    accentLight.position.set(0, 3, 3);
    scene.add(accentLight);

    // ==================== 1. CANVAS TEXTURE FOR "Let's Connect" ====================
    const plaqueCanvas = document.createElement('canvas');
    plaqueCanvas.width = 1024;
    plaqueCanvas.height = 1024;
    const ctx = plaqueCanvas.getContext('2d');
    if (ctx) {
      // Dark glassy slate background
      const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
      grad.addColorStop(0, '#262a32');
      grad.addColorStop(0.5, '#181b20');
      grad.addColorStop(1, '#0e1014');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Fine border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 8;
      ctx.strokeRect(40, 40, 944, 944);

      // Subtle inner rim
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 3;
      ctx.strokeRect(60, 60, 904, 904);

      // Cursive elegant typography "Let's Connect"
      ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.font = 'italic 400 96px "Brush Script MT", "Caveat", "Dancing Script", cursive, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("Let's", 512, 470);
      ctx.fillText("Connect", 512, 590);

      // Accent underline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(360, 640);
      ctx.lineTo(664, 640);
      ctx.stroke();
    }

    const plaqueTexture = new THREE.CanvasTexture(plaqueCanvas);
    plaqueTexture.needsUpdate = true;

    // ==================== 2. FLOATING GLASS PLAQUE ====================
    const plaqueGeometry = new THREE.BoxGeometry(2.6, 2.6, 0.08);

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x22262c,
      metalness: 0.15,
      roughness: 0.18,
      transmission: 0.65,
      transparent: true,
      opacity: 0.92,
      ior: 1.52,
      thickness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
      map: plaqueTexture,
      roughness: 0.25,
      metalness: 0.2,
    });

    const plaqueMaterials = [
      glassMaterial,
      glassMaterial,
      glassMaterial,
      glassMaterial,
      frontMaterial,
      glassMaterial,
    ];

    const plaqueMesh = new THREE.Mesh(plaqueGeometry, plaqueMaterials);
    plaqueMesh.position.set(0.1, 0.1, 0.2);
    plaqueMesh.rotation.set(-0.06, 0.18, 0.04);
    masterGroup.add(plaqueMesh);

    // ==================== 3. 3D ORIGAMI PAPER AIRPLANE ====================
    // Create geometric paper airplane geometry
    const planeGeo = new THREE.BufferGeometry();
    // Triangular faces for modern paper airplane
    const vertices = new Float32Array([
      // Nose to right wing tip
      0, 0, 0.8,   0.6, 0.1, -0.6,   0, -0.2, -0.4,
      // Nose to left wing tip
      0, 0, 0.8,   0, -0.2, -0.4,   -0.6, 0.1, -0.6,
      // Top right crease
      0, 0, 0.8,   0.2, 0.05, -0.6,   0.6, 0.1, -0.6,
      // Top left crease
      0, 0, 0.8,   -0.6, 0.1, -0.6,   -0.2, 0.05, -0.6,
      // Center keel
      0, 0, 0.8,   0, 0.05, -0.6,    0, -0.2, -0.4,
    ]);
    planeGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    planeGeo.computeVertexNormals();

    const planeMat = new THREE.MeshStandardMaterial({
      color: 0xf3f4f6,
      roughness: 0.35,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const paperPlane = new THREE.Mesh(planeGeo, planeMat);
    paperPlane.scale.set(0.9, 0.9, 0.9);
    paperPlane.position.set(1.2, -0.8, 0.9);
    paperPlane.rotation.set(-0.35, -0.6, 0.3);
    masterGroup.add(paperPlane);

    // ==================== 4. STONE MONOLITHS ====================
    const stoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x2b2e34,
      roughness: 0.88,
      metalness: 0.1,
    });

    const block1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.8, 1.5), stoneMaterial);
    block1.position.set(-0.9, 0.8, -0.8);
    block1.rotation.set(0.28, -0.42, 0.15);
    masterGroup.add(block1);

    const block2 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.5, 1.4), stoneMaterial);
    block2.position.set(0.4, -1.2, -0.7);
    block2.rotation.set(-0.2, 0.35, -0.15);
    masterGroup.add(block2);

    // ==================== 5. CHROME SPHERES & ORBITING RING ====================
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.06,
    });

    const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.32, 32, 32), chromeMaterial);
    sphere1.position.set(1.8, 0.4, 0.7);
    masterGroup.add(sphere1);

    // Halo ring around plaque
    const ringGeo = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.1,
      transparent: true,
      opacity: 0.45,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.set(1.1, 0.3, 0.4);
    masterGroup.add(ring);

    // Floating particles
    const particleCount = 24;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.4,
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
      targetX = x * 0.35;
      targetY = -y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ==================== ANIMATION LOOP ====================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Mouse easing
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Gentle floating bob for plaque
      plaqueMesh.position.y = 0.1 + Math.sin(elapsed * 1.1) * 0.06;
      plaqueMesh.rotation.y = 0.18 + Math.cos(elapsed * 0.7) * 0.03 + mouseX * 0.4;
      plaqueMesh.rotation.x = -0.06 + Math.sin(elapsed * 0.8) * 0.02 + mouseY * 0.3;

      // Paper plane subtle gliding motion
      paperPlane.position.y = -0.8 + Math.sin(elapsed * 1.5) * 0.08;
      paperPlane.position.x = 1.2 + Math.cos(elapsed * 1.2) * 0.06;
      paperPlane.rotation.z = 0.3 + Math.sin(elapsed * 1.3) * 0.05;

      // Sphere orbit
      sphere1.position.y = 0.4 + Math.sin(elapsed * 1.3 + 1) * 0.1;
      sphere1.position.x = 1.8 + Math.cos(elapsed * 0.9) * 0.08;

      // Ring slow rotation
      ring.rotation.z = elapsed * 0.08;

      // Particles
      particles.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

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
      className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] select-none cursor-grab active:cursor-grabbing"
    />
  );
}
