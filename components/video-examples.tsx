import VideoPlayer from "./video-player"

export default function VideoExamples() {
  return (
    <div className="space-y-8 py-8">
      <div>
        <h2 className="mb-4 font-serif text-2xl font-medium">YouTube Video</h2>
        <VideoPlayer
          src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          type="youtube"
          title="YouTube Video Example"
          className="rounded-lg overflow-hidden shadow-lg"
        />
      </div>

      <div>
        <h2 className="mb-4 font-serif text-2xl font-medium">Vimeo Video</h2>
        <VideoPlayer
          src="https://vimeo.com/148751763"
          type="vimeo"
          title="Vimeo Video Example"
          className="rounded-lg overflow-hidden shadow-lg"
        />
      </div>

      <div>
        <h2 className="mb-4 font-serif text-2xl font-medium">Self-hosted MP4 Video</h2>
        <VideoPlayer
          src="https://res.cloudinary.com/din4iqtbu/video/upload/v1742370300/ennljsgefrx8y9evxowb.mp4"
          type="mp4"
          poster="/placeholder.svg?height=720&width=1280"
          title="MP4 Video Example"
          className="rounded-lg overflow-hidden shadow-lg"
        />
      </div>

      <div>
        <h2 className="mb-4 font-serif text-2xl font-medium">Auto-detected Video Type</h2>
        <VideoPlayer
          src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          title="Auto-detected Video Example"
          className="rounded-lg overflow-hidden shadow-lg"
        />
      </div>

      <div>
        <h2 className="mb-4 font-serif text-2xl font-medium">Custom Aspect Ratio (1:1)</h2>
        <VideoPlayer
          src="https://res.cloudinary.com/din4iqtbu/video/upload/v1742370300/ennljsgefrx8y9evxowb.mp4"
          aspectRatio="1:1"
          className="rounded-lg overflow-hidden shadow-lg max-w-md mx-auto"
        />
      </div>
    </div>
  )
}

