import { connect } from 'react-redux';
import { loadContent } from '../../../services/homeService';
import { initialActions } from 'reduxible';

const initAction = initialActions(loadContent());
const connector = connect(
  state => ({
    content: state.home.content
  }), {
    loadContent
  }
);

export default function (Component) {
  return initAction(connector(Component));
}
