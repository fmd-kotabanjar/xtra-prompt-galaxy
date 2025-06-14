
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Copy } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const fetchPromptById = async (id: string) => {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const PromptDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: prompt, isLoading, error } = useQuery({
    queryKey: ['prompt', id],
    queryFn: () => fetchPromptById(id!),
    enabled: !!id,
  });

  const handleCopy = () => {
    if (prompt?.prompt_text) {
      navigator.clipboard.writeText(prompt.prompt_text);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div>
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !prompt) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-semibold text-destructive">Error</h2>
        <p className="text-muted-foreground">{error ? error.message : 'Prompt not found.'}</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{prompt.title}</h1>
          <div className="flex items-center gap-2 mb-6 text-muted-foreground">
            <Badge variant="secondary">{prompt.platform}</Badge>
            <span>•</span>
            <Badge variant="outline">{prompt.category}</Badge>
          </div>
          
          {prompt.example_image_url && (
            <div className="aspect-video bg-muted rounded-lg mb-6 overflow-hidden flex items-center justify-center">
              <img src={prompt.example_image_url} alt={prompt.title} className="w-full h-full object-contain" />
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-3">Prompt</h2>
          <Card className="mb-6 bg-secondary">
            <CardContent className="p-4">
              <p className="text-secondary-foreground font-mono text-sm whitespace-pre-wrap">{prompt.prompt_text}</p>
            </CardContent>
          </Card>

          {prompt.usage_tips && (
             <div>
              <h2 className="text-2xl font-semibold mb-3">Usage Tips</h2>
               <Card>
                <CardContent className="p-4">
                  <p className="text-muted-foreground">{prompt.usage_tips}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleCopy} className="w-full">
                <Copy className="mr-2 h-4 w-4" />
                Copy Prompt
              </Button>
              <Button disabled className="w-full">
                Claim with {prompt.credit_cost} Credit{prompt.credit_cost !== 1 ? 's' : ''}
              </Button>
              {prompt.is_premium && <Badge className="w-full justify-center">Premium</Badge>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PromptDetail;
