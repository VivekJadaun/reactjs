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
				answer: this.evaluateAnswer(question), 
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

	evaluateAnswer = question => Math.round(eval(question) * 100) / 100;

	generateNextQuestion = () => {
		const question = this.getRandomQuestion()
		const answer = this.evaluateAnswer(question);
		const { questionsLog, currentQuestion } = this.state;
		const questionEntry = { question: question, answer: answer, response: undefined };
		this.setState({
			questionsLog: [questionEntry].concat(questionsLog),
			currentQuestion: currentQuestion + 1,
			timer: this.props.timerDurationInSec,
		});
	}

	evaluateResponse = (e) => {
		e.preventDefault();
		const response = eval(e.target['response'].value);
		const { currentQuestion, questionsLog, score } = this.state;
		let newQuestionsLog = [...questionsLog];
		let lastQuestion = newQuestionsLog[currentQuestion - 1];
		lastQuestion.response = response;
		const newScore = response === lastQuestion.answer ? score + 1 : score;
		this.setState({ 
			questionsLog: newQuestionsLog,
			score: newScore,
		});
	}

	startTimerOrProceedToNextQuestion = () => {
		const { timer } = this.state;
		this.timerId = setTimeout(() => {
			this.setState({ timer: timer - 1 }, () => {
				const { timer, currentQuestion } = this.state;
				if (timer === 0) {
					clearTimeout(this.timerId);
					this.evaluateResponse();
					if (currentQuestion < this.props.questionsCount) {
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
		const quizOver = (currentQuestion === questionsCount && timer === 0);

		return (
			<div className="" style={{height: "100vmax"}}>
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
							quizOver ? this.renderResults() : (
								<form onSubmit={this.evaluateResponse}>
									<div className="input-group input-group-lg mb-3">
									  <span className="input-group-text" id="inputGroup-sizing-default">{lastQuestion}</span>
									  <input type="number" step='0.01' name="response" className="form-control" autoFocus/>
									  <button className="btn btn-outline-secondary" type="submit">Next</button>
									</div>
									<div>Score: {score}</div>
								</form>
							)
						}
					</div>
				</div>
			</div>
		);
	}
}

export default ArithematicQuiz;