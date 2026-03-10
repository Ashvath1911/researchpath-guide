import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Scale, ArrowLeft } from 'lucide-react';

interface Props { onBack: () => void; onSave?: (inputs: Record<string, string>, output: Record<string, string>) => void; }

const toolDatabase: Record<string, { tool: string; description: string; when: string; domains: string[] }[]> = {
  'rct': [
    { tool: 'RoB 2 (Cochrane)', description: 'Revised Cochrane Risk of Bias tool for randomized trials.', when: 'Systematic reviews including RCTs', domains: ['Randomization', 'Deviations from intervention', 'Missing outcome data', 'Outcome measurement', 'Selection of reported result'] },
  ],
  'cohort': [
    { tool: 'Newcastle-Ottawa Scale (NOS)', description: 'Widely used for assessing quality of non-randomized studies.', when: 'Cohort or case-control studies in systematic reviews', domains: ['Selection', 'Comparability', 'Outcome/Exposure'] },
  ],
  'cross-sectional': [
    { tool: 'JBI Checklist for Analytical Cross-Sectional Studies', description: 'Joanna Briggs Institute checklist for cross-sectional designs.', when: 'Cross-sectional studies in systematic reviews', domains: ['Sample representativeness', 'Appropriate inclusion criteria', 'Valid measurement', 'Confounders identified', 'Statistical analysis appropriate'] },
    { tool: 'AXIS Tool', description: 'Appraisal Tool for Cross-Sectional Studies.', when: 'Quality assessment of cross-sectional studies', domains: ['Study design', 'Reporting quality', 'Risk of bias'] },
  ],
  'case-report': [
    { tool: 'JBI Checklist for Case Reports', description: 'Standardized checklist for appraising case reports.', when: 'Including case reports in a review', domains: ['Clear description', 'Timeline', 'Diagnostic procedures', 'Treatment/intervention', 'Adverse events'] },
  ],
  'qualitative': [
    { tool: 'CASP Qualitative Checklist', description: 'Critical Appraisal Skills Programme tool for qualitative studies.', when: 'Qualitative or mixed-methods reviews', domains: ['Aims', 'Methodology', 'Design', 'Recruitment', 'Data collection', 'Analysis', 'Findings', 'Value'] },
  ],
  'diagnostic': [
    { tool: 'QUADAS-2', description: 'Quality Assessment of Diagnostic Accuracy Studies.', when: 'Systematic reviews of diagnostic test accuracy', domains: ['Patient selection', 'Index test', 'Reference standard', 'Flow and timing'] },
  ],
};

const RoBToolChooser: React.FC<Props> = ({ onBack, onSave }) => {
  const [studyType, setStudyType] = useState('');
  const [result, setResult] = useState<typeof toolDatabase[string] | null>(null);

  const generate = () => {
    setResult(toolDatabase[studyType] || []);
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Tools
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--amber-light))' }}>
          <Scale className="h-5 w-5" style={{ color: 'hsl(var(--amber))' }} />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold">Risk of Bias Tool Chooser</h2>
          <p className="text-sm text-muted-foreground">Find the right quality assessment tool for your study design</p>
        </div>
      </div>

      <div className="card-elevated p-5">
        <Label className="font-medium">What type of studies are you assessing?</Label>
        <Select value={studyType} onValueChange={setStudyType}>
          <SelectTrigger className="mt-2"><SelectValue placeholder="Select study type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="rct">Randomized Controlled Trials (RCTs)</SelectItem>
            <SelectItem value="cohort">Cohort / Case-Control Studies</SelectItem>
            <SelectItem value="cross-sectional">Cross-Sectional Studies</SelectItem>
            <SelectItem value="case-report">Case Reports / Case Series</SelectItem>
            <SelectItem value="qualitative">Qualitative Studies</SelectItem>
            <SelectItem value="diagnostic">Diagnostic Accuracy Studies</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={generate} disabled={!studyType} className="mt-6">Find Recommended Tools</Button>

      {result && result.length > 0 && (
        <div className="mt-6 space-y-4">
          {result.map((tool, i) => (
            <div key={i} className="card-elevated p-6 border-l-4" style={{ borderLeftColor: 'hsl(var(--amber))' }}>
              <h3 className="font-heading font-semibold text-lg">{tool.tool}</h3>
              <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
              <p className="text-xs mt-2"><span className="font-medium">When to use:</span> {tool.when}</p>
              <div className="mt-3">
                <p className="text-xs font-medium mb-1">Assessment Domains:</p>
                <div className="flex flex-wrap gap-1">
                  {tool.domains.map((d, j) => <span key={j} className="sage-badge text-[10px]">{d}</span>)}
                </div>
              </div>
              {onSave && (
                <Button variant="outline" size="sm" className="mt-3" onClick={() => onSave({ studyType }, { tool: tool.tool, description: tool.description })}>
                  Save Output
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {result && result.length === 0 && (
        <div className="mt-6 card-elevated p-6 text-center">
          <p className="text-muted-foreground">No specific tool found for this type. Consult your supervisor for guidance.</p>
        </div>
      )}
    </div>
  );
};

export default RoBToolChooser;
