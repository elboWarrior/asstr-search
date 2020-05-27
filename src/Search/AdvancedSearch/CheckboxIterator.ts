import TriState from '../../types/TriState';

class TriStateCheckbox implements IterableIterator<TriState> {
  private state: TriState;

  constructor(private initialState?: TriState) {
    this.state = initialState ? initialState : TriState.UNSET;
  }

  public next(): IteratorResult<TriState> {
    var currentState = this.state;
    switch (currentState) {
      case TriState.EXCLUDES:
        this.state = TriState.UNSET;
        break;
      case TriState.INCLUDES:
        this.state = TriState.EXCLUDES;
        break;
      case TriState.UNSET:
        this.state = TriState.INCLUDES;
        break;
      default:
        this.state = TriState.INCLUDES;
        break;
    }
    return {
      done: false,
      value: this.state,
    };
  }

  [Symbol.iterator](): IterableIterator<TriState> {
    return this;
  }
}

export default TriStateCheckbox;
