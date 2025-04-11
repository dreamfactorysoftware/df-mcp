# DreamFactory MCP

A Model Context Protocol (MCP) server for DreamFactory integration with Claude.

## Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   cd df-mcp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the project:
   ```
   npm run build
   ```

## Setting up Claude Desktop

1. Install Claude Desktop application if you haven't already.

2. Open Claude Desktop and navigate to Settings.

3. In the Settings menu, go to the "Developer" section.

4. Click on "Edit Config" to modify Claude's configuration.

5. Add the following configuration to enable the DreamFactory MCP server:
   ```json
   {
       "mcpServers": {
           "add": {
               "command": "node",
               "args": [
                   "/Users/dreamfactory/Documents/df-mcp/build/index.js"
               ],
               "env": {
                   "DREAMFACTORY_URL": "https://example.dreamfactory.com/api/v2/<service-name>",
                   "DREAMFACTORY_API_KEY": ""
               }
           }
       }
   }
   ```

6. **Important**: Modify the path in the `args` array to match your local installation path if different from `/Users/dreamfactory/Documents/df-mcp/`.

7. Add your DreamFactory URL and API key to the `DREAMFACTORY_URL` `DREAMFACTORY_API_KEY` environment variables as required.

8. Save the configuration and restart Claude Desktop.

## Usage

Once configured, the DreamFactory MCP server will be available to Claude Desktop. You can use DreamFactory's capabilities through Claude's interface.

## Development

- Source code is located in the `src` directory
- Built files are in the `build` directory
- Use `npm start` to run the built server directly