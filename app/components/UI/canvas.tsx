"use client";
import React, { useRef, useEffect } from "react";

const InteractiveCanvasBG: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = 400);

        const particles: {
            x: number;
            y: number;
            vx: number;
            vy: number;
            r: number;
        }[] = [];

        const particleCount = 100;
        const maxDistance = 10; // distance to draw lines

        // Mouse position
        const mouse = { x: 0, y: 0 };

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                r: Math.random() * 2 + 1,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw particles
            particles.forEach((p) => {
                // Move particles
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Repel from mouse
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    const angle = Math.atan2(dy, dx);
                    const force = (100 - dist) / 20;
                    p.vx += Math.cos(angle) * force;
                    p.vy += Math.sin(angle) * force;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(108,36,224,0.7)";
                ctx.fill();
            });

            // Draw lines between close particles
            for (let i = 0; i < particleCount; i++) {
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(108,36,224,${1 - dist / maxDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };
        animate();

        // Track mouse
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Resize canvas
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = 400;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="relative w-full">
            <canvas ref={canvasRef} className="w-full block" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                    Get Started Today
                </h2>
            </div>
        </div>
    );
};

export default InteractiveCanvasBG;
