
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Award,
  BarChart3,
  Calendar,
  Users,
  Brain
} from "lucide-react";

const Analytics = () => {
  // Mock analytics data
  const overallStats = {
    totalSessions: 24,
    averageScore: 78,
    improvementRate: 15,
    totalPracticeTime: 8.5 // hours
  };

  const skillProgress = [
    { skill: "Communication", current: 82, previous: 75, trend: "up" },
    { skill: "Technical Knowledge", current: 76, previous: 70, trend: "up" },
    { skill: "Problem Solving", current: 85, previous: 82, trend: "up" },
    { skill: "Leadership", current: 73, previous: 78, trend: "down" },
    { skill: "STAR Method", current: 79, previous: 72, trend: "up" },
    { skill: "Confidence", current: 88, previous: 85, trend: "up" }
  ];

  const monthlyProgress = [
    { month: "Oct", score: 65, sessions: 3 },
    { month: "Nov", score: 72, sessions: 5 },
    { month: "Dec", score: 78, sessions: 8 },
    { month: "Jan", score: 82, sessions: 8 }
  ];

  const categoryBreakdown = [
    { category: "Behavioral", score: 85, sessions: 12 },
    { category: "Technical", score: 74, sessions: 8 },
    { category: "Leadership", score: 79, sessions: 6 },
    { category: "Problem Solving", score: 82, sessions: 10 }
  ];

  const achievements = [
    { title: "First Mock Interview", description: "Completed your first full mock interview", earned: true },
    { title: "Consistency Champion", description: "5 days practice streak", earned: true },
    { title: "Improvement Star", description: "20% score improvement", earned: true },
    { title: "STAR Master", description: "90%+ STAR method compliance", earned: false },
    { title: "Interview Pro", description: "Average score above 85%", earned: false }
  ];

  const getTrendIcon = (trend) => {
    return trend === "up" ? (
      <TrendingUp className="h-3 w-3 text-green-500" />
    ) : (
      <div className="h-3 w-3 text-red-500 rotate-180">
        <TrendingUp className="h-3 w-3" />
      </div>
    );
  };

  const getTrendColor = (trend) => {
    return trend === "up" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track your interview preparation progress and identify areas for improvement
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
                <p className="text-2xl font-bold">{overallStats.totalSessions}</p>
                <p className="text-xs text-green-600">+6 this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">{overallStats.averageScore}%</p>
                <p className="text-xs text-green-600">+{overallStats.improvementRate}% improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Practice Time</p>
                <p className="text-2xl font-bold">{overallStats.totalPracticeTime}h</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Award className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                <p className="text-2xl font-bold">{achievements.filter(a => a.earned).length}/{achievements.length}</p>
                <p className="text-xs text-muted-foreground">Unlocked</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Skill Progress
          </CardTitle>
          <CardDescription>
            Track your improvement across different interview skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillProgress.map((skill) => (
              <div key={skill.skill} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{skill.skill}</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(skill.trend)}
                    <span className={`text-sm ${getTrendColor(skill.trend)}`}>
                      {skill.current}% ({skill.current > skill.previous ? '+' : ''}{skill.current - skill.previous})
                    </span>
                  </div>
                </div>
                <Progress value={skill.current} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Progress & Category Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Monthly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyProgress.map((month) => (
                <div key={month.month} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{month.month} 2024</div>
                    <div className="text-sm text-muted-foreground">
                      {month.sessions} sessions
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{month.score}%</div>
                    <div className="text-xs text-muted-foreground">avg score</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryBreakdown.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{category.score}%</span>
                      <Badge variant="outline" className="text-xs">
                        {category.sessions} sessions
                      </Badge>
                    </div>
                  </div>
                  <Progress value={category.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
          <CardDescription>
            Unlock achievements as you progress in your interview preparation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`p-4 border rounded-lg ${achievement.earned ? 'bg-green-50 border-green-200' : 'bg-muted/30 border-muted'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${achievement.earned ? 'bg-green-100' : 'bg-muted'}`}>
                    <Award className={`h-4 w-4 ${achievement.earned ? 'text-green-600' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${achievement.earned ? 'text-green-900' : 'text-muted-foreground'}`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${achievement.earned ? 'text-green-700' : 'text-muted-foreground'}`}>
                      {achievement.description}
                    </p>
                    {achievement.earned && (
                      <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                        Earned
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI Insights & Recommendations</CardTitle>
          <CardDescription>
            Personalized recommendations based on your performance data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-blue-100 rounded">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">Strong Improvement Trend</h4>
                  <p className="text-sm text-blue-700">
                    Your scores have improved by 15% over the last month. Keep practicing consistently!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-yellow-100 rounded">
                  <Target className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium text-yellow-900">Focus Area: Leadership Questions</h4>
                  <p className="text-sm text-yellow-700">
                    Your leadership scores have decreased slightly. Consider practicing more leadership scenarios.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-green-100 rounded">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-green-900">Strength: Problem Solving</h4>
                  <p className="text-sm text-green-700">
                    You excel at problem-solving questions. This is a strong asset for technical interviews.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
