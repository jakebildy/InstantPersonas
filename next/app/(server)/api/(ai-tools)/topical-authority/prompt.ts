export const TOPICAL_AUTHORITY_PROMPT = ({
  category,
}: {
  category: string;
}) => `
give me 30 semantically relevant but unique topics under the main category of ${category}, and for each,
give me 10 different variations of the topic that each address a different search intent. 
Make it in table format with the following columns: 
  column 1: The unique semantically related topic, 
  column 2: the different variations on it, 
  column 3: an intriguing, clickbait style title.
`;
