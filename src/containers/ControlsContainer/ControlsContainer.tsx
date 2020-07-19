import React, { useCallback, useState } from 'react';
import ControlsPanel from '../../components/ControlsPanel';
import MapServices from '../../services/Map';

export interface ControlsContainerProps {}

const ControlsContainer: React.FC<ControlsContainerProps> = () => {
  console.log('Controls Container');

  const [isIconNormalize, setNormalizeStatus] = useState(MapServices.getNormalizeValue());

  const handleClick = useCallback(() => {
    const status = !isIconNormalize;
    setNormalizeStatus(status);
    MapServices.setNormalizeValue(status);
  }, [isIconNormalize, setNormalizeStatus]);

  return <ControlsPanel isIconNormalize={isIconNormalize} onNormalizeClick={handleClick} />;
};

export default ControlsContainer;
