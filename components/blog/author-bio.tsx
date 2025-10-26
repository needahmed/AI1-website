import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface AuthorBioProps {
  name: string;
  bio?: string | null;
  image?: string | null;
}

export function AuthorBio({ name, bio, image }: AuthorBioProps) {
  return (
    <Card className="mt-12">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          {image && (
            <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">About {name}</h3>
            {bio && (
              <p className="text-muted-foreground">{bio}</p>
            )}
            {!bio && (
              <p className="text-muted-foreground italic">
                {name} is a contributor to this blog.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
