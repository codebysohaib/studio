import { getSubjectById, getResourcesForSubject } from "@/lib/data";
import { notFound } from "next/navigation";
import ResourceList from "@/components/subjects/ResourceList";
import UploadResourceDialog from "@/components/subjects/UploadResourceDialog";

export default async function SubjectDetailsPage({ params }: { params: { id: string } }) {
  const subject = await getSubjectById(params.id);
  
  if (!subject) {
    notFound();
  }

  const initialResources = await getResourcesForSubject(params.id);

  return (
    <div className="container mx-auto max-w-5xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">{subject.name}</h1>
          <p className="text-muted-foreground mt-1">{subject.description}</p>
        </div>
        <UploadResourceDialog />
      </div>
      <ResourceList initialResources={initialResources} />
    </div>
  );
}
