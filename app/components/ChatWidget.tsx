"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; text: string };

const QUICK_ACTIONS = [
  "Product Inquiry",
  "Regulatory Requirements",
  "Request Quotation",
  "Shipping Info",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Welcome to WonnyMed. How can we help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: text.trim() }]);
    setInput("");
    setLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Thank you for your inquiry. Our sourcing team will review your request and get back to you within 24 hours. For urgent matters, please contact us via WhatsApp at +1 (561) 596-6097.",
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#0d4f82] text-white shadow-lg transition-transform hover:scale-105"
        style={{ animation: open ? "none" : "chatPulse 2s infinite" }}
      >
        {open ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 20.25V3.75m16.5 0v16.5M3.75 20.25h16.5M3.75 3.75h16.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-[72px] right-5 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden border border-[#d9d9d9] bg-white shadow-xl" style={{ borderRadius: 4 }}>
          {/* Header */}
          <div className="flex items-center justify-between bg-[#0d4f82] px-4 py-3">
            <div>
              <p className="text-[13px] font-semibold text-white">WonnyMed Support</p>
              <p className="text-[10px] text-white/60">AI-Powered · 24/7</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3" style={{ scrollbarWidth: "thin" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 text-[12px] leading-[1.5] ${
                    msg.role === "user"
                      ? "bg-[#0d4f82] text-white"
                      : "border border-[#e8e8e8] bg-[#f5f7fa] text-[#333]"
                  }`}
                  style={{ borderRadius: 4 }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div className="mb-2 flex justify-start">
                <div className="flex gap-1 border border-[#e8e8e8] bg-[#f5f7fa] px-3 py-2" style={{ borderRadius: 4 }}>
                  <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-[#999]" style={{ animationDelay: "0ms" }} />
                  <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-[#999]" style={{ animationDelay: "150ms" }} />
                  <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-[#999]" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {/* Quick actions — show only if 1 message */}
            {messages.length === 1 && !loading && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {QUICK_ACTIONS.map((a) => (
                  <button
                    key={a}
                    onClick={() => send(a)}
                    className="border border-[#0d4f82] px-2.5 py-1 text-[11px] font-medium text-[#0d4f82] hover:bg-[#0d4f82] hover:text-white"
                    style={{ borderRadius: 2 }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[#e8e8e8] p-2">
            <div className="flex gap-1.5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Type your message..."
                className="flex-1 border border-[#d9d9d9] px-3 py-2 text-[12px] text-[#333] placeholder:text-[#bbb] focus:border-[#0d4f82] focus:outline-none"
                style={{ borderRadius: 2 }}
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim()}
                className="bg-[#0d4f82] px-3 py-2 text-white disabled:opacity-40"
                style={{ borderRadius: 2 }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pulse animation */}
      <style jsx>{`
        @keyframes chatPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(13, 79, 130, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(13, 79, 130, 0); }
        }
      `}</style>
    </>
  );
}
