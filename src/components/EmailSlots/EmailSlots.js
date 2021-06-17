import React from "react"

import EmailBody from "../EmailBody/EmailBody";

import { emails } from "../../constants/app-defaults";

const EmailSlots = () => (
  <div className="container-fluid"> 
    { emails.map(emailBody => <EmailBody {...emailBody} />) }
  </div>
);

export default EmailSlots;