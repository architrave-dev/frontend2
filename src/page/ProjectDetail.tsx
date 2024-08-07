import React from 'react';
import { useArtistIdValidation } from '../shared/hooks/useAuiValidation';

const ProjectDetails: React.FC = () => {
  const AUI = useArtistIdValidation();

  return (
    <div>
      <h1>ProjectDetails from {AUI}</h1>
    </div>
  );
}

export default ProjectDetails;
