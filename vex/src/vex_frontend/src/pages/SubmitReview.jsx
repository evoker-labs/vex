import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, Search, Shield, Award, CheckCircle, 
  AlertCircle, Upload, ExternalLink, Zap,
  Building2, MapPin, Globe, Phone, Mail
} from 'lucide-react';
import { vex_backend } from 'declarations/vex_backend';

const SubmitReview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [proofFile, setProofFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [userTokens, setUserTokens] = useState(0);
  const [userReputation, setUserReputation] = useState(0);

  useEffect(() => {
    // Load mock data for companies
    const mockCompanies = [
      {
        id: 1,
        name: "TechStore Brasil",
        category: "E-commerce",
        trustScore: 4.2,
        reviewCount: 1253,
        verified: true,
        logo: "🛒",
        location: "São Paulo, SP",
        website: "techstore.com.br"
      },
      {
        id: 2,
        name: "CloudBank Digital",
        category: "Fintech",
        trustScore: 4.6,
        reviewCount: 3421,
        verified: true,
        logo: "🏦",
        location: "Rio de Janeiro, RJ",
        website: "cloudbank.com.br"
      },
      {
        id: 3,
        name: "FoodExpress",
        category: "Food Delivery",
        trustScore: 3.8,
        reviewCount: 892,
        verified: false,
        logo: "🍔",
        location: "Belo Horizonte, MG",
        website: "foodexpress.com.br"
      },
      {
        id: 4,
        name: "AutoMove",
        category: "Mobility",
        trustScore: 4.4,
        reviewCount: 2156,
        verified: true,
        logo: "🚗",
        location: "Curitiba, PR",
        website: "automove.com.br"
      }
    ];
    setCompanies(mockCompanies);
    setSearchResults(mockCompanies);

    // Load user data
    setUserTokens(250);
    setUserReputation(85);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = companies.filter(company => 
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(companies);
    }
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setRating(0);
    setReviewText('');
    setIsVerified(false);
    setProofFile(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofFile(file);
      // Simulate TLSN verification
      setTimeout(() => {
        setIsVerified(true);
      }, 1500);
    }
  };

  const calculateTokenReward = () => {
    let baseReward = 10;
    if (isVerified) baseReward += 20;
    if (reviewText.length > 100) baseReward += 10;
    if (rating > 0) baseReward += 5;
    return baseReward;
  };

  const handleSubmitReview = async () => {
    setSubmitting(true);
    try {
      // Simulate blockchain submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user tokens
      setUserTokens(prev => prev + calculateTokenReward());
      setUserReputation(prev => Math.min(100, prev + 2));
      
      // Reset form
      setSelectedCompany(null);
      setRating(0);
      setReviewText('');
      setIsVerified(false);
      setProofFile(null);
      
      alert(`Review submitted! You earned ${calculateTokenReward()} VEX tokens!`);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
                <h1 className="text-xl font-bold text-gray-900">Submit Review</h1>
                <p className="text-xs text-gray-600">Share experience & earn VEX</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-lg font-bold text-purple-600">{userTokens} VEX</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="text-lg font-bold text-purple-600">{userReputation}%</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!selectedCompany ? (
          <>
            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-xl font-semibold mb-4">Find a Company to Review</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by company name or category..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </motion.div>

            {/* Companies Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {searchResults.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleCompanySelect(company)}
                  className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{company.logo}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                        <p className="text-sm text-gray-600">{company.category}</p>
                      </div>
                    </div>
                    {company.verified && (
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= company.trustScore 
                              ? 'text-yellow-500 fill-yellow-500' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{company.trustScore}</span>
                    <span className="text-sm text-gray-500">({company.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <span>{company.website}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          /* Review Form */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {/* Selected Company Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{selectedCompany.logo}</div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedCompany.name}</h2>
                  <p className="text-gray-600">{selectedCompany.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCompany(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                Change company
              </button>
            </div>

            {/* Rating Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRating(star)}
                    className="p-1"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating 
                          ? 'text-yellow-500 fill-yellow-500' 
                          : 'text-gray-300 hover:text-yellow-400'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={6}
                placeholder="Share your experience with this company..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimum 50 characters ({reviewText.length}/50)
              </p>
            </div>

            {/* Verification Section */}
            <div className="mb-6 p-4 bg-purple-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-purple-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Verify Your Purchase (Optional)
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Upload proof of purchase to earn extra tokens and increase review weight
                  </p>
                  
                  {!proofFile ? (
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-purple-300 rounded-lg cursor-pointer hover:bg-purple-50 transition">
                      <Upload className="w-4 h-4" />
                      <span>Upload Proof</span>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*,.pdf"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg">
                        {isVerified ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                        )}
                        <span className="text-sm">{proofFile.name}</span>
                      </div>
                      {isVerified && (
                        <span className="text-sm text-green-600 font-medium">
                          Verified via TLSN
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Token Reward Preview */}
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Estimated Token Reward</p>
                    <p className="text-sm text-gray-600">Based on review quality and verification</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  +{calculateTokenReward()} VEX
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitReview}
                disabled={submitting || rating === 0 || reviewText.length < 50}
                className={`flex-1 py-3 rounded-lg font-medium transition ${
                  submitting || rating === 0 || reviewText.length < 50
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting to Blockchain...
                  </span>
                ) : (
                  'Submit Review'
                )}
              </motion.button>
              <button
                onClick={() => setSelectedCompany(null)}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SubmitReview;