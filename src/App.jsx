import React, { useState } from "react";
import { Container } from "reactstrap";
import cx from "classnames";

import HeaderBar from "./components/HeaderBar";
import NavTabs from "./components/NavTabs";
import DemoPanel from "./components/DemoPanel";
import FeatureCard from "./components/FeatureCard";
import TaskBoard from "./components/TaskBoard";

export default function App() {
  const [dark, setDark] = useState(false);
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState("dashboard");

  function handleToggleTheme() {
    setDark(!dark);
  }

  function handleInc() {
    setCount((c) => c + 1);
  }

  return (
    <div className={cx("app-shell", { dark })}>
      <Container className="py-4">
        <HeaderBar dark={dark} />

        <div className="mt-3 mb-3 d-flex justify-content-between flex-wrap gap-2">
          <NavTabs active={activeTab} onChange={setActiveTab} />

          {/* cái nút toggle theme global để show dev control */}
          <button
            className={cx("theme-mini-btn", { dark })}
            onClick={handleToggleTheme}
          >
            {dark ? "🌙 Dark" : "☀ Light"}
          </button>
        </div>

        {activeTab === "dashboard" ? (
          <>
            {/* màn dashboard cũ: demo + feature */}
            <div className="row g-3">
              <div className="col-md-6">
                <DemoPanel
                  dark={dark}
                  onToggleTheme={handleToggleTheme}
                  count={count}
                  onInc={handleInc}
                />
              </div>
              <div className="col-md-6">
                <FeatureCard />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* màn task board mới */}
            <TaskBoard />
          </>
        )}
      </Container>
    </div>
  );
}
