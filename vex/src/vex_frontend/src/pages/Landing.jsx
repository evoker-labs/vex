import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, Users, TrendingUp, Award, ChevronRight, 
  CheckCircle, Globe, BarChart3, MessageSquare,
  ArrowRight, Menu, X, Building2, Star,
  Lock, Zap, FileCheck, Search, ChevronDown,
  Coins, Vote, Network, Database, Check, XCircle,
  ArrowUpRight, ExternalLink, Sparkles
} from 'lucide-react';

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Handle navigation for IC local development
  const handleLaunchApp = (e) => {
    e.preventDefault();
    // Check if we're in IC local development
    if (window.location.hostname.includes('.localhost') || window.location.hostname.includes('.local')) {
      // Use window.location for IC local development
      window.location.href = `${window.location.origin}/client-dashboard`;
    } else {
      // Use React Router for production
      window.location.href = '/client-dashboard';
    }
  };
  
  const heroRef = useRef(null);
  const competitorsRef = useRef(null);
  const isCompetitorsInView = useInView(competitorsRef, { once: true, threshold: 0.1 });
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const competitors = [
    {
      name: "VEX",
      logo: "V",
      color: "purple",
      features: {
        "Blockchain Verified": true,
        "Decentralized": true,
        "Token Rewards": true,
        "DAO Governance": true,
        "TLSN Verification": true,
        "Community Driven": true,
        "Immutable Reviews": true,
        "Transparent": true,
      }
    },
    {
      name: "TrustPilot",
      logo: "T",
      color: "green",
      features: {
        "Blockchain Verified": false,
        "Decentralized": false,
        "Token Rewards": false,
        "DAO Governance": false,
        "TLSN Verification": false,
        "Community Driven": false,
        "Immutable Reviews": false,
        "Transparent": "partial",
      }
    },
    {
      name: "ReclameAqui",
      logo: "R",
      color: "blue",
      features: {
        "Blockchain Verified": false,
        "Decentralized": false,
        "Token Rewards": false,
        "DAO Governance": false,
        "TLSN Verification": false,
        "Community Driven": "partial",
        "Immutable Reviews": false,
        "Transparent": "partial",
      }
    },
    {
      name: "Feefo",
      logo: "F",
      color: "yellow",
      features: {
        "Blockchain Verified": false,
        "Decentralized": false,
        "Token Rewards": false,
        "DAO Governance": false,
        "TLSN Verification": false,
        "Community Driven": false,
        "Immutable Reviews": false,
        "Transparent": "partial",
      }
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Every review is cryptographically secured and permanently stored on the Internet Computer blockchain.",
    },
    {
      icon: Users,
      title: "Community Validated",
      description: "Decentralized consensus mechanisms ensure authentic reviews from real customers.",
    },
    {
      icon: Award,
      title: "Token Rewards",
      description: "Contributors earn VEX tokens for providing valuable, verified feedback.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Access comprehensive insights and trust metrics for informed decision-making.",
    },
  ];

  const tokenomics = {
    distribution: [
      { name: "Community Rewards", percentage: 40, color: "bg-purple-500" },
      { name: "DAO Treasury", percentage: 20, color: "bg-purple-600" },
      { name: "Development", percentage: 15, color: "bg-purple-700" },
      { name: "Team", percentage: 15, color: "bg-purple-800" },
      { name: "Marketing", percentage: 10, color: "bg-purple-900" },
    ],
    utilities: [
      "Governance voting rights",
      "Premium feature access",
      "Review verification rewards",
      "Staking for increased reputation",
      "Platform fee discounts",
    ]
  };

  const faqs = [
    {
      question: "How does blockchain verification work?",
      answer: "Every review submitted to VEX is cryptographically signed and stored on the Internet Computer blockchain. This creates an immutable record that cannot be altered or deleted, ensuring complete transparency and trust."
    },
    {
      question: "What are VEX tokens?",
      answer: "VEX tokens are rewards given to users who provide valuable feedback. These tokens can be used within the platform for premium features or traded, creating a sustainable ecosystem for honest reviews."
    },
    {
      question: "How does DAO governance work?",
      answer: "VEX token holders participate in decentralized governance, voting on platform improvements, review policies, and community guidelines. This ensures the platform evolves according to community needs."
    },
    {
      question: "What is TLSN and why does it matter?",
      answer: "TLS Notary (TLSN) allows VEX to cryptographically verify real-world data from external sources while maintaining privacy. This enables verified purchase reviews without exposing sensitive information."
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      description: "For startups and small businesses",
      features: [
        "Business registration",
        "Receive customer reviews",
        "Basic trust score",
        "Community support",
        "Monthly reports"
      ],
      cta: "Get Started",
      recommended: false
    },
    {
      name: "Professional",
      price: "$288",
      period: "/month",
      description: "For growing businesses",
      features: [
        "Everything in Basic",
        "Advanced analytics",
        "VEX Trust Badge",
        "API access",
        "Priority support",
        "Custom integrations"
      ],
      cta: "Start Free Trial",
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom SLA",
        "White-label options",
        "Advanced security features",
        "Unlimited API calls"
      ],
      cta: "Contact Sales",
      recommended: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <motion.div 
                  className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white font-bold text-xl">V</span>
                </motion.div>
                <span className="text-xl font-bold text-gray-900">VEX</span>
                <span className="hidden sm:inline-block text-sm text-gray-500 ml-2 border-l pl-2">
                  Trusted Reviews
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 font-medium transition">
                How It Works
              </a>
              <a href="#competitors" className="text-gray-700 hover:text-purple-600 font-medium transition">
                Compare
              </a>
              <a href="#tokenomics" className="text-gray-700 hover:text-purple-600 font-medium transition">
                Tokenomics
              </a>
              <a href="#dao" className="text-gray-700 hover:text-purple-600 font-medium transition">
                DAO
              </a>
              <button 
                onClick={handleLaunchApp}
                className="ml-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition font-medium"
              >
                Launch App
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-2 space-y-1">
              <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                How It Works
              </a>
              <a href="#competitors" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                Compare
              </a>
              <a href="#tokenomics" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                Tokenomics
              </a>
              <a href="#dao" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                DAO
              </a>
              <button onClick={handleLaunchApp} className="block w-full px-3 py-2 bg-purple-600 text-white rounded-md text-center">
                Launch App
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative bg-gradient-to-b from-purple-50 to-white overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ y: scrollY * 0.5 }}
        >
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6"
              >
                <Lock className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-800">
                  Powered by Internet Computer Protocol
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.span
                  initial={{ display: "inline-block", y: 50 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  Your Voice,
                </motion.span>{' '}
                <motion.span 
                  className="text-purple-600"
                  initial={{ display: "inline-block", y: 50 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                >
                  Our Chain,
                </motion.span><br />
                <motion.span
                  initial={{ display: "inline-block", y: 50 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                >
                  Their Accountability
                </motion.span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              >
                Decentralized platform connecting companies to blockchain, enabling transparent 
                business reviews and community-driven trust verification.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  to="/register"
                  className="group inline-flex items-center px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition font-medium"
                >
                  Register Your Business
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={() => scrollToSection('competitors')}
                  className="inline-flex items-center px-8 py-3 bg-white text-purple-600 rounded-md border-2 border-purple-600 hover:bg-purple-50 transition font-medium"
                >
                  See Comparison
                  <ChevronDown className="ml-2 h-5 w-5" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Competitor Comparison Section */}
      <section id="competitors" ref={competitorsRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isCompetitorsInView ? { opacity: 1 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              VEX vs Traditional Platforms
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See why blockchain-based reviews are the future of trust
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isCompetitorsInView ? "visible" : "hidden"}
            className="overflow-x-auto"
          >
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-purple-700">
                  <th className="px-6 py-4 text-left text-white font-semibold">Features</th>
                  {competitors.map((comp, idx) => (
                    <th key={idx} className="px-6 py-4 text-center text-white">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2`}>
                          <span className="font-bold">{comp.logo}</span>
                        </div>
                        <span>{comp.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(competitors[0].features).map((feature, idx) => (
                  <motion.tr 
                    key={feature}
                    variants={itemVariants}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{feature}</td>
                    {competitors.map((comp, compIdx) => (
                      <td key={compIdx} className="px-6 py-4 text-center">
                        {comp.features[feature] === true ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: idx * 0.1 + compIdx * 0.05 }}
                          >
                            <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                          </motion.div>
                        ) : comp.features[feature] === "partial" ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: idx * 0.1 + compIdx * 0.05 }}
                          >
                            <div className="w-6 h-6 bg-yellow-500 rounded-full mx-auto opacity-50"></div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: idx * 0.1 + compIdx * 0.05 }}
                          >
                            <X className="w-6 h-6 text-red-500 mx-auto" />
                          </motion.div>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* DAO & Governance Section */}
      <section id="dao" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Community-Driven <span className="text-purple-600">DAO Governance</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                VEX operates as a Decentralized Autonomous Organization where token holders 
                shape the platform's future. Every decision is transparent, on-chain, and 
                driven by community consensus.
              </p>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 10 }}
                >
                  <Vote className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Democratic Voting</h3>
                    <p className="text-gray-600">One token, one vote on platform improvements</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 10 }}
                >
                  <Users className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Community Proposals</h3>
                    <p className="text-gray-600">Anyone can submit proposals for platform changes</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start"
                  whileHover={{ x: 10 }}
                >
                  <Shield className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Transparent Treasury</h3>
                    <p className="text-gray-600">All funds are managed by smart contracts</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">How DAO Works</h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Hold VEX Tokens", desc: "Acquire tokens through reviews or purchase" },
                    { step: 2, title: "Submit Proposals", desc: "Suggest improvements or changes" },
                    { step: 3, title: "Vote on Decisions", desc: "Participate in governance votes" },
                    { step: 4, title: "Execute Changes", desc: "Smart contracts implement approved proposals" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center"
                    >
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TLSN Technology Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full mb-6">
              <Database className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Powered by TLS Notary</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Real-World Data, Blockchain Verified
            </h2>
            
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-12">
              TLSN (TLS Notary) technology enables VEX to cryptographically verify real-world data 
              from external sources without compromising privacy. This revolutionary approach ensures 
              reviews are from actual customers with verified purchases.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Lock,
                  title: "Privacy Preserved",
                  desc: "Verify purchases without exposing personal data"
                },
                {
                  icon: Shield,
                  title: "Cryptographic Proof",
                  desc: "Mathematical guarantee of data authenticity"
                },
                {
                  icon: Zap,
                  title: "Real-Time Verification",
                  desc: "Instant validation of external data sources"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-purple-100">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              VEX Token Economics
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A sustainable ecosystem designed to reward participation and ensure long-term growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Token Distribution */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Token Distribution</h3>
              <div className="space-y-4">
                {tokenomics.distribution.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                  >
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                      <span>{item.name}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        className={`${item.color} h-3 rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Token Utility */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Token Utility</h3>
              <div className="space-y-3">
                {tokenomics.utilities.map((utility, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center"
                  >
                    <Coins className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-gray-700">{utility}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-700">
                  <strong>Earn tokens by:</strong> Writing verified reviews, validating content, 
                  participating in governance, and referring new users.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How VEX Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, secure, and transparent process for businesses and reviewers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Register Business",
                desc: "Companies create verified accounts with blockchain-based identity validation",
                step: 1
              },
              {
                icon: MessageSquare,
                title: "Collect Reviews",
                desc: "Customers submit verified feedback that's permanently recorded on-chain",
                step: 2
              },
              {
                icon: Award,
                title: "Build Trust",
                desc: "Generate immutable trust scores based on authentic customer experiences",
                step: 3
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <item.icon className="w-8 h-8 text-purple-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.step}. {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-600 to-transparent" style={{ width: 'calc(100% - 4rem)' }}></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`bg-white rounded-lg p-8 ${
                  plan.recommended 
                    ? 'ring-2 ring-purple-600 shadow-xl relative' 
                    : 'border border-gray-200 shadow-lg'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <motion.div 
                      className="inline-block px-4 py-1 bg-purple-600 text-white text-sm font-medium rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      Recommended
                    </motion.div>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 ml-2">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-md font-medium transition ${
                    plan.recommended
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="resources" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about VEX
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeAccordion === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: activeAccordion === index ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Trust?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join the decentralized revolution of business reviews
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-3 bg-white text-purple-600 rounded-md hover:bg-gray-100 transition font-medium"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#contact"
                  className="inline-flex items-center px-8 py-3 bg-transparent text-white rounded-md border-2 border-white hover:bg-purple-800 transition font-medium"
                >
                  Contact Sales
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">V</span>
                </div>
                <span className="ml-2 text-xl font-bold">VEX</span>
              </div>
              <p className="text-gray-400">
                Your Voice, Our Chain,<br />Their Accountability
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#dao" className="text-gray-400 hover:text-white transition">DAO</a></li>
                <li><a href="#tokenomics" className="text-gray-400 hover:text-white transition">Tokenomics</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Technology</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">ICP Blockchain</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">TLSN Protocol</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Smart Contracts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">API Docs</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Discord</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">GitHub</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 VEX. All rights reserved. Powered by Internet Computer Protocol.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;