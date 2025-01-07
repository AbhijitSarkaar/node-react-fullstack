import StripeCheckout from "react-stripe-checkout";
import { useDispatch } from "react-redux";
import * as actions from "../actions";

const Payments = () => {
  const dispatch = useDispatch();

  const onToken = (authToken) => {
    console.log(authToken);
    dispatch(actions.handleToken(authToken));
  };

  return (
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 email credits"
      amount={500}
      token={onToken}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className="btn">Add credits</button>
    </StripeCheckout>
  );
};

export default Payments;
