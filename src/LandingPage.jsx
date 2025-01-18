import React from 'react';
import { Search, BarChart2, Shield, Globe2 } from 'lucide-react';
import './index.css'
// Custom Card Component
const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
};

// Hero Component
const Hero = () => {
  return (
    <header className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">
        Uncover Media Bias with AI
      </h1>
      <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
        Advanced news analysis platform that helps you understand different perspectives and identify potential bias in media coverage
      </p>
      <SearchBar />
    </header>
  );
};

// Search Bar Component
const SearchBar = () => {
  return (
    <div className="max-w-2xl mx-auto relative">
      <input 
        type="text"
        placeholder="Enter a news article URL or topic..."
        className="w-full px-6 py-4 rounded-lg border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
        Analyze
      </button>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, iconBgColor, iconColor }) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className={`h-12 w-12 rounded-lg ${iconBgColor} flex items-center justify-center`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <h3 className="text-xl font-semibold text-slate-900">
          {title}
        </h3>
        <p className="text-slate-600">
          {description}
        </p>
      </div>
    </Card>
  );
};

// Features Section Component
const Features = () => {
  const features = [
    {
      icon: BarChart2,
      title: "Bias Detection",
      description: "Our AI analyzes language patterns, source credibility, and contextual factors to identify potential bias in news articles.",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Shield,
      title: "Fact Checking",
      description: "Cross-reference claims with verified sources and trusted databases to ensure accuracy and reliability.",
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Globe2,
      title: "Global Coverage",
      description: "Analyze news from multiple sources worldwide to get a comprehensive view of how different outlets cover the same story.",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

// Stat Card Component
const StatCard = ({ value, label }) => {
  return (
    <div>
      <div className="text-4xl font-bold text-blue-400 mb-2">{value}</div>
      <div className="text-slate-300">{label}</div>
    </div>
  );
};

// Stats Section Component
const Stats = () => {
  const stats = [
    { value: "1M+", label: "Articles Analyzed" },
    { value: "50K+", label: "Active Users" },
    { value: "95%", label: "Accuracy Rate" }
  ];

  return (
    <section className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTA = () => {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold text-slate-900 mb-4">
        Start Analyzing News Today
      </h2>
      <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
        Join thousands of users who make more informed decisions about their news consumption
      </p>
      <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
        Get Started Free
      </button>
    </section>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Hero />
      <Features />
      <Stats />
      <CTA />
    </div>
  );
};

export default LandingPage;