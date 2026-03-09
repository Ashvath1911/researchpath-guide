import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Compass, ArrowRight, ArrowLeft } from 'lucide-react';

const steps = [
  { title: 'About You', description: 'Tell us about yourself' },
  { title: 'Research Focus', description: 'What are you working on?' },
  { title: 'Goals', description: 'What do you want to achieve?' },
];

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(0);
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '', role: '', specialty: '', experienceLevel: '',
    researchType: '', currentStage: '', needsHelpWith: '', mainGoal: '', deadline: '',
  });

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleFinish = () => {
    updateProfile({ ...form, onboarded: true });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex items-center gap-2 p-6">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <Compass className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-heading font-semibold">ResearchPath</span>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {steps.map((_, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full" style={{ background: i <= step ? 'hsl(var(--sage))' : 'hsl(var(--muted))' }} />
            ))}
          </div>

          <h2 className="text-2xl font-heading font-bold mb-1">{steps[step].title}</h2>
          <p className="text-muted-foreground mb-8">{steps[step].description}</p>

          {step === 0 && (
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Dr. Jane Smith" className="mt-1.5" />
              </div>
              <div>
                <Label>Your Role</Label>
                <Select value={form.role} onValueChange={v => set('role', v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select your role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical-student">Medical Student</SelectItem>
                    <SelectItem value="resident">Resident / Registrar</SelectItem>
                    <SelectItem value="fellow">Fellow</SelectItem>
                    <SelectItem value="early-career">Early-career Clinician</SelectItem>
                    <SelectItem value="researcher">Researcher</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Specialty / Field</Label>
                <Input value={form.specialty} onChange={e => set('specialty', e.target.value)} placeholder="e.g., Internal Medicine, Surgery, Public Health" className="mt-1.5" />
              </div>
              <div>
                <Label>Research Experience</Label>
                <Select value={form.experienceLevel} onValueChange={v => set('experienceLevel', v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select your level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No prior experience</SelectItem>
                    <SelectItem value="beginner">Beginner (1-2 projects)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (3-5 projects)</SelectItem>
                    <SelectItem value="advanced">Advanced (5+ projects)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label>Research Type</Label>
                <Select value={form.researchType} onValueChange={v => set('researchType', v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="What type of research?" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="systematic-review">Systematic Review / Meta-analysis</SelectItem>
                    <SelectItem value="cross-sectional">Cross-sectional Study</SelectItem>
                    <SelectItem value="retrospective-cohort">Retrospective Cohort</SelectItem>
                    <SelectItem value="case-report">Case Report / Case Series</SelectItem>
                    <SelectItem value="clinical-audit">Clinical Audit</SelectItem>
                    <SelectItem value="narrative-review">Narrative Review</SelectItem>
                    <SelectItem value="unsure">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Current Stage</Label>
                <Select value={form.currentStage} onValueChange={v => set('currentStage', v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Where are you now?" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="just-starting">Just starting / No topic yet</SelectItem>
                    <SelectItem value="have-topic">Have a topic, need to refine</SelectItem>
                    <SelectItem value="have-question">Have a research question</SelectItem>
                    <SelectItem value="protocol">Working on protocol</SelectItem>
                    <SelectItem value="data-collection">Collecting / extracting data</SelectItem>
                    <SelectItem value="analysis">Analyzing data</SelectItem>
                    <SelectItem value="writing">Writing manuscript</SelectItem>
                    <SelectItem value="submission">Ready to submit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>What do you need the most help with?</Label>
                <Select value={form.needsHelpWith} onValueChange={v => set('needsHelpWith', v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select one" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="getting-started">Getting started</SelectItem>
                    <SelectItem value="methodology">Understanding methodology</SelectItem>
                    <SelectItem value="search-strategy">Search strategy</SelectItem>
                    <SelectItem value="data-analysis">Data analysis</SelectItem>
                    <SelectItem value="writing">Academic writing</SelectItem>
                    <SelectItem value="submission">Journal submission</SelectItem>
                    <SelectItem value="everything">A bit of everything</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label>Main Goal</Label>
                <Select value={form.mainGoal} onValueChange={v => set('mainGoal', v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="What's your primary goal?" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-publication">Get my first publication</SelectItem>
                    <SelectItem value="residency-app">Strengthen residency application</SelectItem>
                    <SelectItem value="fellowship-app">Strengthen fellowship application</SelectItem>
                    <SelectItem value="thesis">Complete a thesis / dissertation</SelectItem>
                    <SelectItem value="skill-building">Build research skills</SelectItem>
                    <SelectItem value="contribute">Contribute to medical knowledge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Target Deadline (optional)</Label>
                <Input type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)} className="mt-1.5" />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}><ArrowLeft className="h-4 w-4 mr-2" /> Back</Button>
            ) : <div />}
            {step < 2 ? (
              <Button onClick={() => setStep(step + 1)}>Continue <ArrowRight className="h-4 w-4 ml-2" /></Button>
            ) : (
              <Button onClick={handleFinish}>Get Started <ArrowRight className="h-4 w-4 ml-2" /></Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
