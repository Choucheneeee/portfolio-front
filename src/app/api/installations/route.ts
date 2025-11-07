// src/app/api/installations/route.ts
import mongoose from "mongoose";
import dbConnect from '@/lib/mongodb';

const installationSchema = new mongoose.Schema({
  // Basic identification
  userAgent: String,
  platform: String,
  language: String,
  timezone: String,
  
  // Network information
  ip: String,
  
  // Hardware information (will be sent from client)
  deviceMemory: Number,
  hardwareConcurrency: Number,
  screenResolution: String,
  
  // Browser capabilities
  cookiesEnabled: Boolean,
  javaEnabled: Boolean,
  
  // Installation context
  referrer: String,
  url: String,
  
  timestamp: { type: Date, default: Date.now },
});

const Installation = mongoose.models.Installation || mongoose.model("Installation", installationSchema);

function getClientIP(request: Request) {
  const headers = [
    'x-forwarded-for',
    'x-real-ip',
    'cf-connecting-ip',
    'x-client-ip',
    'true-client-ip'
  ];
  
  for (const header of headers) {
    const value = request.headers.get(header);
    if (value) {
      return value.split(',')[0].trim();
    }
  }
  
  return 'unknown';
}

export async function GET() {
  try {
    await dbConnect();
    
    const totalInstallations = await Installation.countDocuments();
    const installationsByPlatform = await Installation.aggregate([
      { $group: { _id: '$platform', count: { $sum: 1 } } }
    ]);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentInstallations = await Installation.countDocuments({ 
      timestamp: { $gte: thirtyDaysAgo } 
    });

    return Response.json({
      totalInstallations,
      recentInstallations,
      installationsByPlatform,
      success: true
    });

  } catch (error) {
    console.error('Error fetching installation stats:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch installation stats' }),
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    // Get ALL data from the client, don't try to access browser APIs here
    const installationData = await request.json();

    const installation = new Installation({
      ...installationData,
      ip: getClientIP(request), // This is server-side, so it's fine
    });

    await installation.save();

    return Response.json({ 
      success: true, 
      installationId: installation._id 
    });

  } catch (error) {
    console.error('Error tracking installation:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to track installation' }),
      { status: 500 }
    );
  }
}