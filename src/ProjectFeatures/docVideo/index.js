import TitleCard from "../../components/Cards/TitleCard";
import { useGetDoctorVideosQuery } from "../../features/videos/videosApi";
import { Play, Calendar, User, ExternalLink } from "lucide-react";

function DocVideos() {
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
  } = useGetDoctorVideosQuery(auth?.role);

  return (
    <TitleCard title="Videos" topMargin="mt-2">
      <div className="container py-10 px-4 sm:px-8">
        <div className="text-center mb-14">
          <h1 className=" text-3xl font-bold text-gray-700">
            🎥 Doctors Video Library
          </h1>
          <p className="text-lg text-gray-500 font-poppins ">
            Educational content on project management and software development
          </p>
        </div>
        {isLoading && (
          <div className="text-center text-gray-500 font-medium">
            Loading videos...
          </div>
        )}

        {isError && (
          <div className="text-center text-red-500 font-medium">
            Failed to load videos. {error?.data?.message || "Please try again."}
          </div>
        )}

        {!isLoading && !isError && videos?.data?.length === 0 && (
          <div className="text-center text-gray-500 font-medium">
            No videos available.
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos?.data?.map((video) => (
            <div
              key={video.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-lg overflow-hidden p-4 flex flex-col"
            >
              <div className="pb-3">
                <div className="flex items-start justify-between mb-3">

                  <span className="bg-green-100 text-green-800 border border-green-200 rounded-full px-2 py-0.5 text-xs font-medium">
                    {video.status.toUpperCase()}
                  </span>

                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" onClick={() => window.open(video.link, "_blank")}>
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 text-md leading-tight line-clamp-2 mb-2 font-poppins">git
                  {video.title}
                </h3>

                <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 font-poppins">
                  {video.description}
                </p>
              </div>


              <div className="pt-0 mt-auto">
                <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(video.created_at)}</span>
                  <User className="w-3 h-3 ml-2" />
                  <span>{video.type}</span>
                </div>


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
    </TitleCard>
  );
}

export default DocVideos;
