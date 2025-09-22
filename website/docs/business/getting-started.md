---
sidebar_position: 2
---

# Getting Started for Businesses

## Quick Start Guide

Welcome to VEX! This guide will help you get your business registered and start building trust with your customers.

## Step 1: Business Registration

### What You'll Need
- Business verification documents
- Company information (name, website, description)
- Contact details
- Wallet address (for Web3 features)

### Registration Process
1. Visit the VEX platform
2. Click "Register Business"
3. Complete KYC verification
4. Submit business details
5. Await approval (typically 24-48 hours)

## Step 2: Choose Your Plan

Review our pricing plans and select the one that fits your needs:

| Feature | Basic (Free) | Standard ($288) | Enterprise ($380) |
|---------|--------------|-----------------|-------------------|
| Customer Feedback | ✅ | ✅ | ✅ |
| Tracking | ❌ | ✅ | ✅ |
| VEX Trust Seal | ❌ | ✅ | ✅ |
| Analytics | ❌ | Basic | Advanced |
| Support | Community | Priority | Dedicated |

## Step 3: Integration

### API Integration
```javascript
const vexAPI = new VexAPI({
  apiKey: 'your-api-key',
  businessId: 'your-business-id'
});

// Initialize feedback widget
vexAPI.initWidget({
  position: 'bottom-right',
  theme: 'light'
});
```

### Widget Installation
Add our feedback widget to your website:

```html
<script src="https://api.vex.network/widget.js"></script>
<script>
  VexWidget.init({
    businessId: 'YOUR_BUSINESS_ID',
    position: 'bottom-right'
  });
</script>
```

## Step 4: Collect Feedback

### Enable Feedback Collection
- Configure feedback forms
- Set up email notifications
- Customize feedback categories
- Enable reward distribution

### Monitor Performance
- Access real-time dashboard
- Track customer satisfaction scores
- Analyze feedback trends
- Export reports

## Step 5: Display Trust Signals

### VEX Trust Seal
Once verified, you can display the VEX Trust Seal on your website:

```html
<div id="vex-trust-seal"></div>
<script>
  VexWidget.displayTrustSeal('vex-trust-seal');
</script>
```

### Reputation Score
Show your real-time reputation score to build customer confidence.

## Best Practices

### Responding to Feedback
- Respond within 24 hours
- Be professional and courteous
- Address concerns directly
- Thank customers for positive feedback

### Improving Your Score
- Consistently deliver quality service
- Act on customer suggestions
- Maintain transparent communication
- Reward loyal customers

## Support Resources

- [API Documentation](/docs/technical/api)
- [Integration Examples](/docs/technical/examples)
- [FAQ](#)
- [Contact Support](mailto:support@vex.network)

## Next Steps

Ready to start building trust?

1. Complete your business profile
2. Install the feedback widget
3. Start collecting verified reviews
4. Watch your reputation grow!

[Complete Registration →](#)