import { connect } from 'react-redux';
import { action } from '../../../services/homeService';

export default connect(
  state => ({
    content: state.home.content
  }), {
    loadContent: action('LOAD_CONTENT')
  }
);
