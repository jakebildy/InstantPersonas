import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api, { BusinessI } from "../services/api.service";

enum LoadingInterfaceKeys {
  UserPersona = "UserPersona",
  SWOTAnalysis = "SWOTAnalysis",
  PESTELAnalysis = "PESTELAnalysis",
  LeanCanvas = "LeanCanvas",
  ValueProposition = "ValueProposition",
  Porters5Forces = "Porters5Forces",
}

export type BusinessTemplatesLoading = {
  [key in LoadingInterfaceKeys]: boolean;
};

export type BusinessTemplateTab = {
  name: string;
  logo: string;
  param: string;
  loadingInterface: LoadingInterfaceKeys;
  businessInterface: string;
};

export const tabs = [
  {
    name: "SWOT Analysis",
    logo: "../templates/swot.png",
    param: "swot=true",
    loadingInterface: LoadingInterfaceKeys.SWOTAnalysis,
    businessInterface: "swotAnalysis",
  },
  {
    name: "PESTEL Analysis",
    logo: "../templates/pestel.png",
    param: "pestel=true",
    loadingInterface: LoadingInterfaceKeys.PESTELAnalysis,
    businessInterface: "pestelAnalysis",
  },
  {
    name: "Lean Canvas",
    logo: "../templates/lean-canvas.png",
    param: "lean=true",
    loadingInterface: LoadingInterfaceKeys.LeanCanvas,
    businessInterface: "leanCanvas",
  },
  {
    name: "User Persona",
    logo: "../templates/user-persona.png",
    param: "persona=true",
    loadingInterface: LoadingInterfaceKeys.UserPersona,
    businessInterface: "userPersona",
  },
  {
    name: "Value Proposition",
    logo: "../templates/value-proposition.png",
    param: "value=true",
    loadingInterface: LoadingInterfaceKeys.ValueProposition,
    businessInterface: "valueProposition",
  },
  {
    name: "Porter's 5 Forces",
    logo: "../templates/porters-forces.png",
    param: "porters=true",
    loadingInterface: LoadingInterfaceKeys.Porters5Forces,
    businessInterface: "porters5Forces",
  },
];
interface BusinessContextData {
  selectedBusiness: BusinessI | null;
  setSelectedBusiness: React.Dispatch<React.SetStateAction<BusinessI | null>>;

  businesses: BusinessI[];
  fetchBusinesses: () => Promise<BusinessI[]>;
  fetchBusinessById: (id: string) => Promise<BusinessI>;
  createBusiness: (description: string) => Promise<BusinessI>;
  updateBusiness: (business: BusinessI) => Promise<BusinessI>;
  deleteBusiness: (business: BusinessI) => Promise<void>;

  // Creating Analyses
  createSWOTAnalysis: (business: BusinessI) => Promise<BusinessI>;
  createLeanCanvas: (business: BusinessI) => Promise<BusinessI>;
  createUserPersona: (business: BusinessI) => Promise<BusinessI>;
  createPESTELAnalysis: (business: BusinessI) => Promise<BusinessI>;
  createValueProposition: (business: BusinessI) => Promise<BusinessI>;
  createPorters5Forces: (business: BusinessI) => Promise<BusinessI>;

  loading: BusinessTemplatesLoading;
}

const BusinessContext = createContext<BusinessContextData | undefined>(
  undefined
);

function BusinessProvider({ children }: { children: React.ReactNode }) {
  const [businesses, setBusinesses] = useState<BusinessI[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessI | null>(
    null
  );
  const [loading, setLoading] = useState({
    SWOTAnalysis: false,
    PESTELAnalysis: false,
    LeanCanvas: false,
    UserPersona: false,
    ValueProposition: false,
    Porters5Forces: false,
  });

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = useCallback(async () => {
    try {
      const data = await api.business.getBusinesses();
      setBusinesses(data);
    } catch (error) {
      console.error("Failed to fetch businesses:", error);
    }

    return businesses;
  }, []);

  const fetchBusinessById = useCallback(async (id: string) => {
    try {
      const data = await api.business.getBusinessById(id);
      return data;
    } catch (error) {
      console.error("Failed to fetch business by ID:", error);
      throw error;
    }
  }, []);

  const createBusiness = useCallback(async (description: string) => {
    try {
      const data = await api.business.createBusiness(description);
      setBusinesses((prevBusinesses) => [...prevBusinesses, data]);

      setSelectedBusiness(data);

      return data;
    } catch (error) {
      console.error("Failed to create business:", error);
      throw error;
    }
  }, []);

  const updateBusiness = useCallback(async (business: BusinessI) => {
    try {
      console.log("Saving Business...");
      const data = await api.business.saveBusiness(business);
      setBusinesses((prevBusinesses) =>
        prevBusinesses.map((prevBusiness) =>
          prevBusiness._id === business._id ? business : prevBusiness
        )
      );

      //make sure ID is provided in business
      if (selectedBusiness?._id === business._id) {
        setSelectedBusiness(business);
      }

      return data;
    } catch (error) {
      console.error("Failed to update business:", error);
      throw error;
    }
  }, []);

  const deleteBusiness = useCallback(async (business: BusinessI) => {
    try {
      await api.business.deleteBusiness(business._id as string);
      setBusinesses((prevBusinesses) =>
        prevBusinesses.filter(
          (prevBusiness) => prevBusiness._id !== business._id
        )
      );

      if (selectedBusiness?._id === business._id) {
        setSelectedBusiness(null);
      }
    } catch (error) {
      console.error("Failed to delete business:", error);
      throw error;
    }
  }, []);

  const createSWOTAnalysis = async (business: BusinessI) => {
    try {
      setLoading((prevLoading) => ({
        ...prevLoading,
        SWOTAnalysis: true,
      }));
      const data = await api.business.generateSWOTAnalysis(business._id || "");
      console.log("SWOT Analysis created:", data.swotAnalysis);
      // if (selectedBusiness?._id === business._id) {
      setSelectedBusiness(data);

      //   console.log("Id is equal!");
      // } else {
      //   console.log("ID isn't equal :(", selectedBusiness?._id, business._id);
      // }
      setLoading((prevLoading) => ({
        ...prevLoading,
        SWOTAnalysis: false,
      }));

      return data;
    } catch (error) {
      console.error("Failed to create SWOT analysis:", error);
      setLoading((prevLoading) => ({
        ...prevLoading,
        SWOTAnalysis: false,
      }));
    }
  };

  const createLeanCanvas = useCallback(async (business: BusinessI) => {
    try {
      setLoading((prevLoading) => ({
        ...prevLoading,
        LeanCanvas: true,
      }));
      const data = await api.business.generateLeanCanvas(business._id || "");

      // if (selectedBusiness?._id === business._id) {
      setSelectedBusiness(data);
      setLoading((prevLoading) => ({
        ...prevLoading,
        LeanCanvas: false,
      }));
      // }

      return data;
    } catch (error) {
      console.error("Failed to create Lean Canvas:", error);
      setLoading((prevLoading) => ({
        ...prevLoading,
        LeanCanvas: false,
      }));
    }
  }, []);

  const createUserPersona = useCallback(async (business: BusinessI) => {
    try {
      setLoading((prevLoading) => ({
        ...prevLoading,
        UserPersona: true,
      }));
      const data = await api.business.generateUserPersona(business._id || "");

      // if (selectedBusiness?._id === business._id) {
      setSelectedBusiness(data);
      setLoading((prevLoading) => ({
        ...prevLoading,
        UserPersona: false,
      }));

      // }

      return data;
    } catch (error) {
      console.error("Failed to create user persona:", error);
      setLoading((prevLoading) => ({
        ...prevLoading,
        UserPersona: false,
      }));
    }
  }, []);

  const createPESTELAnalysis = useCallback(async (business: BusinessI) => {
    try {
      setLoading((prevLoading) => ({
        ...prevLoading,
        PESTELAnalysis: true,
      }));
      const data = await api.business.generatePESTELAnalysis(
        business._id || ""
      );

      // if (selectedBusiness?._id === business._id) {
      setSelectedBusiness(data);
      setLoading((prevLoading) => ({
        ...prevLoading,
        PESTELAnalysis: false,
      }));
      // }

      return data;
    } catch (error) {
      console.error("Failed to create PESTEL analysis:", error);
      setLoading((prevLoading) => ({
        ...prevLoading,
        PESTELAnalysis: false,
      }));
    }
  }, []);

  const createValueProposition = useCallback(async (business: BusinessI) => {
    try {
      setLoading((prevLoading) => ({
        ...prevLoading,
        ValueProposition: true,
      }));
      const data = await api.business.generateValueProposition(
        business._id || ""
      );

      setSelectedBusiness(data);
      setLoading((prevLoading) => ({
        ...prevLoading,
        ValueProposition: false,
      }));

      return data;
    } catch (error) {
      console.error("Failed to create Value Proposition:", error);
      setLoading((prevLoading) => ({
        ...prevLoading,
        ValueProposition: false,
      }));
    }
  }, []);

  const createPorters5Forces = useCallback(async (business: BusinessI) => {
    try {
      setLoading((prevLoading) => ({
        ...prevLoading,
        Porters5Forces: true,
      }));
      const data = await api.business.generatePorters5Forces(
        business._id || ""
      );

      setSelectedBusiness(data);
      setLoading((prevLoading) => ({
        ...prevLoading,
        Porters5Forces: false,
      }));

      return data;
    } catch (error) {
      console.error("Failed to create Value Proposition:", error);
      setLoading((prevLoading) => ({
        ...prevLoading,
        Porters5Forces: false,
      }));
    }
  }, []);
  const value: BusinessContextData = {
    selectedBusiness,
    setSelectedBusiness,

    businesses,
    fetchBusinesses,
    fetchBusinessById,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    createSWOTAnalysis,
    createLeanCanvas,
    createUserPersona,
    createPESTELAnalysis,
    createValueProposition,
    createPorters5Forces,
    loading,
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return context;
}

export default BusinessProvider;
