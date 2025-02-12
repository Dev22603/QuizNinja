import Question from "../models/question.model.mjs";
import QuestionInteraction from "../models/questionInteraction.model.mjs";

/**
 * @desc    Toggle upvote
 * @route   POST /questions/:question_id/upvote
 */
const toggleUpvote = async (req, res) => {
	try {
		const { question_id } = req.params;
		const user_id = req.user.id;

		let interaction = await QuestionInteraction.findOne({
			user_id,
			question_id,
		});

		if (!interaction) {
			interaction = new QuestionInteraction({
				user_id,
				question_id,
				upvoted: true,
			});
			await interaction.save();
			await Question.findByIdAndUpdate(question_id, {
				$inc: { upvote: 1 },
			});
		} else {
			if (interaction.upvoted) {
				interaction.upvoted = false;
				await Question.findByIdAndUpdate(question_id, {
					$inc: { upvote: -1 },
				});
			} else {
				interaction.upvoted = true;
				await Question.findByIdAndUpdate(question_id, {
					$inc: { upvote: 1 },
				});

				if (interaction.downvoted) {
					interaction.downvoted = false;
					await Question.findByIdAndUpdate(question_id, {
						$inc: { downvote: -1 },
					});
				}
			}
			await interaction.save();
		}

		res.status(200).json({ message: "Upvote toggled", interaction });
	} catch (error) {
		res.status(500).json({
			error: "Error updating upvote",
			message: error.message,
		});
	}
};

/**
 * @desc    Toggle downvote
 * @route   POST /questions/:question_id/downvote
 */
const toggleDownvote = async (req, res) => {
	try {
		const { question_id } = req.params;
		const user_id = req.user.id;

		let interaction = await QuestionInteraction.findOne({
			user_id,
			question_id,
		});

		if (!interaction) {
			interaction = new QuestionInteraction({
				user_id,
				question_id,
				downvoted: true,
			});
			await interaction.save();
			await Question.findByIdAndUpdate(question_id, {
				$inc: { downvote: 1 },
			});
		} else {
			if (interaction.downvoted) {
				interaction.downvoted = false;
				await Question.findByIdAndUpdate(question_id, {
					$inc: { downvote: -1 },
				});
			} else {
				interaction.downvoted = true;
				await Question.findByIdAndUpdate(question_id, {
					$inc: { downvote: 1 },
				});

				if (interaction.upvoted) {
					interaction.upvoted = false;
					await Question.findByIdAndUpdate(question_id, {
						$inc: { upvote: -1 },
					});
				}
			}
			await interaction.save();
		}

		res.status(200).json({ message: "Downvote toggled", interaction });
	} catch (error) {
		res.status(500).json({
			error: "Error updating downvote",
			message: error.message,
		});
	}
};

/**
 * @desc    Toggle save question
 * @route   POST /questions/:question_id/save
 */
const toggleSaveQuestion = async (req, res) => {
	try {
		const { question_id } = req.params;
		const user_id = req.user.id;

		let interaction = await QuestionInteraction.findOne({
			user_id,
			question_id,
		});

		if (!interaction) {
			interaction = new QuestionInteraction({
				user_id,
				question_id,
				saved: true,
			});
			await interaction.save();
			await Question.findByIdAndUpdate(question_id, {
				$inc: { saved_count: 1 },
			});
		} else {
			if (interaction.saved) {
				interaction.saved = false;
				await Question.findByIdAndUpdate(question_id, {
					$inc: { saved_count: -1 },
				});
			} else {
				interaction.saved = true;
				await Question.findByIdAndUpdate(question_id, {
					$inc: { saved_count: 1 },
				});
			}
			await interaction.save();
		}

		res.status(200).json({ message: "Save toggled", interaction });
	} catch (error) {
		res.status(500).json({
			error: "Error updating save",
			message: error.message,
		});
	}
};

export { toggleUpvote, toggleDownvote, toggleSaveQuestion };
