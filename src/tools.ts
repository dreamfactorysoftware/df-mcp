import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { DreamFactoryService } from "./services/dreamfactory.js";

/**
 * Register all DreamFactory tools with the MCP server
 */
export function registerDreamFactoryTools(server: McpServer) {
  // Tool to get all tables
  server.tool(
    "get-tables",
    "Get tables available in the database",
    {},
    async ({}) => {
      try {
        const data = await DreamFactoryService.getTables();
        
        return {
          content: [
            {
              type: "text",
              text: "Tables available in the database: ",
            },
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            }
          ],
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        return {
          content: [
            {
              type: "text",
              text: "Failed to fetch data from the API.",
            },
          ],
        };
      }
    },
  );

  // Tool to get table schema
  server.tool(
    "get-table-schema",
    "Retrieve the schema of a specific table",
    {
      tableName: z.string(),
    },
    async ({ tableName }) => {
      try {
        const data = await DreamFactoryService.getTableSchema(tableName);
        
        return {
          content: [
            {
              type: "text",
              text: `Schema for table ${tableName}: `,
            },
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            }
          ],
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        return {
          content: [
            {
              type: "text",
              text: "Failed to fetch data from the API.",
            },
          ],
        };
      }
    }
  );

  // Tool to get table data
  server.tool(
    "get-table-data",
    "Retrieve the data of a specific table",
    {
      tableName: z.string(),
      fields: z.array(z.string()).optional(),
      filter: z.string().optional().describe("SQL-like filter to limit the records to retrieve."),
      offset: z.number().optional().default(0).describe("Offset for pagination."),
      limit: z.number().optional().default(10).describe("Limit for pagination."),
      order: z.string().optional().describe("SQL-like order containing field and direction for filter results."),
      group: z.string().optional().describe("Comma-delimited list of the fields used for grouping of filter results."),
      continue: z.boolean().optional().default(false).describe("In batch scenarios where supported, continue processing even after one action fails. Default behavior is to halt and return results up to the first point of failure."),
      related: z.string().optional().describe("Comma-delimited list of related names to retrieve for each resource. (it will be found in the related field of the schema)"),
    },
    async ({ tableName, fields, filter, offset, limit, order, group, continue: continueProcessing, related }) => {
      try {
        const data = await DreamFactoryService.getTableData(
          tableName,
          fields,
          filter,
          offset,
          limit,
          order,
          group,
          continueProcessing,
          related
        );
        
        return {
          content: [
            {
              type: "text",
              text: `Data for table ${tableName}: `,
            },
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            }
          ],
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        return {
          content: [
            {
              type: "text",
              text: "Failed to fetch data from the API.",
            },
          ],
        };
      }
    }
  );

  // Register a tool to list available tools
  server.tool("list-tools", "List available tools", {}, async () => {
    return {
      content: [
        {
          type: "text",
          text: `Available tools:
          get-tables,
          get-table-schema,
          get-table-data,
          get-stored-procedures,
          call-stored-procedure,
          get-stored-functions,
          call-stored-function`,
        },
      ],
    };
  });

  // Tool to get stored procedures
  server.tool(
    "get-stored-procedures",
    "Get stored procedures available in the database",
    {},
    async ({}) => {
      try {
        const data = await DreamFactoryService.getStoredProcedures();
        return {
          content: [
            {
              type: "text",
              text: "Stored procedures available in the database: ",
            },
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            }
          ],
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        return {
          content: [
            {
              type: "text",
              text: "Failed to fetch data from the API.",
            },
          ],
        };
      }
    }
  );

  // Tool to call a stored procedure
  server.tool(
    "call-stored-procedure",
    "Call a stored procedure",
    {
      procedureName: z.string(),
    },
    async ({ procedureName }) => {
      try {
        const data = await DreamFactoryService.callStoredProcedure(procedureName);
        return {
          content: [
            {
              type: "text",
              text: `Stored procedure ${procedureName} called successfully: `,
            },
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            }
          ],
        };
      } catch (error) {
        console.error("Error calling stored procedure:", error);
        return {
          content: [
            {
              type: "text",
              text: "Failed to call the stored procedure.",
            },
          ],
        };
      }
    }
  );

  // Tool to get stored functions
  server.tool(
    "get-stored-functions",
    "Get stored functions available in the database",
    {},
    async ({}) => {
      try {
        const data = await DreamFactoryService.getStoredFunctions();
        return {
          content: [
            {
              type: "text",
              text: "Stored functions available in the database: ",
            },
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            }
          ],
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        return {
          content: [
            {
              type: "text",
              text: "Failed to fetch data from the API.",
            },
          ],
        };
      }
    }
  );
  // Tool to call a stored function
  server.tool(
    "call-stored-function",
    "Call a stored function",
    {
      functionName: z.string(),
    },
    async ({ functionName }) => {
      try {
        const data = await DreamFactoryService.callStoredFunction(functionName);
        return {
          content: [
            {
              type: "text",
              text: `Stored function ${functionName} called successfully: `,
            },
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            }
          ],
        };
      } catch (error) {
        console.error("Error calling stored function:", error);
        return {
          content: [
            {
              type: "text",
              text: "Failed to call the stored function.",
            },
          ],
        };
      }
    }
  );

  // Additional tools can be added here
  
  // Commented-out tool for creating table schema
  // Left as reference for future implementation
  /*
  server.tool(
    "create-table-schema",
    "Create a new table in the database",
    {
      tableName: z.string(),
      label: z.string().optional(),
      plural: z.string().optional(),
      field: z.array(
        z.object({
          name: z.string(),
          type: z.enum(["string", "integer", "float", "boolean"]),
          length: z.number().optional(),
          label: z.string().optional(),
        })
      ),
    },
    async ({ tableName, label, plural, field }) => {
      // Implementation would go here
    }
  );
  */
}