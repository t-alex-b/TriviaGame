// 

$.fn.trivia = function () {
	var _t = this;
	_t.userPick = null;
	_t.answers = {
		correct: 0,
		incorrect: 0
	};
	_t.images = null;
	_t.count = 30;
	_t.current = 0;
	_t.questions = [{
		question: 'What is the name of Ronald Weasley\'s pet rat?',
		choices: ['Reggie', 'Gordon', 'Matthew', 'Scabbers'],
		images: [''],
		correct: 3
	},
	{
		question: 'How many heads did Fluffy have?',
		choices: ['1', '12', '3', '4',],
		images: '',
		correct: 2
	},
	{
		question: 'Who is Harry\'s least favorite proffesor?',
		choices: ['Snape', 'McGonagall', 'Sprout', 'Filch'],
		images: '',
		correct: 0
	},
	{
		question: 'What are the magical plants used to revive someone who\'s been petrified?',
		choices: ['Gillyweed', 'Dandelions', 'Mandrakes', 'Devil\'s Snare'],
		images: '',
		correct: 2
	},
	{
		question: 'In which year are Hogwart\'s students traditionally allowed to join their house quidditch team?',
		choices: ['2','3','7','1'],
		images: '',
		correct: 0
	},
	{
		question: 'What is the name of the all-magic village outside of Hogwart\'s?',
		choices: ['Surrey', 'Fiddlum Bens', 'Hogsmeade', 'Toadston'],
		images: '',
		correct: 2
	},
	{
		question: 'Who is Harry\'s first love interest in the series?',
		choices: ['Ginney Weasley', 'Cho Chang', 'Neville Longbottom', 'Penelope Clearwater'],
		images: '',
		correct: 1
	},
	{
		question: 'Which of the Deathly Hallows is passed down through Harry\'s family?',
		choices: ['Resurrection Stone', 'Elder Wand', 'Invisibility Cloak', 'Dragon\'s egg'],
		images: '',
		correct: 2
	},
	{
		question: 'How many wizards traditionally compete in the Tri-wizard Tournament?',
		choices: ['2', '4', '3', '6'],
		images: '',
		correct: 2
	},
	{
		question: 'what is the name of Harry\'s cousin whom he lives with?',
		choices: ['Chudley', 'Diddy', 'Gary', 'Dudley'],
		images: '',
		correct: 3
	}];
	_t.ask = function () {
		if (_t.questions[_t.current]) {
			$("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
			$("#question_div").html(_t.questions[_t.current].question);
			var choicesArr = _t.questions[_t.current].choices;
			var buttonsArr = [];

			for (var i = 0; i < choicesArr.length; i++) {
				var button = $('<button>');
				button.text(choicesArr[i]);
				button.attr('data-id', i);
				$('#choices_div').append(button);
			}
			window.triviaCounter = setInterval(_t.timer, 1000);
		} else {
			$('body').append($('<div />', {
				text: 'Unanswered: ' + (
					_t.questions.length - (_t.answers.correct + _t.answers.incorrect)),
				class: 'result'
			}));
			$('#start_button').text('Restart').appendTo('body').show();
		}
	};
	_t.timer = function () {
		_t.count--;
		if (_t.count <= 0) {
			setTimeout(function () {
				_t.nextQ();
			});

		} else {
			$("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
		}
	};
	_t.nextQ = function () {``
		_t.current++;
		clearInterval(window.triviaCounter);
		_t.count = 30;
		$('#timer').html("");
		setTimeout(function () {
			_t.cleanUp();
			_t.ask()
		}, 1000)
	};
	_t.cleanUp = function () {
		$('div[id]').each(function (item) {
			$(this).html('');
		});
		$('.correct').html('Correct answers: ' + _t.answers.correct);
		$('.incorrect').html('Incorrect answers: ' + _t.answers.incorrect);
	};
	_t.answer = function (correct) {
		var string = correct ? 'correct' : 'incorrect';
		_t.answers[string]++;
		$('.' + string).html(string + ' answers: ' + _t.answers[string]);
	};
	return _t;
};
var Trivia;

$("#start_button").click(function () {
	$(this).hide();
	$('.result').remove();
	$('div').html('');
	Trivia = new $(window).trivia();
	Trivia.ask();
});

$('#choices_div').on('click', 'button', function (e) {
	var userPick = $(this).data("id"),
		_t = Trivia || $(window).trivia(),
		index = _t.questions[_t.current].correct,
		correct = _t.questions[_t.current].choices[index];

	if (userPick !== index) {
		$('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
		_t.answer(false);
	} else {
		$('#choices_div').text("Correct!!! The correct answer was: " + correct);
		_t.answer(true);
	}
	_t.nextQ();
});