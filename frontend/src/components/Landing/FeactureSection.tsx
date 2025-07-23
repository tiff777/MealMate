import { FiUsers, FiMapPin, FiCalendar, FiHeart } from "react-icons/fi";

function FeaturedSection() {
  const features = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Find Study Partners",
      description:
        "Connect with classmates who share your academic interests and study habits.",
    },
    {
      icon: <FiMapPin className="w-8 h-8" />,
      title: "Discover Local Spots",
      description:
        "Explore the best cafes, restaurants, and study-friendly venues around campus.",
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: "Easy Scheduling",
      description:
        "Coordinate meal times and study sessions that work for everyone's schedule.",
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: "Build Friendships",
      description:
        "Turn study sessions into lasting friendships through shared meals and experiences.",
    },
  ];
  return (
    <>
      <section
        id="features"
        className="py-20 px-6 bg-white dark:bg-gray-800 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Why Choose MealMate?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              More than just a meal-sharing app – we're building a community of
              learners, dreamers, and future leaders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 dark:hover:from-gray-600 dark:hover:to-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-900/30 cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default FeaturedSection;
