import { Link } from 'react-router-dom';
import { applicantApi } from '../../services/applicantApi';

const JobCard = ({ job }) => {
  const companyName = job.jobCompany?.companyName || 'Company Not Available';
  const logoUrl = job.jobCompany?.logoId ? applicantApi.getLogo(job.jobCompany.logoId) : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{job.jobTitle || 'N/A'}</h3>
          <p className="text-gray-600">{companyName}</p>
        </div>
        {logoUrl && (
          <img src={logoUrl} alt={companyName} className="h-12 w-12 object-contain" />
        )}
      </div>
      <p className="text-gray-700 mb-4 line-clamp-2">{job.jobDescription || 'No description available'}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{job.jobLocation || 'N/A'}</span>
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">₹{job.jobSalary || 'N/A'}L</span>
        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">{job.jobType || 'N/A'}</span>
      </div>
      <Link
        to={`/jobs/${job._id}/apply`}
        className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Apply Now
      </Link>
    </div>
  );
};

export default JobCard;

