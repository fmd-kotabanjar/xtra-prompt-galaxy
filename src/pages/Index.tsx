
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Feather, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16">
      {/* Hero Section */}
      <section className="container grid lg:grid-cols-2 gap-10 items-center pt-16 md:pt-24">
        <div className="flex flex-col gap-4 items-start text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto mx-auto lg:mx-0">
            <Button asChild size="lg">
              <Link to="/signup">{t('hero.getStarted')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/browse">{t('hero.browsePrompts')}</Link>
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
          <h2 className="text-3xl font-bold tracking-tighter">{t('howItWorks.title')}</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            {t('howItWorks.description')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-primary/10 text-primary rounded-full h-12 w-12 flex items-center justify-center">
                <Feather className="h-6 w-6" />
              </div>
              <CardTitle className="mt-4">{t('howItWorks.discover.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              {t('howItWorks.discover.description')}
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
               <div className="mx-auto bg-primary/10 text-primary rounded-full h-12 w-12 flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <CardTitle className="mt-4">{t('howItWorks.claim.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              {t('howItWorks.claim.description')}
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
               <div className="mx-auto bg-primary/10 text-primary rounded-full h-12 w-12 flex items-center justify-center">
                <Star className="h-6 w-6" />
              </div>
              <CardTitle className="mt-4">{t('howItWorks.create.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              {t('howItWorks.create.description')}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Prompts Section */}
      <section className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter">{t('featured.title')}</h2>
          <p className="text-muted-foreground mt-2">
            {t('featured.description')}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-semibold">Prompt Title {i + 1}</h3>
                <p className="text-sm text-muted-foreground">Category</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link to="/browse">{t('featured.viewAll')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
