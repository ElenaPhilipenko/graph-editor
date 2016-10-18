import { connect } from 'react-redux'
import ToolBar from '../components/ToolBar'
import Immutable from 'immutable'

const mapStateToProps = (state) => {
    return {
        mode: state.mode
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onModeClick: (mode) => {
            dispatch({type: 'CHANGE_MODE', mode});
        },
        onDelete: () => {
            dispatch({type: 'DELETE_FIGURE'});
        }
    }
};

const ToolBarConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolBar);

export default ToolBarConnector