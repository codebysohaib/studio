"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Subject, User, Announcement } from "@/lib/types";
import SubjectManager from "./SubjectManager";
import UserManager from "./UserManager";
import AnnouncementManager from "./AnnouncementManager";

interface AdminTabsProps {
    subjects: Subject[];
    users: User[];
    announcements: Announcement[];
}

export default function AdminTabs({ subjects, users, announcements }: AdminTabsProps) {
    return (
        <Tabs defaultValue="subjects" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="subjects">Manage Subjects</TabsTrigger>
                <TabsTrigger value="users">Manage Users</TabsTrigger>
                <TabsTrigger value="announcements">Manage Announcements</TabsTrigger>
            </TabsList>
            <TabsContent value="subjects" className="mt-4">
                <SubjectManager initialSubjects={subjects} />
            </TabsContent>
            <TabsContent value="users" className="mt-4">
                <UserManager initialUsers={users} />
            </TabsContent>
            <TabsContent value="announcements" className="mt-4">
                <AnnouncementManager initialAnnouncements={announcements} />
            </TabsContent>
        </Tabs>
    );
}
