export async function fetchDisneyCharacter(characterName) {
  try {
    const response = await fetch(`https://api.disneyapi.dev/character?name=${encodeURIComponent(characterName)}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching Disney character: ${response.status}`);
    }
    
    const responseData = await response.json();

    const exactMatch = responseData.data.find(
        character => character.name.toLowerCase() === characterName.toLowerCase()
      );
      
      // If we found an exact match, return it
      if (exactMatch) {
        return exactMatch;
      }
      
      // Otherwise return the first result (best match according to the API)
      return responseData.data[0];
      
  } catch (error) {
    console.error("Error fetching Disney character:", error);
    return null;
  }
}