import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Vote, Users, Shield, TrendingUp, Clock, 
  CheckCircle, XCircle, AlertCircle, ChevronRight,
  FileText, Gavel, Target, Coins, BarChart3,
  MessageSquare, ThumbsUp, ThumbsDown, Info
} from 'lucide-react';

const DAOGovernance = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [userVotingPower, setUserVotingPower] = useState(250);
  const [hasVoted, setHasVoted] = useState({});

  const proposals = [
    {
      id: 1,
      title: 'Increase Review Verification Rewards',
      description: 'Proposal to increase VEX token rewards for verified reviews from 30 to 50 tokens',
      proposer: 'dao.member.eth',
      status: 'active',
      category: 'tokenomics',
      votesFor: 15234,
      votesAgainst: 3421,
      quorum: 20000,
      endDate: '2024-02-01',
      discussion: 45,
      impact: 'high'
    },
    {
      id: 2,
      title: 'Implement Quadratic Voting for DAO Decisions',
      description: 'Change voting mechanism to quadratic voting to prevent whale domination',
      proposer: 'community.vex',
      status: 'active',
      category: 'governance',
      votesFor: 8932,
      votesAgainst: 5621,
      quorum: 20000,
      endDate: '2024-01-30',
      discussion: 89,
      impact: 'critical'
    },
    {
      id: 3,
      title: 'Add Support for Multi-Language Reviews',
      description: 'Enable platform to support reviews in Portuguese, Spanish, and English',
      proposer: 'brazil.node',
      status: 'active',
      category: 'platform',
      votesFor: 12453,
      votesAgainst: 1234,
      quorum: 15000,
      endDate: '2024-01-28',
      discussion: 23,
      impact: 'medium'
    },
    {
      id: 4,
      title: 'Reduce Platform Fees for Small Businesses',
      description: 'Lower subscription fees from $288 to $199 for businesses with <100 reviews',
      proposer: 'smb.advocate',
      status: 'passed',
      category: 'economics',
      votesFor: 18234,
      votesAgainst: 4532,
      quorum: 20000,
      endDate: '2024-01-15',
      discussion: 156,
      impact: 'high'
    },
    {
      id: 5,
      title: 'Burn 10% of Platform Revenue',
      description: 'Implement automatic token burn mechanism for platform sustainability',
      proposer: 'tokenomics.dao',
      status: 'failed',
      category: 'tokenomics',
      votesFor: 7234,
      votesAgainst: 14532,
      quorum: 20000,
      endDate: '2024-01-10',
      discussion: 234,
      impact: 'critical'
    }
  ];

  const delegateOptions = [
    {
      address: 'delegate1.vex',
      name: 'VEX Foundation',
      votingPower: 125000,
      participation: 98,
      description: 'Official VEX Foundation delegate focused on platform growth'
    },
    {
      address: 'delegate2.vex',
      name: 'Community First',
      votingPower: 89000,
      participation: 92,
      description: 'Community-driven delegate prioritizing user experience'
    },
    {
      address: 'delegate3.vex',
      name: 'Tech Innovation',
      votingPower: 67000,
      participation: 87,
      description: 'Technical improvements and blockchain integration focus'
    }
  ];

  const handleVote = (proposalId, support) => {
    setHasVoted(prev => ({
      ...prev,
      [proposalId]: support
    }));
    // Submit vote to blockchain
    console.log(`Voting ${support ? 'for' : 'against'} proposal ${proposalId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'passed': return 'bg-blue-100 text-blue-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'tokenomics': return Coins;
      case 'governance': return Gavel;
      case 'platform': return Target;
      case 'economics': return TrendingUp;
      default: return FileText;
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
                <h1 className="text-xl font-bold text-gray-900">DAO Governance</h1>
                <p className="text-xs text-gray-600">Vote on platform decisions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Vote className="w-5 h-5 text-purple-600" />
                <span className="text-lg font-bold text-purple-600">{userVotingPower} VEX</span>
                <span className="text-xs text-gray-500">voting power</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
              >
                Create Proposal
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-purple-600" />
              <span className="text-sm text-green-600">+12%</span>
            </div>
            <h3 className="text-2xl font-bold">1,234</h3>
            <p className="text-sm text-gray-600">Active Voters</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-green-600" />
              <span className="text-sm text-green-600">Active</span>
            </div>
            <h3 className="text-2xl font-bold">8</h3>
            <p className="text-sm text-gray-600">Open Proposals</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <Coins className="w-8 h-8 text-yellow-600" />
              <span className="text-sm text-gray-600">TVL</span>
            </div>
            <h3 className="text-2xl font-bold">2.5M</h3>
            <p className="text-sm text-gray-600">VEX Staked</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <span className="text-sm text-gray-600">Rate</span>
            </div>
            <h3 className="text-2xl font-bold">76%</h3>
            <p className="text-sm text-gray-600">Participation</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {['active', 'passed', 'failed', 'delegate'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium capitalize transition ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab === 'delegate' ? 'Delegation' : `${tab} Proposals`}
            </button>
          ))}
        </div>

        {/* Proposals List */}
        {activeTab !== 'delegate' ? (
          <div className="space-y-4">
            {proposals
              .filter(p => activeTab === 'active' ? p.status === 'active' : p.status === activeTab)
              .map((proposal, index) => {
                const Icon = getCategoryIcon(proposal.category);
                const totalVotes = proposal.votesFor + proposal.votesAgainst;
                const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
                
                return (
                  <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                          <Icon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{proposal.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                              {proposal.status}
                            </span>
                            {proposal.impact === 'critical' && (
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                High Impact
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{proposal.description}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <span>by {proposal.proposer}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Ends {proposal.endDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              {proposal.discussion} comments
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Voting Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-green-600">For: {proposal.votesFor.toLocaleString()}</span>
                        <span className="text-red-600">Against: {proposal.votesAgainst.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div className="flex h-full">
                          <div 
                            className="bg-green-500 transition-all"
                            style={{ width: `${forPercentage}%` }}
                          />
                          <div 
                            className="bg-red-500 transition-all"
                            style={{ width: `${100 - forPercentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{forPercentage.toFixed(1)}% For</span>
                        <span>Quorum: {((totalVotes / proposal.quorum) * 100).toFixed(1)}%</span>
                      </div>
                    </div>

                    {/* Vote Actions */}
                    {proposal.status === 'active' && (
                      <div className="flex gap-3">
                        {hasVoted[proposal.id] === undefined ? (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleVote(proposal.id, true)}
                              className="flex-1 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                            >
                              <ThumbsUp className="w-4 h-4 inline mr-2" />
                              Vote For
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleVote(proposal.id, false)}
                              className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                            >
                              <ThumbsDown className="w-4 h-4 inline mr-2" />
                              Vote Against
                            </motion.button>
                          </>
                        ) : (
                          <div className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-center">
                            <CheckCircle className="w-4 h-4 inline mr-2" />
                            You voted {hasVoted[proposal.id] ? 'For' : 'Against'}
                          </div>
                        )}
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                          <MessageSquare className="w-4 h-4 inline mr-2" />
                          Discuss
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
          </div>
        ) : (
          /* Delegation Tab */
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">About Delegation</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Delegate your voting power to trusted community members who actively participate in governance.
                    You can revoke delegation at any time.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {delegateOptions.map((delegate, index) => (
                <motion.div
                  key={delegate.address}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{delegate.name}</h3>
                      <p className="text-sm text-gray-500">{delegate.address}</p>
                    </div>
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                  
                  <p className="text-gray-600 mb-4">{delegate.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Voting Power</span>
                      <span className="font-medium">{delegate.votingPower.toLocaleString()} VEX</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Participation Rate</span>
                      <span className="font-medium">{delegate.participation}%</span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
                  >
                    Delegate Votes
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Current Delegation Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Your Current Delegation</h3>
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-700" />
                  </div>
                  <div>
                    <p className="font-medium">No Active Delegation</p>
                    <p className="text-sm text-gray-600">You are voting directly with your tokens</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DAOGovernance;