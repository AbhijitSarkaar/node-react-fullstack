import { useSelector } from "react-redux";

const FIELDS = [
  {
    label: "Survey Title",
    name: "title",
  },
  {
    label: "Subject Line",
    name: "subject",
  },
  {
    label: "Email body",
    name: "body",
  },
  {
    label: "Recipient List",
    name: "emails",
  },
];

const SurveyReview = ({ onCancel }) => {
  const form = useSelector((state) => state.form);
  const formValues = form.surveyForm.values;

  const renderFields = () => {
    return FIELDS.map((field) => {
      return (
        <div key={field.label}>
          <label>{field.label}</label>
          <div>{formValues[field.name]}</div>
        </div>
      );
    });
  };

  return (
    <>
      <h5>Please confirm your entries</h5>

      <div>{renderFields()}</div>

      <button
        className={"yellow darken-3 btn-flat white-text"}
        onClick={onCancel}
      >
        Back
      </button>
      <button className="green right btn-flat white-text">Send Survey</button>
    </>
  );
};

export default SurveyReview;
