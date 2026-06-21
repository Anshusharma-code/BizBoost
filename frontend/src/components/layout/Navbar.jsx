import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b">
      <h1 className="text-2xl font-bold bg-blue-50 text-blue-600">
        BizBoost AI
      </h1>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() =>
            navigate("/login")
          }
        >
          Login
        </Button>

        <Button
          onClick={() =>
            navigate("/register")
          }
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
}