# Fix Persona Chat Utility

This function is used to fix deprecated persona chat data models.

/\*\*

- Recursively crawls an object, comparing keys to valid keys and selecting the most similar or dropping the key.
- If the parent key is badly spelled, it uses the ratio of matched child keys to find the best match.
- @param {string} key - The key to be validated and reconstructed.
- @param {any} data - The data associated with the key, which may be a nested object.
- @param {string[][]} schemaKeys - The array of valid keys from the schema.
- @returns {any} - The reconstructed data object with valid keys or null if no valid key is found.
  \*/
  function reconstructKeyFromData({
  key,
  data,
  schemaKeys,
  }: {
  key: string;
  data: any;
  schemaKeys: string[][];
  }): any {
  // Flatten the schemaKeys to get a unique list of valid keys
  const flatSchemaKeys = [...new Set(schemaKeys.flat())];

// Find the most similar key from the valid keys list
const matchedKey = findMatchedParamKey(key, flatSchemaKeys);

let reconstructedData: any = null;

// If data is an object, recursively reconstruct the object
if (typeof data === "object" && data !== null) {
const reconstructedObject: { [key: string]: any } = {};
let matchedChildKeysCount = 0;
let totalChildKeys = 0;

    Object.entries(data).forEach(([subKey, subValue]) => {
      totalChildKeys++;
      // Recursively reconstruct each key-value pair in the object
      const reconstructedSubValue = reconstructKeyFromData({
        key: subKey,
        data: subValue,
        schemaKeys,
      });

      // Only add the reconstructed key-value pair if a valid key is found
      if (reconstructedSubValue) {
        Object.assign(reconstructedObject, reconstructedSubValue);
        matchedChildKeysCount++;
      }
    });

    // If the majority of child keys are valid, consider the parent key as valid too
    console.log("key ratio", key, matchedChildKeysCount, totalChildKeys);
    if (matchedChildKeysCount / totalChildKeys > 0.5) {
      reconstructedData = reconstructedObject;
      console.log("key matched", key);
    } else {
      reconstructedData = data;
    }

} else {
// If data is not an object, simply assign it to the reconstructedData
reconstructedData = data;
}

// Return the reconstructed data with the matched key or null if no key is found
return matchedKey ? { [matchedKey.key]: reconstructedData } : null;
}

However, there is a problem. If we have the case where { "very badly spelt key": { "matching_key": value, "another_matching_key": value } }, the function will not be able to reconstruct the key, where as it would be safe to assume the badly spelt key based on the ratio of matched child keys. To solve this you'll need to use
schemaKey which returns an array of arrays of keys. You can then use this to find the best match for the parent key based on the child keys.

it looks like the key ratio is successful but the data isn't being returned properly:

key ratio picture_components 3 3
key matched picture_components
key ratio dwjadaoihdiwhaiod 4 5
key matched dwjadaoihdiwhaiod
key ratio insights 1 2
{
picture_components: {
clothing: 'leather_jacket',
glasses: 'sunglasses',
hair: 'long_hair_with_ribbon'
},
insights: {
Enhanced_Interaction_Patterns: 'Engages frequently with tool-generated reports and actively modifies templates to reflect emerging design trends.',
dwadhwoahdo: 'Enhance template customization options; increase the granularity of data analysis features to support detailed design adjustments.'
},
pictureURL: 'https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant01&body=variant16&hair=variant46&backgroundColor=c7eaf1'
} // Should've returned

export type PersonaArchetype = {
archetype_name: string;
pictureURL: string;
persona_components: {
Motivations: string;
Painpoints: string;
Preferences_and_Needs: string;
End_Goal: string;
Mindset_and_Perspective: string;
};
insights: {
Enhanced_Interaction_Patterns: string;
Strategic_Recommendations: string;
};
};

where the persona = {
picture_components: {
clothing: "leather_jacket",
glasses: "sunglasses",
hair: "long_hair_with_ribbon",
},
dwjadaoihdiwhaiod: {
Motivations:
"Seeks to deploy data-centric design techniques to ensure product designs are optimized for target user segments.",
Painpoints:
"Encounters difficulties in accessing up-to-date, reliable data that can be directly applied to design decisions.",
Preferences_and_Needs:
"Desires a robust, adaptable platform that provides deep analytical capabilities and customizable templates.",
End_Goal:
"To lead in the creation of highly effective and aesthetically pleasing design solutions based on user data analysis.",
dwajdpjiwajd:
"Believes in the fusion of art and science within design and values empirical over anecdotal evidence.",
},
insights: {
Enhanced_Interaction_Patterns:
"Engages frequently with tool-generated reports and actively modifies templates to reflect emerging design trends.",
dwadhwoahdo:
"Enhance template customization options; increase the granularity of data analysis features to support detailed design adjustments.",
},
pictureURL:
"https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant01&body=variant16&hair=variant46&backgroundColor=c7eaf1",
},
schemaKeys = [
[ 'archetype_name' ],
[ 'pictureURL' ],
[ 'persona_components', 'Motivations' ],
[ 'persona_components', 'Painpoints' ],
[ 'persona_components', 'Preferences_and_Needs' ],
[ 'persona_components', 'End_Goal' ],
[ 'persona_components', 'Mindset_and_Perspective' ],
[ 'insights', 'Enhanced_Interaction_Patterns' ],
[ 'insights', 'Strategic_Recommendations' ],
[ 'picture_components', 'clothing' ],
[ 'picture_components', 'glasses' ],
[ 'picture_components', 'hair' ]
]

Object.entries(persona).map(([key, value]): void => {
const data = reconstructKeyFromData({
key,
data: value,
schemaKeys,
});

    if (data) {
      Object.entries(data).map(([key, value]) => {
        attemptedReconstructPersona[key] = value;
      });
    }

});

i need to write a function which can infer an unknown parent key based on a key schema and an object representing data: example schemaKeys = [
[ 'archetype_name' ],
[ 'pictureURL' ],
[ 'persona_components', 'Motivations' ],
[ 'persona_components', 'Painpoints' ],
[ 'persona_components', 'Preferences_and_Needs' ],
[ 'persona_components', 'End_Goal' ],
[ 'persona_components', 'Mindset_and_Perspective' ],
[ 'insights', 'Enhanced_Interaction_Patterns' ],
[ 'insights', 'Strategic_Recommendations' ],
[ 'picture_components', 'clothing' ],
[ 'picture_components', 'glasses' ],
[ 'picture_components', 'hair' ]
] where the schema in object form is: {
archetype_name: string;
pictureURL: string;
persona_components: {
Motivations: string;
Painpoints: string;
Preferences_and_Needs: string;
End_Goal: string;
Mindset_and_Perspective: string;
};
insights: {
Enhanced_Interaction_Patterns: string;
Strategic_Recommendations: string;
};
picture_components: {
clothing: string;
glasses: string;
hair: string;
};
}

then the function would be:

const data = {
Motivations: "string",
Painpoints:"string",
Preferences_and_Needs: "string",
End_Goal:"string",
Mindset_and_Perspective:"string",
}

const inferredKey = inferKeyFromData({
data,
schemaKeys,
})

console.log(inferredKey) // should return 'persona_components'
