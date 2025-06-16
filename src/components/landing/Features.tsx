
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Briefcase, BarChart3, Mic, FileText, Trophy, Award } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Target,
      title: "AI Job Targeting",
      description: "Upload job descriptions and receive personalized interview preparation strategies powered by advanced AI"
    },
    {
      icon: Mic,
      title: "Voice Analysis",
      description: "Real-time speech coaching with AI-powered feedback on pace, tone, and confidence levels"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Comprehensive insights and progress tracking with industry benchmark comparisons"
    },
    {
      icon: Trophy,
      title: "STAR Methodology",
      description: "Master proven interview techniques with guided practice and structured response frameworks"
    },
    {
      icon: FileText,
      title: "Mock Interviews",
      description: "Realistic interview simulations with industry-specific scenarios and professional feedback"
    },
    {
      icon: Award,
      title: "Career Advancement",
      description: "Track achievements and unlock certifications as you progress toward your dream role"
    }
  ];

  return (
    <section id="features" className="py-20 sm:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive interview preparation powered by AI and designed by career experts
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl w-fit group-hover:from-blue-100 group-hover:to-purple-100 transition-all">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
