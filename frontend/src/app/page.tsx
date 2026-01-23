"use client";

import { Row, Col } from "antd";
import "./page.css";

const backgrounds = [
  "/backgrounds/am.jpg",
  "/backgrounds/dr.jpg",
  "/backgrounds/pom.jpg",
  "/backgrounds/wr.jpg",
];

export default function Home() {
  return (
    <div className="home-grid-container">
      <Row gutter={[16, 16]} style={{ height: "100%" }}>
        {backgrounds.map((bg, index) => (
          <Col span={6} key={index} style={{ height: "100%" }}>
            <div
              className="image-card"
              style={{
                backgroundImage: `url(${bg})`,
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
