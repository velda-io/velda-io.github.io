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
    "title": "vrun is All You Need: Revolutionizing AI/ML Development with One Command",
    "slug": "vrun-is-all-you-need",
    "description": "Discover how Velda's vrun command transforms AI/ML development by providing instant, scalable cloud compute that feels like local execution. Eliminate inefficient GPU setups and complex orchestration with this game-changing tool.",
    "excerpt": "Why vrun is the ultimate solution for AI/ML researchers struggling with inefficient GPU setups. Learn how one command can provide instant scaling, cost efficiency, and seamless development experience.",
    "date": "2025-09-15",
    "author": "Chuan Qiu",
    "readingTime": "8 min",
    "category": "Technical Blog",
    "image": "https://cdn-images-1.medium.com/max/2400/1*CCI6tS0pnagYS_sYftdVrA.png",
    "tags": [
      "cloud-development",
      "dev-tools",
      "machine-learning",
      "developer-productivity",
      "kubernetes",
      "scaling",
      "cloud-native",
      "vrun",
      "velda"
    ]
  },
  {
    "title": "Why AI/ML Researchers Are Stuck with Inefficient GPU Setups (And How to Fix It)",
    "slug": "why-stuck-inefficient-gpu-setup",
    "description": "AI/ML researchers waste money on idle GPUs and struggle with slow, complex cloud setups. Discover how Velda eliminates inefficient GPU usage with instant scaling and seamless local development experience.",
    "excerpt": "AI/ML researchers are stuck with inefficient GPU setups that limit productivity and increase costs. Learn how Velda provides instant access to scalable compute without the complexity.",
    "date": "2025-09-08",
    "author": "Chuan Qiu",
    "readingTime": "5 min",
    "category": "Technical Blog",
    "image": "https://cdn-images-1.medium.com/max/2400/1*jFZtPHuhqcVDs5vfYAXRfg.png",
    "tags": [
      "artificial-intelligence",
      "machine-learning",
      "gpu-computing",
      "cloud-computing",
      "kubernetes",
      "software-development",
      "ai-development",
      "devops"
    ]
  },
  {
    "title": "Introducing Velda: Cloud Development That Actually Feels Local",
    "slug": "introducing-velda",
    "description": "Simplify cloud development with Velda - run AI workloads, GPU clusters, and data processing without Kubernetes complexity. Pay only for compute time used.",
    "excerpt": "AI developers face a painful dilemma: deal with container complexity or pay thousands for idle instances. Velda offers a better way - instant access to any compute configuration with simple commands.",
    "date": "2025-07-30",
    "author": "Chuan Qiu",
    "readingTime": "4 min",
    "category": "Product Announcement",
    "image": "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*SO2y7zQns8x7DvgPsV1tsA.png",
    "tags": [
      "cloud-computing",
      "kubernetes",
      "artificial-intelligence",
      "software-development",
      "programming",
      "gpu-computing",
      "ai-development",
      "cloud-native",
      "devops",
      "machine-learning"
    ]
  }
];
