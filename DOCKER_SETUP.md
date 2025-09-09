# Docker MCP Setup for Claude Desktop

## Quick Start

### 1. Build the Docker Image
```bash
docker build -t dreamfactory-mcp:latest .
```

### 2. Configure Claude Desktop

Add this configuration to your Claude Desktop config file:

**Location:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Configuration:**
```json
{
  "mcpServers": {
    "dreamfactory-mcp": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "--env", "DREAMFACTORY_URL=https://your-dreamfactory-instance.com",
        "--env", "DREAMFACTORY_API_KEY=your-api-key-here",
        "dreamfactory-mcp:latest"
      ]
    }
  }
}
```

### 3. Restart Claude Desktop
After updating the configuration, restart Claude Desktop to load the MCP server.

## How It Works

- Claude Desktop spawns the Docker container as a subprocess
- The `--rm` flag ensures the container is removed after use
- The `-i` flag enables interactive mode for stdio communication
- Environment variables are passed via `--env` flags
- The MCP server communicates with Claude via standard input/output

## Alternative: Using Docker Compose

Create a `docker-compose.yml`:
```yaml
services:
  dreamfactory-mcp:
    image: dreamfactory-mcp:latest
    environment:
      - DREAMFACTORY_URL=${DREAMFACTORY_URL}
      - DREAMFACTORY_API_KEY=${DREAMFACTORY_API_KEY}
    stdin_open: true
    tty: false
```

Then in Claude Desktop config:
```json
{
  "mcpServers": {
    "dreamfactory-mcp": {
      "command": "docker",
      "args": ["compose", "run", "--rm", "dreamfactory-mcp"]
    }
  }
}
```

## Troubleshooting

1. **Container doesn't start**: Check Docker is running and the image exists
2. **No MCP tools appear**: Verify environment variables are set correctly
3. **Connection errors**: Ensure DreamFactory URL is accessible from the container

## Testing the Container Manually

```bash
# Test the container runs correctly
docker run --rm -i \
  --env DREAMFACTORY_URL=https://your-instance.com \
  --env DREAMFACTORY_API_KEY=your-key \
  dreamfactory-mcp:latest
```

The container should start and wait for MCP protocol messages on stdin.