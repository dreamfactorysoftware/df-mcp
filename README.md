# DreamFactory MCP

A Model Context Protocol (MCP) server for DreamFactory integration with Claude.

## Installation

1. Clone this repository and then install dependencies:
   ```
   cd df-mcp
   npm install
   ```

3. Build the project:
   ```
   npm run build
   ```

## Setting up Claude Desktop

1. Install Claude Desktop from [https://claude.ai/download](https://claude.ai/download).

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

## Note About Claude Desktop, NodeJS and NVM

DreamFactory MCP requires Node 22.10.0 or newer. Even if you are running Node 22.10 or newer, you may encounter a confusing issue if you're running NVM (Node Version Manager) which hampers installation. Sometimes these issues are further complicated if you're additionally using other developer tools such as Laravel Herd which make additional changes to Node paths.

If the MCP server log indicates the wrong version of Node is being used by Claude Desktop, you can easily force it to use the desired version by creating a shell script that looks something like this:

```
#!/bin/zsh
source ~/.zshrc
exec /Applications/Herd/config/nvm/versions/node/v22.17.1/bin/node
```

Call the script `node-for-claude.sh` or similar, and place it in `/usr/local/bin`. Then make it executable:

```
$ chmod +x node-for-claude.sh
```

Finally, update the `claude_desktop_config.json` file to point to this script:

```
{
  "mcpServers": {
        "add": {
            "command": "/usr/local/bin/node-for-claude.sh",
            "args": [
                "/Users/wjgilmore/Software/df-mcp/build/index.js"
            ],
            "env": {
               "DREAMFACTORY_URL": "<URL>",
                "DREAMFACTORY_API_KEY": "<API_KEY>"
            }
        }
  }
}
```

## Usage

Once configured, the DreamFactory MCP server will be available to Claude Desktop. You can use DreamFactory's capabilities through Claude's interface.

## Development

- Source code is located in the `src` directory
- Built files are in the `build` directory
- Use `npm start` to run the built server directly
