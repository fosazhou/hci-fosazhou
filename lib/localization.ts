import type { Project, GalleryImage, QuickContent, ProcessContent, ResearchContent } from "./projects-data"
import type { OtherWork } from "./other-works-data"
import type { Language } from "@/contexts/language-context"

// Helper to get localized project data
export function getLocalizedProject(project: Project, language: Language): Project {
  if (language === "zh") return project
  
  return {
    ...project,
    title: project.titleEn || project.title,
    description: project.descriptionEn || project.description,
    keywords: project.keywordsEn || project.keywords,
    coverImage: project.coverImageEn || project.coverImage,
    fullDescription: project.fullDescriptionEn || project.fullDescription,
    location: project.locationEn || project.location,
    role: project.roleEn || project.role,
    details: project.detailsEn || project.details,
    galleryImages: project.galleryImagesEn || project.galleryImages,
    quickContent: project.quickContentEn || project.quickContent,
    processContent: project.processContentEn || project.processContent,
    researchContent: project.researchContentEn || project.researchContent,
  }
}

// Helper to get localized other work data
export function getLocalizedWork(work: OtherWork, language: Language): OtherWork {
  if (language === "zh") return work
  
  return {
    ...work,
    title: work.titleEn || work.title,
    titleCn: work.titleCn,
    description: work.descriptionEn || work.description,
    keywords: work.keywordsEn || work.keywords,
    coverImage: work.coverImageEn || work.coverImage,
    fullDescription: work.fullDescriptionEn || work.fullDescription,
    category: work.categoryEn || work.category,
    location: work.locationEn || work.location,
    role: work.roleEn || work.role,
    details: work.detailsEn || work.details,
    galleryImages: work.galleryImagesEn || work.galleryImages,
    quickContent: work.quickContentEn || work.quickContent,
    processContent: work.processContentEn || work.processContent,
    researchContent: work.researchContentEn || work.researchContent,
  }
}
