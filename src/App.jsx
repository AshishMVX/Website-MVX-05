import { lazy, Suspense } from 'react';
import { RouterProvider, useRoute } from './lib/router.jsx';

const Home = lazy(() => import('./components/Home.jsx'));
const TermsAndConditions = lazy(() => import('./components/TermsAndConditions.jsx'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy.jsx'));
const CareersPage = lazy(() => import('./components/CareersPage.jsx'));
const ContactPage = lazy(() => import('./components/ContactPage.jsx'));
const WorkPage = lazy(() => import('./components/WorkPage.jsx'));
const CaseStudyPage = lazy(() => import('./components/CaseStudyPage.jsx'));
const InsightsPage = lazy(() => import('./components/InsightsPage.jsx'));
const PostPage = lazy(() => import('./components/PostPage.jsx'));
const MeetTheTeamPage = lazy(() => import('./components/MeetTheTeamPage.jsx'));
const NotFound = lazy(() => import('./components/NotFound.jsx'));

function Routes() {
  const { path } = useRoute();
  if (path === '/') return <Home />;
  if (path === '/terms-and-conditions') return <TermsAndConditions />;
  if (path === '/privacy-policy') return <PrivacyPolicy />;
  if (path === '/careers') return <CareersPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/meet-the-team') return <MeetTheTeamPage />;
  if (path === '/case-studies') return <WorkPage />;
  if (path.startsWith('/case-studies/')) return <CaseStudyPage slug={path.slice('/case-studies/'.length)} />;
  if (path === '/insights') return <InsightsPage />;
  if (path.startsWith('/insights/')) return <PostPage slug={path.slice('/insights/'.length)} />;
  return <NotFound />;
}

export default function App() {
  return (
    <RouterProvider>
      <Suspense fallback={<div className="route-loading"><span /></div>}>
        <Routes />
      </Suspense>
    </RouterProvider>
  );
}
