"use client";

import type { Resource } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ImageIcon, File, Download, Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const iconMap: { [key in Resource['type']]: React.ReactNode } = {
  pdf: <FileText className="h-6 w-6 text-red-500" />,
  image: <ImageIcon className="h-6 w-6 text-blue-500" />,
  doc: <File className="h-6 w-6 text-blue-700" />,
  other: <File className="h-6 w-6 text-gray-500" />,
};

export default function ResourceList({ initialResources }: { initialResources: Resource[] }) {
    const { user } = useAuth();
    // In a real app, this would be a state and updated on upload/delete
    const resources = initialResources;
  
    if (resources.length === 0) {
      return (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
            <CardContent className="p-0">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold font-headline">No Resources Yet</h3>
                <p className="text-muted-foreground mt-2">Be the first to upload a study material for this subject.</p>
            </CardContent>
        </Card>
      );
    }

  return (
    <div className="space-y-3">
      {resources.map((resource) => (
        <Card key={resource.id} className="p-4 flex items-center justify-between hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="shrink-0">{iconMap[resource.type]}</div>
            <div className="truncate">
              <p className="font-medium truncate">{resource.name}</p>
              <p className="text-sm text-muted-foreground">
                Uploaded by {resource.uploaderName} on {new Date(resource.uploadedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
             <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
            </Button>
            {user?.role === 'admin' && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
