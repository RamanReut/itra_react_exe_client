import { connect } from 'react-redux'
import Navbar from './Navbar'
import { types, NavbarSelector, actions } from './reducer'
import { Dispatch } from 'react';

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

function mapStateToProps(state: types.RootState) {
    const selector = new NavbarSelector(state);

    return {
        position: selector.position,
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        onChangePosition: () => 
            dispatch(actions.navbar.togglePosition()),
    }
}
