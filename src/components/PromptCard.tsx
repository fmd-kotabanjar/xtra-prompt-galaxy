
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
        <CardHeader className="p-3 md:p-4">
          <CardTitle className="text-sm md:text-base line-clamp-2 leading-tight">
            {prompt.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow p-3 md:p-4 pt-0">
          {/* Future: Add short description or other info here */}
        </CardContent>
        <CardFooter className="p-3 md:p-4 pt-0 flex justify-between items-center text-xs gap-2">
          <Badge variant="outline" className="text-xs truncate flex-1 justify-center">
            {prompt.category}
          </Badge>
          <Badge variant="secondary" className="text-xs truncate flex-1 justify-center">
            {prompt.platform}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PromptCard;
