import plans from "../assets/data/pricingData";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Affordable Pricing
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Simple and transparent pricing. Choose the plan that fits your
            fitness needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg p-8 transition-transform hover:scale-105 ${
                plan.popular
                  ? "bg-gradient-to-br from-primary to-orange-600 ring-2 ring-primary"
                  : "bg-slate-800 border border-slate-700"
              }`}
            >
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="bg-white text-slate-800 px-4 py-1 rounded-full text-sm font-bold">
                    POPULAR
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p
                className={`${plan.popular ? "text-white" : "text-slate-400"} mb-4`}
              >
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span
                  className={`${plan.popular ? "text-white" : "text-slate-400"}`}
                >
                  {" "}
                  {plan.period}
                </span>
              </div>

              <button
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition ${
                  plan.popular
                    ? "bg-white text-primary hover:bg-gray-100"
                    : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                Select Plan
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary mr-3">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
