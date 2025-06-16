
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Briefcase, BarChart3, Mic, FileText, Play, Trophy, TrendingUp, Award, ArrowRight, CheckCircle, Star, Users, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
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

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content: "PrepMaster Pro helped me land my dream job at Google. The AI-powered practice sessions were incredibly realistic and boosted my confidence.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager at Microsoft",
      content: "The personalized feedback and STAR methodology training made all the difference. I felt completely prepared for every interview.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Data Scientist at Amazon",
      content: "The analytics features helped me identify and improve my weak areas. Within 3 weeks, I received multiple job offers.",
      rating: 5
    }
  ];

  const stats = [
    { value: "95%", label: "Success Rate", sublabel: "Job placement within 60 days" },
    { value: "50K+", label: "Professionals Trained", sublabel: "Across 150+ countries" },
    { value: "3x", label: "Faster Placement", sublabel: "Compared to traditional methods" },
    { value: "4.9★", label: "User Rating", sublabel: "Based on 10,000+ reviews" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <span className="font-bold text-xl text-gray-900">PrepMaster Pro</span>
                <p className="text-xs text-gray-500 hidden sm:block">AI-Powered Career Success</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Success Stories</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Sign In
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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

      {/* Features Section */}
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 sm:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Success Stories from Our Community
            </h2>
            <p className="text-xl text-gray-600">
              Real results from professionals who transformed their careers
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
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
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>Success Stories</div>
                <div>Enterprise</div>
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
    </div>
  );
};

export default Index;
