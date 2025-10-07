import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, Search, Calendar, TrendingUp, FileText, Download, 
  Eye, Star, Clock, ArrowRight, Filter, Tag, Globe, Users,
  Bell, Bookmark, Share2, ThumbsUp, MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  publishDate: string;
  views: number;
  likes: number;
  tags: string[];
  featured: boolean;
  type: 'article' | 'guide' | 'update' | 'case-study';
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'form' | 'template' | 'checklist' | 'calculator';
  category: string;
  downloads: number;
  rating: number;
}

export default function KnowledgePortal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const articles: Article[] = [
    {
      id: '1',
      title: 'Understanding New Tax Regime vs Old Tax Regime for AY 2024-25',
      summary: 'Comprehensive comparison of both tax regimes with detailed calculations, benefits, and recommendations for different income brackets.',
      category: 'Income Tax',
      readTime: '8 min read',
      publishDate: 'Jan 15, 2024',
      views: 2547,
      likes: 143,
      tags: ['Tax Planning', 'New Tax Regime', 'Deductions'],
      featured: true,
      type: 'guide'
    },
    {
      id: '2',
      title: 'GST Compliance Calendar 2024: Important Dates and Deadlines',
      summary: 'Complete GST filing calendar with return due dates, penalty implications, and compliance requirements for different business types.',
      category: 'GST',
      readTime: '6 min read',
      publishDate: 'Jan 12, 2024',
      views: 1923,
      likes: 87,
      tags: ['GST', 'Compliance', 'Deadlines'],
      featured: true,
      type: 'article'
    },
    {
      id: '3',
      title: 'TDS Rate Chart 2024-25: Complete Guide with Latest Updates',
      summary: 'Updated TDS rates for various payments, threshold limits, exemptions, and practical examples for easy understanding.',
      category: 'TDS',
      readTime: '10 min read',
      publishDate: 'Jan 10, 2024',
      views: 3156,
      likes: 201,
      tags: ['TDS', 'Tax Deduction', 'Rates'],
      featured: false,
      type: 'guide'
    },
    {
      id: '4',
      title: 'Digital Signature Certificate for GST: Complete Registration Process',
      summary: 'Step-by-step guide to obtain DSC for GST registration, document requirements, costs, and troubleshooting common issues.',
      category: 'Digital Compliance',
      readTime: '5 min read',
      publishDate: 'Jan 8, 2024',
      views: 1456,
      likes: 72,
      tags: ['DSC', 'GST Registration', 'Digital Compliance'],
      featured: false,
      type: 'article'
    },
    {
      id: '5',
      title: 'Section 44AD Presumptive Taxation: Benefits and Limitations',
      summary: 'Detailed analysis of presumptive taxation scheme under Section 44AD, eligibility criteria, tax implications, and opt-out provisions.',
      category: 'Business Tax',
      readTime: '7 min read',
      publishDate: 'Jan 5, 2024',
      views: 1789,
      likes: 94,
      tags: ['Presumptive Tax', 'Small Business', 'Section 44AD'],
      featured: false,
      type: 'case-study'
    }
  ];

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Income Tax Return Checklist 2024-25',
      description: 'Comprehensive checklist to ensure accurate ITR filing with all required documents and information.',
      type: 'checklist',
      category: 'Income Tax',
      downloads: 1523,
      rating: 4.8
    },
    {
      id: '2',
      title: 'GST Invoice Format Templates',
      description: 'Ready-to-use GST compliant invoice templates for different business types and transaction scenarios.',
      type: 'template',
      category: 'GST',
      downloads: 2341,
      rating: 4.7
    },
    {
      id: '3',
      title: 'TDS Calculation Worksheet',
      description: 'Excel-based calculator for TDS computation across various sections with automatic rate selection.',
      type: 'calculator',
      category: 'TDS',
      downloads: 987,
      rating: 4.9
    },
    {
      id: '4',
      title: 'Company Registration Application Forms',
      description: 'Complete set of forms required for company incorporation including SPICe+, AOA, MOA templates.',
      type: 'form',
      category: 'Corporate Law',
      downloads: 756,
      rating: 4.6
    }
  ];

  const categories = ['All', 'Income Tax', 'GST', 'TDS', 'Corporate Law', 'Digital Compliance', 'Business Tax'];
  const articleTypes = ['All', 'Article', 'Guide', 'Update', 'Case Study'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesType = selectedType === 'all' || article.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return BookOpen;
      case 'article': return FileText;
      case 'update': return Bell;
      case 'case-study': return Users;
      default: return FileText;
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'form': return FileText;
      case 'template': return Download;
      case 'checklist': return Star;
      case 'calculator': return TrendingUp;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#628ca2]/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-20 h-20 border border-[#628ca2]/30 mx-auto mb-8 flex items-center justify-center"
              whileHover={{ scale: 1.1, borderColor: '#628ca2' }}
            >
              <BookOpen className="w-10 h-10 text-[#628ca2]" />
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8 leading-tight">
              KNOWLEDGE <span className="text-[#628ca2]">PORTAL</span>
            </h1>
            <motion.div
              className="w-32 h-px bg-[#628ca2] mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl font-light text-white/70 max-w-4xl mx-auto leading-relaxed">
              Comprehensive resource center for tax updates, compliance guides, professional insights, 
              and practical tools to navigate the evolving financial landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-4 top-4 text-white/40 w-5 h-5" />
                  <Input
                    placeholder="Search articles, guides, and resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 bg-black/50 border-[#628ca2]/30 text-white placeholder-white/40 font-light h-14"
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white h-14">
                  <Filter className="mr-2 w-4 h-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category.toLowerCase().replace(' ', '-')}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-black/50 border-[#628ca2]/30 text-white h-14">
                  <Tag className="mr-2 w-4 h-4" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {articleTypes.map(type => (
                    <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <Tabs defaultValue="articles" className="space-y-8">
            <TabsList className="bg-black/50 border border-[#628ca2]/20">
              <TabsTrigger value="articles" className="data-[state=active]:bg-[#628ca2] data-[state=active]:text-white">
                <FileText className="mr-2 w-4 h-4" />
                ARTICLES & GUIDES
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-[#628ca2] data-[state=active]:text-white">
                <Download className="mr-2 w-4 h-4" />
                RESOURCES & TOOLS
              </TabsTrigger>
              <TabsTrigger value="updates" className="data-[state=active]:bg-[#628ca2] data-[state=active]:text-white">
                <Bell className="mr-2 w-4 h-4" />
                LATEST UPDATES
              </TabsTrigger>
            </TabsList>

            {/* Articles Tab */}
            <TabsContent value="articles">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Featured Articles */}
                <div className="mb-16">
                  <h2 className="text-3xl font-light tracking-tight mb-8">
                    FEATURED <span className="text-[#628ca2]">CONTENT</span>
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {articles.filter(article => article.featured).map((article, index) => {
                      const TypeIcon = getTypeIcon(article.type);
                      return (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                        >
                          <Card className="bg-black/50 border-[#628ca2]/20 h-full hover:border-[#628ca2]/40 transition-all duration-500 group">
                            <CardHeader>
                              <div className="flex items-start justify-between mb-4">
                                <Badge className="bg-[#628ca2]/20 text-[#628ca2] border-[#628ca2]/30 border">
                                  FEATURED
                                </Badge>
                                <div className="flex items-center space-x-3 text-white/50 text-sm">
                                  <div className="flex items-center">
                                    <Eye className="w-4 h-4 mr-1" />
                                    {article.views.toLocaleString()}
                                  </div>
                                  <div className="flex items-center">
                                    <ThumbsUp className="w-4 h-4 mr-1" />
                                    {article.likes}
                                  </div>
                                </div>
                              </div>
                              <CardTitle className="text-xl font-light text-white group-hover:text-[#628ca2] transition-colors duration-300 leading-relaxed">
                                {article.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-white/70 font-light leading-relaxed mb-6">
                                {article.summary}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mb-6">
                                {article.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="border-[#628ca2]/30 text-white/60">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-white/50">
                                  <div className="flex items-center">
                                    <TypeIcon className="w-4 h-4 mr-2" />
                                    {article.type.charAt(0).toUpperCase() + article.type.slice(1)}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {article.readTime}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {article.publishDate}
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-[#628ca2] hover:bg-[#628ca2] hover:text-white"
                                >
                                  <ArrowRight className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* All Articles */}
                <div>
                  <h2 className="text-3xl font-light tracking-tight mb-8">
                    ALL <span className="text-[#628ca2]">ARTICLES</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.filter(article => !article.featured).map((article, index) => {
                      const TypeIcon = getTypeIcon(article.type);
                      return (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                        >
                          <Card className="bg-black/50 border-[#628ca2]/20 h-full hover:border-[#628ca2]/40 transition-all duration-500 group">
                            <CardHeader>
                              <div className="flex items-center justify-between mb-4">
                                <Badge variant="outline" className="border-[#628ca2]/30 text-[#628ca2]">
                                  {article.category}
                                </Badge>
                                <div className="flex items-center space-x-2 text-white/50 text-xs">
                                  <Eye className="w-3 h-3" />
                                  <span>{article.views.toLocaleString()}</span>
                                </div>
                              </div>
                              <CardTitle className="text-lg font-light text-white group-hover:text-[#628ca2] transition-colors duration-300 leading-relaxed">
                                {article.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-white/60 font-light text-sm leading-relaxed mb-4 line-clamp-3">
                                {article.summary}
                              </p>
                              
                              <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                                <div className="flex items-center">
                                  <TypeIcon className="w-3 h-3 mr-1" />
                                  {article.type}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {article.readTime}
                                </div>
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-[#628ca2]/40 text-[#628ca2] hover:bg-[#628ca2] hover:text-white"
                              >
                                READ ARTICLE
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-light tracking-tight mb-8">
                  DOWNLOADABLE <span className="text-[#628ca2]">RESOURCES</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource, index) => {
                    const ResourceIcon = getResourceIcon(resource.type);
                    return (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="bg-black/50 border-[#628ca2]/20 h-full hover:border-[#628ca2]/40 transition-all duration-500 group">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-12 h-12 border border-[#628ca2]/30 flex items-center justify-center">
                                <ResourceIcon className="w-6 h-6 text-[#628ca2]" />
                              </div>
                              <Badge variant="outline" className="border-[#628ca2]/30 text-[#628ca2]">
                                {resource.type.toUpperCase()}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg font-light text-white group-hover:text-[#628ca2] transition-colors duration-300">
                              {resource.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-white/70 font-light text-sm leading-relaxed mb-6">
                              {resource.description}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs text-white/50 mb-6">
                              <div className="flex items-center">
                                <Download className="w-3 h-3 mr-1" />
                                {resource.downloads.toLocaleString()} downloads
                              </div>
                              <div className="flex items-center">
                                <Star className="w-3 h-3 mr-1 text-yellow-400" />
                                {resource.rating}
                              </div>
                            </div>

                            <Button
                              className="w-full bg-[#628ca2] text-white hover:bg-white hover:text-black transition-all duration-500"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              DOWNLOAD
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </TabsContent>

            {/* Updates Tab */}
            <TabsContent value="updates">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-light tracking-tight mb-8">
                  RECENT <span className="text-[#628ca2]">UPDATES</span>
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      date: 'Jan 15, 2024',
                      title: 'Income Tax Filing Deadline Extended for AY 2023-24',
                      summary: 'CBDT extends ITR filing deadline by 15 days for individual taxpayers.',
                      type: 'Deadline Extension'
                    },
                    {
                      date: 'Jan 12, 2024',
                      title: 'New GST Return Filing Process Announced',
                      summary: 'Simplified GST return filing process with reduced compliance burden.',
                      type: 'Process Update'
                    },
                    {
                      date: 'Jan 10, 2024',
                      title: 'TDS Rate Changes for Financial Year 2024-25',
                      summary: 'Updated TDS rates for various categories with effect from April 1, 2024.',
                      type: 'Rate Change'
                    }
                  ].map((update, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="bg-black/50 border-[#628ca2]/20 hover:border-[#628ca2]/40 transition-all duration-500">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-3">
                                <Badge className="bg-[#628ca2]/20 text-[#628ca2] border-[#628ca2]/30 border">
                                  {update.type}
                                </Badge>
                                <span className="text-white/50 text-sm">{update.date}</span>
                              </div>
                              <h3 className="text-lg font-light text-white mb-2">{update.title}</h3>
                              <p className="text-white/70 font-light text-sm">{update.summary}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#628ca2] hover:bg-[#628ca2] hover:text-white ml-4"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-[#628ca2]/10 relative z-10">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
              NEED PERSONALIZED <span className="text-[#628ca2]">GUIDANCE?</span>
            </h2>
            <p className="text-lg font-light text-white/70 mb-8 leading-relaxed">
              Our knowledge portal provides general information. For specific advice 
              tailored to your situation, connect with our professional team.
            </p>
            <Button className="bg-[#628ca2] text-white hover:bg-white hover:text-black px-12 py-4 text-lg font-light tracking-wider transition-all duration-500">
              GET PROFESSIONAL CONSULTATION
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}