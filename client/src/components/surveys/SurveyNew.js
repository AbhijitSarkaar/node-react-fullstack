import { useState } from "react";
import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyFormReview";

const SurveyNew = () => {
  const [formReview, setFormReview] = useState(false);

  const renderContent = () => {
    if (formReview) {
      return <SurveyReview onCancel={() => setFormReview(false)} />;
    }

    return <SurveyForm onSurveySubmit={() => setFormReview(true)} />;
  };

  return <div>{renderContent()}</div>;
};

export default SurveyNew;
