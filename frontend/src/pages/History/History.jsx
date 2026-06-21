import { useEffect, useState } from "react";
import api from "@/services/api";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/content/");
      setHistory(response.data);
    } catch (error) {
      console.error(
        "Failed to load history:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Content History
      </h1>

      {loading ? (
        <p>Loading history...</p>
      ) : history.length === 0 ? (
        <p>No content generated yet.</p>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4"
            >
              <p className="font-semibold capitalize">
                {item.content_type}
              </p>

              <p className="text-sm text-muted-foreground">
                {item.created_at
                  ? new Date(
                      item.created_at
                    ).toLocaleString()
                  : "No date available"}
              </p>

              <div className="mt-3">
                <p className="font-medium">
                  Prompt:
                </p>

                <p className="text-muted-foreground">
                  {item.prompt}
                </p>
              </div>

              <div className="mt-3">
                <p className="font-medium">
                  Generated Content:
                </p>

                <p className="whitespace-pre-line mt-2">
                  {item.generated_content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}