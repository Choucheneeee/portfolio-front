// src/app/api/feedback/route.ts
import mongoose from "mongoose";
import dbConnect from '@/lib/mongodb';

const feedbackSchema = new mongoose.Schema({
  name: String,
  comment: String,
  date: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  status: { type: Boolean, default: false },
});

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export async function GET() {
  try {
    await dbConnect();
    const feedbacks = await Feedback.find({ status: true }).sort({ _id: -1 });
    return Response.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch feedbacks" }),
      { status: 500 }
    );
  }
}

// FIX: Add Request type to the request parameter
export async function POST(request: Request) {
  try {
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
    
    return Response.json({ message: "Feedback added", feedback });
  } catch (error) {
    console.error('Error adding feedback:', error);
    return new Response(
      JSON.stringify({ error: "Failed to add feedback" }),
      { status: 500 }
    );
  }
}

export async function PATCH() {
  try {
    await dbConnect();
    await Feedback.updateMany(
      { status: { $exists: false } },
      { $set: { status: false } }
    );
    
    return Response.json({ message: "Feedback status updated" });
  } catch (error) {
    console.error('Error updating feedback status:', error);
    return new Response(
      JSON.stringify({ error: "Failed to update feedback status" }),
      { status: 500 }
    );
  }
}