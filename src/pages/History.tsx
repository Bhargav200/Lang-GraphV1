
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar,
  Clock,
  Target,
  Search,
  Filter,
  Download,
  Eye,
  TrendingUp,
  Play,
  Trophy,
  Award,
  Star
} from "lucide-react";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Mock session data with career-focused updates
  const sessions = [
    {
      id: 1,
      type: "Interview Simulator",
      role: "Software Engineer",
      company: "Tech Corp",
      date: "2024-01-15",
      duration: "32 min",
      score: 85,
      questions: 5,
      status: "completed",
      achievement: "Communication Expert"
    },
    {
      id: 2,
      type: "Skill Builder",
      role: "Product Manager",
      company: "Startup Inc",
      date: "2024-01-14",
      duration: "18 min",
      score: 78,
      questions: 3,
      status: "completed",
      achievement: null
    },
    {
      id: 3,
      type: "Interview Simulator",
      role: "Data Scientist",
      company: "Analytics Co",
      date: "2024-01-13",
      duration: "28 min",
      score: 92,
      questions: 4,
      status: "completed",
      achievement: "STAR Method Pro"
    },
    {
      id: 4,
      type: "Skill Builder",
      role: "UX Designer",
      company: "Design Studio",
      date: "2024-01-12",
      duration: "15 min",
      score: 71,
      questions: 2,
      status: "completed",
      achievement: null
    },
    {
      id: 5,
      type: "Interview Simulator",
      role: "Marketing Manager",
      company: "Brand Agency",
      date: "2024-01-11",
      duration: "25 min",
      score: 0,
      questions: 0,
      status: "incomplete",
      achievement: null
    },
    {
      id: 6,
      type: "Skill Builder",
      role: "Software Engineer",
      company: "Tech Giant",
      date: "2024-01-10",
      duration: "22 min",
      score: 88,
      questions: 3,
      status: "completed",
      achievement: "Technical Excellence"
    }
  ];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || session.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesType;
  });

  const sortedSessions = [...filteredSessions].sort((a, b) => {
    switch (sortBy) {
      case "score":
        return b.score - a.score;
      case "duration":
        const aDuration = parseInt(a.duration.replace(' min', ''));
        const bDuration = parseInt(b.duration.replace(' min', ''));
        return bDuration - aDuration;
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    return status === "completed" ? (
      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
        <Trophy className="h-3 w-3 mr-1" />
        Completed
      </Badge>
    ) : (
      <Badge variant="destructive">
        Incomplete
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-3">Achievement Archive</h1>
        <p className="text-blue-100 text-lg">
          Track your interview mastery journey and celebrate your career milestones
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Target className="h-5 w-5 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-700">Total Practice Sessions</p>
                <p className="text-3xl font-bold text-blue-600">{sessions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-700">Success Rate</p>
                <p className="text-3xl font-bold text-green-600">
                  {Math.round(sessions.filter(s => s.status === "completed").reduce((acc, s) => acc + s.score, 0) / sessions.filter(s => s.status === "completed").length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-100">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-amber-700">Career Investment</p>
                <p className="text-3xl font-bold text-amber-600">
                  {sessions.reduce((acc, s) => acc + parseInt(s.duration.replace(' min', '')), 0)} min
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-purple-700">Achievements Earned</p>
                <p className="text-3xl font-bold text-purple-600">
                  {sessions.filter(s => s.achievement).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-900">Search & Filter Your Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-blue-500" />
                <Input
                  placeholder="Search by role or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 border-blue-200 focus:border-blue-400"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[160px] border-blue-200">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="simulator">Interview Simulator</SelectItem>
                <SelectItem value="skill">Skill Builder</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] border-blue-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="score">Highest Score</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {sortedSessions.map((session) => (
          <Card key={session.id} className="hover:shadow-lg transition-all duration-300 border-blue-100 hover:border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="font-semibold text-xl text-blue-900">{session.role}</h3>
                    <Badge variant="outline" className="border-blue-200 text-blue-700">{session.type}</Badge>
                    {getStatusBadge(session.status)}
                    {session.achievement && (
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                        <Star className="h-3 w-3 mr-1" />
                        {session.achievement}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 font-medium">{session.company}</p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      {session.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      {session.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-amber-500" />
                      {session.questions} questions
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {session.status === "completed" ? (
                    <div className={`text-4xl font-bold ${getScoreColor(session.score)}`}>
                      {session.score}%
                    </div>
                  ) : (
                    <div className="text-xl text-muted-foreground">
                      Incomplete
                    </div>
                  )}
                  <div className="flex gap-3 mt-3">
                    <Button size="sm" variant="outline" className="border-blue-200 hover:bg-blue-50">
                      <Eye className="h-3 w-3 mr-1" />
                      Review
                    </Button>
                    {session.status === "completed" && (
                      <Button size="sm" variant="outline" className="border-green-200 hover:bg-green-50">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <Card className="border-blue-100">
          <CardContent className="text-center py-16">
            <Target className="h-16 w-16 text-blue-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-3 text-blue-900">No sessions found</h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Try adjusting your search criteria or start a new practice session
            </p>
            <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default History;
