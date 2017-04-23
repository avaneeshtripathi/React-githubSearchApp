import { Link } from 'react-router';
import { fetch } from '../utils/restUtil';
import { dateFormatter } from '../utils/appUtils';

class UserProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            userData: null,
            repoList: []
        };
        this.successUserData = this.successUserData.bind(this);
        this.successRepoList = this.successRepoList.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
    }

    componentWillMount () {
        fetch('https://api.github.com/users/' + this.props.params.userName, this.successUserData, this.errorHandler);
        fetch('https://api.github.com/users/' + this.props.params.userName + '/repos', this.successRepoList, this.errorHandler);
    }

    successUserData (result) {
        this.setState({
            userData: result
        })
    }

    successRepoList (result) {
        this.setState({
            repoList: result
        })
    }

    errorHandler (error) {
        this.setState({
            errorMessage: error.message
        })
    }

    render () {
        let userData = this.state.userData;
        return (
            <div className="userProfileWrapper text-center">
                {this.state.errorMessage ? <div className="alert alert-danger">{this.state.errorMessage}</div> : null}
                <Link to="/" className="btn btn-primary backButton" title="go back">Go Back</Link>
                {userData
                    ? <div className="profileCard text-left">
                          <div className="profileHeader">
                              <h1 className="text-center">{userData.name}</h1>
                              <div className="avatarWrapper">
                                  <img src={userData.avatar_url} alt="avatar image" />
                              </div>
                          </div>
                          <div className="profileDetails">
                              <ul className="detailListing">
                                  <li>
                                      <span className="heading">User Name: </span>
                                      <a href={userData.html_url} target="_blank" className="details cursorPointer">{userData.login}</a>
                                  </li>
                                  <li>
                                      <span className="heading">User Type: </span>
                                      <span className="details">{userData.type}</span>
                                  </li>
                                  <li>
                                      <span className="heading">Created At: </span>
                                      <span className="details">{dateFormatter(userData.created_at)}</span>
                                  </li>
                                  <li>
                                      <span className="heading">Bio: </span>
                                      <span className="details">{userData.bio ? userData.bio : '-'}</span>
                                  </li>
                                  <li>
                                      <span className="heading">Email: </span>
                                      <span className="details">{userData.email ? userData.email : '-'}</span>
                                  </li>
                                  <li>
                                      <span className="heading">Company: </span>
                                      <span className="details">{userData.company ? userData.company : '-'}</span>
                                  </li>
                                  <li>
                                      <span className="heading">Location: </span>
                                      <span className="details">{userData.location ? userData.location : '-'}</span>
                                  </li>
                                  <li>
                                      <span className="heading">Following: </span>
                                      <span className="details">{userData.following}</span>
                                  </li>
                                  <li>
                                      <span className="heading">Followers: </span>
                                      <span className="details">{userData.followers}</span>
                                  </li>
                                  <li>
                                      <span className="heading">Public Repos: </span>
                                      <div className="details">
                                          {userData.public_repos}
                                          <ul className="repoListing">
                                              {_.map(this.state.repoList, (row, key) => {
                                                  return (
                                                      <li key={key}>{row.name}</li>
                                                  )
                                              })}
                                          </ul>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                    : null
                }
            </div>
        );
    }
};

export default UserProfile;
