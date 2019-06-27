import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getJournals } from "../../actions/journalsActions";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import Spinner from "../common/Spinner";
import SideNav from "./SideNav/SideNav";
import TopNav from "./TopNav/TopNav";
import Dashboard from "./MainContent/Dashboard";
import Tasks from "./MainContent/Tasks";
import Journal from "./MainContent/Journal/Journal";
import NotFound from "../404/404";

import "./Layout.scss";

class Layout extends Component {
  componentDidMount() {
    this.props.getJournals();
  }

  render() {
    const { journals, journalsLoading } = this.props.journals;

    let dashboardContent;

    if (journals === null || journalsLoading) {
      dashboardContent = <Spinner />;
    } else if (journals.length > 0) {
      dashboardContent = (
        <>
          <SideNav journals={journals} />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                journals={journals}
                component={Dashboard}
              />
              <Route
                exact
                path="/tasks"
                journals={journals}
                component={Tasks}
              />
              <Route exact path="/journals/:journal" component={Journal} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    } else {
      dashboardContent = (
        <>
          <SideNav />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                journals={[]}
                component={Dashboard}
              />
              <Route exact path="/tasks" component={Tasks} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    }

    return (
      <Router>
        <div className="wrapper">{dashboardContent}</div>
      </Router>
    );
  }
}

Layout.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  journals: state.journals
});

export default withRouter(
  connect(
    mapStateToProps,
    { getJournals }
  )(Layout)
);
