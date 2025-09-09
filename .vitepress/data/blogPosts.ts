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
    title: "Why AI/ML Researchers Are Stuck with Inefficient GPU Setups (And How to Fix It)",
    slug: "why-stuck-inefficient-gpu-setup",
    description: "Discover why traditional GPU setups hinder AI/ML research and how Velda offers a better solution with instant scaling and local-like development experience.",
    date: "Sept 8, 2025",
    author: "Chuan Qiu",
    tags: ["artificial-intelligence", "machine-learning", "gpu-computing", "cloud-computing", "kubernetes", "software-development", "ai-development", "devops"],
    image: "https://cdn-images-1.medium.com/max/2400/1*jFZtPHuhqcVDs5vfYAXRfg.png",
    excerpt: "AI/ML researchers are stuck with inefficient GPU setups that limit productivity and increase costs. Learn how Velda provides instant access to scalable compute without the complexity.",
    readingTime: "5 min",
    category: "Technical Blog"
  },
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
  },
];
