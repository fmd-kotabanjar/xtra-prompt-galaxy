import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tables } from '@/integrations/supabase/types';

interface PromptCardProps {
  prompt: Tables<'prompts'>;
}

const PromptCard = ({ prompt }: PromptCardProps) => {
  return (
    <Link to={`/prompt/${prompt.id}`} className="flex">
      <Card className="h-full flex flex-col hover:border-primary transition-colors w-full">
        <CardHeader className="p-4">
          <div className="aspect-video bg-muted rounded-md mb-4 overflow-hidden">
            {prompt.example_image_url ? (
              <img src={prompt.example_image_url} alt={prompt.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground text-sm">No Image</div>
            )}
          </div>
          <CardTitle className="text-base line-clamp-2">{prompt.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow p-4 pt-0">
          {/* Future: Add short description or other info here */}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs">
          <Badge variant="outline">{prompt.category}</Badge>
          <Badge variant="secondary">{prompt.platform}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PromptCard;
