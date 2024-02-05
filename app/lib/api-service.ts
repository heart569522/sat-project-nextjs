import axios from 'axios';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

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
  noStore();

  const res = await fetch(`${process.env.API_URL}/api/${apiPath}/${id}`);

  // if (!res.ok) {
  //   throw new Error('Failed to fetch data');
  // }

  return res.json();
}

export async function fetchPages(apiPath: string, search: string) {
  noStore();

  const url = new URL(`${process.env.API_URL}/api/${apiPath}`);

  if (search) {
    url.searchParams.append('query', search);
  }

  try {
    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error: any) {
    console.error('Error during fetch:', error.message);
    throw error;
  }
}

export async function fetchFilter(
  apiPath: string,
  search: string | undefined,
  currentPage: number | undefined,
) {
  noStore();

  const url = new URL(`${process.env.API_URL}/api/${apiPath}`);

  if (search) {
    url.searchParams.append('search', search);
  }

  if (currentPage) {
    url.searchParams.append('page', currentPage.toString());
  }

  try {
    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error('Error during fetch:', error);
    throw error;
  }
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

    if (response.data.id) {
      const insertedId = response.data.id;
      console.log('Inserted ID:', insertedId);
      return response;
    } else {
      console.warn('No ID found in the response data:', response.data);
      return response;
    }
  } catch (error) {
    console.error('Error while sending data:', error);
  }
}

export async function createDraft(apiPath: string, formData: any) {
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

    console.log('Create draft project proposal success', response);

    return response;
  } catch (error) {
    console.error('Error while sending data:', error);
  }
}

export async function updateData(
  apiPath: string,
  formData: any,
  id: string,
  isPN01Draft?: boolean,
) {
  try {
    const method = isPN01Draft ? 'patch' : 'put';

    const response = await axios[method](
      `${process.env.API_URL}/api/${apiPath}/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Update project proposal success', response);
    return response;
  } catch (error) {
    console.error('Error while sending data:', error);
  }
}

export async function deleteData(apiPath: string, id: string) {
  try {
    const response = await axios.patch(
      `${process.env.API_URL}/api/${apiPath}/${id}`,
    );

    return response;
  } catch (error) {
    console.error('Error while sending data:', error);
  }
}
