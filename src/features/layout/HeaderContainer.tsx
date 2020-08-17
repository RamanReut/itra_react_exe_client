import { Dispatch } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import { RootState, HeaderSelector, actions } from './reducer'

export default connect(mapStateToProps, mapDispatchToProps)(Header);

function mapStateToProps(state: RootState) {
    const selector = new HeaderSelector(state);

    return {
        navbarPosition: selector.navbarPosition,
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        onNavbarButtonClick: () => dispatch(actions.navbar.togglePosition()),
    }
}