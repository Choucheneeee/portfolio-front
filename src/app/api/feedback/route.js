import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const feedbackSchema = new mongoose.Schema({
  name: String,
  comment: String,
  date: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  status: { type: Boolean, default: false }, // Add status field
});

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export async function GET() {
  await mongoose.connect(MONGO_URI);
  // Only return feedbacks with status true
  const feedbacks = await Feedback.find({ status: true }).sort({ _id: -1 });
  await mongoose.disconnect();
  return Response.json(feedbacks);
}

export async function POST(request) {
  await mongoose.connect(MONGO_URI);
  const { name, comment } = await request.json();
  if (!name || !comment) {
    await mongoose.disconnect();
    return new Response(JSON.stringify({ error: "Name and comment are required" }), { status: 400 });
  }
  // Explicitly set status to false
  const feedback = new Feedback({ name, comment, status: false });
  await feedback.save();
  await mongoose.disconnect();
  return Response.json({ message: "Feedback added", feedback });
}

// Update existing documents to have status field default to false if it doesn't exist
export async function PATCH() {
  await mongoose.connect(MONGO_URI);
  await Feedback.updateMany(
    { status: { $exists: false } },
    { $set: { status: false } }
  );
  await mongoose.disconnect();
}