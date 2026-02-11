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
    "title": "How to Optimize Container Iteration Speed",
    "slug": "how-to-optimize-container-iteration-speed",
    "description": "Five practical strategies to reduce container build, push, and run cycles for faster ML development.",
    "excerpt": "Optimize Dockerfile ordering, shrink images, tune target machines, defer installs, and try development container streaming to cut iteration times from minutes to seconds.",
    "date": "2026-02-11",
    "author": "Chuan Qiu",
    "readingTime": "6 min",
    "category": "Engineering",
    "image": "https://cdn-images-1.medium.com/max/2400/0*m1iriCsSSJphe1xv.png",
    "tags": [
      "containers",
      "docker",
      "devops",
      "machine-learning",
      "performance",
      "cloud"
    ]
  },
  {
    "title": "CLI vs Decorators for ML Pipelines | Best Practices",
    "slug": "the-hidden-cost-in-pythonic-workflows",
    "description": "How CLI-based orchestration solves the hidden problems of decorator frameworks in production ML pipelines.",
    "excerpt": "Why decorator-heavy Python orchestrators introduce hidden operational costs, and how CLI-first tooling restores reproducibility and simplicity.",
    "date": "2026-01-27",
    "author": "Chuan Qiu",
    "readingTime": "5 min",
    "category": "Technical Overview",
    "image": "https://substack-post-media.s3.amazonaws.com/public/images/f13a76b4-ce8c-4394-bc99-bfa87c503508_1024x559.png",
    "tags": [
      "ml",
      "orchestration",
      "cli",
      "workflows",
      "dagster",
      "prefect",
      "airflow"
    ]
  },
  {
    "title": "What Is a Velda Pool? Autoscaling Compute Pools for Cloud, Kubernetes, and VMs",
    "slug": "what-is-a-velda-pool-autoscaling-compute-pools",
    "description": "The hidden worker layer that makes vrun feel local while scaling across cloud, Kubernetes, and data centers.",
    "excerpt": "A Velda pool manages worker lifecycle (create, verify, retire) so `vrun` can scale compute across clouds, Kubernetes, and data centers without manual VM provisioning.",
    "date": "2026-01-20",
    "author": "Chuan Qiu",
    "readingTime": "6 min",
    "category": "Technical Overview",
    "image": "https://substack-post-media.s3.amazonaws.com/public/images/09fb360c-6d66-4fa5-afdf-34291d44f675_1024x559.png",
    "tags": [
      "velda",
      "pool",
      "autoscaling",
      "kubernetes",
      "cloud",
      "workers"
    ]
  },
  {
    "title": "Running vLLM on SLURM Clusters: A Complete Guide for HPC Inference",
    "slug": "running-vllm-on-slurm-clusters",
    "description": "Deploy OpenAI-compatible LLM endpoints on SLURM with vLLM for research and development.",
    "excerpt": "Guide to run vLLM on SLURM clusters: create batch scripts, submit jobs, access endpoints, and follow best practices for reliable HPC inference.",
    "date": "2026-01-08",
    "author": "Chuan Qiu",
    "readingTime": "6 min",
    "category": "Tutorial",
    "image": "https://substack-post-media.s3.amazonaws.com/public/images/7372e67f-3b90-4b52-a2d0-f2c98f7930e0_1024x559.png",
    "tags": [
      "vllm",
      "slurm",
      "hpc",
      "inference",
      "velda"
    ]
  },
  {
    "title": "How Velda Works: Accelerating ML Development Without Container Overhead",
    "slug": "how-velda-works-accelerating-ml-development",
    "description": "Velda provides instant, reproducible ML development environments by mounting a remote root filesystem and fetching files on demand.",
    "excerpt": "Velda replaces OCI images with a remotely mounted root filesystem and demand-driven file fetching, prioritizing rapid iteration for ML development.",
    "date": "2026-01-05",
    "author": "Chuan Qiu",
    "readingTime": "4 min",
    "category": "Technical Overview",
    "image": "https://substack-post-media.s3.amazonaws.com/public/images/38ae9435-cf2c-4fd8-8eb0-40e34cab4dd8_1024x572.png",
    "tags": [
      "velda",
      "ml",
      "containers",
      "gpu",
      "productivity"
    ]
  },
  {
    "title": "How to Run Jupyter Notebook on an HPC Cluster: SLURM & Velda Guide",
    "slug": "run-juypter-notebook-on-hpc",
    "description": "Master running Jupyter Notebooks on HPC clusters with SLURM or simplify the process with Velda. Learn SSH tunneling, port forwarding, and streamlined alternatives for interactive data science workflows on remote compute resources.",
    "excerpt": "Learn how to run Jupyter Notebooks on HPC clusters using SLURM with SSH tunneling, or discover how Velda simplifies the entire process to a single command for seamless interactive data science workflows.",
    "date": "2025-12-01",
    "author": "Chuan Qiu",
    "readingTime": "7 min",
    "category": "Technical Blog",
    "image": "https://cdn-images-1.medium.com/max/2400/1*plZPR9YMdDmyc1KXsShkJQ.png",
    "tags": [
      "jupyter",
      "hpc",
      "slurm",
      "data-science",
      "remote-computing",
      "velda",
      "ssh-tunneling",
      "interactive-development"
    ]
  },
  {
    "title": "Optimizing ML Development at Kumo.ai with Velda",
    "slug": "kumo-optimizing-ml-development",
    "description": "A case study: how Kumo.ai reduced iteration time, improved GPU utilization, and sped up onboarding by using Velda for development and experimentation.",
    "excerpt": "How Kumo.ai used Velda to accelerate experiments, cut dependency update times, and increase GPU utilization across the team.",
    "date": "2025-10-21",
    "author": "Hema Raghavan",
    "readingTime": "6 min",
    "category": "Case Study",
    "image": "https://cdn-images-1.medium.com/max/2600/1*rpcliNv433Ui4NBb7yejSg.png",
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
