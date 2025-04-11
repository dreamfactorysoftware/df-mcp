import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerDreamFactoryTools } from "./tools.js";

// Create server instance
const server = new McpServer({
  name: "dreamfactory",
  version: "1.0.0",
});
// Register tool to get all tables
registerDreamFactoryTools(server);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
