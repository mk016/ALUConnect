import PageTransition from '@/components/layout/PageTransition';
import NetworkLayout from '@/components/network/NetworkLayout';

export default function Network() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <NetworkLayout />
      </div>
    </PageTransition>
  );
} 