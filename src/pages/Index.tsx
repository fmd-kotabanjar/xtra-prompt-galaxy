
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Feather, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-12 md:gap-16 lg:gap-24 pb-12 md:pb-16">
      {/* Hero Section */}
      <section className="container px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center pt-12 md:pt-16 lg:pt-24">
          <div className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/signup">
                  {t('hero.getStarted')} 
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link to="/browse">{t('hero.browsePrompts')}</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="w-full max-w-md h-64 bg-muted rounded-lg flex items-center justify-center">
              <Bot className="h-16 w-16 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2">
            {t('howItWorks.title')}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            {t('howItWorks.description')}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto bg-primary/10 text-primary rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <Feather className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg md:text-xl">
                {t('howItWorks.discover.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm md:text-base">
              {t('howItWorks.discover.description')}
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader className="pb-4">
               <div className="mx-auto bg-primary/10 text-primary rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <Bot className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg md:text-xl">
                {t('howItWorks.claim.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm md:text-base">
              {t('howItWorks.claim.description')}
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader className="pb-4">
               <div className="mx-auto bg-primary/10 text-primary rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <Star className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg md:text-xl">
                {t('howItWorks.create.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm md:text-base">
              {t('howItWorks.create.description')}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Prompts Section */}
      <section className="container px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2">
            {t('featured.title')}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {t('featured.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm md:text-base">
                  Prompt Title {i + 1}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Category
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-6 md:mt-8">
          <Button asChild variant="outline" size="lg">
            <Link to="/browse">{t('featured.viewAll')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
