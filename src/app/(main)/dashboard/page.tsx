import { getAnnouncements, getSubjects } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Megaphone, Book, FileText } from "lucide-react";
import type { Announcement } from "@/lib/types";

export default async function DashboardPage() {
  const subjects = await getSubjects();
  const announcements = await getAnnouncements();

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight mb-6 font-headline">Subjects</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {subjects.map((subject) => (
              <Link href={`/subjects/${subject.id}`} key={subject.id}>
                <Card className="hover:border-primary transition-colors h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-md">
                        <Book className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="font-headline">{subject.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{subject.description}</CardDescription>
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <FileText className="h-4 w-4 mr-1.5" />
                      {subject.resourceCount} Resources
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold tracking-tight mb-6 font-headline">Announcements</h2>
          <div className="space-y-4">
            {announcements.map((announcement: Announcement) => (
              <Card key={announcement.id} className={announcement.pinned ? "border-primary bg-primary/5" : ""}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                     <div className="bg-accent/20 p-2 rounded-md mt-1">
                      <Megaphone className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-headline">{announcement.title}</CardTitle>
                      <p className="text-xs text-muted-foreground">{new Date(announcement.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{announcement.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
