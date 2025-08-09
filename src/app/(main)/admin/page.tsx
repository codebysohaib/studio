import AdminTabs from "@/components/admin/AdminTabs";
import { getSubjects, getUsers, getAnnouncements } from "@/lib/data";

export default async function AdminPage() {
    const subjects = await getSubjects();
    const users = await getUsers();
    const announcements = await getAnnouncements();

    return (
        <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Admin Panel</h1>
            <AdminTabs subjects={subjects} users={users} announcements={announcements} />
        </div>
    );
}
