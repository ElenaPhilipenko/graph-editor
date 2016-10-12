import { connect } from 'react-redux'
import ToolBar from '../components/ToolBar'

const mapStateToProps = (state) => {
    return {
        mode: state.mode
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onModeClick: (mode) => {
            dispatch({type: 'CHANGE_MODE', mode});
        }
    }
};

const ToolBarConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolBar);

export default ToolBarConnector