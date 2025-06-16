
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Target, 
  Clock, 
  TrendingUp, 
  FileText, 
  Calendar,
  Award,
  BarChart3,
  Trophy,
  Briefcase,
  Star,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data - in a real app this would come from your state management/API
  const stats = {
    totalSessions: 12,
    averageScore: 78,
    improvementRate: 15,
    weeklyGoal: 65,
    careerLevel: "Mid-Level Professional",
    nextMilestone: "Senior Position Ready"
  };

  const recentSessions = [
    {
      id: 1,
      type: "Interview Simulator",
      role: "Software Engineer",
      score: 82,
      date: "2024-01-15",
      duration: "35 min",
      achievement: "Communication Expert"
    },
    {
      id: 2,
      type: "Skill Builder",
      role: "Product Manager",
      score: 75,
      date: "2024-01-14",
      duration: "20 min",
      achievement: null
    },
    {
      id: 3,
      type: "STAR Mastery",
      role: "Data Analyst",
      score: 88,
      date: "2024-01-13",
      duration: "15 min",
      achievement: "STAR Method Pro"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-3">Welcome to Your Career Command Center!</h1>
        <p className="text-blue-100 text-lg mb-6">
          Ready to take the next step in your professional journey? Let's continue building your interview mastery.
        </p>
        <div className="flex items-center space-x-4">
          <Badge className="bg-amber-500 text-amber-900 hover:bg-amber-400">
            <Trophy className="h-3 w-3 mr-1" />
            {stats.careerLevel}
          </Badge>
          <Badge variant="outline" className="border-blue-300 text-blue-100">
            Next: {stats.nextMilestone}
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/setup">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-blue-100 hover:border-blue-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl group-hover:text-blue-600 transition-colors">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                Target Dream Job
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Upload job descriptions and get AI-powered preparation strategy
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/practice">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-green-100 hover:border-green-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl group-hover:text-green-600 transition-colors">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                Skill Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Master specific skills with targeted practice sessions
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/mock">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-amber-100 hover:border-amber-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl group-hover:text-amber-600 transition-colors">
                <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                  <Target className="h-6 w-6 text-amber-600" />
                </div>
                Interview Simulator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Full interview simulation with real-time feedback
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Performance Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-blue-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700">Total Practice Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.totalSessions}</div>
            <p className="text-xs text-green-600">+2 this week</p>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700">Success Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.averageScore}%</div>
            <p className="text-xs text-green-600">+{stats.improvementRate}% improvement</p>
          </CardContent>
        </Card>

        <Card className="border-amber-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-700">Career Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{stats.weeklyGoal}%</div>
            <Progress value={stats.weeklyGoal} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-purple-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-700">Success Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">5 days</div>
            <p className="text-xs text-purple-600">Keep the momentum!</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Insights */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-900">
              <Calendar className="h-5 w-5 text-blue-600" />
              Recent Practice Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border border-blue-50 rounded-lg hover:bg-blue-50/50 transition-colors">
                <div>
                  <div className="font-medium text-blue-900">{session.role}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-3">
                    <Badge variant="outline" className="text-xs border-blue-200">{session.type}</Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.duration}
                    </div>
                    {session.achievement && (
                      <Badge className="bg-amber-100 text-amber-800 text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        {session.achievement}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl text-green-600">{session.score}%</div>
                  <div className="text-xs text-muted-foreground">{session.date}</div>
                </div>
              </div>
            ))}
            <Link to="/history">
              <Button variant="outline" className="w-full border-blue-200 hover:bg-blue-50">
                View Achievement Archive
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-green-900">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Skill Mastery Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Executive Presence</span>
                  <span className="text-green-600 font-bold">78%</span>
                </div>
                <Progress value={78} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Technical Leadership</span>
                  <span className="text-blue-600 font-bold">85%</span>
                </div>
                <Progress value={85} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">STAR Methodology</span>
                  <span className="text-amber-600 font-bold">92%</span>
                </div>
                <Progress value={92} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Industry Knowledge</span>
                  <span className="text-purple-600 font-bold">80%</span>
                </div>
                <Progress value={80} className="h-3" />
              </div>
            </div>
            <Link to="/analytics">
              <Button variant="outline" className="w-full border-green-200 hover:bg-green-50">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Detailed Performance Insights
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
