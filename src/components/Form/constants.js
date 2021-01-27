const constants = {
  input_elements: [
    {
      id: 'login_id',
      type: 'input',
      label: 'Login Id',
      validations: {
        required: true,
      },
      error_msg: 'Login Id is required',
      is_valid: true,
    },

    {
      id: 'email',
      type: 'input',
      label: 'Email',
      validations: {
        required: true,
        regex: 'email',
      },
      error_msg: 'Valid Email is required',
      is_valid: true,
    },

    {
      id: 'name',
      type: 'input',
      label: 'Name',
      validations: {
        required: true,
      },
      error_msg: 'Name is required',
      is_valid: true,
    },

    {
      id: 'timezone',
      type: 'select',
      label: 'Timezone',
      attributes: {
        options: [
          { value: 'gmt', label: 'GMT' },
          { value: 'ist', label: 'IST' },
        ],
        defaultValue: 'gmt',
      },
      validations: {
        required: true,
      },
      error_msg: 'Timezone is required',
      is_valid: true,
    },

    {
      id: 'home_page',
      type: 'input',
      label: 'Home Page',
      validations: {
        required: true,
        regex: 'url',
      },
      error_msg: 'Valid Home Page is required',
      is_valid: true,
    },
    
    {
      id: 'about_me',
      type: 'textarea',
      attributes: {
        maxLength: '50',
      },
      label: 'About Me',
      validations: {
        max_length: 50,
      },
      error_msg: 'About Me must be within 50 characters',
      is_valid: true,
    },
    
    {
      id: 'receive_notifications',
      type: 'checkbox',
      label: 'Receive notification of comments',
      hint: 'You will be sent and email when someone posts comments to your Blog or Album',
    },

  ]
};

export default constants;