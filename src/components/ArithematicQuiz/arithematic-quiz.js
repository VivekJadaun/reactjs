import React from "react";

class ArithematicQuiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			score: 0,
			timer: this.props.timerDurationInSec,
			currentQuestion: 1,
			questionsLog: [{ ...this.getNextQuestion() }],
		};
		this.timerId = undefined;
	}

	getQuizForm = () => document.querySelector('[data-behaviour="response-form"]');

	getRandomNumber = () => {
    const min = Math.ceil(this.props.minLimit);
    const max = Math.floor(this.props.maxLimit);
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	getRandomOperator = () => this.props.operators[Math.floor(Math.random() * this.props.operators.length)];

	getRandomQuestion = () => `${this.getRandomNumber()} ${this.getRandomOperator()} ${this.getRandomNumber()}`;

	evaluateAnswer = question => Math.round(eval(question) * 100) / 100;

	getNextQuestion = () => {
		const question = this.getRandomQuestion()
		const answer = this.evaluateAnswer(question);
		return { question: question, answer: answer, response: undefined };
	}

	getLatestScore = (response) => {
		const { score, questionsLog, currentQuestion } = this.state;
		const lastQuestion = questionsLog[currentQuestion - 1];
		return lastQuestion.answer === response ? score + 1 : score
	}

	submitResponse = (e) => {
		e.preventDefault();
		this.evaluateResponse(e.target['response'].value);
	};

	evaluateResponse = (userResponse) => {
		const response = eval(userResponse);
		const { questionsLog, currentQuestion } = this.state;
		const { questionsCount, timerDurationInSec } = this.props;
		let newQuestionsLog = questionsLog.map(question => question);
		const newScore = this.getLatestScore(response);
		const nextCurrentQuestion = currentQuestion + 1;

		newQuestionsLog[currentQuestion - 1].response = response;

		if (nextCurrentQuestion <= questionsCount) {
			const nextQuestion = this.getNextQuestion();
			newQuestionsLog.push(nextQuestion);
		}

		clearTimeout(this.timerId);

		this.setState({
			score: newScore,
			questionsLog: newQuestionsLog,
			currentQuestion: nextCurrentQuestion,
			timer: currentQuestion === questionsCount ? 0 : timerDurationInSec,
		}, () => this.getQuizForm()?.reset());
	}

	decrementTimer = () => {
		const { timer } = this.state;

		this.timerId = setTimeout(() => {
			this.setState({ 
				timer: timer - 1, 
			}, () => {
				const { timer } = this.state;
				if (timer === 0) {
					this.evaluateResponse();
				}
			});
		}, 1000);
	}

	componentDidMount = () => this.decrementTimer();

	componentDidUpdate = () => {
		const { timer, currentQuestion } = this.state;
		const { questionsCount } = this.props;
		const isNotLastQuestion = currentQuestion <= questionsCount;

		if (timer > 0) {
			this.decrementTimer();
		}

		if (timer === 0 && isNotLastQuestion) {
			const responseForm = this.getQuizForm();
			const response = eval(responseForm['response'].value);
			this.evaluateResponse(response);
		}
	};

	renderResults = () => {
		const { score } = this.state;
		return (
			<div className="">
				<div className="bg-warning text-dark text-center fs-2">Final Score: { score }</div>
				<table className="table text-white table-hover">
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
						    <tr key={idx} className={`${answer === response ? 'table-success' : (response ? 'table-danger' : 'table-light')}`}>
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
		const { title, minLimit, maxLimit, questionsCount, timerDurationInSec, operators } = this.props;
		const { currentQuestion, timer, score, questionsLog } = this.state;
		const lastQuestion = questionsLog[questionsLog.length - 1].question;
		const quizOver = (currentQuestion > questionsCount && timer === 0);

		return (
			<div className="border border-1 border-white px-2 mb-2" style={{maxHeight: "35vmax", overflowY: "auto"}}>
				<div className="container-fluid m-0 p-0 row">
					<div className="text-uppercase text-start fs-3 col-4 p-0 m-0">
						{title}
					</div>
					<div className="col-8 text-end pt-2">
						<span className="px-2 ">Min Limit: { minLimit }</span>
						<span className="px-2 ">Max Limit: { maxLimit }</span>
						<span className="px-2 ">Questions Count: { questionsCount }</span>
						<span className="px-2 ">Timer: { timerDurationInSec }</span>
					</div>
				</div>

				<div className="">
					{
						quizOver ? this.renderResults() : (
							<div className="">
								<div className="row">
									<div className="text-start col-6">
										Question No: { currentQuestion }
									</div>
									<div className="text-end col-6">
										Time Left: { timer }
									</div>
								</div>
								<form onSubmit={this.submitResponse} data-behaviour="response-form">
									<div className="input-group input-group-lg mb-3">
									  <span className="input-group-text" id="inputGroup-sizing-default">{lastQuestion}</span>
									  <input autoComplete="off" type="number" step='0.01' name="response" className="form-control" autoFocus/>
									  <button className="btn btn-outline-secondary" type="submit">Next</button>
									</div>
									<div>Score: {score}</div>
								</form>
							</div>
						)
					}
				</div>
			</div>
		);
	}
}

export default ArithematicQuiz;