export const generateSectionG = async (transcriptText: string): Promise<string> => {
  const prompt = `
    You are a medical assistant helping to fill out the OASIS assessment, specifically Section G: Functional Status. 

    Based on the transcription below, extract ONLY the responses related to the following items:

    - M1800. Grooming  
    - M1810. Current Ability to Dress Upper Body  
    - M1820. Current Ability to Dress Lower Body  
    - M1830. Bathing  
    - M1840. Toilet Transferring  
    - M1845. Toileting Hygiene  
    - M1850. Transferring  
    - M1860. Ambulation/Locomotion  

    If any item is not mentioned or cannot be inferred, write “Not mentioned”.

    At the end, format your output using Markdown in the following structure:

    ## Section G: Functional Status

    **M1800. Grooming:** [your extracted answer here]

    **M1810. Current Ability to Dress Upper Body:** [your extracted answer here]

    **M1820. Current Ability to Dress Lower Body:** [your extracted answer here]

    **M1830. Bathing:** [your extracted answer here]

    **M1840. Toilet Transferring:** [your extracted answer here]

    **M1845. Toileting Hygiene:** [your extracted answer here]

    **M1850. Transferring:** [your extracted answer here]

    **M1860. Ambulation/Locomotion:** [your extracted answer here]

    Transcription:

    """
    ${transcriptText}
    """
  `;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral",
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro while generationg Section G: ${errorText}`);
  }

  const data = await response.json();
  return data.response.trim();
};
