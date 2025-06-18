import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useAdminRole } from '@/hooks/useAdminRole';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
import { Shield, Users, MessageSquare, Plus, Edit, Trash2 } from 'lucide-react';

interface Prompt {
  id: string;
  title: string;
  category: string;
  platform: string;
  credit_cost: number;
  is_premium: boolean;
  prompt_text: string;
  usage_tips?: string;
  example_image_url?: string;
  created_at: string;
}

interface Profile {
  id: string;
  username?: string;
  credit_balance: number;
  subscription_tier: string;
}

const AdminPanel = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminRole();
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [newPrompt, setNewPrompt] = useState({
    title: '',
    category: '',
    platform: '',
    credit_cost: 1,
    is_premium: false,
    prompt_text: '',
    usage_tips: '',
    example_image_url: ''
  });

  useEffect(() => {
    if (!authLoading && !adminLoading) {
      if (!user) {
        navigate('/auth');
      } else if (!isAdmin) {
        navigate('/dashboard');
      }
    }
  }, [user, isAdmin, authLoading, adminLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchPrompts();
      fetchProfiles();
    }
  }, [user]);

  const fetchPrompts = async () => {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrompts(data || []);
    } catch (error) {
      console.error('Error fetching prompts:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat data prompts',
        variant: 'destructive'
      });
    }
  };

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat data user',
        variant: 'destructive'
      });
    }
  };

  const handleCreatePrompt = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('prompts')
        .insert([newPrompt]);

      if (error) throw error;

      toast({
        title: 'Berhasil!',
        description: 'Prompt berhasil dibuat'
      });

      setNewPrompt({
        title: '',
        category: '',
        platform: '',
        credit_cost: 1,
        is_premium: false,
        prompt_text: '',
        usage_tips: '',
        example_image_url: ''
      });

      fetchPrompts();
    } catch (error) {
      console.error('Error creating prompt:', error);
      toast({
        title: 'Error',
        description: 'Gagal membuat prompt',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrompt = async (promptId: string) => {
    try {
      const { error } = await supabase
        .from('prompts')
        .delete()
        .eq('id', promptId);

      if (error) throw error;

      toast({
        title: 'Berhasil!',
        description: 'Prompt berhasil dihapus'
      });

      fetchPrompts();
    } catch (error) {
      console.error('Error deleting prompt:', error);
      toast({
        title: 'Error',
        description: 'Gagal menghapus prompt',
        variant: 'destructive'
      });
    }
  };

  const updateUserCredits = async (userId: string, newBalance: number) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ credit_balance: newBalance })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: 'Berhasil!',
        description: 'Credit balance berhasil diupdate'
      });

      fetchProfiles();
    } catch (error) {
      console.error('Error updating credits:', error);
      toast({
        title: 'Error',
        description: 'Gagal mengupdate credit balance',
        variant: 'destructive'
      });
    }
  };

  if (authLoading || adminLoading) {
    return <div className="container py-8 text-center">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <div className="container py-8 text-center">Access Denied</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-8">
        <Shield className="w-8 h-8 text-blue-600" />
        <h1 className="text-4xl font-bold">Admin Panel</h1>
        <Badge variant="destructive">Administrator</Badge>
      </div>

      <Alert className="mb-6">
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Selamat datang di panel administrator. Anda dapat mengelola prompt dan user dari halaman ini.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="prompts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="prompts" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Kelola Prompts
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Kelola Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prompts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Buat Prompt Baru
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Judul</Label>
                  <Input
                    id="title"
                    value={newPrompt.title}
                    onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
                    placeholder="Masukkan judul prompt"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    value={newPrompt.category}
                    onChange={(e) => setNewPrompt({ ...newPrompt, category: e.target.value })}
                    placeholder="Contoh: Creative Writing"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="platform">Platform</Label>
                  <Select onValueChange={(value) => setNewPrompt({ ...newPrompt, platform: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ChatGPT">ChatGPT</SelectItem>
                      <SelectItem value="Claude">Claude</SelectItem>
                      <SelectItem value="Midjourney">Midjourney</SelectItem>
                      <SelectItem value="DALL-E">DALL-E</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="credit_cost">Harga Credit</Label>
                  <Input
                    id="credit_cost"
                    type="number"
                    value={newPrompt.credit_cost}
                    onChange={(e) => setNewPrompt({ ...newPrompt, credit_cost: parseInt(e.target.value) })}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="example_image_url">URL Gambar Contoh</Label>
                  <Input
                    id="example_image_url"
                    value={newPrompt.example_image_url}
                    onChange={(e) => setNewPrompt({ ...newPrompt, example_image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="prompt_text">Teks Prompt</Label>
                <Textarea
                  id="prompt_text"
                  value={newPrompt.prompt_text}
                  onChange={(e) => setNewPrompt({ ...newPrompt, prompt_text: e.target.value })}
                  placeholder="Masukkan teks prompt lengkap..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="usage_tips">Tips Penggunaan</Label>
                <Textarea
                  id="usage_tips"
                  value={newPrompt.usage_tips}
                  onChange={(e) => setNewPrompt({ ...newPrompt, usage_tips: e.target.value })}
                  placeholder="Tips untuk menggunakan prompt ini..."
                  rows={3}
                />
              </div>

              <Button onClick={handleCreatePrompt} disabled={loading}>
                {loading ? 'Membuat...' : 'Buat Prompt'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prompts.map((prompt) => (
                  <div key={prompt.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{prompt.title}</h3>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{prompt.category}</Badge>
                          <Badge variant="outline">{prompt.platform}</Badge>
                          <Badge variant="secondary">{prompt.credit_cost} Credits</Badge>
                          {prompt.is_premium && <Badge variant="destructive">Premium</Badge>}
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePrompt(prompt.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{prompt.prompt_text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kelola Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profiles.map((profile) => (
                  <div key={profile.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{profile.username || 'User tanpa nama'}</h3>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">Credits: {profile.credit_balance}</Badge>
                          <Badge variant="secondary">{profile.subscription_tier}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Credit baru"
                          className="w-32"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const newBalance = parseInt((e.target as HTMLInputElement).value);
                              if (!isNaN(newBalance)) {
                                updateUserCredits(profile.id, newBalance);
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
