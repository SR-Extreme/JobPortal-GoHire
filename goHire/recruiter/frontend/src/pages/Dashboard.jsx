import { useEffect, useState } from 'react';
import { applicationsApi } from '../services/applicationsApi';
import Header from '../components/common/Header';

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await applicationsApi.getStatistics();
        setStatistics(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div>
      <Header title="Dashboard" />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Companies</h3>
              <p className="text-3xl font-bold text-blue-600">{statistics.companyCount}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Jobs</h3>
              <p className="text-3xl font-bold text-green-600">{statistics.jobCount}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Internships</h3>
              <p className="text-3xl font-bold text-purple-600">{statistics.internshipCount}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

