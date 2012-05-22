for (var i = 0; i < WodGenerator.exercises.length; i++) {
	var exercise = WodGenerator.exercises[i];
	if (document.getElementsByClassName(exercise.category).length == 0) {
		var div = document.createElement("div");
		div.className = exercise.category + " exercise-container";
		var input = document.createElement("input");
		input.type = "checkbox";
		input.className = exercise.category + " main-input";
		input.checked = true;
		input.name = exercise.category;
		input.addEventListener('click', function(event) {
			checkboxes = $('input.' + this.name).not('.main-input').toArray();
			for (var j = 0; j < checkboxes.length; j++) {
				var checkbox = checkboxes[j];
				checkbox.checked = this.checked;
        $(checkbox).trigger('change');
			}
		});
		var label = document.createElement('label')
		label.className = "checkbox";
		label.appendChild(document.createTextNode(exercise.category));
		label.appendChild(input);
		var child_div = document.createElement("div");
		child_div.className = exercise.category + " exercise-sub-container";
		div.appendChild(label);
		div.appendChild(child_div);
		document.getElementById('exercises').appendChild(div);
	}
	var input = document.createElement("input");
	input.type = "checkbox";
	input.className = exercise.category;
	input.checked = true;
	input.name = exercise.name;
	var label = document.createElement('label')
	label.className = "checkbox";
	label.appendChild(document.createTextNode(exercise.name));
	label.appendChild(input);
	$("."+exercise.category+" .exercise-sub-container")[0].appendChild(label);
}

Set.prototype.render = function() {
    return this.reps + " " + this.exercise.renderForLevel(this.difficultyLevel) + " ";
}

Workout.prototype.render = function() {
    var renderedWorkout = "<dl><dt>";
    if (this.workoutType == "AMRAP") {
        renderedWorkout += "As many rounds as possible in " + this.time + " minutes of: ";
    }
    else {
        renderedWorkout += this.numberOfRounds + " round" + ((this.numberOfRounds != 1) ? "s" : "") + " of: "
    }
    renderedWorkout += "</dt>";
    renderedWorkout += this.superset.render();
    renderedWorkout += "</dl>";
    return renderedWorkout;
};

document.getElementById('generateWorkout').addEventListener('click', function() {
	var exerciseNames = $.map($("input:checked").not(".main-input"), function(e) {
		return e.name;
	});
	var exercises = WodGenerator.exercises.filter(function(exercise) {
		return ($.inArray(exercise.name, exerciseNames) != -1);
	});
	WodGenerator.workout = new Workout(120, exercises);
	renderWod();
});

function renderWod() {
	var html = WodGenerator.workout.render();
	$("#workout_display").html(html);
	$("#workout_title").show();
	
}

$("#button_harder").click(function() {
	WodGenerator.workout.scaleToDifficulty(WodGenerator.workout.difficulty() + 10);
	renderWod();
});

$("#button_easier").click(function() {
	WodGenerator.workout.scaleToDifficulty(WodGenerator.workout.difficulty() - 10);
	renderWod();
});
