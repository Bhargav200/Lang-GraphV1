
import { Button } from "@/components/ui/button";
import { Trophy, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl mb-12 text-blue-100 max-w-2xl mx-auto">
            Join thousands of professionals who've mastered their interviews and landed their dream jobs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-12 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-xl">
                <Trophy className="mr-2 h-5 w-5" />
                Start Your Journey
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-12 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all">
              <Shield className="mr-2 h-5 w-5" />
              30-Day Money Back Guarantee
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
