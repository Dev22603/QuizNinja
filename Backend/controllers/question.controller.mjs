import Question from "../models/question.model.mjs";

const createQuestion = async (req, res) => {
	try {
		const {
			question,
			subject_id,
			created_by,
			reference_book_or_source,
			image_url,
			options,
			correct_option_ids,
			time_required,
		} = req.body;

		if (!question.trim() || !options.length || !correct_option_ids.length) {
			return res
				.status(400)
				.json({
					error: "Question, options, and correct answers are required.",
				});
		}

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
			message: "Question created successfully",
			newQuestion,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
