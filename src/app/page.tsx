"use client";

import React from "react";
import Link from "next/link";

const ScreenshotComparison = ({ iosSrc, androidSrc, isVideo = false }: { iosSrc: string, androidSrc: string, isVideo?: boolean }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
    <div className="space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">iOS Observation</p>
      <div className="border rounded-lg overflow-hidden bg-slate-200 aspect-video flex items-center justify-center">
        {isVideo ? (
          <video src={iosSrc} controls className="w-full h-full object-contain" />
        ) : (
          <img src={iosSrc} alt="iOS Fullscreen" className="w-full h-full object-contain" />
        )}
      </div>
    </div>
    <div className="space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Android Observation (Placeholder)</p>
      <div className="border rounded-lg overflow-hidden bg-slate-200 aspect-video">
        {androidSrc ? (
          <img src={androidSrc} alt="Android Fullscreen" className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">No image available for Android</div>
        )}
      </div>
    </div>
  </div>
);

export default function SimpleReportPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold border-b pb-4 mb-8">Creator Stage — Fullscreen POC Final Report</h1>

        <div className="space-y-2 mb-8 text-sm">
          <p><strong>Project:</strong> Creator Stage Frontend (Live Yoga Streaming)</p>
          <p><strong>Date:</strong> 2026-05-15</p>
          <p><strong>Authors:</strong> Engineering Team</p>
          <p><strong>Scope:</strong> YouTube Live Video + Custom Overlay + Chat Window in Fullscreen — Cross-Platform Feasibility</p>
        </div>

        <hr className="my-8" />

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Executive Summary</h2>
          <p className="mb-4 text-slate-700">
            This report documents five distinct approaches explored to achieve an immersive fullscreen experience for live yoga streaming audiences. The core challenge: rendering a <strong>YouTube Live iframe</strong>, a <strong>live chat panel</strong>, and <strong>dynamically triggered overlays</strong> simultaneously in fullscreen — across iOS Safari, Android Chrome, and desktop browsers.
          </p>
          <p className="p-4 bg-slate-50 border-l-4 border-slate-300 italic mb-4 text-slate-800">
            <strong>Key finding:</strong> No single approach achieves all goals on every platform. iOS Safari fundamentally restricts the Fullscreen API for non-video elements, creating an irreconcilable gap between "toolbar hidden" and "custom UI visible".
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Platform Constraint Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-slate-200 px-4 py-2">Capability</th>
                  <th className="border border-slate-200 px-4 py-2">Desktop</th>
                  <th className="border border-slate-200 px-4 py-2">Android</th>
                  <th className="border border-slate-200 px-4 py-2">iOS Safari</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr>
                  <td className="border border-slate-200 px-4 py-2 font-medium">Element.requestFullscreen()</td>
                  <td className="border border-slate-200 px-4 py-2">Yes</td>
                  <td className="border border-slate-200 px-4 py-2">Yes</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-red-600">No</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-2 font-medium">screen.orientation.lock()</td>
                  <td className="border border-slate-200 px-4 py-2">Yes</td>
                  <td className="border border-slate-200 px-4 py-2">Yes</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-red-600">No</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-2 font-medium">video.webkitEnterFullscreen()</td>
                  <td className="border border-slate-200 px-4 py-2">N/A</td>
                  <td className="border border-slate-200 px-4 py-2">N/A</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-600">Yes</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-2 font-medium">Custom DOM in native FS</td>
                  <td className="border border-slate-200 px-4 py-2">Yes</td>
                  <td className="border border-slate-200 px-4 py-2">Yes</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-red-600">No</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-2 font-medium">100dvh support</td>
                  <td className="border border-slate-200 px-4 py-2">Yes</td>
                  <td className="border border-slate-200 px-4 py-2">Yes</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-600">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Detailed Approaches & Observations</h2>

          <div className="space-y-16">
            {/* Approach 1 */}
            <div className="p-6 border border-slate-200 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">1. AudienceStage (FullScreen API + Overlay)</h3>
                <Link href="/join" target="_blank" className="text-blue-600 underline text-sm">Launch Demo</Link>
              </div>
              <p className="text-sm text-slate-700 mb-6">
                Uses a full screen hook to detect iOS and inject a fixed 100dvh overlay. Android uses the native Fullscreen API.
                This maintains full DOM control for chat and overlays but keeps browser chrome on iOS.
              </p>
              <ScreenshotComparison
                iosSrc="/ios_fs-browser-api.PNG"
                androidSrc="/android_fs-brower-api.JPG"
              />
            </div>

            {/* Approach 2 */}
            <div className="p-6 border border-slate-200 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">2. Pseudo-FS (CSS Layout)</h3>
                <Link href="/pseudo-fs" target="_blank" className="text-blue-600 underline text-sm">Launch Demo</Link>
              </div>
              <p className="text-sm text-slate-700 mb-6">
                Purely CSS-driven approach using 100dvh. Simplest to implement but never hides browser chrome.
                Reliant on orientation change listeners to toggle immersive styles.
              </p>
              <ScreenshotComparison
                iosSrc="/ios_imerssive-css.PNG"
                androidSrc="/android_imerssive-css.JPG"
              />
            </div>

            {/* Approach 3 */}
            <div className="p-6 border border-slate-200 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">3. Native {`<Video/>`} HTML Element</h3>
                <Link href="/sessions" target="_blank" className="text-blue-600 underline text-sm">Launch Demo</Link>
              </div>
              <p className="text-sm text-slate-700 mb-6">
                Calls <code>webkitEnterFullscreen</code> directly on the video element. Hides all chrome on iOS but
                the system UI obscures all React components (chat, custom buttons).
              </p>
              <ScreenshotComparison
                iosSrc="/ios_video_element.MP4"
                androidSrc=""
                isVideo={true}
              />
            </div>

            {/* Approach 4 */}
            <div className="p-6 border border-slate-200 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">4. WebKit Presentation Mode</h3>
                <Link href="/webkit-fs" target="_blank" className="text-blue-600 underline text-sm">Launch Demo</Link>
              </div>
              <p className="text-sm text-slate-700 mb-6">
                Experimental approach using <code>webkitSetPresentationMode</code> and React Portals.
                Attempted to force custom UI into the native video layers, but the layers remain occluded on iPhone.
              </p>
              <ScreenshotComparison
                iosSrc="/ios_webkit-presentation-mode.PNG"
                androidSrc="/android_webkit-presentation-mode.JPG"
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 italic">The iOS Fullscreen Paradox</h2>
          <div className="bg-slate-50 p-6 border rounded-lg font-mono text-sm">
            <p className="mb-4">iOS Safari enforces a binary choice:</p>
            <div className="ml-4 space-y-4">
              <p><strong>Option A:</strong> Hide toolbar (webkitEnterFullscreen)<br />- Result: Native video modal. All custom UI = invisible.</p>
              <p><strong>Option B:</strong> Keep custom UI (100dvh overlay)<br />- Result: Full DOM control. Browser toolbar = visible.</p>
            </div>
            <p className="mt-4 font-bold text-center border-t pt-4">THERE IS NO OPTION C</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Recommendation</h2>
          <p className="mb-4 text-slate-700 leading-relaxed">
            Adopt <strong>Approach 1 (AudienceStage)</strong>. Designing around the iOS toolbar (using 100dvh) while maintaining interactive chat and overlays is the only viable path for a social streaming application.
          </p>
          <p className="mb-4 text-sm text-slate-600 italic">
            For power users who demand a completely toolbar-free experience, suggest adding the site to their Home Screen as a PWA.
          </p>
        </section>

        <footer className="mt-20 pt-8 border-t text-xs text-slate-500 text-center">
          <p>Creator Stage Engineering — POC Documentation v1.0.5</p>
        </footer>
      </main>
    </div>
  );
}
