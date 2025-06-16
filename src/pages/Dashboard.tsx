
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
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data - in a real app this would come from your state management/API
  const stats = {
    totalSessions: 12,
    averageScore: 78,
    improvementRate: 15,
    weeklyGoal: 65
  };

  const recentSessions = [
    {
      id: 1,
      type: "Mock Interview",
      role: "Software Engineer",
      score: 82,
      date: "2024-01-15",
      duration: "35 min"
    },
    {
      id: 2,
      type: "Practice Mode",
      role: "Product Manager",
      score: 75,
      date: "2024-01-14",
      duration: "20 min"
    },
    {
      id: 3,
      type: "STAR Practice",
      role: "Data Analyst",
      score: 88,
      date: "2024-01-13",
      duration: "15 min"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">
          Ready to continue your interview preparation journey?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/setup">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                Upload Job Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get personalized questions from any job posting
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/practice">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Play className="h-5 w-5" />
                Quick Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Jump into practice mode with common questions
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/mock">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5" />
                Mock Interview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Full interview simulation with timing
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSessions}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-green-600">+{stats.improvementRate}% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.weeklyGoal}%</div>
            <Progress value={stats.weeklyGoal} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{session.role}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{session.type}</Badge>
                    <Clock className="h-3 w-3" />
                    {session.duration}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{session.score}%</div>
                  <div className="text-xs text-muted-foreground">{session.date}</div>
                </div>
              </div>
            ))}
            <Link to="/history">
              <Button variant="outline" className="w-full">
                View All Sessions
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Improvement Areas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Communication Skills</span>
                  <span>78%</span>
                </div>
                <Progress value={78} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Technical Knowledge</span>
                  <span>85%</span>
                </div>
                <Progress value={85} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>STAR Method</span>
                  <span>72%</span>
                </div>
                <Progress value={72} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Confidence</span>
                  <span>80%</span>
                </div>
                <Progress value={80} />
              </div>
            </div>
            <Link to="/analytics">
              <Button variant="outline" className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Detailed Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
