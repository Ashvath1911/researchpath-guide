import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import CautionBox from '@/components/CautionBox';

const SettingsPage: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <h1 className="page-heading mb-8">Settings</h1>

      <div className="card-elevated p-6 mb-6">
        <h2 className="font-heading font-semibold mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input value={user.fullName} onChange={e => updateProfile({ fullName: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={user.email} disabled className="mt-1.5" />
          </div>
          <div>
            <Label>Role</Label>
            <Input value={user.role} onChange={e => updateProfile({ role: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label>Specialty</Label>
            <Input value={user.specialty} onChange={e => updateProfile({ specialty: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label>Experience Level</Label>
            <Input value={user.experienceLevel} onChange={e => updateProfile({ experienceLevel: e.target.value })} className="mt-1.5" />
          </div>
        </div>
      </div>

      <div className="card-elevated p-6 mb-6">
        <h2 className="font-heading font-semibold mb-4">Account</h2>
        <Button variant="outline" onClick={logout} className="text-destructive border-destructive/30 hover:bg-destructive/5">Sign Out</Button>
      </div>

      <CautionBox>
        <p>ResearchPath stores data locally in your browser. To persist data across devices, a backend integration would be needed.</p>
      </CautionBox>
    </div>
  );
};

export default SettingsPage;
