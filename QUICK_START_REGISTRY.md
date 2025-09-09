# Quick Start: Docker MCP Registry Submission

## ⚠️ Critical Requirement
**Your Docker image MUST be publicly available before submitting to the registry!**

## Step-by-Step Guide

### 1. Test Locally First
```bash
# Run the validation script
./test-docker.sh
```
✅ All tests should pass

### 2. Push to GitHub
```bash
git add .
git commit -m "Add Docker support for MCP Registry"
git push origin main
```

### 3. Publish Docker Image (Choose One)

#### Option A: Use GitHub Actions (Easiest)
```bash
# Create a release tag
git tag v1.0.0
git push origin v1.0.0
```
Wait for GitHub Actions to build and publish to `ghcr.io/YOUR_USERNAME/df-mcp:latest`

#### Option B: Manual Push
```bash
# Build
docker build -t ghcr.io/YOUR_USERNAME/df-mcp:latest .

# Login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin

# Push
docker push ghcr.io/YOUR_USERNAME/df-mcp:latest
```

### 4. Make Image Public
Go to: `https://github.com/users/YOUR_USERNAME/packages/container/df-mcp/settings`
- Change visibility to **Public**

### 5. Update Configuration
Edit `server.yaml.example` and replace:
- `dreamfactorysoftware` → `YOUR_USERNAME`
- Repository URL → Your GitHub repo URL

### 6. Submit to Registry
```bash
# Fork and clone the registry
git clone https://github.com/wjgilmore/mcp-registry.git
cd mcp-registry

# Add your server config
cp /path/to/df-mcp/server.yaml.example servers/df-mcp.yaml
# Edit servers/df-mcp.yaml with your values

# Test
task build df-mcp
task catalog

# Submit
git add servers/df-mcp.yaml
git commit -m "Add DreamFactory MCP Server"
git push origin main
```

Create PR on GitHub with description of your MCP server.

## Common Mistakes to Avoid

❌ **Don't** submit without publishing the Docker image first  
❌ **Don't** forget to make the image public  
❌ **Don't** use placeholder values in server.yaml  
❌ **Don't** skip local testing with `task build` and `task catalog`

## Files You Modified/Created
- ✅ `Dockerfile` - Multi-stage build
- ✅ `.dockerignore` - Build optimization  
- ✅ `test-docker.sh` - Validation script
- ✅ `server.yaml.example` - Registry config template
- ✅ `.github/workflows/docker-publish.yml` - Auto-publish workflow
- ✅ Documentation updates

## Need Help?
- Full details: See `DOCKER_REGISTRY_READY.md`
- Test script: Run `./test-docker.sh`
- Registry docs: https://github.com/wjgilmore/mcp-registry/blob/main/CONTRIBUTING.md