import { useEffect, useState } from 'react';
import { applicantApi } from '../services/applicantApi';
import Header from '../components/common/Header';
import EmptyState from '../components/common/EmptyState';
import InternshipCard from '../components/internships/InternshipCard';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const data = await applicantApi.getInternships();
        setInternships(data);
      } catch (error) {
        console.error('Error fetching internships:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div>
      <Header title="Available Internships" />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {internships.length === 0 ? (
          <EmptyState message="No internships available at the moment" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((internship) => (
              <InternshipCard key={internship._id} internship={internship} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;

