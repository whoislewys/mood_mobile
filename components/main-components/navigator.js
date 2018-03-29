import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { createLogger } from 'redux-logger';

import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import appReducer from '../redux/reducers/reducers';
import NavigationStack from './navigation-stack';

class Navigator extends React.Component {
  render = () => {
    const { dispatch, nav } = this.props;
    const addListener = createReduxBoundAddListener("root");


    return (
      <NavigationStack
        screenProps={{...this.props}}
        navigation={ addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: nav,
                        addListener,
                      })
                    }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(Navigator);

const reduxMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const loggerMiddleware = createLogger();
const middleware = [reduxMiddleware, loggerMiddleware]

const store = createStore(
  appReducer,
  applyMiddleware(reduxMiddleware),
);

// if (module.hot) {
//   module.hot.accept(() => {
//     const nextRootReducer = combineReducers(require('../redux/reducers/reducers'));
//     store.replaceReducer(nextRootReducer);
//   });
// }

export default class extends React.Component {
  state = {
    store: store
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <AppWithNavigationState {...this.props} />
      </Provider>
    );
  }
}
