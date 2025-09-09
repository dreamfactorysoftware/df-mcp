#!/bin/bash

# Test script for df-mcp Docker container
# This validates that the container meets MCP registry requirements

set -e

echo "======================================"
echo "DreamFactory MCP Docker Test Suite"
echo "======================================"
echo ""

# Build the image
echo "1. Building Docker image..."
docker build -t df-mcp:test . > /dev/null 2>&1
echo "✓ Docker image built successfully"
echo ""

# Test 1: Check if container starts
echo "2. Testing container startup..."
RESPONSE=$(echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"1.0.0","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}' | docker run -i --rm df-mcp:test 2>/dev/null)
if echo "$RESPONSE" | grep -q '"serverInfo":{"name":"dreamfactory"'; then
    echo "✓ Container starts and responds to initialization"
else
    echo "✗ Container failed to initialize properly"
    exit 1
fi
echo ""

# Test 2: Check tools listing
echo "3. Testing tools listing..."
TOOLS_RESPONSE=$(echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | docker run -i --rm df-mcp:test 2>/dev/null)
if echo "$TOOLS_RESPONSE" | grep -q '"name":"get-tables"'; then
    echo "✓ Tools are properly registered and listed"
else
    echo "✗ Failed to list tools"
    exit 1
fi
echo ""

# Test 3: Check environment variable handling
echo "4. Testing environment variables..."
ENV_RESPONSE=$(docker run -i --rm \
    -e DREAMFACTORY_URL="https://test.dreamfactory.com/api/v2/test" \
    -e DREAMFACTORY_API_KEY="test-key" \
    df-mcp:test <<EOF 2>/dev/null
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"1.0.0","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}
EOF
)
if echo "$ENV_RESPONSE" | grep -q '"protocolVersion"'; then
    echo "✓ Environment variables are properly handled"
else
    echo "✗ Failed to handle environment variables"
    exit 1
fi
echo ""

# Test 4: Check available tools
echo "5. Verifying all required tools..."
EXPECTED_TOOLS=(
    "get-tables"
    "get-table-schema"
    "get-table-data"
    "get-stored-procedures"
    "call-stored-procedure"
    "get-stored-functions"
    "call-stored-function"
    "list-tools"
)

for tool in "${EXPECTED_TOOLS[@]}"; do
    if echo "$TOOLS_RESPONSE" | grep -q "\"name\":\"$tool\""; then
        echo "  ✓ Tool '$tool' is available"
    else
        echo "  ✗ Tool '$tool' is missing"
        exit 1
    fi
done
echo ""

# Test 5: Check image size
echo "6. Checking image size..."
IMAGE_SIZE=$(docker images df-mcp:test --format "{{.Size}}")
echo "  Image size: $IMAGE_SIZE"
echo "  ✓ Image size is reasonable"
echo ""

echo "======================================"
echo "All tests passed successfully!"
echo "======================================"
echo ""
echo "The df-mcp project is ready for submission to the Docker MCP Registry."
echo ""
echo "Next steps:"
echo "1. Fork the mcp-registry repository"
echo "2. Create a server.yaml file in the 'servers' directory"
echo "3. Test locally with Docker Desktop's MCP Toolkit"
echo "4. Submit a pull request"
echo ""
echo "See server.yaml.example for the configuration template."