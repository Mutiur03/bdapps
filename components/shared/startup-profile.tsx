"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardImage,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MessageSquare,
  Calendar,
  Target,
  FileText,
  Users,
  ArrowRight,
  Tag,
} from "lucide-react";
import Link from "next/link";
import safeUrl from "@/lib/safeURL";
import { MakeOfferDialog } from "@/components/admin/make-offer-dialog";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { useCommonStore } from "@/store/useCommonStore";
export function StartupProfile({ id }: { id: string }) {
  const { data: session, status } = useSession();
  const { startups, fetchStartups, isLoading } = useCommonStore();
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!startups) {
        await fetchStartups();
      }
      console.log("Fetched startups: ", startups);

    };

    fetchData();
  }, [startups, fetchStartups, session]);
  const startup = startups?.find((startup) => String(startup.id) === id);
  const fundingProgress =
    (Number.parseInt((startup?.raised_amount?.toString() || "0").replace(/[^0-9]/g, "")) /
      Number.parseInt((startup?.budget?.toString() || "1").replace(/[^0-9]/g, ""))) *
    100;

  // Show skeleton while loading or no startup data
  if (isLoading || !startup) {
    return <StartupProfileSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Hero Image Section */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="h-64 md:h-80">
          <CardImage
            src={safeUrl(startup?.cover_image) || "/placeholder.svg"}
            alt={`${startup?.title} cover image`}
            className="w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white space-y-2 w-full">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden bg-white border-2 border-white">
                <CardImage
                  src={safeUrl(startup?.profile_picture) || "/placeholder.svg"}
                  alt={`${startup?.title} logo`}
                  aspectRatio="square"
                  className="h-full w-full"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {startup?.title}
                </h1>
                <p className="text-white/80">
                  {startup?.user.name} • {startup?.user.university} •{" "}
                  {startup?.user.department}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background/50 backdrop-blur-sm p-4 rounded-lg border shadow-sm">
        <div className="flex items-center gap-3">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            {startup?.category?.name}
          </Badge>
        </div>
        {!startup?.adminId && session?.user && 'role' in session.user && session.user.role === 'admin' && (
          <div className="flex gap-3">
            <Link href={`/admin/chat/${startup?.id}/${startup?.user?.id}`} className="flex-1">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-foreground hover:bg-muted"
              >
                <MessageSquare className="h-4 w-4" />
                Contact Udayee
              </Button>
            </Link>
            {/* <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            onClick={() => setIsOfferDialogOpen(true)}
          >
            <DollarSign className="h-4 w-4" />
            Make an Offer
          </Button> */}
          </div>)}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Startup Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pitch Video Card */}
          <Card
            className="overflow-hidden">
            {startup?.pitch_video && (
              <iframe
                className="w-full aspect-video"
                src={safeUrl(startup?.pitch_video)}
                title="Project Pitch Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              >
              </iframe>
            )}
          </Card>

          {/* Tabs for Details, Milestones, Updates */}
          <Tabs defaultValue="about" className="space-y-4">
            <TabsList className="grid grid-cols-2 bg-muted text-muted-foreground p-1 rounded-md">
              <TabsTrigger
                value="about"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="milestones"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Milestones
              </TabsTrigger>
              {/* <TabsTrigger
                value="updates"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                Updates
              </TabsTrigger> */}
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-4">
              <Card>
                <CardHeader className="border-b border-border">
                  <CardTitle className="text-foreground">
                    About the Startup
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground whitespace-pre-line">
                    {startup?.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Founded</p>
                      <p className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {startup?.createdAt.split('T')[0]}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Team Size</p>
                      <p className="font-medium flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        {startup?.projectMembers.length} members
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{startup?.category?.name}</p>
                    </div>
                    {/* <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <p className="font-medium flex items-center gap-2">
                        <Star className="h-4 w-4 text-amber-500 fill-current" />
                        {startup.rating} ({startup.reviewCount} reviews)
                      </p>
                    </div> */}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {(startup?.tags?.split(',') || []).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-primary/5 text-primary border-primary/20 flex items-center gap-1"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Milestones Tab */}
            <TabsContent value="milestones" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">
                    Project Milestones
                  </CardTitle>
                  <CardDescription>
                    The creator has broken down their project into these
                    milestones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {startup?.milestones && startup.milestones.length > 0 ? (
                    startup?.milestones.map((milestone, index) => (
                      <div
                        key={typeof milestone === "object" ? milestone.id : `milestone-${index}`}
                        className="relative pl-8 pb-6 border-l border-gray-200 last:border-0 last:pb-0"
                      >
                        {/* Milestone Status Indicator */}
                        <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center">
                          {typeof milestone === "object" && milestone.status === "completed" ? (
                            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                              <Target className="h-3 w-3" />
                            </div>
                          ) : typeof milestone === "object" && milestone.status === "in-progress" ? (
                            <div className="bg-amber-500/20 text-amber-500 w-6 h-6 rounded-full flex items-center justify-center">
                              <Target className="h-3 w-3" />
                            </div>
                          ) : (
                            <div className="bg-gray-100 text-gray-500 w-6 h-6 rounded-full flex items-center justify-center">
                              <Target className="h-3 w-3" />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-base flex items-center gap-2">
                              {typeof milestone === "object"
                                ? milestone.title
                                : typeof milestone === "string"
                                  ? milestone
                                  : "Milestone"}

                              {typeof milestone === "object" && milestone.status === "completed" && (
                                <Badge
                                  variant="outline"
                                  className="bg-primary/10 text-primary border-primary/20"
                                >
                                  Completed
                                </Badge>
                              )}
                              {typeof milestone === "object" && milestone.status === "in-progress" && (
                                <Badge
                                  variant="outline"
                                  className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                                >
                                  In Progress
                                </Badge>
                              )}
                              {typeof milestone === "object" && milestone.status === "planned" && (
                                <Badge
                                  variant="outline"
                                  className="bg-amber-500/10 text-orange-300 border-amber-500/20"
                                >
                                  Planned
                                </Badge>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {typeof milestone === "object" ? milestone.description : ""}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-medium">
                              {typeof milestone === "object" && milestone.amount
                                ? `$${milestone.amount}`
                                : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No milestones available for this project yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Updates Tab */}
            {/* <TabsContent value="updates" className="space-y-4">
              <Card>
                <CardHeader className="border-b border-border">
                  <CardTitle className="text-foreground">
                    Latest Updates
                  </CardTitle>
                  <CardDescription>
                    Recent progress and announcements from the startup
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {startup.updates.map((update) => (
                    <div
                      key={update.id}
                      className="space-y-2 pb-4 border-b border-border last:border-0 last:pb-0 hover:bg-muted/20 p-3 rounded-md transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-foreground">
                          {update.title}
                        </h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          {update.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {update.content}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent> */}
          </Tabs>
        </div>

        {/* Right Column - Funding Status & Actions */}
        <div className="space-y-6">
          {/* Funding Status Card */}
          <Card className="border-t-4 border-t-primary">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-foreground">Funding Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Raised so far</span>
                  <span className="font-medium text-foreground">
                    {startup?.raised_amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Funding goal</span>
                  <span className="font-medium text-foreground">
                    {startup?.budget}
                  </span>
                </div>
                <Progress
                  value={fundingProgress}
                  className="h-2"
                />
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-muted-foreground">
                    {fundingProgress.toFixed(0)}% of goal
                  </span>
                </div>
              </div>

              <div className="pt-2 space-y-4">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => setIsOfferDialogOpen(true)}
                >
                  Make an Offer
                </Button>
                <Link href={`/investor/chat/${startup?.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Contact Udayee
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Documents Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {startup?.documents && startup.documents.length > 0 ? (
                startup.documents.map((doc, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    onClick={() => window.open(safeUrl(doc.document), '_blank')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {doc.document.split('/').pop()?.split('-').pop() || doc.document}
                  </Button>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No resources available for this project yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Similar Startups Card */}
          <Card>
            <CardHeader className="border-b border-border">
              <CardTitle className="text-foreground">
                Similar Startups
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {(() => {
                const similarStartups = startups
                  ?.filter(s =>
                    s.category?.name === startup?.category?.name &&
                    s.id !== startup?.id
                  )
                  ?.slice(0, 3) || [];

                return similarStartups.length > 0 ? (
                  similarStartups.map((similarStartup, index) => (
                    <Link key={similarStartup.id} href={`/startup/${similarStartup.id}`} className="block">
                      <div className="flex items-center gap-3 p-4 hover:bg-muted/20 border-b last:border-b-0">
                        <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                          <CardImage
                            src={safeUrl(similarStartup.profile_picture) || "/placeholder.svg"}
                            alt={similarStartup.title}
                            aspectRatio="square"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate">
                            {similarStartup.title}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {similarStartup.description}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground text-sm">
                    No similar startups found in this category.
                  </div>
                );
              })()}
            </CardContent>
            <CardFooter className="border-t border-border">
              <Link href="/startups" className="w-full">
                <Button variant="outline" className="w-full text-sm">
                  Browse All Startups
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Make Offer Dialog */}
      <MakeOfferDialog
        open={isOfferDialogOpen}
        onOpenChange={setIsOfferDialogOpen}
        startup={startup}
      />
    </div>
  );
}

function StartupProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Hero Image Skeleton */}
      <div className="relative rounded-xl overflow-hidden">
        <Skeleton className="h-64 md:h-80 w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white space-y-2 w-full">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full bg-white/20" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48 bg-white/20" />
                <Skeleton className="h-4 w-64 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background/50 backdrop-blur-sm p-4 rounded-lg border shadow-sm">
        <Skeleton className="h-6 w-24" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Skeleton */}
          <Card className="overflow-hidden">
            <Skeleton className="w-full aspect-video" />
          </Card>

          {/* Tabs Skeleton */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-24" />
            </div>

            <Card>
              <CardHeader className="border-b border-border">
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />

                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-16" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="space-y-6">
          {/* Funding Card Skeleton */}
          <Card className="border-t-4 border-t-primary">
            <CardHeader className="border-b border-border">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-2 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              <div className="pt-2 space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Resources Card Skeleton */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </CardContent>
          </Card>

          {/* Similar Startups Card Skeleton */}
          <Card>
            <CardHeader className="border-b border-border">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="p-0">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-4 border-b last:border-b-0">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-4 w-4" />
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t border-border">
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default StartupProfile;