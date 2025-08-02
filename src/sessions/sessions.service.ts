import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionsService {
  constructor(private usersService: UsersService) {}

  getSessionOfTheDay(userId: number) {
    const user = this.usersService.findById(userId);
    if (!user) return null;
    const now = new Date();
    const dayIndex = now.getDay();
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const activities = [
      'Guided Meditation',
      'Journaling',
      'Breathing Exercise',
      'Yoga',
      'Mindful Walking',
      'Gratitude Practice',
      'Visualization',
    ];
    const activity = activities[Math.floor(Math.random() * activities.length)];
    return {
      dayOfWeek: days[dayIndex],
      date: now.toISOString().split('T')[0],
      activity,
      completed: user.completedSessions.includes(dayIndex),
    };
  }
}
