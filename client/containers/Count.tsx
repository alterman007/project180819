import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IReduxState } from '../reducers';
import {
  decCount, DecCountAction,
  incCount, IncCountAction,
} from '../actions';
interface IStateProps {
  count: number;
}
interface IOwnerProps {
  maxCount: number;
}
interface IActionProps {
  actions: {
    decCount(payload?: number): DecCountAction;
    incCount(payload?: number): IncCountAction;
  };
}
const mapStateToProps: MapStateToProps<IStateProps, IOwnerProps, IReduxState> = (state: IReduxState) => ({
  count: state.count,
});
const mapDispatchToProps: MapDispatchToProps<IActionProps, IOwnerProps> = (dispatch) => ({
  actions: bindActionCreators({ decCount, incCount }, dispatch),
});

class Count extends React.Component<IStateProps & IActionProps & IOwnerProps> {
  public componentDidMount() {
    // todo
  }

  public render() {
    const { count, maxCount } = this.props;
    return (
      <div>
        <p style={{ background: count < maxCount ? 'blue' : 'red'}}>{count}</p>
        <button onClick={this.onDecClick}>-</button>
        <button onClick={this.onIncClick}>+</button>
      </div>
    );
  }
  private onIncClick = () => {
    const { actions } = this.props;
    actions.incCount(1);
  }
  private onDecClick = () => {
    const { actions } = this.props;
    actions.decCount(1);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Count);
