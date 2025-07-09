import TitleCard from "../../components/Cards/TitleCard";

function Videos() {
  const videos = [
    {
      title: "Workout Routine",
      url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
    },
    {
      title: "Healthy Cooking",
      url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
    },
    {
      title: "Yoga for Beginners",
      url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
    },
    {
      title: "Meditation Guide",
      url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
    },
    {
      title: "Workout Routine",
      url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
    },
    {
      title: "Healthy Cooking",
      url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
    },
    {
      title: "Yoga for Beginners",
      url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
    },
    {
      title: "Meditation Guide",
      url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
    },
    {
      title: "Workout Routine",
      url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
    },
    {
      title: "Healthy Cooking",
      url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
    },
    {
      title: "Yoga for Beginners",
      url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
    },
    {
      title: "Meditation Guide",
      url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
    },
  ];
  return (
    <>
      <TitleCard title="Videos" topMargin="mt-2">
        <div>
          <div className="container  py-10 px-4 sm:px-8">
            <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
              🎥 Video Gallery
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-[#d1d1cf] bg-white p-4 shadow-sm"
                  style={{ fontFamily: "poppins" }}
                >
                  <div className="aspect-video overflow-hidden rounded">
                    <iframe
                      src={video.url}
                      title={video.title}
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                  <h2 className="mt-3 text-sm font-semibold text-gray-700">
                    {video.title}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default Videos;
