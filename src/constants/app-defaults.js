const senderName = 'Anonymous';
const recipientName = 'Sir';

const APP_DEFAULTS = {
  recipientSalutation: `Hi ${recipientName},`,
  senderSalutation: `Regards, <br> ${senderName}`,
  emails: [
    {
      salutation: null,
      regards: null,
      message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      salutation: null,
      regards: null,
      message: "",
    },
    {
      salutation: 'Dear Sir,',
      regards: 'Thanks, <br> Anonymous',
      message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ],

}

export const { recipientSalutation, senderSalutation, emails } = APP_DEFAULTS;
export default APP_DEFAULTS;