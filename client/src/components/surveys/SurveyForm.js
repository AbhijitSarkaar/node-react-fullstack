import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
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

const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {
  const renderFields = () => {
    return (
      <>
        {FIELDS.map((field) => (
          <Field
            key={field.label}
            {...field}
            type={"text"}
            component={SurveyField}
          />
        ))}
      </>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit((values) => onSurveySubmit(values))}>
        {renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
        </button>
      </form>
    </div>
  );
};

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = "Title is required!";
  }
  if (!values.subject) {
    errors.subject = "Subject is required!";
  }
  if (!values.body) {
    errors.body = "Email body is required!";
  }
  if (!values.emails) {
    errors.emails = "Recipient List is required!";
  }

  errors.emails = validateEmails(values.emails || "");

  return errors;
};

export default reduxForm({
  validate,
  //name of form as stored in redux
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
