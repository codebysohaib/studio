import type { Subject, Resource, Announcement, User } from './types';

export const mockSubjects: Subject[] = [
    { id: 'math101', name: 'Mathematics 101', description: 'Introduction to Algebra and Geometry.', resourceCount: 2 },
    { id: 'phy202', name: 'Physics 202', description: 'Mechanics and Thermodynamics.', resourceCount: 1 },
    { id: 'chem301', name: 'Chemistry 301', description: 'Organic Chemistry fundamentals.', resourceCount: 0 },
    { id: 'cs101', name: 'Computer Science 101', description: 'Introduction to programming with Python.', resourceCount: 0 },
    { id: 'englit200', name: 'English Literature 200', description: 'A survey of British literature.', resourceCount: 0 },
    { id: 'hist350', name: 'History 350', description: 'The 20th Century World.', resourceCount: 0 },
];

export const mockResources: { [key: string]: Resource[] } = {
    'math101': [
        { id: '1', name: 'Algebra_Chapter_1.pdf', type: 'pdf', url: '#', uploadedAt: '2023-10-26', uploaderName: 'Sohaib Mughal' },
        { id: '2', name: 'Geometric_Shapes.png', type: 'image', url: '#', uploadedAt: '2023-10-25', uploaderName: 'Student A' },
    ],
    'phy202': [
        { id: '3', name: 'Newton_Laws.pdf', type: 'pdf', url: '#', uploadedAt: '2023-10-24', uploaderName: 'Sohaib Mughal' },
    ],
};

export const mockAnnouncements: Announcement[] = [
    { id: '1', title: 'Mid-term Exams Schedule', content: 'The mid-term exams will be held from Nov 15th to Nov 25th. Please check the detailed schedule in the documents section.', pinned: true, createdAt: '2023-10-28' },
    { id: '2', title: 'New Resources for Physics', content: 'New study materials for Physics 202 have been uploaded.', pinned: false, createdAt: '2023-10-27' },
    { id: '3', title: 'Welcome to LearnBox', content: 'Welcome everyone! Feel free to upload and share your study materials.', pinned: false, createdAt: '2023-10-20' },
];

export const mockUsers: User[] = [
    { id: '1', name: 'Sohaib Mughal', email: 'mughalsohaib240@gmail.com', role: 'admin', avatar: 'https://placehold.co/100x100.png' },
    { id: '2', name: 'Student A', email: 'student.a@example.com', role: 'student', avatar: 'https://placehold.co/100x100.png' },
    { id: '3', name: 'Student B', email: 'student.b@example.com', role: 'student', avatar: 'https://placehold.co/100x100.png' },
]

// Mock API functions
export const getSubjects = async (): Promise<Subject[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockSubjects;
}

export const getSubjectById = async (id: string): Promise<Subject | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockSubjects.find(s => s.id === id);
}

export const getResourcesForSubject = async (subjectId: string): Promise<Resource[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockResources[subjectId] || [];
}

export const getAnnouncements = async (): Promise<Announcement[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAnnouncements.sort((a, b) => (a.pinned === b.pinned) ? 0 : a.pinned ? -1 : 1);
}

export const getUsers = async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers;
}
