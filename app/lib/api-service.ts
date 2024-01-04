// import "@/dotenv-config";

export async function getStrategicIssue() {
  const res = await fetch(
    `${process.env.API_URL}/api/pn01-select-list/strategic_issue_list`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getObjective() {
  const res = await fetch(
    `${process.env.API_URL}/api/pn01-select-list/objective_list`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getUniversityStrategic() {
  const res = await fetch(
    `${process.env.API_URL}/api/pn01-select-list/university_strategic_list`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getStrategicPlanKPI() {
  const res = await fetch(
    `${process.env.API_URL}/api/pn01-select-list/strategic_plan_kpi_list`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getOperationPlanKPI() {
  const res = await fetch(
    `${process.env.API_URL}/api/pn01-select-list/operational_plan_kpi_list`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getProjectKPI() {
  const res = await fetch(
    `${process.env.API_URL}/api/pn01-select-list/project_kpi_list`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getProjectStatus() {
  const res = await fetch(
    `${process.env.API_URL}/api/pn01-select-list/project_status_list`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getProjectProposals() {
  const res = await fetch(
    `${process.env.API_URL}/api/project-proposal`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();

}
