// src/app/api/installations/route.ts
import mongoose from "mongoose";
import dbConnect from '@/lib/mongodb';

const installationSchema = new mongoose.Schema({
  userAgent: String,
  platform: String,
  timestamp: { type: Date, default: Date.now },
});

const Installation = mongoose.models.Installation || mongoose.model("Installation", installationSchema);

// Cache for stats
let cachedStats: any = null;
let statsCacheTime = 0;

export async function GET() {
  try {
    // Return cached stats if recent (5 minutes)
    const now = Date.now();
    if (cachedStats && (now - statsCacheTime) < 300000) {
      return Response.json(cachedStats);
    }

    await dbConnect();
    
    const totalInstallations = await Installation.countDocuments();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentInstallations = await Installation.countDocuments({ 
      timestamp: { $gte: thirtyDaysAgo } 
    });

    const stats = {
      totalInstallations,
      recentInstallations,
      success: true
    };

    // Cache the stats
    cachedStats = stats;
    statsCacheTime = now;

    return Response.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=300', // 5 minutes
      }
    });

  } catch (error) {
    console.error('Error fetching installation stats:', error);
    return Response.json({ 
      totalInstallations: 0,
      recentInstallations: 0,
      success: false 
    });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const installationData = await request.json();

    const installation = new Installation({
      ...installationData,
      timestamp: new Date(),
    });

    await installation.save();

    // Invalidate stats cache
    cachedStats = null;

    return Response.json({ 
      success: true, 
      installationId: installation._id 
    });

  } catch (error) {
    console.error('Error tracking installation:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to track installation' 
    }, { status: 500 });
  }
}