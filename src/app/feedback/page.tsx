"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import InfiniteScroll from '../InfiniteScroll';

type Feedback = {
  name: string;
  comment: string;
  date: string;
  status?: boolean; // Add status field
};

const initialFeedbacks: Feedback[] = [];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("opacity-100", "translate-y--5");
          node.classList.remove("opacity-0", "translate-y-3");
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch feedbacks from API on mount
  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        // Only set feedbacks with status true
        if (Array.isArray(data)) setFeedbacks(data.filter(fb => fb.status === true));
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, comment }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(
          "✅ Your feedback will be analysed by Chouchene Mohamed Amine. After approval, it will be displayed."
        );
        setName("");
        setComment("");
      } else {
        setSuccessMsg("");
        alert(data.error || "Failed to add feedback");
      }
    } catch (err) {
      setSuccessMsg("");
      alert("Server error");
    }
    setSubmitting(false);
  };

  // Prepare items for InfiniteScroll
  const items = useMemo(
    () => [
      ...feedbacks.map((fb, idx) => ({
        content: (
          <div
            key={fb.name + fb.date + idx}
            className="bg-[#112240]/80 border border-[#233554] rounded-xl shadow-md p-5 my-2 w-full sm:w-[340px] max-w-full"
          >
            <div className="flex items-center mb-2">
              <span className="text-[#64FFDA] font-bold mr-2">{fb.name}</span>
              <span className="text-xs text-[#bfc9d9]">{fb.date}</span>
            </div>
            <div className="text-[#bfc9d9]">{fb.comment}</div>
          </div>
        ),
      })),
      {
        content: (
          <div className="flex justify-center items-center my-6">
            <span className="px-4 py-2 rounded-full bg-[#64FFDA]/20 text-[#64FFDA] font-semibold text-base border border-[#64FFDA]">
              ⟳ End of feedbacks — list will replay
            </span>
          </div>
        ),
      },
    ],
    [feedbacks]
  );

  // Dynamic height/minHeight based on feedback count
  const feedbackCount = feedbacks.length;
  let containerHeight = 200;
  let containerMinHeight = 120;

  if (feedbackCount === 1) {
    containerHeight = 200;
    containerMinHeight = 180;
  } else if (feedbackCount === 2) {
    containerHeight = 250;
    containerMinHeight = 250;
  } else if (feedbackCount > 2) {
    containerHeight = 600;
    containerMinHeight = 300;
  }

  return (
    <section
      id="feed"
      className="min-h-[120vh] flex flex-col items-center justify-center bg-[#0A192F]/80 backdrop-blur-sm px-4 py-24"
    >
      <h1 className="text-4xl font-extrabold text-white mb-10 tracking-tight">Feedback</h1>
      <div
        style={{
          height: containerHeight,
          minHeight: containerMinHeight,
          position: 'relative',
          marginBottom: feedbackCount === 0 ? 24 : 40,
          transition: 'all 0.3s',
        }}
        className="w-full max-w-2xl"
      >
        {feedbackCount === 0 ? (
          <div className="text-[#bfc9d9] text-center text-lg mt-10">No feedbacks yet.</div>
        ) : feedbackCount < 3 ? (
          <div className="flex flex-col items-center gap-4">
            {feedbacks.map((fb, idx) => (
              <div
                key={fb.name + fb.date + idx}
                className="bg-[#112240]/80 border border-[#233554] rounded-xl shadow-md p-5 my-2 w-full sm:w-[340px] max-w-full"
              >
                <div className="flex items-center mb-2">
                  <span className="text-[#64FFDA] font-bold mr-2">{fb.name}</span>
                  <span className="text-xs text-[#bfc9d9]">{fb.date}</span>
                </div>
                <div className="text-[#bfc9d9]">{fb.comment}</div>
              </div>
            ))}
          </div>
        ) : (
          <InfiniteScroll
            items={items}
            height={600}
            speed={0.15}
            pauseOnHover={true}
            className="w-full max-w-2xl mx-auto mb-10"
          />
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#112240]/80 rounded-2xl shadow-lg p-6 border border-[#233554] flex flex-col gap-4 animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-[#64FFDA] mb-2 text-center">Add Your Feedback</h2>
        <input
          type="text"
          placeholder="Your Name"
          className="rounded-lg px-4 py-2 bg-[#0A192F]/80 backdrop-blur-sm text-white border border-[#233554] focus:outline-none focus:border-[#64FFDA] transition-all"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
        />
        <textarea
          placeholder="Your Feedback"
          className="rounded-lg px-4 py-2 bg-[#0A192F]/80 backdrop-blur-sm text-white border border-[#233554] focus:outline-none focus:border-[#64FFDA] transition-all min-h-[80px]"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={submitting}
        />
        <button
          type="submit"
          className={`self-end px-6 py-2 rounded-lg bg-[#64FFDA] text-[#0A192F] font-bold shadow hover:bg-[#52e0c4] transition-colors duration-300 ${
            submitting ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Add Feedback"}
        </button>
      </form>
      {successMsg && (
        <div className="mt-4 text-green-400 text-center font-semibold">{successMsg}</div>
      )}
    </section>
  );
}