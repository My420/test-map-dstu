import Tooltip from 'ol-ext/overlay/Tooltip';
import 'ol-ext/dist/ol-ext.min.css';

const formatLength = (length) => {
  let output;
  if (length > 100) {
    output = `${Math.round((length / 1000) * 100) / 100}км`;
  } else {
    output = `${Math.round(length * 100) / 100}м `;
  }
  return output;
};

const formatArea = (area) => {
  let output;
  if (area > 10000) {
    output = `${Math.round((area / 1000000) * 100) / 100}km<sup>2</sup>`;
  } else {
    output = `${Math.round(area * 100) / 100}m<sup>2</sup>`;
  }
  return output;
};

const olExt = {
  createTooltip() {
    return new Tooltip({
      formatLength,
      formatArea,
    });
  },
};

export default olExt;
