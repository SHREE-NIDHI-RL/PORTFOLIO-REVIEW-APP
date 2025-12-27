import { createContext, useState } from "react"

export const PortfolioContext = createContext()

function PortfolioProvider({ children }) {
  const [portfolios, setPortfolios] = useState([
    {
      id: 1,
      owner: "owner@example.com",
      ownerName: "John Smith",
      title: "E-Commerce Web Application",
      content: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration with Stripe. Implemented responsive design and optimized for performance. Live demo: https://myecommerce.demo.com | GitHub: https://github.com/user/ecommerce-app",
      domain: "Web Development",
      experienceLevel: "Advanced",
      openForReview: true,
      private: false,
      createdAt: "2024-01-15T10:30:00Z",
      versions: [
        {
          version: 1,
          content: "Initial version with basic e-commerce functionality including product listing, user registration, and basic cart features.",
          createdAt: "2024-01-15T10:30:00Z",
          reviews: []
        },
        {
          version: 2,
          content: "Added payment integration with Stripe, improved UI/UX design, implemented search and filtering functionality.",
          createdAt: "2024-01-20T14:20:00Z",
          reviews: []
        },
        {
          version: 3,
          content: "Enhanced security features, added admin dashboard, implemented order tracking and email notifications.",
          createdAt: "2024-01-25T16:45:00Z",
          reviews: []
        }
      ]
    },
    {
      id: 2,
      owner: "owner@example.com",
      ownerName: "John Smith",
      title: "Mobile Task Management App",
      content: "Developed a cross-platform mobile app using React Native for task management. Features include task creation, categorization, due dates, notifications, and team collaboration. Integrated with Firebase for real-time synchronization. Available on App Store and Google Play.",
      domain: "Mobile Development",
      experienceLevel: "Intermediate",
      openForReview: true,
      private: false,
      createdAt: "2024-02-01T09:15:00Z",
      versions: [
        {
          version: 1,
          content: "Mobile task management app with React Native and Firebase integration. Basic CRUD operations for tasks.",
          createdAt: "2024-02-01T09:15:00Z",
          reviews: []
        },
        {
          version: 2,
          content: "Added team collaboration features, push notifications, and offline synchronization capabilities.",
          createdAt: "2024-02-08T11:30:00Z",
          reviews: []
        }
      ]
    },
    {
      id: 3,
      owner: "owner@example.com",
      ownerName: "John Smith",
      title: "Data Visualization Dashboard",
      content: "Created an interactive data visualization dashboard using D3.js and React. Displays real-time analytics with charts, graphs, and interactive filters. Integrated with REST APIs for dynamic data fetching. Responsive design for desktop and mobile viewing.",
      domain: "UI/UX Design",
      experienceLevel: "Advanced",
      openForReview: true,
      private: false,
      createdAt: "2024-02-10T14:20:00Z",
      versions: [
        {
          version: 1,
          content: "Interactive data visualization dashboard with D3.js, React, and real-time analytics capabilities.",
          createdAt: "2024-02-10T14:20:00Z",
          reviews: []
        }
      ]
    },
    {
      id: 4,
      owner: "owner@example.com",
      ownerName: "John Smith",
      title: "AI-Powered Chatbot",
      content: "Developed an intelligent chatbot using Python, TensorFlow, and Natural Language Processing. Integrated with multiple platforms including web, Slack, and Discord. Features include intent recognition, context awareness, and learning capabilities.",
      domain: "AI/ML",
      experienceLevel: "Expert",
      openForReview: false,
      private: true,
      createdAt: "2024-02-15T10:00:00Z",
      versions: [
        {
          version: 1,
          content: "AI-powered chatbot with Python, TensorFlow, and NLP capabilities for multi-platform integration.",
          createdAt: "2024-02-15T10:00:00Z",
          reviews: []
        }
      ]
    },
    {
      id: 5,
      owner: "jane.doe@example.com",
      ownerName: "Jane Doe",
      title: "Portfolio Website Design",
      content: "Designed and developed a responsive portfolio website using HTML5, CSS3, and JavaScript. Features include smooth animations, interactive elements, and optimized performance. Showcases various design projects with detailed case studies.",
      domain: "Web Development",
      experienceLevel: "Beginner",
      openForReview: true,
      private: false,
      createdAt: "2024-02-20T11:00:00Z",
      versions: [
        {
          version: 1,
          content: "Responsive portfolio website with HTML5, CSS3, and JavaScript featuring smooth animations and interactive elements.",
          createdAt: "2024-02-20T11:00:00Z",
          reviews: []
        }
      ]
    },
    {
      id: 6,
      owner: "alex.smith@example.com",
      ownerName: "Alex Smith",
      title: "Social Media Analytics Tool",
      content: "Built a comprehensive social media analytics tool using React, Python Flask, and PostgreSQL. Features include data collection from multiple platforms, sentiment analysis, and interactive reporting dashboards.",
      domain: "Web Development",
      experienceLevel: "Advanced",
      openForReview: true,
      private: false,
      createdAt: "2024-02-22T14:30:00Z",
      versions: [
        {
          version: 1,
          content: "Social media analytics tool with React, Python Flask, and PostgreSQL for multi-platform data analysis.",
          createdAt: "2024-02-22T14:30:00Z",
          reviews: []
        }
      ]
    }
  ])
  
  const [reviewers] = useState([
    {
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      workplace: "TechCorp Solutions",
      qualifications: "PhD in Computer Science, 10+ years UX/UI experience",
      skills: "Frontend Development, UI/UX Design, React, JavaScript",
      credibilityScore: 4.8,
      reviews: []
    },
    {
      name: "Michael Chen",
      email: "michael.chen@innovate.com",
      workplace: "Innovate Design Studio",
      qualifications: "Senior Mobile Developer, React Native Expert",
      skills: "Full-Stack Development, Python, Node.js, AWS",
      credibilityScore: 4.6,
      reviews: []
    },
    {
      name: "Emily Rodriguez",
      email: "emily.rodriguez@designstudio.com",
      workplace: "Creative Design Studio",
      qualifications: "Senior UX Designer, Design Systems Specialist",
      skills: "Product Design, User Research, Figma, Adobe Creative Suite",
      credibilityScore: 4.7,
      reviews: []
    },
    {
      name: "David Kumar",
      email: "david.kumar@datatech.com",
      workplace: "DataTech Analytics",
      qualifications: "AI/ML Engineer, Data Science Expert",
      skills: "AI/ML, Data Science, Python, TensorFlow",
      credibilityScore: 4.9,
      reviews: []
    }
  ])

  const [posts, setPosts] = useState([
    {
      id: 1,
      authorName: "John Smith",
      authorEmail: "owner@example.com",
      portfolioTitle: "E-Commerce Web Application",
      portfolioContent: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration with Stripe.",
      reviewerName: "Dr. Sarah Johnson",
      reviewerEmail: "sarah.johnson@techcorp.com",
      reviewScore: 8.5,
      reviewFeedback: "Excellent technical implementation! The code structure is clean and well-organized. The UI/UX is intuitive and responsive.",
      postDate: "2024-01-28T10:30:00Z",
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      authorName: "John Smith",
      authorEmail: "owner@example.com",
      portfolioTitle: "Mobile Task Management App",
      portfolioContent: "Developed a cross-platform mobile app using React Native for task management. Features include task creation, categorization, due dates, notifications, and team collaboration.",
      reviewerName: "Michael Chen",
      reviewerEmail: "michael.chen@innovate.com",
      reviewScore: 9.0,
      reviewFeedback: "Outstanding mobile development work! The app is well-structured with excellent performance across both iOS and Android platforms.",
      postDate: "2024-02-08T14:20:00Z",
      likes: 31,
      comments: 12
    }
  ])
  
  const [reviewRequests, setReviewRequests] = useState([
    {
      id: 1,
      portfolioId: 1,
      reviewerEmail: "sarah.johnson@techcorp.com",
      reviewerName: "Dr. Sarah Johnson",
      ownerEmail: "owner@example.com",
      ownerName: "John Smith",
      portfolioTitle: "E-Commerce Web Application",
      portfolioContent: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration with Stripe.",
      status: "completed",
      requestDate: "2024-01-25T10:00:00Z",
      reviewDate: "2024-01-27T15:30:00Z",
      score: 8.5,
      feedback: "STRENGTHS:\nExcellent technical implementation! The code structure is clean and well-organized. The UI/UX is intuitive and responsive. The e-commerce functionality is comprehensive with proper error handling.\n\nWEAKNESSES:\nLimited unit test coverage. Performance could be improved with caching mechanisms. Some components could be better optimized for mobile devices.\n\nSUGGESTIONS FOR IMPROVEMENT:\nConsider adding more comprehensive unit tests and implementing caching for better performance. Add more mobile-specific optimizations and consider implementing lazy loading for images."
    },
    {
      id: 2,
      portfolioId: 2,
      reviewerEmail: "michael.chen@innovate.com",
      reviewerName: "Michael Chen",
      ownerEmail: "owner@example.com",
      ownerName: "John Smith",
      portfolioTitle: "Mobile Task Management App",
      portfolioContent: "Developed a cross-platform mobile app using React Native for task management. Features include task creation, categorization, due dates, notifications, and team collaboration.",
      status: "completed",
      requestDate: "2024-02-05T11:20:00Z",
      reviewDate: "2024-02-07T16:45:00Z",
      score: 9.0,
      feedback: "STRENGTHS:\nOutstanding mobile development work! The app is well-structured with excellent performance across both iOS and Android platforms. The Firebase integration is seamless and the real-time synchronization works flawlessly.\n\nWEAKNESSES:\nUser onboarding could be more intuitive. Some advanced features are not easily discoverable. Limited customization options for task categories.\n\nSUGGESTIONS FOR IMPROVEMENT:\nAdd a comprehensive onboarding flow with interactive tutorials. Implement better feature discovery mechanisms and add more customization options for power users."
    },
    {
      id: 3,
      portfolioId: 3,
      reviewerEmail: "emily.rodriguez@designstudio.com",
      reviewerName: "Emily Rodriguez",
      ownerEmail: "owner@example.com",
      ownerName: "John Smith",
      portfolioTitle: "Data Visualization Dashboard",
      portfolioContent: "Created an interactive data visualization dashboard using D3.js and React. Displays real-time analytics with charts, graphs, and interactive filters.",
      status: "accepted",
      requestDate: "2024-02-12T09:00:00Z"
    },
    {
      id: 4,
      portfolioId: 5,
      reviewerEmail: "sarah.johnson@techcorp.com",
      reviewerName: "Dr. Sarah Johnson",
      ownerEmail: "jane.doe@example.com",
      ownerName: "Jane Doe",
      portfolioTitle: "Portfolio Website Design",
      portfolioContent: "Designed and developed a responsive portfolio website using HTML5, CSS3, and JavaScript. Features include smooth animations, interactive elements, and optimized performance.",
      status: "pending",
      requestDate: "2024-02-24T14:30:00Z"
    },
    {
      id: 5,
      portfolioId: 6,
      reviewerEmail: "david.kumar@datatech.com",
      reviewerName: "David Kumar",
      ownerEmail: "alex.smith@example.com",
      ownerName: "Alex Smith",
      portfolioTitle: "Social Media Analytics Tool",
      portfolioContent: "Built a comprehensive social media analytics tool using React, Python Flask, and PostgreSQL. Features include data collection from multiple platforms, sentiment analysis, and interactive reporting dashboards.",
      status: "pending",
      requestDate: "2024-02-25T09:15:00Z"
    }
  ])

  const addPortfolio = (portfolio) => {
    const newPortfolio = {
      ...portfolio,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      versions: [{
        version: 1,
        content: portfolio.content,
        createdAt: new Date().toISOString(),
        reviews: []
      }]
    }
    setPortfolios([...portfolios, newPortfolio])
  }

  const addVersion = (portfolioId, content) => {
    setPortfolios(portfolios.map(p => {
      if (p.id === portfolioId) {
        const newVersion = {
          version: p.versions.length + 1,
          content,
          createdAt: new Date().toISOString(),
          reviews: []
        }
        return { ...p, versions: [...p.versions, newVersion] }
      }
      return p
    }))
  }

  const addReviewRequest = (request) => {
    const newRequest = {
      ...request,
      id: Date.now(),
      requestDate: new Date().toISOString(),
      status: "pending"
    }
    setReviewRequests([...reviewRequests, newRequest])
  }

  const sendReviewRequest = (portfolioId, reviewerEmail, message = "") => {
    const portfolio = portfolios.find(p => p.id === portfolioId)
    const reviewer = reviewers.find(r => r.email === reviewerEmail)
    
    if (portfolio && reviewer) {
      const request = {
        portfolioId: portfolioId,
        portfolioTitle: portfolio.title,
        portfolioContent: portfolio.content,
        ownerEmail: portfolio.owner,
        ownerName: portfolio.ownerName,
        reviewerEmail: reviewer.email,
        reviewerName: reviewer.name,
        message: message,
        status: "pending",
        requestDate: new Date().toISOString()
      }
      addReviewRequest(request)
      return true
    }
    return false
  }

  const updateCredibilityScore = (reviewerEmail) => {
    // Simple credibility update logic
    return Math.min(5.0, Math.random() * 0.5 + 4.5)
  }

  const submitReview = (requestId, reviewData) => {
    setReviewRequests(reviewRequests.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: "completed", 
            reviewDate: new Date().toISOString(),
            score: reviewData.score,
            feedback: reviewData.feedback
          } 
        : req
    ))
    
    // Update reviewer credibility
    const request = reviewRequests.find(req => req.id === requestId)
    if (request) {
      const newCredibility = updateCredibilityScore(request.reviewerEmail)
      console.log(`Updated credibility for ${request.reviewerEmail}: ${newCredibility}`)
    }
  }

  const addPost = (postData) => {
    const newPost = {
      ...postData,
      id: Date.now(),
      postDate: new Date().toISOString(),
      likes: 0,
      comments: 0
    }
    setPosts([newPost, ...posts])
  }

  const updateRequestStatus = (requestId, status) => {
    setReviewRequests(reviewRequests.map(req => 
      req.id === requestId ? { ...req, status } : req
    ))
  }

  const updatePortfolioVisibility = (portfolioId, versionNum, isPublic) => {
    setPortfolios(portfolios.map(p => {
      if (p.id === portfolioId) {
        const updatedVersions = p.versions?.map(v => 
          v.version === versionNum ? { ...v, publicForReviewers: isPublic } : v
        ) || [{ version: 1, content: p.content, createdAt: p.createdAt, publicForReviewers: isPublic }]
        return { ...p, versions: updatedVersions }
      }
      return p
    }))
  }

  const getReviewerByEmail = (email) => {
    return reviewers.find(reviewer => reviewer.email === email)
  }

  return (
    <PortfolioContext.Provider value={{ 
      portfolios, 
      reviewRequests,
      posts,
      reviewers,
      addPortfolio, 
      addVersion, 
      addReviewRequest,
      sendReviewRequest, 
      updateRequestStatus,
      submitReview,
      addPost,
      getReviewerByEmail,
      updateCredibilityScore,
      updatePortfolioVisibility
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export default PortfolioProvider