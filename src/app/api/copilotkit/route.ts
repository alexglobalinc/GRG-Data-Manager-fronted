import {
    CopilotRuntime,
    OpenAIAdapter,
    copilotRuntimeNextJSAppRouterEndpoint,
  } from '@copilotkit/runtime';
  import OpenAI from 'openai';
  import { NextRequest, NextResponse } from 'next/server';
   
  // Check if API key is available
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set in environment variables");
  }
   
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const serviceAdapter = new OpenAIAdapter({ openai });
  const runtime = new CopilotRuntime({
    remoteActions: [
        {
          url: "http://127.0.0.1:8001/copilotkit_remote",
        },
      ],
  });
   
  export const POST = async (req: NextRequest) => {
    try {
      const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
        runtime,
        serviceAdapter,
        endpoint: '/api/copilotkit',
      });
   
      return handleRequest(req);
    } catch (error) {
      console.error("Error in CopilotKit API route:", error);
      return NextResponse.json(
        { error: "Failed to process request" },
        { status: 500 }
      );
    }
  };