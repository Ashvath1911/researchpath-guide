import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Compass, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(email, password);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-sm text-center">
          <div className="h-16 w-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: 'hsl(var(--sage))' }}>
            <Compass className="h-8 w-8" style={{ color: 'hsl(var(--sage-foreground))' }} />
          </div>
          <h2 className="text-2xl font-heading font-bold mb-2">Check your email</h2>
          <p className="text-muted-foreground mb-6">We've sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
          <Link to="/login"><Button variant="outline">Back to Sign In</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(224 40% 16%))' }}>
        <div className="max-w-md text-center">
          <div className="h-16 w-16 rounded-2xl mx-auto mb-8 flex items-center justify-center" style={{ background: 'hsl(var(--sage))' }}>
            <Compass className="h-8 w-8" style={{ color: 'hsl(var(--sage-foreground))' }} />
          </div>
          <h1 className="text-4xl font-heading font-bold mb-4" style={{ color: 'hsl(var(--primary-foreground))' }}>Begin Your Research Journey</h1>
          <p className="text-lg opacity-80" style={{ color: 'hsl(var(--primary-foreground))' }}>Join researchers using structured guidance to produce better research, faster.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-heading font-bold mb-1">Create your account</h2>
          <p className="text-muted-foreground mb-8">Start your guided research workflow</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="name" value={name} onChange={e => setName(e.target.value)} className="pl-10" placeholder="Dr. Jane Smith" required />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="pl-10" placeholder="Min. 8 characters" required minLength={8} />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating account...' : 'Create Account'}</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
