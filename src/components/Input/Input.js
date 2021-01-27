import React from 'react';

class Input extends React.Component {

  render() {
    const {id, type, label, hint, attributes, error_msg, is_valid} = this.props;

    let rendered_element = null;

    switch(type) {
      case 'checkbox':
        rendered_element = (
            <div className="text-start mb-3 row form-check">
          <div>
              <div className="col-sm-3 ">
                <input className="form-check-input" id={ id } type={ type } name={ id } />
              </div>
              <label htmlFor={ `#${id}` } className="col-sm-9 form-check-label">{ label }</label>
            </div>
            <div>
              <small className="text-danger">{ is_valid ? '' : error_msg}</small>
              <small>{ hint }</small>
            </div>
          </div>
        );
        break;

      case 'select':
        rendered_element = (
          <div className="text-start mb-3 row ">
            <label htmlFor={ `#${id}` } className="col-sm-3 col-form-label">{ label }</label>
            <div className="col-sm-9">
              <select className="form-select" id={ id } defaultValue={ attributes.defaultValue } name={ id }>{
                attributes.options.map((option) => {
                  return (
                    <option 
                      key={ option.value } 
                      value={ option.value }
                    >{ option.label }
                    </option>
                  );
                })
              }</select>
            </div>
            <small className="text-danger">{ is_valid ? '' : error_msg}</small>
            <small>{ hint }</small>
          </div>
        );
        break;

      case 'textarea':
        rendered_element = (
          <div className="text-start mb-3 row ">
            <label htmlFor={ `#${id}` } className="col-sm-3 col-form-label">{ label }</label>
            <div className="col-sm-9">
              <textarea className="form-control" id={ id } { ...attributes } name={ id }/>
            </div>
            <small className="text-danger">{ is_valid ? '' : error_msg}</small>
            <small>{ hint }</small>
          </div>
        );
        break;

      default:
        rendered_element = (
          <div className="text-start mb-3 row ">
            <label htmlFor={ `#${id}` } className="col-sm-3 col-form-label">{ label }</label>
            <div className="col-sm-9">
              <input className="form-control" id={ id } type={ type } name={ id } />
            </div>
            <small className="text-danger">{ is_valid ? '' : error_msg}</small>
            <small>{ hint }</small>
          </div>
        );
    }

    return rendered_element;
  }
}

export default Input;