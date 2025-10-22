'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  className?: string;
}

export default function ThreeScene({ className = '' }: ThreeSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create floating geometric shapes
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.ConeGeometry(0.8, 1.5, 8),
      new THREE.TorusGeometry(0.6, 0.2, 16, 100),
      new THREE.OctahedronGeometry(0.8)
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ 
        color: 0x3b82f6, 
        transparent: true, 
        opacity: 0.8,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x8b5cf6, 
        transparent: true, 
        opacity: 0.8,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xec4899, 
        transparent: true, 
        opacity: 0.8,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x06b6d4, 
        transparent: true, 
        opacity: 0.8,
        shininess: 100
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x10b981, 
        transparent: true, 
        opacity: 0.8,
        shininess: 100
      })
    ];

    const meshes: THREE.Mesh[] = [];
    const meshCount = 15;

    // Create floating meshes with fixed positions to avoid hydration mismatch
    const fixedPositions = [
      { geo: 0, mat: 0, pos: [-8, -5, -3], rot: [0.5, 0.3, 0.2] },
      { geo: 1, mat: 1, pos: [6, 4, -8], rot: [0.8, 0.1, 0.4] },
      { geo: 2, mat: 2, pos: [-3, 7, 2], rot: [0.2, 0.9, 0.1] },
      { geo: 3, mat: 3, pos: [9, -2, -5], rot: [0.6, 0.3, 0.8] },
      { geo: 4, mat: 4, pos: [-6, 3, 7], rot: [0.1, 0.7, 0.3] },
      { geo: 0, mat: 1, pos: [2, -8, 4], rot: [0.4, 0.2, 0.9] },
      { geo: 1, mat: 2, pos: [-9, 1, -2], rot: [0.7, 0.5, 0.1] },
      { geo: 2, mat: 3, pos: [5, 6, -7], rot: [0.3, 0.8, 0.4] },
      { geo: 3, mat: 4, pos: [-1, -4, 8], rot: [0.9, 0.1, 0.6] },
      { geo: 4, mat: 0, pos: [7, -6, 1], rot: [0.2, 0.4, 0.7] },
      { geo: 0, mat: 3, pos: [-4, 8, -6], rot: [0.5, 0.9, 0.2] },
      { geo: 1, mat: 4, pos: [3, -1, 9], rot: [0.8, 0.3, 0.5] },
      { geo: 2, mat: 0, pos: [-7, 5, -4], rot: [0.1, 0.6, 0.8] },
      { geo: 3, mat: 1, pos: [8, -9, 3], rot: [0.6, 0.2, 0.4] },
      { geo: 4, mat: 2, pos: [-2, 2, -9], rot: [0.4, 0.7, 0.1] }
    ];

    for (let i = 0; i < meshCount; i++) {
      const config = fixedPositions[i % fixedPositions.length];
      const geometry = geometries[config.geo];
      const material = materials[config.mat];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(config.pos[0], config.pos[1], config.pos[2]);
      mesh.rotation.set(config.rot[0], config.rot[1], config.rot[2]);
      
      scene.add(mesh);
      meshes.push(mesh);
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 1, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Set camera position
    camera.position.z = 15;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Rotate meshes
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.01 * (index % 3 + 1);
        mesh.rotation.y += 0.01 * (index % 2 + 1);
        mesh.rotation.z += 0.005 * (index % 4 + 1);

        // Floating animation
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        mesh.position.x += Math.cos(Date.now() * 0.001 + index) * 0.005;

        // Scale pulsing
        const scale = 1 + Math.sin(Date.now() * 0.002 + index) * 0.1;
        mesh.scale.setScalar(scale);
      });

      // Rotate camera slightly
      camera.position.x = Math.sin(Date.now() * 0.0005) * 2;
      camera.position.y = Math.cos(Date.now() * 0.0003) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      const currentMount = mountRef.current;
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
    />
  );
}
