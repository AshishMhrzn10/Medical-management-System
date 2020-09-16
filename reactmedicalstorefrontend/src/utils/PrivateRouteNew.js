import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import MainComponent from "../components/MainComponent";
import AuthHandler from "./AuthHandler";

export var PrivateRouteNew = ({ page, activepage, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        AuthHandler.loggedIn() ? (
          <MainComponent page={page} activepage={activepage} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
