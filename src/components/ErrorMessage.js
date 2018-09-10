import React from "react";
import { Message } from "semantic-ui-react";
import PropTypes from "prop-types";

/**
 * An Error component, shows one message [just to warn palyer]
 * TODO: Handle better with ability of specified message by sending error number or error message as props
 * @param {error} props
 * @see component:ErrorMessage
 */
const ErrorMessage = props => {
  const { errorMessage } = props;
  return (
    <Message negative>
      <Message.Header>{errorMessage.header}</Message.Header>
      {errorMessage.body}
    </Message>
  );
};

ErrorMessage.propTypes = {
  errorMessage: PropTypes.object.isRequired // eslint-disable-line
};
export default ErrorMessage;
