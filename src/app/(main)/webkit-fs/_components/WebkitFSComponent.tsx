"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { YouTubePlayer } from "../../join/_components/YouTubePlayer";
import { MessageSquare, X, Send, Maximize, Minimize } from "lucide-react";
import { cn } from "@/lib/utils";
import { TriggeredDialog } from "@/components/triggered-dialog";

// ─── Platform Detection ────────────────────────────────────────────────────────
function detectPlatform() {
  if (typeof navigator === "undefined") return { isIOS: false, isMobile: false };
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isMobile = isIOS || /Android/.test(ua);
  return { isIOS, isMobile };
}

// ─── iOS Video Shell ──────────────────────────────────────────────────────────
function createIOSVideoShell() {
  const canvas = document.createElement("canvas");
  // Set a landscape aspect ratio (16:9) to encourage iOS to rotate
  canvas.width = 160;
  canvas.height = 90;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 160, 90);
  }

  const video = document.createElement("video") as any;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.muted = true;
  video.loop = true;

  Object.assign(video.style, {
    position: "fixed",
    top: "0", left: "0",
    width: "100vw", height: "100vh",
    objectFit: "cover",
    zIndex: "9998",
    opacity: "0.01",
    pointerEvents: "none",
    background: "#000",
  });

  try {
    video.srcObject = (canvas as any).captureStream(1);
  } catch {
    video.src = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0";
  }

  document.body.appendChild(video);
  video.play().catch(() => { });
  return video;
}

export default function WebkitFSComponent() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<{ id: number; text: string; user: string }[]>([
    { id: 1, text: "Welcome to the Webkit FS test!", user: "System" },
    { id: 2, text: "Try entering fullscreen on iOS.", user: "System" },
  ]);
  const [inputText, setInputText] = useState("");
  const [showTriggeredDialog, setShowTriggeredDialog] = useState(false);
  const [platform, setPlatform] = useState<{ isIOS: boolean; isMobile: boolean } | null>(null);

  const videoRef = useRef<any>(null);
  const portalRootRef = useRef<HTMLDivElement | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    const p = detectPlatform();
    setPlatform(p);
    if (p.isIOS) {
      videoRef.current = createIOSVideoShell();
    }

    const onFsChange = () => {
      setIsFullscreen(!!(document.fullscreenElement || (document as any).webkitFullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);

    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
      videoRef.current?.remove();
      portalRootRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    /* if (isFullscreen) { */
    const timer = setTimeout(() => {
      setShowTriggeredDialog(true);
    }, 5000);
    return () => clearTimeout(timer);
    /*  } else {
       setShowTriggeredDialog(false);
     } */
  }, []);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: inputText, user: "Me" }]);
    setInputText("");
  };

  const enterFullscreen = useCallback(() => {
    if (!platform) return;

    // Toggle pseudo-fullscreen state immediately
    setIsFullscreen(true);

    // Attempt to lock orientation (Supported on Android/Chrome, limited on iOS)
    if (typeof screen !== "undefined" && (screen as any).orientation?.lock) {
      (screen as any).orientation.lock("landscape").catch(() => {
        console.log("Orientation lock failed/unsupported");
      });
    }

    if (platform.isIOS && videoRef.current) {
      const video = videoRef.current;

      const handleExit = () => {
        setIsFullscreen(false);
        cleanupPortal();
      };

      // Listen for exit to restore UI
      video.addEventListener("webkitendfullscreen", handleExit, { once: true });

      // Attempt native fullscreen without relying on status checks
      if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
        setupPortal(); // Attempt to portal the UI into the native layer
      } else if (video.webkitSetPresentationMode) {
        video.webkitSetPresentationMode("fullscreen");
        setupPortal();
      }
    } else {
      // Standard Fullscreen API for other platforms
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen().catch(() => { });
      else if ((el as any).webkitRequestFullscreen) (el as any).webkitRequestFullscreen();
    }
  }, [platform]);

  const exitFullscreen = useCallback(() => {
    setIsFullscreen(false);
    cleanupPortal();

    if (typeof screen !== "undefined" && (screen as any).orientation?.unlock) {
      (screen as any).orientation.unlock();
    }

    if (platform?.isIOS && videoRef.current) {
      const video = videoRef.current;
      if (video.webkitSetPresentationMode) {
        video.webkitSetPresentationMode("inline");
      }
      // Note: webkitExitFullscreen is not always reliable on iPhone, 
      // but changing mode to inline usually closes the native player.
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => { });
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  }, [platform]);

  const setupPortal = () => {
    if (!portalRootRef.current) {
      const div = document.createElement("div");
      Object.assign(div.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100dvh",
        zIndex: "99999",
        pointerEvents: "auto",
        background: "#020617", // slate-950
      });
      portalRootRef.current = div;
    }
    if (!portalRootRef.current.isConnected) {
      document.body.appendChild(portalRootRef.current);
    }
    setPortalReady(true);
  };

  const cleanupPortal = () => {
    setPortalReady(false);
    if (portalRootRef.current?.isConnected) {
      document.body.removeChild(portalRootRef.current);
    }
  };


  const content = (
    <div className={cn(
      "flex flex-col w-full bg-slate-950 text-white overflow-hidden",
      isFullscreen ? "fixed inset-0 z-50 h-[100dvh]" : "relative min-h-[100dvh]"
    )}>
      {/* Experiment: Mocked API Triggered Overlay */}
      <TriggeredDialog
        isOpen={showTriggeredDialog}
        onClose={() => setShowTriggeredDialog(false)}
        title="Webkit FS Test"
        description="This custom overlay works inside the Webkit Fullscreen portal! It demonstrates that we have full DOM control even in native iOS video presentation modes."
      />

      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-slate-900/50 backdrop-blur-md border-b border-white/10 shrink-0">
        <div>
          <h1 className="text-lg font-bold">Webkit FS POC</h1>
          <p className="text-xs text-slate-400">
            {platform?.isIOS ? "iOS Safari (Video Shell + Portal)" : "Standard Browser"}
          </p>
        </div>
        <button
          onClick={isFullscreen ? exitFullscreen : enterFullscreen}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors active:scale-80"
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 flex",
        isFullscreen ? "flex-row" : "flex-col landscape:flex-row md:flex-row"
      )}>
        {/* Video Side */}
        <div className="flex-1 bg-black flex items-center justify-center relative min-h-0 min-w-0">
          <YouTubePlayer
            videoId="mn1PGW8NBC8"
            className="w-full h-full"
          />
        </div>

        {/* Chat Side */}
        <div className={cn(
          "w-full landscape:w-72 md:w-80 flex flex-col bg-slate-900 border-l border-white/10 shrink-0 transition-all",
          isFullscreen ? "h-full" : "h-96 landscape:h-full md:h-full"
        )}>
          <div className="p-3 border-b border-white/10 flex items-center gap-2">
            <MessageSquare size={16} className="text-yoga-blue" />
            <span className="font-semibold text-sm">Live Chat</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(m => (
              <div key={m.id} className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{m.user}</span>
                <p className="text-sm bg-white/5 p-2 rounded-lg inline-block self-start">{m.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-slate-950/50 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yoga-blue"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-yoga-blue hover:bg-yoga-blue-dark transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-slate-950">
      {(!platform?.isIOS || !portalReady) && content}

      {platform?.isIOS && portalReady && portalRootRef.current &&
        createPortal(content, portalRootRef.current)
      }
    </div>
  );
}
