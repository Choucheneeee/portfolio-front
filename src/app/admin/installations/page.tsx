// src/app/admin/installations/page.tsx
"use client";

import { useState, useEffect } from 'react';

interface InstallationStats {
  totalInstallations: number;
  recentInstallations: number;
  installationsByPlatform: Array<{ _id: string; count: number }>;
}

export default function InstallationsAdmin() {
  const [stats, setStats] = useState<InstallationStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/installations');
      const data = await response.json();
      if (data.success) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">Loading installation statistics...</div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-red-600">Failed to load installation statistics</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          PWA Installation Analytics
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Total Installations
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {stats.totalInstallations.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Recent (30 days)
            </h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {stats.recentInstallations.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Installations by Platform
          </h3>
          <div className="space-y-2">
            {stats.installationsByPlatform.map((platform) => (
              <div key={platform._id} className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">{platform._id}</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {platform.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}