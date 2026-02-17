export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Raj Kumar",
      role: "Software Engineer",
      image: "👨‍💼",
      testimonial:
        "Pandey Gym transformed my fitness journey! The trainers are incredibly knowledgeable and supportive. I've never felt more motivated.",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Singh",
      role: "Marketing Manager",
      image: "👩‍💼",
      testimonial:
        "The variety of classes keeps me engaged every day. From yoga to CrossFit, there's something for everyone. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "Arjun Malik",
      role: "Entrepreneur",
      image: "👨‍💼",
      testimonial:
        "Amazing facilities and the best training programs I've been part of. The nutrition consultations were game-changers for my fitness goals.",
      rating: 5,
    },
    {
      id: 4,
      name: "Neha Sharma",
      role: "Fitness Enthusiast",
      image: "👩‍🦰",
      testimonial:
        "The community here is incredible. Everyone motivates each other, and the environment is so positive. Best membership ever!",
      rating: 5,
    },
    {
      id: 5,
      name: "Vikram Patel",
      role: "Student",
      image: "👨‍🎓",
      testimonial:
        "Started my fitness journey here 6 months ago. The results are amazing and the trainers make sure you're doing exercises correctly.",
      rating: 5,
    },
    {
      id: 6,
      name: "Anjali Desai",
      role: "Housewife",
      image: "👩",
      testimonial:
        "Perfect gym for beginners like me. The trainers are patient and the classes are well-structured. Loving it!",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="bg-light py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Success Stories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear from our members who have transformed their lives at Pandey
            Gym.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <span className="text-5xl mr-4">{testimonial.image}</span>
                <div>
                  <h4 className="text-lg font-bold text-dark">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-600 italic">
                "{testimonial.testimonial}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
