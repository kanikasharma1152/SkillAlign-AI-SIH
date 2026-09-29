// Comprehensive fallback data model mirroring backend schemas
export const FALLBACK_MARKET_DATA = {
  metadata: {
    version: "3.0.0",
    data_source: "Aggregated Empirical & Simulated Workforce Dataset (1,420,000+ Verified Postings, IEEE/ACM citations, GitHub telemetry)",
    normalization_range: [0, 100],
    horizon_years: [2022, 2023, 2024, 2025, 2026, 2027, 2028]
  },
  regional_intelligence: [
    {
      city: "Bengaluru",
      state: "Karnataka",
      hiring_index: 98,
      shortage_tier: "CRITICAL DEFICIT",
      top_demanded_skills: ["RAG Architectures", "Agentic AI", "Vector Databases", "MLOps"],
      open_positions: "184,000+",
      median_salary: "₹28 - 48 LPA",
      data_points: 482000
    },
    {
      city: "Hyderabad",
      state: "Telangana",
      hiring_index: 92,
      shortage_tier: "HIGH DEFICIT",
      top_demanded_skills: ["Cloud Infrastructure", "Kubernetes", "GenAI / LLMs", "FastAPI"],
      open_positions: "128,000+",
      median_salary: "₹22 - 40 LPA",
      data_points: 340000
    },
    {
      city: "Pune",
      state: "Maharashtra",
      hiring_index: 86,
      shortage_tier: "HIGH DEFICIT",
      top_demanded_skills: ["MLOps", "Python Ecosystem", "Docker", "Data Warehousing"],
      open_positions: "92,000+",
      median_salary: "₹18 - 34 LPA",
      data_points: 210000
    },
    {
      city: "Delhi NCR",
      state: "Delhi / Haryana / UP",
      hiring_index: 90,
      shortage_tier: "CRITICAL DEFICIT",
      top_demanded_skills: ["AI Governance", "Zero-Trust Security", "RAG", "TypeScript"],
      open_positions: "145,000+",
      median_salary: "₹24 - 42 LPA",
      data_points: 390000
    },
    {
      city: "Indore",
      state: "Madhya Pradesh",
      hiring_index: 72,
      shortage_tier: "EMERGING TECH HUB",
      top_demanded_skills: ["Full-Stack Python", "React", "Cloud Basics", "SQL"],
      open_positions: "24,000+",
      median_salary: "₹10 - 20 LPA",
      data_points: 65000
    }
  ],
  roles: [
    {
      id: "ai-engineer",
      name: "AI / GenAI Engineer",
      category: "Artificial Intelligence",
      median_salary_range: "$145k - $210k (₹30-55 LPA)",
      demand_tier: "Critical",
      growth_rate_3yr: "+142%",
      core_skills: [
        { skill: "Python Ecosystem", weight: 0.95, benchmark: 92 },
        { skill: "GenAI / LLMs", weight: 0.98, benchmark: 94 },
        { skill: "RAG Architectures", weight: 0.92, benchmark: 90 },
        { skill: "Vector Databases", weight: 0.88, benchmark: 85 },
        { skill: "Agentic AI", weight: 0.85, benchmark: 88 },
        { skill: "PyTorch / Deep Learning", weight: 0.82, benchmark: 80 },
        { skill: "MLOps / Deployment", weight: 0.80, benchmark: 78 },
        { skill: "Cloud Infrastructure", weight: 0.75, benchmark: 75 }
      ]
    },
    {
      id: "data-scientist",
      name: "Data Scientist",
      category: "Data Science",
      median_salary_range: "$130k - $185k (₹24-42 LPA)",
      demand_tier: "High",
      growth_rate_3yr: "+38%",
      core_skills: [
        { skill: "Python Ecosystem", weight: 0.95, benchmark: 95 },
        { skill: "SQL / Modeling", weight: 0.92, benchmark: 90 },
        { skill: "Machine Learning", weight: 0.95, benchmark: 92 },
        { skill: "Statistics & Inference", weight: 0.90, benchmark: 88 },
        { skill: "GenAI / LLMs", weight: 0.78, benchmark: 75 },
        { skill: "Cloud Infrastructure", weight: 0.70, benchmark: 70 },
        { skill: "RAG Architectures", weight: 0.65, benchmark: 65 }
      ]
    },
    {
      id: "mlops-engineer",
      name: "MLOps / Platform Engineer",
      category: "Infrastructure",
      median_salary_range: "$140k - $195k (₹26-46 LPA)",
      demand_tier: "Very High",
      growth_rate_3yr: "+95%",
      core_skills: [
        { skill: "Kubernetes", weight: 0.95, benchmark: 90 },
        { skill: "Python Ecosystem", weight: 0.90, benchmark: 88 },
        { skill: "MLOps / Deployment", weight: 0.98, benchmark: 95 },
        { skill: "CI/CD & GitOps", weight: 0.90, benchmark: 85 },
        { skill: "Cloud Infrastructure", weight: 0.92, benchmark: 90 }
      ]
    },
    {
      id: "cloud-architect",
      name: "Cloud Solutions Architect",
      category: "Cloud & DevOps",
      median_salary_range: "$150k - $215k (₹32-58 LPA)",
      demand_tier: "High",
      growth_rate_3yr: "+45%",
      core_skills: [
        { skill: "Cloud Infrastructure", weight: 0.98, benchmark: 96 },
        { skill: "Kubernetes", weight: 0.90, benchmark: 88 },
        { skill: "System Design", weight: 0.95, benchmark: 92 },
        { skill: "Security & IAM", weight: 0.88, benchmark: 86 }
      ]
    },
    {
      id: "fullstack-ai",
      name: "Full-Stack AI Developer",
      category: "Software Engineering",
      median_salary_range: "$135k - $190k (₹22-40 LPA)",
      demand_tier: "Very High",
      growth_rate_3yr: "+115%",
      core_skills: [
        { skill: "TypeScript / React", weight: 0.92, benchmark: 90 },
        { skill: "Python Ecosystem", weight: 0.90, benchmark: 85 },
        { skill: "FastAPI / Node APIs", weight: 0.88, benchmark: 85 },
        { skill: "GenAI / LLMs", weight: 0.85, benchmark: 82 },
        { skill: "RAG Architectures", weight: 0.80, benchmark: 78 }
      ]
    }
  ],
  skills: [
    {
      id: "genai",
      name: "GenAI / LLMs",
      category: "AI & ML",
      status: "HIGH DEMAND",
      current_demand: 92,
      growth_velocity: "+185.4%",
      confidence: 94,
      data_coverage: 95,
      sample_size: "342,000 postings",
      recency: "Real-time (Q3 2026)",
      historical: [
        { year: 2021, demand: 16 },
        { year: 2022, demand: 28 },
        { year: 2023, demand: 64 },
        { year: 2024, demand: 82 },
        { year: 2025, demand: 92 }
      ],
      forecast: [
        { year: 2026, demand: 96, lower: 91, upper: 99 },
        { year: 2027, demand: 98, lower: 92, upper: 100 },
        { year: 2028, demand: 99, lower: 94, upper: 100 }
      ],
      backtest: {
        training_period: "2021 - 2023",
        validation_period: "2024 - 2025",
        mae: 1.6,
        rmse: 1.6,
        mape: 1.95,
        r2_score: 0.984,
        test_comparisons: [
          { year: 2024, actual_demand: 82.0, predicted_demand: 80.4, absolute_error: 1.6, error_percentage: 1.95 },
          { year: 2025, actual_demand: 92.0, predicted_demand: 90.8, absolute_error: 1.2, error_percentage: 1.30 }
        ],
        validation_verdict: "Model passed hold-out validation with MAPE < 2.0%, proving high historical fidelity.",
        limitations: "Subject to hardware accelerator cluster availability and power/water infrastructure constraints."
      },
      why_prediction: {
        summary: "Projected acceleration driven by enterprise adoption of custom LLM orchestration and specialized fine-tuning pipelines.",
        evidence_factors: [
          { factor: "Role Postings Expansion", impact: "+142% YoY mentions in engineering job specs" },
          { factor: "Code Repository Commits", impact: "+210% growth in open-source LLM inference stacks" },
          { factor: "Enterprise Ingestion", impact: "78% of Fortune 500 AI initiatives require in-house GenAI guardrails" }
        ],
        limitations: "Inference cost constraints and emerging sovereign AI regulatory mandates."
      },
      radar_position: { x: 78, y: 22, trajectory_2028: { x: 88, y: 14 } }
    },
    {
      id: "rag",
      name: "RAG Architectures",
      category: "AI & ML",
      status: "EMERGING",
      current_demand: 78,
      growth_velocity: "+240.1%",
      confidence: 91,
      data_coverage: 91,
      sample_size: "218,000 postings",
      recency: "Real-time (Q3 2026)",
      historical: [
        { year: 2021, demand: 4 },
        { year: 2022, demand: 12 },
        { year: 2023, demand: 38 },
        { year: 2024, demand: 62 },
        { year: 2025, demand: 78 }
      ],
      forecast: [
        { year: 2026, demand: 88, lower: 82, upper: 94 },
        { year: 2027, demand: 93, lower: 86, upper: 97 },
        { year: 2028, demand: 96, lower: 89, upper: 99 }
      ],
      backtest: {
        training_period: "2021 - 2023",
        validation_period: "2024 - 2025",
        mae: 1.9,
        rmse: 1.9,
        mape: 3.06,
        r2_score: 0.976,
        test_comparisons: [
          { year: 2024, actual_demand: 62.0, predicted_demand: 60.1, absolute_error: 1.9, error_percentage: 3.06 },
          { year: 2025, actual_demand: 78.0, predicted_demand: 76.5, absolute_error: 1.5, error_percentage: 1.92 }
        ],
        validation_verdict: "Model passed hold-out validation with MAPE < 3.5%, proving reliable trend continuation.",
        limitations: "Long context LLM architectures may alter retrieval design, though hybrid chunking remains prevalent."
      },
      why_prediction: {
        summary: "Surging demand fueled by need to eliminate LLM hallucinations and connect private enterprise data stores without massive retraining costs.",
        evidence_factors: [
          { factor: "Enterprise RAG Shift", impact: "89% of production GenAI systems implement retrieval layers" },
          { factor: "Hybrid Search Co-occurrence", impact: "+180% requirement of combined sparse (BM25) and dense embeddings" },
          { factor: "Cross-Role Infiltration", impact: "Spreading from AI Research into standard Full-Stack roles" }
        ],
        limitations: "Context window expansions alter chunking paradigms but do not replace private search."
      },
      radar_position: { x: 72, y: 38, trajectory_2028: { x: 84, y: 20 } }
    },
    {
      id: "agentic-ai",
      name: "Agentic AI",
      category: "AI & ML",
      status: "EMERGING",
      current_demand: 68,
      growth_velocity: "+310.0%",
      confidence: 88,
      data_coverage: 84,
      sample_size: "142,000 postings",
      recency: "Real-time (Q3 2026)",
      historical: [
        { year: 2021, demand: 1 },
        { year: 2022, demand: 5 },
        { year: 2023, demand: 18 },
        { year: 2024, demand: 44 },
        { year: 2025, demand: 68 }
      ],
      forecast: [
        { year: 2026, demand: 84, lower: 76, upper: 91 },
        { year: 2027, demand: 92, lower: 83, upper: 97 },
        { year: 2028, demand: 96, lower: 88, upper: 100 }
      ],
      backtest: {
        training_period: "2021 - 2023",
        validation_period: "2024 - 2025",
        mae: 2.5,
        rmse: 2.5,
        mape: 5.68,
        r2_score: 0.965,
        test_comparisons: [
          { year: 2024, actual_demand: 44.0, predicted_demand: 41.5, absolute_error: 2.5, error_percentage: 5.68 },
          { year: 2025, actual_demand: 68.0, predicted_demand: 65.2, absolute_error: 2.8, error_percentage: 4.12 }
        ],
        validation_verdict: "Model captures exponential emergence; variance reflects early technology lifecycle.",
        limitations: "Execution loop safety sandboxing and unpredictable failure states in unbounded loops."
      },
      why_prediction: {
        summary: "Autonomous workflows requiring multi-step tool-use, self-reflection, and execution loops represent the next frontier of software engineering.",
        evidence_factors: [
          { factor: "Enterprise Workflow Automation", impact: "Shift from single prompt-completion to stateful multi-agent systems" },
          { factor: "Framework Adoption", impact: "+320% monthly download growth across multi-agent orchestration libraries" }
        ],
        limitations: "Agent stability and divergence risks in high-consequence enterprise environments."
      },
      radar_position: { x: 82, y: 48, trajectory_2028: { x: 92, y: 24 } }
    },
    {
      id: "vector-db",
      name: "Vector Databases",
      category: "Data & Storage",
      status: "EMERGING",
      current_demand: 74,
      growth_velocity: "+160.0%",
      confidence: 89,
      data_coverage: 89,
      sample_size: "194,000 postings",
      recency: "Real-time (Q3 2026)",
      historical: [
        { year: 2021, demand: 3 },
        { year: 2022, demand: 10 },
        { year: 2023, demand: 34 },
        { year: 2024, demand: 58 },
        { year: 2025, demand: 74 }
      ],
      forecast: [
        { year: 2026, demand: 85, lower: 79, upper: 91 },
        { year: 2027, demand: 90, lower: 83, upper: 95 },
        { year: 2028, demand: 92, lower: 85, upper: 96 }
      ],
      backtest: {
        training_period: "2021 - 2023",
        validation_period: "2024 - 2025",
        mae: 1.8,
        rmse: 1.8,
        mape: 3.1,
        r2_score: 0.978,
        test_comparisons: [
          { year: 2024, actual_demand: 58.0, predicted_demand: 56.2, absolute_error: 1.8, error_percentage: 3.1 }
        ],
        validation_verdict: "Passed holdout validation with strong fit across Pinecone, Chroma, and pgvector adoption curves.",
        limitations: "Native SQL integration (e.g., pgvector) might absorb standalone vector database demand."
      },
      radar_position: { x: 65, y: 44, trajectory_2028: { x: 78, y: 28 } }
    },
    {
      id: "mlops",
      name: "MLOps / Deployment",
      category: "Infrastructure",
      status: "HIGH DEMAND",
      current_demand: 81,
      growth_velocity: "+94.2%",
      confidence: 92,
      data_coverage: 93,
      sample_size: "260,000 postings",
      recency: "Real-time (Q3 2026)",
      historical: [
        { year: 2021, demand: 26 },
        { year: 2022, demand: 42 },
        { year: 2023, demand: 58 },
        { year: 2024, demand: 72 },
        { year: 2025, demand: 81 }
      ],
      forecast: [
        { year: 2026, demand: 89, lower: 84, upper: 93 },
        { year: 2027, demand: 93, lower: 87, upper: 97 },
        { year: 2028, demand: 95, lower: 89, upper: 98 }
      ],
      backtest: {
        training_period: "2021 - 2023",
        validation_period: "2024 - 2025",
        mae: 0.9,
        rmse: 0.9,
        mape: 1.25,
        r2_score: 0.991,
        test_comparisons: [
          { year: 2024, actual_demand: 72.0, predicted_demand: 71.1, absolute_error: 0.9, error_percentage: 1.25 }
        ],
        validation_verdict: "High-precision validation performance (< 1.5% error).",
        limitations: "Serverless inference platforms could simplify low-scale deployment workflows."
      },
      radar_position: { x: 60, y: 25, trajectory_2028: { x: 74, y: 18 } }
    },
    {
      id: "python",
      name: "Python Ecosystem",
      category: "Languages",
      status: "STABLE",
      current_demand: 94,
      growth_velocity: "+8.2%",
      confidence: 98,
      data_coverage: 98,
      sample_size: "780,000 postings",
      recency: "Real-time (Q3 2026)",
      historical: [
        { year: 2021, demand: 82 },
        { year: 2022, demand: 86 },
        { year: 2023, demand: 90 },
        { year: 2024, demand: 92 },
        { year: 2025, demand: 94 }
      ],
      forecast: [
        { year: 2026, demand: 96, lower: 94, upper: 98 },
        { year: 2027, demand: 97, lower: 94, upper: 99 },
        { year: 2028, demand: 98, lower: 95, upper: 100 }
      ],
      backtest: {
        training_period: "2021 - 2023",
        validation_period: "2024 - 2025",
        mae: 0.3,
        rmse: 0.3,
        mape: 0.33,
        r2_score: 0.998,
        test_comparisons: [
          { year: 2024, actual_demand: 92.0, predicted_demand: 92.3, absolute_error: 0.3, error_percentage: 0.33 }
        ],
        validation_verdict: "Near perfect continuity fit for the industry lingua franca.",
        limitations: "High-performance inference execution increasingly compiled to Rust/C++ runtimes."
      },
      radar_position: { x: 50, y: 28, trajectory_2028: { x: 52, y: 24 } }
    },
    {
      id: "legacy-hadoop",
      name: "Legacy Hadoop / MapReduce",
      category: "Data & Storage",
      status: "DECLINING",
      current_demand: 32,
      growth_velocity: "-41.8%",
      confidence: 94,
      data_coverage: 88,
      sample_size: "45,000 postings",
      recency: "Real-time (Q3 2026)",
      historical: [
        { year: 2021, demand: 76 },
        { year: 2022, demand: 65 },
        { year: 2023, demand: 51 },
        { year: 2024, demand: 40 },
        { year: 2025, demand: 32 }
      ],
      forecast: [
        { year: 2026, demand: 24, lower: 18, upper: 29 },
        { year: 2027, demand: 16, lower: 10, upper: 22 },
        { year: 2028, demand: 11, lower: 6, upper: 18 }
      ],
      backtest: {
        training_period: "2021 - 2023",
        validation_period: "2024 - 2025",
        mae: 1.4,
        rmse: 1.4,
        mape: 3.5,
        r2_score: 0.982,
        test_comparisons: [
          { year: 2024, actual_demand: 40.0, predicted_demand: 38.6, absolute_error: 1.4, error_percentage: 3.5 }
        ],
        validation_verdict: "Validates steep obsolescence curve; rapid displacement by Snowflake & Databricks.",
        limitations: "Legacy banking environments retain slow migration timelines."
      },
      radar_position: { x: 22, y: 78, trajectory_2028: { x: 12, y: 88 } }
    }
  ],
  sample_user_profile: {
    name: "Sukanya Patel",
    target_role: "ai-engineer",
    skills: {
      "Python Ecosystem": 88,
      "SQL / Modeling": 82,
      "Machine Learning": 74,
      "Statistics & Inference": 70,
      "Cloud Infrastructure": 45,
      "GenAI / LLMs": 55,
      "RAG Architectures": 25,
      "Vector Databases": 20,
      "Agentic AI": 10,
      "MLOps / Deployment": 30,
      "Kubernetes": 20
    }
  },
  sample_resume: {
    candidate_name: "Sukanya Patel",
    headline: "Aspiring AI Engineer | Python & Machine Learning Enthusiast",
    education: [
      {
        degree: "B.Tech in Computer Science and Engineering",
        institution: "State Technical University",
        grad_year: 2026,
        gpa: "8.7 / 10.0"
      }
    ],
    extracted_skills: {
      demonstrated_skills: [
        { name: "Python Ecosystem", evidence_source: "RideNow Backend project & GitHub commit activity", confidence: 92 },
        { name: "SQL / Modeling", evidence_source: "Relational schema design with PostgreSQL", confidence: 88 },
        { name: "Machine Learning", evidence_source: "Customer churn predictor with Scikit-learn", confidence: 76 },
        { name: "FastAPI / Node APIs", evidence_source: "REST APIs with JWT authentication", confidence: 82 }
      ],
      mentioned_only_skills: [
        { name: "GenAI / LLMs", drawback: "Listed under skills header but lacking production repo or evaluation pipeline evidence", severity: "HIGH" },
        { name: "Cloud Infrastructure", drawback: "Mentioned AWS but no Terraform IaC, IAM policies, or VPC architecture demonstrated", severity: "MEDIUM" }
      ],
      critical_missing_skills: [
        { name: "RAG Architectures", market_weight: 0.92, impact: "High-priority differentiator for AI Engineer roles in 2026-2028" },
        { name: "Vector Databases", market_weight: 0.88, impact: "Essential for semantic indexing and chunk retrieval" },
        { name: "MLOps / Deployment", market_weight: 0.80, impact: "Missing Docker containerization & model drift telemetry evidence" }
      ],
      outdated_skills: [
        { name: "Legacy MapReduce", evidence_source: "CS603 course lab", verdict: "Low modern relevance (-41% market velocity); recommend replacing with Spark / Vector DB indexing" }
      ]
    },
    projects: [
      {
        title: "RideNow — Real-Time Cab Booking API",
        demonstrated_tech: ["FastAPI", "PostgreSQL", "SQLAlchemy", "JWT", "Python"],
        role_relevance: "MODERATE",
        missing_evidence: ["Deployment to Cloud / Docker", "CI/CD Pipeline", "Production Telemetry"],
        recommended_enhancement: "Containerize with Docker, write automated integration tests, and deploy on AWS ECS or Kubernetes."
      },
      {
        title: "Customer Churn Prediction Model",
        demonstrated_tech: ["Python", "Pandas", "Scikit-Learn", "RandomForest"],
        role_relevance: "MODERATE",
        missing_evidence: ["MLflow Checkpointing", "Model Drift Monitoring", "Inference Endpoint"],
        recommended_enhancement: "Wrap model in FastAPI endpoint, log metrics with MLflow, and evaluate SHAP feature importances."
      }
    ],
    optimization_scores: {
      market_alignment: 64.0,
      skill_coverage: 68.0,
      role_alignment: 62.5,
      future_skill_alignment: 48.0,
      project_relevance: 58.0,
      evidence_quality: 55.0,
      aggregate_index: 59.2
    },
    simulated_optimized_scores: {
      market_alignment: 82.0,
      skill_coverage: 84.0,
      role_alignment: 81.5,
      future_skill_alignment: 78.0,
      project_relevance: 85.0,
      evidence_quality: 82.0,
      aggregate_index: 82.1,
      delta: "+22.9%"
    },
    action_plan: [
      {
        id: "action-1",
        action: "Build Hybrid RAG Capstone Project",
        evidence_goal: "Add repository demonstrating BM25 + Dense Vector Search (Pinecone/Milvus) with evaluation test harness.",
        projected_alignment_lift: "+12.5%"
      },
      {
        id: "action-2",
        action: "Add Docker & CI/CD Evidence to RideNow",
        evidence_goal: "Include Dockerfile, GitHub Actions workflow, and Kubernetes deployment YAML.",
        projected_alignment_lift: "+6.0%"
      },
      {
        id: "action-3",
        action: "Replace MapReduce coursework with Distributed Spark/pgvector",
        evidence_goal: "Demonstrate modern vector similarity query execution.",
        projected_alignment_lift: "+4.4%"
      }
    ]
  },
  workforce_shocks: [
    {
      id: "shock-genai",
      title: "GenAI Agentic Acceleration Shock (+50% Adoption Velocity)",
      scenario: "Enterprise workflows transition from human-supervised scripting to semi-autonomous agentic execution.",
      effects: [
        { skill: "Agentic AI", baseline_demand: 68, shock_demand: 92, delta: "+24" },
        { skill: "RAG Architectures", baseline_demand: 78, shock_demand: 95, delta: "+17" },
        { skill: "Manual QA / Script Testing", baseline_demand: 38, shock_demand: 18, delta: "-20" },
        { skill: "System Design", baseline_demand: 82, shock_demand: 94, delta: "+12" }
      ],
      affected_roles: [
        { role: "AI / GenAI Engineer", impact: "CRITICAL TALENT SCARCITY (Demand surges 180%)" },
        { role: "Quality Assurance Tester", impact: "ACUTE CONTRACTION (Shift to AI QA Engineer)" }
      ]
    },
    {
      id: "shock-cloud-native",
      title: "Cloud-Native Infrastructure Consolidation Shock",
      scenario: "95% of enterprise data lakes migrate from on-premises servers to managed Kubernetes and serverless architectures.",
      effects: [
        { skill: "Kubernetes", baseline_demand: 82, shock_demand: 96, delta: "+14" },
        { skill: "Cloud Infrastructure", baseline_demand: 86, shock_demand: 98, delta: "+12" },
        { skill: "Legacy Hadoop", baseline_demand: 32, shock_demand: 8, delta: "-24" }
      ],
      affected_roles: [
        { role: "Cloud Solutions Architect", impact: "PEAK COMPETITIVENESS" },
        { role: "Legacy System Administrator", impact: "URGENT UPSKILLING MANDATE" }
      ]
    }
  ],
  monitoring_alerts: [
    {
      id: "alert-1",
      timestamp: "2 Hours ago",
      type: "MARKET TREND SHIFT",
      severity: "HIGH",
      message: "RAG Architectures demand velocity accelerated by +18% across 12,400 new tech postings this week.",
      recommended_action: "Review What-If simulation to measure impact on your target role."
    },
    {
      id: "alert-2",
      timestamp: "1 Day ago",
      type: "ROLE CO-OCCURRENCE CHANGE",
      severity: "MEDIUM",
      message: "MLOps / Deployment association with AI Engineer roles reached 82% threshold.",
      recommended_action: "Consider adding Docker and MLflow telemetry project evidence."
    },
    {
      id: "alert-3",
      timestamp: "3 Days ago",
      type: "REGIONAL DEFICIT SURGE",
      severity: "CRITICAL",
      message: "Bengaluru and Hyderabad talent deficit in Vector Databases widened to 3.8x open positions ratio.",
      recommended_action: "High recruiter outreach expected for verified vector indexing capabilities."
    }
  ]
};
