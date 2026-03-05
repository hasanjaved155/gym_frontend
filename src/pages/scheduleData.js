import { exercisesBiceps } from "./exercises/exerciseBiceps";
import { exercisesCardio } from "./exercises/exerciseCardio";
import { exercisesLegs } from "./exercises/exerciseLegs";
import { exercisesShoulders } from "./exercises/exerciseShoulders";
import { exercisesChest } from "./exercises/exercisesChest";
import { exercisesTricep } from "./exercises/exercisesTricep";
import { exercisesBack } from "./exercises/exercisesback";

const schedule = [
  {
    day: "Monday",
    workout: "Chest",
    emoji: "🫀",
    color: "from-red-600 to-red-700",
    link: "/schedule/exercise_component",
    warmup: {
      title1: "5-10 minutes light cardio",
      description: "Treadmill or Elliptical to get blood flowing",

      title2: "Push-ups Activation",
      emoji2: "🤸",
      sets: {
        beginner: "2 sets x 15 reps",
        intermediate: "4 sets x 25 reps",
        advanced: "4 sets x 35+ reps",
      },
    },

    exercises: exercisesChest,
  },
  {
    day: "Tuesday",
    workout: "Triceps",
    emoji: "💪",
    color: "from-blue-600 to-blue-700",
    link: "/exercise_component",
    warmup: {
      title1: "5-10 minutes light cardio",
      description: "Rowing machine or Elliptical",

      title2: "Bench Dips",
      emoji2: "🦾",
      sets: {
        beginner: "2 sets x 10 reps",
        intermediate: "3 sets x 15 reps",
        advanced: "4 sets x 20+ reps",
      },
    },

    exercises: exercisesTricep,
  },
  {
    day: "Wednesday",
    workout: "Back",
    emoji: "🔙",
    color: "from-green-600 to-green-700",
    link: "/exercise_component",
    warmup: {
      title1: "5-10 minutes light cardio",
      description: "Rowing machine recommended",

      title2: "Pull-ups / Assisted",
      emoji2: "🧗",
      sets: {
        beginner: "2 sets x 5 reps",
        intermediate: "3 sets x 8 reps",
        advanced: "4 sets x 12+ reps",
      },
    },

    exercises: exercisesBack,
  },
  {
    day: "Thursday",
    workout: "Biceps",
    emoji: "💪",
    color: "from-yellow-600 to-yellow-700",
    link: "/exercise_component",
    warmup: {
      title1: "5-10 minutes light cardio",
      description: "Jump rope or Treadmill",

      title2: "Chin-ups",
      emoji2: "🏋️",
      sets: {
        beginner: "2 sets x 5 reps",
        intermediate: "3 sets x 8 reps",
        advanced: "4 sets x 12+ reps",
      },
    },

    exercises: exercisesBiceps,
  },
  {
    day: "Friday",
    workout: "Shoulders",
    emoji: "🤸",
    color: "from-purple-600 to-purple-700",
    link: "/exercise_component",
    warmup: {
      title1: "5-10 minutes light cardio",
      description: "Elliptical or Cycling",

      title2: "Arm Circles & Light Press",
      emoji2: "🙆",
      sets: {
        beginner: "2 sets x 15 reps",
        intermediate: "3 sets x 20 reps",
        advanced: "4 sets x 25+ reps",
      },
    },

    exercises: exercisesShoulders,
  },
  {
    day: "Saturday",
    workout: "Legs",
    emoji: "🦵",
    color: "from-pink-600 to-pink-700",
    link: "/exercise_component",
    warmup: {
      title1: "5-10 minutes light cardio",
      description: "Treadmill incline or Stairmaster",

      title2: "Bodyweight Squats",
      emoji2: "🦵",
      sets: {
        beginner: "2 sets x 15 reps",
        intermediate: "3 sets x 25 reps",
        advanced: "4 sets x 50+ reps",
      },
    },

    exercises: exercisesLegs,
  },
  {
    day: "Sunday",
    workout: "Cardio",
    emoji: "❤️",
    color: "from-indigo-600 to-indigo-700",
    link: "/exercise_component",
    warmup: {
      title1: "5 minutes dynamic stretching",
      description: "Leg swings, arm circles, torso twists",

      title2: "Light Jog / Walk",
      emoji2: "🏃",
      sets: {
        beginner: "5 minutes",
        intermediate: "10 minutes",
        advanced: "15 minutes",
      },
    },

    exercises: exercisesCardio,
  },
];

export default schedule;

{
  /* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {schedule.map((item, index) => {
              const Wrapper = item.link ? Link : "div";
              const props = item.link
                ? { to: "/exercise_component", state: { exercise: item } }
                : {};
              return (
                <Wrapper
                  key={index}
                  {...props}
                  className={`bg-gradient-to-br ${item.color} rounded-lg p-6 text-white shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 text-center block`}
                >
                  <div className="text-5xl mb-3">{item.emoji}</div>
                  <h3 className="text-lg font-bold mb-2">{item.day}</h3>
                  <p className="text-sm font-semibold opacity-90">
                    {item.workout}
                  </p>
                </Wrapper>
              );
            })}
          </div> */
}
