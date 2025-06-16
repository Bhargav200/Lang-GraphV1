
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, FileText, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const stats = [
    { value: "95%", label: "Success Rate", sublabel: "Job placement within 60 days" },
    { value: "50K+", label: "Professionals Trained", sublabel: "Across 150+ countries" },
    { value: "3x", label: "Faster Placement", sublabel: "Compared to traditional methods" },
    { value: "4.9★", label: "User Rating", sublabel: "Based on 10,000+ reviews" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
            <Zap className="mr-2 h-3 w-3" />
            AI-Powered Interview Mastery
          </Badge>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8">
            Land Your Dream Job with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Interview Prep
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your interview performance with personalized AI coaching, real-time feedback, 
            and industry-specific preparation. Join thousands of professionals advancing their careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl">
                <Play className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link to="/setup">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 hover:bg-gray-50">
                <FileText className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-gray-200">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-gray-900 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
