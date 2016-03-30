import { connect } from 'react-redux';
import { action } from '../../../services/counterService';

export default connect(
  state => ({
    count: state.counter.count
  }),
  {
    increment: action('INCREMENT')
  }
);
