import { useEffect, useState } from "react";
import { useBusiness } from "../../../contexts/BusinessContext";

export default function UserPersona({
  setChanges,
}: {
  setChanges: (value: boolean) => void;
}) {
  const { selectedBusiness } = useBusiness();

  const [bio, setBio] = useState(selectedBusiness?.userPersona?.bio || "");
  const [motivations, setMotivations] = useState(
    selectedBusiness?.userPersona?.motivations || ""
  );
  const [devices, setDevices] = useState(
    selectedBusiness?.userPersona?.devices || ""
  );
  const [pains, setPains] = useState(
    selectedBusiness?.userPersona?.pains || ""
  );

  const [goals, setGoals] = useState(
    selectedBusiness?.userPersona?.goals || ""
  );

  const [brandAffiliations, setBrandAffiliations] = useState(
    selectedBusiness?.userPersona?.brandAffiliations || ""
  );

  const [age, setAge] = useState(selectedBusiness?.userPersona?.age || "");
  const [gender, setGender] = useState(
    selectedBusiness?.userPersona?.gender || ""
  );
  const [occupation, setOccupation] = useState(
    selectedBusiness?.userPersona?.occupation || ""
  );
  const [location, setLocation] = useState(
    selectedBusiness?.userPersona?.location || ""
  );
  const [name, setName] = useState(selectedBusiness?.userPersona?.name || "");

  const [imageURL] = useState(selectedBusiness?.userPersona?.imageURL || "");

  const [familyStatus, setFamilyStatus] = useState(
    selectedBusiness?.userPersona?.familyStatus || ""
  );

  // When something changes, update the business object.
  useEffect(() => {
    if (selectedBusiness) {
      selectedBusiness.userPersona = {
        bio,
        motivations,
        devices,
        pains,
        goals,
        brandAffiliations,
        age,
        name,
        familyStatus,
        location,
        gender,
        occupation,
        imageURL,
      };
      setChanges(true);
      // console.log("🔥🔥🔥🔥🔥 User Persona updated");
    }
  }, [
    bio,
    motivations,
    devices,
    pains,
    goals,
    brandAffiliations,
    age,
    name,
    familyStatus,
    location,
    gender,
    occupation,
    imageURL,
  ]);

  const [base64, setBase64] = useState<string>("");

  useEffect(() => {
    async function fetchBase64() {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        console.log("API_URL ℹ️:", API_URL);
        const response = await fetch(API_URL + "/api/image-to-base64", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            src: selectedBusiness?.userPersona?.imageURL,
          }),
        });
        const data = await response.json();
        setBase64(data.base64);
        // console.log("BASE64 ℹ️:");
        // console.log(data.base64);
      } catch (error) {
        console.log(error);
      }
    }

    if (!selectedBusiness?.userPersona?.imageURL)
      return console.log("no image 😭");
    fetchBase64();
  }, [selectedBusiness?.userPersona?.imageURL]);

  return (
    <div className="grid grid-cols-4  gap-0 mt-4 shadow-lg bg-white">
      <div className="h-60  w-60 text-black text-center flex-grow">
        <img src={base64} alt="Image" />
      </div>

      <div className="h-60 w-60 p-4 text-black text-center ">
        <h3>
          <input
            className="w-full border-none focus:border-gray-300 focus:ring focus:ring-gray-300 text-2xl font-bold p-0 text-center"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </h3>
        <textarea
          style={{ height: "150px" }}
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
          className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
        ></textarea>
      </div>

      <div className=" h-60 w-60 p-4 text-black text-center">
        <h3>
          <span className="text-2xl font-bold">Motivations</span>
        </h3>
        <textarea
          style={{ height: "150px" }}
          value={motivations}
          onChange={(e) => {
            setMotivations(e.target.value);
          }}
          className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
        ></textarea>
      </div>

      <div className="h-60 w-60 p-4 text-black text-center bg-zinc-100">
        <h3>
          <span className="text-2xl font-bold text-black ">Devices</span>
        </h3>
        <textarea
          style={{ height: "150px" }}
          value={devices}
          onChange={(e) => {
            setDevices(e.target.value);
          }}
          className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
        ></textarea>
      </div>

      <div className="p-1 h-60 w-60 text-black text-center flex-grow bg-zinc-300">
        <div className=" flex-grow ">
          <div className="flex flex-wrap justify-center text-xs">
            <div className="w-24 h-24 p-1 bg-white shadow-lg rounded-lg m-2">
              <div className="text-center">
                <h2 className="text-xl font-bold mt-1">👨</h2>
                <h2 className="text-xs text-gray-600 ">Age/Gender</h2>
                <textarea
                  className="w-full border-none focus:border-gray-300 focus:ring focus:ring-gray-300 font-bold mt-1 p-0 text-center text-xs resize-none scrollbar-hidden"
                  rows={1}
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
                <textarea
                  className="w-full border-none focus:border-gray-300 focus:ring focus:ring-gray-300 font-bold mt-0 p-0 text-center text-xs resize-none scrollbar-hidden"
                  rows={1}
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-24 h-24 p-1 bg-white shadow-lg rounded-lg m-2">
              <div className="text-center">
                <h2 className="text-xl font-bold mt-1">📍</h2>
                <h2 className="text-xs text-gray-600 ">Location</h2>
                <textarea
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  className="w-full border-none focus:border-gray-300 focus:ring focus:ring-gray-300 font-bold mt-1 p-0 text-center text-xs resize-none scrollbar-hidden"
                  rows={2}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center  text-xs">
            <div className="w-24 h-24 p-1 bg-white shadow-lg rounded-lg m-2">
              <div className="text-center">
                <h2 className=" text-xl font-bold mt-1">💼</h2>
                <h2 className="text-xs text-gray-600 ">Occupation</h2>
                <textarea
                  value={occupation}
                  onChange={(e) => {
                    setOccupation(e.target.value);
                  }}
                  className="w-full border-none focus:border-gray-300 focus:ring focus:ring-gray-300 font-bold mt-1 p-0 text-center text-xs resize-none scrollbar-hidden"
                  rows={2}
                />
              </div>
            </div>
            <div className="w-24  h-24 p-1 bg-white shadow-lg rounded-lg m-2">
              <div className="text-center">
                <h2 className="text-xl font-bold mt-1">🏠</h2>
                <h2 className="text-xs text-gray-600">Family Status</h2>
                <textarea
                  value={familyStatus}
                  onChange={(e) => {
                    setFamilyStatus(e.target.value);
                  }}
                  className="w-full border-none focus:border-gray-300 focus:ring focus:ring-gray-300 font-bold mt-1 p-0 text-center text-xs resize-none scrollbar-hidden"
                  rows={2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-60 w-60 p-4 text-black text-center flex-grow">
        <h3>
          <span className="text-2xl font-bold">Pains</span>
        </h3>
        <textarea
          style={{ height: "150px" }}
          value={pains}
          onChange={(e) => {
            setPains(e.target.value);
          }}
          className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
        ></textarea>
      </div>

      <div className="h-60 w-60 p-4 text-black text-center flex-grow">
        <h3>
          <span className="text-2xl font-bold">Goals</span>
        </h3>
        <textarea
          style={{ height: "150px" }}
          value={goals}
          onChange={(e) => {
            setGoals(e.target.value);
          }}
          className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
        ></textarea>
      </div>

      <div className="h-60 w-60 p-4 text-black text-center flex-grow bg-zinc-100">
        <h3>
          <span className="text-2xl font-bold">Brand Affiliations</span>
        </h3>
        <textarea
          style={{ height: "150px" }}
          value={brandAffiliations}
          onChange={(e) => {
            setBrandAffiliations(e.target.value);
          }}
          className="w-full p-2 mt-4 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent bg-transparent hover:border-none  resize-none scrollbar-hidden"
        ></textarea>
      </div>
    </div>
  );
}
