import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="text-center py-24 px-6">
        <h1 className="text-6xl font-bold max-w-4xl mx-auto">
          Grow Your Local Business With AI-Powered Marketing
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Create social media posts, promotional campaigns,
review insights, and festival posters in minutes.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button
  size="lg" 
  onClick={() => navigate("/register")}
>
  Start Free
</Button>
          <Button
  variant="outline"
  size="lg"
  onClick={() => navigate("/login")}
>
  Watch Demo
</Button>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-8 pb-24">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-xl">
              Social Media Generator
            </h3>
            <p className="text-muted-foreground mt-2">
              Create engaging posts and hashtags instantly.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-xl">
              WhatsApp Campaigns
            </h3>
            <p className="text-muted-foreground mt-2">
              Generate promotional messages for customers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-xl">
              Website Content
            </h3>
            <p className="text-muted-foreground mt-2">
              Generate About Us, FAQs and homepage content.
            </p>
          </CardContent>
        </Card>

         <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-xl">
              Festival Campaign Generator
            </h3>
            <p className="text-muted-foreground mt-2">
              Generate festive promotions and seasonal campaigns for special occasions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-xl">
              Poster Studio
            </h3>
            <p className="text-muted-foreground mt-2">
              Design professional promotional posters with AI-generated content, offers, and business branding.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-xl">
              Customer Review Insights
            </h3>
            <p className="text-muted-foreground mt-2">
             Turn customer feedback into actionable insights to improve your business and customer experience.            </p>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
}