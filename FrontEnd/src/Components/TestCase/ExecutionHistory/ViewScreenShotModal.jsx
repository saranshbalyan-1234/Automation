import React, { useEffect, useState } from "react";
import { Modal, Image } from "antd";
import { fetchAwsObject } from "../../../Redux/Actions/image";
import { connect } from "react-redux";
import Loading from "../../Common/Loading";

const ViewScreenShotModal = ({
  visible,
  setVisible,
  fetchAwsObject,
  images,
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchScreenShot();
  }, []);

  const fetchScreenShot = async () => {
    if (!images[visible]) {
      setLoading(true);
      await fetchAwsObject(visible);
      setLoading(false);
    }
  };

  return (
    <Modal
      width={1200}
      centered
      visible={visible}
      footer={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Loading loading={loading}>
        <Image src={"data:image/jpeg;base64," + images[visible]} />
      </Loading>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  images: state.image,
});

const mapDispatchToProps = {
  fetchAwsObject,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewScreenShotModal);
