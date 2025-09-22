import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, TrendingUp, Users, Star, MessageSquare,
  Shield, Award, CheckCircle, AlertCircle, Settings,
  Download, Filter, Calendar, ArrowUpRight, ArrowDownRight,
  Globe, Building2, DollarSign, Target, Activity
} from 'lucide-react';

const BusinessDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  const [businessData, setBusinessData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [respondingTo, setRespondingTo] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    // Load mock business data
    setBusinessData({
      name: 'TechStore Brasil',
      plan: 'Standard',
      trustScore: 4.2,
      totalReviews: 1253,
      verifiedReviews: 892,
      responseRate: 78,
      avgResponseTime: '2.3 hours',
      monthlyViews: 15420,
      conversionRate: 3.2
    });

    // Load mock reviews
    setReviews([
      {
        id: 1,
        user: 'João Silva',
        rating: 5,
        text: 'Excellent service and fast delivery! The product quality exceeded my expectations.',
        date: '2024-01-15',
        verified: true,
        replied: false,
        helpful: 45,
        tokens: 35
      },
      {
        id: 2,
        user: 'Maria Santos',
        rating: 3,
        text: 'Product is good but customer service needs improvement. Took too long to respond.',
        date: '2024-01-14',
        verified: true,
        replied: true,
        helpful: 23,
        tokens: 30
      },
      {
        id: 3,
        user: 'Pedro Oliveira',
        rating: 4,
        text: 'Good value for money. Shipping was on time.',
        date: '2024-01-13',
        verified: false,
        replied: false,
        helpful: 12,
        tokens: 15
      }
    ]);
  }, []);


  const handleResponse = (reviewId) => {
    setRespondingTo(reviewId);
    setResponse('');
  };

  const submitResponse = () => {
    // Submit response to blockchain
    console.log('Submitting response for review:', respondingTo, response);
    setRespondingTo(null);
    setResponse('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header - Landing Page Style */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <span className="text-white font-bold text-xl">V</span>
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Business Dashboard</h1>
                <p className="text-xs text-gray-600">Monitor & manage reputation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-700">VEX Verified</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
              >
                <Settings className="w-5 h-5 inline mr-2" />
                Settings
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-green-600 font-medium flex items-center">
                <ArrowUpRight className="w-4 h-4" />
                +5%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{businessData?.trustScore}</h3>
            <p className="text-gray-600 text-sm">Trust Score</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600 font-medium flex items-center">
                <ArrowUpRight className="w-4 h-4" />
                +12%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{businessData?.totalReviews}</h3>
            <p className="text-gray-600 text-sm">Total Reviews</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">71.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{businessData?.verifiedReviews}</h3>
            <p className="text-gray-600 text-sm">Verified Reviews</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Activity className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm text-red-600 font-medium flex items-center">
                <ArrowDownRight className="w-4 h-4" />
                -3%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{businessData?.responseRate}%</h3>
            <p className="text-gray-600 text-sm">Response Rate</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 px-6">
              {['overview', 'reviews', 'analytics', 'responses'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition ${
                    activeTab === tab
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Trust Score Trend</h3>
                  <div className="bg-gray-50 rounded-lg p-8 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                      <p className="text-2xl font-bold text-purple-600">4.2</p>
                      <p className="text-sm text-gray-600">Current Score</p>
                      <p className="text-xs text-green-600 mt-2">+5% from last month</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Review Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-16 text-sm">5 ⭐</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-6 mx-3">
                        <div className="bg-green-500 h-6 rounded-full" style={{ width: '36%' }}></div>
                      </div>
                      <span className="text-sm font-medium">450</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-sm">4 ⭐</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-6 mx-3">
                        <div className="bg-lime-500 h-6 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <span className="text-sm font-medium">380</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-sm">3 ⭐</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-6 mx-3">
                        <div className="bg-yellow-500 h-6 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <span className="text-sm font-medium">250</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-sm">2 ⭐</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-6 mx-3">
                        <div className="bg-orange-500 h-6 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm font-medium">120</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-16 text-sm">1 ⭐</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-6 mx-3">
                        <div className="bg-red-500 h-6 rounded-full" style={{ width: '4%' }}></div>
                      </div>
                      <span className="text-sm font-medium">53</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recent Reviews</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4 inline mr-2" />
                      Filter
                    </button>
                    <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Download className="w-4 h-4 inline mr-2" />
                      Export
                    </button>
                  </div>
                </div>

                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium">{review.user}</span>
                          {review.verified && (
                            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              <CheckCircle className="w-3 h-3" />
                              Verified Purchase
                            </span>
                          )}
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.text}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {review.tokens} VEX earned
                        </span>
                      </div>
                    </div>
                    
                    {respondingTo === review.id ? (
                      <div className="mt-4 p-3 bg-white rounded-lg">
                        <textarea
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                          placeholder="Write your response..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          rows={3}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={submitResponse}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                          >
                            Submit Response
                          </button>
                          <button
                            onClick={() => setRespondingTo(null)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      !review.replied && (
                        <button
                          onClick={() => handleResponse(review.id)}
                          className="mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium"
                        >
                          Respond to this review
                        </button>
                      )
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Monthly Reviews</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-end justify-between h-40">
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-purple-600 rounded-t" style={{ height: '80px' }}></div>
                          <span className="text-xs text-gray-600 mt-2">Week 1</span>
                          <span className="text-sm font-medium">32</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center mx-2">
                          <div className="w-full bg-purple-600 rounded-t" style={{ height: '110px' }}></div>
                          <span className="text-xs text-gray-600 mt-2">Week 2</span>
                          <span className="text-sm font-medium">45</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center mx-2">
                          <div className="w-full bg-purple-600 rounded-t" style={{ height: '95px' }}></div>
                          <span className="text-xs text-gray-600 mt-2">Week 3</span>
                          <span className="text-sm font-medium">38</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-purple-600 rounded-t" style={{ height: '130px' }}></div>
                          <span className="text-xs text-gray-600 mt-2">Week 4</span>
                          <span className="text-sm font-medium">52</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Avg. Response Time</span>
                        <span className="font-semibold">{businessData?.avgResponseTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Monthly Views</span>
                        <span className="font-semibold">{businessData?.monthlyViews?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Conversion Rate</span>
                        <span className="font-semibold">{businessData?.conversionRate}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Trust Badge Status</span>
                        <span className="font-semibold text-green-600">Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plan Upgrade CTA */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Upgrade to Enterprise</h3>
                      <p className="text-purple-100">Get advanced analytics, API access, and dedicated support</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-3 bg-white text-purple-600 rounded-lg font-medium"
                    >
                      Upgrade Now
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'responses' && (
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">3 Reviews Awaiting Response</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Responding to reviews improves your trust score and shows customers you care
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {reviews.filter(r => !r.replied).map((review) => (
                    <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="font-medium">{review.user}</span>
                          <span className="text-sm text-gray-500 ml-3">{review.date}</span>
                        </div>
                        <button
                          onClick={() => handleResponse(review.id)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                        >
                          Respond
                        </button>
                      </div>
                      <p className="text-gray-700">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;