import React from "react";
import { Badge } from "reactstrap";

export default function HeaderBar({ dark }) {
  return (
    <header className="app-header">
      <div className="left">
        <h4 className="title">
          FE Sprint Panel
        </h4>
        <Badge pill color={dark ? "light" : "dark"}>
          {dark ? "Dark" : "Light"}
        </Badge>
      </div>

      <div className="right">
        <div className="meta">
          <div className="meta-row">
            <span className="label">Sprint:</span>
            <span className="value">4</span>
          </div>
          <div className="meta-row">
            <span className="label">Tuần:</span>
            <span className="value">5-6</span>
          </div>
          <div className="meta-row">
            <span className="label">Status:</span>
            <span className="status-dot live" />
            <span className="value strong">in progress</span>
          </div>
        </div>
      </div>
    </header>
  );
}
