/*
This component recreates the 404 astronaut animation in a Next.js environment using TailwindCSS.
It assumes you have TailwindCSS set up and can use React and TypeScript.
Canvas animation logic is separated using `useEffect` for dynamic effects.
*/

"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

const Astronaut404: React.FC = () => {
  const visorRef = useRef<HTMLCanvasElement>(null);
  const cordRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const visor = visorRef.current;
    if (visor) {
      const ctx = visor.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(5, 45);
        ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);
        ctx.lineTo(55, 20);
        ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);
        ctx.lineTo(15, 10);
        ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
        ctx.lineTo(5, 45);
        ctx.fillStyle = "#2f3640";
        ctx.strokeStyle = "#f5f6fa";
        ctx.fill();
        ctx.stroke();
      }
    }

    const canvas = cordRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let y1 = 160;
      let y2 = 100;
      let y3 = 100;
      let y1Forward = true;
      let y2Forward = false;
      let y3Forward = true;

      const animate = () => {
        requestAnimationFrame(animate);
        ctx?.clearRect(0, 0, canvas.width, canvas.height);

        ctx?.beginPath();
        ctx?.moveTo(130, 170);
        ctx?.bezierCurveTo(250, y1, 345, y2, 400, y3);
        if (ctx) {
          ctx.strokeStyle = "white";
          ctx.lineWidth = 8;
          ctx.stroke();
        }

        if (y1 === 100) y1Forward = true;
        if (y1 === 300) y1Forward = false;
        if (y2 === 100) y2Forward = true;
        if (y2 === 310) y2Forward = false;
        if (y3 === 100) y3Forward = true;
        if (y3 === 317) y3Forward = false;

        y1Forward ? y1++ : y1--;
        y2Forward ? y2++ : y2--;
        y3Forward ? y3++ : y3--;
      };
      animate();
    }
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
      <div className="absolute -top-[100px] -left-[300px] w-[900px] h-[900px] rounded-full shadow-[0px_0px_30px_-4px_rgba(0,0,0,0.5)] bg-gradient-to-r from-gray-300 to-gray-500"></div>
      <div className="absolute top-[250px] left-[500px] w-[60px] h-[180px] rounded-full opacity-60 bg-gradient-to-r from-gray-500 to-gray-300"></div>
      <div className="absolute top-[650px] left-[340px] w-[40px] h-[80px] rotate-[55deg] rounded-full opacity-60 bg-gradient-to-r from-gray-500 to-gray-300"></div>
      <div className="absolute top-[-20px] left-[40px] w-[65px] h-[120px] rotate-[250deg] rounded-full opacity-60 bg-gradient-to-r from-gray-500 to-gray-300"></div>

      {[
        { top: "40%", left: "50%", delay: "1000ms" },
        { top: "60%", left: "90%", delay: "3000ms" },
        { top: "10%", left: "70%", delay: "2000ms" },
        { top: "90%", left: "40%" },
        { top: "20%", left: "30%", delay: "500ms" },
      ].map((star, index) => (
        <div
          key={index}
          className="absolute w-[5px] h-[5px] bg-gray-400 rounded-full animate-pulse"
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        ></div>
      ))}

      <div className="absolute top-[400px] left-[100px] text-gray-200 font-bold font-mono">
        <div className="text-[10em] leading-none">404</div>
        <div className="text-[2em]">Hmmm...</div>
        <div className="opacity-50">It looks like You got lost in space</div>
        <Link href="/">
          <button className="mt-12 px-8 py-2 border-2 border-gray-700 text-sm rounded-full text-gray-400 hover:text-gray-200 transition-colors font-mono bg-orange-500 border-orange-500 text-white hover:shadow-md">
            HOME
          </button>
        </Link>
      </div>

      <div className="absolute left-[70%] top-[50%] -translate-x-1/2 -translate-y-1/2 scale-[1.2] rotate-[20deg] w-[185px] h-[300px]">
        <div className="absolute top-[90px] left-[47px] w-[86px] h-[90px] bg-gray-400 rounded-md"></div>
        <div className="absolute top-[115px] left-[55px] w-[70px] h-[80px] bg-gray-200 rounded-md"></div>
        <div className="absolute top-[140px] left-[68px] w-[45px] h-[25px] bg-gray-300 rounded-md"></div>
        <div className="absolute top-[127px] left-[9px] w-[65px] h-[20px] bg-gray-200 rounded-md rotate-[-30deg]"></div>
        <div className="absolute top-[102px] left-[7px] w-[20px] h-[45px] bg-gray-200 rounded-t-full rotate-[-12deg]"></div>
        <div className="absolute top-[113px] left-[100px] w-[65px] h-[20px] bg-gray-200 rounded-md rotate-[-10deg]"></div>
        <div className="absolute top-[78px] left-[141px] w-[20px] h-[45px] bg-gray-200 rounded-t-full rotate-[-10deg]"></div>
        <div className="absolute top-[110px] left-[21px] w-[10px] h-[6px] bg-gray-200 rounded-full rotate-[-35deg]"></div>
        <div className="absolute top-[90px] left-[133px] w-[10px] h-[6px] bg-gray-200 rounded-full rotate-[20deg]"></div>
        <div className="absolute top-[122px] left-[6.5px] w-[21px] h-[4px] bg-orange-500 rounded-full rotate-[-15deg]"></div>
        <div className="absolute top-[98px] left-[141px] w-[21px] h-[4px] bg-orange-500 rounded-full rotate-[-10deg]"></div>
        <div className="absolute top-[188px] left-[50px] w-[23px] h-[75px] bg-gray-200 rotate-[10deg]"></div>
        <div className="absolute top-[188px] left-[108px] w-[23px] h-[75px] bg-gray-200 rotate-[-10deg]"></div>
        <div className="absolute top-[240px] left-[43px] w-[28px] h-[20px] bg-white border-b-4 border-orange-500 rounded-t-full rotate-[10deg]"></div>
        <div className="absolute top-[240px] left-[111px] w-[28px] h-[20px] bg-white border-b-4 border-orange-500 rounded-t-full rotate-[-10deg]"></div>
        <div className="absolute top-[60px] left-[60px] w-[60px] h-[60px] bg-white rounded-full">
          <canvas
            ref={visorRef}
            width={60}
            height={60}
            className="absolute top-0 left-0"
          ></canvas>
          <div className="absolute top-[28px] left-[40px] w-[10px] h-[10px] bg-gray-400 opacity-50 rounded-full"></div>
          <div className="absolute top-[40px] left-[38px] w-[5px] h-[5px] bg-gray-500 opacity-30 rounded-full"></div>
        </div>
        <div className="absolute top-0 left-0">
          <canvas ref={cordRef} width={500} height={500}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Astronaut404;
