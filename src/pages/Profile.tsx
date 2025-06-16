
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Settings, 
  Target, 
  Book,
  Download,
  Trash,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";
import { useProgress } from "@/hooks/useProgress";

const Profile = () => {
  const { toast } = useToast();
  const { profile, updateProfile, loading } = useProfile();
  const { skillProgress, overallStats } = useProgress();
  
  const [profileData, setProfileData] = useState({
    full_name: "",
    current_role: "",
    target_role: "",
    experience_level: "mid" as 'entry' | 'mid' | 'senior',
    industry: "",
    location: "",
    bio: "",
    weekly_practice_goal: 3,
    target_score: 85,
    focus_areas: [] as string[],
    target_companies: [] as string[]
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    emailUpdates: false,
    practiceReminders: true,
    weeklyReports: true
  });

  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || "",
        current_role: profile.current_role || "",
        target_role: profile.target_role || "",
        experience_level: profile.experience_level || "mid",
        industry: profile.industry || "",
        location: profile.location || "",
        bio: profile.bio || "",
        weekly_practice_goal: profile.weekly_practice_goal || 3,
        target_score: profile.target_score || 85,
        focus_areas: profile.focus_areas || [],
        target_companies: profile.target_companies || []
      });
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfile({
        ...profileData,
        updated_at: new Date().toISOString()
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleExportData = () => {
    const dataToExport = {
      profile: profileData,
      skillProgress,
      overallStats,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prepmaster-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data Exported",
      description: "Your data has been downloaded successfully."
    });
  };

  const skillAreas = [
    "Communication",
    "Technical Knowledge", 
    "Leadership",
    "Problem Solving",
    "STAR Method",
    "Confidence",
    "Behavioral Questions",
    "System Design"
  ];

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile, preferences, and interview preparation goals
        </p>
      </div>

      {/* Statistics Overview */}
      {overallStats && (
        <Card>
          <CardHeader>
            <CardTitle>Your Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{overallStats.totalSessions}</div>
                <div className="text-sm text-muted-foreground">Sessions Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{overallStats.averageScore}%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{overallStats.hoursSpent}h</div>
                <div className="text-sm text-muted-foreground">Hours Practiced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{overallStats.streakDays}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Update your basic profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.full_name}
                onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., San Francisco, CA"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about your professional background..."
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="current-role">Current Role</Label>
              <Input
                id="current-role"
                value={profileData.current_role}
                onChange={(e) => setProfileData(prev => ({ ...prev, current_role: e.target.value }))}
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div>
              <Label htmlFor="target-role">Target Role</Label>
              <Input
                id="target-role"
                value={profileData.target_role}
                onChange={(e) => setProfileData(prev => ({ ...prev, target_role: e.target.value }))}
                placeholder="e.g., Senior Software Engineer"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <Select 
                value={profileData.experience_level} 
                onValueChange={(value: 'entry' | 'mid' | 'senior') => setProfileData(prev => ({ ...prev, experience_level: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select 
                value={profileData.industry} 
                onValueChange={(value) => setProfileData(prev => ({ ...prev, industry: value }))}
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
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals & Targets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Goals & Targets
          </CardTitle>
          <CardDescription>
            Set your interview preparation goals and targets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weekly-hours">Weekly Practice Goal (hours)</Label>
              <Select 
                value={profileData.weekly_practice_goal.toString()} 
                onValueChange={(value) => setProfileData(prev => ({ ...prev, weekly_practice_goal: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                  <SelectItem value="5">5 hours</SelectItem>
                  <SelectItem value="10">10 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="target-score">Target Average Score</Label>
              <Select 
                value={profileData.target_score.toString()} 
                onValueChange={(value) => setProfileData(prev => ({ ...prev, target_score: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="70">70%</SelectItem>
                  <SelectItem value="75">75%</SelectItem>
                  <SelectItem value="80">80%</SelectItem>
                  <SelectItem value="85">85%</SelectItem>
                  <SelectItem value="90">90%</SelectItem>
                  <SelectItem value="95">95%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Focus Areas</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {skillAreas.map((skill) => (
                <Badge
                  key={skill}
                  variant={profileData.focus_areas.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setProfileData(prev => ({
                      ...prev,
                      focus_areas: prev.focus_areas.includes(skill)
                        ? prev.focus_areas.filter(s => s !== skill)
                        : [...prev.focus_areas, skill]
                    }));
                  }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Click to select/deselect focus areas for your practice sessions
            </p>
          </div>

          <div>
            <Label htmlFor="target-companies">Target Companies</Label>
            <Textarea
              id="target-companies"
              value={profileData.target_companies.join(", ")}
              onChange={(e) => setProfileData(prev => ({ 
                ...prev, 
                target_companies: e.target.value.split(",").map(c => c.trim()).filter(c => c)
              }))}
              placeholder="Enter company names separated by commas..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Preferences
          </CardTitle>
          <CardDescription>
            Customize your experience and notification settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
              </div>
              <Switch
                id="notifications"
                checked={preferences.notifications}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, notifications: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="practice-reminders">Practice Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded to practice regularly</p>
              </div>
              <Switch
                id="practice-reminders"
                checked={preferences.practiceReminders}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, practiceReminders: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weekly-reports">Weekly Progress Reports</Label>
                <p className="text-sm text-muted-foreground">Receive weekly progress summaries</p>
              </div>
              <Switch
                id="weekly-reports"
                checked={preferences.weeklyReports}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, weeklyReports: checked }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Data & Privacy
          </CardTitle>
          <CardDescription>
            Manage your data and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Export Your Data</h4>
              <p className="text-sm text-muted-foreground">
                Download all your session data and progress
              </p>
            </div>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
            <div>
              <h4 className="font-medium text-red-700">Delete Account</h4>
              <p className="text-sm text-red-600">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive">
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Profile;
