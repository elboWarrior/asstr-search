import TriState from './TriState';

interface StoryCode {
  codes: Array<string>;
  description: string;
  id: number;
  label: string;
  state: TriState;
}

export default StoryCode;
