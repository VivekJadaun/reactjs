import React from "react";
import ArithematicQuiz from '../ArithematicQuiz/arithematic-quiz'

const quizDefaults = {
	minLimit: 0,
	maxLimit: 20,
	questionsCount: 2,
	timerDurationInSec: 5,
	operators: ['+', '-', '*', '/'],
};

class ArithematicQuizGenerator extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.useDefault ? {...quizDefaults} : {
			quizes: [],
		};
	}

	validateQuizForm = (e) => {
		e.preventDefault();
		const formInputs = e.target;
		console.log(formInputs);
	}

	renderQuizGeneratorForm = () => (
		<form className="" onSubmit={this.validateQuizForm}>
	  	<div className="col-12 row mb-2">
		    <label htmlFor="minLimit" className="col-6 col-form-label">Min Limit</label>
		    <div className="col-6">
		      <input type="number" min="1" name="minLimit" className="form-control" id="minLimit" required />
		    </div>
		  </div>

	  	<div className="col-12 row mb-2">
		    <label htmlFor="maxLimit" className="col-6 col-form-label">Max Limit</label>
		    <div className="col-6">
		      <input type="number" min="1" name="maxLimit" className="form-control" id="maxLimit" required />
		    </div>
		  </div>

	  	<div className="col-12 row mb-2">
		    <label htmlFor="questionsCount" className="col-6 col-form-label">Questions Count</label>
		    <div className="col-6">
		      <input type="number" min="1" name="questionsCount" className="form-control" id="questionsCount" required />
		    </div>
		  </div>

	  	<div className="col-12 row mb-2">
		    <label htmlFor="timerDurationInSec" className="col-6 col-form-label">Timer (in sec)</label>
		    <div className="col-6">
		      <input type="number" min="1" name="timerDurationInSec" className="form-control" id="timerDurationInSec" required />
		    </div>
		  </div>

	  	<div className="col-12 row mb-2">
	  		<div className="col-6">
	  			Operators: 
	  		</div>
	  		<div className="col-6">
			    <div className="form-check form-check-inline">
					  <input className="form-check-input" type="checkbox" name="operator+" id="operator+" value="+" />
					  <label className="form-check-label" htmlFor="operator+">+</label>
					</div>
			    <div className="form-check form-check-inline">
					  <input className="form-check-input" type="checkbox" name="operator-" id="operator-" value="-" />
					  <label className="form-check-label" htmlFor="operator-">-</label>
					</div>
			    <div className="form-check form-check-inline">
					  <input className="form-check-input" type="checkbox" name="operator*" id="operator*" value="*" />
					  <label className="form-check-label" htmlFor="operator*">*</label>
					</div>
			    <div className="form-check form-check-inline">
					  <input className="form-check-input" type="checkbox" name="operator/" id="operator/" value="/" />
					  <label className="form-check-label" htmlFor="operator/">/</label>
					</div>
		  	</div>
		  </div>

		  <button type="submit" className="btn btn-success mt-2">Submit</button>
	  </form>
	);

	render = () => {
		const { useDefault } = this.props;

	  return useDefault ? (
	  	<div>
	  		<ArithematicQuiz {...this.state} />
	  	</div>
	  	) : (
	  	<div className="container-fluid fs-6">
	  		<div className="col-4">
	  			{ this.renderQuizGeneratorForm() }
		  	</div>
		  </div>
	  		
	  );
	}
}

export default ArithematicQuizGenerator;