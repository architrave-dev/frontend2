import React from 'react';
import { TextAlignment } from '../../enum/EnumRepository';
import { StyledDivComponent } from '../../dto/StyleCompRepository';

interface MoleculeDescriptionProps {
  value: string;
  StyledDescription: StyledDivComponent;
  alignment: TextAlignment;
}

const MoleculeDescription: React.FC<MoleculeDescriptionProps> = ({
  value,
  StyledDescription,
  alignment,
}) => {


  return (
    <StyledDescription $alignment={alignment ? alignment : TextAlignment.LEFT} >
      {value.split('\n').map((content, index) => (
        <React.Fragment key={index}>
          {index === 0 ?
            null
            :
            <br />
          }
          {content}
        </React.Fragment>

      ))}
    </StyledDescription>
  );
};


export default MoleculeDescription;
