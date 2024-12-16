'use client'
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useCoAgentStateRender } from "@copilotkit/react-core";


import PropertyListing from "../components/PropertyListing"

// Define the type for your agent's state
type AgentState = {
  messages: any[];
  status?: "inProgress" | "complete";
  currentNode?: string;
  // Add other state properties based on your DatabaseAnalysisGraph state
};

export default function Home() {
  // Add state rendering
  useCoAgentStateRender<AgentState>({
    name: "Property_analysis_agent", // This matches the name in your server.py
    render: ({ status, state, nodeName }) => {
      if (!state) return null;

      return (
        <div className="absolute bottom-16 left-0 right-0 p-2 bg-blue-50 border-t border-blue-100">
          {status === "inProgress" && (
            <div className="flex flex-col gap-1 text-xs text-blue-600">
              <div className="flex items-center gap-2">
                {/* Loading spinner animation inline */}
                <div className="animate-spin h-3 w-3 border-2 border-blue-500 rounded-full border-t-transparent"/>
                Processing query in {nodeName}...
              </div>
            </div>
          )}
        </div>
      );
    },
  });
  return (
    <>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Property Listing</h1>
        <PropertyListing />
      </main>


      <CopilotPopup 
      className="fixed bottom-4 right-4 z-50"
      instructions={"You are a helpful database assistant that helps marketing team members query a database using natural language."}
      labels={{
        title: "Global Roofing Group",
        initial: "How can I help you analyze property data?",
      }}
      defaultOpen={true}
      />
    </>
  );
}