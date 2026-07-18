import { EmailHistory } from "../models/email.history.model.js";
import { getColdEmailAi } from "../service/ai.service.js";

export const generateEmail = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const result = await getColdEmailAi(prompt);

    if (!result?.choices?.length) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate email",
      });
    }

    // Groq returns JSON as a string
    const response = JSON.parse(result.choices[0].message.content);

    const {
      subject,
      emailBody,
      linkedInDM,
      followUpEmail,
    } = response;

    const emailHistory = await EmailHistory.create({
      user: req.user._id,
      prompt,
      subject,
      emailBody,
      linkedInDM,
      followUpEmail,
    });

    return res.status(200).json({
      success: true,
      message: "Email generated successfully",
      coldEmail: emailHistory,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getEmailHistory = async (req, res) => {
  try {
    const emailHistory = await EmailHistory.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, history: emailHistory, message: "Email history fetched successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const getChatDetails = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await EmailHistory.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "No chat found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat fetched successfully",
      chat,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await EmailHistory.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "No chat found",
      });
    }

    await EmailHistory.findByIdAndDelete({_id:chatId});

    res.status(200).json({
      message:"chat deleted..",
      success:true
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}