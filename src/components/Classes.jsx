export default function Classes() {
  const classes = [
    {
      id: 1,
      name: "Strength Training",
      icon: "🏋️",
      description:
        "Build muscle and increase overall strength with our professional trainers.",
      schedule: "Mon, Wed, Fri - 6:00 AM",
      level: "All Levels",
    },
    {
      id: 2,
      name: "Yoga & Flexibility",
      icon: "🧘",
      description:
        "Improve flexibility, balance and mental clarity with guided yoga sessions.",
      schedule: "Tue, Thu, Sat - 7:00 AM",
      level: "All Levels",
    },
    {
      id: 3,
      name: "Cardio Blast",
      icon: "🏃",
      description:
        "High-intensity cardio workouts to burn calories and boost endurance.",
      schedule: "Daily - 5:30 PM",
      level: "Intermediate",
    },
    {
      id: 4,
      name: "CrossFit",
      icon: "⚡",
      description:
        "Functional fitness training combining weightlifting, gymnastics, and cardio.",
      schedule: "Mon, Wed, Fri - 7:00 PM",
      level: "Advanced",
    },
    {
      id: 5,
      name: "Zumba & Dance",
      icon: "💃",
      description:
        "Fun and energetic dance-based workout that burns calories while having fun.",
      schedule: "Wed, Sat - 6:00 PM",
      level: "All Levels",
    },
    {
      id: 6,
      name: "Swimming",
      icon: "🏊",
      description:
        "Full-body workout with low impact on joints. Professional swimming classes.",
      schedule: "Tue, Thu, Sun - 4:00 PM",
      level: "All Levels",
    },
  ];

  return (
    <section id="classes" className="bg-light py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Our Classes
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our diverse range of fitness classes designed for all
            fitness levels and goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow overflow-hidden group"
            >
              <div className="bg-gradient-to-br from-primary to-orange-600 h-24 flex items-center justify-center">
                <span className="text-5xl">{cls.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-dark mb-2">
                  {cls.name}
                </h3>
                <p className="text-gray-600 mb-4">{cls.description}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Schedule:</span>{" "}
                    {cls.schedule}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Level:</span> {cls.level}
                  </p>
                </div>
                <button className="w-full bg-primary hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition">
                  Join Class
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
