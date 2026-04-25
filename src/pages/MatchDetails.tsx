import { useParams } from 'react-router-dom';
import { useMatchDetails } from '../hooks/useMatchDetails';
import { generateMockTimeline } from '../lib/utils';
import MatchHeader from '../components/match/MatchHeader';
import MatchTabs from '../components/match/MatchTabs';
import EventsTimeline from '../components/match/EventsTimeline';
import { MatchDetailSkeleton } from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';

export default function MatchDetails() {
    const { id } = useParams<{ id: string }>();
    const { event, loading, error } = useMatchDetails(id || '');

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-3 md:px-6 py-4">
                <MatchDetailSkeleton />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="max-w-4xl mx-auto px-3 md:px-6 py-4">
                <ErrorState message="Failed to load match details" />
            </div>
        );
    }

    const timelineItems = generateMockTimeline(event);

    return (
        <div className="max-w-4xl mx-auto px-3 md:px-6 py-4 space-y-4 animate-fade-in">

            <MatchHeader event={event} >
                <MatchTabs />
            </MatchHeader>


            <EventsTimeline items={timelineItems} />
        </div>
    );
}
