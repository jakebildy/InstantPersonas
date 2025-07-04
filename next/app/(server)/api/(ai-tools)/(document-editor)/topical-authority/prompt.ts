export const TOPICAL_AUTHORITY_PROMPT = ({
  category,
}: {
  category: string;
}) => `
give me 5 semantically relevant but unique topics under a main category that these personas would be interested in ${category}, and for each,
give me 10 different variations of the topic that each address a different search intent. 
Make it in table format with the following columns: 
  column 1: The unique semantically related topic, 
  column 2: the different variations on it, 
  column 3: an intriguing, clickbait style title.
  Return nothing but the table in the form of comma separated values.
  ex. "topic1, variation1, title1,\ntopic1, variation2, title2, ..."
`;
