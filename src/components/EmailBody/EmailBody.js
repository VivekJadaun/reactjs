import React from "react"

import { recipientSalutation, senderSalutation } from "../../constants/app-defaults";

const EmailBody = (props) => {
  const { 
    salutation, 
    regards, 
    message 
  } = props;

  return message ? (
    <div className="card text-dark text-start mt-1">
      <div className="card-body">
        <h5 className="card-title">{salutation || recipientSalutation}</h5>
        <p className="card-text fs-6">{message}</p>
        <div className="fs-6"
          dangerouslySetInnerHTML={{ __html: regards || senderSalutation}}>
        </div>
      </div>
    </div>
  ) : '';
};

export default EmailBody;