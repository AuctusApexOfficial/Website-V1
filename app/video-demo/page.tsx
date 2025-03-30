import VideoPlayer from "@/components/video-player"
import VideoExamples from "@/components/video-examples"

export default function VideoDemo() {
  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-3xl font-bold mb-6">Video Embedding Examples</h1>

        <div className="mb-12">
          <h2 className="mb-4 font-serif text-2xl font-medium">Hero Video</h2>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <VideoPlayer
              src="https://res.cloudinary.com/din4iqtbu/video/upload/v1742370300/ennljsgefrx8y9evxowb.mp4"
              autoPlay
              muted
              loop
              controls={false}
              className="w-full"
            />
          </div>
        </div>

        <VideoExamples />
      </div>
    </div>
  )
}

