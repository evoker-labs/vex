---
sidebar_position: 3
---

# SDK Reference

## Official VEX SDKs

Integrate VEX into your application with our official SDKs.

## JavaScript/TypeScript

### Installation
```bash
npm install @vex-network/sdk
# or
yarn add @vex-network/sdk
```

### Quick Start
```typescript
import { VexClient } from '@vex-network/sdk';

const client = new VexClient({
  apiKey: 'your_api_key',
  environment: 'production' // or 'sandbox'
});

// Get business profile
const profile = await client.business.getProfile();

// Submit feedback
const feedback = await client.feedback.submit({
  businessId: 'business_123',
  rating: 5,
  comment: 'Excellent service!',
  verified: true
});

// Get analytics
const analytics = await client.analytics.getDashboard({
  period: 'last_30_days'
});
```

### Advanced Features
```typescript
// Initialize with custom config
const client = new VexClient({
  apiKey: 'your_api_key',
  baseUrl: 'https://custom.api.vex.network',
  timeout: 30000,
  retryAttempts: 3,
  webhookSecret: 'your_webhook_secret'
});

// Handle webhooks
client.webhooks.on('feedback.submitted', (event) => {
  console.log('New feedback:', event.data);
});

// Batch operations
const results = await client.batch([
  client.feedback.get('feedback_1'),
  client.feedback.get('feedback_2'),
  client.feedback.get('feedback_3')
]);
```

## Python

### Installation
```bash
pip install vex-sdk
```

### Quick Start
```python
from vex_sdk import VexClient

client = VexClient(
    api_key='your_api_key',
    environment='production'
)

# Get business profile
profile = client.business.get_profile()

# Submit feedback
feedback = client.feedback.submit(
    business_id='business_123',
    rating=5,
    comment='Excellent service!',
    verified=True
)

# Get analytics
analytics = client.analytics.get_dashboard(
    period='last_30_days'
)
```

### Async Support
```python
import asyncio
from vex_sdk import AsyncVexClient

async def main():
    async with AsyncVexClient(api_key='your_api_key') as client:
        profile = await client.business.get_profile()
        print(profile)

asyncio.run(main())
```

## Go

### Installation
```bash
go get github.com/vex-network/vex-go
```

### Quick Start
```go
package main

import (
    "fmt"
    "github.com/vex-network/vex-go"
)

func main() {
    client := vex.NewClient("your_api_key")
    
    // Get business profile
    profile, err := client.Business.GetProfile()
    if err != nil {
        panic(err)
    }
    fmt.Println(profile)
    
    // Submit feedback
    feedback, err := client.Feedback.Submit(&vex.FeedbackRequest{
        BusinessID: "business_123",
        Rating:     5,
        Comment:    "Excellent service!",
        Verified:   true,
    })
    if err != nil {
        panic(err)
    }
    fmt.Println(feedback)
}
```

## Ruby

### Installation
```ruby
gem install vex-sdk
```

### Quick Start
```ruby
require 'vex'

client = Vex::Client.new(api_key: 'your_api_key')

# Get business profile
profile = client.business.profile

# Submit feedback
feedback = client.feedback.submit(
  business_id: 'business_123',
  rating: 5,
  comment: 'Excellent service!',
  verified: true
)

# Get analytics
analytics = client.analytics.dashboard(period: 'last_30_days')
```

## PHP

### Installation
```bash
composer require vex-network/vex-php
```

### Quick Start
```php
<?php
use Vex\Client;

$client = new Client('your_api_key');

// Get business profile
$profile = $client->business()->getProfile();

// Submit feedback
$feedback = $client->feedback()->submit([
    'businessId' => 'business_123',
    'rating' => 5,
    'comment' => 'Excellent service!',
    'verified' => true
]);

// Get analytics
$analytics = $client->analytics()->getDashboard([
    'period' => 'last_30_days'
]);
```

## Common Patterns

### Error Handling
All SDKs provide consistent error handling:

```javascript
// JavaScript
try {
  const result = await client.feedback.submit(data);
} catch (error) {
  if (error.code === 'RATE_LIMITED') {
    // Handle rate limiting
  } else if (error.code === 'INVALID_REQUEST') {
    // Handle validation errors
  }
}
```

```python
# Python
from vex_sdk.exceptions import RateLimitError, ValidationError

try:
    result = client.feedback.submit(data)
except RateLimitError as e:
    # Handle rate limiting
    pass
except ValidationError as e:
    # Handle validation errors
    pass
```

### Pagination
All SDKs support pagination for list endpoints:

```javascript
// JavaScript
const paginator = client.feedback.list({
  businessId: 'business_123',
  limit: 20
});

for await (const page of paginator) {
  console.log(page.items);
}
```

```python
# Python
for page in client.feedback.list(business_id='business_123', limit=20):
    for item in page.items:
        print(item)
```

### Webhook Verification
All SDKs include webhook signature verification:

```javascript
// JavaScript
const isValid = client.webhooks.verify(
  signature,
  payload,
  secret
);
```

```python
# Python
is_valid = client.webhooks.verify(
    signature=signature,
    payload=payload,
    secret=secret
)
```

## Configuration Options

### Common Configuration
All SDKs support these configuration options:

| Option | Description | Default |
|--------|-------------|---------|
| `apiKey` | Your VEX API key | Required |
| `environment` | 'production' or 'sandbox' | 'production' |
| `timeout` | Request timeout in ms | 30000 |
| `retryAttempts` | Number of retry attempts | 3 |
| `retryDelay` | Delay between retries | 1000ms |
| `maxConcurrent` | Max concurrent requests | 10 |

## Testing

### Mock Mode
All SDKs support a mock mode for testing:

```javascript
// JavaScript
const client = new VexClient({
  apiKey: 'test_key',
  mock: true
});
```

### Test Helpers
```javascript
// JavaScript
import { createMockFeedback, createMockBusiness } from '@vex-network/sdk/test';

const mockFeedback = createMockFeedback({
  rating: 5,
  comment: 'Test feedback'
});
```

## Migration Guides

- [Migrating from v1 to v2](#)
- [Migrating from REST API to SDK](#)

## Support

- [GitHub Issues](https://github.com/vex-network/sdks)
- [SDK Changelog](#)
- [Developer Discord](https://discord.gg/vex-dev)