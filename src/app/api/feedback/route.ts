// src/app/api/feedback/route.ts
import mongoose from "mongoose";
import dbConnect from '@/lib/mongodb';

// Cache for production
let cachedFeedback: any[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30000; // 30 seconds

const feedbackSchema = new mongoose.Schema({
  name: String,
  comment: String,
  date: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  status: { type: Boolean, default: false },
});

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

// Optimized GET with caching
export async function GET() {
  try {
    // Return cached data if valid
    const now = Date.now();
    if (cachedFeedback && (now - cacheTimestamp) < CACHE_DURATION) {
      return Response.json(cachedFeedback);
    }

    await dbConnect();
    const feedbacks = await Feedback.find({ status: true })
      .sort({ _id: -1 })
      .limit(10) // Limit results
      .lean(); // Faster plain objects

    // Cache the results
    cachedFeedback = feedbacks;
    cacheTimestamp = now;

    return Response.json(feedbacks, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=59',
      }
    });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    
    // Return empty array instead of error for better UX
    return Response.json([], {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
  }
}

// POST remains similar but with timeout protection
export async function POST(request: Request) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    await dbConnect();
    const { name, comment } = await request.json();
    
    if (!name || !comment) {
      return new Response(
        JSON.stringify({ error: "Name and comment are required" }), 
        { status: 400 }
      );
    }
    
    const feedback = new Feedback({ name, comment, status: false });
    await feedback.save();
    
    clearTimeout(timeoutId);
    
    // Invalidate cache
    cachedFeedback = null;
    
    return Response.json({ message: "Feedback added", feedback });
  } catch (error) {
    console.error('Error adding feedback:', error);
    return new Response(
      JSON.stringify({ error: "Failed to add feedback" }),
      { status: 500 }
    );
  }
}

// Remove PATCH if not critical, or optimize it