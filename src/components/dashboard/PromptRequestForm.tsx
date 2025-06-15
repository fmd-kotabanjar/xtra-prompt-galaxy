
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface PromptRequestFormProps {
  onRequestSubmitted: () => void;
}

const PromptRequestForm = ({ onRequestSubmitted }: PromptRequestFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requestDetails, setRequestDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a request.",
        variant: "destructive",
      });
      return;
    }

    if (!requestDetails.trim()) {
      toast({
        title: "Error",
        description: "Please provide details for your prompt request.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('prompt_requests')
        .insert({
          user_id: user.id,
          request_details: requestDetails.trim(),
          status: 'Pending'
        });

      if (error) {
        console.error('Error submitting request:', error);
        
        if (error.message.includes('one pending request per week')) {
          toast({
            title: "Request Limit Reached",
            description: "You can only have one pending request per week. Please wait for your current request to be processed.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to submit your request. Please try again.",
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Success!",
        description: "Your prompt request has been submitted successfully.",
      });

      setRequestDetails('');
      onRequestSubmitted();
    } catch (error: any) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Custom Prompt</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Describe the type of prompt you need. Be as specific as possible about the use case, style, and requirements..."
            value={requestDetails}
            onChange={(e) => setRequestDetails(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <Button type="submit" disabled={loading || !requestDetails.trim()}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PromptRequestForm;
