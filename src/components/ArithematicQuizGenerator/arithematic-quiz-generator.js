import React from "react";
import ArithematicQuiz from '../ArithematicQuiz/arithematic-quiz'

import quizDefaults from "../../constants/quiz-defaults";

class ArithematicQuizGenerator extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.useDefault ? {...quizDefaults} : {
			quizzes: [],
			validationError: '',
		};
	}

	validateQuizForm = (e) => {
		e.preventDefault();
		const formInputs = e.target;

		const quiz = {
			minLimit: Number(formInputs['minLimit'].value),
			maxLimit: Number(formInputs['maxLimit'].value),
			questionsCount: Number(formInputs['questionsCount'].value),
			timerDurationInSec: Number(formInputs['timerDurationInSec'].value),
			operators: [...formInputs['operators[]']].filter(op => op.checked).map(op => op.value),
		};

		if (!quiz.operators.length) {
			return this.setState({ validationError: "At least one operator must be selected" });
		}

		const { quizzes } = this.state;
		this.setState({
			quizzes: quizzes.concat(quiz),
			validationError: '',
		}, () => formInputs.reset());
	}

	renderQuizGeneratorForm = () => {
		const { validationError } = this.state;
		return (
			<form className="" onSubmit={this.validateQuizForm}>
		  	<div className="col-12 row mb-2">
			    <label htmlFor="minLimit" className="col-6 col-form-label">Min Limit</label>
			    <div className="col-6">
			      <input type="number" min="1" name="minLimit" className="form-control" id="minLimit" autoFocus required />
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
		  			{
		  				quizDefaults.operators.map(operator => (
		  					<div className="form-check form-check-inline" key={operator}>
								  <input className="form-check-input" type="checkbox" name="operators[]" id={`operator${operator}`} value={operator} />
								  <label className="form-check-label" htmlFor={`operator${operator}`}>{operator}</label>
								</div>
	  					))
		  			}
					  { validationError && <div className="text-danger">{validationError}</div> }
			  	</div>
			  </div>

			  <button type="submit" className="btn btn-success mt-2">Submit</button>
		  </form>
		);
	}

	render = () => {
		const { useDefault } = this.props;
		const { quizzes } = this.state;

	  return useDefault ? (
	  	<div className="container-fluid">
	  		<ArithematicQuiz {...this.state} />
	  	</div>
	  	) : (
	  	<div className="container-fluid fs-6 row" style={{maxHeight: "740px", overflowY: "hidden"}}>
	  		<div className="col-4 border-end border-1" style={{height: "100vmax"}}>
	  			{ this.renderQuizGeneratorForm() }
		  	</div>
	  		<div className="col-8 p-3" style={{maxHeight: "740px", overflowY: "auto"}}>
	  			{ quizzes.map((quiz, idx) => <ArithematicQuiz {...quiz} title={`Quiz No ${idx+1}`} key={idx}/>) }
		  	</div>
		  </div>
	  		
	  );
	}
}

export default ArithematicQuizGenerator;