import React from "react";
import { Card, CardBody } from "reactstrap";

export default function FeatureCard() {
  return (
    <Card className="panel-card shadow-sm h-100">
      <CardBody>
        <ul className="feature-list mb-0">
          <li>
            <span className="tech">classnames</span> dùng để gán class{" "}
            <code>dark</code> vào root khi bật dark mode.
          </li>
          <li>
            <span className="tech">Sass</span> sử dụng biến, nesting, mixin
            trong <code>styles/main.scss</code> để tạo theme và border-radius
            đồng bộ.
          </li>
          <li>
            <span className="tech">Reactstrap</span> cung cấp các component UI
            chuẩn như <code>Container</code>, <code>Row</code>,{" "}
            <code>Col</code>, <code>Card</code>, <code>Button</code>,{" "}
            <code>Badge</code>. Dựa trên Bootstrap 5 nên responsive.
          </li>
          <li>
            <span className="tech">Webpack</span> được config thủ công:
            <ul className="sub">
              <li>Loader cho JSX (babel-loader)</li>
              <li>Loader cho SCSS (sass-loader)</li>
              <li>Asset module cho ảnh/font</li>
              <li>
                Dev server chạy port <code>5173</code> với HMR
              </li>
              <li>
                Output bundle dùng <code>[contenthash]</code> để tối ưu cache
              </li>
            </ul>
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}
