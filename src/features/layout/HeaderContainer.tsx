import { Dispatch, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import { types, actions, HeaderSelector } from './reducer'

export default connect(mapStateToProps, mapDispatchToProps)(Header);

function mapStateToProps(state: types.RootState) {
    const selector = new HeaderSelector(state);

    return {
        navbarPosition: selector.navbarPosition,
        searchText: selector.searchText,
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        onNavbarButtonClick: dispatchOnNavbarButtonClick(dispatch),
        onSearchTextChange: dispatchOnSearchTextChange(dispatch),
    }
}

function dispatchOnNavbarButtonClick(dispatch: Dispatch<any>) {
    return () => dispatch(actions.navbar.togglePosition());
}

function dispatchOnSearchTextChange(dispatch: Dispatch<any>) {
    return (event: ChangeEvent<HTMLInputElement>) => 
        dispatch(actions.header.setSearchText(event.currentTarget.value));
}