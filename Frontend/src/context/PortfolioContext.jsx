import { createContext, useState } from "react"

export const PortfolioContext = createContext()

function PortfolioProvider({ children }) {
  const [portfolios, setPortfolios] = useState([
    {
      id: 1,
      owner: "owner@example.com",
      title: "E-Commerce Web Application",
      content: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration with Stripe. Implemented responsive design and optimized for performance. Live demo: https://myecommerce.demo.com | GitHub: https://github.com/user/ecommerce-app",
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
      title: "Mobile Task Management App",
      content: "Developed a cross-platform mobile app using React Native for task management. Features include task creation, categorization, due dates, notifications, and team collaboration. Integrated with Firebase for real-time synchronization. Available on App Store and Google Play.",
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
      title: "Data Visualization Dashboard",
      content: "Created an interactive data visualization dashboard using D3.js and React. Displays real-time analytics with charts, graphs, and interactive filters. Integrated with REST APIs for dynamic data fetching. Responsive design for desktop and mobile viewing.",
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
      title: "AI-Powered Chatbot",
      content: "Developed an intelligent chatbot using Python, TensorFlow, and Natural Language Processing. Integrated with multiple platforms including web, Slack, and Discord. Features include intent recognition, context awareness, and learning capabilities.",
      createdAt: "2024-02-15T10:00:00Z",
      versions: [
        {
          version: 1,
          content: "AI-powered chatbot with Python, TensorFlow, and NLP capabilities for multi-platform integration.",
          createdAt: "2024-02-15T10:00:00Z",
          reviews: []
        }
      ]
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
      feedback: "Excellent technical implementation! The code structure is clean and well-organized. The UI/UX is intuitive and responsive. The e-commerce functionality is comprehensive with proper error handling. Consider adding more comprehensive unit tests and implementing caching for better performance. Overall, this is a solid full-stack project that demonstrates strong development skills."
    },
    {
      id: 2,
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
      feedback: "Outstanding mobile development work! The app is well-structured with excellent performance across both iOS and Android platforms. The Firebase integration is seamless and the real-time synchronization works flawlessly. Great attention to user experience and cross-platform compatibility. The code is clean and follows React Native best practices."
    },
    {
      id: 3,
      reviewerEmail: "emily.rodriguez@designstudio.com",
      reviewerName: "Emily Rodriguez",
      ownerEmail: "owner@example.com",
      ownerName: "John Smith",
      portfolioTitle: "Data Visualization Dashboard",
      portfolioContent: "Created an interactive data visualization dashboard using D3.js and React. Displays real-time analytics with charts, graphs, and interactive filters.",
      status: "completed",
      requestDate: "2024-02-12T09:00:00Z",
      reviewDate: "2024-02-14T14:20:00Z",
      score: 8.8,
      feedback: "Impressive data visualization work! The D3.js integration with React is expertly handled. The interactive elements are smooth and the design is both functional and aesthetically pleasing. The dashboard provides excellent user experience with intuitive navigation. Consider adding more accessibility features and keyboard navigation support."
    },
    {
      id: 4,
      reviewerEmail: "david.kumar@datatech.com",
      reviewerName: "David Kumar",
      ownerEmail: "owner@example.com",
      ownerName: "John Smith",
      portfolioTitle: "AI-Powered Chatbot",
      portfolioContent: "Developed an intelligent chatbot using Python, TensorFlow, and Natural Language Processing. Integrated with multiple platforms including web, Slack, and Discord.",
      status: "completed",
      requestDate: "2024-02-16T13:30:00Z",
      reviewDate: "2024-02-18T10:15:00Z",
      score: 9.2,
      feedback: "Exceptional AI implementation! The natural language processing is sophisticated and the chatbot responses are contextually accurate. The multi-platform integration is seamless. The machine learning model shows good training and the code architecture is scalable. This demonstrates advanced understanding of AI/ML concepts and practical implementation skills."
    },
    {
      id: 5,
      reviewerEmail: "sarah.johnson@techcorp.com",
      reviewerName: "Dr. Sarah Johnson",
      ownerEmail: "owner@example.com",
      ownerName: "John Smith",
      portfolioTitle: "Mobile Task Management App",
      portfolioContent: "Developed a cross-platform mobile app using React Native for task management.",
      status: "completed",
      requestDate: "2024-02-20T08:45:00Z",
      reviewDate: "2024-02-22T11:30:00Z",
      score: 8.7,
      feedback: "Great mobile app development! The React Native implementation is solid and the user interface is clean and intuitive. The task management features are well thought out and the app performance is smooth. Good use of modern mobile development practices."
    },
    {
      id: 6,
      reviewerEmail: "emily.rodriguez@designstudio.com",
      reviewerName: "Emily Rodriguez",
      ownerEmail: "owner@example.com",
      ownerName: "John Smith",
      portfolioTitle: "E-Commerce Web Application",
      portfolioContent: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB.",
      status: "pending",
      requestDate: "2024-02-24T14:30:00Z"
    },
    {
      id: 7,
      reviewerEmail: "sarah.johnson@techcorp.com",
      reviewerName: "Dr. Sarah Johnson",
      ownerEmail: "owner@example.com",
      ownerName: "John Smith",
      portfolioTitle: "Data Visualization Dashboard",
      portfolioContent: "Created an interactive data visualization dashboard using D3.js and React. Displays real-time analytics with charts, graphs, and interactive filters.",
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
      ownerProfile: {
        name: request.ownerName,
        email: request.ownerEmail
      }
    }
    setReviewRequests([...reviewRequests, newRequest])
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

  return (
    <PortfolioContext.Provider value={{ 
      portfolios, 
      reviewRequests,
      posts,
      addPortfolio, 
      addVersion, 
      addReviewRequest, 
      updateRequestStatus,
      submitReview,
      addPost
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export default PortfolioProvider