import type { PortfolioProject } from "./case-studies";

export type WorkDestination = {
  type: "liveWebsite" | "pdf" | "internalCaseStudy";
  url: string;
  label: string;
  ariaLabel: string;
  analyticsEvent: string;
  storyUrl?: string;
};

export function getWorkDestination(project: PortfolioProject): WorkDestination {
  const storyUrl = `/case-studies/${project.slug}`;
  const fallback: WorkDestination = {
    type: "internalCaseStudy", url: storyUrl, label: "View project",
    ariaLabel: `View the ${project.client} project`,
    analyticsEvent: `${project.id}_project_viewed`
  };
  if (project.projectKind !== "client") return fallback;
  const optionalStory = project.slug === "biomode" || project.slug === "flyir" ? storyUrl : undefined;
  if (project.storeStatus === "prelaunch" && project.websiteUrl) {
    return {
      type: "liveWebsite", url: project.websiteUrl, label: "View launch page",
      ariaLabel: `View the ${project.client} launch page`,
      analyticsEvent: `${project.id}_launch_page_visited`
    };
  }
  const website = project.storeStatus === "live"
    ? project.websiteUrl ?? (project.destinationType === "liveWebsite" ? project.destinationUrl : undefined)
    : undefined;
  if (website) {
    const isWebsite = project.category === "Websites";
    return {
      type: "liveWebsite", url: website, label: isWebsite ? "Visit website" : "Visit store",
      ariaLabel: `Visit the ${project.client} ${isWebsite ? "website" : "store"}`,
      analyticsEvent: `${project.id}_website_visited`, storyUrl: optionalStory
    };
  }
  if (project.deckStatus === "available" && project.deckHref) {
    return {
      type: "pdf", url: project.deckHref, label: "View brand identity",
      ariaLabel: `View the ${project.client} brand identity`,
      analyticsEvent: `${project.id}_identity_viewed`, storyUrl: optionalStory
    };
  }
  return fallback;
}
