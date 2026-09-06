import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ContactGlobe3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Inner dark sphere
    const innerGeo = new THREE.SphereGeometry(1.5, 48, 48);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x111317,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // 2. Dense Dot Grid / Point Cloud for Globe Surface (Lat/Long Dots)
    const dotCount = 1800;
    const dotGeo = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(dotCount * 3);
    const radius = 1.52;

    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotCount);
      const theta = Math.sqrt(dotCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      dotPositions[i * 3] = x;
      dotPositions[i * 3 + 1] = y;
      dotPositions[i * 3 + 2] = z;
    }

    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.025,
      transparent: true,
      opacity: 0.75,
    });
    const dotPoints = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotPoints);

    // 3. Subtle Wireframe Latitude/Longitude Rings
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wireSphere = new THREE.Mesh(new THREE.SphereGeometry(1.53, 24, 18), wireMat);
    globeGroup.add(wireSphere);

    // 4. Orbiting Rings (Like in reference design)
    const orbitRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.008, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 })
    );
    orbitRing1.rotation.set(1.2, 0.3, 0.4);
    scene.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.006, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 })
    );
    orbitRing2.rotation.set(0.6, -0.4, 1.1);
    scene.add(orbitRing2);

    // 5. Small Orbiting Satellite Sphere
    const satGeo = new THREE.SphereGeometry(0.12, 24, 24);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.08,
    });
    const satellite = new THREE.Mesh(satGeo, satMat);
    scene.add(satellite);

    // Ambient light for satellite
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(4, 5, 4);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Globe continuous rotation
      globeGroup.rotation.y = elapsed * 0.15;
      globeGroup.rotation.x = Math.sin(elapsed * 0.05) * 0.05;

      // Orbiting satellite
      const satAngle = elapsed * 0.6;
      satellite.position.x = Math.cos(satAngle) * 2.2;
      satellite.position.z = Math.sin(satAngle) * 2.2;
      satellite.position.y = Math.sin(satAngle * 1.5) * 0.4;

      // Subtle ring wobble
      orbitRing1.rotation.z = elapsed * 0.04;
      orbitRing2.rotation.z = -elapsed * 0.03;

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
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] flex items-center justify-center select-none pointer-events-none">
      <div ref={containerRef} className="w-full h-full" />

      {/* Floating Orbital Labels matching reference screenshot */}
      <div className="absolute left-4 top-16 sm:left-8 sm:top-24 text-[10px] font-mono tracking-[0.25em] text-white/50 border-b border-white/20 pb-0.5">
        IDEAS
      </div>

      <div className="absolute left-0 top-1/2 sm:left-4 -translate-y-1/2 text-[10px] font-mono tracking-[0.25em] text-white/50 border-b border-white/20 pb-0.5">
        PEOPLE
      </div>

      <div className="absolute left-4 bottom-16 sm:left-8 sm:bottom-24 text-[10px] font-mono tracking-[0.25em] text-white/50 border-b border-white/20 pb-0.5">
        TECHNOLOGY
      </div>

      <div className="absolute right-4 bottom-16 sm:right-8 sm:bottom-20 text-[10px] font-mono tracking-[0.25em] text-white/60 text-right">
        A BETTER <br />
        <span className="text-white/80">TOMORROW</span>
      </div>
    </div>
  );
}
