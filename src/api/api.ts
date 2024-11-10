const GITHUB_USERNAME = 'diegogonza112';
const API_BASE_URL = `https://recruiting.verylongdomaintotestwith.ca/api/${GITHUB_USERNAME}/character`;

export const fetchCharacter = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Error fetching character data');
  }
  return response.json();
};


export const saveCharacter = async (characterData: any) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(characterData),
  });
  if (!response.ok) {
    throw new Error('Error saving character data');
  }
  return response.json();
};
