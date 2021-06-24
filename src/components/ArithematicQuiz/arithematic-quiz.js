import React from "react";

class ArithematicQuiz extends React.Component {
	constructor(props) {
		super(props);
		const question = this.getRandomQuestion();
		this.state = {
			score: 0,
			timer: this.props.timerDurationInSec,
			currentQuestion: 1,
			questionsLog: [{
				question: question, 
				answer: eval(question), 
				response: undefined,
			}],
		};
		this.timerId = undefined;
	}

	getRandomNumber = () => {
    const min = Math.ceil(this.props.minLimit);
    const max = Math.floor(this.props.maxLimit);
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	getRandomOperator = () => this.props.operators[Math.floor(Math.random() * this.props.operators.length)];

	getRandomQuestion = () => `${this.getRandomNumber()} ${this.getRandomOperator()} ${this.getRandomNumber()}`;

	generateNextQuestion = () => {
		const question = this.getRandomQuestion()
		const answer = eval(question);
		const { questionsLog, currentQuestion } = this.state;
		const questionEntry = { question: question, answer: answer, response: undefined };
		this.setState({
			questionsLog: [questionEntry].concat(questionsLog),
			currentQuestion: currentQuestion + 1,
			timer: this.props.timerDurationInSec,
		});
	}

	evaluateResponse = (e) => {
		const response = e?.target;
	}

	startTimerOrProceedToNextQuestion = () => {
		const { timer } = this.state;
		this.timerId = setTimeout(() => {
			this.setState({ timer: timer - 1 }, () => {
				if (timer === 0) {
					clearTimeout(this.timerId);
					this.evaluateResponse();
					if (this.state.currentQuestion <= this.props.questionsCount) {
						this.generateNextQuestion();
					}
				}
			});
		}, 1000);
	}

	componentDidMount = () => this.startTimerOrProceedToNextQuestion();

	componentDidUpdate = () => this.startTimerOrProceedToNextQuestion();

	renderResults = () => {
		return (
			<div className="">
				<table class="table text-white table-hover">
				  <thead>
				    <tr>
				      <th scope="col">#</th>
				      <th scope="col">Question</th>
				      <th scope="col">Answer</th>
				      <th scope="col">Response</th>
				    </tr>
				  </thead>
				  <tbody>
				  	{
				  		this.state.questionsLog.map(({ question, answer, response }, idx) => (
						    <tr className={`${answer === response ? 'table-success' : (response ? 'table-danger' : 'table-light')}`}>
						      <th scope="row">{ idx + 1}</th>
						      <td>{ question }</td>
						      <td>{ answer }</td>
						      <td>{ response || 'NA' }</td>
						    </tr>
			  			))
				  	}
				  </tbody>
				</table>
			</div>
		);
	};

	render = () => {
		const { title = 'Details of quiz', minLimit, maxLimit, questionsCount, timerDurationInSec, operators } = this.props;
		const { currentQuestion, timer, score, questionsLog } = this.state;
		const lastQuestion = questionsLog[questionsLog.length - 1].question;

		return (
			<div className="">
				<div className="d-flex gap-3">
					<span>Min Limit: { minLimit }</span>
					<span>Max Limit: { maxLimit }</span>
					<span>Questions Count: { questionsCount }</span>
					<span>Timer: { timerDurationInSec }</span>
				</div>

				<div className="">
					<div className="row">
						<div className="text-start col-6">
							Question No: { currentQuestion }
						</div>
						<div className="text-end col-6">
							Time Left: { timer }
						</div>
					</div>
					<div className="">
						{
							currentQuestion > questionsCount 
							? this.renderResults() : (
								<div className="input-group input-group-lg mb-3">
								  <span className="input-group-text" id="inputGroup-sizing-default">{lastQuestion}</span>
								  <input type="number" className="form-control" autoFocus/>
								  <button className="btn btn-outline-secondary" type="button" onClick={this.evaluateResponse}>Next</button>
								</div>
							)
						}
					</div>
				</div>
			</div>
		);
	}
}

export default ArithematicQuiz;