
import { Target } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl">PrepMaster Pro</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering professionals worldwide with AI-powered interview preparation and career advancement tools.
            </p>
            <div className="flex space-x-4">
              <div className="text-2xl font-bold">4.9★</div>
              <div className="text-sm text-gray-400">
                Rated by 10,000+ users<br />
                on Trustpilot & G2
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <div className="space-y-2 text-gray-400">
              <div>About</div>
              <div>Careers</div>
              <div>Contact</div>
              <div>Support</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PrepMaster Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
