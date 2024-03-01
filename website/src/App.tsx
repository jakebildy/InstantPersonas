import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ToolsPage from "./pages/Dashboard/ToolsPage";
import HistoryPage from "./pages/Dashboard/HistoryPage";
import SubscriptionPage from "./pages/Dashboard/SubscriptionPage";
import RefundPolicy from "./pages/RefundPolicy";
import AffiliatePage from "./pages/Dashboard/AffiliatePage";
import BlogList, { BLOG_POSTS } from "./pages/Blog/BlogList";
import BusinessProvider from "./contexts/BusinessContext";
import ToolsPage2 from "./pages/Dashboard/ToolsPage2";
import OnBoarding from "./pages/Dashboard/OnBoarding";

function App() {
  return (
    <BusinessProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Login Or Sign-up */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          {/* Dashboard */}
          <Route path="/home" element={<ToolsPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/:id" element={<ToolsPage2 />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/affiliate" element={<AffiliatePage />} />
          <Route path="/onboarding" element={<OnBoarding />} />
          {/* Return Policy */}
          <Route path="/refund-policy" element={<RefundPolicy />} />
          {/* TODO: Terms of service */}
          {/* Blog */}
          <Route path="/blog/" element={<BlogList />} />
          {BLOG_POSTS.map((post) => (
            <Route
              path={"/blog/" + post.url}
              element={post.page}
              key={post.name}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </BusinessProvider>
  );
}

export default App;
