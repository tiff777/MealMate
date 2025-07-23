import { useNavigate } from "react-router-dom";

function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-orange-500 to-red-500">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Start Your MealMate Journey?
        </h2>
        <p className="text-xl text-orange-100 mb-8">
          Join hundreds of students who are already connecting, learning, and
          growing together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            onClick={() => navigate("/login")}
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
