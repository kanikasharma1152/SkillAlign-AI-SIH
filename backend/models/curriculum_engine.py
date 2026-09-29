from typing import Dict, List, Any

class CurriculumIntelligenceEngine:
    """
    Directly tackles the SIH problem:
    Aligning higher education & vocational curricula with real-time industry demand.
    Maps courses -> extracted topics -> industry demand indices -> gap recommendations.
    """

    def __init__(self, market_skills: List[Dict[str, Any]]):
        self.market_skills = {s["name"]: s for s in market_skills}

    def analyze_curriculum(self, curriculum_data: Dict[str, Any]) -> Dict[str, Any]:
        courses = curriculum_data.get("courses", [])
        taught_skills = set()
        course_alignments = []

        for c in courses:
            c_skills = c.get("taught_skills", [])
            taught_skills.update(c_skills)

            # Calculate individual course relevance based on current industry demand
            demand_sum = 0
            count = 0
            for s_name in c_skills:
                m_skill = self.market_skills.get(s_name)
                if m_skill:
                    demand_sum += m_skill.get("current_demand", 50)
                    count += 1
                else:
                    demand_sum += 40
                    count += 1

            avg_demand = demand_sum / max(1, count)
            status = "ALIGNED" if avg_demand >= 75 else "MODERATE" if avg_demand >= 50 else "OUTDATED_WARNING"
            course_alignments.append({
                "code": c.get("code", "CSXXX"),
                "name": c.get("name", "Course"),
                "skills": c_skills,
                "relevance_score": round(avg_demand, 1),
                "status": status
            })

        # Top industry critical skills currently missing
        missing_critical = []
        for s_name, s_data in self.market_skills.items():
            if s_name not in taught_skills and s_data.get("current_demand", 0) >= 70:
                missing_critical.append({
                    "skill": s_name,
                    "category": s_data.get("category", "General"),
                    "current_demand": s_data.get("current_demand", 0),
                    "growth_velocity": s_data.get("growth_velocity", "+0%"),
                    "status": s_data.get("status", "HIGH DEMAND"),
                    "priority": "CRITICAL" if s_data.get("current_demand", 0) > 85 else "HIGH"
                })

        missing_critical.sort(key=lambda x: x["current_demand"], reverse=True)

        # Global curriculum alignment index
        overall_coverage = round(
            (len(taught_skills.intersection(set(self.market_skills.keys()))) / max(1, len(self.market_skills))) * 100, 1
        )

        return {
            "institution": curriculum_data.get("institution", "Academic Institution"),
            "degree": curriculum_data.get("degree", "Degree Program"),
            "curriculum_coverage_score": overall_coverage,
            "courses_analyzed": len(courses),
            "course_alignments": course_alignments,
            "critical_omissions": missing_critical[:5],
            "action_plan": [
                {
                    "step": 1,
                    "action": "Modernize Big Data syllabus CS603",
                    "details": "Phase out legacy MapReduce cluster exercises; replace with Vector DB querying (Pinecone/Milvus) & PySpark DataFrame API."
                },
                {
                    "step": 2,
                    "action": "Introduce Capstone Lab on RAG Architectures",
                    "details": "Students build an end-to-end RAG system with hybrid search and document chunking pipelines."
                },
                {
                    "step": 3,
                    "action": "Embed MLOps Telemetry into CS701",
                    "details": "Teach automated CI/CD for model checkpoints, drift detection, and Docker containerization."
                }
            ]
        }
