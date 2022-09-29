import React from "react";
import { Modal, Badge, Card } from "antd";
export default function NotificationModal({
  notificationModal,
  setNotificationModal,
}) {
  return (
    <Modal
      title="Notifications"
      footer={false}
      visible={notificationModal}
      onCancel={() => setNotificationModal(false)}
    >
      <div style={{ maxHeight: "60vh", width: "auto", overflow: "scroll" }}>
        <Badge.Ribbon text="Hippies">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="Hippies" color="pink">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="Hippies" color="red">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="Hippies" color="cyan">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="Hippies" color="green">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="Hippies" color="purple">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="Hippies" color="volcano">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="Hippies" color="magenta">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
        </Badge.Ribbon>
      </div>
    </Modal>
  );
}
