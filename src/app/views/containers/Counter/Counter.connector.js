import { connect } from 'react-redux';
import { increment } from '../../../services/counterService';

export default connect(
  state => ({
    count: state.counter.count
  }),
  {
    increment
  }
);
