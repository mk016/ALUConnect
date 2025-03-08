import PageTransition from '@/components/layout/PageTransition';
import CommunityLayout from '@/components/community/CommunityLayout';

export default function Community() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <CommunityLayout />
      </div>
    </PageTransition>
  );
} 