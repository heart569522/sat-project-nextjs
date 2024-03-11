import axios from 'axios';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

export async function register(formData: any) {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/api/auth/register`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Register success', response);

    return response;
  } catch (error) {
    console.error('Error while sending data:', error);
  }
}

export async function checkExist(type: string, data: string) {
  const res = await axios.get(
    `${process.env.API_URL}/api/auth/check-exist/${type}/${encodeURIComponent(
      data,
    )}`,
  );

  return res.data.exists;
}

export async function checkAvaliable(apiPath: string, data: string) {
  const res = await axios.get(
    `${process.env.API_URL}/api/${apiPath}/${encodeURIComponent(data)}`,
  );

  return res.data.avaliable;
}

export async function checkRole(data: string) {
  const res = await fetch(`${process.env.API_URL}/api/auth/check-role/${data}`);

  return res.text();
}

export async function getUserLoginData(data: string) {
  const res = await fetch(
    `${process.env.API_URL}/api/users/get-login-data/${data}`,
  );

  return res.json();
}

export async function getAllData(apiPath: string) {
  const res = await fetch(`${process.env.API_URL}/api/${apiPath}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getOneData(apiPath: string, data: any) {
  noStore();

  const res = await axios.get(`${process.env.API_URL}/api/${apiPath}/${data}`);

  return res;
}

export async function getDataById(apiPath: string, id: string) {
  noStore();

  const res = await fetch(`${process.env.API_URL}/api/${apiPath}/${id}`);

  // if (!res.ok) {
  //   throw new Error('Failed to fetch data');
  // }
  return res.json();
}

export async function searchProjectProposalCode(
  search: string,
  userId: string,
  userRole: string,
) {
  noStore();

  const url = new URL(
    `${process.env.API_URL}/api/project-proposal/search-project-code`,
  );

  if (search) {
    url.searchParams.append('search', search);
  }

  if (userId) {
    url.searchParams.append('userId', userId);
  }

  if (userRole) {
    url.searchParams.append('userRole', userRole);
  }

  const res = await axios.get(url.toString());

  return res;
}

export async function fetchPages(
  apiPath: string,
  search: string,
  userId?: string | undefined,
  isWithoutDraft?: string | undefined,
) {
  noStore();

  const url = new URL(`${process.env.API_URL}/api/${apiPath}`);

  if (search) {
    url.searchParams.append('query', search);
  }

  if (userId) {
    url.searchParams.append('userId', userId);
  }

  if (isWithoutDraft) {
    url.searchParams.append('isWithoutDraft', isWithoutDraft);
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
  userId?: string | undefined,
  isWithoutDraft?: string | undefined,
) {
  noStore();

  const url = new URL(`${process.env.API_URL}/api/${apiPath}`);

  if (search) {
    url.searchParams.append('search', search);
  }

  if (currentPage) {
    url.searchParams.append('page', currentPage.toString());
  }

  if (userId) {
    url.searchParams.append('userId', userId);
  }

  if (isWithoutDraft) {
    url.searchParams.append('isWithoutDraft', isWithoutDraft);
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
    throw error;
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
  isPatchMethod?: boolean,
) {
  try {
    const method = isPatchMethod ? 'patch' : 'put';

    const response = await axios[method](
      `${process.env.API_URL}/api/${apiPath}/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    // console.log('Update project proposal success', response);
    return response;
  } catch (error) {
    console.error('Error while sending data:', error);
    throw error;
  }
}

export async function deleteData(
  apiPath: string,
  id: string,
  isDeleteMethod?: boolean,
) {
  try {
    const method = isDeleteMethod ? 'delete' : 'patch';

    const response = await axios[method](
      `${process.env.API_URL}/api/${apiPath}/${id}`,
    );

    return response;
  } catch (error) {
    console.error('Error while sending data:', error);
  }
}

export async function sendEmail(apiPath: string, formData: any) {
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

    return response;
  } catch (error) {
    console.error('Error while sending data:', error);
  }
}

export async function createVerifyToken(
  apiPath: string,
  id: string,
  formData: any,
) {
  try {
    const response = await axios.patch(
      `${process.env.API_URL}/api/${apiPath}/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  } catch (error) {
    console.error('Error while sending data:', error);
  }
}

export async function createForgotPasswordToken(
  apiPath: string,
  email: string,
  formData: any,
) {
  try {
    const response = await axios.patch(
      `${process.env.API_URL}/api/${apiPath}/${email}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response;
  } catch (error) {
    console.error('Error while sending data:', error);
  }
}

export async function verifyData(
  apiPath: string,
  token: string,
  isPatchMethod?: boolean,
) {
  const method = isPatchMethod ? 'patch' : 'get';

  const response = await axios[method](
    `${process.env.API_URL}/api/${apiPath}/${token}`,
  );

  return response;
}

export async function forgotPassword(password: string, id: string) {
  const response = await axios.patch(
    `${process.env.API_URL}/api/auth/forgot-password/${id}`,
    password,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response;
}

