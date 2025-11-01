import React from "react";
import { Card, CardBody, Button } from "reactstrap";

export default function DemoPanel({ dark, onToggleTheme, count, onInc }) {
  return (
    <Card className="panel-card shadow-sm h-100">
      <CardBody>
        <p className="panel-title">
          Demo chứng minh UI có state, theme và interaction.
        </p>

        <div className="d-flex gap-2 flex-wrap">
          <Button
            color={dark ? "light" : "dark"}
            onClick={onToggleTheme}
            className="btn-sm"
          >
            Toggle theme
          </Button>

          <Button
            color="primary"
            onClick={onInc}
            className="btn-sm"
          >
            Count: {count}
          </Button>
        </div>

        <div className="panel-meta mt-3">
          <div className="row-item d-flex justify-content-between">
            <span className="key">Theme:</span>
            <span className="val">{dark ? "Dark mode" : "Light mode"}</span>
          </div>
          <div className="row-item d-flex justify-content-between">
            <span className="key">Clicks:</span>
            <span className="val">{count}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
