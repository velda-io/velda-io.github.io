export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  date: string;
  author: string;
  readingTime: string;
  category: string;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    title: "Introducing Velda: Cloud Development That Actually Feels Local",
    slug: "introducing-velda",
    description: "Simplify cloud development with Velda - run AI workloads, GPU clusters, and data processing without Kubernetes complexity. Pay only for compute time used.",
    excerpt: "AI developers face a painful dilemma: deal with container complexity or pay thousands for idle instances. Velda offers a better way - instant access to any compute configuration with simple commands.",
    date: "July 30, 2025",
    author: "Chuan Qiu",
    readingTime: "4 min",
    category: "Product Announcement",
    image: "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*SO2y7zQns8x7DvgPsV1tsA.png",
    tags: ["cloud-computing", "kubernetes", "artificial-intelligence", "software-development", "gpu-computing"]
  }
  // Add more blog posts here as they're created
];
