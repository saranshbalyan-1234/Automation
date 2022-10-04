import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllProject } from "../../Redux/Actions/project";
import { Button } from "antd";
import AddEditProjectModal from "./AddEditProjectModal";
export const AllProject = ({ getAllProject }) => {
  const [addEditProjectModal, setAddEditProjectModal] = useState(false);
  useEffect(() => {
    getAllProject();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          paddingTop: "10px",
        }}
      >
        <div></div>
        <Button
          type="primary"
          ghost
          onClick={() => {
            setAddEditProjectModal(true);
          }}
        >
          New Project
        </Button>
      </div>
      <AddEditProjectModal
        visible={addEditProjectModal}
        setVisible={setAddEditProjectModal}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { getAllProject };

export default connect(mapStateToProps, mapDispatchToProps)(AllProject);
