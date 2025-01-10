import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions";
import { useEffect } from "react";

const SurveyList = () => {
  const dispatch = useDispatch();
  const surveys = useSelector((state) => state.surveys);

  const renderSurveys = () => {
    return surveys.map((survey) => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    dispatch(actions.fetchSurveys());
  }, []);

  return <div>{renderSurveys()}</div>;
};

export default SurveyList;
