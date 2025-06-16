
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Key, CheckCircle, AlertTriangle } from "lucide-react";
import { aiService } from "@/services/aiService";
import { useToast } from "@/hooks/use-toast";

const AIConfig = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('ai_api_key') || '');
  const [isConfigured, setIsConfigured] = useState(!!localStorage.getItem('ai_api_key'));
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const { toast } = useToast();

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }

    aiService.setApiKey(apiKey);
    setIsConfigured(true);
    
    toast({
      title: "API Key Saved",
      description: "AI features are now enabled!"
    });
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key first",
        variant: "destructive"
      });
      return;
    }

    setIsTestingConnection(true);
    try {
      aiService.setApiKey(apiKey);
      
      // Test the connection with a simple job description analysis
      await aiService.analyzeJobDescription("Software Engineer role in technology industry");
      
      toast({
        title: "Connection Successful",
        description: "AI integration is working properly!"
      });
      setIsConfigured(true);
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Please check your API key and try again",
        variant: "destructive"
      });
      setIsConfigured(false);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('ai_api_key');
    setApiKey('');
    setIsConfigured(false);
    
    toast({
      title: "API Key Removed",
      description: "AI features have been disabled"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Configuration
          {isConfigured && <Badge variant="default" className="bg-green-100 text-green-800">Configured</Badge>}
        </CardTitle>
        <CardDescription>
          Configure AI integration for intelligent interview analysis and feedback
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConfigured && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              AI features require an OpenAI API key. Without it, you'll receive mock feedback instead of real AI analysis.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <Label htmlFor="api-key">OpenAI API Key</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pl-10"
              />
            </div>
            {!isConfigured ? (
              <Button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
                Save
              </Button>
            ) : (
              <Button onClick={handleRemoveApiKey} variant="outline">
                Remove
              </Button>
            )}
          </div>
        </div>

        {apiKey && (
          <div className="flex gap-2">
            <Button 
              onClick={handleTestConnection}
              disabled={isTestingConnection}
              variant="outline"
              size="sm"
            >
              {isTestingConnection ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Test Connection
                </>
              )}
            </Button>
          </div>
        )}

        {isConfigured && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              AI integration is configured and ready! You'll receive intelligent feedback and analysis during your practice sessions.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">How to get your OpenAI API Key:</h4>
          <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
            <li>Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.openai.com/api-keys</a></li>
            <li>Sign in to your OpenAI account (or create one)</li>
            <li>Click "Create new secret key"</li>
            <li>Copy the key and paste it above</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIConfig;
