
import { useState } from "react";
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
  Bell,
  Download,
  Trash,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: "Guest User",
    email: "",
    bio: "",
    currentRole: "",
    targetRole: "",
    experience: "mid",
    industry: "technology",
    location: "",
    preferences: {
      notifications: true,
      emailUpdates: false,
      practiceReminders: true,
      weeklyReports: true
    }
  });

  const [goals, setGoals] = useState({
    weeklyPracticeHours: 3,
    targetScore: 85,
    focusAreas: ["Communication", "STAR Method"],
    targetCompanies: ["Tech Corp", "Innovation Labs"]
  });

  const handleSave = () => {
    // In a real app, this would save to your backend
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully."
    });
  };

  const handleExportData = () => {
    // In a real app, this would export user data
    toast({
      title: "Data Export",
      description: "Your data export will be emailed to you shortly."
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile, preferences, and interview preparation goals
        </p>
      </div>

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
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about your professional background..."
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="current-role">Current Role</Label>
              <Input
                id="current-role"
                value={profile.currentRole}
                onChange={(e) => setProfile(prev => ({ ...prev, currentRole: e.target.value }))}
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div>
              <Label htmlFor="target-role">Target Role</Label>
              <Input
                id="target-role"
                value={profile.targetRole}
                onChange={(e) => setProfile(prev => ({ ...prev, targetRole: e.target.value }))}
                placeholder="e.g., Senior Software Engineer"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <Select 
                value={profile.experience} 
                onValueChange={(value) => setProfile(prev => ({ ...prev, experience: value }))}
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
                value={profile.industry} 
                onValueChange={(value) => setProfile(prev => ({ ...prev, industry: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
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
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., San Francisco, CA"
              />
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
              <Label htmlFor="weekly-hours">Weekly Practice Hours</Label>
              <Select 
                value={goals.weeklyPracticeHours.toString()} 
                onValueChange={(value) => setGoals(prev => ({ ...prev, weeklyPracticeHours: parseInt(value) }))}
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
                value={goals.targetScore.toString()} 
                onValueChange={(value) => setGoals(prev => ({ ...prev, targetScore: parseInt(value) }))}
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
                  variant={goals.focusAreas.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setGoals(prev => ({
                      ...prev,
                      focusAreas: prev.focusAreas.includes(skill)
                        ? prev.focusAreas.filter(s => s !== skill)
                        : [...prev.focusAreas, skill]
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
              value={goals.targetCompanies.join(", ")}
              onChange={(e) => setGoals(prev => ({ 
                ...prev, 
                targetCompanies: e.target.value.split(",").map(c => c.trim()).filter(c => c)
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
                checked={profile.preferences.notifications}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, notifications: checked }
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-updates">Email Updates</Label>
                <p className="text-sm text-muted-foreground">Receive product updates via email</p>
              </div>
              <Switch
                id="email-updates"
                checked={profile.preferences.emailUpdates}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, emailUpdates: checked }
                  }))
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
                checked={profile.preferences.practiceReminders}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, practiceReminders: checked }
                  }))
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
                checked={profile.preferences.weeklyReports}
                onCheckedChange={(checked) => 
                  setProfile(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, weeklyReports: checked }
                  }))
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
