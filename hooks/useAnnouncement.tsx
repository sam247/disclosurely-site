'use client';

import { useState, useEffect } from 'react';

export interface Announcement {
  id: string;
  message: string;
  displayOnDashboard: boolean;
  displayOnFrontend: boolean;
  linkUrl?: string;
  linkText?: string;
}

export const useAnnouncement = () => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch announcement from API route
        const response = await fetch('/api/announcement');
        if (!response.ok) {
          throw new Error('Failed to fetch announcement');
        }

        const data = await response.json();
        if (data.announcement) {
          setAnnouncement(data.announcement);
        }
      } catch (err) {
        console.error('Error fetching announcement:', err);
        setError('Failed to fetch announcement');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, []);

  return { announcement, loading, error };
};

