/**
 * YouTube API Integration
 * Retrieves the latest video or live stream from a specific channel.
 */

export interface YouTubeVideoInfo {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  isLive: boolean;
}

export async function getLatestYouTubeVideo(): Promise<YouTubeVideoInfo | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  // If the user provided a specific channel ID, use it. Otherwise, we can use a known default or require it.
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    console.warn('YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID is not defined in .env.local');
    return null;
  }

  try {
    // We use the search endpoint to find the latest video or active live stream.
    // By setting eventType=live, we would ONLY get live streams.
    // But we want the latest video (which could be live or a past VOD).
    // So we search for the latest video. If it's live, snippet.liveBroadcastContent will be "live".
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=1&key=${apiKey}`;

    // Revalidate every 5 minutes (300 seconds) to avoid exceeding YouTube API quotas
    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      console.error('YouTube API error:', await res.text());
      return null;
    }

    const data = await res.json();

    if (data.items && data.items.length > 0) {
      const item = data.items[0];
      return {
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
        isLive: item.snippet.liveBroadcastContent === 'live',
      };
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch from YouTube API:', error);
    return null;
  }
}
