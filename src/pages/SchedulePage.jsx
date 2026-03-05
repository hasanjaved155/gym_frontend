import { useNavigate } from "react-router-dom";
import schedule from "./scheduleData";

export default function SchedulePage() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden pt-24 pb-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6 animate-fade-in">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 text-white">
              <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
              WEEKLY STRUCTURE
            </div>
          </div>

          <h1
            className="text-5xl md:text-7xl font-black mb-6 text-white overflow-hidden animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="block">Your Fitness</span>
            <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Weekly Schedule
            </span>
          </h1>

          <p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Follow our scientifically designed 7-day workout plan. Each day
            targets different muscle groups for optimal results and recovery.
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mb-12">
          {schedule.map((item, index) => {
            const hasExercises = item.exercises && item.exercises.length > 0;
            const colors = [
              "from-red-600/80 to-red-700/80",
              "from-orange-600/80 to-orange-700/80",
              "from-yellow-600/80 to-yellow-700/80",
              "from-red-500/80 to-orange-500/80",
              "from-orange-500/80 to-yellow-500/80",
              "from-red-700/80 to-yellow-600/80",
              "from-purple-600/80 to-indigo-600/80",
            ];

            return (
              <div
                key={index}
                onClick={() => {
                  if (hasExercises) {
                    navigate("/exercise_component", {
                      state: {
                        exercises: item.exercises,
                        title: item.workout,
                        day: item.day,
                        emoji: item.emoji,
                        warmup: item.warmup,
                      },
                    });
                  }
                }}
                className={`group relative animate-fade-in ${hasExercises ? "cursor-pointer" : "cursor-not-allowed opacity-75"}`}
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500 -z-10"></div>

                {/* Card */}
                <div
                  className={`relative bg-gradient-to-br ${colors[index]} backdrop-blur-xl rounded-2xl p-8 text-white border border-white/10 shadow-xl hover:shadow-2xl hover:border-white/30 transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-2 h-full flex flex-col justify-center items-center`}
                >
                  {/* Day Number Badge */}
                  <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white/80 border border-white/20">
                    Day {index + 1}
                  </div>

                  {/* Emoji */}
                  <div
                    className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 animate-bounce"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.emoji}
                  </div>

                  {/* Day Name */}
                  <h3 className="text-2xl font-black mb-2 text-center">
                    {item.day}
                  </h3>

                  {/* Workout Type */}
                  <p className="text-sm font-semibold text-white/90 text-center mb-4">
                    {item.workout}
                  </p>

                  {/* Status Indicator */}
                  {hasExercises ? (
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Ready
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 bg-gray-500/20 px-3 py-1 rounded-full text-xs font-semibold">
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                      Rest Day
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in hover:bg-white/15 transition-all duration-300"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">💪</div>
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-widest">
                  Training Days
                </p>
                <p className="text-3xl font-black text-white">6 Days</p>
              </div>
            </div>
          </div>

          <div
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in hover:bg-white/15 transition-all duration-300"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">😴</div>
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-widest">
                  Rest Days
                </p>
                <p className="text-3xl font-black text-white">1 Day</p>
              </div>
            </div>
          </div>

          <div
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 animate-fade-in hover:bg-white/15 transition-all duration-300"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">🎯</div>
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-widest">
                  Focus
                </p>
                <p className="text-3xl font-black text-white">Total Body</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tips Section */}
        <div
          className="relative animate-fade-in"
          style={{ animationDelay: "0.9s" }}
        >
          {/* Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur-2xl"></div>

          <div className="relative bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-10 md:p-12 hover:border-white/40 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="text-6xl flex-shrink-0">💡</div>
              <div>
                <h3 className="text-3xl font-black text-white mb-3">
                  Pro Tips for Maximum Results
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold mt-1">✓</span>
                    <span>
                      <span className="font-semibold text-white">
                        Rest is crucial
                      </span>{" "}
                      - Take one complete rest day per week for muscle recovery
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold mt-1">✓</span>
                    <span>
                      <span className="font-semibold text-white">
                        Stay consistent
                      </span>{" "}
                      - Follow this routine for 8-12 weeks for best results
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold mt-1">✓</span>
                    <span>
                      <span className="font-semibold text-white">
                        Proper nutrition
                      </span>{" "}
                      - Combine workouts with balanced diet for optimal gains
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold mt-1">✓</span>
                    <span>
                      <span className="font-semibold text-white">
                        Track progress
                      </span>{" "}
                      - Click on any day to see detailed exercises and track
                      your improvements
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
}
