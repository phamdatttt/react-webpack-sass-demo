import React from "react";
import { Button } from "reactstrap";
import cx from "classnames";

export default function NavTabs({ active, onChange }) {
  return (
    <div className="nav-tabs-app d-flex gap-2 flex-wrap">
      <Button
        color={active === "dashboard" ? "dark" : "secondary"}
        className={cx("btn-sm", { active: active === "dashboard" })}
        onClick={() => onChange("dashboard")}
      >
        Dashboard
      </Button>

      <Button
        color={active === "tasks" ? "primary" : "secondary"}
        className={cx("btn-sm", { active: active === "tasks" })}
        onClick={() => onChange("tasks")}
      >
        Tasks
      </Button>
    </div>
  );
}
