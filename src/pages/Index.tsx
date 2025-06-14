
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Feather, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16">
      {/* Hero Section */}
      <section className="container grid lg:grid-cols-2 gap-10 items-center pt-16 md:pt-24">
        <div className="flex flex-col gap-4 items-start text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Unlock Creativity with Next-Level AI Prompts
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
            Discover, save, and claim high-quality AI prompts for Midjourney,
            ChatGPT, and more. Elevate your creations with our curated marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto mx-auto lg:mx-0">
            <Button asChild size="lg">
              <Link to="/signup">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/browse">Browse Prompts</Link>
            </Button>
          </div>
        </div>
        <div className="hidden lg:flex justify-center">
          <img
            src="/placeholder.svg"
            alt="AI prompt examples"
            className="rounded-lg shadow-2xl w-full max-w-md"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            A simple credit-based system to get access to premium prompts in three easy steps.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-primary/10 text-primary rounded-full h-12 w-12 flex items-center justify-center">
                <Feather className="h-6 w-6" />
              </div>
              <CardTitle className="mt-4">Discover</CardTitle>
            </CardHeader>
            <CardContent>
              Browse our extensive library of prompts for various AI platforms.
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
               <div className="mx-auto bg-primary/10 text-primary rounded-full h-12 w-12 flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <CardTitle className="mt-4">Claim</CardTitle>
            </CardHeader>
            <CardContent>
              Use your credits to claim prompts and unlock the full text.
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
               <div className="mx-auto bg-primary/10 text-primary rounded-full h-12 w-12 flex items-center justify-center">
                <Star className="h-6 w-6" />
              </div>
              <CardTitle className="mt-4">Create</CardTitle>
            </CardHeader>
            <CardContent>
              Generate amazing content with your newly acquired high-quality prompts.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Prompts Section */}
      <section className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter">Featured Prompts</h2>
          <p className="text-muted-foreground mt-2">
            A sneak peek at some of our top-rated prompts.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-0">
                <img src="/placeholder.svg" alt={`Prompt ${i + 1}`} className="aspect-square object-cover w-full" />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold">Prompt Title {i + 1}</h3>
                <p className="text-sm text-muted-foreground">Category</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link to="/browse">View All Prompts</Link>
          </Button>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter">Loved by Creatives</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              See what our users are saying about XtraPrompt.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <p className="italic">"XtraPrompt has revolutionized my workflow. The quality of prompts is unmatched and has saved me hours of brainstorming!"</p>
                <p className="font-semibold mt-4 text-right">- Creative Director</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="italic">"Finally, a place to find curated prompts that actually work. The credit system is fair and easy to use. Highly recommended!"</p>
                <p className="font-semibold mt-4 text-right">- Freelance Artist</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
