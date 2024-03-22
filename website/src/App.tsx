import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HistoryPage from "./pages/Dashboard/HistoryPage";
import SubscriptionPage from "./pages/Dashboard/SubscriptionPage";
import RefundPolicy from "./pages/RefundPolicy";
import AffiliatePage from "./pages/Dashboard/AffiliatePage";
import BlogList, { BLOG_POSTS } from "./pages/Blog/BlogList";
import { PersonaChat } from "./pages/Persona/PersonaChat";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    // <BusinessProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Login Or Sign-up */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        {/* Dashboard */}
        <Route path="/home" element={<PersonaChat />} />
        <Route path="/persona" element={<PersonaChat />} />
        <Route path="/persona/:id" element={<PersonaChat />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        {/* Return Policy */}
        <Route path="/refund-policy" element={<RefundPolicy />} />

        <Route path="/terms-of-service" element={<TermsOfService />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
    // </BusinessProvider>
  );
}

export default App;
