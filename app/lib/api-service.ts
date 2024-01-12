import axios from 'axios';

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
  const res = await fetch(`${process.env.API_URL}/api/project-proposal`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getAllData(apiPath: string) {
  const res = await fetch(`${process.env.API_URL}/api/${apiPath}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getDataById(apiPath: string, id: string) {
  const res = await fetch(`${process.env.API_URL}/api/${apiPath}/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function createData(apiPath: string, formData: any) {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/api/${apiPath}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Create project proposal success', response);

    // If the response data contains an 'id' field, use it
    if (response.data.id) {
      const insertedId = response.data.id;
      console.log('Inserted ID:', insertedId);
      return response; // Return the response object
    } else {
      console.warn('No ID found in the response data:', response.data);
      return response; // Return the response object even if no ID is found
    }
  } catch (error) {
    console.error('Error while sending data:', error);
  }
}
