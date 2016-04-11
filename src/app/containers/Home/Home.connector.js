import { connect } from 'react-redux';
import { loadContent } from '../../services/homeService';
import { initialActions } from 'reduxible';

export const initializer = initialActions('home', loadContent());
export default connect(
  state => ({
    content: state.home.content
  }), {
    loadContent
  }
);
