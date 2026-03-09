import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { tracks } from '@/data/tracks';
import { stages } from '@/data/stages';
import { templates } from '@/data/templates';
import { tools } from '@/data/tools';
import { ArrowLeft, CheckCircle2, AlertTriangle, FileStack, Wrench } from 'lucide-react';
import CautionBox from '@/components/CautionBox';

const TrackDetail: React.FC = () => {
  const { id } = useParams();
  const track = tracks.find(t => t.id === id);
  if (!track) return <div className="p-8">Track not found.</div>;

  const trackStages = track.stageIds.map(sid => stages.find(s => s.id === sid)).filter(Boolean);
  const trackTemplates = track.recommendedTemplates.map(tid => templates.find(t => t.id === tid)).filter(Boolean);
  const trackTools = track.recommendedTools.map(tid => tools.find(t => t.id === tid)).filter(Boolean);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <Link to="/tracks" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> All Tracks
      </Link>

      <h1 className="page-heading">{track.title}</h1>
      <p className="text-muted-foreground mt-2 text-lg">{track.description}</p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="card-elevated p-5">
          <h3 className="font-heading font-semibold mb-2">Who is this for?</h3>
          <p className="text-sm text-muted-foreground">{track.whoIsItFor}</p>
        </div>
        <div className="card-elevated p-5">
          <h3 className="font-heading font-semibold mb-2">When to use it</h3>
          <p className="text-sm text-muted-foreground">{track.whenToUse}</p>
        </div>
      </div>

      <h2 className="section-heading mt-10 mb-4">Step-by-Step Workflow</h2>
      <div className="space-y-2">
        {trackStages.map((stage, i) => stage && (
          <Link key={stage.id} to={`/stages/${stage.id}`} className="card-interactive p-4 flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">{i + 1}</div>
            <div className="min-w-0">
              <p className="font-medium">{stage.title}</p>
              <p className="text-sm text-muted-foreground truncate">{stage.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="section-heading mt-10 mb-4">Key Deliverables</h2>
      <div className="card-elevated p-5">
        <ul className="space-y-2">
          {track.deliverables.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'hsl(var(--sage))' }} />
              {d}
            </li>
          ))}
        </ul>
      </div>

      <h2 className="section-heading mt-10 mb-4">Common Pitfalls</h2>
      <div className="card-elevated p-5">
        <ul className="space-y-2">
          {track.pitfalls.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'hsl(var(--amber))' }} />
              {p}
            </li>
          ))}
        </ul>
      </div>

      {trackTemplates.length > 0 && (
        <>
          <h2 className="section-heading mt-10 mb-4">Recommended Templates</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {trackTemplates.map(t => t && (
              <Link key={t.id} to="/templates" className="card-interactive p-4 flex items-center gap-3">
                <FileStack className="h-5 w-5 shrink-0" style={{ color: 'hsl(var(--sage))' }} />
                <div>
                  <p className="font-medium text-sm">{t.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{t.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {trackTools.length > 0 && (
        <>
          <h2 className="section-heading mt-10 mb-4">Recommended Tools</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {trackTools.map(t => t && (
              <Link key={t.id} to="/tools" className="card-interactive p-4 flex items-center gap-3">
                <Wrench className="h-5 w-5 shrink-0" style={{ color: 'hsl(var(--primary))' }} />
                <div>
                  <p className="font-medium text-sm">{t.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{t.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <CautionBox className="mt-10">
        <p>This track overview is for educational purposes. Consult your supervisor for guidance specific to your project.</p>
      </CautionBox>
    </div>
  );
};

export default TrackDetail;
