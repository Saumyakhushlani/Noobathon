"use client";

import React from 'react';
import { useThemeStore } from '@/store/theme';

const Loader = () => {
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";
  
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.2)' : '#ddd';
  const bgColor = isDark ? '#171717' : 'transparent';
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dinoRun {
          from {
            background-position: -44px 0;
          }
          to {
            background-position: -132px 0;
          }
        }

        @keyframes dinoJump {
          0%, 35% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-70px);
          }
          65%, 100% {
            transform: translateY(0);
          }
        }

        @keyframes moveObstacle {
          0% {
            right: -50px;
          }
          100% {
            right: 100%;
          }
        }

        @keyframes moveGround {
          from {
            background-position: 0 0;
          }
          to {
            background-position: -1200px 0;
          }
        }

        .dino-runner {
          width: 44px;
          height: 47px;
          position: absolute;
          bottom: 12px;
          left: 50%;
          margin-left: -22px;
          z-index: 2;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAAAvAgMAAABiRrxWAAAADFBMVEX///9TU1P39/f///+TS9URAAAAAXRSTlMAQObYZgAAAPpJREFUeF7d0jFKRkEMhdGLMM307itNLALyVmHvJuzTDMjdn72E95PGFEZSmeoU4YMMgxhskvQec8YSVFX1NhGcS5ywtbmC8khcZeKq+ZWJ4F8Sr2+ZCErjkJFEfcjAc/6/BMlfcz6xHdhRthYzIZhIHMcTVY1scUUiAphK8CMSPUbieTBhvD9Lj0vyV4wklEGzHpciKGOJoBp7XDcFs4kWxxM7Ey3iZ8JbzASAvMS7XLOJHTTvEkEZSeQl7DMuwVyCasqK5+XzQRYLUJlMbPXjFcn3m8eKBSjWZMJwvGIOvViAzCbUj1VEDoqFOEQGE3SyInJQLOQMJL4B7enP1UbLXJQAAAAASUVORK5CYII=");
          animation: dinoRun 0.25s infinite steps(2), dinoJump 1.5s infinite ease-in-out;
        }

        .dino-obstacle {
          width: 17px;
          height: 35px;
          position: absolute;
          bottom: 12px;
          right: -50px;
          z-index: 1;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAjCAMAAABRlI+PAAAADFBMVEX////////39/dTU1PhglcSAAAAAXRSTlMAQObYZgAAAPNJREFUeF7tlkEKwzAMBLXr//+5iQhU7gRRQkyhZI+DhwH74jhmO+oIJBVwURljuAXagG5QqkSgBLqg3JnxJ1Cb8SmQ3o6gpO85owGlOB4m2BNKJ11BSd01owGlOHkcIAuHkz6UNpPKgozPM54dADHjJuNhZiJxdQCQgZJeBczgCAAy3yhPJvcnmdC9mZwBIsQMFV5AkzHBNknFgcKM+oyDIFcfCAoy03m+jSMIcmoVZkKqSjr1fghyahRmoKRUHYLiSI1SMlCq5CDgX6BXmKkfn+oQ0KEyyrzoy8GbXJ9xrM/YjhUZgl9nnsyTCe9rgSRdV15CwRcIEu8GGQAAAABJRU5ErkJggg==");
          animation: moveObstacle 1.5s infinite linear;
        }

        .dino-ground {
          width: 100%;
          height: 12px;
          position: absolute;
          bottom: 5px;
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAAMAgMAAAAPCKxBAAAABlBMVEX///9TU1NYzE1OAAAAAXRSTlMAQObYZgAAALJJREFUeF7t1EEKAyEMhtEvMNm7sPfJEVyY+1+ltLgYAsrQCtWhbxEhQvgxIJtSZypxa/WGshgzKdbq/UihMFMlt3o/CspEYoihIMaAb6mCvM6C+BTAeyo+wN4yykV/6pVfkdLpVyI1hh7GJ6QunUoLEQlQglNP2nkQkeF8+ei9cLxMue1qxVRfk1Ej0s6AEGWfVOk0QUtnK5Xo0Lac6wpdtnQqB6VxomPaz+dgF1PaqqmeWJlz1jYUaSIAAAAASUVORK5CYII=");
          background-repeat: repeat-x;
          animation: moveGround 4s linear infinite;
        }
      ` }} />
      <div className="w-full flex flex-col items-center">
        <h2 
          className="text-2xl md:text-3xl font-bold mb-6"
          style={{ color: isDark ? '#ffffff' : '#111827' }}
        >
          Loading
        </h2>
        <div 
          className="w-full h-[150px] relative overflow-hidden flex justify-center"
          style={{ 
            borderBottom: `1px solid ${borderColor}`,
            backgroundColor: bgColor
          }}
        >
          <div className="dino-runner" />
          <div className="dino-obstacle" />
          <div className="dino-ground" />
        </div>
      </div>
    </>
  );
}

export default Loader;
