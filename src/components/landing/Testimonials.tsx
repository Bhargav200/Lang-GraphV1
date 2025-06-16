
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
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

  return (
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
  );
};

export default Testimonials;
