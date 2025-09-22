---
sidebar_position: 2
---

# API Documentation

## VEX REST API v1.0

The VEX API enables developers to integrate our trust and feedback system into their applications.

## Base URL

```
https://api.vex.network/v1
```

## Authentication

All API requests require authentication using an API key:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.vex.network/v1/business/profile
```

## Endpoints

### Business Management

#### Get Business Profile
```http
GET /business/profile
```

**Response:**
```json
{
  "id": "business_123",
  "name": "TechFlow Solutions",
  "trustScore": 98,
  "reviewCount": 1245,
  "verificationStatus": "verified",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

#### Update Business Information
```http
PUT /business/profile
```

**Request Body:**
```json
{
  "description": "Updated business description",
  "website": "https://example.com",
  "categories": ["technology", "software"]
}
```

### Feedback Management

#### Submit Feedback
```http
POST /feedback/submit
```

**Request Body:**
```json
{
  "businessId": "business_123",
  "rating": 5,
  "comment": "Excellent service!",
  "transactionId": "txn_456",
  "verified": true
}
```

**Response:**
```json
{
  "feedbackId": "feedback_789",
  "status": "pending_verification",
  "rewardAmount": 25,
  "timestamp": "2024-03-15T14:30:00Z"
}
```

#### Get Feedback List
```http
GET /feedback/list?businessId={businessId}&limit={limit}&offset={offset}
```

**Response:**
```json
{
  "feedback": [
    {
      "id": "feedback_789",
      "userId": "user_456",
      "rating": 5,
      "comment": "Great experience!",
      "verified": true,
      "timestamp": "2024-03-15T14:30:00Z"
    }
  ],
  "total": 1245,
  "hasMore": true
}
```

### Analytics

#### Get Analytics Dashboard
```http
GET /analytics/dashboard
```

**Response:**
```json
{
  "period": "last_30_days",
  "metrics": {
    "averageRating": 4.8,
    "totalReviews": 324,
    "responseRate": 0.92,
    "satisfactionScore": 96
  },
  "trends": {
    "rating": "improving",
    "volume": "stable",
    "sentiment": "positive"
  }
}
```

#### Export Reports
```http
POST /analytics/export
```

**Request Body:**
```json
{
  "format": "csv",
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-03-31"
  },
  "metrics": ["reviews", "ratings", "response_times"]
}
```

### User Management

#### Get User Reputation
```http
GET /users/{userId}/reputation
```

**Response:**
```json
{
  "userId": "user_456",
  "reputationScore": 850,
  "level": "expert",
  "reviewCount": 234,
  "helpfulVotes": 1890,
  "badges": ["trusted_reviewer", "early_adopter"]
}
```

### Token Operations

#### Get Token Balance
```http
GET /tokens/balance
```

**Response:**
```json
{
  "balance": "5000.00",
  "locked": "1000.00",
  "available": "4000.00",
  "pendingRewards": "250.00"
}
```

#### Claim Rewards
```http
POST /tokens/claim
```

**Response:**
```json
{
  "transactionId": "tx_abc123",
  "amount": "250.00",
  "status": "processing",
  "estimatedTime": "2-5 minutes"
}
```

## Webhooks

Configure webhooks to receive real-time updates:

### Available Events
- `feedback.submitted`
- `feedback.verified`
- `feedback.responded`
- `business.verified`
- `token.rewarded`

### Webhook Payload
```json
{
  "event": "feedback.submitted",
  "timestamp": "2024-03-15T14:30:00Z",
  "data": {
    "feedbackId": "feedback_789",
    "businessId": "business_123",
    "rating": 5
  }
}
```

## Rate Limits

| Plan | Requests/Hour | Burst Limit |
|------|--------------|-------------|
| Free | 100 | 10/second |
| Standard | 1,000 | 50/second |
| Enterprise | 10,000 | 200/second |

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid",
    "details": {
      "field": "authorization",
      "hint": "Check your API key in the dashboard"
    }
  }
}
```

### Common Error Codes
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Rate Limited
- `500` - Internal Server Error

## SDKs

Official SDKs available for:
- [JavaScript/TypeScript](/docs/technical/sdk#javascript)
- [Python](/docs/technical/sdk#python)
- [Go](/docs/technical/sdk#go)
- [Ruby](/docs/technical/sdk#ruby)

## Testing

Use our sandbox environment for testing:
```
https://sandbox.api.vex.network/v1
```

Test API Key: `test_key_abc123xyz`

## Support

- [API Status](https://status.vex.network)
- [Developer Forum](https://forum.vex.network)
- [Support Email](mailto:api-support@vex.network)