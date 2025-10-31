const AppliedJob = require('../models/AppliedJob');
const Job = require('../models/Jobs');
const PremiumUser = require('../models/PremiumUser');
const { ObjectId } = require('mongodb');

// Note: This assumes PremiumUser model exists in applicant DB
// You may need to connect to applicant DB to fetch premium users

const getJobApplications = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId).populate("jobCompany");
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const applicants = await AppliedJob.find({ jobId });

    // Fetch premium user IDs (assuming they're in the same DB or need connection to applicant DB)
    const premiumUsers = await PremiumUser.find({}, 'userId');
    const premiumUserIds = premiumUsers.map(user => user.userId);

    // Sort applicants: premium first
    const premiumApplicants = [];
    const normalApplicants = [];

    applicants.forEach(applicant => {
      if (premiumUserIds.includes(applicant.userId)) {
        premiumApplicants.push(applicant);
      } else {
        normalApplicants.push(applicant);
      }
    });

    const sortedApplicants = [...premiumApplicants, ...normalApplicants];

    res.json({
      success: true,
      applicants: sortedApplicants,
      jobTitle: job.jobTitle,
      jobCompany: job.jobCompany.companyName,
      jobId
    });
  } catch (err) {
    console.error('Error fetching job applications:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const selectApplicant = async (req, res) => {
  try {
    const { jobId, applicantId } = req.params;
    await AppliedJob.findOneAndUpdate(
      { _id: applicantId, jobId },
      { isSelected: true, isRejected: false }
    );
    res.json({ success: true, message: 'Applicant selected successfully' });
  } catch (error) {
    console.error('Error selecting applicant:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const rejectApplicant = async (req, res) => {
  try {
    const { jobId, applicantId } = req.params;
    await AppliedJob.findOneAndUpdate(
      { _id: applicantId, jobId },
      { isRejected: true, isSelected: false }
    );
    res.json({ success: true, message: 'Applicant rejected successfully' });
  } catch (error) {
    console.error('Error rejecting applicant:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    // This would need to connect to applicant DB to fetch resume from GridFS
    // For now, return a placeholder
    res.status(501).json({ success: false, message: 'Resume fetching not yet implemented' });
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = {
  getJobApplications,
  selectApplicant,
  rejectApplicant,
  getResume
};

