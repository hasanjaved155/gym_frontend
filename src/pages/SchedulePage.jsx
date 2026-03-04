import { useNavigate } from "react-router-dom";
import schedule from "./scheduleData";

export default function SchedulePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">
              Weekly Gym Schedule
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Follow our structured weekly workout plan for maximum results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {schedule.map((item, index) => {
              const hasExercises = item.exercises && item.exercises.length > 0;
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
                  className={`bg-gradient-to-br ${item.color} rounded-lg p-6 text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center block ${hasExercises ? "cursor-pointer" : "cursor-not-allowed"}`}
                >
                  <div className="text-5xl mb-3">{item.emoji}</div>
                  <h3 className="text-lg font-bold mb-2">{item.day}</h3>
                  <p className="text-sm font-semibold opacity-90">
                    {item.workout}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Summary Box */}
          <div className="mt-12 bg-slate-800 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">💡 Pro Tip</h3>
            <p className="text-slate-300 text-lg">
              Follow this weekly routine for balanced muscle development. Rest
              days are important - take one complete rest day per week or swap
              cardio with any other muscle group based on your goals.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
