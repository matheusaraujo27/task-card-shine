
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { populateAnaPatriciaData } from '@/utils/populateUserData';

const AdminPanel = () => {
  const [loading, setLoading] = useState(false);

  const handlePopulateData = async () => {
    setLoading(true);
    try {
      const result = await populateAnaPatriciaData();
      if (result?.success) {
        toast({
          title: "Success",
          description: "Ana Patricia's data has been populated successfully!",
        });
      } else {
        throw new Error('Failed to populate data');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to populate user data. Check console for details.",
        variant: "destructive",
      });
      console.error('Error populating data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handlePopulateData} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Populating...' : 'Populate Ana Patricia\'s Data'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
