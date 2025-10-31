import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { applicantApi } from '../services/applicantApi';
import Header from '../components/common/Header';
import EmptyState from '../components/common/EmptyState';
import JobCard from '../components/jobs/JobCard';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await applicantApi.getJobs();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div>
      <Header title="Available Jobs" />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {jobs.length === 0 ? (
          <EmptyState message="No jobs available at the moment" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;

