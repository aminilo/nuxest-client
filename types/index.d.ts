export interface Property { /* Like when we create dummy data as a mock */
  id: number;
  title: string;
  slug: string;
  address: string;
  price: number;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  phone: string;
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  createdAt: string;
  role: 'guest' | 'user' | 'admin';
}

/*export interface UpdateProfilePayload {
  username?: string;
  phone?: string;
  bio?: string;
  avatar?: File;
}*/

export type UpdateProfilePayload = Partial<Pick<User, 'username' | 'phone' | 'bio'>> & { avatar?: File };

type ToastPosition = | 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';

export interface ToastOptions {
  position?: ToastPosition;
  timeout?: number;
}
