import { FaUtensils } from "react-icons/fa";
function Footer() {
  return (
    <>
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <FaUtensils className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold">MealMate</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Connecting university students through shared meals and experiences.
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 MealMate. Built for MSA Phase 2 Assessment. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
