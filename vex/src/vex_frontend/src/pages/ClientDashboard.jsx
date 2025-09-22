import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Shield, Star, Gift, CheckCircle, Lock,
  Award, Zap, TrendingUp, Users, Target, Coins,
  Upload, Camera, FileText, Mail, Phone, MapPin,
  CreditCard, Building, Briefcase, Calendar,
  ChevronRight, AlertCircle, Check, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [kycStep, setKycStep] = useState(1);
  const [kycData, setKycData] = useState({
    email: '',
    phone: '',
    fullName: '',
    birthDate: '',
    address: '',
    document: null,
    selfie: null
  });

  useEffect(() => {
    // Load user data
    setUserData({
      name: 'João Silva',
      email: 'joao.silva@email.com',
      tokens: 250,
      reputation: 85,
      level: 'Silver',
      nextLevel: 'Gold',
      reviewsCount: 23,
      verifiedReviews: 18,
      helpfulVotes: 156,
      kycStatus: 'partial', // none, partial, complete
      joinDate: '2023-10-15'
    });
  }, []);

  const achievements = [
    {
      id: 1,
      title: 'First Review',
      description: 'Submit your first review',
      icon: Star,
      completed: true,
      reward: 10,
      color: 'purple'
    },
    {
      id: 2,
      title: 'Verified Reviewer',
      description: 'Complete 5 verified reviews',
      icon: CheckCircle,
      completed: true,
      reward: 50,
      color: 'green'
    },
    {
      id: 3,
      title: 'KYC Bronze',
      description: 'Complete email verification',
      icon: Mail,
      completed: true,
      reward: 20,
      color: 'orange'
    },
    {
      id: 4,
      title: 'KYC Silver',
      description: 'Complete phone verification',
      icon: Phone,
      completed: true,
      reward: 30,
      color: 'gray'
    },
    {
      id: 5,
      title: 'KYC Gold',
      description: 'Complete full identity verification',
      icon: Shield,
      completed: false,
      reward: 100,
      color: 'yellow'
    },
    {
      id: 6,
      title: 'Community Helper',
      description: 'Get 100 helpful votes',
      icon: Users,
      completed: true,
      reward: 75,
      color: 'blue'
    },
    {
      id: 7,
      title: 'Review Expert',
      description: 'Write 50 reviews',
      icon: Trophy,
      completed: false,
      reward: 200,
      color: 'purple',
      progress: 46
    },
    {
      id: 8,
      title: 'Trust Builder',
      description: 'Achieve 90% reputation',
      icon: Target,
      completed: false,
      reward: 150,
      color: 'green',
      progress: 85
    }
  ];

  const dailyTasks = [
    {
      id: 1,
      title: 'Write a Review',
      description: 'Submit at least one review today',
      reward: 15,
      completed: false,
      icon: Star
    },
    {
      id: 2,
      title: 'Verify a Purchase',
      description: 'Upload proof for one review',
      reward: 25,
      completed: false,
      icon: FileText
    },
    {
      id: 3,
      title: 'Vote on Reviews',
      description: 'Mark 5 reviews as helpful',
      reward: 10,
      completed: true,
      icon: CheckCircle
    },
    {
      id: 4,
      title: 'Update Profile',
      description: 'Add or update profile information',
      reward: 5,
      completed: false,
      icon: Users
    }
  ];

  const levelProgress = {
    current: 'Silver',
    next: 'Gold',
    progress: 65,
    tokensToNext: 250,
    benefits: [
      '2x voting power in DAO',
      'Priority review display',
      'Exclusive badge',
      'Monthly bonus tokens'
    ]
  };

  const handleKycSubmit = () => {
    // Submit KYC data to blockchain
    console.log('Submitting KYC:', kycData);
    setKycStep(prev => prev + 1);
  };

  const handleFileUpload = (type, file) => {
    setKycData(prev => ({
      ...prev,
      [type]: file
    }));
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
                <h1 className="text-xl font-bold text-gray-900">Client Dashboard</h1>
                <p className="text-xs text-gray-600">Track progress & earn rewards</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-purple-600" />
                <span className="text-lg font-bold text-purple-600">{userData?.tokens} VEX</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="text-lg font-bold text-purple-600">{userData?.reputation}%</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/app/submit-review')}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
              >
                Write Review
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Level {levelProgress.current}</h2>
              <p className="text-purple-100">
                {levelProgress.tokensToNext - (levelProgress.progress * levelProgress.tokensToNext / 100)} tokens to {levelProgress.next}
              </p>
            </div>
            <Trophy className="w-16 h-16 text-purple-200" />
          </div>
          <div className="w-full bg-purple-800 rounded-full h-3 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-white h-3 rounded-full"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {levelProgress.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-purple-200" />
                <span className="text-purple-100">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {['overview', 'achievements', 'kyc', 'rewards'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium capitalize transition ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab === 'kyc' ? 'KYC Verification' : tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Daily Tasks */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  Daily Tasks
                </h3>
                <div className="space-y-4">
                  {dailyTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        task.completed 
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          task.completed ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          <task.icon className={`w-5 h-5 ${
                            task.completed ? 'text-green-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-sm font-medium">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          +{task.reward} VEX
                        </span>
                        {task.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                            Start
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Your Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-semibold">{userData?.reviewsCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Verified Reviews</span>
                    <span className="font-semibold">{userData?.verifiedReviews}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Helpful Votes</span>
                    <span className="font-semibold">{userData?.helpfulVotes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-semibold">{userData?.joinDate}</span>
                  </div>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate('/submit-review')}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-6 flex items-center justify-between group"
              >
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-1">Write a Review</h3>
                  <p className="text-purple-100 text-sm">Earn tokens for quality reviews</p>
                </div>
                <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition" />
              </motion.button>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className={`bg-white rounded-xl shadow-lg p-6 relative overflow-hidden ${
                  !achievement.completed && 'opacity-75'
                }`}
              >
                {achievement.completed && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                )}
                
                <div className={`p-3 rounded-lg inline-block mb-4 ${
                  achievement.completed 
                    ? `bg-${achievement.color}-100`
                    : 'bg-gray-100'
                }`}>
                  <achievement.icon className={`w-8 h-8 ${
                    achievement.completed
                      ? `text-${achievement.color}-600`
                      : 'text-gray-400'
                  }`} />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {achievement.description}
                </p>
                
                {achievement.progress !== undefined && !achievement.completed && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm font-medium">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    +{achievement.reward} VEX
                  </span>
                  {achievement.completed ? (
                    <span className="text-sm text-green-600 font-medium">Claimed</span>
                  ) : achievement.progress ? (
                    <span className="text-sm text-gray-500">{achievement.progress}/100</span>
                  ) : (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'kyc' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">KYC Verification</h2>
              <p className="text-gray-600">Complete your verification to unlock premium features and earn bonus tokens</p>
            </div>

            {/* KYC Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step <= kycStep 
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step < kycStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 4 && (
                    <div className={`w-full h-1 mx-2 ${
                      step < kycStep ? 'bg-purple-600' : 'bg-gray-200'
                    }`} style={{ width: '100px' }} />
                  )}
                </div>
              ))}
            </div>

            {/* KYC Forms */}
            {kycStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={kycData.fullName}
                      onChange={(e) => setKycData({...kycData, fullName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={kycData.birthDate}
                      onChange={(e) => setKycData({...kycData, birthDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={kycData.email}
                      onChange={(e) => setKycData({...kycData, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={kycData.phone}
                      onChange={(e) => setKycData({...kycData, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 flex items-start gap-3">
                  <Gift className="w-6 h-6 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Earn 20 VEX Tokens</h4>
                    <p className="text-sm text-gray-600">Complete basic information verification</p>
                  </div>
                </div>
                
                <button
                  onClick={handleKycSubmit}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                >
                  Continue to Address Verification
                </button>
              </motion.div>
            )}

            {kycStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold mb-4">Address Verification</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address
                  </label>
                  <textarea
                    value={kycData.address}
                    onChange={(e) => setKycData({...kycData, address: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                    placeholder="123 Main St, Apt 4B, New York, NY 10001"
                  />
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 flex items-start gap-3">
                  <Gift className="w-6 h-6 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Earn 30 VEX Tokens</h4>
                    <p className="text-sm text-gray-600">Complete address verification</p>
                  </div>
                </div>
                
                <button
                  onClick={handleKycSubmit}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                >
                  Continue to Document Upload
                </button>
              </motion.div>
            )}

            {kycStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold mb-4">Document Verification</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h4 className="font-medium text-gray-900 mb-2">Government ID</h4>
                    <p className="text-sm text-gray-600 mb-4">Upload passport or driver's license</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700">
                      <Upload className="w-4 h-4" />
                      <span>Upload Document</span>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload('document', e.target.files[0])}
                        className="hidden"
                        accept="image/*,.pdf"
                      />
                    </label>
                    {kycData.document && (
                      <p className="text-sm text-green-600 mt-2">✓ {kycData.document.name}</p>
                    )}
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h4 className="font-medium text-gray-900 mb-2">Selfie Verification</h4>
                    <p className="text-sm text-gray-600 mb-4">Take a clear photo of yourself</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700">
                      <Camera className="w-4 h-4" />
                      <span>Take Selfie</span>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload('selfie', e.target.files[0])}
                        className="hidden"
                        accept="image/*"
                        capture="user"
                      />
                    </label>
                    {kycData.selfie && (
                      <p className="text-sm text-green-600 mt-2">✓ {kycData.selfie.name}</p>
                    )}
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 flex items-start gap-3">
                  <Gift className="w-6 h-6 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Earn 100 VEX Tokens</h4>
                    <p className="text-sm text-gray-600">Complete full KYC verification</p>
                  </div>
                </div>
                
                <button
                  onClick={handleKycSubmit}
                  disabled={!kycData.document || !kycData.selfie}
                  className={`w-full py-3 rounded-lg font-medium transition ${
                    kycData.document && kycData.selfie
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Submit for Verification
                </button>
              </motion.div>
            )}

            {kycStep === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">KYC Complete!</h3>
                <p className="text-gray-600 mb-8">Your identity has been verified successfully</p>
                
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white max-w-md mx-auto">
                  <Trophy className="w-12 h-12 mx-auto mb-3" />
                  <h4 className="text-xl font-semibold mb-2">You've Earned 150 VEX Tokens!</h4>
                  <p className="text-purple-100">Thank you for completing your verification</p>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white"
            >
              <Gift className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Referral Bonus</h3>
              <p className="text-yellow-100 mb-4">Invite friends and earn 50 VEX per signup</p>
              <button className="w-full py-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition">
                Share Invite Link
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white"
            >
              <Star className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Review Streak</h3>
              <p className="text-purple-100 mb-4">7 days streak! Keep it going for bonus rewards</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div
                    key={day}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      day <= 5 ? 'bg-white/30' : 'bg-white/10'
                    }`}
                  >
                    {day <= 5 ? '✓' : day}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-6 text-white"
            >
              <Award className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Milestone Rewards</h3>
              <p className="text-green-100 mb-4">Complete 25 reviews to unlock special badge</p>
              <div className="w-full bg-green-600 rounded-full h-3">
                <div className="bg-white h-3 rounded-full" style={{ width: '92%' }} />
              </div>
              <p className="text-sm mt-2">23/25 reviews</p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;