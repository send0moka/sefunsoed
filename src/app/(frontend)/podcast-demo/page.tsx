import React from 'react'
import { PodcastBlock } from '@/blocks/PodcastBlock/Component'

// Demo usage of PodcastBlock with Spotify embed
const PodcastSpotifyDemo = () => {
  return (
    <PodcastBlock
      id="spotify-demo"
      title="Listen to Our Podcasts on Spotify"
      spotifyUrl="https://open.spotify.com/show/7MoeAljOnuz3QVMjptb5TQ?si=9zJzTPRUQMutRcUvp4KJiQ"
      useCustomPlayer={false}
      spotifyEmbedCode={`
        <iframe 
          style="border-radius:12px" 
          src="https://open.spotify.com/embed/show/7MoeAljOnuz3QVMjptb5TQ?utm_source=generator&theme=0" 
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowfullscreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          title="Spotify Podcast Show">
        </iframe>
      `}
    />
  )
}

// Demo usage of PodcastBlock with custom player
const PodcastCustomDemo = () => {
  return (
    <PodcastBlock
      id="custom-demo"
      title="Listen to Our Podcasts on Spotify"
      spotifyUrl="https://open.spotify.com/show/7MoeAljOnuz3QVMjptb5TQ?si=9zJzTPRUQMutRcUvp4KJiQ"
      useCustomPlayer={true}
      episode={{
        id: 'demo-episode-1',
        title: 'Getting Started with React Development',
        description:
          'In this episode, we discuss the fundamentals of React development, including components, state management, and best practices for building modern web applications.',
        publishedDate: '2024-01-15',
        coverImage: '/media/image-hero1.webp',
        audioFile: '/media/sample-podcast.mp3', // Local test audio file
        duration: 381, // 6:21 in seconds
      }}
    />
  )
}

// Demo page component
const PodcastDemoPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Podcast Block Demo</h1>
        <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          This page demonstrates two ways to use the PodcastBlock component: with Spotify embed and
          with a custom audio player.
        </p>

        {/* Spotify Embed Demo */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">Spotify Embed Version</h2>
            <p className="text-neutral-600">Uses Spotify&apos;s embedded player</p>
          </div>
          <PodcastSpotifyDemo />
        </div>

        {/* Custom Player Demo */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">Custom Audio Player Version</h2>
            <p className="text-neutral-600">Uses a custom player with local MP3 files</p>
          </div>
          <PodcastCustomDemo />
        </div>

        {/* Setup Instructions */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-6">Setup Instructions</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">For Spotify Embed:</h4>
              <ol className="list-decimal list-inside space-y-2 text-neutral-700">
                <li>Go to your Spotify podcast page</li>
                <li>Click &quot;Share&quot; → &quot;Embed episode&quot;</li>
                <li>Copy the iframe code</li>
                <li>Paste it in the Spotify Embed Code field</li>
                <li>Set &quot;Use Custom Player&quot; to false</li>
              </ol>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">For Custom Player:</h4>
              <ol className="list-decimal list-inside space-y-2 text-neutral-700">
                <li>
                  Upload MP3 file to{' '}
                  <code className="bg-neutral-100 px-2 py-1 rounded text-sm">/public/media/</code>
                </li>
                <li>Set &quot;Use Custom Player&quot; to true</li>
                <li>Fill in episode details (title, description, date)</li>
                <li>Set audio file path (e.g., /media/episode1.mp3)</li>
                <li>Optionally add cover image and duration</li>
              </ol>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h5 className="font-semibold mb-2">Features of Custom Player:</h5>
            <ul className="list-disc list-inside space-y-1 text-neutral-700">
              <li>✅ Play/Pause button with visual feedback</li>
              <li>✅ Progress bar with click-to-seek</li>
              <li>✅ Time display (current / total)</li>
              <li>✅ Remaining time indicator</li>
              <li>✅ Responsive design</li>
              <li>✅ Loading states</li>
              <li>✅ Link to Spotify for more episodes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PodcastDemoPage
