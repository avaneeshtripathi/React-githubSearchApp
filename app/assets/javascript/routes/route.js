import { createHashHistory } from 'history';
import { IndexRoute, Router, Route, useRouterHistory } from 'react-router';

const history = useRouterHistory(createHashHistory)();

import Container from '../container/index';
import SearchUser from '../components/searchUser';
import UserProfile from '../components/userProfile';

const Root = React.createClass({
    render() {
        return (
            <Router history = {history}>
                <Route name='container' path='/' component={Container}>
                    <IndexRoute component={SearchUser} />
                    <Route name='userProfile' path='/:userName/profile' component={UserProfile} />
                </Route>
            </Router>
        );
    }
});

export default Root;
