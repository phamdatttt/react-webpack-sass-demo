import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Badge,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

function TaskItem({ task, onToggleDone }) {
  return (
    <div className="task-item d-flex justify-content-between align-items-start">
      <div className="left">
        <div className="task-title">
          {task.done ? <s>{task.title}</s> : task.title}
        </div>
        <div className="task-meta">
          <span className="small text-muted">
            Priority:{" "}
            <span className={task.priority === "high" ? "text-danger fw-bold" : "fw-semibold"}>
              {task.priority}
            </span>{" "}
            • Sprint {task.sprint} • {task.deadline}
          </span>
        </div>
      </div>

      <div className="right text-end">
        <Badge pill color={task.done ? "success" : "warning"}>
          {task.done ? "done" : "in progress"}
        </Badge>
        <div>
          <Button
            size="sm"
            color={task.done ? "secondary" : "success"}
            className="mt-2"
            onClick={onToggleDone}
          >
            {task.done ? "Undo" : "Mark done"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function TaskBoard() {
  // danh sách task trong sprint, có sẵn 2 task chuẩn bài bạn
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Research webpack, sass, classnames, reactstrap",
      sprint: 4,
      deadline: "07 Nov 2025",
      priority: "medium",
      done: false,
    },
    {
      id: 2,
      title: "Đọc hiểu luồng source code demo",
      sprint: 4,
      deadline: "07 Nov 2025",
      priority: "high",
      done: false,
    },
  ]);

  // state form thêm task mới
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("medium");

  // filter: all / open / done
  const [filter, setFilter] = useState("all");

  function handleAddTask(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTitle.trim(),
      sprint: 4,
      deadline: "07 Nov 2025",
      priority: newPriority,
      done: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTitle("");
    setNewPriority("medium");
  }

  function toggleDone(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              done: !t.done,
            }
          : t
      )
    );
  }

  const visibleTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "open") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  return (
    <Row className="g-3 mt-1">
      <Col md="4">
        <Card className="panel-card shadow-sm h-100">
          <CardBody>
            <div className="panel-title">Thêm task mới</div>

            <Form onSubmit={handleAddTask} className="task-form">
              <FormGroup>
                <Label className="form-label-sm fw-semibold">Tiêu đề công việc</Label>
                <Input
                  size="sm"
                  placeholder="vd: Setup Webpack dev server, Fix HMR bug..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label className="form-label-sm fw-semibold">Độ ưu tiên</Label>
                <Input
                  type="select"
                  size="sm"
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                >
                  <option value="high">high</option>
                  <option value="medium">medium</option>
                  <option value="low">low</option>
                </Input>
              </FormGroup>

              <Button color="primary" size="sm" className="w-100 fw-semibold mt-2">
                Thêm task
              </Button>
            </Form>

            <hr />

            <div className="panel-title mb-2">Lọc</div>
            <div className="d-flex flex-wrap gap-2">
              <Button
                size="sm"
                color={filter === "all" ? "dark" : "secondary"}
                onClick={() => setFilter("all")}
              >
                Tất cả
              </Button>
              <Button
                size="sm"
                color={filter === "open" ? "warning" : "secondary"}
                onClick={() => setFilter("open")}
              >
                Chưa xong
              </Button>
              <Button
                size="sm"
                color={filter === "done" ? "success" : "secondary"}
                onClick={() => setFilter("done")}
              >
                Đã xong
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>

      <Col md="8">
        <Card className="panel-card shadow-sm h-100">
          <CardBody>
            <div className="panel-title d-flex justify-content-between align-items-center">
              <span>Danh sách task trong sprint</span>
              <Badge pill color="info">
                {visibleTasks.length} việc
              </Badge>
            </div>

            <div className="task-list">
              {visibleTasks.length === 0 ? (
                <div className="text-muted small fst-italic py-3">
                  Không có task khớp filter.
                </div>
              ) : (
                visibleTasks.map((task) => (
                  <div key={task.id} className="task-row">
                    <TaskItem
                      task={task}
                      onToggleDone={() => toggleDone(task.id)}
                    />
                  </div>
                ))
              )}
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
