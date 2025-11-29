import Reminder from '../models/Reminder.js';

export const createReminder = async (req, res) => {
  try {
    const { title, description, type, reminderDate, reminderTime, frequency, priority } = req.body;

    const reminder = new Reminder({
      userId: req.user.userId,
      title,
      description,
      type,
      reminderDate,
      reminderTime,
      frequency,
      priority,
    });

    await reminder.save();
    res.status(201).json({ message: 'Reminder created successfully', reminder });
  } catch (error) {
    res.status(500).json({ message: 'Error creating reminder', error: error.message });
  }
};

export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.userId })
      .sort({ reminderDate: 1, reminderTime: 1 });

    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reminders', error: error.message });
  }
};

export const getUpcomingReminders = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const reminders = await Reminder.find({
      userId: req.user.userId,
      reminderDate: { $gte: today },
      isCompleted: false,
    })
      .sort({ reminderDate: 1, reminderTime: 1 })
      .limit(10);

    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcoming reminders', error: error.message });
  }
};

export const updateReminder = async (req, res) => {
  try {
    const { reminderId } = req.params;
    const { title, description, type, reminderDate, reminderTime, frequency, priority, isCompleted } = req.body;

    const reminder = await Reminder.findByIdAndUpdate(
      reminderId,
      { title, description, type, reminderDate, reminderTime, frequency, priority, isCompleted },
      { new: true, runValidators: true }
    );

    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    res.json({ message: 'Reminder updated successfully', reminder });
  } catch (error) {
    res.status(500).json({ message: 'Error updating reminder', error: error.message });
  }
};

export const markReminderComplete = async (req, res) => {
  try {
    const { reminderId } = req.params;

    const reminder = await Reminder.findByIdAndUpdate(
      reminderId,
      { isCompleted: true },
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    res.json({ message: 'Reminder marked as complete', reminder });
  } catch (error) {
    res.status(500).json({ message: 'Error marking reminder complete', error: error.message });
  }
};

export const deleteReminder = async (req, res) => {
  try {
    const { reminderId } = req.params;
    const reminder = await Reminder.findByIdAndDelete(reminderId);

    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }

    res.json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reminder', error: error.message });
  }
};
