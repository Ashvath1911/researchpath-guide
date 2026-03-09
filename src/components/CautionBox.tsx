import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface CautionBoxProps {
  children: React.ReactNode;
  className?: string;
}

const CautionBox: React.FC<CautionBoxProps> = ({ children, className = '' }) => (
  <div className={`caution-box flex gap-3 ${className}`}>
    <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: 'hsl(var(--amber))' }} />
    <div>{children}</div>
  </div>
);

export default CautionBox;
