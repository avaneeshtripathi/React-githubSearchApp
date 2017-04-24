import { fetch } from '../utils/restUtil';

class SearchUser extends React.Component{
    constructor(props, context) {
        super(props);
        this.state = {
            errorMessage: '',
            userList: null
        };
        this.searchUser = this.searchUser.bind(this);
        this.successHandler = this.successHandler.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.navigateToProfile = this.navigateToProfile.bind(this);
        context.router;
    }

    searchUser (event = new Event('')) {
        event.preventDefault();
        if (this.refs.searchString.value) {
            fetch('https://api.github.com/search/users?q=' + this.refs.searchString.value, this.successHandler, this.errorHandler);
        } else {
            this.setState({
                userList: null
            })
        }
    }

    successHandler (result) {
        this.setState({
            userList: result
        })
    }

    errorHandler (error) {
        this.setState({
            errorMessage: error.message
        })
    }

    navigateToProfile (userData) {
        this.context.router.push(userData.login + '/profile');
    }

    render () {
        let userList = this.state.userList;
        return (
            <div className="searchPageWrapper">
                {this.state.errorMessage ? <div className="alert alert-danger">{this.state.errorMessage}</div> : null}
                <div className="searchFormWrapper text-center">
                    <h1 className="searchHeading">React app to search github users</h1>
                    <form className="searchUserForm clearfix" onSubmit={this.searchUser}>
                        <input type="text" ref="searchString" className="form-control pull-left" placeholder="Search a user" />
                        <button type="submit" className="btn btn-primary pull-left">Submit</button>
                    </form>
                </div>
                {userList
                    ? userList.items && userList.items.length
                        ? <ul className="userListingWrapper">
                              {_.map(userList.items, (row, key) => {
                                  return (
                                      <li className="clearfix" key={row.id} onClick={this.navigateToProfile.bind(this, row)}>
                                          <div className="avatarWrapper pull-left">
                                              <img src={row.avatar_url} />
                                          </div>
                                          <span className="pull-left">
                                            {row.login}
                                          </span>
                                      </li>
                                  )
                              })}
                          </ul>
                        : <div className="noDataSearch text-center">No results to show</div>
                    : null
                }
            </div>
        );
    }
};

SearchUser.contextTypes = {
    router: React.PropTypes.object
};

export default SearchUser;
