import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Home from '@/pages/Home';
import CaseStudyUserCreation from '@/pages/CaseStudyUserCreation';
import CaseStudyDevHub from '@/pages/CaseStudyDevHub';
import CaseStudySdarim from '@/pages/CaseStudySdarim';
import CaseStudyInSightec from '@/pages/CaseStudyInSightec';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/user-creation" element={<CaseStudyUserCreation />} />
        <Route path="/case-study/dev-hub" element={<CaseStudyDevHub />} />
        <Route path="/case-study/sdarim" element={<CaseStudySdarim />} />
        <Route path="/case-study/insightec" element={<CaseStudyInSightec />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App
