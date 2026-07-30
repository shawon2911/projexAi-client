
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchProjects = async (search = '', category = '') => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append('search', search);
  if (category && category !== 'All') queryParams.append('category', category);

  const res = await fetch(`${BASE_URL}/projects?${queryParams.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

export const createProject = async (projectData: any, token: string) => {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create project');
  }
  return res.json();
};