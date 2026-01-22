"use client"
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

export const Animation = () => {
  const [animationData, setAnimationData] = useState(null);
  
  useEffect(() => {
    // Mobile-friendly fetch with proper headers and timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    
    fetch("/Scam.json", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'default',
      credentials: 'same-origin',
      signal: controller.signal,
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Invalid content-type: ${contentType}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setAnimationData(data);
        }
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        if (err.name !== 'AbortError') {
        }
      });
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center scale-100">
      {animationData && (
        <Lottie 
          animationData={animationData} 
          loop={true} 
          autoplay={true} 
          style={{ width: '100%', height: '100%', maxWidth: '700px', maxHeight: '700px' }}
        />
      )}
    </div>
  )
}

export const OtpAnimation = () => {
  const [animationData, setAnimationData] = useState(null);
  
  useEffect(() => {
    // Mobile-friendly fetch with proper headers and timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    
    fetch("/Otp.json", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'default',
      credentials: 'same-origin',
      signal: controller.signal,
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Invalid content-type: ${contentType}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setAnimationData(data);
        }
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        if (err.name !== 'AbortError') {
        }
      });
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center scale-90">
      {animationData && (
        <Lottie 
          animationData={animationData} 
          loop={true} 
          autoplay={true} 
          style={{ width: '100%', height: '100%', maxWidth: '700px', maxHeight: '700px' }}
        />
      )}
    </div>
  )
}
export const ImageUpload = () => {
  const [animationData, setAnimationData] = useState(null);
  
  useEffect(() => {
    // Mobile-friendly fetch with proper headers and timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    
    fetch("/Photo_Uploading.json", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'default',
      credentials: 'same-origin',
      signal: controller.signal,
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Invalid content-type: ${contentType}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setAnimationData(data);
        }
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        if (err.name !== 'AbortError') {
        }
      });
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center scale-90">
      {animationData && (
        <Lottie 
          animationData={animationData} 
          loop={true} 
          autoplay={true} 
          style={{ width: '100%', height: '100%', maxWidth: '700px', maxHeight: '700px' }}
        />
      )}
    </div>
  )
}
export const Browser = () => {
  const [animationData, setAnimationData] = useState(null);
  
  useEffect(() => {
    // Mobile-friendly fetch with proper headers and timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    
    fetch("/browsing.json", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'default',
      credentials: 'same-origin',
      signal: controller.signal,
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Invalid content-type: ${contentType}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setAnimationData(data);
        }
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        if (err.name !== 'AbortError') {
        }
      });
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center scale-90">
      {animationData && (
        <Lottie 
          animationData={animationData} 
          loop={true} 
          autoplay={true} 
          style={{ width: '100%', height: '100%', maxWidth: '700px', maxHeight: '700px' }}
        />
      )}
    </div>
  )
}

export const CardAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    fetch("/card.json", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "default",
      credentials: "same-origin",
      signal: controller.signal,
    })
      .then((res) => {
        clearTimeout(timeoutId);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(`Invalid content-type: ${contentType}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data) setAnimationData(data);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        if (err.name !== "AbortError") {
        }
      });
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center scale-90">
      {animationData && (
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "700px",
            maxHeight: "700px",
          }}
        />
      )}
    </div>
  );
};

// Alias export for awareness section usage
export const Scam = Animation;