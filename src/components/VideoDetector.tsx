import { useState } from 'react';
import { Upload, AlertCircle, CheckCircle, XCircle, Loader2, Play } from 'lucide-react';
import { useHistory } from '../context/HistoryContext';
import { ShareToCommunity } from './ShareToCommunity';

interface VideoAnalysis {
  isAIGenerated: boolean;
  confidence: number;
  frameAnalysis: {
    totalFrames: number;
    suspiciousFrames: number;
    deepfakeIndicators: number;
  };
  audioAnalysis: {
    syntheticVoiceDetected: boolean;
    confidence: number;
  };
  details: string;
}

export function VideoDetector() {
  const [video, setVideo] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<VideoAnalysis | null>(null);
  const { addToHistory } = useHistory();

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setVideo(event.target?.result as string);
        setFileName(file.name);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeVideo = () => {
    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const isAI = Math.random() > 0.6;
      const confidence = isAI ? 70 + Math.random() * 25 : 65 + Math.random() * 20;

      const analysisResult = {
        isAIGenerated: isAI,
        confidence: Math.round(confidence * 10) / 10,
        frameAnalysis: {
          totalFrames: Math.floor(300 + Math.random() * 700),
          suspiciousFrames: Math.floor(Math.random() * 150),
          deepfakeIndicators: Math.floor(Math.random() * 50),
        },
        audioAnalysis: {
          syntheticVoiceDetected: Math.random() > 0.5,
          confidence: Math.round((60 + Math.random() * 35) * 10) / 10,
        },
        details: isAI
          ? 'Video analysis detected multiple AI generation indicators including inconsistent facial features, unnatural movements, and synthetic audio patterns.'
          : 'Video appears authentic with natural compression artifacts, consistent lighting, and genuine audio characteristics.',
      };

      setResult(analysisResult);
      
      // Add to history
      addToHistory({
        type: 'video',
        isAIGenerated: analysisResult.isAIGenerated,
        confidence: analysisResult.confidence,
        metadata: {
          fileName: fileName,
        },
      });
      
      setIsAnalyzing(false);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-2">AI Video Detection</h2>
        <p className="text-gray-600 mb-6">
          Upload a video to detect deepfakes and AI-generated content from tools like Runway, Pika, or face-swap applications
        </p>

        <div className="space-y-4">
          <label
            htmlFor="video-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            {video ? (
              <div className="flex flex-col items-center justify-center gap-4 p-4">
                <video src={video} className="max-h-48 rounded-lg" controls />
                <p className="text-gray-700">{fileName}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-gray-400 mb-3" />
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-gray-500">MP4, MOV, AVI (MAX. 100MB)</p>
              </div>
            )}
            <input
              id="video-upload"
              type="file"
              className="hidden"
              accept="video/*"
              onChange={handleVideoUpload}
            />
          </label>

          {video && !result && (
            <button
              onClick={analyzeVideo}
              disabled={isAnalyzing}
              className="w-full bg-[#018790] text-white py-3 rounded-lg hover:bg-[#005461] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Video (Frame-by-frame)...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Analyze Video
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="flex items-start gap-4">
            {result.isAIGenerated ? (
              <div className="bg-red-100 p-3 rounded-full">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            ) : (
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">
                {result.isAIGenerated ? 'AI-Generated/Deepfake Detected' : 'Authentic Video'}
              </h3>
              <p className="text-gray-600 mb-3">{result.details}</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Confidence:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                  <div
                    className={`h-2 rounded-full ${
                      result.isAIGenerated ? 'bg-red-600' : 'bg-green-600'
                    }`}
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
                <span className="text-gray-900">{result.confidence}%</span>
              </div>
            </div>
          </div>

          {/* Share Button */}
          <div className="flex justify-end border-t border-gray-200 pt-4">
            <ShareToCommunity
              type="video"
              isAIGenerated={result.isAIGenerated}
              confidence={result.confidence}
              metadata={{ fileName: fileName }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
            <div>
              <h4 className="text-gray-900 mb-4">Frame Analysis</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Frames Analyzed</span>
                  <span className="text-gray-900">{result.frameAnalysis.totalFrames}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Suspicious Frames</span>
                  <span className={result.frameAnalysis.suspiciousFrames > 50 ? 'text-red-600' : 'text-gray-900'}>
                    {result.frameAnalysis.suspiciousFrames}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deepfake Indicators</span>
                  <span className={result.frameAnalysis.deepfakeIndicators > 20 ? 'text-red-600' : 'text-gray-900'}>
                    {result.frameAnalysis.deepfakeIndicators}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-gray-900 mb-4">Audio Analysis</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Synthetic Voice</span>
                  <span className={result.audioAnalysis.syntheticVoiceDetected ? 'text-red-600' : 'text-green-600'}>
                    {result.audioAnalysis.syntheticVoiceDetected ? 'Detected' : 'Not Detected'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Confidence:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-[#018790]"
                      style={{ width: `${result.audioAnalysis.confidence}%` }}
                    />
                  </div>
                  <span className="text-gray-900">{result.audioAnalysis.confidence}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-blue-900">
              This is a demonstration. Real video analysis would use advanced deepfake detection models examining facial
              landmarks, blinking patterns, and audio-visual synchronization.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}