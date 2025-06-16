
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Mic, 
  MicOff, 
  Square, 
  Play, 
  Pause,
  Volume2,
  AlertTriangle
} from "lucide-react";
import { speechService, RecordingResult } from "@/services/speechService";
import { useToast } from "@/hooks/use-toast";

interface RecordingComponentProps {
  onRecordingComplete: (result: RecordingResult) => void;
  maxDuration?: number; // in seconds
  disabled?: boolean;
}

const RecordingComponent = ({ 
  onRecordingComplete, 
  maxDuration = 300, // 5 minutes default
  disabled = false 
}: RecordingComponentProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setDuration(prev => {
          if (prev >= maxDuration) {
            handleStopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRecording, maxDuration]);

  const handleStartRecording = async () => {
    if (!speechService.isSupported()) {
      toast({
        title: "Not Supported",
        description: "Recording is not supported in this browser",
        variant: "destructive"
      });
      return;
    }

    try {
      await speechService.startRecording();
      setIsRecording(true);
      setDuration(0);
      setAudioUrl(null);
      
      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone"
      });
    } catch (error) {
      toast({
        title: "Recording Error",
        description: "Failed to start recording. Please check microphone permissions.",
        variant: "destructive"
      });
    }
  };

  const handleStopRecording = async () => {
    if (!isRecording) return;

    try {
      const result = await speechService.stopRecording();
      setIsRecording(false);
      
      // Create audio URL for playback
      const url = URL.createObjectURL(result.audioBlob);
      setAudioUrl(url);
      
      onRecordingComplete(result);
      
      toast({
        title: "Recording Complete",
        description: `Recorded ${Math.floor(result.duration / 60)}:${(result.duration % 60).toString().padStart(2, '0')}`
      });
    } catch (error) {
      console.error('Stop recording error:', error);
      setIsRecording(false);
      toast({
        title: "Recording Error",
        description: "Failed to process recording",
        variant: "destructive"
      });
    }
  };

  const handlePlayback = () => {
    if (!audioUrl) return;

    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play();
        setIsPlaying(true);
      }
    } else {
      const audio = new Audio(audioUrl);
      setAudioElement(audio);
      
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setIsPlaying(false);
        toast({
          title: "Playback Error",
          description: "Failed to play recording",
          variant: "destructive"
        });
      };
      
      audio.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (duration / maxDuration) * 100;

  if (!speechService.isSupported()) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Recording is not supported in this browser. Please use a modern browser like Chrome, Firefox, or Safari.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Recording Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isRecording ? (
                <Badge variant="destructive" className="animate-pulse">
                  <Mic className="h-3 w-3 mr-1" />
                  Recording
                </Badge>
              ) : audioUrl ? (
                <Badge variant="secondary">
                  <Square className="h-3 w-3 mr-1" />
                  Recorded
                </Badge>
              ) : (
                <Badge variant="outline">
                  <MicOff className="h-3 w-3 mr-1" />
                  Ready
                </Badge>
              )}
            </div>
            <div className="text-sm font-mono">
              {formatTime(duration)} / {formatTime(maxDuration)}
            </div>
          </div>

          {/* Progress Bar */}
          <Progress value={progress} className="w-full" />

          {/* Visual Indicator */}
          <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {isRecording ? '🎤' : audioUrl ? '🎵' : '🎯'}
            </div>
            <div className="text-lg font-medium mb-2">
              {isRecording 
                ? 'Recording in Progress' 
                : audioUrl 
                  ? 'Recording Complete' 
                  : 'Ready to Record'
              }
            </div>
            <div className="text-sm text-muted-foreground">
              {isRecording 
                ? 'Speak clearly and at a natural pace'
                : audioUrl 
                  ? 'You can play back your recording below'
                  : 'Click the record button to start your answer'
              }
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2 justify-center">
            {!isRecording && !audioUrl && (
              <Button 
                onClick={handleStartRecording}
                disabled={disabled}
                size="lg"
                className="bg-red-600 hover:bg-red-700"
              >
                <Mic className="h-4 w-4 mr-2" />
                Start Recording
              </Button>
            )}

            {isRecording && (
              <Button 
                onClick={handleStopRecording}
                size="lg"
                variant="outline"
              >
                <Square className="h-4 w-4 mr-2" />
                Stop Recording
              </Button>
            )}

            {audioUrl && (
              <>
                <Button 
                  onClick={handlePlayback}
                  variant="outline"
                  size="lg"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={() => {
                    setAudioUrl(null);
                    setDuration(0);
                    if (audioElement) {
                      audioElement.pause();
                      setAudioElement(null);
                      setIsPlaying(false);
                    }
                  }}
                  variant="outline"
                  size="lg"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Record Again
                </Button>
              </>
            )}
          </div>

          {/* Additional Info */}
          {!speechService.isSpeechRecognitionSupported() && (
            <Alert>
              <Volume2 className="h-4 w-4" />
              <AlertDescription>
                Speech recognition is not available in this browser. Your recording will be saved, but automatic transcription may not work.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecordingComponent;
