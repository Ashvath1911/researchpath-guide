import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FlaskConical, ArrowLeft } from 'lucide-react';

interface Props { onBack: () => void; onSave?: (inputs: Record<string, string>, output: Record<string, string>) => void; }

const questions = [
  { id: 'goal', label: 'What is your primary research goal?', options: [
    { value: 'compare-interventions', label: 'Compare two or more interventions/exposures' },
    { value: 'describe-prevalence', label: 'Describe prevalence or characteristics at one point in time' },
    { value: 'explore-outcomes', label: 'Explore outcomes over time using existing records' },
    { value: 'report-rare-case', label: 'Report a rare or unusual clinical case' },
    { value: 'evaluate-quality', label: 'Evaluate and improve clinical practice quality' },
    { value: 'summarize-literature', label: 'Summarize existing literature on a topic' },
  ]},
  { id: 'data', label: 'What type of data will you use?', options: [
    { value: 'existing-studies', label: 'Published studies (literature search)' },
    { value: 'primary-survey', label: 'Primary data via survey/questionnaire' },
    { value: 'medical-records', label: 'Existing medical records / databases' },
    { value: 'patient-case', label: 'Individual patient data (case)' },
    { value: 'audit-data', label: 'Clinical audit / QI data' },
  ]},
  { id: 'timeframe', label: 'How does time factor into your study?', options: [
    { value: 'snapshot', label: 'Single point in time (cross-sectional)' },
    { value: 'retrospective', label: 'Looking back at past data' },
    { value: 'not-applicable', label: 'Not applicable / summarizing literature' },
  ]},
];

const recommendations: Record<string, { design: string; description: string; strengths: string[]; considerations: string[] }> = {
  'compare-interventions+existing-studies': { design: 'Systematic Review / Meta-analysis', description: 'Systematically search, appraise, and synthesize all available evidence comparing interventions.', strengths: ['Highest level of evidence', 'Comprehensive and reproducible', 'Can include meta-analysis for pooled effect'], considerations: ['Requires rigorous protocol (PRISMA)', 'Time-intensive search and screening', 'Quality depends on included studies'] },
  'describe-prevalence+primary-survey': { design: 'Cross-sectional Study', description: 'Collect data at a single point in time to measure prevalence, associations, or characteristics.', strengths: ['Relatively quick and inexpensive', 'Good for prevalence estimation', 'Can study multiple outcomes'], considerations: ['Cannot establish causation', 'Subject to recall bias', 'Snapshot only — no temporal trends'] },
  'explore-outcomes+medical-records': { design: 'Retrospective Cohort Study', description: 'Use existing records to follow a group over time and compare outcomes between exposed and unexposed.', strengths: ['Uses existing data — faster and cheaper', 'Can study rare exposures', 'Can calculate relative risk'], considerations: ['Limited by data quality', 'Cannot control for unmeasured confounders', 'Subject to selection bias'] },
  'report-rare-case+patient-case': { design: 'Case Report / Case Series', description: 'Describe in detail one or more interesting clinical cases with unique findings or outcomes.', strengths: ['Publishable even as a student', 'Documents rare presentations', 'Educational value for the community'], considerations: ['Lowest level of evidence', 'No control group', 'Cannot generalize findings'] },
  'evaluate-quality+audit-data': { design: 'Clinical Audit / Quality Improvement', description: 'Measure current practice against established standards and implement improvements.', strengths: ['Directly improves patient care', 'Often required for training programs', 'Structured audit cycle'], considerations: ['Not generalizable research', 'Requires access to local data', 'Standards must be clearly defined'] },
  'summarize-literature+existing-studies': { design: 'Narrative Review', description: 'Provide a comprehensive overview and discussion of a topic based on selected literature.', strengths: ['Broad overview of a topic', 'Good for educational purposes', 'Flexible structure'], considerations: ['Not systematic — risk of selection bias', 'Less rigorous than systematic review', 'May not be reproducible'] },
};

const StudyDesignChooser: React.FC<Props> = ({ onBack, onSave }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<typeof recommendations[string] | null>(null);

  const generate = () => {
    const key = `${answers.goal}+${answers.data}`;
    const match = recommendations[key];
    if (match) { setResult(match); }
    else {
      // Fallback logic based on goal
      const fallbacks: Record<string, typeof recommendations[string]> = {
        'compare-interventions': recommendations['compare-interventions+existing-studies'],
        'describe-prevalence': recommendations['describe-prevalence+primary-survey'],
        'explore-outcomes': recommendations['explore-outcomes+medical-records'],
        'report-rare-case': recommendations['report-rare-case+patient-case'],
        'evaluate-quality': recommendations['evaluate-quality+audit-data'],
        'summarize-literature': recommendations['summarize-literature+existing-studies'],
      };
      setResult(fallbacks[answers.goal] || { design: 'Cross-sectional Study', description: 'Based on your inputs, a cross-sectional design may be a good starting point. Consult with your supervisor.', strengths: ['Flexible', 'Good starting point'], considerations: ['Discuss with supervisor'] });
    }
  };

  const canGenerate = answers.goal && answers.data;

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Tools
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--sage-light))' }}>
          <FlaskConical className="h-5 w-5" style={{ color: 'hsl(var(--sage))' }} />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold">Study Design Chooser</h2>
          <p className="text-sm text-muted-foreground">Answer a few questions to find the right study design</p>
        </div>
      </div>

      <div className="space-y-5">
        {questions.map(q => (
          <div key={q.id} className="card-elevated p-5">
            <Label className="font-medium">{q.label}</Label>
            <Select value={answers[q.id] || ''} onValueChange={v => setAnswers(prev => ({ ...prev, [q.id]: v }))}>
              <SelectTrigger className="mt-2"><SelectValue placeholder="Select an option" /></SelectTrigger>
              <SelectContent>
                {q.options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <Button onClick={generate} disabled={!canGenerate} className="mt-6">Generate Recommendation</Button>

      {result && (
        <div className="mt-6 card-elevated p-6 border-l-4" style={{ borderLeftColor: 'hsl(var(--sage))' }}>
          <h3 className="font-heading text-lg font-bold mb-1" style={{ color: 'hsl(var(--sage))' }}>Recommended: {result.design}</h3>
          <p className="text-sm text-muted-foreground mb-4">{result.description}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Strengths</h4>
              <ul className="space-y-1">
                {result.strengths.map((s, i) => <li key={i} className="text-sm text-muted-foreground">• {s}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">Considerations</h4>
              <ul className="space-y-1">
                {result.considerations.map((c, i) => <li key={i} className="text-sm text-muted-foreground">• {c}</li>)}
              </ul>
            </div>
          </div>
          {onSave && (
            <Button variant="outline" size="sm" className="mt-4" onClick={() => onSave(answers, { design: result.design, description: result.description })}>
              Save Output
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default StudyDesignChooser;
