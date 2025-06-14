
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PromptCard from '@/components/PromptCard';
import { Tables } from '@/integrations/supabase/types';
import { Skeleton } from '@/components/ui/skeleton';

const fetchPrompts = async () => {
  const { data, error } = await supabase.from('prompts').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

const Browse = () => {
  const { data: prompts, isLoading, error } = useQuery<Tables<'prompts'>[]>({
    queryKey: ['prompts'],
    queryFn: fetchPrompts,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredPrompts = useMemo(() => {
    if (!prompts) return [];
    return prompts.filter((prompt) => {
      const titleMatch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase());
      const platformMatch = platformFilter === 'all' || prompt.platform === platformFilter;
      const categoryMatch = categoryFilter === 'all' || prompt.category === categoryFilter;
      return titleMatch && platformMatch && categoryMatch;
    });
  }, [prompts, searchTerm, platformFilter, categoryFilter]);
  
  const platforms = useMemo(() => {
    if (!prompts) return [];
    return ['all', ...Array.from(new Set(prompts.map(p => p.platform)))];
  }, [prompts]);

  const categories = useMemo(() => {
    if (!prompts) return [];
    return ['all', ...Array.from(new Set(prompts.map(p => p.category)))];
  }, [prompts]);

  if (error) {
    return <div className="container py-8 text-center text-destructive">Error: {error.message}</div>;
  }

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Browse Prompts</h1>
        <p className="text-muted-foreground mt-2">Find the perfect prompt for your next project.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <div className="flex gap-4">
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by platform" />
            </SelectTrigger>
            <SelectContent>
              {platforms.map(platform => (
                <SelectItem key={platform} value={platform}>{platform === 'all' ? 'All Platforms' : platform}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category === 'all' ? 'All Categories' : category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2 p-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <h2 className="text-2xl font-semibold">No prompts found</h2>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Browse;
