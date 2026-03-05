import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import { exercisesChest } from "./exercisevideo/exercises";

const ExerciseComponents = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    exercises,
    title = "Workout",
    day = "Routine",
    emoji = "💪",
    warmup = {},
  } = location.state || {};

  useEffect(() => {
    if (!exercises || exercises.length === 0) {
      navigate("/schedule", { replace: true });
    }
  }, [exercises, navigate]);

  if (!exercises || exercises.length === 0) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen md:w-[95rem] bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="mb-8 flex justify-start">
          <Link
            to="/schedule"
            className="group inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Schedule
          </Link>
        </div>

        {/* Header Card */}
        <div className="relative overflow-hidden bg-white rounded-3xl shadow-2xl mb-12 transform transition-all hover:scale-[1.01] duration-300">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-red-100 rounded-full flex items-center justify-center text-6xl md:text-7xl shadow-inner">
              {emoji}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
                {title} <span className="text-red-600">Workout</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 font-medium">
                {day} Routine • Time to build!
              </p>
            </div>
          </div>
        </div>

        {/* Warm Up Section */}
        <div className="mb-12">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gray-900 px-8 py-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-red-500 rounded-full"></span>
                Warm Up Routine
              </h2>
              <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                Essential
              </span>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                {/* Title 1 */}
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold mr-4 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    1
                  </div>
                  <div className="w-full pt-2">
                    <p className="text-lg font-semibold text-gray-800">
                      {warmup.title1}
                    </p>
                    {warmup.description && (
                      <p className="text-gray-500 text-sm mt-1">
                        {warmup.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Title 2 */}
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold mr-4 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    2
                  </div>
                  <div className="w-full pt-2">
                    <p className="text-lg font-semibold text-gray-800 mb-3">
                      {warmup.title2}{" "}
                      <span className="text-2xl ml-2">{warmup.emoji2}</span>
                    </p>
                    {warmup.sets && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                          <span className="block text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">
                            Beginner
                          </span>
                          <span className="block text-gray-900 font-bold">
                            {warmup.sets.beginner}
                          </span>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                          <span className="block text-xs font-bold text-yellow-600 uppercase tracking-wide mb-1">
                            Intermediate
                          </span>
                          <span className="block text-gray-900 font-bold">
                            {warmup.sets.intermediate}
                          </span>
                        </div>
                        <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                          <span className="block text-xs font-bold text-red-600 uppercase tracking-wide mb-1">
                            Advanced
                          </span>
                          <span className="block text-gray-900 font-bold">
                            {warmup.sets.advanced}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workout Videos Grid */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-8 bg-red-600 rounded-full"></span>
            <h2 className="text-3xl font-bold text-gray-900">Workout Guide</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col"
              >
                <div className="relative w-full pt-[56.25%] bg-gray-900">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={exercise.video}
                    title={exercise.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="p-6 flex-grow flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1 block">
                      Exercise {index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      {exercise.title}
                    </h3>
                  </div>
                  <span className="text-3xl">{exercise.emoji}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseComponents;
