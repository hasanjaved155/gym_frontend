import { Link } from "react-router-dom";
import pushup from "./exercisevideo/male-Bodyweight-push-up-front.mp4";
import benchpress from "./exercisevideo/male-barbell-bench-press-front.mp4";
import cablechestpress from "./exercisevideo/male-cable-chestpress-front.mp4";
import dumbbellInclineChestPress from "./exercisevideo/male-dumbbell-incline-bench-press-front_q2q0T12.mp4";
import butterFly from "./exercisevideo/male-Machine-machine-butter-fly-side.mp4";
import chestPress from "./exercisevideo/male-Machine-machine-chest-press-front.mp4";

const Chest = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to="/schedule"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
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

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
            <div className="flex items-center gap-4">
              <span className="text-5xl">🫀</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Chest Workout
                </h1>
                <p className="text-red-100 mt-2 font-medium">Monday Routine</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
                Warm Up
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  5-10 minutes light cardio (Treadmill/Elliptical)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-1.5"></span>
                  <div>
                    <span className="font-semibold">Push-ups</span>
                    <div className="pl-2 mt-2 space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <span className="font-medium text-blue-600 w-24">
                          Beginner:
                        </span>
                        <span>2 sets of 15 reps</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium text-yellow-600 w-24">
                          Intermediate:
                        </span>
                        <span>4 sets of 25 reps</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium text-red-600 w-24">
                          Advanced:
                        </span>
                        <span>4 sets of 35+ reps</span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                Workout Guide Video
              </h2>
              <div className="grid grid-cols-2 justify-between gap-16">
                <div>
                  <h2 className="font-bold text-gray-900 mb-4">1.Push Up</h2>
                  <div className="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={pushup}
                      title="Chest Workout Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div>
                  <h2 className=" font-bold text-gray-900 mb-4">
                    2.Bench Press
                  </h2>
                  <div className="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={benchpress}
                      title="Chest Workout Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 mb-4">
                    3.Cable Chest Press
                  </h2>
                  <div className="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={cablechestpress}
                      title="Chest Workout Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div>
                  <h2 className=" font-bold text-gray-900 mb-4">
                    4.Dumbbell Incline Chest Press
                  </h2>
                  <div className="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={dumbbellInclineChestPress}
                      title="Chest Workout Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 mb-4">5.Butter Fly</h2>
                  <div className="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={butterFly}
                      title="Chest Workout Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 mb-4">
                    6.Chest Press
                  </h2>
                  <div className="relative w-full pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={chestPress}
                      title="Chest Workout Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chest;
