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
    "title": "Optimizing ML Development at Kumo.ai with Velda",
    "slug": "kumo-optimizing-ml-development",
    "description": "A case study: how Kumo.ai reduced iteration time, improved GPU utilization, and sped up onboarding by using Velda for development and experimentation.",
    "excerpt": "How Kumo.ai used Velda to accelerate experiments, cut dependency update times, and increase GPU utilization across the team.",
    "date": "2025-10-21",
    "author": "Hema Raghavan",
    "readingTime": "6 min",
    "category": "Case Study",
    "image": "https://cdn-images-1.medium.com/max/2400/1*72Jo87jR0xg_3zzBkwkNLQ.png",
    "tags": [
      "machine-learning",
      "ml-workflow",
      "cloud-computing",
      "gpu-computing",
      "developer-productivity",
      "velda"
    ]
  },
  {
    "title": "Building a Scalable ML Workflow with Velda",
    "slug": "build-machine-learning-workflow",
    "description": "Learn how to build robust, scalable machine learning workflows using Velda's vrun and vbatch commands. From simple pipelines to complex fan-out patterns for parallel processing.",
    "excerpt": "Build sophisticated ML workflows with Velda's simple commands. Learn to create pipelines with dependencies, parallel processing, and fan-out patterns for scalable machine learning.",
    "date": "2025-09-25",
    "author": "Chuan Qiu",
    "readingTime": "5 min",
    "category": "Technical Tutorial",
    "image": "https://cdn-images-1.medium.com/max/2400/1*2Ej2vw32-janKdPbfp1gKg.png",
    "tags": [
      "machine-learning",
      "ml-workflow",
      "data-processing",
      "ai-pipeline",
      "cloud-computing",
      "vrun",
      "vbatch",
      "parallel-processing",
      "model-training",
      "data-science",
      "mlops",
      "workflow-automation"
    ]
  },
  {
    "title": "vrun is All You Need: Revolutionizing Development with One Command",
    "slug": "vrun-is-all-you-need",
    "description": "Discover how Velda's vrun command transforms development by providing instant, scalable cloud compute that feels like local execution. Eliminate inefficient GPU setups and complex orchestration with this game-changing tool.",
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
