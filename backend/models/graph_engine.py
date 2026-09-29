from typing import Dict, List, Any, Optional

class SkillGraphEngine:
    """
    Skill Graph Network, Dependency Tree, Transferability,
    Skill Priority ROI, and Workforce Shock Simulation Engine.
    """

    SYNERGIES = {
        "RAG Architectures": ["Vector Databases", "GenAI / LLMs", "Python Ecosystem"],
        "Vector Databases": ["RAG Architectures", "SQL / Modeling", "GenAI / LLMs"],
        "Agentic AI": ["GenAI / LLMs", "RAG Architectures", "System Design"],
        "GenAI / LLMs": ["RAG Architectures", "Vector Databases", "Agentic AI", "Python Ecosystem"],
        "MLOps / Deployment": ["Kubernetes", "Cloud Infrastructure", "Docker", "CI/CD & GitOps"],
        "Kubernetes": ["MLOps / Deployment", "Cloud Infrastructure", "Docker"],
        "Cloud Infrastructure": ["Kubernetes", "Terraform / IaC", "System Design"],
        "Python Ecosystem": ["Machine Learning", "FastAPI / Node APIs", "SQL / Modeling"]
    }

    DEPENDENCIES = {
        "Python Ecosystem": {"prereqs": [], "dependents": ["Machine Learning", "FastAPI / Node APIs", "GenAI / LLMs"]},
        "SQL / Modeling": {"prereqs": [], "dependents": ["Vector Databases", "Data Warehousing"]},
        "Machine Learning": {"prereqs": ["Python Ecosystem", "Statistics & Inference"], "dependents": ["GenAI / LLMs", "MLOps / Deployment"]},
        "GenAI / LLMs": {"prereqs": ["Machine Learning", "Python Ecosystem"], "dependents": ["RAG Architectures", "Agentic AI"]},
        "Vector Databases": {"prereqs": ["SQL / Modeling", "Python Ecosystem"], "dependents": ["RAG Architectures"]},
        "RAG Architectures": {"prereqs": ["GenAI / LLMs", "Vector Databases"], "dependents": ["Agentic AI"]},
        "Agentic AI": {"prereqs": ["RAG Architectures", "GenAI / LLMs"], "dependents": ["Autonomous Systems"]},
        "MLOps / Deployment": {"prereqs": ["Python Ecosystem", "Docker", "Machine Learning"], "dependents": ["AI Platform Architecture"]},
        "Kubernetes": {"prereqs": ["Docker", "Linux Basics"], "dependents": ["MLOps / Deployment", "Cloud Infrastructure"]}
    }

    def __init__(self, roles: List[Dict[str, Any]], skills: List[Dict[str, Any]]):
        self.roles = {r["id"]: r for r in roles}
        self.skills = {s["name"]: s for s in skills}

    def calculate_role_alignment(self, user_skills: Dict[str, float], role_id: str) -> Dict[str, Any]:
        role = self.roles.get(role_id, list(self.roles.values())[0])

        total_weight = 0.0
        weighted_score = 0.0
        skill_breakdown = []
        gaps = []
        strengths = []

        for item in role.get("core_skills", []):
            skill_name = item["skill"]
            weight = item.get("weight", 1.0)
            benchmark = item.get("benchmark", 80)
            user_val = user_skills.get(skill_name, 0.0)

            ratio = min(1.2, user_val / max(1.0, benchmark))
            total_weight += weight
            weighted_score += weight * min(1.0, ratio)

            gap_val = max(0.0, benchmark - user_val)

            # 5-tier classification per Section 20: Critical, Emerging, Moderate, Quick Wins, Strengths
            if gap_val == 0 or user_val >= benchmark:
                tier = "EXISTING STRENGTH"
                strengths.append(skill_name)
            elif gap_val > 40 and weight >= 0.85:
                tier = "CRITICAL GAP"
            elif skill_name in ["RAG Architectures", "Agentic AI", "Vector Databases"]:
                tier = "EMERGING GAP"
            elif gap_val <= 20:
                tier = "QUICK WIN"
            else:
                tier = "MODERATE GAP"

            breakdown_entry = {
                "skill": skill_name,
                "user_score": user_val,
                "benchmark": benchmark,
                "gap": round(gap_val, 1),
                "severity": tier,
                "weight": weight
            }
            skill_breakdown.append(breakdown_entry)
            if gap_val > 0:
                gaps.append(breakdown_entry)

        overall_alignment = (weighted_score / max(1e-5, total_weight)) * 100.0
        gaps.sort(key=lambda g: g["gap"] * g["weight"], reverse=True)

        return {
            "role_id": role["id"],
            "role_name": role["name"],
            "alignment_percentage": round(overall_alignment, 1),
            "median_salary_range": role.get("median_salary_range", "$140k+"),
            "demand_tier": role.get("demand_tier", "High"),
            "skill_breakdown": skill_breakdown,
            "critical_gaps": [g for g in gaps if g["severity"] == "CRITICAL GAP"],
            "emerging_gaps": [g for g in gaps if g["severity"] == "EMERGING GAP"],
            "quick_wins": [g for g in gaps if g["severity"] == "QUICK WIN"],
            "existing_strengths": strengths
        }

    def simulate_what_if(
        self,
        current_skills: Dict[str, float],
        target_role_id: str,
        added_skill: str,
        target_proficiency: float = 85.0
    ) -> Dict[str, Any]:
        base_result = self.calculate_role_alignment(current_skills, target_role_id)
        base_alignment = base_result["alignment_percentage"]

        simulated_skills = dict(current_skills)
        simulated_skills[added_skill] = max(simulated_skills.get(added_skill, 0), target_proficiency)

        # Network spillover
        synergy_neighbors = self.SYNERGIES.get(added_skill, [])
        spillovers = []
        for neighbor in synergy_neighbors:
            old_val = simulated_skills.get(neighbor, 0)
            boost = round(min(15.0, 0.15 * (100 - old_val)), 1)
            simulated_skills[neighbor] = min(100.0, old_val + boost)
            spillovers.append({
                "skill": neighbor,
                "boost": f"+{boost}%",
                "reason": f"Synergy with {added_skill}"
            })

        projected_result = self.calculate_role_alignment(simulated_skills, target_role_id)
        projected_alignment = projected_result["alignment_percentage"]
        delta = round(projected_alignment - base_alignment, 1)

        other_roles = []
        for r_id, r in self.roles.items():
            if r_id == target_role_id:
                continue
            r_base = self.calculate_role_alignment(current_skills, r_id)["alignment_percentage"]
            r_proj = self.calculate_role_alignment(simulated_skills, r_id)["alignment_percentage"]
            other_roles.append({
                "role_id": r_id,
                "role_name": r["name"],
                "base_alignment": r_base,
                "projected_alignment": r_proj,
                "delta": round(r_proj - r_base, 1),
                "unlocked": r_base < 75.0 <= r_proj
            })

        return {
            "added_skill": added_skill,
            "target_proficiency": target_proficiency,
            "base_alignment": base_alignment,
            "projected_alignment": projected_alignment,
            "alignment_delta": delta,
            "network_spillovers": spillovers,
            "other_roles": other_roles,
            "unlocked_career_mobility": [r for r in other_roles if r["unlocked"]],
            "market_verdict": f"Acquiring {added_skill} closes high-impact gaps, projecting a +{delta}% alignment jump."
        }

    def calculate_skill_transferability(self, user_skills: Dict[str, float]) -> List[Dict[str, Any]]:
        """
        Skill Transferability Engine (Section 19):
        Calculates cross-role skill coverage and mobility matrix across all active roles.
        """
        matrix = []
        for r_id, role in self.roles.items():
            alignment_data = self.calculate_role_alignment(user_skills, r_id)
            core_skills = role.get("core_skills", [])

            covered = [cs["skill"] for cs in core_skills if user_skills.get(cs["skill"], 0) >= cs["benchmark"] * 0.75]
            missing = [cs["skill"] for cs in core_skills if user_skills.get(cs["skill"], 0) < cs["benchmark"] * 0.75]
            transferable = [cs["skill"] for cs in core_skills if user_skills.get(cs["skill"], 0) >= 60 and user_skills.get(cs["skill"], 0) < cs["benchmark"] * 0.75]

            matrix.append({
                "role_id": r_id,
                "role_name": role["name"],
                "category": role.get("category", "Tech"),
                "alignment_percentage": alignment_data["alignment_percentage"],
                "covered_skills": covered,
                "transferable_skills": transferable,
                "missing_skills": missing,
                "mobility_readiness": "READY" if alignment_data["alignment_percentage"] >= 80 else "MODERATE TRANSITION" if alignment_data["alignment_percentage"] >= 65 else "SIGNIFICANT UPSKILLING REQUIRED"
            })

        matrix.sort(key=lambda x: x["alignment_percentage"], reverse=True)
        return matrix

    def compare_skill_roi(self, user_skills: Dict[str, float], target_role_id: str) -> List[Dict[str, Any]]:
        """
        Skill ROI / Priority Simulator (Section 22):
        Compares Option A (RAG) vs Option B (MLOps) vs Option C (Cloud Infrastructure).
        """
        options = ["RAG Architectures", "MLOps / Deployment", "Cloud Infrastructure", "Vector Databases"]
        comparisons = []

        for opt in options:
            sim = self.simulate_what_if(user_skills, target_role_id, opt, target_proficiency=85.0)
            effort_hours = 45 if opt in ["RAG Architectures", "MLOps / Deployment"] else 35
            comparisons.append({
                "option": opt,
                "alignment_delta": sim["alignment_delta"],
                "projected_alignment": sim["projected_alignment"],
                "learning_effort_hours": effort_hours,
                "spillovers_count": len(sim["network_spillovers"]),
                "priority_tier": "CRITICAL PRIORITY" if sim["alignment_delta"] > 10 else "HIGH PRIORITY",
                "project_applicability": "Direct capstone integration with hybrid search or production containerization."
            })

        comparisons.sort(key=lambda x: x["alignment_delta"], reverse=True)
        return comparisons
