export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  avatar?: string;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  resourceCount: number;
}

export interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'doc' | 'other';
  url: string;
  uploadedAt: string;
  uploaderName: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  createdAt: string;
}
