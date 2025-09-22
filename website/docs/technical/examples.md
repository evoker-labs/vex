---
sidebar_position: 5
---

# Integration Examples

## Complete Integration Examples

Learn how to integrate VEX into your application with these real-world examples.

## E-commerce Integration

### Shopping Cart with Feedback Widget

```html
<!DOCTYPE html>
<html>
<head>
  <title>MyStore - Checkout</title>
  <script src="https://api.vex.network/widget.js"></script>
</head>
<body>
  <div id="checkout-container">
    <!-- Your checkout form -->
  </div>
  
  <!-- VEX Trust Badge -->
  <div id="vex-trust-badge"></div>
  
  <!-- VEX Feedback Widget -->
  <div id="vex-feedback-widget"></div>
  
  <script>
    // Initialize VEX
    VexWidget.init({
      businessId: 'your-business-id',
      apiKey: 'your-api-key'
    });
    
    // Display trust badge
    VexWidget.displayTrustBadge('vex-trust-badge');
    
    // Setup feedback collection after purchase
    document.getElementById('purchase-complete').addEventListener('click', () => {
      VexWidget.collectFeedback({
        transactionId: getCurrentTransactionId(),
        customerEmail: getCustomerEmail(),
        purchaseAmount: getCartTotal()
      });
    });
  </script>
</body>
</html>
```

### Node.js Backend Integration

```javascript
const express = require('express');
const { VexClient } = require('@vex-network/sdk');

const app = express();
const vex = new VexClient({
  apiKey: process.env.VEX_API_KEY
});

// Middleware to verify VEX trust score
const requireTrustScore = (minScore) => {
  return async (req, res, next) => {
    try {
      const business = await vex.business.getProfile(req.body.businessId);
      if (business.trustScore >= minScore) {
        next();
      } else {
        res.status(403).json({ 
          error: 'Insufficient trust score' 
        });
      }
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to verify trust score' 
      });
    }
  };
};

// Order completion with automatic feedback request
app.post('/api/orders/complete', async (req, res) => {
  const { orderId, customerId, amount } = req.body;
  
  // Complete order in your system
  await completeOrder(orderId);
  
  // Register transaction with VEX for feedback
  try {
    const feedbackRequest = await vex.feedback.requestFeedback({
      customerId,
      transactionId: orderId,
      amount,
      productIds: getOrderProducts(orderId)
    });
    
    // Send feedback request email
    await sendFeedbackEmail(customerId, feedbackRequest.url);
    
    res.json({ 
      success: true, 
      feedbackUrl: feedbackRequest.url 
    });
  } catch (error) {
    console.error('VEX feedback request failed:', error);
    // Continue even if VEX fails
    res.json({ success: true });
  }
});

// Webhook handler for feedback events
app.post('/webhooks/vex', async (req, res) => {
  const signature = req.headers['x-vex-signature'];
  
  if (!vex.webhooks.verify(signature, req.body)) {
    return res.status(401).send('Invalid signature');
  }
  
  const { event, data } = req.body;
  
  switch (event) {
    case 'feedback.submitted':
      await handleNewFeedback(data);
      break;
    case 'feedback.verified':
      await updateCustomerStatus(data.customerId);
      break;
    case 'business.trust_score_updated':
      await updateBusinessBadges(data);
      break;
  }
  
  res.status(200).send('OK');
});

app.listen(3000);
```

## DeFi Platform Integration

### Smart Contract Integration

```solidity
pragma solidity ^0.8.0;

import "@vex-network/contracts/IVexOracle.sol";

contract DeFiLending {
    IVexOracle public vexOracle;
    
    constructor(address _vexOracle) {
        vexOracle = IVexOracle(_vexOracle);
    }
    
    // Use VEX trust score for loan approval
    function requestLoan(
        address borrower,
        uint256 amount
    ) external returns (bool) {
        // Get borrower's VEX reputation
        uint256 trustScore = vexOracle.getTrustScore(borrower);
        
        // Higher trust score = better loan terms
        uint256 maxLoan = calculateMaxLoan(trustScore);
        uint256 interestRate = calculateInterestRate(trustScore);
        
        require(amount <= maxLoan, "Amount exceeds trust limit");
        
        // Process loan with VEX-adjusted terms
        return processLoan(borrower, amount, interestRate);
    }
    
    function calculateMaxLoan(uint256 trustScore) 
        private 
        pure 
        returns (uint256) 
    {
        // 0-50: $1,000 max
        // 51-75: $5,000 max
        // 76-90: $10,000 max
        // 91-100: $50,000 max
        if (trustScore <= 50) return 1000 * 10**18;
        if (trustScore <= 75) return 5000 * 10**18;
        if (trustScore <= 90) return 10000 * 10**18;
        return 50000 * 10**18;
    }
}
```

### Web3 Frontend Integration

```javascript
import { ethers } from 'ethers';
import { VexWeb3 } from '@vex-network/web3';

class DeFiApp {
  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.vex = new VexWeb3({
      provider: this.provider,
      contractAddress: '0x...' // VEX contract address
    });
  }
  
  async connectWallet() {
    await this.provider.send("eth_requestAccounts", []);
    const signer = this.provider.getSigner();
    const address = await signer.getAddress();
    
    // Get VEX reputation for connected wallet
    const reputation = await this.vex.getReputation(address);
    this.displayReputation(reputation);
    
    // Subscribe to reputation updates
    this.vex.on('reputationUpdated', (newRep) => {
      this.displayReputation(newRep);
    });
  }
  
  async submitDeFiFeedback(protocolAddress, rating, comment) {
    const signer = this.provider.getSigner();
    
    // Sign feedback with wallet
    const signature = await signer.signMessage(
      JSON.stringify({ protocolAddress, rating, comment })
    );
    
    // Submit to VEX
    const tx = await this.vex.submitFeedback({
      businessId: protocolAddress,
      rating,
      comment,
      signature
    });
    
    // Wait for confirmation
    const receipt = await tx.wait();
    console.log('Feedback submitted:', receipt);
    
    // Claim rewards
    const rewards = await this.vex.claimRewards();
    console.log('Rewards claimed:', rewards);
  }
}
```

## SaaS Application Integration

### React Component Library

```jsx
import React, { useEffect, useState } from 'react';
import { VexProvider, useVex } from '@vex-network/react';

// Main app wrapper
function App() {
  return (
    <VexProvider apiKey={process.env.REACT_APP_VEX_API_KEY}>
      <Dashboard />
    </VexProvider>
  );
}

// Trust score display component
function TrustScore() {
  const { trustScore, isVerified } = useVex();
  
  return (
    <div className="trust-score">
      <span className="score">{trustScore}/100</span>
      {isVerified && <span className="verified-badge">✓</span>}
    </div>
  );
}

// Feedback collection component
function FeedbackModal({ isOpen, onClose }) {
  const { submitFeedback } = useVex();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const handleSubmit = async () => {
    try {
      const result = await submitFeedback({
        rating,
        comment,
        metadata: {
          page: window.location.pathname,
          sessionId: getSessionId()
        }
      });
      
      // Show success message
      toast.success(`Feedback submitted! Earned ${result.reward} VEX tokens`);
      onClose();
    } catch (error) {
      toast.error('Failed to submit feedback');
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Rate Your Experience</h2>
      <StarRating value={rating} onChange={setRating} />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tell us more..."
      />
      <button onClick={handleSubmit}>Submit Feedback</button>
    </Modal>
  );
}

// Analytics dashboard component
function VexAnalytics() {
  const { analytics } = useVex();
  const [timeframe, setTimeframe] = useState('30d');
  
  return (
    <div className="analytics-dashboard">
      <MetricCard
        title="Average Rating"
        value={analytics.averageRating}
        change={analytics.ratingChange}
      />
      <MetricCard
        title="Total Reviews"
        value={analytics.totalReviews}
        change={analytics.reviewChange}
      />
      <MetricCard
        title="Response Rate"
        value={`${analytics.responseRate}%`}
        change={analytics.responseChange}
      />
      <Chart data={analytics.timeline} />
    </div>
  );
}
```

### Python Django Integration

```python
# views.py
from django.views import View
from django.http import JsonResponse
from vex_sdk import VexClient
import json

vex_client = VexClient(api_key=settings.VEX_API_KEY)

class VexWebhookView(View):
    def post(self, request):
        # Verify webhook signature
        signature = request.headers.get('X-Vex-Signature')
        if not vex_client.verify_webhook(signature, request.body):
            return JsonResponse({'error': 'Invalid signature'}, status=401)
        
        data = json.loads(request.body)
        event_type = data['event']
        
        if event_type == 'feedback.submitted':
            self.handle_new_feedback(data['data'])
        elif event_type == 'business.verified':
            self.update_business_status(data['data'])
        
        return JsonResponse({'status': 'ok'})
    
    def handle_new_feedback(self, feedback_data):
        # Update user profile with new feedback
        user = User.objects.get(vex_id=feedback_data['userId'])
        user.feedback_count += 1
        user.vex_tokens += feedback_data['reward']
        user.save()
        
        # Send notification
        send_feedback_notification(user, feedback_data)

# models.py
from django.db import models

class VexIntegration(models.Model):
    business_id = models.CharField(max_length=100)
    api_key = models.CharField(max_length=200)
    webhook_secret = models.CharField(max_length=200)
    trust_score = models.IntegerField(default=0)
    is_verified = models.BooleanField(default=False)
    
    def sync_with_vex(self):
        """Sync local data with VEX platform"""
        profile = vex_client.business.get_profile(self.business_id)
        self.trust_score = profile['trustScore']
        self.is_verified = profile['verificationStatus'] == 'verified'
        self.save()
```

## Mobile App Integration

### React Native

```javascript
import { VexMobile } from '@vex-network/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const vex = new VexMobile({
  apiKey: 'your-api-key',
  storage: AsyncStorage
});

// Feedback screen component
export function FeedbackScreen({ route, navigation }) {
  const { businessId } = route.params;
  const [rating, setRating] = useState(0);
  
  const submitFeedback = async () => {
    try {
      // Request camera permission for photo feedback
      const { status } = await Camera.requestPermissionsAsync();
      
      let photo = null;
      if (status === 'granted') {
        photo = await takePhoto();
      }
      
      const result = await vex.submitFeedback({
        businessId,
        rating,
        photo,
        location: await Location.getCurrentPositionAsync()
      });
      
      // Show reward notification
      showNotification({
        title: 'Feedback Submitted!',
        body: `You earned ${result.reward} VEX tokens`,
        data: { feedbackId: result.id }
      });
      
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit feedback');
    }
  };
  
  return (
    <View style={styles.container}>
      <StarRating
        rating={rating}
        onRatingChange={setRating}
      />
      <Button
        title="Submit Feedback"
        onPress={submitFeedback}
      />
    </View>
  );
}
```

## Testing & Development

### Mock Server Setup

```javascript
// test/setup.js
const { MockVexServer } = require('@vex-network/mock-server');

let mockServer;

beforeAll(async () => {
  mockServer = new MockVexServer({
    port: 3001,
    latency: 100 // Simulate network delay
  });
  
  await mockServer.start();
  
  // Seed test data
  await mockServer.seed({
    businesses: 10,
    feedbacks: 100,
    users: 50
  });
});

afterAll(async () => {
  await mockServer.stop();
});

// test/integration.test.js
describe('VEX Integration', () => {
  it('should submit feedback successfully', async () => {
    const response = await fetch('http://localhost:3001/feedback/submit', {
      method: 'POST',
      body: JSON.stringify({
        businessId: 'test-business',
        rating: 5,
        comment: 'Great service!'
      })
    });
    
    const data = await response.json();
    expect(data.feedbackId).toBeDefined();
    expect(data.reward).toBeGreaterThan(0);
  });
});
```

## Resources

- [Complete Example Repository](https://github.com/vex-network/examples)
- [Video Tutorials](https://youtube.com/vex-network)
- [CodeSandbox Templates](https://codesandbox.io/u/vex-network)
- [Postman Collection](https://postman.com/vex-network)