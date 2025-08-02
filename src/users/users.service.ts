import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  username: string;
  subscriptionStatus: 'inactive' | 'active';
  subscribedAt: Date | null;
  startDate: Date;
  completedSessions: number[];
};

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'test',
      subscriptionStatus: 'inactive',
      subscribedAt: null,
      startDate: new Date('2024-08-01'),
      completedSessions: [],
    },
  ];

  findById(id: number) {
    return this.users.find((u) => u.id === id);
  }

  updateUser(id: number, data: Partial<User>) {
    const user = this.findById(id);
    if (user) {
      Object.assign(user, data);
    }
    return user;
  }

  getAll() {
    return this.users;
  }
}
