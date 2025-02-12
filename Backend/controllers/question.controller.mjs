import Question from "../models/question.model.mjs";
import Subject from "../models/subject.model.mjs";
import User from "../models/user.model.mjs";

/**
 * @desc    Create a new question
 * @route   POST /questions
 */
const createQuestion = async (req, res) => {
	try {
		const {
			question,
			subject_code,
			reference_book_or_source,
			image_url,
			options,
			correct_option_ids,
			time_required,
		} = req.body;

		const user = req.user;

		if (!question.trim()) {
			return res
				.status(400)
				.json({ error: "Question text is required." });
		}

		if (!subject_code) {
			return res.status(400).json({ error: "Subject code is required." });
		}

		if (!options || options.length < 2) {
			return res
				.status(400)
				.json({ error: "At least two options are required." });
		}

		if (!correct_option_ids || correct_option_ids.length === 0) {
			return res
				.status(400)
				.json({ error: "At least one correct option is required." });
		}
		// Check that all correct_option_ids are within the range of options
		const invalidOptionIds = correct_option_ids.some(
			(id) => id < 0 || id >= options.length
		);
		if (invalidOptionIds) {
			return res.status(400).json({
				error: `Correct option IDs must be between 0 and ${options.length}.`,
			});
		}

		// Check that all correct_option_ids are unique
		const uniqueOptionIds = new Set(correct_option_ids);
		if (uniqueOptionIds.size !== correct_option_ids.length) {
			return res.status(400).json({
				error: "Correct option IDs must be unique.",
			});
		}

		if (!time_required || time_required < 1) {
			return res
				.status(400)
				.json({ error: "Time required must be at least 1 second." });
		}
		const created_by = user.id;

		const { _id: subject_id } = await Subject.findOne({
			subject_code: subject_code,
		});

		if (!subject_id)
			return res.status(404).json({ error: "Subject not found" });

		const newQuestion = new Question({
			question,
			subject_id,
			created_by,
			reference_book_or_source,
			image_url,
			options,
			correct_option_ids,
			time_required,
		});

		await newQuestion.save();
		res.status(201).json({
			message: "Question created successfully.",
			newQuestion,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			error: "An error occurred while creating the question.",
			message: error.message,
		});
	}
};

/**
 * @desc    Get all questions of a subject
 * @route   GET /questions/subject/:subject_code
 */
const getQuestionsBySubject = async (req, res) => {
	try {
		const { subject_code } = req.params;

		const subject = await Subject.findOne({ subject_code });

		if (!subject)
			return res.status(404).json({ error: "Subject not found" });

		const questions = await Question.find({ subject_id: subject._id });

		res.status(200).json(questions);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Error fetching questions",
			message: error.message,
		});
	}
};

/**
 * @desc    Get all questions created by a teacher
 * @route   GET /questions/teacher/:username
 */
const getQuestionsByTeacher = async (req, res) => {
	try {
		const { username } = req.params;
		const teacher = await User.findOne({ username: username });
		console.log(teacher);

		if (!teacher || teacher.role != "teacher")
			return res.status(404).json({ error: "Teacher not found" });
		const questions = await Question.find({ created_by: teacher._id });

		res.status(200).json(questions);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Error fetching questions",
			message: error.message,
		});
	}
};

/**
 * @desc    Get all questions (with optional sorting)
 * @route   GET /questions
 * @query   sort_by (optional) - "upvote", "downvote", "saved_count"
 */
const getAllQuestions = async (req, res) => {
	try {
		const { sort_by } = req.query;
		console.log(sort_by);

		const sortOptions = {};
		if (["upvote", "downvote", "saved_count"].includes(sort_by)) {
			sortOptions[sort_by] = -1; // Descending order
		}

		const questions = await Question.find().sort(sortOptions);

		res.status(200).json(questions);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Error fetching questions",
			message: error.message,
		});
	}
};

/**
 * @desc    Update a question by ID
 * @route   PUT /questions/:id
 */
const updateQuestion = async (req, res) => {
	try {
		const { id } = req.params;
		const updateData = req.body;
		// Fields that should NOT be updated
		const restrictedFields = ["upvote", "downvote", "saved_count", "_id"];
		restrictedFields.forEach((field) => delete updateData[field]);
		const updatedQuestion = await Question.findByIdAndUpdate(
			id,
			updateData,
			{ new: true }
		);

		if (!updatedQuestion)
			return res.status(404).json({ error: "Question not found" });

		res.status(200).json({
			message: "Question updated successfully",
			updatedQuestion,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Error updating question",
			message: error.message,
		});
	}
};

/**
 * @desc    Delete a question
 * @route   DELETE /questions/:id
 */
const deleteQuestion = async (req, res) => {
	try {
		const { id } = req.params;
		const question = await Question.findById(id);

		if (!question) {
			return res.status(404).json({ error: "Question not found" });
		}

		await question.deleteOne();
		res.status(200).json({ message: "Question deleted successfully." });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Error deleting question",
			message: error.message,
		});
	}
};

export {
	createQuestion,
	getQuestionsBySubject,
	getQuestionsByTeacher,
	getAllQuestions,
	updateQuestion,
	deleteQuestion,
};
