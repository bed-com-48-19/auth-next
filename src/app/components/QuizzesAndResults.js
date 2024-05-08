import ActionButton from "../ui-components/Modal/index";
import Table from "../ui-components/Modal/index";
import {
  FaCloudDownloadAlt,
  FaRegFilePdf,
  FaLongArrowAltDown,
} from "react-icons/fa";
import { useState } from "react";
import Modal from "../ui-components/Modal/index";

const table_column_heading = [
  {
    key: "quiz",
    heading: "Quiz",
  },
  {
    key: "quiz-date",
    heading: "Quiz date",
    icon: FaLongArrowAltDown,
  },
  {
    key: "students",
    heading: "Students",
  },
  {
    key: "action-btn",
    heading: "",
  },
];

const table_data = [
  {
    id: 1,
    quiz: {
      value: "Quiz #001 - Apr 2024",
      icon: FaRegFilePdf,
    },
    "quiz-date": {
      value: "Apr 20, 2024",
    },
    students: {
      value: "10 Students",
    },
    "action-btn": {
      component: () => (
        <ActionButton
          label="Download"
          Icon={FaCloudDownloadAlt}
          inverse={true}
          onClick={() => {
            alert('Welcome to Meep dashboard perfomance presentation');
          }}
        />
      ),
    },
  },
  {
    id: 2,
    quiz: {
      value: "Quiz #002 - Apr 2024",
      icon: FaRegFilePdf,
    },
    "quiz-date": {
      value: "Apr 19, 2024",
    },
    students: {
      value: "14 Students",
    },
    "action-btn": {
      component: () => (
        <ActionButton
          label="Download"
          Icon={FaCloudDownloadAlt}
          inverse={true}
        />
      ),
    },
  },
];

const QuizzesAndResults = () => {
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    //alert('closing');
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };
  return (
    <>
      <Table
        mainHeading={"Performance Trend"}
        subHeading={"Download your previous quiz results."}
        headingRightItem={() => (
          <ActionButton
            onClick={openModal}
            label="Download All"
            Icon={FaCloudDownloadAlt}
          />
        )}
        heading={table_column_heading}
        data={table_data}
      />
      <Modal
        isOpen={modal}
        heading={"Download all Results"}
        onClose={handleClose}
        positiveText={'Download'}
        negativeText={'Cancel'}
      />
    </>
  );
};

export default QuizzesAndResults;
