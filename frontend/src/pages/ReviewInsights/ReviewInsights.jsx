import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api";

export default function ReviewInsights() {
  const [reviews, setReviews] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeReviews = async () => {
    if (!reviews.trim()) {
      alert("Please enter reviews.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/ai/analyze-review",
        {
          review_text: reviews,
        }
      );

      setAnalysis(response.data.analysis);

    } catch (error) {
      console.error(error);
      alert("Failed to analyze reviews.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis);
    alert("Analysis copied!");
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Review Insights
      </h1>

      <Textarea
        placeholder="Paste customer reviews here..."
        value={reviews}
        onChange={(e) => setReviews(e.target.value)}
        className="min-h-[200px]"
      />

      <Button
        className="mt-4"
        onClick={analyzeReviews}
        disabled={loading}
      >
        {loading
          ? "Analyzing..."
          : "Analyze Reviews"}
      </Button>

      {analysis && (
        <div className="border rounded-lg p-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">
              AI Review Analysis
            </h2>

            <Button
              size="sm"
              onClick={handleCopy}
            >
              Copy
            </Button>
          </div>

          <div className="whitespace-pre-line">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
}