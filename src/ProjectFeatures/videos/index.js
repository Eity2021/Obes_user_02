import TitleCard from "../../components/Cards/TitleCard";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import { Play, Calendar, User, ExternalLink } from "lucide-react";
function Videos() {
  // const videos = [
  //   {
  //     title: "Workout Routine",
  //     url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
  //   },
  //   {
  //     title: "Healthy Cooking",
  //     url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
  //   },
  //   {
  //     title: "Yoga for Beginners",
  //     url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
  //   },
  //   {
  //     title: "Meditation Guide",
  //     url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
  //   },
  //   {
  //     title: "Workout Routine",
  //     url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
  //   },
  //   {
  //     title: "Healthy Cooking",
  //     url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
  //   },
  //   {
  //     title: "Yoga for Beginners",
  //     url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
  //   },
  //   {
  //     title: "Meditation Guide",
  //     url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
  //   },
  //   {
  //     title: "Workout Routine",
  //     url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
  //   },
  //   {
  //     title: "Healthy Cooking",
  //     url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
  //   },
  //   {
  //     title: "Yoga for Beginners",
  //     url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
  //   },
  //   {
  //     title: "Meditation Guide",
  //     url: "https://www.youtube.com/embed/76HQy9NxNU0?si=N-1qxCAhiLhsb59w",
  //   },
  // ];
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };



  const auth = JSON.parse(localStorage.getItem("auth"));
  const {
    data: videos,
    isLoading,
    isError,
    error,
  } = useGetVideosQuery(auth?.role);


  console.log("videos", videos)
  return (
    <>
      <TitleCard title="Videos" topMargin="mt-2">
        <div>
          <div className="container  py-10 px-4 sm:px-8">
            <div className="text-center mb-14">
              <h1 className=" text-3xl font-bold text-gray-800">
                🎥 Video Library
              </h1>
              <p className="text-lg text-gray-600 font-poppins ">
                Educational content on project management and software development
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {videos?.data?.map((video) => (
                <div
                  key={video.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-lg overflow-hidden p-4 flex flex-col"
                >
                  {/* Card Header */}
                  <div className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      {/* Badge */}
                      <span className="bg-green-100 text-green-800 border border-green-200 rounded-full px-2 py-0.5 text-xs font-medium">
                        {video.status.toUpperCase()}
                      </span>
                      {/* Play Icon Circle */}
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      </div>
                    </div>
                    {/* Title */}
                    <h3 className="font-bold text-gray-900 text-md leading-tight line-clamp-2 mb-2 font-poppins">
                      {video.title}
                    </h3>
                    {/* Description */}
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 font-poppins">
                      {video.description}
                    </p>
                  </div>

                  {/* Card Content */}
                  <div className="pt-0 mt-auto">
                    <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(video.created_at)}</span>
                      <User className="w-3 h-3 ml-2" />
                      <span>{video.type}</span>
                    </div>

                    {/* Watch Video Button */}
                    <button
                      onClick={() => window.open(video.link, "_blank")}
                      className="w-full flex items-center justify-center gap-1 bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-secondary text-white font-medium text-xs py-2 px-3 rounded-md group-hover:shadow-lg transition-all"
                    >
                      <Play className="w-3 h-3" />
                      Watch Video
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
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
