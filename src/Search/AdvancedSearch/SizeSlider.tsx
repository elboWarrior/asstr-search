import React, { ChangeEvent, useState } from 'react';
import { Slider } from '@material-ui/core';

import SizeTable from '../../types/SizeTable';
import StorySizes from '../../types/StorySizes';

interface SizeSliderProps {
  sizesCallback: (newSizes: number[]) => void;
  sizes: StorySizes;
}

const SizeSlider = ({ sizesCallback, sizes }: SizeSliderProps) => {
  const markMin = SizeTable.findIndex((size) => size.value === sizes.min);
  const markMax = SizeTable.findIndex((size) => size.value === sizes.max);
  const [value, setValue] = useState<number[]>([markMin, markMax]);

  const handleChange = (
    event: ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    if (!(newValue instanceof Array)) return;
    setValue(newValue);

    const markMin = newValue[0];
    const markMax = newValue[1];
    const min = SizeTable[markMin].value;
    const max = SizeTable[markMax].value;
    sizesCallback([min, max]);
  };

  const sizeMarks = SizeTable.map((value, index) => ({
    value: index,
    label: value.label,
  }));

  return (
    <Slider
      aria-labelledby="size-slider"
      onChange={handleChange}
      marks={sizeMarks}
      max={SizeTable.length - 1}
      min={0}
      step={null}
      value={value}
    />
  );
};

export default SizeSlider;
