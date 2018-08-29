import React, { Fragment } from 'react';
import {
  Route,
  // Switch,
} from 'react-router-dom';
import AuthRoute from '../containers/AuthRoute';
import Hello from '../containers/Hello';
import Count from '../containers/Count';
import Login from '../containers/Login';

export default () => (
  <Fragment>
    <Route path="/" component={Hello} exact={true} />
    <Route path="/login" component={Login} />
    <AuthRoute path="/hello" component={Hello} />
    <Route path="/count" component={Count} />
  </Fragment>
);

// function User(props) {
//   console.log(props.match);
//   return (
//     <div className="user-container">
//       <aside>this is aside</aside>
//       <div className="user-info-container">
//         <Switch>
//           <Route path={`${props.match.path}/:userId`} component={UserProfilePage} />
//           <Route path={props.match.path} component={UserSetting} />
//         </Switch>
//       </div>
//     </div>
//   );
// }
// const UserProfilePage = ({ match }) => {
//   console.log('UserProfilePage', match);
//   return (<div>
//     User Profile:
//     <Route path={`${match.url}/comments`} component={UserComment} />
//     <Route path={`${match.path}/settings`} component={UserSetting} />
//   </div>);
// };

// function UserComment(props) {
//   console.log('UserComment', props.match.params);
//   return (
//     <div className="user-comment-container">
//       UserComment{props.match.params.userId}
//     </div>
//   );
// }
// function UserSetting(props) {
//   console.log('UserSetting', props.match.params);
//   return (
//     <div className="user-setting-container">
//       UserSetting{props.match.params.userId}
//     </div>
//   );
// }
