const LOCAL_KEY = 'dummy-users';

const fallbackUsers = [
  {
    id: 1,
    email: 'amir@gmail.com',
    password: 'Amir1234',
    username: 'amir',
    avatar: '/avatars/amir.png',
    phone: '',
    bio: '',
    role: 'user',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    email: 'ross@gmail.com',
    password: 'Ross1234',
    username: 'ross',
    avatar: '/avatars/ross.png',
    phone: '',
    bio: '',
    role: 'user',
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

export const useDummyUsers = () => {
  const stored = localStorage.getItem(LOCAL_KEY);
  return stored ? JSON.parse(stored) : fallbackUsers;
};

export const updateDummyUser = (updatedUser: any) => {
  const users = useDummyUsers();
  const index = users.findIndex((u: any) => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
  }
};
