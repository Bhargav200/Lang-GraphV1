
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Brain, Settings, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Setup = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const [interviewConfig, setInterviewConfig] = useState({
    role: "",
    industry: "",
    experience: "",
    duration: "30",
    difficulty: "medium"
  });

  const handleAnalyzeJD = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please paste a job description first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis (in real app, this would call your LLM service)
    setTimeout(() => {
      const mockAnalysis = {
        role: extractRole(jobDescription),
        industry: extractIndustry(jobDescription),
        skills: extractSkills(jobDescription),
        requirements: extractRequirements(jobDescription),
        experience: extractExperience(jobDescription)
      };
      
      setAnalysisResult(mockAnalysis);
      setInterviewConfig(prev => ({
        ...prev,
        role: mockAnalysis.role,
        industry: mockAnalysis.industry,
        experience: mockAnalysis.experience
      }));
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Job description analyzed successfully!"
      });
    }, 2000);
  };

  // Mock extraction functions (in real app, these would use LLM)
  const extractRole = (jd) => {
    const roles = ["Software Engineer", "Product Manager", "Data Scientist", "UX Designer", "Marketing Manager"];
    return roles[Math.floor(Math.random() * roles.length)];
  };

  const extractIndustry = (jd) => {
    const industries = ["Technology", "Finance", "Healthcare", "E-commerce", "Education"];
    return industries[Math.floor(Math.random() * industries.length)];
  };

  const extractSkills = (jd) => {
    const allSkills = ["JavaScript", "React", "Python", "SQL", "Communication", "Leadership", "Problem Solving", "Analytics"];
    return allSkills.slice(0, Math.floor(Math.random() * 4) + 3);
  };

  const extractRequirements = (jd) => {
    return [
      "Bachelor's degree in relevant field",
      "3+ years of experience",
      "Strong communication skills",
      "Experience with agile methodologies"
    ];
  };

  const extractExperience = (jd) => {
    const levels = ["entry", "mid", "senior"];
    return levels[Math.floor(Math.random() * levels.length)];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Interview Setup</h1>
        <p className="text-muted-foreground">
          Configure your interview session with job description analysis or manual setup
        </p>
      </div>

      {/* Job Description Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Job Description Analysis
          </CardTitle>
          <CardDescription>
            Paste a job description to get personalized interview questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="jd-input">Job Description</Label>
            <Textarea
              id="jd-input"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
              className="mt-2"
            />
          </div>
          <Button 
            onClick={handleAnalyzeJD}
            disabled={isAnalyzing || !jobDescription.trim()}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Analyze Job Description
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              AI-extracted information from the job description
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Detected Role</Label>
                <div className="mt-1">
                  <Badge variant="secondary">{analysisResult.role}</Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Industry</Label>
                <div className="mt-1">
                  <Badge variant="secondary">{analysisResult.industry}</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Key Skills Required</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {analysisResult.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Key Requirements</Label>
              <ul className="mt-2 space-y-1">
                {analysisResult.requirements.map((req, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {req}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interview Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Interview Configuration
          </CardTitle>
          <CardDescription>
            Customize your interview session settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={interviewConfig.role}
                onChange={(e) => setInterviewConfig(prev => ({ ...prev, role: e.target.value }))}
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select 
                value={interviewConfig.industry} 
                onValueChange={(value) => setInterviewConfig(prev => ({ ...prev, industry: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <Select 
                value={interviewConfig.experience} 
                onValueChange={(value) => setInterviewConfig(prev => ({ ...prev, experience: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select 
                value={interviewConfig.duration} 
                onValueChange={(value) => setInterviewConfig(prev => ({ ...prev, duration: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select 
                value={interviewConfig.difficulty} 
                onValueChange={(value) => setInterviewConfig(prev => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link to="/practice" className="flex-1">
          <Button className="w-full" size="lg">
            <Target className="h-4 w-4 mr-2" />
            Start Practice Session
          </Button>
        </Link>
        <Link to="/mock" className="flex-1">
          <Button variant="outline" className="w-full" size="lg">
            Start Mock Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Setup;
