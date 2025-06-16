
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
  Play
} from "lucide-react";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Mock session data
  const sessions = [
    {
      id: 1,
      type: "Mock Interview",
      role: "Software Engineer",
      company: "Tech Corp",
      date: "2024-01-15",
      duration: "32 min",
      score: 85,
      questions: 5,
      status: "completed"
    },
    {
      id: 2,
      type: "Practice Mode",
      role: "Product Manager",
      company: "Startup Inc",
      date: "2024-01-14",
      duration: "18 min",
      score: 78,
      questions: 3,
      status: "completed"
    },
    {
      id: 3,
      type: "Mock Interview",
      role: "Data Scientist",
      company: "Analytics Co",
      date: "2024-01-13",
      duration: "28 min",
      score: 92,
      questions: 4,
      status: "completed"
    },
    {
      id: 4,
      type: "Practice Mode",
      role: "UX Designer",
      company: "Design Studio",
      date: "2024-01-12",
      duration: "15 min",
      score: 71,
      questions: 2,
      status: "completed"
    },
    {
      id: 5,
      type: "Mock Interview",
      role: "Marketing Manager",
      company: "Brand Agency",
      date: "2024-01-11",
      duration: "25 min",
      score: 0,
      questions: 0,
      status: "incomplete"
    },
    {
      id: 6,
      type: "Practice Mode",
      role: "Software Engineer",
      company: "Tech Giant",
      date: "2024-01-10",
      duration: "22 min",
      score: 88,
      questions: 3,
      status: "completed"
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
        return parseInt(b.duration) - parseInt(a.duration);
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = (status) => {
    return status === "completed" ? (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        Completed
      </Badge>
    ) : (
      <Badge variant="destructive">
        Incomplete
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Session History</h1>
        <p className="text-muted-foreground">
          Review your past interview sessions and track your progress
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
                <p className="text-2xl font-bold">{sessions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">
                  {Math.round(sessions.filter(s => s.status === "completed").reduce((acc, s) => acc + s.score, 0) / sessions.filter(s => s.status === "completed").length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Total Practice Time</p>
                <p className="text-2xl font-bold">
                  {sessions.reduce((acc, s) => acc + parseInt(s.duration), 0)} min
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Play className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">
                  {Math.round((sessions.filter(s => s.status === "completed").length / sessions.length) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by role or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="mock">Mock Interview</SelectItem>
                <SelectItem value="practice">Practice Mode</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
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

      {/* Sessions List */}
      <div className="space-y-4">
        {sortedSessions.map((session) => (
          <Card key={session.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{session.role}</h3>
                    <Badge variant="outline">{session.type}</Badge>
                    {getStatusBadge(session.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{session.company}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {session.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      {session.questions} questions
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {session.status === "completed" ? (
                    <div className={`text-3xl font-bold ${getScoreColor(session.score)}`}>
                      {session.score}%
                    </div>
                  ) : (
                    <div className="text-xl text-muted-foreground">
                      Incomplete
                    </div>
                  )}
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    {session.status === "completed" && (
                      <Button size="sm" variant="outline">
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
        <Card>
          <CardContent className="text-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No sessions found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline">
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default History;
