import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-4xl w-full space-y-6">
        <Skeleton className="h-16 w-3/4 mx-auto" />
        <Skeleton className="h-8 w-full mx-auto" />
        <Skeleton className="h-8 w-5/6 mx-auto" />
        <div className="flex gap-4 justify-center pt-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4">
      <div className="space-y-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-8 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <Skeleton className="h-96 w-full" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

export function ServicesSkeleton() {
  return (
    <div className="space-y-12">
      <HeroSkeleton />
      <div className="container mx-auto px-4">
        <CardGridSkeleton count={6} />
      </div>
    </div>
  );
}

export function PortfolioSkeleton() {
  return (
    <div className="space-y-12">
      <HeroSkeleton />
      <div className="container mx-auto px-4">
        <div className="flex gap-4 mb-8">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <CardGridSkeleton count={9} />
      </div>
    </div>
  );
}
