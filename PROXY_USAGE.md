# DreamFactory MCP Proxy Usage

This guide explains how to use the proxied version of the DreamFactory MCP server with `mcp-proxy`.

## Available Scripts

After installing dependencies with `npm install` and building with `npm run build`, you can use these scripts:

### 1. Standard MCP (stdio)
```bash
npm start
# or
npm run start
```
Runs the traditional stdio-based MCP server.

### 2. HTTP/SSE Proxy (Both endpoints)
```bash
npm run proxy
```
Starts the MCP server proxied through mcp-proxy on port 8080 with both HTTP and SSE endpoints:
- **HTTP endpoint**: `http://localhost:8080/mcp`
- **SSE endpoint**: `http://localhost:8080/sse`

### 3. Debug Mode
```bash
npm run proxy:debug
```
Same as above but with debug logging enabled.

### 4. SSE Only
```bash
npm run proxy:sse
```
Starts the proxy with only Server-Sent Events (SSE) endpoint on `http://localhost:8080/sse`

### 5. HTTP Stream Only
```bash
npm run proxy:stream
```
Starts the proxy with only HTTP streaming endpoint on `http://localhost:8080/mcp`

## Environment Variables

Make sure to set these environment variables before running:

```bash
export DREAMFACTORY_API_KEY="your-api-key"
export DREAMFACTORY_URL="https://your-dreamfactory-instance.com/api/v2"
```

## Usage Examples

### 1. Start the proxy server
```bash
# Set your environment variables
export DREAMFACTORY_API_KEY="your-api-key"
export DREAMFACTORY_URL="https://your-dreamfactory-instance.com/api/v2"

# Start the proxy
npm run proxy
```

### 2. Test the endpoints

Once running, you can test the endpoints:

**HTTP endpoint** (for MCP clients that support HTTP):
```bash
curl -X POST http://localhost:8080/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}'
```

**SSE endpoint** (for Server-Sent Events):
```bash
curl http://localhost:8080/sse
```

## Available Tools

The DreamFactory MCP server provides these tools:

- `get-tables` - Get all available database tables
- `get-table-schema` - Get schema for a specific table
- `get-table-data` - Retrieve data from a specific table
- `get-stored-procedures` - Get available stored procedures
- `call-stored-procedure` - Execute a stored procedure
- `get-stored-functions` - Get available stored functions
- `call-stored-function` - Execute a stored function
- `list-tools` - List all available tools

## CORS

CORS is enabled by default in mcp-proxy, so you can make requests from web applications.

## Custom Configuration

For custom ports or endpoints, you can run mcp-proxy directly:

```bash
# Custom port
npx mcp-proxy --port 3000 -- node build/index.js

# Custom SSE endpoint path
npx mcp-proxy --port 8080 --sseEndpoint /events -- node build/index.js

# Custom HTTP endpoint path
npx mcp-proxy --port 8080 --streamEndpoint /api -- node build/index.js
``` 